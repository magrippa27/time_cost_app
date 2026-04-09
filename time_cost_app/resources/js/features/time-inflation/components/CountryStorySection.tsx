import type { Ref } from "react";
import { useMemo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAppearance } from "@/hooks/use-appearance";

type CountryStorySectionProps = {
  sectionRef?: Ref<HTMLElement>;
  countryName: string;
  yearsStart: number | null;
  yearsEnd: number | null;
  usedWageSource: string | null;
  chartYears: number[];
  cpiChangePct: number | null;
  earningsChangePct: number | null;
  realChangePct: number | null;
  pastHoursForBasket: number | null;
  todayHoursForBasket: number | null;
  hoursPerDayInput: number | null;
  hoursNeededSeries: Array<number | null>;
  cpiIndex: Array<number | null>;
  earningsIndex: Array<number | null>;
  realIndex: Array<number | null>;
};

type RowDatum = {
  yearLabel: string;
  hours: number | null;
  cpiPct: number | null;
  earnPct: number | null;
  realPct: number | null;
};

const COL = { cpi: "#ea580c", earn: "#7f1d1d", real: "#5b21b6" };

function pctFromIndex(v: number | null): number | null {
  if (typeof v !== "number" || !Number.isFinite(v)) {
    return null;
  }

  return (v / 100 - 1) * 100;
}

export default function CountryStorySection({
  sectionRef,
  countryName,
  yearsStart,
  yearsEnd,
  usedWageSource,
  chartYears,
  cpiChangePct,
  earningsChangePct,
  realChangePct,
  pastHoursForBasket,
  todayHoursForBasket,
  hoursPerDayInput,
  hoursNeededSeries,
  cpiIndex,
  earningsIndex,
  realIndex,
}: CountryStorySectionProps) {
  const { resolvedAppearance } = useAppearance();
  const chartUi = useMemo(() => {
    const dark = resolvedAppearance === "dark";

    return {
      grid: dark ? "#334155" : "#e5e7eb",
      tickFill: dark ? "#cbd5e1" : "#374151",
      labelMuted: dark ? "#94a3b8" : "#6b7280",
      tooltipBg: dark ? "oklch(0.205 0 0)" : "#ffffff",
      tooltipBorder: dark ? "#475569" : "#e5e7eb",
      refStroke: dark ? "#64748b" : "#94a3b8",
      refLabel: dark ? "#94a3b8" : "#64748b",
      hours: dark ? "#cbd5e1" : "#0f172a",
    };
  }, [resolvedAppearance]);

  const n = chartYears.length;

  const chartData: RowDatum[] = useMemo(() => {
    return chartYears.map((year, i) => ({
      yearLabel: String(year),
      hours: hoursNeededSeries[i] ?? null,
      cpiPct: pctFromIndex(cpiIndex[i] ?? null),
      earnPct: pctFromIndex(earningsIndex[i] ?? null),
      realPct: pctFromIndex(realIndex[i] ?? null),
    }));
  }, [chartYears, hoursNeededSeries, cpiIndex, earningsIndex, realIndex]);

  const hasChart = n >= 2;

  const formatSignedPct = (value: number | null) => {
    if (value == null) {
      return "+—%";
    }

    return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
  };

  const formatRealPct = (value: number | null) => {
    if (value == null) {
      return "—%";
    }

    return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
  };

  const startLabel = yearsStart == null ? "—" : yearsStart.toString();
  const endLabel = yearsEnd == null ? "—" : yearsEnd.toString();

  const startHoursText = pastHoursForBasket == null ? "—" : pastHoursForBasket.toFixed(1);
  const endHoursText = todayHoursForBasket == null ? "—" : todayHoursForBasket.toFixed(1);

  const wageSourceLabel = (() => {
    if (!usedWageSource) {
      return "";
    }

    if (usedWageSource === "ILOSTAT_country") {
      return "Country wage series";
    }

    if (usedWageSource.includes("ILOSTAT_world_ref_area")) {
      return "World wage series fallback";
    }

    if (usedWageSource.includes("global_average_all_countries")) {
      return "Global average wage series fallback";
    }

    return usedWageSource;
  })();

  const deltaHours =
    pastHoursForBasket != null && todayHoursForBasket != null
      ? todayHoursForBasket - pastHoursForBasket
      : null;

  const closingInsight = (() => {
    if (pastHoursForBasket == null || todayHoursForBasket == null) {
      return null;
    }

    if (todayHoursForBasket > pastHoursForBasket) {
      return "Your time has become less valuable—you need more hours of work per day for the same basket than in the past year.";
    }

    if (todayHoursForBasket < pastHoursForBasket) {
      return "Luckily you earned some time: fewer hours are needed per day for the same basket. Pay attention to inflation and wages in the future.";
    }

    return "The time cost of that basket is unchanged between the first and last year in this window—still worth watching inflation and wages ahead.";
  })();

  const axisTick = { fill: chartUi.tickFill, fontSize: 11, fontFamily: "system-ui, sans-serif" };

  return (
    <section
      ref={sectionRef}
      className="mt-14 rounded-[4px] bg-card px-6 py-10 shadow-sm border border-border scroll-mt-8 sm:px-10 sm:py-14"
      aria-label="Country story"
    >
      <h2 className="m-0 text-center text-[clamp(2rem,4vw,3rem)] font-semibold text-foreground leading-[1.1]">
        <span className="block">Your country</span>
        <span className="block mt-1 text-foreground/90">{countryName || "—"}</span>
      </h2>

      <div className="mt-8 rounded-xl border border-border bg-muted/80 px-4 py-4 text-left text-sm text-foreground/90 sm:px-5">
        <p className="m-0 font-medium text-foreground">What this shows</p>
        <p className="mt-2 m-0 leading-relaxed text-foreground/80">
          Data window <span className="font-semibold text-foreground">{yearsStart ?? "—"}–{yearsEnd ?? "—"}</span>
          {hoursPerDayInput != null && (
            <>
              {" "}
              · Your baseline workday <span className="font-semibold text-foreground">{hoursPerDayInput} h/day</span> (feeds the hours calculation)
            </>
          )}
          . World Bank inflation and ILOSTAT wages build CPI, nominal earnings, and real earnings indices (100 in the first year). Hours for the same basket use your baseline and those series.
        </p>
        {deltaHours != null && (
          <p className="mt-3 m-0 text-foreground/90">
            Basket time moved from <span className="font-semibold">{startHoursText}</span> to{" "}
            <span className="font-semibold">{endHoursText}</span> hours/day
            {deltaHours !== 0 && (
              <span className="text-muted-foreground">
                {" "}
                ({deltaHours > 0 ? "+" : ""}
                {deltaHours.toFixed(1)} vs {startLabel})
              </span>
            )}
            . Real wage vs base: <span className="font-semibold">{formatRealPct(realChangePct)}</span>.
          </p>
        )}
      </div>

      <div className="mt-10 w-full max-w-[640px] mx-auto space-y-10">
        <div>
          <h3 className="m-0 text-center text-base font-semibold text-foreground">
            Hours of work per day for the same basket
          </h3>
          <p className="mt-1 m-0 text-center text-xs text-muted-foreground">
            Uses your hours/day input as the starting point; later years follow inflation and wage growth from the API.
          </p>
          <div className="mt-4 h-[280px] w-full">
            {hasChart ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 12, right: 12, left: 4, bottom: 8 }}>
                  <CartesianGrid stroke={chartUi.grid} strokeDasharray="4 4" />
                  <XAxis
                    dataKey="yearLabel"
                    tick={axisTick}
                    interval={0}
                    angle={n > 8 ? -50 : -35}
                    textAnchor="end"
                    height={n > 8 ? 72 : 56}
                  />
                  <YAxis
                    tick={axisTick}
                    domain={["auto", "auto"]}
                    tickFormatter={(v) => (typeof v === "number" ? v.toFixed(1) : String(v))}
                    label={{
                      value: "Hours / day",
                      angle: -90,
                      position: "insideLeft",
                      style: { fill: chartUi.labelMuted, fontSize: 11 },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: `1px solid ${chartUi.tooltipBorder}`,
                      fontSize: 12,
                      backgroundColor: chartUi.tooltipBg,
                      color: chartUi.tickFill,
                    }}
                    formatter={(value) =>
                      typeof value === "number" ? `${value.toFixed(2)} h` : value == null ? "—" : String(value)
                    }
                    labelFormatter={(label) => (label != null ? `Year ${label}` : "")}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, color: chartUi.tickFill }} />
                  {hoursPerDayInput != null && (
                    <ReferenceLine
                      y={hoursPerDayInput}
                      stroke={chartUi.refStroke}
                      strokeDasharray="5 5"
                      label={{
                        value: "Your input (baseline)",
                        position: "insideTopRight",
                        fill: chartUi.refLabel,
                        fontSize: 11,
                      }}
                    />
                  )}
                  <Line
                    type="monotone"
                    dataKey="hours"
                    name="Hours for basket"
                    stroke={chartUi.hours}
                    strokeWidth={2.5}
                    dot={{ r: n <= 8 ? 4 : 3 }}
                    activeDot={{ r: 6 }}
                    connectNulls={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Not enough years to plot.
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="m-0 text-center text-base font-semibold text-foreground">
            CPI, earnings &amp; real wage (change vs first year in window)
          </h3>
          <p className="mt-1 m-0 text-center text-xs text-muted-foreground">
            Same underlying indices as the badges; shown as % above/below 100 so the three lines separate visually.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] text-foreground/80">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: COL.cpi }} />
              CPI {formatSignedPct(cpiChangePct)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: COL.earn }} />
              Earnings {formatSignedPct(earningsChangePct)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: COL.real }} />
              Real {formatRealPct(realChangePct)}
            </span>
          </div>
          <div className="mt-3 h-[320px] w-full">
            {hasChart ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 12, right: 12, left: 4, bottom: 8 }}>
                  <CartesianGrid stroke={chartUi.grid} strokeDasharray="4 4" />
                  <XAxis
                    dataKey="yearLabel"
                    tick={axisTick}
                    interval={0}
                    angle={n > 8 ? -50 : -35}
                    textAnchor="end"
                    height={n > 8 ? 72 : 56}
                  />
                  <YAxis
                    tick={axisTick}
                    tickFormatter={(v) => `${v}%`}
                    label={{
                      value: "% vs base year (100)",
                      angle: -90,
                      position: "insideLeft",
                      style: { fill: chartUi.labelMuted, fontSize: 11 },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: `1px solid ${chartUi.tooltipBorder}`,
                      fontSize: 12,
                      backgroundColor: chartUi.tooltipBg,
                      color: chartUi.tickFill,
                    }}
                    formatter={(value) =>
                      typeof value === "number"
                        ? `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`
                        : value == null
                          ? "—"
                          : String(value)
                    }
                    labelFormatter={(label) => (label != null ? `Year ${label}` : "")}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, color: chartUi.tickFill }} />
                  <Line
                    type="monotone"
                    dataKey="cpiPct"
                    name="CPI"
                    stroke={COL.cpi}
                    strokeWidth={2}
                    dot={{ r: n <= 8 ? 3 : 2 }}
                    connectNulls={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="earnPct"
                    name="Earnings"
                    stroke={COL.earn}
                    strokeWidth={2}
                    dot={{ r: n <= 8 ? 3 : 2 }}
                    connectNulls={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="realPct"
                    name="Real wage"
                    stroke={COL.real}
                    strokeWidth={2}
                    dot={{ r: n <= 8 ? 3 : 2 }}
                    connectNulls={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Not enough years to plot.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 max-w-xl mx-auto text-foreground/90">
        <p className="m-0 text-center text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
          Hours of work per day for the same basket of goods
        </p>
        <div className="mt-8 space-y-6 text-left text-[17px] leading-[1.5]">
          <div>
            <p className="m-0 text-[15px] font-semibold text-foreground">Past year: {startLabel}</p>
            <p className="mt-1.5 m-0 text-foreground/90">
              You needed about <span className="font-semibold text-foreground">{startHoursText}</span> hours of work per day.
            </p>
          </div>
          <div>
            <p className="m-0 text-[15px] font-semibold text-foreground">Last year: {endLabel}</p>
            <p className="mt-1.5 m-0 text-foreground/90">
              You need about <span className="font-semibold text-foreground">{endHoursText}</span> hours of work per day.
            </p>
          </div>
        </div>
        {closingInsight && (
          <p
            className={`mt-10 text-center text-[15px] leading-snug ${
              deltaHours != null && deltaHours < 0
                ? "text-emerald-800 dark:text-emerald-300"
                : "text-foreground/90"
            }`}
          >
            {closingInsight}
          </p>
        )}
        {wageSourceLabel && (
          <p className="mt-6 text-center text-[13px] text-muted-foreground">
            {wageSourceLabel}
          </p>
        )}
      </div>
    </section>
  );
}
