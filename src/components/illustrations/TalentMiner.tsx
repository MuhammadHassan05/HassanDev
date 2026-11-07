/**
 * Illustration for the TalentMiner project card, converted from
 * design-kit/illustrations/talentminer.svg. Colours come from the
 * theme tokens; draw-stroke marks the outlines that draw in on scroll.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the TalentMiner card. */
export function TalentMinerIllustration({ className }: IllustrationProps) {
  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 360 200"
      fill="none"
      className={className}
    >
      <rect className="fill-ink" x="50" y="28" width="104" height="144" rx="6" />
      <circle className="fill-ink-2" cx="70" cy="50" r="10" />
      <rect className="fill-surface-2" x="86" y="44" width="52" height="6" rx="3" />
      <rect className="fill-ink-2/50" x="86" y="54" width="36" height="4" rx="2" />
      <rect className="fill-ink-2" x="62" y="74" width="80" height="4" rx="2" />
      <rect className="fill-ink-2" x="62" y="83" width="70" height="4" rx="2" />
      <rect className="fill-accent" x="62" y="94" width="40" height="8" rx="2" />
      <rect className="fill-ink-2" x="106" y="96" width="36" height="4" rx="2" />
      <rect className="fill-ink-2" x="62" y="108" width="76" height="4" rx="2" />
      <rect className="fill-accent" x="62" y="118" width="30" height="8" rx="2" />
      <rect className="fill-ink-2" x="96" y="120" width="44" height="4" rx="2" />
      <rect className="fill-ink-2" x="62" y="132" width="64" height="4" rx="2" />
      <rect className="fill-ink-2" x="62" y="141" width="78" height="4" rx="2" />
      <path
        className="stroke-accent-ink"
        d="M104 98C160 98 170 63 220 63"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <path
        className="stroke-accent-ink"
        d="M94 122C160 122 170 100 220 100"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <rect
        className="stroke-accent-ink draw-stroke fill-surface-2"
        x="220"
        y="50"
        width="96"
        height="26"
        rx="13"
        pathLength={1}
      />
      <text
        className="fill-ink"
        x="236"
        y="67"
        fontFamily="JetBrains Mono, monospace"
        fontSize="11"
      >
        python
      </text>
      <path
        className="stroke-accent-ink draw-stroke"
        d="M293 63l4 4 7-8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
      <rect
        className="stroke-accent-ink draw-stroke fill-surface-2"
        x="220"
        y="87"
        width="96"
        height="26"
        rx="13"
        pathLength={1}
      />
      <text
        className="fill-ink"
        x="236"
        y="104"
        fontFamily="JetBrains Mono, monospace"
        fontSize="11"
      >
        nlp
      </text>
      <path
        className="stroke-accent-ink draw-stroke"
        d="M293 100l4 4 7-8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
      <rect
        className="draw-stroke fill-surface-2 stroke-line"
        x="220"
        y="124"
        width="96"
        height="26"
        rx="13"
        pathLength={1}
      />
      <text
        className="fill-ink-2/50"
        x="236"
        y="141"
        fontFamily="JetBrains Mono, monospace"
        fontSize="11"
      >
        sql
      </text>
    </svg>
  );
}
