import { useEffect, useRef, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import HeroImage from "../../assets/coins.jpg";
import CountrySelect, { getCountryName } from "../../shared/components/CountrySelect";
import Star from "../../shared/components/Star";
import { Input } from "../../shared/components/ui";
import CountryStorySection from "./components/CountryStorySection";
import DefinitionsSection from "./components/DefinitionsSection";
import InflationClosingSlides from "./components/InflationClosingSlides";
import UserInfoCard from "./components/UserInfoCard";

export default function TimeInflationPage() {
  const resultsRef = useRef<HTMLDivElement>(null);
  const definitionsRef = useRef<HTMLElement>(null);
  const countryStoryRef = useRef<HTMLElement>(null);
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");
  const [monthlyIncome1, setMonthlyIncome1] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{ countryCode: string; age: string; monthlyIncome1: string; hoursPerDay: string } | null>(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiResult, setApiResult] = useState<{
    success: boolean;
    yearsStart: number;
    yearsEnd: number;
    chartYears: number[];
    usedWageSource: string;
    cpiChangePct: number | null;
    earningsChangePct: number | null;
    realChangePct: number | null;
    pastHoursForBasket: number | null;
    todayHoursForBasket: number | null;
    debug?: {
      traceId: string;
      countryIso3: string;
      countryWageFetchFailed: boolean;
      inflationError: string | null;
      countryWageError: string | null;
      worldRefWageError: string | null;
      globalAvgWageError: string | null;
      countryHasAll: boolean;
      fallbackUsed: boolean;
      usedWageSource: string;
      missingWageYearsCountry: number[];
      missingInflationYears: number[];
    } | null;
    rows: Array<{
      year: number;
      cpi_index: number | null;
      earnings_index: number | null;
      real_index: number | null;
      hours_needed_per_day: number | null;
    }>;
    message?: string;
  } | null>(null);

  useEffect(() => {
    if (!submitted) {
      return;
    }

    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    const t = window.setTimeout(() => {
      definitionsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 2200);
    const t2 = window.setTimeout(() => {
      countryStoryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 4600);

    return () => {
      window.clearTimeout(t);
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
    const safeHours = parsePositiveNumber(hoursPerDay);

    if (!country) {
      setValidationError("Select a country to continue.");

      return;
    }

    if (!safeHours) {
      setValidationError("Enter a valid positive number of hours per day.");

      return;
    }

    setValidationError(null);
    setIsSubmitting(true);
    setSubmitted({
      countryCode: country,
      age: age || "—",
      monthlyIncome1: monthlyIncome1 || "—",
      hoursPerDay: safeHours.toString(),
    });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 800);
  }

  useEffect(() => {
    if (!submitted) {
      return;
    }

    const controller = new AbortController();
    setApiLoading(true);
    setApiError(null);
    setApiResult(null);

    const url =
      `/time-inflation/data?country=${encodeURIComponent(submitted.countryCode)}&hoursPerDay=${encodeURIComponent(
        submitted.hoursPerDay
      )}&yearsEnd=2024`;

    fetch(url, {
      method: "GET",
      credentials: "same-origin",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    })
      .then(async (resp) => {
        const data = await resp.json().catch(() => null);

        if (!resp.ok) {
          if (data?.debug) {
            console.log("time-inflation debug (error)", data.debug);
          }

          const msg = (data && typeof data.message === "string" && data.message) || `Request failed (${resp.status}).`;

          throw new Error(msg);
        }

        if (!data || typeof data.success !== "boolean") {
          throw new Error("Invalid server response.");
        }

        if (!data.success) {
          if (data?.debug) {
            console.log("time-inflation debug (success=false)", data.debug);
          }

          throw new Error(data.message || "Failed to compute time-inflation data.");
        }

        return data;
      })
      .then((data) => {
        setApiResult(data);

        if ((data as any)?.debug) {
          console.log("time-inflation debug", (data as any).debug);
          console.log("time-inflation usedWageSource", data.usedWageSource);
          console.log("time-inflation missingInflationYears", data.missingInflationYears);
          console.log("time-inflation missingWageYears", data.missingWageYears);
        }
      })
      .catch((e) => {
        if (e instanceof DOMException && e.name === "AbortError") {
          return;
        }

        setApiError(e instanceof Error ? e.message : "Failed to load inflation data.");
      })
      .finally(() => {
        setApiLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [submitted]);

  return (
    <div className="w-full min-h-screen bg-background-default-default">
      <section
        className="relative flex w-full flex-col items-center justify-center gap-5 px-4 py-24 sm:gap-6 sm:px-6 sm:py-32 md:px-8 lg:px-space-600 lg:py-[120px] xl:py-[160px]"
        style={{ minHeight: "min(100vh, 560px)" }}
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
        <div className="relative z-10 mx-auto flex w-full max-w-[min(100%,40rem)] flex-col items-center gap-5 text-center font-title-hero-font-family text-text-utilities-text-on-overlay sm:max-w-[900px] sm:gap-6">
          <h1 className="m-0 w-full font-title-hero-font-weight text-[clamp(2.5rem,9vw,7rem)] leading-[1.05] tracking-[-0.045em]">
            {"Time\u2011Inflation"}
          </h1>
          <p className="m-0 max-w-[min(100%,22rem)] font-subtitle-font-family text-[clamp(1.125rem,4.5vw,3rem)] font-normal leading-snug text-pretty sm:max-w-[min(100%,36rem)]">
            Inflation doesn&apos;t just eat your salary. It eats your time.
          </p>
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
            className="rounded-lg border-2 border-input bg-card"
          />
          <Input
            label="Monthly Income (Gross)"
            type="text"
            placeholder="e.g. 2000"
            value={monthlyIncome1}
            onChange={(e) => setMonthlyIncome1(e.target.value)}
            className="rounded-lg border-2 border-input bg-card"
          />
          <Input
            label="Hours you work per day"
            type="text"
            placeholder="e.g. 8"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(e.target.value)}
            className="rounded-lg border-2 border-input bg-card"
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
            <UserInfoCard
              countryName={getCountryName(submitted.countryCode) || ""}
              age={submitted.age}
              monthlyIncome1={submitted.monthlyIncome1}
              hoursPerDay={submitted.hoursPerDay}
            />

            <DefinitionsSection sectionRef={definitionsRef} />

            {apiLoading && (
              <div
                className="mt-8 flex flex-col items-center justify-center gap-4 rounded-2xl border border-border/80 bg-card px-6 py-12 shadow-sm ring-1 ring-neutral-950/[0.03] dark:ring-neutral-100/[0.06]"
                role="status"
                aria-live="polite"
                aria-busy="true"
              >
                <Spinner className="size-10 text-text-default-default" />
                <p className="m-0 text-center text-sm font-medium text-text-default-default">
                  Loading inflation and wage data for the selected country…
                </p>
                <p className="m-0 text-center text-xs text-text-default-secondary">
                  This can take a few seconds.
                </p>
              </div>
            )}

            {apiError && (
              <div className="mt-6 mb-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                {apiError}
              </div>
            )}

            {apiResult && !apiLoading && (
              <CountryStorySection
                sectionRef={countryStoryRef}
                countryName={getCountryName(submitted.countryCode) || ""}
                yearsStart={apiResult.yearsStart ?? null}
                yearsEnd={apiResult.yearsEnd ?? null}
                usedWageSource={apiResult.usedWageSource ?? null}
                chartYears={apiResult.chartYears ?? []}
                cpiChangePct={apiResult.cpiChangePct ?? null}
                earningsChangePct={apiResult.earningsChangePct ?? null}
                realChangePct={apiResult.realChangePct ?? null}
                pastHoursForBasket={apiResult.pastHoursForBasket ?? null}
                todayHoursForBasket={apiResult.todayHoursForBasket ?? null}
                hoursPerDayInput={parsePositiveNumber(submitted.hoursPerDay)}
                hoursNeededSeries={apiResult.rows?.map((r) => r.hours_needed_per_day ?? null) ?? []}
                cpiIndex={apiResult.rows?.map((r) => r.cpi_index ?? null) ?? []}
                earningsIndex={apiResult.rows?.map((r) => r.earnings_index ?? null) ?? []}
                realIndex={apiResult.rows?.map((r) => r.real_index ?? null) ?? []}
              />
            )}
          </div>
        )}
      </div>

      {submitted && <InflationClosingSlides />}
    </div>
  );
}
