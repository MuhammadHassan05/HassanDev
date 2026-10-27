/**
 * Illustration for the AI Text Detection API project card, converted from
 * design-kit/illustrations/ai-text-detection-api.svg. Accent and glow colors come from the
 * track theme; draw-stroke marks the outlines that draw in on scroll.
 */
import type { IllustrationProps } from "./types";

/** Decorative drawing for the AI Text Detection API card. */
export function AiTextDetectionApiIllustration({ className }: IllustrationProps) {
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
        x="56"
        y="24"
        width="164"
        height="152"
        rx="8"
        fill="#111720"
        stroke="#2A3542"
        pathLength={1}
      />
      <rect
        className="fill-accent"
        x="66"
        y="55"
        width="144"
        height="14"
        rx="3"
        fillOpacity="0.2"
      />
      <rect
        className="fill-accent"
        x="66"
        y="71"
        width="144"
        height="14"
        rx="3"
        fillOpacity="0.2"
      />
      <rect
        className="fill-accent"
        x="66"
        y="119"
        width="144"
        height="14"
        rx="3"
        fillOpacity="0.2"
      />
      <rect x="72" y="42" width="130" height="5" rx="2.5" fill="#6B7785" />
      <rect x="72" y="59" width="118" height="5" rx="2.5" fill="#E8EDF2" />
      <rect x="72" y="75" width="132" height="5" rx="2.5" fill="#E8EDF2" />
      <rect x="72" y="91" width="96" height="5" rx="2.5" fill="#6B7785" />
      <rect x="72" y="107" width="126" height="5" rx="2.5" fill="#6B7785" />
      <rect x="72" y="123" width="112" height="5" rx="2.5" fill="#E8EDF2" />
      <rect x="72" y="139" width="128" height="5" rx="2.5" fill="#6B7785" />
      <rect x="72" y="155" width="84" height="5" rx="2.5" fill="#6B7785" />
      <text x="240" y="34" fill="#9AA6B2" fontFamily="JetBrains Mono, monospace" fontSize="10">
        ai score
      </text>
      <rect x="240" y="42" width="14" height="5" rx="2.5" fill="#2A3542" />
      <rect className="fill-accent" x="240" y="59" width="64" height="5" rx="2.5" />
      <rect className="fill-accent" x="240" y="75" width="56" height="5" rx="2.5" />
      <rect x="240" y="91" width="10" height="5" rx="2.5" fill="#2A3542" />
      <rect x="240" y="107" width="20" height="5" rx="2.5" fill="#2A3542" />
      <rect className="fill-accent" x="240" y="123" width="70" height="5" rx="2.5" />
      <rect x="240" y="139" width="12" height="5" rx="2.5" fill="#2A3542" />
      <rect x="240" y="155" width="8" height="5" rx="2.5" fill="#2A3542" />
    </svg>
  );
}
