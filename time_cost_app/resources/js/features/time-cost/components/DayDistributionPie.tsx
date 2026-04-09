import { useMemo } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
  
} from "recharts";
import type {PieLabelRenderProps} from "recharts";
import { useAppearance } from "@/hooks/use-appearance";

type DayDistributionPieProps = {
  workHours: number;
  sleepHours: number;
  leisureHours: number;
};

const COLORS = ["#3b82f6", "#22c55e", "#f97316", "#6b7280"];

function formatHours(value: number) {
  return Number.isInteger(value) ? `${value}h` : `${value.toFixed(1)}h`;
}

function SliceLabel(props: PieLabelRenderProps) {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, value } = props;

  if (
    cx == null ||
    cy == null ||
    midAngle == null ||
    innerRadius == null ||
    outerRadius == null ||
    percent == null ||
    value == null
  ) {
    return null;
  }

  if (percent < 0.04) {
    return null;
  }

  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.52;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const pct = (percent * 100).toFixed(0);
  const h = formatHours(Number(value));

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      className="fill-white font-semibold"
      style={{ fontSize: 11, textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}
    >
      <tspan x={x} dy="-0.35em">
        {h}
      </tspan>
      <tspan x={x} dy="1.05em" style={{ fontSize: 10, opacity: 0.95 }}>
        {pct}%
      </tspan>
    </text>
  );
}

export default function DayDistributionPie({ workHours, sleepHours, leisureHours }: DayDistributionPieProps) {
  const { resolvedAppearance } = useAppearance();
  const tooltipUi = useMemo(() => {
    const dark = resolvedAppearance === "dark";

    return {
      border: dark ? "#475569" : "#e5e7eb",
      background: dark ? "oklch(0.205 0 0)" : "#ffffff",
      color: dark ? "#cbd5e1" : "#374151",
    };
  }, [resolvedAppearance]);

  const safeWork = workHours > 0 && Number.isFinite(workHours) ? workHours : 0;
  const safeSleep = sleepHours > 0 && Number.isFinite(sleepHours) ? sleepHours : 0;
  const safeLeisure = leisureHours > 0 && Number.isFinite(leisureHours) ? leisureHours : 0;
  const sum = safeWork + safeSleep + safeLeisure;

  if (sum <= 0) {
    return (
      <div className="flex h-[260px] items-center justify-center text-sm text-muted-foreground">
        Add your daily hours above to see how your day is split.
      </div>
    );
  }

  const cappedSum = Math.min(sum, 24);
  const other = 24 - cappedSum;

  const data = [
    { name: "Work", value: safeWork },
    { name: "Sleep", value: safeSleep },
    { name: "Leisure", value: safeLeisure },
  ];

  if (other > 0) {
    data.push({ name: "Other", value: other });
  }

  return (
    <div className="w-full">
      <div className="h-[200px] w-full sm:h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={88}
              paddingAngle={3}
              label={SliceLabel}
              labelLine={false}
              isAnimationActive={false}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: `1px solid ${tooltipUi.border}`,
                fontSize: 12,
                backgroundColor: tooltipUi.background,
                color: tooltipUi.color,
              }}
              formatter={(value) => {
                const numericValue = typeof value === "number" ? value : Number(value);
                const pctOfDay = (numericValue / 24) * 100;

                return [`${formatHours(numericValue)} · ${pctOfDay.toFixed(1)}% of day`, "Hours"];
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2" aria-label="Day breakdown by category">
        {data.map((entry, index) => {
          const pctOfDay = (entry.value / 24) * 100;
          const color = COLORS[index % COLORS.length];

          return (
            <li
              key={entry.name}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/80 px-3 py-2.5 text-sm"
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <span
                  className="h-3 w-3 shrink-0 rounded-sm ring-1 ring-black/5"
                  style={{ backgroundColor: color }}
                  aria-hidden
                />
                <span className="font-medium text-foreground/90">{entry.name}</span>
              </span>
              <span className="shrink-0 tabular-nums text-muted-foreground">
                <span className="font-semibold text-foreground">{formatHours(entry.value)}</span>
                <span className="mx-1.5 text-border" aria-hidden>
                  ·
                </span>
                <span>{pctOfDay.toFixed(1)}%</span>
                <span className="sr-only"> of the day</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
