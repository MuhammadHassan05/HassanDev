/**
 * Line icons from the design kit. They are decorative: the text next to them
 * already says what the control does, so they are hidden from screen readers.
 */

/** Size in px for an icon; the design uses 16, 18 and 22. */
interface IconProps {
  size?: number;
}

/** Shared stroke settings so every icon matches the design's line style. */
function iconProps(size: number) {
  return {
    "aria-hidden": true,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;
}

/** Moon, on the theme toggle in light mode (switch to dark). */
export function MoonIcon({ size = 20 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
    </svg>
  );
}

/** Sun, on the theme toggle in dark mode (switch to light). */
export function SunIcon({ size = 20 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

/** Small right chevron, after the label of a text link ("Learn more ›"). */
export function ChevronRightIcon({ size = 16 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

/** Three lines, on the phone nav's closed menu button. */
export function MenuIcon({ size = 22 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

/** A cross, on the phone nav's open menu button. */
export function CloseIcon({ size = 22 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

/** Download arrow, used on the resume button. */
export function DownloadIcon({ size = 18 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="M12 4v11" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 20h14" />
    </svg>
  );
}
