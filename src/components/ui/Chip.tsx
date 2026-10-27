/**
 * Small static label pill, used for skills, coursework and case study notes.
 */
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/** Props for {@link Chip}. */
export interface ChipProps {
  /** sm for skill lists, md for the larger case study notes. */
  size?: "sm" | "md";
  children: ReactNode;
}

/**
 * Renders a chip. It is plain text, not interactive.
 *
 * @param props.size - sm (default) or md.
 */
export function Chip({ size = "sm", children }: ChipProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border border-hairline bg-glass font-mono text-[13px] text-body",
        size === "md" ? "px-3.5 py-2" : "px-3 py-1.5",
      )}
    >
      {children}
    </span>
  );
}
