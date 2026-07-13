import React from "react";

type MenuIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

/**
 * Hamburger menu icon.
 * Fills with `currentColor` so it inherits `text-primary`
 * from the wrapping <Button>. Pass `color` via className.
 *
 * Usage:
 *   <Button
 *     variant="ghost"
 *     size="icon-xs"
 *     className="lg:hidden text-primary hover:bg-transparent py-[6.25px]"
 *   >
 *     <MenuIcon />
 *   </Button>
 */
export default function MenuIcon({ size = 24, ...props }: MenuIconProps) {
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
        d="M21 7.75H3C2.59 7.75 2.25 7.41 2.25 7C2.25 6.59 2.59 6.25 3 6.25H21C21.41 6.25 21.75 6.59 21.75 7C21.75 7.41 21.41 7.75 21 7.75Z"
        fill="currentColor"
      />
      <path
        d="M21 12.75H3C2.59 12.75 2.25 12.41 2.25 12C2.25 11.59 2.59 11.25 3 11.25H21C21.41 11.25 21.75 11.59 21.75 12C21.75 12.41 21.41 12.75 21 12.75Z"
        fill="currentColor"
      />
      <path
        d="M21 17.75H3C2.59 17.75 2.25 17.41 2.25 17C2.25 16.59 2.59 16.25 3 16.25H21C21.41 16.25 21.75 16.59 21.75 17C21.75 17.41 21.41 17.75 21 17.75Z"
        fill="currentColor"
      />
    </svg>
  );
}