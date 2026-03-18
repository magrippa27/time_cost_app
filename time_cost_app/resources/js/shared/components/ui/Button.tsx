import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-[var(--radius-md)] px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 disabled:opacity-50";
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]",
    secondary:
      "bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-text-muted)]/30 hover:bg-[var(--color-text-muted)]/10",
    ghost: "text-[var(--color-text)] hover:bg-[var(--color-text-muted)]/10",
  };
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
