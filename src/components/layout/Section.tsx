/**
 * Standard page section: centred 1120px column, side padding that clears a
 * phone's notch, and the section padding from the design rules. It fades up
 * the first time it scrolls into view (see Reveal.tsx).
 */
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/** Props for {@link Section}. */
export interface SectionProps {
  /** Anchor id, e.g. "projects" for #projects links. */
  id?: string;
  /** Id of the heading that names this section. */
  labelledBy?: string;
  /** Overrides for spacing that differs per section. */
  className?: string;
  children: ReactNode;
}

/**
 * Renders a section with the default spacing (48px between blocks).
 *
 * @param props.id - Anchor id for in-page links.
 * @param props.labelledBy - Heading id used for aria-labelledby.
 */
export function Section({ id, labelledBy, className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-reveal=""
      className={cx("mx-auto flex max-w-page flex-col gap-12 px-page py-section", className)}
    >
      {children}
    </section>
  );
}
