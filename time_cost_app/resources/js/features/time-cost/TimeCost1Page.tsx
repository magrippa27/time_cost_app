import { useEffect, useRef, useState } from "react";
import HeroImage from "../../assets/clock.jpg";
import CountrySelect, { getCountryName } from "../../shared/components/CountrySelect";
import Star from "../../shared/components/Star";
import { Input } from "../../shared/components/ui";
import TimeCostResultsSection from "./components/TimeCostResultsSection";

export default function TimeCost1Page() {
  const resultsRef = useRef<HTMLDivElement>(null);
  const taxSectionRef = useRef<HTMLDivElement | null>(null);
  const cpiSectionRef = useRef<HTMLDivElement | null>(null);
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
    const t1 = window.setTimeout(() => {
      taxSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 3800);
    const t2 = window.setTimeout(() => {
      cpiSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 7600);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
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
        className="w-full flex flex-col items-center justify-center gap-space-200 px-space-600 py-[160px] relative"
        style={{ minHeight: 535 }}
        aria-label="Hero"
      >
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={HeroImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-background-utilities-scrim" />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-4 text-center leading-[1.2] text-text-utilities-text-on-overlay font-title-hero-font-family max-w-[900px]">
          <h1 className="m-0 font-title-hero-font-weight text-[clamp(4rem,10vw,7rem)] tracking-[-2.16px]">
            Time-Cost
          </h1>
          <div className="flex flex-col items-center text-[clamp(1.75rem,4vw,3rem)] font-subtitle-font-family font-normal">
            <p className="m-0">Politics doesn’t just take your money.</p>
            <p className="m-0">It takes your time.</p>
          </div>
        </div>
      </section>

      <div className="max-w-[900px] mx-auto px-6 pb-8 pt-4">
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-text-default-default mb-1">
          Calculate how much here
        </h2>
        <p className="text-subheading-size-medium text-text-default-secondary mb-8">
          (No need to include real data)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
            className="rounded-lg border-2 border-neutral-300 bg-white"
          />
          <Input
            label="Monthly Income (Gross)"
            type="text"
            placeholder="e.g. 2000"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            className="rounded-lg border-2 border-neutral-300 bg-white"
          />
          <Input
            label="Hours you work per day"
            type="text"
            placeholder="e.g. 8"
            value={workHoursPerDay}
            onChange={(e) => setWorkHoursPerDay(e.target.value)}
            className="rounded-lg border-2 border-neutral-300 bg-white"
          />
        </div>

        {validationError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {validationError}
          </div>
        )}

        <div className="flex justify-center mb-24">
          <Star
            label="Proceed"
            loading={isSubmitting}
            onClick={handleProceed}
            className="!relative !top-auto !left-auto min-w-[192px]"
          />
        </div>

        {submitted && (
          <div
            ref={resultsRef}
            className="scroll-mt-8 transition-all duration-500"
          >
            <TimeCostResultsSection
              submitted={submitted}
              parsePositiveNumber={parsePositiveNumber}
              countryName={getCountryName(submitted.countryCode) || ""}
              taxSectionRef={taxSectionRef}
              cpiSectionRef={cpiSectionRef}
            />
          </div>
        )}
      </div>
    </div>
  );
}
