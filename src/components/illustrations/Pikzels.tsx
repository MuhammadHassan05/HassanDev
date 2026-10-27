/**
 * Illustration for the Pikzels project card, converted from
 * design-kit/illustrations/pikzels.svg. Accent and glow colors come from the
 * track theme; draw-stroke marks the outlines that draw in on scroll.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the Pikzels card. */
export function PikzelsIllustration({ className }: IllustrationProps) {
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
        y="20"
        width="280"
        height="30"
        rx="15"
        fill="#111720"
        stroke="#2A3542"
        pathLength={1}
      />
      <path className="fill-accent" d="M58 35l3-7 3 7 7 3-7 3-3 7-3-7-7-3z" />
      <rect x="78" y="32" width="140" height="6" rx="3" fill="#6B7785" />
      <rect className="fill-accent" x="262" y="26" width="50" height="18" rx="9" />
      <rect x="40" y="64" width="134" height="76" rx="8" fill="#1E2733" />
      <circle cx="146" cy="104" r="20" fill="#2A3542" />
      <rect className="fill-accent" x="52" y="78" width="70" height="12" rx="3" />
      <rect x="52" y="96" width="50" height="12" rx="3" fill="#E8EDF2" />
      <rect x="186" y="64" width="134" height="76" rx="8" fill="#1E2733" />
      <circle cx="214" cy="104" r="20" fill="#2A3542" />
      <rect className="fill-glow" x="240" y="80" width="68" height="12" rx="3" />
      <rect x="250" y="98" width="58" height="12" rx="3" fill="#E8EDF2" />
      <rect
        className="draw-stroke"
        x="40"
        y="152"
        width="62"
        height="34"
        rx="6"
        fill="#1E2733"
        stroke="#2A3542"
        pathLength={1}
      />
      <rect
        className="draw-stroke"
        x="112"
        y="152"
        width="62"
        height="34"
        rx="6"
        fill="#1E2733"
        stroke="#2A3542"
        pathLength={1}
      />
      <rect
        className="draw-stroke"
        x="186"
        y="152"
        width="62"
        height="34"
        rx="6"
        fill="#1E2733"
        stroke="#2A3542"
        pathLength={1}
      />
      <rect
        className="draw-stroke"
        x="258"
        y="152"
        width="62"
        height="34"
        rx="6"
        fill="#1E2733"
        stroke="#2A3542"
        pathLength={1}
      />
    </svg>
  );
}
