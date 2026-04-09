import { formatCurrency, hourlyRateFromMonthly, netFromGross, timeBucketRows } from "../timeCostMoney";

type TaxBreakdownTableProps = {
  monthlyIncome: number | null;
  workHoursPerDay: number | null;
  taxRate: number;
};

export default function TaxBreakdownTable({ monthlyIncome, workHoursPerDay, taxRate }: TaxBreakdownTableProps) {
  const baseMonthly = monthlyIncome;
  const workHours = workHoursPerDay && workHoursPerDay > 0 ? workHoursPerDay : 8;
  const safeRate = Number.isFinite(taxRate) ? Math.min(1, Math.max(0, taxRate)) : 0;

  if (!baseMonthly) {
    return (
      <div className="rounded-xl border border-border/80 bg-muted/50 px-5 py-6 text-center ring-1 ring-neutral-950/[0.03] dark:ring-neutral-100/[0.06]">
        <p className="m-0 text-sm text-text-default-default">Add a valid monthly income to see gross vs after-tax amounts.</p>
      </div>
    );
  }

  const hourlyRate = hourlyRateFromMonthly(baseMonthly, workHours);
  const effectiveRows = timeBucketRows(workHours);
  const taxPctLabel = `${(safeRate * 100).toFixed(0)}%`;

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border/90 bg-card shadow-md shadow-neutral-950/5 ring-1 ring-neutral-950/[0.04] dark:shadow-neutral-950/20 dark:ring-neutral-100/[0.06]">
      <div className="border-b border-neutral-100 bg-gradient-to-br from-neutral-50/80 to-white px-5 py-4 sm:px-6">
        <div className="border-l-[3px] border-neutral-900/15 pl-4">
          <p className="m-0 text-sm font-medium text-foreground">Gross vs after-tax (same time windows)</p>
          <p className="m-0 mt-1 text-xs text-text-default-default">
            Illustrative net uses the estimated top PIT rate ({taxPctLabel} of gross in this model).
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] border-collapse text-left">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50/60">
              <th scope="col" className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-text-default-default sm:px-6">
                Period
              </th>
              <th scope="col" className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider text-text-default-default">
                Gross
              </th>
              <th scope="col" className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-text-default-default sm:px-6">
                After tax
              </th>
            </tr>
          </thead>
          <tbody>
            {effectiveRows.map((row) => {
              const gross = hourlyRate > 0 ? hourlyRate * row.hours : null;
              const net = gross != null ? netFromGross(gross, safeRate) : null;

              return (
                <tr key={row.label} className="border-b border-neutral-100 last:border-b-0 transition-colors hover:bg-neutral-50/50">
                  <th scope="row" className="px-5 py-3.5 text-sm font-medium text-text-default-default sm:px-6">
                    {row.label}
                  </th>
                  <td className="px-3 py-3.5 text-right text-sm font-semibold tabular-nums text-foreground">
                    {formatCurrency(gross)}
                  </td>
                  <td className="px-5 py-3.5 text-right text-sm font-semibold tabular-nums text-foreground sm:px-6">
                    {formatCurrency(net)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
