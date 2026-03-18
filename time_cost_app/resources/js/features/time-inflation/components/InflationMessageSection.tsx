export default function InflationMessageSection() {
  return (
    <section
      className="mt-14 rounded-[4px] bg-white px-10 py-14 shadow-sm border border-neutral-200"
      aria-label="Inflation message"
    >
      <div className="mx-auto w-full max-w-[1100px] min-h-[min(85vh,860px)] flex flex-col">
        <h2 className="m-0 text-[clamp(2.6rem,5.4vw,4.2rem)] leading-[1.05] font-semibold text-neutral-900 max-w-[860px]">
          Inflation does not just increase prices.
          <br />
          It increases the amount of your life
          <br />
          you need to give away
        </h2>

        <p className="mt-16 max-w-[860px] text-[15px] leading-[1.45] text-neutral-700">
          When inflation is not caused by natural economic growth,
          <br />
          but by excessive money creation to finance public deficits or short-term political goals,
          <br />
          the cost is paid in people’s time.
        </p>

        <div className="flex-1 flex items-end justify-center">
          <p className="m-0 mb-6 text-center text-[clamp(2.3rem,4.8vw,3.6rem)] leading-[1.1] font-semibold text-neutral-900 max-w-[920px]">
            You work more hours,
            <br />
            not to improve your life,
            <br />
            but to stay in the same place.
          </p>
        </div>
      </div>
    </section>
  );
}

