/**
 * A titled grid of project cards, used for the studio's e-commerce and
 * design sections: one column on phones, two from 768px, three from 1024px.
 */
import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Project } from "@/content/projects";
import type { SectionIntro } from "@/content/types";

/** Props for {@link ProjectGridSection}. */
export interface ProjectGridSectionProps {
  id: string;
  intro: SectionIntro;
  projects: readonly Project[];
}

/**
 * Renders the section header and the cards.
 *
 * @param props.id - Anchor id, e.g. "shopify".
 * @param props.intro - Section title and supporting line.
 */
export function ProjectGridSection({ id, intro, projects }: ProjectGridSectionProps) {
  const titleId = `${id}-title`;
  return (
    <Section id={id} labelledBy={titleId}>
      <SectionHeader {...intro} titleId={titleId} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.illustration} project={project} headingLevel="h3" />
        ))}
      </div>
    </Section>
  );
}
