import { formatCurrency, hourlyRateFromMonthly, timeBucketRows } from "../timeCostMoney";

type TimeToMoneyTableProps = {
  monthlyIncome: number | null;
  workHoursPerDay: number | null;
};

export default function TimeToMoneyTable({ monthlyIncome, workHoursPerDay }: TimeToMoneyTableProps) {
  const baseMonthly = monthlyIncome;
  const workHours = workHoursPerDay && workHoursPerDay > 0 ? workHoursPerDay : 8;

  if (!baseMonthly) {
    return (
      <div className="w-full max-w-xl rounded-2xl border border-border/80 bg-muted/50 px-6 py-8 text-center ring-1 ring-neutral-950/[0.03] dark:ring-neutral-100/[0.06]">
        <p className="m-0 text-sm leading-relaxed text-text-default-default">
          We couldn&apos;t calculate time-to-money because monthly income wasn&apos;t valid. Add a positive income above to see
          implied earnings by time period.
        </p>
      </div>
    );
  }

  const hourlyRate = hourlyRateFromMonthly(baseMonthly, workHours);
  const effectiveRows = timeBucketRows(workHours);

  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div className="overflow-hidden rounded-xl border border-border/90 bg-card shadow-md shadow-neutral-950/5 ring-1 ring-neutral-950/[0.04] dark:shadow-neutral-950/20 dark:ring-neutral-100/[0.06]">
        <div className="border-b border-neutral-100 bg-gradient-to-br from-neutral-50/80 to-white px-5 py-5 sm:px-6">
          <p className="m-0 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">Implied gross rate</p>
          <div className="mt-3 border-l-[3px] border-neutral-900/15 pl-4">
            <p className="m-0 text-2xl font-semibold tracking-tight text-foreground tabular-nums sm:text-3xl">
              {formatCurrency(hourlyRate)}
              <span className="text-lg font-medium text-text-default-default sm:text-xl"> / hour</span>
            </p>
            <p className="mt-2 m-0 max-w-md text-sm leading-snug text-text-default-default">
              From your gross monthly income, using a typical month of work hours ({workHours}h × 5 days × ~4.33 weeks).
            </p>
          </div>
        </div>

        <div className="px-0 pb-1 pt-0">
          <p className="border-b border-neutral-100 px-5 py-3 text-xs font-medium text-text-default-default sm:px-6">
            What that time is worth at longer scales
          </p>
          <dl className="divide-y divide-neutral-100">
            {effectiveRows.map((row) => {
              const amount = hourlyRate > 0 ? hourlyRate * row.hours : null;

              return (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-neutral-50/60 sm:px-6"
                >
                  <dt className="text-sm font-medium text-text-default-default">{row.label}</dt>
                  <dd className="text-base font-semibold tabular-nums text-foreground">{formatCurrency(amount)}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </div>
  );
}
