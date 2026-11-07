/**
 * Experience: a list of roles split by hairlines. Each has the role and
 * company in bold, the dates on the right (under the title on phones) and the
 * bullets below. An optional line after the list links to the other track.
 */
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { CrossLink } from "@/components/ui/CrossLink";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ExperienceSection as ExperienceContent } from "@/content/experience";
import type { CrossLinkContent } from "@/content/profile";

/** Props for {@link ExperienceSection}. */
export interface ExperienceSectionProps {
  content: ExperienceContent;
  /** Line shown after the roles, linking to the other track. */
  crossLink?: CrossLinkContent;
}

/**
 * Renders the roles as an ordered list, newest first.
 *
 * @param props.content - Section copy and entries from src/content/experience.ts.
 * @param props.crossLink - Optional pointer to the other track.
 */
export function ExperienceSection({ content, crossLink }: ExperienceSectionProps) {
  const titleId = "experience-title";
  return (
    <Section id="experience" labelledBy={titleId}>
      <SectionHeader {...content.section} titleId={titleId} />
      <div className="flex flex-col gap-8">
        <ol className="m-0 list-none border-b border-line p-0">
          {content.entries.map((entry) => (
            <li
              key={`${entry.role}-${entry.organization}`}
              className="flex flex-col gap-3 border-t border-line py-8"
            >
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-8">
                <h3 className="m-0 text-[21px] font-semibold tracking-[-0.01em]">
                  {entry.role} · {entry.organization}
                </h3>
                <p className="m-0 shrink-0 text-small text-ink-2">{entry.dates}</p>
              </div>
              <ul className="m-0 flex list-disc flex-col gap-2 pl-5">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              {entry.link ? (
                <div>
                  <Button href={entry.link.href} newTab={entry.link.newTab} variant="text">
                    {entry.link.label}
                  </Button>
                </div>
              ) : null}
            </li>
          ))}
        </ol>
        {crossLink ? <CrossLink text={crossLink.title} action={crossLink.action} /> : null}
      </div>
    </Section>
  );
}
