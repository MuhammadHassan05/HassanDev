/**
 * Section heading pattern from the design: a mono "01 / label" eyebrow above
 * the title, with an optional short description on the right.
 */

/** Props for {@link SectionHeader}. */
export interface SectionHeaderProps {
  /** Two-digit section number, e.g. "01". */
  index: string;
  label: string;
  title: string;
  description?: string;
  /** Heading element; h2 on real pages. */
  as?: "h2" | "h3";
  /** Id for the title, so the section can point aria-labelledby at it. */
  titleId?: string;
}

/**
 * Renders the eyebrow, title and optional description.
 *
 * @param props.index - Section number shown in the eyebrow.
 * @param props.label - Lowercase label shown after the slash.
 */
export function SectionHeader({
  index,
  label,
  title,
  description,
  as: Heading = "h2",
  titleId,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-3">
        <span className="font-mono text-[13px] text-accent">
          {index} / {label}
        </span>
        <Heading
          id={titleId}
          className="m-0 font-heading text-[clamp(32px,4vw,48px)] leading-[1.1] font-bold tracking-[-0.02em]"
        >
          {title}
        </Heading>
      </div>
      {description ? <p className="m-0 max-w-[440px] text-muted">{description}</p> : null}
    </div>
  );
}
