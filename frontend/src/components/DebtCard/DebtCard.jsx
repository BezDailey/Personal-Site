import React, { useState } from "react";
import styles from "./DebtCard.module.css";
import { fmt$, fmtMonth } from "../../utils/projections";

const ownerLabel = (owners) => {
  if (!owners || owners.length === 0) return null;
  return owners.length === 1 ? owners[0] : owners.join(" & ");
};

const DebtCard = ({ debt, projection, priority, showOwner, onPay, onEdit, onDelete, onAutopay }) => {
  const [showPayments, setShowPayments] = useState(false);
  const progress = debt.originalBalance > 0
    ? Math.min(100, Math.round(((debt.originalBalance - debt.balance) / debt.originalBalance) * 100))
    : 0;

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.info}>
          <div className={styles.badges}>
            {priority === 1 && <span className={styles.priorityBadge}>Priority Target</span>}
            {debt.autopay?.enabled && (
              <span className={styles.autopayBadge}>
                Autopay {fmt$(debt.autopay.amount)}/mo · Day {debt.autopay.dayOfMonth}
              </span>
            )}
            {showOwner && ownerLabel(debt.owners) && (
              <span className={styles.ownerBadge}>{ownerLabel(debt.owners)}</span>
            )}
          </div>
          <h3 className={styles.name}>{debt.name}</h3>
          <p className={styles.meta}>
            {debt.interestRate}% APR · Min {fmt$(debt.minimumPayment)}/mo
          </p>
          {debt.notes && <p className={styles.notes}>{debt.notes}</p>}
        </div>
        <div className={styles.balanceBlock}>
          <span className={styles.balance}>{fmt$(debt.balance)}</span>
          <span className={styles.original}>of {fmt$(debt.originalBalance)}</span>
        </div>
      </div>

      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
      <p className={styles.progressLabel}>{progress}% paid off</p>

      {projection && (
        <div className={styles.projection}>
          <span>Payoff: <strong>{fmtMonth(projection.payoffDate)}</strong></span>
          <span>Est. interest: <strong>{fmt$(projection.totalInterest)}</strong></span>
        </div>
      )}

      <div className={styles.actions}>
        <button className={styles.actionBtn} onClick={onPay} type="button">Log Payment →</button>
        <button className={styles.actionBtn} onClick={onAutopay} type="button">
          {debt.autopay?.enabled ? "Autopay ✓" : "Autopay"}
        </button>
        <button className={styles.actionBtn} onClick={onEdit} type="button">Edit</button>
        <button
          className={`${styles.actionBtn} ${styles.danger}`}
          onClick={() => onDelete(debt.id)}
          type="button"
        >
          Delete
        </button>
        {debt.payments.length > 0 && (
          <button
            className={styles.actionBtn}
            onClick={() => setShowPayments((p) => !p)}
            type="button"
          >
            {showPayments ? "Hide" : `Payments (${debt.payments.length})`}
          </button>
        )}
      </div>

      {showPayments && (
        <div className={styles.payments}>
          {[...debt.payments].reverse().map((p) => (
            <div key={p.id} className={styles.paymentRow}>
              <span className={styles.paymentDate}>{p.date}</span>
              <span className={styles.paymentAmount}>{fmt$(p.amount)}</span>
              {p.note && <span className={styles.paymentNote}>{p.note}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DebtCard;
