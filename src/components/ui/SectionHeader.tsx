/**
 * Section heading: a centred title with one short supporting line under it
 * in the secondary text colour.
 */

/** Props for {@link SectionHeader}. */
export interface SectionHeaderProps {
  title: string;
  /** The one short supporting line under the title. */
  description?: string;
  /** Heading element; h2 on real pages. */
  as?: "h2" | "h3";
  /** Id for the title, so the section can point aria-labelledby at it. */
  titleId?: string;
}

/**
 * Renders the title and its supporting line.
 *
 * @param props.title - Section title.
 * @param props.description - Supporting line, if the section has one.
 */
export function SectionHeader({
  title,
  description,
  as: Heading = "h2",
  titleId,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Heading id={titleId} className="m-0 text-title text-balance">
        {title}
      </Heading>
      {description ? <p className="m-0 text-lead text-balance text-ink-2">{description}</p> : null}
    </div>
  );
}
