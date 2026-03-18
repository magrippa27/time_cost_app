export default function UnequalImpactSection() {
  return (
    <section
      className="mt-14 rounded-[4px] bg-white px-10 py-14 shadow-sm border border-neutral-200"
      aria-label="Unequal impact message"
    >
      <div className="mx-auto w-full max-w-[1100px] min-h-[min(85vh,860px)] flex flex-col">
        <div className="space-y-14">
          <h2 className="m-0 text-[clamp(2.6rem,5.4vw,4.2rem)] leading-[1.05] font-semibold text-neutral-900 max-w-[980px]">
            Inflation does not hurt everyone
            <br />
            equally.
          </h2>

          <h2 className="m-0 text-[clamp(2.6rem,5.4vw,4.2rem)] leading-[1.05] font-semibold text-neutral-900 max-w-[980px]">
            People with lower incomes,
            <br />
            suffer the most.
          </h2>
        </div>

        <div className="mt-20 flex justify-center">
          <p className="m-0 text-center max-w-[620px] text-[15px] leading-[1.45] text-neutral-700">
            They spend a larger share of their income on basic goods,
            <br />
            have little or no savings,
            <br />
            and are affected first when prices rise.
          </p>
        </div>

        <div className="flex-1 flex items-end">
          <p className="m-0 mb-6 text-left text-[clamp(2.3rem,4.8vw,3.6rem)] leading-[1.1] font-semibold text-neutral-900 max-w-[980px]">
            Inflation takes more time
            <br />
            from those who have the least time to lose
          </p>
        </div>
      </div>
    </section>
  );
}

