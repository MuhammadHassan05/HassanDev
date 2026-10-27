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

/** Right arrow, used on primary calls to action. */
export function ArrowRightIcon({ size = 18 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

/** Diagonal arrow, used on links that leave the page. */
export function ArrowUpRightIcon({ size = 16 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
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

/** Shopping bag, for the Shopify development service. */
export function ShoppingBagIcon({ size = 22 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="M6 7h12l-1 13H7z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </svg>
  );
}

/** Desktop monitor, for the websites and web apps service. */
export function MonitorIcon({ size = 22 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 18v3" />
    </svg>
  );
}

/** Four-point sparkle, for the brand and graphic design service. */
export function SparkleIcon({ size = 22 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5z" />
    </svg>
  );
}

/** Clock with a refresh arrow, for the store automation service. */
export function ClockRefreshIcon({ size = 22 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="M4 12a8 8 0 1 0 3-6.2" />
      <path d="M4 4v4h4" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

/** Left and right chevrons, for the before/after slider handle. */
export function ChevronsHorizontalIcon({ size = 20 }: IconProps) {
  return (
    <svg {...iconProps(size)}>
      <path d="m9 6-6 6 6 6" />
      <path d="m15 6 6 6-6 6" />
    </svg>
  );
}
