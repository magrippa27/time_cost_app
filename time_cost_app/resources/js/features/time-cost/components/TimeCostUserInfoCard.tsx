import { Card, CardContent, CardHeader } from "../../../shared/components/ui";

type TimeCostUserInfoCardProps = {
  countryName: string;
  age: string;
  monthlyIncome: string;
  workHoursPerDay: string;
  sleepHoursPerDay: string;
  leisureHoursPerDay: string;
};

export default function TimeCostUserInfoCard({
  countryName,
  age,
  monthlyIncome,
  workHoursPerDay,
  sleepHoursPerDay,
  leisureHoursPerDay,
}: TimeCostUserInfoCardProps) {
  return (
    <Card className="rounded-xl border-2 border-neutral-200 bg-white shadow-lg overflow-hidden">
      <CardHeader className="text-xl font-semibold text-neutral-900 pb-2">
        Your information
      </CardHeader>
      <CardContent className="pt-0">
        <div className="max-h-[min(60vh,400px)] overflow-y-auto pr-2 space-y-4 text-[var(--color-text)]">
          <div className="flex flex-wrap gap-x-4 gap-y-1 py-2 border-b border-neutral-100">
            <span className="text-neutral-500 font-medium min-w-[140px]">Country</span>
            <span>{countryName || "Not provided"}</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 py-2 border-b border-neutral-100">
            <span className="text-neutral-500 font-medium min-w-[140px]">Age</span>
            <span>{age || "Not provided"}</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 py-2 border-b border-neutral-100">
            <span className="text-neutral-500 font-medium min-w-[140px]">Monthly Income (Gross)</span>
            <span>{monthlyIncome || "Not provided"}</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 py-2 border-b border-neutral-100">
            <span className="text-neutral-500 font-medium min-w-[140px]">Hours you work per day</span>
            <span>{workHoursPerDay || "Not provided"}</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 py-2 border-b border-neutral-100">
            <span className="text-neutral-500 font-medium min-w-[140px]">Hours you sleep per day</span>
            <span>{sleepHoursPerDay || "Not provided"}</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 py-2">
            <span className="text-neutral-500 font-medium min-w-[140px]">Hours of leisure per day</span>
            <span>{leisureHoursPerDay || "Not provided"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

