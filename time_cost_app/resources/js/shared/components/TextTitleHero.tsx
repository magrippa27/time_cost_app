interface TextTitleHeroProps {
  className?: string;
  text?: string;
}

export default function TextTitleHero({
  className = "",
  text = "Calculate how much here",
}: TextTitleHeroProps) {
  return (
    <div
      className={`absolute top-[690px] left-[323px] w-[824px] h-[72px] flex items-start text-left text-title-hero-size text-text-default-default font-title-hero-font-family ${className}`}
    >
      <h2 className="m-0 relative text-[length:inherit] tracking-num--0_03 leading-[120%] font-title-hero-font-weight font-inherit shrink-0">
        {text}
      </h2>
    </div>
  );
}
