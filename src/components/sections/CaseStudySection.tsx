/**
 * Featured Tiny Owlets case study on the studio page, as a --surface-2 band:
 * the drag-to-compare slider between the old and the rebuilt cart, on a card
 * so it stands out from the band, with the three highlights underneath.
 */
import { BeforeAfterSlider } from "@/components/features/BeforeAfterSlider";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { caseStudy } from "@/content/caseStudy";

/** Renders the case study band. */
export function CaseStudySection() {
  const { section, highlights } = caseStudy;
  const titleId = "case-title";

  return (
    <Section id="case" labelledBy={titleId} band>
      <SectionHeader {...section} titleId={titleId} />
      <Card className="flex flex-col gap-3 p-3">
        <BeforeAfterSlider />
      </Card>
      <ul className="m-0 flex list-none flex-wrap justify-center gap-x-8 gap-y-2 p-0 text-ink-2">
        {highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </Section>
  );
}
