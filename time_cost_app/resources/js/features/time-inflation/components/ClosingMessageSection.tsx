export default function ClosingMessageSection() {
  return (
    <section
      className="mt-14 rounded-[4px] bg-white px-10 py-14 shadow-sm border border-neutral-200"
      aria-label="Closing message"
    >
      <div className="mx-auto w-full max-w-[1100px] min-h-[min(85vh,860px)] flex flex-col">
        <p className="m-0 max-w-[720px] text-[15px] leading-[1.45] text-neutral-700">
          Inflation silently changes the value of your work.
          <br />
          It does not take your job — it takes more of your life.
        </p>

        <div className="mt-24 flex justify-center">
          <h2 className="m-0 text-center text-[clamp(2.8rem,6vw,4.2rem)] leading-[1.05] font-semibold text-neutral-900 max-w-[980px]">
            Your time is what politics spends.
          </h2>
        </div>

        <div className="flex-1 flex items-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <p className="m-0 text-[15px] leading-[1.45] text-neutral-700">
              “Inflation is always and everywhere a monetary phenomenon.”
            </p>
            <p className="m-0 text-[15px] leading-[1.45] text-neutral-700 text-left md:text-right">
              — Milton Friedman
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

