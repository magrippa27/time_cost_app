import { Card, CardContent, CardHeader } from "../../../shared/components/ui";
import { getCpiScoreForCountryCode } from "../getCpiScore";
import { getPitRateInfo } from "../getPitRate";
import CpiSlides from "./CpiSlides";
import DayDistributionPie from "./DayDistributionPie";
import LocalTimePlayer from "./LocalTimePlayer";
import TaxBreakdownTable from "./TaxBreakdownTable";
import TaxTimeSection from "./TaxTimeSection";
import TimeCostUserInfoCard from "./TimeCostUserInfoCard";
import TimeToMoneyTable from "./TimeToMoneyTable";

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
};

function SectionHeading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">{eyebrow}</p>
      ) : null}
      <h3 className="m-0 text-[clamp(1.65rem,3.2vw,2.35rem)] font-semibold leading-tight tracking-tight text-text-default-default">
        {title}
      </h3>
    </div>
  );
}

export default function TimeCostResultsSection({
  submitted,
  parsePositiveNumber,
  countryName,
}: TimeCostResultsSectionProps) {
  const workHours = parsePositiveNumber(submitted.workHoursPerDay) ?? 0;
  const cpiValue = getCpiScoreForCountryCode(submitted.countryCode);
  const pitInfo = getPitRateInfo(submitted.countryCode);
  const taxRate = pitInfo.percent / 100;
  const workPct = workHours > 0 ? (workHours / 24) * 100 : null;

  return (
    <div className="w-full">
      <section className="mb-12 sm:mb-16">
        <div className="mx-auto mb-8 max-w-4xl rounded-2xl border border-neutral-200/80 bg-gradient-to-b from-neutral-50/90 to-white px-6 py-10 shadow-sm ring-1 ring-neutral-950/[0.03] sm:px-10 sm:py-12">
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="m-0 font-title-hero-font-family font-title-hero-font-weight text-[clamp(2.25rem,6vw,4rem)] tracking-[-0.04em] text-text-default-default">
              Calculated time-cost
            </h2>
            <p className="m-0 max-w-md text-subheading-size-medium text-text-default-secondary">
              Earphones recommended for the audio below.
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <LocalTimePlayer />
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          <TimeCostUserInfoCard
            countryName={countryName}
            age={submitted.age}
            monthlyIncome={submitted.monthlyIncome}
            workHoursPerDay={submitted.workHoursPerDay}
            sleepHoursPerDay={submitted.sleepHoursPerDay}
            leisureHoursPerDay={submitted.leisureHoursPerDay}
          />

          <Card className="overflow-hidden rounded-xl border border-neutral-200/90 bg-white p-0 shadow-md shadow-neutral-950/5 ring-1 ring-neutral-950/[0.04]">
            <div className="border-b border-neutral-100 bg-gradient-to-br from-neutral-50/80 to-white px-5 py-4 sm:px-6">
              <div className="border-l-[3px] border-neutral-900/15 pl-4">
                <CardHeader className="m-0 mb-1 p-0 text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
                  How your 24 hours look
                </CardHeader>
                <p className="m-0 text-sm leading-snug text-neutral-500">
                  Work, sleep, leisure, and the rest of the day (24h model)
                </p>
              </div>
            </div>
            <CardContent className="px-5 pb-6 pt-5 sm:px-6">
              <DayDistributionPie
                workHours={workHours}
                sleepHours={8}
                leisureHours={Math.max(24 - (workHours + 8), 0)}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {workPct != null && (
        <div className="mb-12 flex justify-center sm:mb-14">
          <p className="m-0 max-w-lg rounded-2xl border border-neutral-200/90 bg-white px-6 py-4 text-center text-[clamp(1.25rem,2.8vw,1.75rem)] font-semibold leading-snug text-text-default-default shadow-sm ring-1 ring-neutral-950/[0.04]">
            {`Let\u2019s focus on that ${workPct.toFixed(1)}% of your day spent working.`}
          </p>
        </div>
      )}

      <div className="mx-auto mb-12 max-w-4xl sm:mb-16">
        <TimeToMoneyTable
          monthlyIncome={parsePositiveNumber(submitted.monthlyIncome)}
          workHoursPerDay={parsePositiveNumber(submitted.workHoursPerDay)}
        />
      </div>

      <section className="mx-auto flex max-w-4xl flex-col gap-12 px-0 sm:gap-14">
        <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50/40 px-5 py-6 text-center ring-1 ring-neutral-950/[0.03] sm:px-8">
          <p className="m-0 text-sm leading-relaxed text-neutral-700">
            {countryName && countryName !== "—" ? (
              <>
                Estimated top personal income tax rate for{" "}
                <span className="font-semibold text-neutral-900">{countryName}</span>:{" "}
              </>
            ) : (
              <>Estimated top personal income tax rate: </>
            )}
            <span className="font-semibold text-neutral-900">{pitInfo.percent}%</span>
            {pitInfo.usedFallback ? (
              <span className="text-neutral-500"> (default — no matching territory in the table)</span>
            ) : null}
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-neutral-500">
            Illustrative only: headline marginal PIT from reference data; excludes social contributions, deductions, and local
            rules.
          </p>
        </div>

        <div className="flex flex-col gap-6 rounded-2xl border border-neutral-200/80 bg-white px-5 py-8 shadow-sm ring-1 ring-neutral-950/[0.03] sm:gap-7 sm:px-8 sm:py-10">
          <SectionHeading eyebrow="After tax" title="How much you get after taxes" />
          <TaxBreakdownTable
            monthlyIncome={parsePositiveNumber(submitted.monthlyIncome)}
            workHoursPerDay={parsePositiveNumber(submitted.workHoursPerDay)}
            taxRate={taxRate}
          />
        </div>

        <div className="flex flex-col gap-6 rounded-2xl border border-neutral-200/80 bg-white px-5 py-8 shadow-sm ring-1 ring-neutral-950/[0.03] sm:gap-7 sm:px-8 sm:py-10">
          <SectionHeading eyebrow="Time & tax" title="How much of your time is spent for paying taxes?" />
          <TaxTimeSection taxPortionOfYear={taxRate} workHoursPerDay={workHours > 0 ? workHours : 8} />
        </div>
      </section>

      <div className="mt-16 sm:mt-20">
        <CpiSlides cpiValue={cpiValue} countryName={countryName} />
      </div>
    </div>
  );
}
