require("dotenv").config();
const { Pool } = require("pg");
const data = require("/Users/jabezdailey/Repos/debt-pay-off-tracker/data.json");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Clear existing data
    await client.query("DELETE FROM payments");
    await client.query("DELETE FROM debts");

    // Insert debts
    for (const debt of data.debts) {
      const totalPaid = debt.payments.reduce((s, p) => s + p.amount, 0);
      const originalBalance = debt.balance + totalPaid;

      await client.query(
        `INSERT INTO debts (id, name, balance, original_balance, interest_rate, minimum_payment, notes, autopay_enabled, autopay_amount, autopay_day)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        [
          debt.id,
          debt.name,
          debt.balance,
          originalBalance,
          debt.interestRate,
          debt.minimumPayment,
          debt.notes || "",
          debt.autopay?.enabled || false,
          debt.autopay?.amount || null,
          debt.autopay?.dayOfMonth || null,
        ]
      );

      // Insert payments
      for (const payment of debt.payments) {
        await client.query(
          `INSERT INTO payments (id, debt_id, amount, date, note)
           VALUES ($1,$2,$3,$4,$5)`,
          [payment.id, debt.id, payment.amount, payment.date, payment.note || ""]
        );
      }
    }

    // Update settings
    await client.query(
      `UPDATE settings SET strategy = $1, extra_payment = $2 WHERE id = 1`,
      [data.settings.strategy, data.settings.extraPayment]
    );

    await client.query("COMMIT");

    console.log(`✓ Migrated ${data.debts.length} debts`);
    const totalPayments = data.debts.reduce((s, d) => s + d.payments.length, 0);
    console.log(`✓ Migrated ${totalPayments} payments`);
    console.log(`✓ Strategy: ${data.settings.strategy}, Extra payment: $${data.settings.extraPayment}`);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Migration failed:", err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
