import React, { useState, useEffect } from "react";
import styles from "./DebtForm.module.css";

const EMPTY = { name: "", balance: "", interestRate: "", minimumPayment: "", notes: "", owners: [] };

const OWNERS = ["Jabez", "August"];

const DebtForm = ({ initial, onSubmit, onCancel, presetOwners }) => {
  const buildForm = (src) => src
    ? { ...src, owners: src.owners || [] }
    : { ...EMPTY, owners: presetOwners || [] };

  const [form, setForm] = useState(() => buildForm(initial));
  const [ownersError, setOwnersError] = useState(false);

  useEffect(() => {
    setForm(buildForm(initial));
    setOwnersError(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const toggleOwner = (name) => {
    setOwnersError(false);
    setForm((f) => ({
      ...f,
      owners: f.owners.includes(name)
        ? f.owners.filter((o) => o !== name)
        : [...f.owners, name],
    }));
  };

  const suggestedMin = (() => {
    const bal = parseFloat(form.balance);
    const rate = parseFloat(form.interestRate);
    if (!bal || !rate || bal <= 0 || rate <= 0) return null;
    const monthlyInterest = bal * (rate / 100 / 12);
    const suggested = Math.max(10, bal * 0.01 + monthlyInterest);
    return suggested.toFixed(2);
  })();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.owners.length === 0) {
      setOwnersError(true);
      return;
    }
    onSubmit({
      name: form.name,
      balance: parseFloat(form.balance),
      interestRate: parseFloat(form.interestRate),
      minimumPayment: parseFloat(form.minimumPayment),
      notes: form.notes,
      owners: form.owners,
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
                placeholder={suggestedMin ? `~${suggestedMin} (est.)` : "0.00"}
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
        <div className={styles.field}>
          <span className={`${styles.label} ${ownersError ? styles.labelError : ""}`}>
            Owned by {ownersError && <span className={styles.errorHint}>— select at least one</span>}
          </span>
          <div className={styles.ownerRow}>
            {OWNERS.map((name) => (
              <label key={name} className={styles.ownerLabel}>
                <input
                  type="checkbox"
                  className={styles.ownerCheck}
                  checked={form.owners.includes(name)}
                  onChange={() => toggleOwner(name)}
                />
                {name}
              </label>
            ))}
          </div>
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
