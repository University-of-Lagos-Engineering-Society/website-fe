import React from "react";

type CloseIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

/**
 * Close (X) icon — counterpart to MenuIcon.
 * Drawn as two capsule-shaped diagonal bars (filled paths with rounded
 * ends), matching the hamburger's 1.5-unit bar weight and cap style
 * exactly. Diagonals span 5→19 to keep the same optical weight as the
 * full-width horizontal bars.
 *
 * Uses `currentColor`, so it inherits `text-primary` from the wrapper.
 *
 * Usage:
 *   <Button
 *     variant="ghost"
 *     size="icon-xs"
 *     className="lg:hidden text-primary hover:bg-transparent py-[6.25px]"
 *   >
 *     <CloseIcon />
 *   </Button>
 */
export default function CloseIcon({ size = 24, ...props }: CloseIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M5 5L19 19"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M19 5L5 19"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}