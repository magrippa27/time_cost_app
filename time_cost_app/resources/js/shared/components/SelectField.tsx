import ChevronDown from "../../assets/Chevron-down.svg";

interface SelectFieldProps {
  className?: string;
  state?: string;
  valueType?: string;
  value?: string;
  description?: string;
  label?: string;
  hasDescription?: boolean;
  open1?: boolean;
  hasLabel?: boolean;
}

export default function SelectField({
  className = "",
  state = "Default",
  valueType = "Default",
  value = "Value",
  description = "Description",
  label = "Country",
  hasDescription = false,
  open1 = false,
  hasLabel = true,
}: SelectFieldProps) {
  return (
    <div
      className={`absolute top-[880px] left-[206px] w-[277px] h-[104px] flex flex-col items-start gap-space-200 text-left text-body-size-medium text-text-default-default font-body-font-family ${className}`}
    >
      {!!hasLabel && (
        <label className="self-stretch relative leading-[140%] font-medium text-[15px] text-text-default-default">
          {label}
        </label>
      )}
      {!!hasDescription && (
        <div className="w-60 relative leading-[140%] text-text-default-secondary text-sm">
          {description}
        </div>
      )}
      <div className="self-stretch h-11 rounded-lg border-2 border-input bg-card shadow-sm transition-colors hover:border-muted-foreground/50 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30 focus-within:ring-offset-0 box-border flex items-center py-3 pl-4 pr-3 relative isolate gap-2 min-w-[120px] cursor-pointer">
        <div className="flex-1 relative leading-[100%] z-0 shrink-0 text-text-default-default">
          {value}
        </div>
        <img
          className="h-4 w-4 opacity-70 relative z-[1] shrink-0 dark:invert"
          alt=""
          src={ChevronDown}
        />
        {!!open1 && (
          <div className="absolute top-[calc(100%+4px)] left-0 right-0 shadow-lg rounded-lg bg-popover border-2 border-border flex flex-col items-stretch p-1 gap-0 z-[2] shrink-0 text-popover-foreground">
            <div className="relative leading-[140%] font-body-font-weight-strong px-3 py-2 rounded-md hover:bg-accent">
              Hello World
            </div>
            <div className="relative leading-[140%] px-3 py-2 rounded-md hover:bg-accent">Option 2</div>
            <div className="relative leading-[140%] px-3 py-2 rounded-md hover:bg-accent">Option 3</div>
            <div className="relative leading-[140%] px-3 py-2 rounded-md hover:bg-accent">Option 4</div>
            <div className="relative leading-[140%] px-3 py-2 rounded-md hover:bg-accent">Option 5</div>
          </div>
        )}
      </div>
    </div>
  );
}
