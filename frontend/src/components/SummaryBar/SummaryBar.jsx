import React from "react";
import styles from "./SummaryBar.module.css";
import { fmt$, fmtMonth } from "../../utils/projections";

const SummaryBar = ({ debts, projections }) => {
  const totalOwed = debts.reduce((s, d) => s + d.balance, 0);
  const monthlyMin = debts.reduce((s, d) => s + d.minimumPayment, 0);
  const totalInterest = projections.reduce((s, p) => s + p.totalInterest, 0);
  const lastPayoff = projections.reduce((latest, p) => {
    if (!p.payoffDate) return latest;
    const d = new Date(p.payoffDate);
    return !latest || d > latest ? d : latest;
  }, null);

  return (
    <div className={styles.bar}>
      <div className={styles.item}>
        <span className={styles.label}>Total Owed</span>
        <span className={styles.value}>{fmt$(totalOwed)}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>Est. Interest</span>
        <span className={styles.value}>{fmt$(totalInterest)}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>Debt-Free By</span>
        <span className={styles.value}>{fmtMonth(lastPayoff)}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>Monthly Min</span>
        <span className={styles.value}>{fmt$(monthlyMin)}</span>
      </div>
    </div>
  );
};

export default SummaryBar;
