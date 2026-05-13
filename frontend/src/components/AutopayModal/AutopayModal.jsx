import React, { useState } from "react";
import styles from "./AutopayModal.module.css";

const AutopayModal = ({ debt, onSubmit, onClose }) => {
  const ap = debt.autopay || {};
  const [enabled, setEnabled] = useState(ap.enabled || false);
  const [amount, setAmount] = useState(ap.amount ?? debt.minimumPayment ?? "");
  const [dayOfMonth, setDayOfMonth] = useState(ap.dayOfMonth ?? "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ enabled, amount: parseFloat(amount), dayOfMonth: parseInt(dayOfMonth) });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Autopay Settings</h2>
            <p className={styles.sub}>{debt.name}</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose} type="button">✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.toggleRow}>
            <label className={styles.toggleLabel} htmlFor="autopay-enabled">
              Enable Autopay
            </label>
            <input
              id="autopay-enabled"
              type="checkbox"
              className={styles.checkbox}
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
            />
          </div>

          {enabled && (
            <>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="autopay-amount">Amount per month</label>
                <div className={styles.inputRow}>
                  <span className={styles.affix}>$</span>
                  <input
                    id="autopay-amount"
                    className={styles.input}
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="autopay-day">Day of month</label>
                <input
                  id="autopay-day"
                  className={styles.inputPlain}
                  type="number"
                  min="1"
                  max="28"
                  placeholder="1"
                  value={dayOfMonth}
                  onChange={(e) => setDayOfMonth(e.target.value)}
                  required
                />
                <p className={styles.hint}>Use 1–28 to avoid end-of-month issues</p>
              </div>
            </>
          )}

          <div className={styles.actions}>
            <button className={styles.submitBtn} type="submit">Save →</button>
            <button className={styles.cancelBtn} type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AutopayModal;
