import CpiGauge from "./CpiGauge";

type CpiSlidesProps = {
  cpiValue: number;
  countryName: string;
};

function cpiHeadlinePrefix(countryName: string) {
  if (countryName && countryName !== "—") {
    return (
      <>
        Your country, {countryName}, has a corruption
      </>
    );
  }

  return <>Your country has a corruption</>;
}

function CpiScaleExplanation({ variant }: { variant: "mobile" | "desktop" }) {
  const titleClass =
    variant === "desktop"
      ? "m-0 text-[18px] leading-[1.35] font-title-hero-font-family font-title-hero-font-weight tracking-[0.08em] uppercase text-foreground"
      : "m-0 text-[clamp(0.95rem,3.2vw,1.05rem)] leading-[1.55] font-title-hero-font-family font-title-hero-font-weight tracking-[0.06em] uppercase text-foreground";

  const bodyClass =
    variant === "desktop"
      ? "m-0 mt-4 text-[14px] leading-[1.45] text-text-default-default"
      : "m-0 text-sm leading-[1.55] text-text-default-default";

  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <p className={titleClass}>
        The CPI uses a scale from <span className="font-extrabold">0 to 100</span>
      </p>
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-text-default-default" />
        <div className="h-px flex-1 max-w-[200px] bg-text-default-default" />
      </div>
      <p className={bodyClass}>
        On this scale, <span className="font-semibold">100 is very clean</span> and <span className="font-semibold">0 is highly corrupt</span>
        —lower scores mean more perceived corruption.
      </p>
    </div>
  );
}

export default function CpiSlides({ cpiValue, countryName }: CpiSlidesProps) {
  return (
    <div className="w-full bg-background-default-default">
      <section className="flex w-full min-h-0 items-start lg:min-h-screen">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="relative min-h-0 px-4 py-20 sm:px-6 sm:py-24 lg:min-h-screen lg:px-0 lg:py-16 lg:max-w-[1100px] lg:mx-auto lg:transform lg:-translate-x-24">
            <div className="flex flex-col gap-10 text-left sm:gap-12 lg:hidden">
              <h2 className="m-0 text-[clamp(2.35rem,6vw,3.6rem)] leading-snug font-title-hero-font-family font-title-hero-font-weight tracking-[-1.2px] text-text-default-default">
                What then?
              </h2>
              <div className="flex flex-col gap-8 sm:gap-10">
                <p className="m-0 text-sm leading-[1.55] text-text-default-default">
                  Taxes are a necessary part of society. They help maintain healthcare, security, education, infrastructure,
                  and common services. In this sense, investing part of your time into taxes is fair and necessary.
                </p>
                <p className="m-0 text-[clamp(1.65rem,5.5vw,2.4rem)] leading-snug font-semibold text-text-default-default">
                  But your time is limited.
                </p>
                <p className="m-0 text-sm leading-[1.55] text-text-default-default">
                  And the question is not only how much time you give, but what happens to that time. What if the time you
                  work so hard to give is wasted, misused, or even stolen?
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="absolute left-[503px] top-[145px] w-[389px] h-[86px] flex items-center justify-start">
                <h2 className="m-0 text-[64px] leading-[86px] font-title-hero-font-family font-title-hero-font-weight tracking-[-1.4px] text-text-default-default text-left">
                  What then?
                </h2>
              </div>

              <div className="absolute left-[21px] top-[330px] w-[1351px]">
                <p className="m-0 text-[15px] leading-[1.35] text-text-default-default">
                  Taxes are a necessary part of society.
                  <br />
                  They help maintain healthcare, security, education, infrastructure, and common services.
                  <br />
                  In this sense, investing part of your time into taxes is fair and necessary.
                </p>
              </div>

              <div className="absolute left-[503px] top-[518px] w-[389px]">
                <p className="m-0 text-[44px] leading-[1.05] font-semibold text-text-default-default text-left">
                  But your time
                  <br />
                  is limited.
                </p>
              </div>

              <div className="absolute left-[21px] top-[792px] w-[807px]">
                <p className="m-0 text-[14px] leading-[1.35] text-text-default-default">
                  And the question is not only how much time you give,
                  <br />
                  but what happens to that time.
                </p>
              </div>

              <div className="absolute left-[751px] top-[1009px] w-[621px]">
                <p className="m-0 text-[14px] leading-[1.35] text-text-default-default text-left">
                  What if the time you work so hard to give
                  <br />
                  is wasted, misused, or even stolen?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full min-h-0 items-center lg:min-h-screen">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="relative min-h-0 px-4 py-20 sm:px-6 sm:py-24 lg:min-h-screen lg:px-0 lg:py-16 lg:max-w-[1100px] lg:mx-auto lg:transform lg:-translate-x-24">
            <div className="flex flex-col gap-16 sm:gap-20 lg:hidden">
              <h3 className="m-0 text-[clamp(1.85rem,5.5vw,2.6rem)] font-semibold leading-snug tracking-[-0.02em] text-text-default-default">
                {countryName && countryName !== "—" ? (
                  <>
                    Your country, {countryName}, has a corruption perception index of {cpiValue}
                  </>
                ) : (
                  <>Your country has a corruption perception index of {cpiValue}</>
                )}
              </h3>
              <div className="flex justify-center">
                <CpiGauge value={cpiValue} />
              </div>
              <CpiScaleExplanation variant="mobile" />
              <p className="m-0 text-sm leading-[1.55] text-text-default-default">
                This means there is a higher risk that part of your time, paid through taxes, does not turn into real public benefit.
              </p>
              <h3 className="m-0 text-[clamp(1.45rem,4.5vw,2rem)] font-semibold leading-snug tracking-[-0.02em] text-text-default-default">
                Are you sure your time is being respected by the politicians of your country?
              </h3>
            </div>

            <div className="hidden lg:block">
              <div className="absolute left-[60px] top-[254px] w-[987px]">
                <h3 className="m-0 text-[48px] leading-[1.05] font-title-hero-font-family font-title-hero-font-weight text-text-default-default">
                  {cpiHeadlinePrefix(countryName)}
                  <br />
                  perception index of {cpiValue}
                </h3>
              </div>

              <div className="absolute left-[57px] top-[800px] w-[1130px]">
                <p className="m-0 text-[16px] leading-[1.35] text-text-default-default">
                  This means there is a higher risk that part of your time, paid through taxes, does not turn into real public benefit.
                </p>
              </div>

              <div className="absolute left-[60px] top-[459px] w-[620px] h-[270px] flex items-center">
                <CpiGauge value={cpiValue} />
                <div className="ml-10 h-[120px] w-px bg-border-default-default" />
                <div className="ml-10 flex-1 min-w-0">
                  <CpiScaleExplanation variant="desktop" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full min-h-0 items-center lg:min-h-screen">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="relative min-h-0 px-4 py-20 sm:px-6 sm:py-24 lg:min-h-[1420px] lg:px-0 lg:py-16 lg:max-w-[1100px] lg:mx-auto lg:transform lg:-translate-x-24 lg:pb-24">
            <div className="flex flex-col gap-16 sm:gap-20 lg:hidden">
              <h3 className="m-0 text-[clamp(1.85rem,5.5vw,2.8rem)] font-semibold leading-snug tracking-[-0.02em] text-text-default-default">Get involved.</h3>
              <div className="flex flex-col gap-3">
                <p className="m-0 text-[clamp(1.35rem,4.8vw,2rem)] font-semibold leading-snug text-text-default-default">Educate yourself</p>
                <p className="m-0 text-sm leading-[1.55] text-text-default-default">
                  You have access to more human knowledge than at any time in history — a modern Library of Alexandria.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="m-0 text-[clamp(1.35rem,4.8vw,2rem)] font-semibold leading-snug text-text-default-default">Develop critical thinking</p>
                <p className="m-0 text-sm leading-[1.55] text-text-default-default">Listen, question, and respect different opinions.</p>
              </div>
              <h3 className="m-0 text-[clamp(1.75rem,5.5vw,2.7rem)] font-semibold leading-snug tracking-[-0.02em] text-text-default-default">
                Time is all you truly have.
              </h3>
              <blockquote className="mx-auto mb-10 max-w-2xl border-r-4 border-border py-4 pr-4 italic text-right text-[20px] leading-[1.55] text-foreground sm:mb-16 sm:pr-6">
                <p className="m-0">
                  “The price good men pay for indifference to public affairs is to be ruled by inferior men.”
                </p>
                <footer className="mt-3 not-italic text-[18px] leading-normal text-text-default-default">— Plato</footer>
              </blockquote>
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
                <p className="m-0 text-[16px] leading-[1.35] text-text-default-default">
                  You have access to more human knowledge than at any time in history — a modern Library of Alexandria.
                </p>
              </div>

              <div className="absolute left-[575px] top-[565px] w-[802px]">
                <h3 className="m-0 text-[44px] leading-[1.05] font-title-hero-font-family font-title-hero-font-weight text-text-default-default text-left">
                  Develop critical thinking
                </h3>
              </div>

              <div className="absolute left-[631px] top-[642px] w-[721px]">
                <p className="m-0 text-[16px] leading-[1.35] text-text-default-default">
                  Listen, question, and respect different opinions.
                </p>
              </div>

              <div className="absolute left-[57px] top-[845px] w-[564px]">
                <h3 className="m-0 text-[48px] leading-[1.05] font-title-hero-font-family font-title-hero-font-weight text-text-default-default whitespace-nowrap">
                  Time is all you truly have.
                </h3>
              </div>

              <blockquote className="absolute left-1/2 top-[1080px] w-[min(802px,calc(100%-3rem))] max-w-[802px] -translate-x-1/2 border-r-4 border-border pr-6 py-2 italic text-right text-[20px] leading-[1.5] text-foreground">
                <p className="m-0">
                  “The price good men pay for indifference to public affairs is to be ruled by inferior men.”
                </p>
                <footer className="mt-2 not-italic text-[18px] text-text-default-default">— Plato</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

