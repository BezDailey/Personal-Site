import React, { useState } from "react";
import styles from "./PaymentModal.module.css";

const PaymentModal = ({ debt, onSubmit, onClose }) => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ amount: parseFloat(amount), date, note });
    setAmount("");
    setNote("");
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Log Payment</h2>
            <p className={styles.sub}>{debt.name}</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose} type="button">✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="pay-amount">Amount</label>
            <div className={styles.inputRow}>
              <span className={styles.affix}>$</span>
              <input
                id="pay-amount"
                className={styles.input}
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="pay-date">Date</label>
            <input
              id="pay-date"
              className={styles.inputPlain}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="pay-note">
              Note <span className={styles.optional}>(optional)</span>
            </label>
            <input
              id="pay-note"
              className={styles.inputPlain}
              type="text"
              placeholder="Tax refund, bonus…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className={styles.actions}>
            <button className={styles.submitBtn} type="submit">Log Payment →</button>
            <button className={styles.cancelBtn} type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
