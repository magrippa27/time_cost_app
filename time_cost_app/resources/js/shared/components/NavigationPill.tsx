import { Link, usePage } from "@inertiajs/react";

interface NavigationPillProps {
  to: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
}

export default function NavigationPill({ to, label, className = "", onNavigate }: NavigationPillProps) {
  const url = usePage().url;
  const isHash = to.startsWith("#");
  const isActive = !isHash && (to === "/" ? url === "/" : url === to || url.startsWith(`${to}/`));

  return (
    <Link
      href={to}
      onClick={onNavigate}
      className={`rounded-radius-200 flex items-center justify-center p-space-200 text-left text-body-size-medium font-body-font-family transition-colors hover:bg-background-default-secondary ${isActive ? "bg-background-default-secondary text-text-default-default" : "text-text-default-default"} ${className}`}
    >
      <span className="relative leading-[100%]">{label}</span>
    </Link>
  );
}
