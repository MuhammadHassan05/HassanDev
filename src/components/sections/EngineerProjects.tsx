/**
 * Engineer project section: header, the segmented filter and the three
 * category groups (AI & Automation, Web Platforms & SaaS, Mobile & Research).
 */
import { ProjectFilter, type FilterTab } from "@/components/features/ProjectFilter";
import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { engineerProjects, engineerProjectsIntro } from "@/content/projects";

const SECTION_ID = "projects";
const ALL_ID = "all";

/** Renders the filterable project groups. */
export function EngineerProjects() {
  const { section, filterLabel, allTabLabel, allTabShortLabel, categories } = engineerProjectsIntro;
  const titleId = `${SECTION_ID}-title`;

  const tabs: FilterTab[] = [
    { id: ALL_ID, label: allTabLabel, shortLabel: allTabShortLabel },
    ...categories.map((category) => ({
      id: category.id,
      label: category.tabLabel,
      shortLabel: category.tabShortLabel,
    })),
  ];

  const groups = categories.map((category) => {
    const projects = engineerProjects.filter((p) => p.category === category.id);
    const groupTitleId = `${SECTION_ID}-${category.id}`;
    return {
      id: category.id,
      content: (
        <section aria-labelledby={groupTitleId} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 id={groupTitleId} className="m-0 text-[28px] font-semibold tracking-[-0.02em]">
              {category.title}
            </h3>
            <p className="m-0 text-ink-2">{category.description}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.illustration} project={project} />
            ))}
          </div>
        </section>
      ),
    };
  });

  return (
    <Section id={SECTION_ID} labelledBy={titleId}>
      <SectionHeader {...section} titleId={titleId} />
      <ProjectFilter label={filterLabel} allId={ALL_ID} tabs={tabs} groups={groups} />
    </Section>
  );
}
