/**
 * Illustration for the Yetti.ai project card, converted from
 * design-kit/illustrations/yetti-ai.svg. Colours come from the
 * theme tokens; draw-stroke marks the outlines that draw in on scroll.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the Yetti.ai card. */
export function YettiAiIllustration({ className }: IllustrationProps) {
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
        className="draw-stroke fill-surface-2 stroke-line"
        x="36"
        y="30"
        width="180"
        height="140"
        rx="12"
        pathLength={1}
      />
      <circle
        className="fill-accent stroke-accent-ink draw-stroke"
        cx="72"
        cy="66"
        r="16"
        fillOpacity="0.18"
        strokeWidth="2"
        pathLength={1}
      />
      <rect
        className="stroke-accent-ink draw-stroke"
        x="68"
        y="57"
        width="8"
        height="13"
        rx="4"
        strokeWidth="2"
        pathLength={1}
      />
      <path
        className="stroke-accent-ink draw-stroke"
        d="M64 67a8 8 0 0 0 16 0M72 75v4"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
      />
      <text className="fill-ink" x="98" y="63" fontFamily="JetBrains Mono, monospace" fontSize="11">
        Voice agent
      </text>
      <text
        className="fill-ink-2"
        x="98"
        y="78"
        fontFamily="JetBrains Mono, monospace"
        fontSize="10"
      >
        on a live call
      </text>
      <rect className="fill-accent" x="56" y="117.0" width="6" height="10" rx="3" />
      <rect className="fill-accent" x="68" y="111.0" width="6" height="22" rx="3" />
      <rect className="fill-accent" x="80" y="105.0" width="6" height="34" rx="3" />
      <rect className="fill-accent" x="92" y="113.0" width="6" height="18" rx="3" />
      <rect className="fill-accent" x="104" y="102.0" width="6" height="40" rx="3" />
      <rect className="fill-accent" x="116" y="109.0" width="6" height="26" rx="3" />
      <rect className="fill-accent" x="128" y="115.0" width="6" height="14" rx="3" />
      <rect className="fill-accent" x="140" y="107.0" width="6" height="30" rx="3" />
      <rect className="fill-accent" x="152" y="112.0" width="6" height="20" rx="3" />
      <rect className="fill-accent" x="164" y="104.0" width="6" height="36" rx="3" />
      <rect className="fill-accent" x="176" y="116.0" width="6" height="12" rx="3" />
      <rect className="fill-accent" x="188" y="118.0" width="6" height="8" rx="3" />
      <text
        className="fill-ink-2/50"
        x="56"
        y="158"
        fontFamily="JetBrains Mono, monospace"
        fontSize="10"
      >
        00:42
      </text>
      <path className="stroke-accent-ink" d="M216 100h14" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect
        className="stroke-accent-ink draw-stroke fill-surface-2"
        x="230"
        y="48"
        width="96"
        height="104"
        rx="12"
        pathLength={1}
      />
      <rect
        className="fill-accent"
        x="230"
        y="48"
        width="96"
        height="24"
        rx="12"
        fillOpacity="0.2"
      />
      <text
        className="fill-ink"
        x="242"
        y="64"
        fontFamily="JetBrains Mono, monospace"
        fontSize="10"
      >
        Booking
      </text>
      <rect className="fill-surface" x="242" y="82" width="16" height="14" rx="3" />
      <rect className="fill-surface" x="266" y="82" width="16" height="14" rx="3" />
      <rect className="fill-surface" x="290" y="82" width="16" height="14" rx="3" />
      <rect className="fill-surface" x="242" y="104" width="16" height="14" rx="3" />
      <rect className="fill-accent" x="266" y="104" width="16" height="14" rx="3" />
      <rect className="fill-surface" x="290" y="104" width="16" height="14" rx="3" />
      <rect className="fill-surface" x="242" y="126" width="16" height="14" rx="3" />
      <rect className="fill-surface" x="266" y="126" width="16" height="14" rx="3" />
      <rect className="fill-surface" x="290" y="126" width="16" height="14" rx="3" />
    </svg>
  );
}
