type TaxBreakdownTableProps = {
  monthlyIncome: number | null;
  workHoursPerDay: number | null;
};

type Row = {
  label: string;
  hours: number;
};

const TAX_RATE = 0.3;

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

export default function TaxBreakdownTable({ monthlyIncome, workHoursPerDay }: TaxBreakdownTableProps) {
  const baseMonthly = monthlyIncome;
  const workHours = workHoursPerDay && workHoursPerDay > 0 ? workHoursPerDay : 8;

  if (!baseMonthly) {
    return null;
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
    <div className="w-full max-w-[900px] rounded-2xl border border-neutral-200 bg-white shadow-sm px-8 py-6">
      <div className="grid grid-cols-[minmax(0,1.4fr)_auto_minmax(0,1.4fr)] gap-6 items-stretch">
        <div className="flex flex-col gap-3">
          {effectiveRows.map((row) => {
            const gross = hourlyRate > 0 ? hourlyRate * row.hours : null;

            return (
              <div key={row.label} className="flex items-baseline justify-between gap-4 border-b last:border-b-0 border-neutral-100 py-2">
                <span className="text-sm md:text-base text-neutral-600">{row.label}</span>
                <span className="text-sm md:text-base font-semibold text-neutral-900">
                  {formatCurrency(gross)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex items-center justify-center gap-2 text-3xl">
            <span>✂️</span>
          </div>
          <div className="h-32 w-px border-l-2 border-dashed border-neutral-400" />
        </div>

        <div className="flex flex-col gap-3">
          {effectiveRows.map((row) => {
            const gross = hourlyRate > 0 ? hourlyRate * row.hours : null;
            const net = gross && gross > 0 ? gross * (1 - TAX_RATE) : null;

            return (
              <div key={row.label} className="flex items-baseline justify-between gap-4 border-b last:border-b-0 border-neutral-100 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">🤲</span>
                  <span className="text-sm md:text-base text-neutral-600">After taxes</span>
                </div>
                <span className="text-sm md:text-base font-semibold text-neutral-900">
                  {formatCurrency(net)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

