import ReactFlagsSelect from "react-flags-select";

interface CountrySelectProps {
  value: string;
  onChange: (code: string) => void;
  label?: string;
  id?: string;
  className?: string;
  placeholder?: string;
}

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

export function getCountryName(code: string): string {
  if (!code) return "—";
  try {
    return regionNames.of(code) ?? code;
  } catch {
    return code;
  }
}

export default function CountrySelect({
  value,
  onChange,
  label = "Country",
  id,
  className = "",
  placeholder = "Select country",
}: CountrySelectProps) {
  return (
    <div className={`country-select flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text-default-default">
          {label}
        </label>
      )}
      <ReactFlagsSelect
        selected={value}
        onSelect={onChange}
        searchable
        searchPlaceholder="Search countries"
        placeholder={placeholder}
        showSelectedLabel
        showOptionLabel
        showSecondarySelectedLabel={false}
        showSecondaryOptionLabel={false}
        selectButtonClassName="!rounded-lg !border-2 !border-border-default-default !bg-background-default-default !px-4 !py-3 !min-h-[46px] !text-text-default-default"
        optionsSize={14}
        selectedSize={14}
        fullWidth
        className="!w-full"
        rfsKey={id ?? "country-select"}
      />
    </div>
  );
}
