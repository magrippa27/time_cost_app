type TimeToMoneyTableProps = {
  monthlyIncome: number | null;
  workHoursPerDay: number | null;
};

type Row = {
  label: string;
  hours: number;
};

const rows: Row[] = [
  { label: "One hour", hours: 1 },
  { label: "One day", hours: 0 },
  { label: "One week", hours: 0 },
  { label: "One month", hours: 0 },
  { label: "One year", hours: 0 },
];

function formatCurrency(amount: number | null) {
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

export default function TimeToMoneyTable({ monthlyIncome, workHoursPerDay }: TimeToMoneyTableProps) {
  const baseMonthly = monthlyIncome;
  const workHours = workHoursPerDay && workHoursPerDay > 0 ? workHoursPerDay : 8;

  if (!baseMonthly) {
    return (
      <div className="mt-8 mb-16 flex flex-col items-center text-center text-sm text-neutral-500">
        <p>We could not calculate your time-cost because the monthly income values were not valid.</p>
      </div>
    );
  }

  const monthlyWorkHours = workHours * 5 * 4.33;
  const hourlyRate = monthlyWorkHours > 0 ? baseMonthly / monthlyWorkHours : 0;

  const effectiveRows: Row[] = [
    { label: "One hour", hours: 1 },
    { label: "One day", hours: workHours },
    { label: "One week", hours: workHours * 5 },
    { label: "One month", hours: workHours * 5 * 4.33 },
    { label: "One year", hours: workHours * 5 * 52 },
  ];

  return (
    <div className="mb-20 flex flex-col items-center gap-8">
      <div className="flex items-center gap-6 text-4xl md:text-5xl text-neutral-900">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 bg-white">
          ⏳
        </span>
        <span className="text-3xl">→</span>
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 bg-white">
          💰
        </span>
      </div>
      <div className="w-full max-w-[560px] rounded-xl border border-neutral-200 bg-white shadow-sm px-6 py-4">
        <div className="flex flex-col gap-3">
          {effectiveRows.map((row) => {
            const amount = hourlyRate > 0 ? hourlyRate * row.hours : null;

            return (
              <div key={row.label} className="flex items-baseline justify-between gap-4 border-b last:border-b-0 border-neutral-100 py-2">
                <span className="text-sm md:text-base text-neutral-600">{row.label}</span>
                <span className="text-sm md:text-base font-semibold text-neutral-900">
                  {formatCurrency(amount)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

