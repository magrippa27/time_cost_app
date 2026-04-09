import type { Ref } from "react";
import CompetitivePng from "../../../assets/competitive.png";
import InflationPng from "../../../assets/inflation.png";
import SavingsPng from "../../../assets/savings.png";

type DefinitionsSectionProps = {
  sectionRef?: Ref<HTMLElement>;
};

export default function DefinitionsSection({ sectionRef }: DefinitionsSectionProps) {
  return (
    <section
      ref={sectionRef}
      className="mt-14 rounded-[4px] bg-card px-10 py-12 shadow-sm border border-border scroll-mt-8"
      aria-label="Definitions"
    >
      <h2 className="m-0 text-center text-[clamp(2.2rem,4.5vw,3.4rem)] font-semibold text-foreground">
        First, some definitions
      </h2>

      <div className="mt-12 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-10 items-start">
          <div>
            <h3 className="m-0 text-[clamp(2.2rem,4.2vw,3rem)] font-semibold text-foreground">Inflation</h3>
            <p className="mt-3 max-w-[760px] text-[15px] leading-[1.4] text-text-default-default">
              Inflation is the general increase in prices over time.
              <br />
              When inflation rises, the same amount of money buys fewer goods and services.
              <br />
              This means the value of money, and the value of time spent earning it, decreases.
            </p>
          </div>
          <div className="flex justify-start lg:justify-end">
            <img
              src={InflationPng}
              alt=""
              className="h-[150px] w-[170px] object-contain dark:[filter:brightness(0)_invert(1)]"
              loading="lazy"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-10 items-start">
          <div>
            <h3 className="m-0 text-[clamp(2.2rem,4.2vw,3rem)] font-semibold text-foreground">CPI</h3>
            <p className="mt-3 max-w-[760px] text-[15px] leading-[1.4] text-text-default-default">
              The Consumer Price Index (CPI) measures how the prices of everyday goods and services change over time.
              <br />
              It is commonly used to track inflation and changes in the cost of living.
            </p>
          </div>
          <div className="flex justify-start lg:justify-end">
            <img
              src={CompetitivePng}
              alt=""
              className="h-[150px] w-[170px] object-contain dark:[filter:brightness(0)_invert(1)]"
              loading="lazy"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-10 items-start">
          <div>
            <h3 className="m-0 text-[clamp(2.2rem,4.2vw,3rem)] font-semibold text-foreground">Real wages</h3>
            <p className="mt-3 max-w-[760px] text-[15px] leading-[1.4] text-text-default-default">
              Real wages represent how much your income can actually buy.
              <br />
              They are calculated by adjusting wages for inflation.
              <br />
              If wages increase but prices rise faster, real wages fall, and people need to work more hours to afford the same things.
            </p>
          </div>
          <div className="flex justify-start lg:justify-end">
            <img
              src={SavingsPng}
              alt=""
              className="h-[150px] w-[170px] object-contain dark:[filter:brightness(0)_invert(1)]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

