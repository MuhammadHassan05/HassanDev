/**
 * Skill groups: a grid of glass cards, each a titled list of chips. Used for
 * the engineer toolkit and the studio tools.
 */
import { Section } from "@/components/layout/Section";
import { Chip } from "@/components/ui/Chip";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { SkillsSection as SkillsContent } from "@/content/skills";

/** Props for {@link SkillsSection}. */
export interface SkillsSectionProps {
  content: SkillsContent;
  /** Anchor id; the design uses "skills" on one page and "tools" on the other. */
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
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-[22px]">
        {content.groups.map((group) => (
          <GlassCard key={group.title} className="flex flex-col gap-3.5 p-6">
            <h3 className="m-0 font-heading text-[19px] font-bold">{group.title}</h3>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {group.items.map((item) => (
                <li key={item}>
                  <Chip>{item}</Chip>
                </li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
