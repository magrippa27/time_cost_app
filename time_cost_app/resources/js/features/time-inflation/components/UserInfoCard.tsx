import { Card, CardContent, CardHeader } from "../../../shared/components/ui";

type UserInfoCardProps = {
  countryName: string;
  age: string;
  monthlyIncome1: string;
  hoursPerDay: string;
};

type Row = {
  label: string;
  value: string;
  tabular?: boolean;
};

function displayValue(value: string) {
  const trimmed = value?.trim() ?? "";

  if (!trimmed || trimmed === "—") {
    return <span className="font-normal italic text-neutral-400">Not provided</span>;
  }

  return trimmed;
}

export default function UserInfoCard({
  countryName,
  age,
  monthlyIncome1,
  hoursPerDay,
}: UserInfoCardProps) {
  const rows: Row[] = [
    { label: "Country", value: countryName },
    { label: "Age", value: age, tabular: true },
    { label: "Monthly income (gross)", value: monthlyIncome1, tabular: true },
    { label: "Work hours / day", value: hoursPerDay, tabular: true },
  ];

  return (
    <Card className="overflow-hidden rounded-xl border border-neutral-200/90 bg-white p-0 shadow-md shadow-neutral-950/5 ring-1 ring-neutral-950/[0.04]">
      <div className="border-b border-neutral-100 bg-gradient-to-br from-neutral-50/80 to-white px-5 py-4 sm:px-6">
        <div className="border-l-[3px] border-neutral-900/15 pl-4">
          <CardHeader className="m-0 mb-1 p-0 text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
            Your information
          </CardHeader>
          <p className="m-0 text-sm leading-snug text-neutral-500">Inputs used for this calculation</p>
        </div>
      </div>

      <CardContent className="px-0 pb-0 pt-0 text-[var(--color-text)]">
        <dl className="divide-y divide-neutral-100">
          {rows.map(({ label, value, tabular }) => (
            <div
              key={label}
              className="flex flex-col gap-1 px-5 py-4 transition-colors hover:bg-neutral-50/60 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:px-6"
            >
              <dt className="min-w-0 text-sm font-medium text-neutral-500">{label}</dt>
              <dd
                className={`min-w-0 text-base font-semibold text-neutral-900 sm:max-w-[58%] sm:text-right ${tabular ? "tabular-nums" : ""}`}
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
