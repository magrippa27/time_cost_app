import type { Ref } from "react";

type CountryStorySectionProps = {
  sectionRef?: Ref<HTMLElement>;
  countryName: string;
  cpiChangePct: number | null;
  earningsChangePct: number | null;
  realChangePct: number | null;
  pastHoursForBasket: number | null;
  todayHoursForBasket: number | null;
};

export default function CountryStorySection({
  sectionRef,
  countryName,
  cpiChangePct,
  earningsChangePct,
  realChangePct,
  pastHoursForBasket,
  todayHoursForBasket,
}: CountryStorySectionProps) {
  return (
    <section
      ref={sectionRef}
      className="mt-14 rounded-[4px] bg-white px-10 py-14 shadow-sm border border-neutral-200 scroll-mt-8"
      aria-label="Country story"
    >
      <h2 className="m-0 text-center text-[clamp(2.4rem,5vw,3.6rem)] font-semibold text-neutral-900 leading-[1.05]">
        <span>Your Country:</span>
        <br />
        <span>{countryName || "—"}</span>
      </h2>

      <div className="mt-10 flex justify-center">
        <div className="w-full max-w-[520px] rounded-md bg-neutral-50 border border-neutral-200 px-4 py-5">
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-neutral-600">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#7b1f1f]" />
              <span>Average hourly earnings</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#ff7a21]" />
              <span>Consumer Price Index</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#6b5cff]" />
              <span>Average real hourly earnings</span>
            </div>
          </div>

          <div className="mt-3 relative">
            <div className="absolute right-0 top-0 flex flex-col items-end gap-2 pr-1 pt-1 text-xs font-semibold">
              <span className="rounded bg-[#ff7a21] px-2 py-0.5 text-white">
                {cpiChangePct == null ? "+—%" : `${cpiChangePct >= 0 ? "+" : ""}${cpiChangePct.toFixed(1)}%`}
              </span>
              <span className="rounded bg-[#7b1f1f] px-2 py-0.5 text-white">
                {earningsChangePct == null ? "+—%" : `${earningsChangePct >= 0 ? "+" : ""}${earningsChangePct.toFixed(1)}%`}
              </span>
              <span className="rounded bg-[#6b5cff] px-2 py-0.5 text-white">
                {realChangePct == null ? "—%" : `${realChangePct >= 0 ? "+" : ""}${realChangePct.toFixed(1)}%`}
              </span>
            </div>

            <svg viewBox="0 0 520 280" className="w-full h-auto" aria-hidden="true">
              <defs>
                <clipPath id="chart-clip">
                  <rect x="40" y="20" width="430" height="220" rx="6" />
                </clipPath>
              </defs>
              <rect x="0" y="0" width="520" height="280" fill="transparent" />
              <g stroke="#d8dee5" strokeWidth="1">
                <line x1="40" y1="240" x2="470" y2="240" />
                <line x1="40" y1="196" x2="470" y2="196" />
                <line x1="40" y1="152" x2="470" y2="152" />
                <line x1="40" y1="108" x2="470" y2="108" />
                <line x1="40" y1="64" x2="470" y2="64" />
                <line x1="40" y1="20" x2="470" y2="20" />
              </g>
              <g clipPath="url(#chart-clip)" fill="none" strokeWidth="3">
                <path
                  d="M40 220 C 110 200, 160 170, 220 155 C 290 135, 340 120, 470 80"
                  stroke="#ff7a21"
                />
                <path
                  d="M40 226 C 120 210, 180 185, 240 165 C 310 145, 360 120, 470 92"
                  stroke="#7b1f1f"
                />
                <path
                  d="M40 232 C 120 236, 180 244, 240 242 C 320 240, 360 238, 470 235"
                  stroke="#6b5cff"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-neutral-800">
        <p className="m-0 text-[16px] leading-[1.35]">
          In the past, you needed about{" "}
          <span className="font-semibold">
            {pastHoursForBasket == null ? "X" : pastHoursForBasket.toFixed(1)}
          </span>{" "}
          hours of work to afford a basic set of goods.
          <br />
          Today, you need about{" "}
          <span className="font-semibold">
            {todayHoursForBasket == null ? "Y" : todayHoursForBasket.toFixed(1)}
          </span>{" "}
          hours of work for the same things.
        </p>
        <p className="mt-10 text-[15px] text-neutral-700">
          Your time has become less valuable.
        </p>
      </div>
    </section>
  );
}

