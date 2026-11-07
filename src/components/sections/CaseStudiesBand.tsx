/**
 * The case studies band on a track page, on --surface-2. The engineer page
 * (#case-studies, the target of the hero's first button) shows the "Selected
 * case studies" heading over a grid of cards; the studio page features its
 * one case study as a single wide card, whose title names the band.
 */
import { Section } from "@/components/layout/Section";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { caseStudies, caseStudiesIntro, featuredCaseStudies } from "@/content/caseStudies";
import type { TrackId } from "@/content/tracks";
import { featuredCaseStudies as pickFeatured } from "@/lib/caseStudies";

const SECTION_ID = "case-studies";

/** Props for {@link CaseStudiesBand}. */
export interface CaseStudiesBandProps {
  track: TrackId;
}

/**
 * Renders the band for a track page.
 *
 * @param props.track - Which page's featured case studies to show.
 */
export function CaseStudiesBand({ track }: CaseStudiesBandProps) {
  const studies = pickFeatured(caseStudies, featuredCaseStudies[track]);
  const titleId = `${SECTION_ID}-title`;
  const [only] = studies;

  if (studies.length === 1 && only) {
    return (
      <Section id={SECTION_ID} labelledBy={titleId} band>
        <CaseStudyCard study={only} headingLevel="h2" titleId={titleId} layout="wide" />
      </Section>
    );
  }
  return (
    <Section id={SECTION_ID} labelledBy={titleId} band>
      <SectionHeader {...caseStudiesIntro} titleId={titleId} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {studies.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
    </Section>
  );
}
