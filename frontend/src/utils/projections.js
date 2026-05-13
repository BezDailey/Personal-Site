export function computeProjections(debts, strategy, extraPayment, lumpSum = 0, lumpSumDebtId = null) {
  if (!debts.length) return [];

  const working = debts.map((d) => ({
    id: d.id,
    balance: Math.max(0, d.balance),
    monthlyRate: d.interestRate / 100 / 12,
    minimumPayment: d.minimumPayment,
    totalInterest: 0,
    payoffDate: null,
  }));

  // Apply lump sum immediately to the chosen debt (or priority target if none chosen)
  if (lumpSum > 0) {
    const target = lumpSumDebtId
      ? working.find((d) => d.id === lumpSumDebtId)
      : null;
    if (target) {
      target.balance = Math.max(0, target.balance - lumpSum);
    }
  }

  const priority = [...working];
  if (strategy === "avalanche") {
    priority.sort((a, b) => b.monthlyRate - a.monthlyRate);
  } else {
    priority.sort((a, b) => a.balance - b.balance);
  }

  const paidOffOrder = [];
  let extraPool = Number(extraPayment) || 0;
  const now = new Date();
  now.setDate(1);

  let month = 0;
  while (priority.some((d) => d.balance > 0.005) && month < 600) {
    month++;

    for (const d of working) {
      if (d.balance > 0.005) {
        const interest = d.balance * d.monthlyRate;
        d.balance += interest;
        d.totalInterest += interest;
      }
    }

    const target = priority.find((d) => d.balance > 0.005);

    for (const d of priority) {
      if (d.balance <= 0.005) continue;
      const payment =
        d === target
          ? Math.min(d.balance, d.minimumPayment + extraPool)
          : Math.min(d.balance, d.minimumPayment);
      d.balance -= payment;
      if (d.balance < 0.005) d.balance = 0;

      if (d.balance === 0 && !d.payoffDate) {
        const payoffDate = new Date(now);
        payoffDate.setMonth(payoffDate.getMonth() + month);
        d.payoffDate = payoffDate;
        paidOffOrder.push(d.id);
        extraPool += d.minimumPayment;
      }
    }
  }

  return working.map((d) => ({
    id: d.id,
    totalInterest: Math.round(d.totalInterest * 100) / 100,
    payoffDate: d.payoffDate,
    payoffOrder: paidOffOrder.indexOf(d.id) + 1,
  }));
}

export function fmt$(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function fmtMonth(date) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}
