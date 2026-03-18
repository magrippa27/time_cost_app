import { useEffect, useMemo, useRef } from "react";
import CpiGauge from "./CpiGauge";

type CpiSlidesProps = {
  autoAdvance?: boolean;
};

export default function CpiSlides({ autoAdvance = true }: CpiSlidesProps) {
  const slide1Ref = useRef<HTMLElement | null>(null);
  const slide2Ref = useRef<HTMLElement | null>(null);
  const slide3Ref = useRef<HTMLElement | null>(null);

  const cpiValue = useMemo(() => Math.floor(Math.random() * 41) + 60, []);
  useEffect(() => {
    if (!autoAdvance) {
      return;
    }
    const t1 = window.setTimeout(() => slide2Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 2600);
    const t2 = window.setTimeout(() => slide3Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 5600);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [autoAdvance]);

  return (
    <div className="w-full bg-background-default-default">
      <section
        ref={slide1Ref}
        className="min-h-screen w-full flex items-start"
      >
        <div className="max-w-[1440px] mx-auto w-full">
          <div className="relative min-h-screen px-6 py-16 lg:px-0 lg:max-w-[1100px] lg:mx-auto lg:transform lg:-translate-x-24">
            <div className="lg:hidden">
              <div className="text-center">
                <h2 className="m-0 text-[clamp(2.6rem,7vw,3.6rem)] leading-[1.05] font-title-hero-font-family font-title-hero-font-weight tracking-[-1.2px] text-text-default-default">
                  What then?
                </h2>
              </div>
              <div className="mt-10 space-y-8">
                <p className="text-sm leading-[1.45] text-neutral-800">
                  Taxes are a necessary part of society. They help maintain healthcare, security, education, infrastructure,
                  and common services. In this sense, investing part of your time into taxes is fair and necessary.
                </p>
                <p className="text-[clamp(1.8rem,6vw,2.4rem)] leading-[1.1] font-semibold text-text-default-default">
                  But your time is limited.
                </p>
                <p className="text-sm leading-[1.45] text-neutral-800">
                  And the question is not only how much time you give, but what happens to that time. What if the time you
                  work so hard to give is wasted, misused, or even stolen?
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="absolute left-[503px] top-[145px] w-[389px] h-[86px] flex items-center justify-center">
                <h2 className="m-0 text-[64px] leading-[86px] font-title-hero-font-family font-title-hero-font-weight tracking-[-1.4px] text-text-default-default">
                  What then?
                </h2>
              </div>

              <div className="absolute left-[21px] top-[330px] w-[1351px]">
                <p className="m-0 text-[15px] leading-[1.35] text-neutral-800">
                  Taxes are a necessary part of society.
                  <br />
                  They help maintain healthcare, security, education, infrastructure, and common services.
                  <br />
                  In this sense, investing part of your time into taxes is fair and necessary.
                </p>
              </div>

              <div className="absolute left-[895px] top-[518px] w-[334px]">
                <p className="m-0 text-[44px] leading-[1.05] font-semibold text-text-default-default text-left">
                  But your time
                  <br />
                  is limited.
                </p>
              </div>

              <div className="absolute left-[21px] top-[792px] w-[807px]">
                <p className="m-0 text-[14px] leading-[1.35] text-neutral-800">
                  And the question is not only how much time you give,
                  <br />
                  but what happens to that time.
                </p>
              </div>

              <div className="absolute left-[751px] top-[1009px] w-[621px]">
                <p className="m-0 text-[14px] leading-[1.35] text-neutral-800 text-left">
                  What if the time you work so hard to give
                  <br />
                  is wasted, misused, or even stolen?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={slide2Ref}
        className="min-h-screen w-full flex items-center"
      >
        <div className="max-w-[1440px] mx-auto w-full">
          <div className="relative min-h-screen px-6 py-16 lg:px-0 lg:max-w-[1100px] lg:mx-auto lg:transform lg:-translate-x-24">
            <div className="lg:hidden space-y-8">
              <h3 className="m-0 text-[clamp(2rem,6vw,2.6rem)] font-semibold text-text-default-default leading-tight">
                Your country has a corruption perception index of {cpiValue}
              </h3>
              <div className="flex justify-center">
                <CpiGauge value={cpiValue} />
              </div>
              <p className="text-sm leading-[1.45] text-neutral-800">
                This means there is a higher risk that part of your time, paid through taxes, does not turn into real public benefit.
              </p>
              <h3 className="m-0 text-[clamp(1.5rem,5vw,2rem)] font-semibold text-text-default-default leading-tight">
                Are you sure your time is being respected by the politicians of your country?
              </h3>
            </div>

            <div className="hidden lg:block">
              <div className="absolute left-[60px] top-[254px] w-[987px]">
                <h3 className="m-0 text-[48px] leading-[1.05] font-title-hero-font-family font-title-hero-font-weight text-text-default-default">
                  Your country has a corruption
                  <br />
                  perception index of {cpiValue}
                </h3>
              </div>

              <div className="absolute left-[57px] top-[800px] w-[1130px]">
                <p className="m-0 text-[16px] leading-[1.35] text-neutral-800">
                  This means there is a higher risk that part of your time, paid through taxes, does not turn into real public benefit.
                </p>
              </div>

              <div className="absolute left-[60px] top-[459px] w-[620px] h-[270px] flex items-center">
                <CpiGauge value={cpiValue} />
                <div className="ml-10 h-[120px] w-px bg-neutral-300" />
                <div className="ml-10 flex-1">
                  <p className="m-0 text-[18px] leading-[1.35] font-title-hero-font-family font-title-hero-font-weight tracking-[0.08em] uppercase text-neutral-900">
                    The CPI uses a scale from <span className="font-extrabold">0 to 100</span>
                  </p>
                  <div className="mt-4 text-[14px] leading-[1.4] text-neutral-800">
                    <p className="m-0">
                      <span>100 is </span>
                      <span className="font-semibold">very clean</span>
                      <span> and 0 is </span>
                      <span className="font-semibold">highly corrupt</span>
                      <span>.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={slide3Ref}
        className="min-h-screen w-full flex items-center"
      >
        <div className="max-w-[1440px] mx-auto w-full">
          <div className="relative min-h-screen px-6 py-16 lg:px-0 lg:max-w-[1100px] lg:mx-auto lg:transform lg:-translate-x-24">
            <div className="lg:hidden space-y-10">
              <h3 className="m-0 text-[clamp(2rem,6vw,2.8rem)] font-semibold text-text-default-default">Get involved.</h3>
              <div className="space-y-3">
                <p className="m-0 text-[clamp(1.4rem,5vw,2rem)] font-semibold text-text-default-default">Educate yourself</p>
                <p className="text-sm leading-[1.45] text-neutral-800">
                  You have access to more human knowledge than at any time in history — a modern Library of Alexandria.
                </p>
              </div>
              <div className="space-y-3">
                <p className="m-0 text-[clamp(1.4rem,5vw,2rem)] font-semibold text-text-default-default">Develop critical thinking</p>
                <p className="text-sm leading-[1.45] text-neutral-800">Listen, question, and respect different opinions.</p>
              </div>
              <h3 className="m-0 text-[clamp(1.9rem,6vw,2.7rem)] font-semibold text-text-default-default">
                Time is all you truly have.
              </h3>
              <div className="pt-8 space-y-3">
                <p className="text-sm leading-[1.45] text-neutral-800">
                  “The price good men pay for indifference to public affairs is to be ruled by inferior men.”
                </p>
                <p className="text-sm text-neutral-600">— Plato</p>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="absolute left-[510px] top-[132px] w-[450px]">
                <h3 className="m-0 text-[48px] leading-[1.05] font-title-hero-font-family font-title-hero-font-weight text-text-default-default text-center">
                  Get involved.
                </h3>
              </div>

              <div className="absolute left-[57px] top-[305px] w-[564px]">
                <h3 className="m-0 text-[44px] leading-[1.05] font-title-hero-font-family font-title-hero-font-weight text-text-default-default">
                  Educate yourself
                </h3>
              </div>

              <div className="absolute left-[52px] top-[401px] w-[1074px]">
                <p className="m-0 text-[16px] leading-[1.35] text-neutral-800">
                  You have access to more human knowledge than at any time in history — a modern Library of Alexandria.
                </p>
              </div>

              <div className="absolute left-[575px] top-[565px] w-[802px]">
                <h3 className="m-0 text-[44px] leading-[1.05] font-title-hero-font-family font-title-hero-font-weight text-text-default-default text-left">
                  Develop critical thinking
                </h3>
              </div>

              <div className="absolute left-[631px] top-[642px] w-[721px]">
                <p className="m-0 text-[16px] leading-[1.35] text-neutral-800">
                  Listen, question, and respect different opinions.
                </p>
              </div>

              <div className="absolute left-[57px] top-[845px] w-[564px]">
                <h3 className="m-0 text-[48px] leading-[1.05] font-title-hero-font-family font-title-hero-font-weight text-text-default-default whitespace-nowrap">
                  Time is all you truly have.
                </h3>
              </div>

              <div className="absolute left-[575px] top-[1115px] w-[802px]">
                <p className="m-0 text-[18px] leading-[1.6] text-neutral-900">
                  “The price good men pay for indifference to public affairs is to be ruled by inferior men.”
                </p>
                <p className="mt-4 text-[16px] leading-[1.4] font-semibold text-neutral-900">— Plato</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

