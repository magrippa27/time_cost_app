import { useEffect, useRef, useState } from "react";
import HeroImage from "../../assets/clock.jpg";
import CountrySelect, { getCountryName } from "../../shared/components/CountrySelect";
import Star from "../../shared/components/Star";
import { Input } from "../../shared/components/ui";
import TimeCostResultsSection from "./components/TimeCostResultsSection";

export default function TimeCost1Page() {
  const resultsRef = useRef<HTMLDivElement>(null);
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [workHoursPerDay, setWorkHoursPerDay] = useState("");
  const [submitted, setSubmitted] = useState<{
    countryCode: string;
    age: string;
    monthlyIncome: string;
    workHoursPerDay: string;
    sleepHoursPerDay: string;
    leisureHoursPerDay: string;
  } | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (!submitted) {
      return;
    }

    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [submitted]);

  function parsePositiveNumber(value: string) {
    const trimmed = value.trim();

    if (!trimmed) {
      return null;
    }

    const parsed = Number(trimmed.replace(/,/g, ""));

    if (!Number.isFinite(parsed) || parsed <= 0) {
      return null;
    }

    return parsed;
  }

  function handleProceed() {
    const work = parsePositiveNumber(workHoursPerDay);
    const income = parsePositiveNumber(monthlyIncome);
    const safeWork = work ?? 0;
    const sleep = 8;
    const leisure = Math.max(24 - safeWork - sleep, 0);

    if (!income) {
      setValidationError("Add at least one valid monthly income to continue.");

      return;
    }

    if (!work || safeWork <= 0 || safeWork + sleep > 24) {
      setValidationError("Hours you work per day must be between 0 and 16.");

      return;
    }

    setValidationError(null);
    setIsSubmitting(true);
    setSubmitted({
      countryCode: country,
      age: age || "—",
      monthlyIncome: monthlyIncome || "—",
      workHoursPerDay: workHoursPerDay || "—",
      sleepHoursPerDay: sleep.toString(),
      leisureHoursPerDay: leisure.toString(),
    });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 800);
  }

  return (
    <div className="w-full min-h-screen bg-background-default-default">
      <section
        className="relative flex min-h-[min(72svh,380px)] w-full flex-col items-center justify-center gap-4 px-4 py-14 sm:min-h-[min(80svh,460px)] sm:gap-5 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:min-h-[535px] lg:gap-6 lg:px-space-600 lg:py-[120px] xl:py-[160px]"
        aria-label="Hero"
      >
        <div className="pointer-events-none absolute inset-0">
          <img
            src={HeroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-background-utilities-scrim" />
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-[min(100%,40rem)] flex-col items-center gap-4 text-center font-title-hero-font-family leading-[1.2] text-text-utilities-text-on-overlay sm:max-w-[900px] sm:gap-5">
          <h1 className="m-0 w-full font-title-hero-font-weight text-[clamp(2.5rem,9vw,7rem)] leading-[1.05] tracking-[-0.045em]">
            {"Time\u2011Cost"}
          </h1>
          <p className="m-0 max-w-[min(100%,22rem)] font-subtitle-font-family text-[clamp(1.125rem,4.5vw,3rem)] font-normal leading-snug text-pretty sm:max-w-[min(100%,36rem)]">
            Politics doesn&apos;t just take your money. It takes your time.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[900px] px-4 pb-6 pt-3 sm:px-6 sm:pb-8 sm:pt-4">
        <h2 className="mb-1 text-[clamp(1.35rem,3vw,2rem)] font-semibold text-text-default-default">
          Calculate how much here
        </h2>
        <p className="mb-5 text-subheading-size-medium text-text-default-secondary sm:mb-8">
          (No need to include real data)
        </p>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:mb-8 md:grid-cols-2 md:gap-6">
          <CountrySelect
            value={country}
            onChange={setCountry}
            placeholder="Select country"
          />
          <Input
            label="Age"
            type="text"
            placeholder="e.g. 30"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="rounded-lg border-2 border-input bg-card"
          />
          <Input
            label="Monthly Income (Gross)"
            type="text"
            placeholder="e.g. 2000"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            className="rounded-lg border-2 border-input bg-card"
          />
          <Input
            label="Hours you work per day"
            type="text"
            placeholder="e.g. 8"
            value={workHoursPerDay}
            onChange={(e) => setWorkHoursPerDay(e.target.value)}
            className="rounded-lg border-2 border-input bg-card"
          />
        </div>

        {validationError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {validationError}
          </div>
        )}

        <div className="mb-10 flex justify-center sm:mb-16 lg:mb-24">
          <Star
            label="Proceed"
            loading={isSubmitting}
            onClick={handleProceed}
            className="!relative !top-auto !left-auto min-w-[192px]"
          />
        </div>

        {submitted && (
          <div ref={resultsRef} className="scroll-mt-8 transition-all duration-500">
            <TimeCostResultsSection
              submitted={submitted}
              parsePositiveNumber={parsePositiveNumber}
              countryName={getCountryName(submitted.countryCode) || ""}
            />
          </div>
        )}
      </div>
    </div>
  );
}
