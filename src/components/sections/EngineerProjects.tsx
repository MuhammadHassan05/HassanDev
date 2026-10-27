/**
 * Engineer project section: header, filter tabs and the three category
 * groups (AI & Automation, Web Platforms & SaaS, Mobile & Research).
 */
import { ProjectFilter, type FilterTab } from "@/components/features/ProjectFilter";
import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { engineerProjects, engineerProjectsIntro } from "@/content/projects";
import { twoDigits } from "@/lib/format";

const SECTION_ID = "projects";
const ALL_ID = "all";

/** Renders the filterable project groups. */
export function EngineerProjects() {
  const { section, filterLabel, allTabLabel, categories } = engineerProjectsIntro;
  const titleId = `${SECTION_ID}-title`;

  const tabs: FilterTab[] = [
    { id: ALL_ID, label: allTabLabel, count: engineerProjects.length },
    ...categories.map((category) => ({
      id: category.id,
      label: category.tabLabel,
      count: engineerProjects.filter((p) => p.category === category.id).length,
    })),
  ];

  const groups = categories.map((category) => {
    const projects = engineerProjects.filter((p) => p.category === category.id);
    const groupTitleId = `${SECTION_ID}-${category.id}`;
    return {
      id: category.id,
      content: (
        <section aria-labelledby={groupTitleId} className="flex flex-col gap-[22px]">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-white/10 pb-4">
            <div className="flex items-baseline gap-3.5">
              <h3
                id={groupTitleId}
                className="m-0 font-heading text-[clamp(22px,2.6vw,28px)] font-bold"
              >
                {category.title}
              </h3>
              <span className="font-mono text-[13px] text-accent">
                {twoDigits(projects.length)}
              </span>
            </div>
            <p className="m-0 max-w-[520px] text-[15px] text-muted">{category.description}</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-[22px]">
            {projects.map((project) => (
              <ProjectCard key={project.illustration} project={project} />
            ))}
          </div>
        </section>
      ),
    };
  });

  return (
    <Section id={SECTION_ID} labelledBy={titleId} className="gap-9">
      <SectionHeader {...section} titleId={titleId} />
      <ProjectFilter label={filterLabel} allId={ALL_ID} tabs={tabs} groups={groups} />
    </Section>
  );
}
