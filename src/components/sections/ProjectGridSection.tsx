/**
 * A titled grid of project cards, used for the studio's e-commerce and
 * design sections.
 */
import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Project } from "@/content/projects";
import type { SectionIntro } from "@/content/types";
import { cx } from "@/lib/cx";

/** Props for {@link ProjectGridSection}. */
export interface ProjectGridSectionProps {
  id: string;
  intro: SectionIntro;
  projects: readonly Project[];
  /** Narrowest card width before the grid drops a column; differs per section. */
  minCardWidth: "260px" | "320px";
}

/** Literal classes so Tailwind finds them; one per card width the design uses. */
const GRID_CLASSES: Record<ProjectGridSectionProps["minCardWidth"], string> = {
  "260px": "grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))]",
  "320px": "grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))]",
};

/**
 * Renders the section header and the cards.
 *
 * @param props.minCardWidth - 320px for e-commerce, 260px for design, as in the design.
 */
export function ProjectGridSection({ id, intro, projects, minCardWidth }: ProjectGridSectionProps) {
  const titleId = `${id}-title`;
  return (
    <Section id={id} labelledBy={titleId}>
      <SectionHeader {...intro} titleId={titleId} />
      <div className={cx("grid gap-[22px]", GRID_CLASSES[minCardWidth])}>
        {projects.map((project) => (
          <ProjectCard key={project.illustration} project={project} headingLevel="h3" />
        ))}
      </div>
    </Section>
  );
}
