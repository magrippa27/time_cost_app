import NavigationPill from "./NavigationPill";

export interface NavItem {
  to: string;
  label: string;
  show?: boolean;
}

interface NavigationPillListProps {
  items?: NavItem[];
  className?: string;
  direction?: "Row" | "Column";
  onNavigate?: () => void;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { to: "/time-cost", label: "Time-Cost", show: true },
  { to: "/time-inflation", label: "Time-Inflation", show: true },
  { to: "/democracy", label: "How to fix Democracy?", show: true },
  { to: "#", label: "Resources", show: false },
  { to: "#", label: "Pricing", show: false },
  { to: "/about", label: "About", show: true },
  { to: "#", label: "Link", show: false },
];

export default function NavigationPillList({
  items = DEFAULT_NAV_ITEMS,
  className = "",
  direction = "Row",
  onNavigate,
}: NavigationPillListProps) {
  const visible = items.filter((item) => item.show !== false);
  return (
    <nav
      className={`flex flex-1 flex-wrap items-center justify-end gap-space-200 shrink-0 text-body-size-medium text-text-default-default font-body-font-family ${direction === "Column" ? "flex-col" : ""} ${className}`}
      aria-label="Main navigation"
    >
      {visible.map((item) => (
        <NavigationPill
          key={item.to + item.label}
          to={item.to}
          label={item.label}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
}
