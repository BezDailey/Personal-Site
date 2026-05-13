import React, { useState, useEffect } from "react";
import styles from "./DebtForm.module.css";

const EMPTY = { name: "", balance: "", interestRate: "", minimumPayment: "", notes: "" };

const DebtForm = ({ initial, onSubmit, onCancel }) => {
  const [form, setForm] = useState(initial || EMPTY);

  useEffect(() => {
    setForm(initial || EMPTY);
  }, [initial]);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: form.name,
      balance: parseFloat(form.balance),
      interestRate: parseFloat(form.interestRate),
      minimumPayment: parseFloat(form.minimumPayment),
      notes: form.notes,
    });
    setForm(EMPTY);
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{initial ? "Edit Debt" : "Add Debt"}</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="debt-name">Debt Name</label>
            <input
              id="debt-name"
              className={styles.input}
              type="text"
              placeholder="Credit Card, Car Loan…"
              value={form.name}
              onChange={set("name")}
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="debt-balance">Current Balance</label>
            <div className={styles.inputRow}>
              <span className={styles.affix}>$</span>
              <input
                id="debt-balance"
                className={styles.input}
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={form.balance}
                onChange={set("balance")}
                required
              />
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="debt-rate">Interest Rate</label>
            <div className={styles.inputRow}>
              <input
                id="debt-rate"
                className={styles.input}
                type="number"
                min="0"
                step="0.01"
                placeholder="19.99"
                value={form.interestRate}
                onChange={set("interestRate")}
                required
              />
              <span className={styles.affix}>%</span>
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="debt-min">Minimum Payment</label>
            <div className={styles.inputRow}>
              <span className={styles.affix}>$</span>
              <input
                id="debt-min"
                className={styles.input}
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={form.minimumPayment}
                onChange={set("minimumPayment")}
                required
              />
            </div>
          </div>
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="debt-notes">
            Notes <span className={styles.optional}>(optional)</span>
          </label>
          <textarea
            id="debt-notes"
            className={styles.textarea}
            rows="2"
            placeholder="Servicer info, account numbers…"
            value={form.notes}
            onChange={set("notes")}
          />
        </div>
        <div className={styles.actions}>
          <button className={styles.submitBtn} type="submit">
            {initial ? "Save Changes →" : "Add Debt →"}
          </button>
          <button className={styles.cancelBtn} type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DebtForm;
