/**
 * Experience timeline: one glass card per role, with an optional cross-link
 * card at the end (the engineer page points to the studio from here).
 */
import { Section } from "@/components/layout/Section";
import { AppLink } from "@/components/ui/AppLink";
import { CrossLinkCard } from "@/components/ui/CrossLinkCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import type { ExperienceSection as ExperienceContent } from "@/content/experience";
import type { CrossLinkContent } from "@/content/profile";

/** Props for {@link ExperienceSection}. */
export interface ExperienceSectionProps {
  content: ExperienceContent;
  /** Card shown after the roles, linking to the other track. */
  crossLink?: CrossLinkContent;
}

/**
 * Renders the roles as an ordered list, newest first as in the design.
 *
 * @param props.content - Section copy and entries from src/content/experience.ts.
 */
export function ExperienceSection({ content, crossLink }: ExperienceSectionProps) {
  const titleId = "experience-title";
  return (
    <Section id="experience" labelledBy={titleId}>
      <SectionHeader {...content.section} titleId={titleId} />
      <div className="flex flex-col gap-4">
        <ol className="m-0 flex list-none flex-col gap-4 p-0">
          {content.entries.map((entry) => (
            <GlassCard
              key={`${entry.role}-${entry.organization}`}
              as="li"
              className="flex flex-wrap gap-x-8 gap-y-2.5 p-[clamp(20px,4vw,28px)]"
            >
              <p className="m-0 flex-[0_0_170px] font-mono text-[14px] text-accent">
                {entry.dates}
              </p>
              <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-2.5">
                <h3 className="m-0 font-heading text-[22px] font-bold">
                  {entry.role} · {entry.organization}
                </h3>
                <ul className="m-0 flex list-disc flex-col gap-2 pl-5 text-[16px] text-body">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                {entry.link ? (
                  <AppLink
                    href={entry.link.href}
                    newTab={entry.link.newTab}
                    className="inline-flex min-h-11 items-center gap-1.5 self-start text-[15px] font-medium text-accent hover:text-accent"
                  >
                    {entry.link.label}
                    <ArrowUpRightIcon />
                  </AppLink>
                ) : null}
              </div>
            </GlassCard>
          ))}
        </ol>
        {crossLink ? <CrossLinkCard content={crossLink} /> : null}
      </div>
    </Section>
  );
}
