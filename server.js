require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const { Pool } = require("pg");
const { randomUUID } = require("crypto");

const app = express();
app.use(express.json());

// ── Database ─────────────────────────────────────────────────────────────────
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY DEFAULT 1,
      strategy VARCHAR(20) DEFAULT 'avalanche',
      extra_payment NUMERIC(10,2) DEFAULT 0,
      CHECK (id = 1)
    );

    INSERT INTO settings (id, strategy, extra_payment)
    VALUES (1, 'avalanche', 0)
    ON CONFLICT (id) DO NOTHING;

    CREATE TABLE IF NOT EXISTS debts (
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      balance NUMERIC(12,2) NOT NULL,
      original_balance NUMERIC(12,2) NOT NULL,
      interest_rate NUMERIC(6,3) NOT NULL,
      minimum_payment NUMERIC(10,2) NOT NULL,
      notes TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS payments (
      id UUID PRIMARY KEY,
      debt_id UUID REFERENCES debts(id) ON DELETE CASCADE,
      amount NUMERIC(10,2) NOT NULL,
      date DATE NOT NULL,
      note TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT NOW()
    );

    ALTER TABLE debts ADD COLUMN IF NOT EXISTS autopay_enabled BOOLEAN DEFAULT FALSE;
    ALTER TABLE debts ADD COLUMN IF NOT EXISTS autopay_amount NUMERIC(10,2);
    ALTER TABLE debts ADD COLUMN IF NOT EXISTS autopay_day INTEGER;
  `);
}

// ── DB Helpers ────────────────────────────────────────────────────────────────
function rowToDebt(row, payments = []) {
  return {
    id: row.id,
    name: row.name,
    balance: parseFloat(row.balance),
    originalBalance: parseFloat(row.original_balance),
    interestRate: parseFloat(row.interest_rate),
    minimumPayment: parseFloat(row.minimum_payment),
    notes: row.notes || "",
    payments,
    autopay: {
      enabled: row.autopay_enabled || false,
      amount: row.autopay_amount ? parseFloat(row.autopay_amount) : null,
      dayOfMonth: row.autopay_day || null,
    },
  };
}

function rowToPayment(row) {
  return {
    id: row.id,
    amount: parseFloat(row.amount),
    date: row.date.toISOString().split("T")[0],
    note: row.note || "",
  };
}

function rowToSettings(row) {
  return {
    strategy: row.strategy,
    extraPayment: parseFloat(row.extra_payment),
  };
}

async function getAllDebts() {
  const [debtsRes, paymentsRes] = await Promise.all([
    pool.query("SELECT * FROM debts ORDER BY created_at"),
    pool.query("SELECT * FROM payments ORDER BY created_at"),
  ]);

  const paymentsByDebt = {};
  for (const row of paymentsRes.rows) {
    if (!paymentsByDebt[row.debt_id]) paymentsByDebt[row.debt_id] = [];
    paymentsByDebt[row.debt_id].push(rowToPayment(row));
  }

  return debtsRes.rows.map((row) => rowToDebt(row, paymentsByDebt[row.id] || []));
}

async function getSettings() {
  const res = await pool.query("SELECT * FROM settings WHERE id = 1");
  return rowToSettings(res.rows[0]);
}

// ── Debt Routes ───────────────────────────────────────────────────────────────
app.get("/api/debts", async (req, res) => {
  try {
    const [debts, settings] = await Promise.all([getAllDebts(), getSettings()]);
    res.json({ debts, settings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/debts", async (req, res) => {
  const { name, balance, interestRate, minimumPayment, notes } = req.body;
  if (!name || balance == null || interestRate == null || minimumPayment == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const id = randomUUID();
    const result = await pool.query(
      `INSERT INTO debts (id, name, balance, original_balance, interest_rate, minimum_payment, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [id, String(name).trim(), Number(balance), Number(balance),
       Number(interestRate), Number(minimumPayment), notes ? String(notes).trim() : ""]
    );
    res.status(201).json(rowToDebt(result.rows[0], []));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/debts/:id", async (req, res) => {
  const { name, balance, interestRate, minimumPayment, notes } = req.body;
  try {
    const result = await pool.query(
      `UPDATE debts SET
        name = COALESCE($1, name),
        balance = COALESCE($2, balance),
        interest_rate = COALESCE($3, interest_rate),
        minimum_payment = COALESCE($4, minimum_payment),
        notes = COALESCE($5, notes)
       WHERE id = $6 RETURNING *`,
      [
        name != null ? String(name).trim() : null,
        balance != null ? Number(balance) : null,
        interestRate != null ? Number(interestRate) : null,
        minimumPayment != null ? Number(minimumPayment) : null,
        notes != null ? String(notes).trim() : null,
        req.params.id,
      ]
    );
    if (!result.rows.length) return res.status(404).json({ error: "Debt not found" });

    const paymentsRes = await pool.query(
      "SELECT * FROM payments WHERE debt_id = $1 ORDER BY created_at",
      [req.params.id]
    );
    res.json(rowToDebt(result.rows[0], paymentsRes.rows.map(rowToPayment)));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/debts/:id", async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM debts WHERE id = $1 RETURNING id", [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: "Debt not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/debts/:id/payments", async (req, res) => {
  const { amount, date, note } = req.body;
  if (!amount || !date) return res.status(400).json({ error: "Amount and date required" });
  try {
    const paymentId = randomUUID();
    await pool.query(
      "INSERT INTO payments (id, debt_id, amount, date, note) VALUES ($1,$2,$3,$4,$5)",
      [paymentId, req.params.id, Number(amount), date, note ? String(note).trim() : ""]
    );
    const debtRes = await pool.query(
      "UPDATE debts SET balance = GREATEST(0, balance - $1) WHERE id = $2 RETURNING balance",
      [Number(amount), req.params.id]
    );
    if (!debtRes.rows.length) return res.status(404).json({ error: "Debt not found" });

    const paymentRes = await pool.query("SELECT * FROM payments WHERE id = $1", [paymentId]);
    res.status(201).json({
      payment: rowToPayment(paymentRes.rows[0]),
      newBalance: parseFloat(debtRes.rows[0].balance),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/debts/:id/payments/:paymentId", async (req, res) => {
  try {
    const paymentRes = await pool.query(
      "DELETE FROM payments WHERE id = $1 AND debt_id = $2 RETURNING amount",
      [req.params.paymentId, req.params.id]
    );
    if (!paymentRes.rows.length) return res.status(404).json({ error: "Payment not found" });

    const amount = parseFloat(paymentRes.rows[0].amount);
    const debtRes = await pool.query(
      "UPDATE debts SET balance = balance + $1 WHERE id = $2 RETURNING balance",
      [amount, req.params.id]
    );
    res.json({ success: true, newBalance: parseFloat(debtRes.rows[0].balance) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/debts/:id/autopay", async (req, res) => {
  const { enabled, amount, dayOfMonth } = req.body;
  try {
    const result = await pool.query(
      `UPDATE debts SET
        autopay_enabled = $1,
        autopay_amount = $2,
        autopay_day = $3
       WHERE id = $4 RETURNING *`,
      [
        Boolean(enabled),
        amount ? Number(amount) : null,
        dayOfMonth ? Math.min(28, Math.max(1, Number(dayOfMonth))) : null,
        req.params.id,
      ]
    );
    if (!result.rows.length) return res.status(404).json({ error: "Debt not found" });
    const row = result.rows[0];
    res.json({
      enabled: row.autopay_enabled,
      amount: row.autopay_amount ? parseFloat(row.autopay_amount) : null,
      dayOfMonth: row.autopay_day,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/settings", async (req, res) => {
  const { strategy, extraPayment } = req.body;
  try {
    const result = await pool.query(
      `UPDATE settings SET
        strategy = CASE WHEN $1 IN ('avalanche','snowball') THEN $1 ELSE strategy END,
        extra_payment = COALESCE($2, extra_payment)
       WHERE id = 1 RETURNING *`,
      [strategy ?? null, extraPayment != null ? Number(extraPayment) : null]
    );
    res.json(rowToSettings(result.rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Auth ──────────────────────────────────────────────────────────────────────
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "24h" });
    return res.json({ token });
  }
  res.status(401).json({ error: "Invalid credentials" });
});

// ── Static + Catch-all ────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, "frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
initDB()
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => { console.error("DB init failed:", err); process.exit(1); });
