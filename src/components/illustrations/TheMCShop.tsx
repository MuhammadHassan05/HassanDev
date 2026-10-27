/**
 * Illustration for the TheMCShop project card, converted from
 * design-kit/illustrations/themcshop.svg. Accent and glow colors come from the
 * track theme; draw-stroke marks the outlines that draw in on scroll.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the TheMCShop card. */
export function TheMCShopIllustration({ className }: IllustrationProps) {
  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 360 200"
      fill="none"
      className={className}
    >
      <rect
        className="draw-stroke"
        x="40"
        y="18"
        width="280"
        height="164"
        rx="10"
        fill="#111720"
        stroke="#2A3542"
        pathLength={1}
      />
      <circle cx="56" cy="32" r="3.5" fill="#2A3542" />
      <circle cx="68" cy="32" r="3.5" fill="#2A3542" />
      <circle cx="80" cy="32" r="3.5" fill="#2A3542" />
      <path className="draw-stroke" d="M40 44h280" stroke="#2A3542" pathLength={1} />
      <rect x="56" y="54" width="60" height="7" rx="3.5" fill="#E8EDF2" />
      <path
        className="stroke-accent draw-stroke"
        d="M290 52h4l3 12h14l3-9h-18"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
      <circle className="fill-accent" cx="300" cy="68" r="1.8" />
      <circle className="fill-accent" cx="310" cy="68" r="1.8" />
      <rect x="56" y="76" width="74" height="62" rx="6" fill="#1E2733" />
      <rect x="143" y="76" width="74" height="62" rx="6" fill="#1E2733" />
      <rect x="230" y="76" width="74" height="62" rx="6" fill="#1E2733" />
      <rect x="56" y="146" width="56" height="5" rx="2.5" fill="#9AA6B2" />
      <rect className="fill-accent" x="56" y="156" width="26" height="6" rx="3" />
      <rect x="143" y="146" width="48" height="5" rx="2.5" fill="#9AA6B2" />
      <rect className="fill-accent" x="143" y="156" width="26" height="6" rx="3" />
      <rect x="230" y="146" width="60" height="5" rx="2.5" fill="#9AA6B2" />
      <rect className="fill-accent" x="230" y="156" width="26" height="6" rx="3" />
    </svg>
  );
}
