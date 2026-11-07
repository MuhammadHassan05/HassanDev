/**
 * "Selected case studies" band on the engineer page (#case-studies, the
 * target of the hero's first button). Its three case study cards are added
 * in redesign step R5; for now it carries the heading.
 */
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { caseStudiesIntro } from "@/content/caseStudies";

const SECTION_ID = "case-studies";

/** Renders the case studies band. */
export function CaseStudiesBand() {
  const titleId = `${SECTION_ID}-title`;
  return (
    <Section id={SECTION_ID} labelledBy={titleId} band>
      <SectionHeader {...caseStudiesIntro} titleId={titleId} />
    </Section>
  );
}
