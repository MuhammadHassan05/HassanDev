/**
 * One item in a short list of labels (skills, coursework, case study notes).
 * Plain text: no pill or border, because only buttons are fully round and
 * nothing here is a control. The parent lays the items out with gaps.
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
 * Renders a label. It is plain text, not interactive.
 *
 * @param props.size - sm (default) or md.
 */
export function Chip({ size = "sm", children }: ChipProps) {
  return (
    <span className={cx("inline-flex items-center", size === "md" ? "text-[17px]" : "text-small")}>
      {children}
    </span>
  );
}
