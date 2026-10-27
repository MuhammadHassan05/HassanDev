/**
 * Illustration for the ZarQais E-Commerce project card, converted from
 * design-kit/illustrations/zarqais-e-commerce.svg. Accent and glow colors come from the
 * track theme; draw-stroke marks the outlines that draw in on scroll.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the ZarQais E-Commerce card. */
export function ZarQaisECommerceIllustration({ className }: IllustrationProps) {
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
      <rect className="fill-glow" x="54" y="54" width="252" height="56" rx="8" fillOpacity="0.35" />
      <rect x="70" y="68" width="100" height="10" rx="5" fill="#E8EDF2" />
      <rect className="fill-accent" x="70" y="84" width="60" height="14" rx="7" />
      <circle cx="262" cy="82" r="18" fill="#1E2733" />
      <rect x="54" y="120" width="56" height="48" rx="6" fill="#1E2733" />
      <rect x="119" y="120" width="56" height="48" rx="6" fill="#1E2733" />
      <rect x="184" y="120" width="56" height="48" rx="6" fill="#1E2733" />
      <rect x="249" y="120" width="56" height="48" rx="6" fill="#1E2733" />
    </svg>
  );
}
