/**
 * Studio page (/studio/), built from design-kit/canvas-source/studio-page.dc.html
 * in the studio (amber and pink) theme. All copy comes from src/content.
 */
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CaseStudySection } from "@/components/sections/CaseStudySection";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CrossLinkSection } from "@/components/sections/CrossLinkSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectGridSection } from "@/components/sections/ProjectGridSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { StudioHero } from "@/components/sections/StudioHero";
import { experience } from "@/content/experience";
import { pitch } from "@/content/profile";
import { studioProjects, studioProjectsIntro } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import { skills } from "@/content/skills";
import { stats } from "@/content/stats";

export const metadata: Metadata = pageMetadata("studio");

/** Renders the studio page in design order. */
export default function StudioPage() {
  return (
    <PageShell track="studio">
      <StudioHero />
      <StatsSection stats={stats.studio} />
      <ServicesSection />
      <ProjectGridSection
        id="shopify"
        intro={studioProjectsIntro.ecommerce}
        projects={studioProjects.filter((p) => p.section === "ecommerce")}
        minCardWidth="320px"
      />
      <CaseStudySection />
      <CrossLinkSection content={pitch.studio.crossLink} />
      <ClientsSection />
      <ProjectGridSection
        id="design"
        intro={studioProjectsIntro.design}
        projects={studioProjects.filter((p) => p.section === "design")}
        minCardWidth="260px"
      />
      <ExperienceSection content={experience.studio} />
      <SkillsSection content={skills.studio} id="tools" />
      <ContactSection content={pitch.studio.contact} />
    </PageShell>
  );
}
