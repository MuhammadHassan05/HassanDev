/**
 * Illustration for the City-Pulse project card, converted from
 * design-kit/illustrations/city-pulse.svg. Colours come from the
 * theme tokens.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the City-Pulse card. */
export function CityPulseIllustration({ className }: IllustrationProps) {
  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 360 200"
      fill="none"
      className={className}
    >
      <path
        className="stroke-line"
        d="M0 70h360M0 145h360M95 0v200M240 0v200M0 200L360 10"
        strokeWidth="12"
      />
      <path
        className="stroke-line"
        d="M0 70h360M0 145h360M95 0v200M240 0v200"
        strokeWidth="1"
        strokeDasharray="6 6"
      />
      <path className="fill-line" d="M270 58c-7-9-10-13-10-18a10 10 0 0 1 20 0c0 5-3 9-10 18z" />
      <path className="fill-line" d="M60 172c-7-9-10-13-10-18a10 10 0 0 1 20 0c0 5-3 9-10 18z" />
      <path
        className="fill-accent-ink"
        d="M150 112c-11-13-15-19-15-26a15 15 0 0 1 30 0c0 7-4 13-15 26z"
      />
      <circle className="fill-surface-2" cx="150" cy="86" r="5" />
      <rect className="fill-surface-2 stroke-line" x="178" y="96" width="124" height="48" rx="10" />
      <rect
        className="fill-accent-ink"
        x="190"
        y="108"
        width="24"
        height="24"
        rx="6"
        fillOpacity="0.18"
      />
      <path
        className="stroke-accent-ink"
        d="M202 126v-12m-5 5 5-5 5 5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        className="fill-ink-2"
        x="224"
        y="118"
        fontFamily="JetBrains Mono, monospace"
        fontSize="11"
      >
        Pothole
      </text>
      <text
        className="fill-line"
        x="224"
        y="133"
        fontFamily="JetBrains Mono, monospace"
        fontSize="10"
      >
        reported
      </text>
    </svg>
  );
}
