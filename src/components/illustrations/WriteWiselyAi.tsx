/**
 * Illustration for the WriteWisely AI project card, converted from
 * design-kit/illustrations/writewisely-ai.svg. Accent and glow colors come from the
 * track theme; draw-stroke marks the outlines that draw in on scroll.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the WriteWisely AI card. */
export function WriteWiselyAiIllustration({ className }: IllustrationProps) {
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
        width="200"
        height="160"
        rx="10"
        fill="#111720"
        stroke="#2A3542"
        pathLength={1}
      />
      <rect x="56" y="38" width="90" height="8" rx="4" fill="#E8EDF2" />
      <rect x="56" y="60" width="164" height="5" rx="2.5" fill="#6B7785" />
      <rect x="56" y="72" width="150" height="5" rx="2.5" fill="#6B7785" />
      <rect
        className="fill-accent"
        x="54"
        y="82"
        width="140"
        height="11"
        rx="3"
        fillOpacity="0.22"
      />
      <rect x="56" y="85" width="132" height="5" rx="2.5" fill="#E8EDF2" />
      <rect x="56" y="98" width="158" height="5" rx="2.5" fill="#6B7785" />
      <rect x="56" y="110" width="120" height="5" rx="2.5" fill="#6B7785" />
      <rect x="56" y="130" width="160" height="5" rx="2.5" fill="#6B7785" />
      <rect x="56" y="142" width="96" height="5" rx="2.5" fill="#6B7785" />
      <path className="stroke-accent" d="M194 88h22" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect
        className="stroke-accent draw-stroke"
        x="216"
        y="64"
        width="112"
        height="76"
        rx="12"
        fill="#1E2733"
        pathLength={1}
      />
      <path className="fill-accent" d="M232 82l2.5-6 2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5z" />
      <text x="248" y="88" fill="#E8EDF2" fontFamily="JetBrains Mono, monospace" fontSize="10">
        Rewrite
      </text>
      <rect x="228" y="100" width="88" height="5" rx="2.5" fill="#9AA6B2" />
      <rect x="228" y="110" width="70" height="5" rx="2.5" fill="#9AA6B2" />
      <rect className="fill-accent" x="228" y="122" width="40" height="10" rx="5" />
    </svg>
  );
}
