/**
 * Illustration for the Tevar Identity project card, converted from
 * design-kit/illustrations/tevar-identity.svg. Accent and glow colors come from the
 * track theme; draw-stroke marks the outlines that draw in on scroll.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the Tevar Identity card. */
export function TevarIdentityIllustration({ className }: IllustrationProps) {
  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 360 200"
      fill="none"
      className={className}
    >
      <g transform="skewX(-8) translate(14 0)">
        <path d="M92 50h44l-6 14h-12l-10 62h-14l10-62H86z" fill="#E8EDF2" />
        <path d="M144 50h40l-4 12h-26l-3 14h22l-3 12h-22l-3 16h28l-4 12h-42z" fill="#E8EDF2" />
        <path d="M194 50h14l6 52 18-52h15l-30 76h-12z" fill="#E8EDF2" />
        <path d="M250 126l4-18h18l3 18h14l-12-76h-14l-30 76z" fill="#E8EDF2" />
        <path
          className="draw-stroke"
          d="M100 136h170"
          stroke="#C6FF3D"
          strokeWidth="4"
          strokeLinecap="round"
          pathLength={1}
        />
      </g>
      <rect
        className="draw-stroke"
        x="112"
        y="160"
        width="28"
        height="28"
        rx="6"
        fill="#0B0F14"
        stroke="#2A3542"
        pathLength={1}
      />
      <rect x="148" y="160" width="28" height="28" rx="6" fill="#E8EDF2" />
      <circle
        className="draw-stroke"
        cx="198"
        cy="174"
        r="14"
        fill="#0B0F14"
        stroke="#C6FF3D"
        pathLength={1}
      />
      <path d="M120 178l6-12h6l-6 12z" fill="#C6FF3D" />
      <path d="M156 178l6-12h6l-6 12z" fill="#0B0F14" />
      <path d="M193 180l5-12h5l-5 12z" fill="#C6FF3D" />
    </svg>
  );
}
