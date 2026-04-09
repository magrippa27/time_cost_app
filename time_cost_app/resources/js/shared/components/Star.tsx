import type { ReactNode } from "react";
import { useMemo } from "react";

interface StarProps {
  className?: string;
  size?: string;
  state?: string;
  variant?: string;
  label?: string;
  hasIconEnd?: boolean;
  hasIconStart?: boolean;
  starPosition?: React.CSSProperties["position"];
  starTop?: string;
  starLeft?: string;
  starWidth?: string;
  starHeight?: string;
  iconEnd?: ReactNode;
  iconStart?: ReactNode;
  iconStart1?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Star({
  className = "",
  size = "Medium",
  state = "Default",
  variant = "Primary",
  label = "Button",
  hasIconEnd = false,
  hasIconStart = false,
  starPosition,
  starTop,
  starLeft,
  starWidth,
  starHeight,
  iconEnd,
  iconStart,
  iconStart1,
  loading = false,
  disabled = false,
  onClick,
}: StarProps) {
  const starStyle = useMemo(
    () => ({
      position: starPosition,
      top: starTop,
      left: starLeft,
      width: starWidth,
      height: starHeight,
    }),
    [starPosition, starTop, starLeft, starWidth, starHeight]
  );

  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      className={`rounded-lg border-2 border-neutral-800 bg-neutral-900 text-white shadow-md transition-colors hover:bg-black hover:border-black focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 overflow-hidden flex items-center justify-center px-5 py-3 gap-2 text-left text-body-size-medium font-body-font-family font-medium cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
      style={starStyle}
    >
      {loading ? (
        <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden />
      ) : (
        <>
          {iconStart1}
          <span className="relative leading-[100%] shrink-0">{label}</span>
          {iconEnd}
        </>
      )}
    </button>
  );
}
