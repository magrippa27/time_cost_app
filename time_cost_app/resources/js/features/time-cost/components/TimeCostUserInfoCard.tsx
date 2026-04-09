import { Card, CardContent, CardHeader } from "../../../shared/components/ui";

type TimeCostUserInfoCardProps = {
  countryName: string;
  age: string;
  monthlyIncome: string;
  workHoursPerDay: string;
  sleepHoursPerDay: string;
  leisureHoursPerDay: string;
};

type Row = {
  label: string;
  value: string;
  tabular?: boolean;
};

function displayValue(value: string) {
  const trimmed = value?.trim() ?? "";

  if (!trimmed) {
    return <span className="font-normal italic text-text-default-secondary">Not provided</span>;
  }

  return trimmed;
}

export default function TimeCostUserInfoCard({
  countryName,
  age,
  monthlyIncome,
  workHoursPerDay,
  sleepHoursPerDay,
  leisureHoursPerDay,
}: TimeCostUserInfoCardProps) {
  const rows: Row[] = [
    { label: "Country", value: countryName },
    { label: "Age", value: age, tabular: true },
    { label: "Monthly income (gross)", value: monthlyIncome, tabular: true },
    { label: "Work hours / day", value: workHoursPerDay, tabular: true },
    { label: "Sleep hours / day", value: sleepHoursPerDay, tabular: true },
    { label: "Leisure hours / day", value: leisureHoursPerDay, tabular: true },
  ];

  return (
    <Card className="overflow-hidden rounded-xl border border-border/90 bg-card p-0 shadow-md shadow-neutral-950/5 ring-1 ring-neutral-950/[0.04] dark:shadow-neutral-950/20 dark:ring-neutral-100/[0.06]">
      <div className="border-b border-border bg-gradient-to-br from-muted/80 to-card px-5 py-4 sm:px-6">
        <div className="border-l-[3px] border-foreground/15 pl-4">
          <CardHeader className="m-0 mb-1 p-0 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            Your information
          </CardHeader>
          <p className="m-0 text-sm leading-snug text-muted-foreground">Inputs used for this estimate</p>
        </div>
      </div>

      <CardContent className="px-0 pb-0 pt-0 text-[var(--color-text)]">
        <dl className="divide-y divide-border">
          {rows.map(({ label, value, tabular }) => (
            <div
              key={label}
              className="flex flex-col gap-1 px-5 py-4 transition-colors hover:bg-muted/60 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:px-6"
            >
              <dt className="min-w-0 text-sm font-medium text-muted-foreground">{label}</dt>
              <dd
                className={`min-w-0 text-base font-semibold text-foreground sm:max-w-[58%] sm:text-right ${tabular ? "tabular-nums" : ""}`}
              >
                {displayValue(value)}
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
