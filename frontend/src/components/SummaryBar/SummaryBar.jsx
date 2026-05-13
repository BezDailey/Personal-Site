import React from "react";
import styles from "./SummaryBar.module.css";
import { fmt$, fmtMonth } from "../../utils/projections";

const SummaryBar = ({ debts, projections }) => {
  const totalOwed = debts.reduce((s, d) => s + d.balance, 0);
  const monthlyMin = debts.reduce((s, d) => s + d.minimumPayment, 0);
  const totalInterest = projections.reduce((s, p) => s + p.totalInterest, 0);
  const eliminated = debts.reduce((s, d) => s + Math.max(0, d.originalBalance - d.balance), 0);

  const lastPayoff = projections.reduce((latest, p) => {
    if (!p.payoffDate) return latest;
    const d = new Date(p.payoffDate);
    return !latest || d > latest ? d : latest;
  }, null);

  const monthsToFreedom = lastPayoff
    ? Math.max(0, (lastPayoff.getFullYear() - new Date().getFullYear()) * 12 +
        (lastPayoff.getMonth() - new Date().getMonth()))
    : null;

  return (
    <div className={styles.wrapper}>
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

      {monthsToFreedom !== null && (
        <div className={styles.countdown}>
          <div className={styles.countdownHero}>
            <span className={styles.countdownNumber}>{monthsToFreedom}</span>
            <span className={styles.countdownUnit}>months to freedom</span>
          </div>
          <div className={styles.countdownStats}>
            <div className={styles.countdownStat}>
              <span className={styles.countdownStatLabel}>Target</span>
              <span className={styles.countdownStatValue}>{fmtMonth(lastPayoff)}</span>
            </div>
            <div className={styles.countdownStat}>
              <span className={styles.countdownStatLabel}>Eliminated</span>
              <span className={styles.countdownStatValue}>{fmt$(eliminated)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryBar;
