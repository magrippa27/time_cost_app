export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-tight text-foreground mb-8">
          About
        </h1>
        <div className="space-y-6 text-text-default-default text-[18px] leading-[1.65]">
          <p>
            The intention of this website is to invite reflection and encourage critical thinking about time, work, and public decisions. It is not meant to tell you what to think, but to help you question, compare, and reflect.
          </p>
          <p>
            We do not store personal data, track users, or monitor behavior. Any posts or comments are anonymous and voluntary.
          </p>
          <p>
            The information shown on this website is educational only. It does not represent legal, financial, or economic advice, and it does not claim to show exact or individual figures. All calculations are based on public data, averages, and estimates.
          </p>
          <p>
            This project exists to help people think more consciously about how their time is used — and how decisions made today shape life tomorrow.
          </p>
          <blockquote className="border-r-4 border-border pr-6 py-2 my-8 italic text-right text-[20px] leading-[1.5]">
            <p>
              &quot;Enlightenment is humanity&apos;s emergence from its self-imposed immaturity.&quot;
            </p>
            <footer className="mt-2 not-italic text-[18px] text-text-default-default">
              — Immanuel Kant
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
