/**
 * Studio page (/studio/), in the olive accent. Copy from src/content; layout
 * and order from the redesign brief: hero, services, Shopify builds, the
 * featured case study, clients, design work, experience, tools and contact.
 */
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CaseStudySection } from "@/components/sections/CaseStudySection";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectGridSection } from "@/components/sections/ProjectGridSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { StudioHero } from "@/components/sections/StudioHero";
import { experience } from "@/content/experience";
import { pitch } from "@/content/profile";
import { studioProjects, studioProjectsIntro } from "@/content/projects";
import { skills } from "@/content/skills";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("studio");

/** Renders the studio page. */
export default function StudioPage() {
  return (
    <PageShell track="studio">
      <StudioHero />
      <ServicesSection />
      <ProjectGridSection
        id="shopify"
        intro={studioProjectsIntro.ecommerce}
        projects={studioProjects.filter((p) => p.section === "ecommerce")}
      />
      <CaseStudySection />
      <ClientsSection />
      <ProjectGridSection
        id="design"
        intro={studioProjectsIntro.design}
        projects={studioProjects.filter((p) => p.section === "design")}
      />
      <ExperienceSection content={experience.studio} />
      <SkillsSection content={skills.studio} id="tools" />
      <ContactSection content={pitch.studio.contact} />
    </PageShell>
  );
}
