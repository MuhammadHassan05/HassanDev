/**
 * Project card: the illustration at the top, then the tags, title,
 * description and either a link or a plain label.
 */
import { illustrations } from "@/components/illustrations";
import type { Project } from "@/content/projects";
import { AppLink } from "./AppLink";
import { Card } from "./Card";
import { ArrowUpRightIcon } from "./icons";

/** Props for {@link ProjectCard}. */
export interface ProjectCardProps {
  project: Project;
  /** Heading level for the title, one below the group heading it sits under. */
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

  return (
    <Card as="article" className="flex flex-col overflow-hidden">
      <div className="flex h-[200px] items-center justify-center border-b border-line">
        <Illustration />
      </div>
      <div className="flex grow flex-col gap-2 p-6">
        <p className="m-0 text-small text-ink-2">{project.tags.join(" · ")}</p>
        <Heading className="m-0 text-[21px] font-semibold tracking-[-0.01em]">
          {project.title}
        </Heading>
        <p className="m-0 text-ink-2">{project.description}</p>
        {footer.kind === "link" ? (
          <AppLink
            href={footer.href}
            newTab={footer.newTab}
            className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start pt-2 text-accent-ink hover:underline hover:underline-offset-4"
          >
            {footer.label}
            {/* "Visit site" repeats on many cards; the project name makes each link unique. */}
            <span className="sr-only">: {project.title}</span>
            <ArrowUpRightIcon />
          </AppLink>
        ) : (
          <p className="m-0 mt-auto inline-flex min-h-11 items-center pt-2 text-small text-ink-2">
            {footer.label}
          </p>
        )}
      </div>
    </Card>
  );
}
