import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type CpiGaugeProps = {
  value: number;
};

const SEGMENT_COLORS = [
  "#5c1010",
  "#7f1d1d",
  "#b91c1c",
  "#ea580c",
  "#f97316",
  "#fb923c",
  "#fbbf24",
  "#facc15",
  "#fde047",
  "#fef08a",
];

const CHART_W = 260;
const CHART_H = 220;
const CX = CHART_W / 2;
const CY = CHART_H / 2;
const OUTER_RADIUS = 95;
const START_ANGLE = 210;
const END_ANGLE = -30;
const LABEL_RADIUS = OUTER_RADIUS + 12;

function polarToCartesian(cx: number, cy: number, radius: number, angleInDegrees: number) {
  const rad = (Math.PI / 180) * angleInDegrees;

  return {
    x: cx + Math.cos(-rad) * radius,
    y: cy + Math.sin(-rad) * radius,
  };
}

function angleForCpiValue(scale: number) {
  return START_ANGLE + (END_ANGLE - START_ANGLE) * (scale / 100);
}

export default function CpiGauge({ value }: CpiGaugeProps) {
  const safeValue = Number.isFinite(value) ? Math.min(Math.max(value, 0), 100) : 0;
  const segments = SEGMENT_COLORS.length;
  const segmentSize = 100 / segments;
  const activeSegments = Math.max(1, Math.round(safeValue / segmentSize));

  const data = Array.from({ length: segments }, (_, index) => ({
    name: `${index}`,
    value: segmentSize,
    active: index < activeSegments,
  }));

  const p0 = polarToCartesian(CX, CY, LABEL_RADIUS, START_ANGLE);
  const p100 = polarToCartesian(CX, CY, LABEL_RADIUS, END_ANGLE);
  const pValue = polarToCartesian(CX, CY, LABEL_RADIUS, angleForCpiValue(safeValue));
  const valueLabelText =
    Math.abs(safeValue - Math.round(safeValue)) < 1e-6 ? String(Math.round(safeValue)) : safeValue.toFixed(1);
  const showValueTick = safeValue > 0 && safeValue < 100;

  return (
    <div className="relative mx-auto w-full max-w-[260px] aspect-[260/220]">
      <div className="absolute inset-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Pie
              data={data}
              dataKey="value"
              startAngle={START_ANGLE}
              endAngle={END_ANGLE}
              innerRadius={55}
              outerRadius={OUTER_RADIUS}
              stroke="#111827"
              strokeWidth={0.8}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={entry.active ? SEGMENT_COLORS[index] : "#ffffff"}
                  stroke="#111827"
                  strokeWidth={0.8}
                />
              ))}
            </Pie>
            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              startAngle={0}
              endAngle={360}
              innerRadius={40}
              outerRadius={54}
              fill="#ffffff"
              stroke="#e5e7eb"
              strokeWidth={1}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <text
          x={p0.x}
          y={p0.y}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-neutral-800 text-[10px]"
        >
          0
        </text>
        <text
          x={p100.x}
          y={p100.y}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-neutral-800 text-[10px]"
        >
          100
        </text>
        {showValueTick ? (
          <text
            x={pValue.x}
            y={pValue.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-neutral-900 text-[11px] font-semibold"
          >
            {valueLabelText}
          </text>
        ) : null}
      </svg>
    </div>
  );
}
