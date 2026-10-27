/**
 * Standard page section: centered 1200px column, fluid gutter and section
 * padding from the design, labelled by its heading for assistive tech.
 */
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/** Props for {@link Section}. */
export interface SectionProps {
  /** Anchor id, e.g. "projects" for #projects links. */
  id?: string;
  /** Id of the heading that names this section. */
  labelledBy?: string;
  /** Overrides for spacing that differs per section in the design. */
  className?: string;
  children: ReactNode;
}

/**
 * Renders a section with the design's default spacing (40px between blocks).
 *
 * @param props.id - Anchor id for in-page links.
 * @param props.labelledBy - Heading id used for aria-labelledby.
 */
export function Section({ id, labelledBy, className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cx("mx-auto flex max-w-page flex-col gap-10 px-gutter py-section", className)}
    >
      {children}
    </section>
  );
}
