require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const { randomUUID } = require("crypto");

const app = express();
app.use(express.json());

// ── Debt Tracker Data ────────────────────────────────────────────────────────
const DATA_FILE = path.join(__dirname, "data.json");
const DEFAULT_DATA = {
  debts: [],
  settings: { strategy: "avalanche", extraPayment: 0 },
};

function readData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_DATA, null, 2));
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET all debts and settings
app.get("/api/debts", (req, res) => {
  res.json(readData());
});

// POST new debt
app.post("/api/debts", (req, res) => {
  const { name, balance, interestRate, minimumPayment, notes } = req.body;
  if (!name || balance == null || interestRate == null || minimumPayment == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const data = readData();
  const debt = {
    id: randomUUID(),
    name: String(name).trim(),
    balance: Number(balance),
    originalBalance: Number(balance),
    interestRate: Number(interestRate),
    minimumPayment: Number(minimumPayment),
    notes: notes ? String(notes).trim() : "",
    payments: [],
  };
  data.debts.push(debt);
  writeData(data);
  res.status(201).json(debt);
});

// PUT update debt
app.put("/api/debts/:id", (req, res) => {
  const data = readData();
  const debt = data.debts.find((d) => d.id === req.params.id);
  if (!debt) return res.status(404).json({ error: "Debt not found" });

  const { name, balance, interestRate, minimumPayment, notes } = req.body;
  if (name != null) debt.name = String(name).trim();
  if (balance != null) debt.balance = Number(balance);
  if (interestRate != null) debt.interestRate = Number(interestRate);
  if (minimumPayment != null) debt.minimumPayment = Number(minimumPayment);
  if (notes != null) debt.notes = String(notes).trim();

  writeData(data);
  res.json(debt);
});

// DELETE debt
app.delete("/api/debts/:id", (req, res) => {
  const data = readData();
  const idx = data.debts.findIndex((d) => d.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Debt not found" });
  data.debts.splice(idx, 1);
  writeData(data);
  res.json({ success: true });
});

// POST log payment
app.post("/api/debts/:id/payments", (req, res) => {
  const data = readData();
  const debt = data.debts.find((d) => d.id === req.params.id);
  if (!debt) return res.status(404).json({ error: "Debt not found" });

  const { amount, date, note } = req.body;
  if (!amount || !date) return res.status(400).json({ error: "Amount and date required" });

  const payment = {
    id: randomUUID(),
    amount: Number(amount),
    date: String(date),
    note: note ? String(note).trim() : "",
  };
  debt.payments.push(payment);
  debt.balance = Math.max(0, debt.balance - payment.amount);
  writeData(data);
  res.status(201).json({ payment, newBalance: debt.balance });
});

// DELETE payment
app.delete("/api/debts/:id/payments/:paymentId", (req, res) => {
  const data = readData();
  const debt = data.debts.find((d) => d.id === req.params.id);
  if (!debt) return res.status(404).json({ error: "Debt not found" });

  const idx = debt.payments.findIndex((p) => p.id === req.params.paymentId);
  if (idx === -1) return res.status(404).json({ error: "Payment not found" });

  const [payment] = debt.payments.splice(idx, 1);
  debt.balance += payment.amount;
  writeData(data);
  res.json({ success: true, newBalance: debt.balance });
});

// PUT settings
app.put("/api/settings", (req, res) => {
  const data = readData();
  const { strategy, extraPayment } = req.body;
  if (strategy === "avalanche" || strategy === "snowball") {
    data.settings.strategy = strategy;
  }
  if (extraPayment != null) {
    data.settings.extraPayment = Number(extraPayment);
  }
  writeData(data);
  res.json(data.settings);
});

// ── Auth ─────────────────────────────────────────────────────────────────────
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    return res.json({ token });
  }
  res.status(401).json({ error: "Invalid credentials" });
});

// ── Static + Catch-all ───────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, "frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
