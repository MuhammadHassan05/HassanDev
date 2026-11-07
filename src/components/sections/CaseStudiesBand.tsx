/**
 * The case studies band on a track page, on --surface-2. Several published
 * case studies show under the "Selected case studies" heading as a grid of
 * cards; a single one is a wide card whose title names the band. With none
 * published (all drafts), the studio page falls back to the Tiny Owlets
 * before/after slider and the engineer page shows no band at all.
 */
import { BeforeAfterSlider } from "@/components/features/BeforeAfterSlider";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cartComparison } from "@/content/cartComparison";
import { caseStudies, caseStudiesIntro, featuredCaseStudies } from "@/content/caseStudies";
import type { TrackId } from "@/content/tracks";
import { featuredCaseStudies as pickFeatured } from "@/lib/caseStudies";

/** Anchor of the band; the engineer hero's first button points here. */
export const CASE_STUDIES_BAND_ID = "case-studies";

/** Props for {@link CaseStudiesBand}. */
export interface CaseStudiesBandProps {
  track: TrackId;
}

/**
 * Whether a track page shows the band with at least one published case study.
 *
 * @param track - The page.
 */
export function hasFeaturedCaseStudies(track: TrackId): boolean {
  return pickFeatured(caseStudies, featuredCaseStudies[track]).length > 0;
}

/**
 * Renders the band for a track page.
 *
 * @param props.track - Which page's featured case studies to show.
 */
export function CaseStudiesBand({ track }: CaseStudiesBandProps) {
  const studies = pickFeatured(caseStudies, featuredCaseStudies[track]);
  const titleId = `${CASE_STUDIES_BAND_ID}-title`;
  const [only] = studies;

  if (studies.length === 0) {
    return track === "studio" ? <SliderBand titleId={titleId} /> : null;
  }
  if (studies.length === 1 && only) {
    return (
      <Section id={CASE_STUDIES_BAND_ID} labelledBy={titleId} band>
        <CaseStudyCard study={only} headingLevel="h2" titleId={titleId} layout="wide" />
      </Section>
    );
  }
  return (
    <Section id={CASE_STUDIES_BAND_ID} labelledBy={titleId} band>
      <SectionHeader {...caseStudiesIntro} titleId={titleId} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {studies.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
    </Section>
  );
}

/** The Tiny Owlets slider band, shown while its case study is a draft. */
function SliderBand({ titleId }: { titleId: string }) {
  return (
    <Section id={CASE_STUDIES_BAND_ID} labelledBy={titleId} band>
      <SectionHeader
        title={cartComparison.title}
        description={cartComparison.caption}
        titleId={titleId}
      />
      {/* On a card, so the slider's --surface-2 area stands out from the band. */}
      <Card className="flex flex-col gap-3 p-3">
        <BeforeAfterSlider />
      </Card>
      <ul className="m-0 flex list-none flex-wrap justify-center gap-x-8 gap-y-2 p-0 text-ink-2">
        {cartComparison.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </Section>
  );
}
