/**
 * Project card: the illustration at the top, then the title, the one-line
 * description, the tags in the secondary text colour, and a text link (or a
 * plain label when there is nothing to open). Projects with a case study also
 * get a "Read case study ›" link.
 */
import { illustrations } from "@/components/illustrations";
import { caseStudies, caseStudyLabels } from "@/content/caseStudies";
import type { Project } from "@/content/projects";
import { caseStudyForProject, caseStudyHref } from "@/lib/caseStudies";
import { Button } from "./Button";
import { Card } from "./Card";

/** Props for {@link ProjectCard}. */
export interface ProjectCardProps {
  project: Project;
  /** Heading level for the title, one below the heading it sits under. */
  headingLevel?: "h3" | "h4";
}

/**
 * Renders one project.
 *
 * @param props.project - Project content from src/content/projects.ts.
 * @param props.headingLevel - Title element, h4 by default.
 */
export function ProjectCard({ project, headingLevel: Heading = "h4" }: ProjectCardProps) {
  const Illustration = illustrations[project.illustration];
  const { footer } = project;
  const study = caseStudyForProject(caseStudies, project.illustration);

  return (
    <Card as="article" className="flex flex-col overflow-hidden">
      <div className="flex h-[200px] items-center justify-center border-b border-line">
        <Illustration />
      </div>
      <div className="flex grow flex-col gap-2 p-6">
        <Heading className="m-0 text-[21px] font-semibold tracking-[-0.01em]">
          {project.title}
        </Heading>
        <p className="m-0">{project.description}</p>
        <p className="m-0 text-small text-ink-2">{project.tags.join(" · ")}</p>
        <div className="mt-auto flex flex-wrap gap-x-6 pt-2">
          {study ? (
            <Button href={caseStudyHref(study.slug)} variant="text">
              {caseStudyLabels.readCaseStudy}
              <span className="sr-only">: {project.title}</span>
            </Button>
          ) : null}
          {footer.kind === "link" ? (
            <Button href={footer.href} newTab={footer.newTab} variant="text">
              {footer.label}
              {/* "Visit site" repeats on many cards; the project name makes each link unique. */}
              <span className="sr-only">: {project.title}</span>
            </Button>
          ) : (
            <p className="m-0 inline-flex min-h-11 items-center text-small text-ink-2">
              {footer.label}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
