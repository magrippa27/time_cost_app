export type TimeBucketRow = {
  label: string;
  hours: number;
};

export function formatCurrency(amount: number | null): string {
  if (!amount || !Number.isFinite(amount)) {
    return "–";
  }

  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return amount.toFixed(2);
  }
}

export function monthlyWorkHours(workHoursPerDay: number): number {
  const w = workHoursPerDay > 0 ? workHoursPerDay : 8;

  return w * 5 * 4.33;
}

export function hourlyRateFromMonthly(monthlyIncome: number, workHoursPerDay: number): number {
  const mwh = monthlyWorkHours(workHoursPerDay);

  return mwh > 0 ? monthlyIncome / mwh : 0;
}

export function timeBucketRows(workHoursPerDay: number): TimeBucketRow[] {
  const workHours = workHoursPerDay > 0 ? workHoursPerDay : 8;

  return [
    { label: "One hour", hours: 1 },
    { label: "One day", hours: workHours },
    { label: "One week", hours: workHours * 5 },
    { label: "One month", hours: workHours * 5 * 4.33 },
    { label: "One year", hours: workHours * 5 * 52 },
  ];
}

export function netFromGross(gross: number, taxRate: number): number | null {
  if (!Number.isFinite(gross) || gross <= 0) {
    return null;
  }

  const r = Number.isFinite(taxRate) ? Math.min(1, Math.max(0, taxRate)) : 0;

  return gross * (1 - r);
}
