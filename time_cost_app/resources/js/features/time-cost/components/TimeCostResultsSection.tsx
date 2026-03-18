import type { RefObject } from "react";
import { Card, CardContent, CardHeader } from "../../../shared/components/ui";
import DayDistributionPie from "./DayDistributionPie";
import LocalTimePlayer from "./LocalTimePlayer";
import TaxBreakdownTable from "./TaxBreakdownTable";
import TaxTimeSection from "./TaxTimeSection";
import TimeToMoneyTable from "./TimeToMoneyTable";
import CpiSlides from "./CpiSlides";
import TimeCostUserInfoCard from "./TimeCostUserInfoCard";

type Submitted = {
  countryCode: string;
  age: string;
  monthlyIncome: string;
  workHoursPerDay: string;
  sleepHoursPerDay: string;
  leisureHoursPerDay: string;
};

type TimeCostResultsSectionProps = {
  submitted: Submitted;
  parsePositiveNumber: (value: string) => number | null;
  countryName: string;
  taxSectionRef: RefObject<HTMLDivElement | null>;
  cpiSectionRef: RefObject<HTMLDivElement | null>;
};

export default function TimeCostResultsSection({
  submitted,
  parsePositiveNumber,
  countryName,
  taxSectionRef,
  cpiSectionRef,
}: TimeCostResultsSectionProps) {
  const workHours = parsePositiveNumber(submitted.workHoursPerDay) ?? 0;

  return (
    <>
      <div className="flex flex-col items-center gap-4 mb-10 text-center">
        <h2 className="m-0 font-title-hero-font-family font-title-hero-font-weight text-[clamp(3rem,7vw,4.5rem)] tracking-[-1.4px] text-text-default-default">
          Calculated Time-Cost
        </h2>
        <p className="text-subheading-size-medium text-text-default-secondary">
          (Earphones recommended)
        </p>
        <LocalTimePlayer />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <TimeCostUserInfoCard
          countryName={countryName}
          age={submitted.age}
          monthlyIncome={submitted.monthlyIncome}
          workHoursPerDay={submitted.workHoursPerDay}
          sleepHoursPerDay={submitted.sleepHoursPerDay}
          leisureHoursPerDay={submitted.leisureHoursPerDay}
        />

        <Card className="rounded-xl border-2 border-neutral-200 bg-white shadow-lg overflow-hidden">
          <CardHeader className="text-xl font-semibold text-neutral-900 pb-2">
            How your 24 hours look
          </CardHeader>
          <CardContent className="pt-4">
            <DayDistributionPie
              workHours={workHours}
              sleepHours={8}
              leisureHours={Math.max(24 - (workHours + 8), 0)}
            />
          </CardContent>
        </Card>
      </div>

      <div className="mb-10 text-center">
        {parsePositiveNumber(submitted.workHoursPerDay) && (
          <p className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-text-default-default">
            {`Let\u2019s focus on that ${((workHours / 24) * 100).toFixed(1)}%`}
          </p>
        )}
      </div>

      <TimeToMoneyTable
        monthlyIncome={parsePositiveNumber(submitted.monthlyIncome)}
        workHoursPerDay={parsePositiveNumber(submitted.workHoursPerDay)}
      />

      <div
        ref={taxSectionRef}
        className="mt-10 flex flex-col items-center gap-10"
      >
        <h3 className="text-[clamp(1.8rem,3.3vw,2.4rem)] font-semibold text-text-default-default text-center">
          How much you get after taxes
        </h3>
        <TaxBreakdownTable
          monthlyIncome={parsePositiveNumber(submitted.monthlyIncome)}
          workHoursPerDay={parsePositiveNumber(submitted.workHoursPerDay)}
        />

        <h3 className="mt-16 text-[clamp(1.8rem,3.3vw,2.4rem)] font-semibold text-text-default-default text-center">
          How much of your time is spent for paying taxes?
        </h3>
        <TaxTimeSection />
      </div>

      <div ref={cpiSectionRef}>
        <CpiSlides />
      </div>
    </>
  );
}

