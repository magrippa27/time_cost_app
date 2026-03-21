import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

type DayDistributionPieProps = {
  workHours: number;
  sleepHours: number;
  leisureHours: number;
};

const COLORS = ["#3b82f6", "#22c55e", "#f97316", "#6b7280"];

export default function DayDistributionPie({ workHours, sleepHours, leisureHours }: DayDistributionPieProps) {
  const safeWork = workHours > 0 && Number.isFinite(workHours) ? workHours : 0;
  const safeSleep = sleepHours > 0 && Number.isFinite(sleepHours) ? sleepHours : 0;
  const safeLeisure = leisureHours > 0 && Number.isFinite(leisureHours) ? leisureHours : 0;
  const sum = safeWork + safeSleep + safeLeisure;

  if (sum <= 0) {
    return (
      <div className="flex h-[260px] items-center justify-center text-sm text-neutral-500">
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
    <div className="w-full h-[260px]">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => {
              const numericValue = typeof value === "number" ? value : Number(value);
              const percent = (numericValue / 24) * 100;

              return [`${percent.toFixed(1)}%`, name];
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

