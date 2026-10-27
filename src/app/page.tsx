/**
 * Engineer page (/), built from design-kit/canvas-source/engineer-page.dc.html.
 * All copy comes from src/content; interactive features are added separately.
 */
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ContactSection } from "@/components/sections/ContactSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { EngineerHero } from "@/components/sections/EngineerHero";
import { EngineerProjects } from "@/components/sections/EngineerProjects";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { experience } from "@/content/experience";
import { pitch } from "@/content/profile";
import { skills } from "@/content/skills";
import { stats } from "@/content/stats";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata, personJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("engineer");

/** Renders the engineer page in design order, with the Person structured data. */
export default function HomePage() {
  return (
    <PageShell track="engineer">
      <JsonLd data={personJsonLd()} />
      <EngineerHero />
      <StatsSection stats={stats.engineer} />
      <EngineerProjects />
      <ExperienceSection content={experience.engineer} crossLink={pitch.engineer.crossLink} />
      <EducationSection />
      <SkillsSection content={skills.engineer} id="skills" />
      <ContactSection content={pitch.engineer.contact} />
    </PageShell>
  );
}
