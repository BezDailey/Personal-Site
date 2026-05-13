import React, { useState, useEffect, useMemo } from "react";
import styles from "./DebtTracker.module.css";
import { computeProjections } from "../../utils/projections";
import SummaryBar from "../../components/SummaryBar/SummaryBar";
import StrategySettings from "../../components/StrategySettings/StrategySettings";
import DebtCard from "../../components/DebtCard/DebtCard";
import DebtForm from "../../components/DebtForm/DebtForm";
import PaymentModal from "../../components/PaymentModal/PaymentModal";
import WhatIfCalculator from "../../components/WhatIfCalculator/WhatIfCalculator";
import AutopayModal from "../../components/AutopayModal/AutopayModal";

const DebtTracker = () => {
  const [debts, setDebts] = useState([]);
  const [settings, setSettings] = useState({ strategy: "avalanche", extraPayment: 0 });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingDebt, setEditingDebt] = useState(null);
  const [payingDebt, setPayingDebt] = useState(null);
  const [autopayDebt, setAutopayDebt] = useState(null);

  useEffect(() => {
    fetch("/api/debts")
      .then((r) => r.json())
      .then((data) => {
        setDebts(data.debts || []);
        setSettings(data.settings || { strategy: "avalanche", extraPayment: 0 });
        setLoading(false);
      });
  }, []);

  const projections = useMemo(
    () => computeProjections(debts, settings.strategy, settings.extraPayment),
    [debts, settings]
  );

  const projectionMap = useMemo(() => {
    const map = {};
    projections.forEach((p) => { map[p.id] = p; });
    return map;
  }, [projections]);

  const priorityId = useMemo(() => {
    const sorted = [...debts].sort((a, b) =>
      settings.strategy === "avalanche"
        ? b.interestRate - a.interestRate
        : a.balance - b.balance
    );
    return sorted.find((d) => d.balance > 0)?.id;
  }, [debts, settings.strategy]);

  const handleSaveSettings = async (newSettings) => {
    const updated = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSettings),
    }).then((r) => r.json());
    setSettings(updated);
  };

  const handleAddDebt = async (data) => {
    const debt = await fetch("/api/debts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json());
    setDebts((prev) => [...prev, debt]);
    setShowForm(false);
  };

  const handleEditDebt = async (data) => {
    const updated = await fetch(`/api/debts/${editingDebt.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json());
    setDebts((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
    setEditingDebt(null);
  };

  const handleDeleteDebt = async (id) => {
    if (!window.confirm("Delete this debt?")) return;
    await fetch(`/api/debts/${id}`, { method: "DELETE" });
    setDebts((prev) => prev.filter((d) => d.id !== id));
  };

  const handleSaveAutopay = async ({ enabled, amount, dayOfMonth }) => {
    const updated = await fetch(`/api/debts/${autopayDebt.id}/autopay`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled, amount, dayOfMonth }),
    }).then((r) => r.json());
    setDebts((prev) =>
      prev.map((d) =>
        d.id === autopayDebt.id ? { ...d, autopay: updated } : d
      )
    );
    setAutopayDebt(null);
  };

  const handleLogPayment = async ({ amount, date, note }) => {
    const result = await fetch(`/api/debts/${payingDebt.id}/payments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, date, note }),
    }).then((r) => r.json());
    setDebts((prev) =>
      prev.map((d) =>
        d.id === payingDebt.id
          ? { ...d, balance: result.newBalance, payments: [...d.payments, result.payment] }
          : d
      )
    );
    setPayingDebt(null);
  };

  if (loading) return <p className={styles.loading}>Loading…</p>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.label}>— Debt Tracker</span>
        <h1 className={styles.title}>Payoff Planner</h1>
        <p className={styles.subtitle}>Track debts, choose a strategy, and visualize your path to freedom</p>
      </div>

      {debts.length > 0 && (
        <SummaryBar debts={debts} projections={projections} />
      )}

      <StrategySettings settings={settings} onSave={handleSaveSettings} />

      <div className={styles.debts}>
        {debts.map((debt) => (
          <DebtCard
            key={debt.id}
            debt={debt}
            projection={projectionMap[debt.id]}
            priority={debt.id === priorityId ? 1 : 0}
            onPay={() => setPayingDebt(debt)}
            onAutopay={() => setAutopayDebt(debt)}
            onEdit={() => { setEditingDebt(debt); setShowForm(false); }}
            onDelete={handleDeleteDebt}
          />
        ))}

        {debts.length === 0 && !showForm && (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>No debts yet</p>
            <p className={styles.emptySub}>Add your first debt below to start planning your payoff.</p>
          </div>
        )}
      </div>

      {editingDebt ? (
        <DebtForm
          initial={editingDebt}
          onSubmit={handleEditDebt}
          onCancel={() => setEditingDebt(null)}
        />
      ) : showForm ? (
        <DebtForm
          onSubmit={handleAddDebt}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <button className={styles.addBtn} onClick={() => setShowForm(true)} type="button">
          + Add Debt
        </button>
      )}

      {debts.length > 0 && (
        <WhatIfCalculator debts={debts} settings={settings} />
      )}

      {payingDebt && (
        <PaymentModal
          debt={payingDebt}
          onSubmit={handleLogPayment}
          onClose={() => setPayingDebt(null)}
        />
      )}

      {autopayDebt && (
        <AutopayModal
          debt={autopayDebt}
          onSubmit={handleSaveAutopay}
          onClose={() => setAutopayDebt(null)}
        />
      )}
    </div>
  );
};

export default DebtTracker;
