/**
 * A case study as a large card: the project's illustration on a --surface-2
 * panel, then the client, title, one-line summary and "Read case study ›".
 * The title link covers the whole card, so the card is one tap target and
 * one stop in the tab order. Each card uses its own case study's track
 * colours, so a studio case study stays olive wherever it is shown.
 */
import { illustrations } from "@/components/illustrations";
import { caseStudyLabels, type CaseStudy } from "@/content/caseStudies";
import { caseStudyHref } from "@/lib/caseStudies";
import { cx } from "@/lib/cx";
import { AppLink } from "./AppLink";
import { ChevronRightIcon } from "./icons";

/** Props for {@link CaseStudyCard}. */
export interface CaseStudyCardProps {
  study: CaseStudy;
  /** Heading level for the title, one below the heading the card sits under. */
  headingLevel?: "h2" | "h3";
  /** Id for the title, so a section can be labelled by it. */
  titleId?: string;
  /** "wide" puts the illustration beside the text from 768px (one featured card). */
  layout?: "stacked" | "wide";
}

/**
 * Renders one case study card.
 *
 * @param props.study - The case study.
 * @param props.layout - stacked (default) or wide.
 */
export function CaseStudyCard({
  study,
  headingLevel: Heading = "h3",
  titleId,
  layout = "stacked",
}: CaseStudyCardProps) {
  const Illustration = illustrations[study.project];
  const wide = layout === "wide";

  return (
    <article
      data-track={study.track}
      className={cx(
        "card relative flex flex-col overflow-hidden",
        wide && "md:grid md:grid-cols-2",
      )}
    >
      <div
        className={cx(
          "flex items-center justify-center bg-surface-2 p-6",
          wide ? "h-[240px] md:h-full md:min-h-[320px]" : "h-[240px]",
        )}
      >
        <Illustration />
      </div>
      <div className={cx("flex grow flex-col gap-3 p-6", wide && "md:justify-center md:p-10")}>
        <p className="m-0 text-small text-ink-2">{study.client}</p>
        <Heading
          id={titleId}
          className={cx(
            "m-0 font-semibold tracking-[-0.02em] text-balance",
            wide ? "text-[clamp(24px,3vw,36px)] leading-tight" : "text-[24px] leading-snug",
          )}
        >
          {/* The ::after layer stretches this link over the whole card. */}
          <AppLink
            href={caseStudyHref(study.slug)}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {study.title}
          </AppLink>
        </Heading>
        <p className="m-0 text-ink-2">{study.summary}</p>
        {/* The card's link already says where it goes, so this is for sighted users only. */}
        <span
          aria-hidden="true"
          className="mt-auto inline-flex min-h-11 items-center gap-1 pt-2 text-accent-ink"
        >
          {caseStudyLabels.readCaseStudy}
          <ChevronRightIcon />
        </span>
      </div>
    </article>
  );
}
