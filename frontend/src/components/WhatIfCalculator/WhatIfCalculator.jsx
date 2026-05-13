import React, { useState, useMemo } from "react";
import styles from "./WhatIfCalculator.module.css";
import { computeProjections, fmt$, fmtMonth } from "../../utils/projections";

const WhatIfCalculator = ({ debts, settings }) => {
  const [extra, setExtra] = useState(0);

  const baseProjections = useMemo(
    () => computeProjections(debts, settings.strategy, settings.extraPayment),
    [debts, settings]
  );

  const whatIfProjections = useMemo(
    () => computeProjections(debts, settings.strategy, settings.extraPayment + extra),
    [debts, settings, extra]
  );

  const baseInterest = baseProjections.reduce((s, p) => s + p.totalInterest, 0);
  const whatIfInterest = whatIfProjections.reduce((s, p) => s + p.totalInterest, 0);

  const basePayoff = baseProjections.reduce((latest, p) => {
    if (!p.payoffDate) return latest;
    const d = new Date(p.payoffDate);
    return !latest || d > latest ? d : latest;
  }, null);

  const whatIfPayoff = whatIfProjections.reduce((latest, p) => {
    if (!p.payoffDate) return latest;
    const d = new Date(p.payoffDate);
    return !latest || d > latest ? d : latest;
  }, null);

  const savedInterest = baseInterest - whatIfInterest;

  const monthsDiff = basePayoff && whatIfPayoff
    ? (basePayoff.getFullYear() - whatIfPayoff.getFullYear()) * 12 +
      (basePayoff.getMonth() - whatIfPayoff.getMonth())
    : 0;

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>What If I Pay More?</h2>
      <div className={styles.sliderRow}>
        <span className={styles.sliderLabel}>Extra monthly payment</span>
        <span className={styles.sliderValue}>{fmt$(extra)}</span>
      </div>
      <input
        className={styles.slider}
        type="range"
        min="0"
        max="1000"
        step="25"
        value={extra}
        onChange={(e) => setExtra(Number(e.target.value))}
      />
      <div className={styles.ticks}>
        <span>$0</span>
        <span>$1,000</span>
      </div>

      {extra > 0 && debts.length > 0 && (
        <div className={styles.result}>
          <div className={styles.resultItem}>
            <span className={styles.resultLabel}>New debt-free date</span>
            <span className={styles.resultValue}>{fmtMonth(whatIfPayoff)}</span>
          </div>
          <div className={styles.resultItem}>
            <span className={styles.resultLabel}>Months saved</span>
            <span className={styles.resultValue}>{monthsDiff > 0 ? `${monthsDiff} months` : "—"}</span>
          </div>
          <div className={styles.resultItem}>
            <span className={styles.resultLabel}>Interest saved</span>
            <span className={styles.resultValue}>{fmt$(savedInterest)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatIfCalculator;
