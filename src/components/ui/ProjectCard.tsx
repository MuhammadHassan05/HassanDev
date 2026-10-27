/**
 * Project card from the design: illustration well on top, then meta tags,
 * title, description and either a link or a plain label.
 */
import { TiltCard } from "@/components/features/TiltCard";
import { illustrations } from "@/components/illustrations";
import type { Project } from "@/content/projects";
import { DRAW_TARGET_CLASS } from "@/lib/dom-ids";
import { AppLink } from "./AppLink";
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
    <TiltCard className="glass flex flex-col overflow-hidden rounded-card-lg">
      <div className="mx-2.5 mt-2.5 flex h-[200px] items-center justify-center overflow-hidden rounded-inner bg-well">
        <Illustration className={DRAW_TARGET_CLASS} />
      </div>
      <div className="flex grow flex-col gap-2.5 px-6 pt-[22px] pb-5">
        <p className="m-0 font-mono text-[12px] text-muted">{project.tags.join(" · ")}</p>
        <Heading className="m-0 font-heading text-[23px] font-bold">{project.title}</Heading>
        <p className="m-0 text-[16px] text-body">{project.description}</p>
        {footer.kind === "link" ? (
          <AppLink
            href={footer.href}
            newTab={footer.newTab}
            className="mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-1.5 font-medium text-accent hover:text-accent"
          >
            {footer.label}
            {/* "Visit site" repeats on many cards; the project name makes each link unique. */}
            <span className="sr-only">: {project.title}</span>
            <ArrowUpRightIcon />
          </AppLink>
        ) : (
          <p className="m-0 mt-auto inline-flex min-h-11 items-center pt-1.5 font-mono text-[13px] text-muted">
            {footer.label}
          </p>
        )}
      </div>
    </TiltCard>
  );
}
