import { useAppearance } from '@/hooks/use-appearance';

type TaxTimeSectionProps = {
  taxPortionOfYear?: number;
  workHoursPerDay?: number;
};

const defaultTaxPortion = 7 / 12;

function getTaxSectorPath(portion: number) {
  const safePortion = portion > 0 && portion < 1 ? portion : defaultTaxPortion;
  const startAngle = 0;
  const endAngle = 2 * Math.PI * safePortion;
  const radius = 48;
  const cx = 50;
  const cy = 50;

  const x1 = cx + radius * Math.sin(startAngle);
  const y1 = cy - radius * Math.cos(startAngle);
  const x2 = cx + radius * Math.sin(endAngle);
  const y2 = cy - radius * Math.cos(endAngle);

  const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

  return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
}

const panelClass =
  "rounded-xl border border-border/90 bg-card px-5 py-5 shadow-md shadow-neutral-950/5 ring-1 ring-neutral-950/[0.04] sm:px-6 dark:shadow-neutral-950/20 dark:ring-neutral-100/[0.06]";

const proseClass = "m-0 text-base leading-relaxed text-foreground/90 md:text-lg";

export default function TaxTimeSection({ taxPortionOfYear, workHoursPerDay }: TaxTimeSectionProps) {
  const { resolvedAppearance } = useAppearance();
  const isDark = resolvedAppearance === 'dark';
  const tickMuted = isDark ? '#94a3b8' : '#1f2937';
  const dialFill = isDark ? '#1e293b' : '#fafafa';
  const portion =
    taxPortionOfYear !== undefined && taxPortionOfYear > 0 && taxPortionOfYear < 1
      ? taxPortionOfYear
      : defaultTaxPortion;

  const workHours = workHoursPerDay !== undefined && workHoursPerDay > 0 ? workHoursPerDay : 8;
  const taxHoursDay = workHours * portion;

  const workdayBlocks = 12;
  const taxedBlocksDay = Math.min(workdayBlocks, Math.max(0, Math.round(workdayBlocks * portion)));

  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const taxedDaysWeek = Math.min(5, Math.max(0, Math.round(5 * portion)));

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const taxedMonthsYear = Math.min(12, Math.max(0, Math.round(12 * portion)));

  const taxSectorPath = getTaxSectorPath(portion);

  return (
    <div className="flex w-full flex-col gap-12 sm:gap-14">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10">
        <div className="rounded-xl border border-border bg-muted/40 px-5 py-5 ring-1 ring-neutral-950/[0.02] sm:px-6 dark:ring-neutral-100/[0.04]">
          <p className={proseClass}>
            On a typical workday, you spend part of your time working only to pay taxes. At roughly {(portion * 100).toFixed(0)}%
            of your pay going to income tax in this model, that is about {taxHoursDay.toFixed(1)} hours of a {workHours}-hour
            workday for taxes, and the rest for yourself.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-[5px] border-neutral-800/90 bg-card shadow-md ring-1 ring-neutral-950/10 dark:border-neutral-400/50">
            <svg viewBox="0 0 100 100" className="h-28 w-28 text-muted-foreground">
              <circle cx="50" cy="50" r="48" fill={dialFill} stroke="currentColor" strokeWidth="1.5" />
              <path d={taxSectorPath} fill="#fecaca" fillOpacity="0.85" />
              {Array.from({ length: 12 }).map((_, index) => {
                const angle = (index / 12) * 2 * Math.PI;
                const innerRadius = index % 3 === 0 ? 38 : 42;
                const outerRadius = 46;
                const x1 = 50 + innerRadius * Math.sin(angle);
                const y1 = 50 - innerRadius * Math.cos(angle);
                const x2 = 50 + outerRadius * Math.sin(angle);
                const y2 = 50 - outerRadius * Math.cos(angle);

                return (
                  <g key={index}>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={index < taxedBlocksDay ? '#dc2626' : tickMuted}
                      strokeWidth={index % 3 === 0 ? 2 : 1}
                    />
                    <text
                      x={50 + 32 * Math.sin(angle)}
                      y={50 - 32 * Math.cos(angle) + 2}
                      textAnchor="middle"
                      fontSize="6"
                      fill={tickMuted}
                    >
                      {index === 0 ? 12 : index}
                    </text>
                  </g>
                );
              })}
              <line x1="50" y1="50" x2="50" y2="22" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <line x1="50" y1="50" x2="78" y2="50" stroke={tickMuted} strokeWidth="2" strokeLinecap="round" />
              <circle cx="50" cy="50" r="3" fill={tickMuted} />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1.1fr)] lg:gap-10">
        <div className="rounded-xl border border-border bg-muted/40 px-5 py-5 ring-1 ring-neutral-950/[0.02] sm:px-6 dark:ring-neutral-100/[0.04]">
          <p className={proseClass}>
            Over a full week, this becomes clearer.{" "}
            {taxedDaysWeek < 1 ? (
              <>In this illustration, almost none of the Monday–Friday workweek maps to taxes.</>
            ) : (
              <>
                On a five-day workweek, that is roughly {taxedDaysWeek} of 5 weekdays (Monday–Friday) spent only to pay taxes in
                this model,
              </>
            )}{" "}
            before you start working for your own needs.
          </p>
        </div>
        <div className="flex justify-center">
          <div className={`${panelClass} w-full max-w-sm`}>
            <div className="mb-4 border-b border-border pb-2 text-center text-sm font-semibold text-foreground">
              This week
            </div>
            <div className="grid grid-cols-7 gap-1.5 text-xs sm:gap-2">
              {weekDays.map((day, index) => {
                const isWeekday = index < 5;
                const isTaxed = isWeekday && index < taxedDaysWeek;

                return (
                  <div
                    key={day}
                    className={`flex h-10 flex-col items-center justify-center rounded-lg border text-[11px] font-medium ${
                      isTaxed
                        ? "border-rose-200/90 bg-rose-50 text-rose-800"
                        : "border-border/90 bg-muted/80 text-muted-foreground"
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1.1fr)] lg:gap-10">
        <div className="rounded-xl border border-border bg-muted/40 px-5 py-5 ring-1 ring-neutral-950/[0.02] sm:px-6 dark:ring-neutral-100/[0.04]">
          <p className={proseClass}>
            Across an entire year, the effect is even stronger.{" "}
            {taxedMonthsYear < 1 ? (
              <>In this illustration, almost none of the calendar year maps to taxes.</>
            ) : (
              <>
                It is comparable to spending roughly the first {taxedMonthsYear} month{taxedMonthsYear === 1 ? "" : "s"} of the
                year only to pay taxes.
              </>
            )}
          </p>
        </div>
        <div className="flex justify-center">
          <div className={`${panelClass} w-full max-w-sm`}>
            <div className="mb-4 border-b border-border pb-2 text-center text-sm font-semibold text-foreground">
              Year overview
            </div>
            <div className="grid grid-cols-4 gap-1.5 text-[11px] sm:gap-2">
              {months.map((month, index) => (
                <div
                  key={month}
                  className={`flex h-9 items-center justify-center rounded-lg border font-medium ${
                    index < taxedMonthsYear
                      ? "border-rose-200/90 bg-rose-50 text-rose-800"
                      : "border-border/90 bg-muted/80 text-muted-foreground"
                  }`}
                >
                  {month}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
