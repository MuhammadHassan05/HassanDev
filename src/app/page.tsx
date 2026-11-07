/**
 * Engineer page (/). Copy from src/content; layout and order from the
 * redesign brief: hero, case studies, projects, experience, terminal,
 * education, skills and contact.
 */
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CaseStudiesBand } from "@/components/sections/CaseStudiesBand";
import { ContactSection } from "@/components/sections/ContactSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { EngineerHero } from "@/components/sections/EngineerHero";
import { EngineerProjects } from "@/components/sections/EngineerProjects";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { TerminalSection } from "@/components/sections/TerminalSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { experience } from "@/content/experience";
import { pitch } from "@/content/profile";
import { skills } from "@/content/skills";
import { pageMetadata, personJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("engineer");

/** Renders the engineer page, with the Person structured data. */
export default function HomePage() {
  return (
    <PageShell track="engineer">
      <JsonLd data={personJsonLd()} />
      <EngineerHero />
      <CaseStudiesBand />
      <EngineerProjects />
      <ExperienceSection content={experience.engineer} crossLink={pitch.engineer.crossLink} />
      <TerminalSection />
      <EducationSection />
      <SkillsSection content={skills.engineer} id="skills" />
      <ContactSection content={pitch.engineer.contact} />
    </PageShell>
  );
}
