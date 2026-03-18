interface TextSubheadingProps {
  className?: string;
  text?: string;
}

export default function TextSubheading({
  className = "",
  text = "(No need to include real data)",
}: TextSubheadingProps) {
  return (
    <div
      className={`absolute top-[780px] left-[576px] w-[287px] h-[23px] flex items-start text-left text-subheading-size-medium text-text-default-default font-subheading-font-family ${className}`}
    >
      <h3 className="m-0 relative text-[length:inherit] leading-[120%] font-subheading-font-weight font-inherit">
        {text}
      </h3>
    </div>
  );
}
