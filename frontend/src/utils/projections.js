/**
 * Simulates debt payoff month-by-month using snowball or avalanche strategy.
 * Returns projected interest totals, payoff dates, and payoff order for each debt.
 * @param {Array<{id: string, balance: number, interestRate: number, minimumPayment: number}>} debts - Debt accounts.
 * @param {"snowball"|"avalanche"} strategy - Payoff strategy (lowest balance first or highest rate first).
 * @param {number} extraPayment - Additional monthly payment applied to the priority target.
 * @param {number} [lumpSum=0] - One-time lump-sum payment applied before simulation starts.
 * @param {string|null} [lumpSumDebtId=null] - Debt ID to receive the lump sum; defaults to priority target.
 * @returns {Array<{id: string, totalInterest: number, payoffDate: Date|null, payoffOrder: number}>}
 */
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

/**
 * Formats a number as a USD currency string with no decimal places.
 * @param {number} n - Amount in dollars.
 * @returns {string} Formatted string (e.g. "$1,234").
 */
export function fmt$(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

/**
 * Formats a date as "Mon YYYY" (e.g. "Jan 2026"). Returns "—" for falsy input.
 * @param {Date|string|null} date - Date to format.
 * @returns {string}
 */
export function fmtMonth(date) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}
