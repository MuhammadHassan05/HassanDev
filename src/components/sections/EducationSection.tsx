/**
 * Education section of the engineer page: the degree card with coursework
 * beside the leadership, competition and certification cards.
 */
import { Section } from "@/components/layout/Section";
import { AppLink } from "@/components/ui/AppLink";
import { Chip } from "@/components/ui/Chip";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { education } from "@/content/education";

/** Renders the education section. */
export function EducationSection() {
  const { section, degree, highlights } = education;
  const titleId = "education-title";

  return (
    <Section id="education" labelledBy={titleId}>
      <SectionHeader {...section} titleId={titleId} />
      <div className="flex flex-wrap gap-5">
        <GlassCard radius="card-lg" className="flex flex-[1.2_1_380px] flex-col gap-3 p-8">
          <p className="m-0 font-mono text-[13px] text-accent">{degree.status}</p>
          <h3 className="m-0 font-heading text-[30px] leading-[1.15] font-extrabold">
            {degree.title}
          </h3>
          <p className="m-0 text-[19px] text-body">{degree.institution}</p>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0 pt-2.5">
            {degree.coursework.map((course) => (
              <li key={course}>
                <Chip>{course}</Chip>
              </li>
            ))}
          </ul>
        </GlassCard>
        <ul className="m-0 flex flex-[1_1_340px] list-none flex-col gap-3 p-0">
          {highlights.map((item) => (
            <GlassCard
              key={item.title}
              as="li"
              radius="card-sm"
              className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-[22px] py-[18px]"
            >
              <div className="flex flex-col gap-0.5">
                <p className="m-0 font-mono text-[12px] text-accent">{item.eyebrow}</p>
                <h3 className="m-0 text-[17px] font-semibold">{item.title}</h3>
                <p className="m-0 text-[15px] text-muted">{item.detail}</p>
              </div>
              {item.link ? (
                <AppLink
                  href={item.link.href}
                  newTab={item.link.newTab}
                  className="inline-flex min-h-11 items-center gap-1.5 text-[15px] font-medium text-accent hover:text-accent"
                >
                  {item.link.label}
                  <ArrowUpRightIcon />
                </AppLink>
              ) : null}
            </GlassCard>
          ))}
        </ul>
      </div>
    </Section>
  );
}
