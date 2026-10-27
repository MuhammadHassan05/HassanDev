/**
 * Tiny Owlets case study: the drag-to-compare slider between the old and the
 * rebuilt cart, with the three highlight chips underneath.
 */
import { BeforeAfterSlider } from "@/components/features/BeforeAfterSlider";
import { Section } from "@/components/layout/Section";
import { Chip } from "@/components/ui/Chip";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { caseStudy } from "@/content/caseStudy";

/** Renders the case study section. */
export function CaseStudySection() {
  const { section, highlights } = caseStudy;
  const titleId = "case-title";

  return (
    <Section id="case" labelledBy={titleId}>
      <SectionHeader {...section} titleId={titleId} />
      <GlassCard radius="panel" className="flex flex-col gap-3.5 p-3.5">
        <BeforeAfterSlider />
      </GlassCard>
      <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
        {highlights.map((highlight) => (
          <li key={highlight}>
            <Chip size="md">{highlight}</Chip>
          </li>
        ))}
      </ul>
    </Section>
  );
}
