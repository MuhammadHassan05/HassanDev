/**
 * Skill groups as plain-text lists in columns: one column on phones, two from
 * 768px and three from 1024px. Used for the engineer toolkit and the studio
 * tools.
 */
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { SkillsSection as SkillsContent } from "@/content/skills";

/** Props for {@link SkillsSection}. */
export interface SkillsSectionProps {
  content: SkillsContent;
  /** Anchor id: "skills" on one page and "tools" on the other. */
  id: string;
}

/**
 * Renders the skill groups.
 *
 * @param props.content - Section copy and groups from src/content/skills.ts.
 */
export function SkillsSection({ content, id }: SkillsSectionProps) {
  const titleId = `${id}-title`;
  return (
    <Section id={id} labelledBy={titleId}>
      <SectionHeader {...content.section} titleId={titleId} />
      <div className="grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {content.groups.map((group) => (
          <div key={group.title} className="flex flex-col gap-3 border-t border-line pt-6">
            <h3 className="m-0 text-[17px] font-semibold">{group.title}</h3>
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-ink-2">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
