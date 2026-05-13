import React, { useState } from "react";
import styles from "./StrategySettings.module.css";

const StrategySettings = ({ settings, onSave }) => {
  const [strategy, setStrategy] = useState(settings.strategy);
  const [extraPayment, setExtraPayment] = useState(settings.extraPayment);

  const handleSave = () => {
    onSave({ strategy, extraPayment: Number(extraPayment) || 0 });
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Strategy & Extra Payment</h2>
      <div className={styles.grid}>
        <div className={styles.field}>
          <label className={styles.label}>Payoff Strategy</label>
          <div className={styles.strategyRow}>
            <button
              className={`${styles.strategyBtn} ${strategy === "avalanche" ? styles.active : ""}`}
              onClick={() => setStrategy("avalanche")}
              type="button"
            >
              <span className={styles.strategyName}>Avalanche</span>
              <span className={styles.strategyDesc}>Highest rate first</span>
            </button>
            <button
              className={`${styles.strategyBtn} ${strategy === "snowball" ? styles.active : ""}`}
              onClick={() => setStrategy("snowball")}
              type="button"
            >
              <span className={styles.strategyName}>Snowball</span>
              <span className={styles.strategyDesc}>Lowest balance first</span>
            </button>
          </div>
          <p className={styles.hint}>
            {strategy === "avalanche"
              ? "Minimizes total interest paid."
              : "Pays off smallest debts first for quick wins."}
          </p>
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="extra-payment">
            Extra Monthly Payment
          </label>
          <div className={styles.inputRow}>
            <span className={styles.prefix}>$</span>
            <input
              id="extra-payment"
              className={styles.input}
              type="number"
              min="0"
              step="1"
              value={extraPayment}
              onChange={(e) => setExtraPayment(e.target.value)}
            />
          </div>
          <p className={styles.hint}>Applied on top of all minimums</p>
          <button className={styles.saveBtn} onClick={handleSave} type="button">
            Save Settings →
          </button>
        </div>
      </div>
    </div>
  );
};

export default StrategySettings;
