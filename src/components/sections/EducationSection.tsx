/**
 * Education section of the engineer page: the degree and its coursework on
 * the left, and the leadership, competition and certification highlights on
 * the right as a list split by hairlines. One column on phones.
 */
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { education } from "@/content/education";

/** Renders the education section. */
export function EducationSection() {
  const { section, degree, highlights } = education;
  const titleId = "education-title";

  return (
    <Section id="education" labelledBy={titleId}>
      <SectionHeader {...section} titleId={titleId} />
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col gap-3 border-t border-line pt-8">
          <p className="m-0 text-small text-ink-2">{degree.status}</p>
          <h3 className="m-0 text-[28px] leading-[1.15] font-semibold tracking-[-0.02em]">
            {degree.title}
          </h3>
          <p className="m-0">{degree.institution}</p>
          <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 pt-3 text-small text-ink-2">
            {degree.coursework.map((course) => (
              <li key={course}>{course}</li>
            ))}
          </ul>
        </div>
        <ul className="m-0 list-none border-b border-line p-0">
          {highlights.map((item) => (
            <li key={item.title} className="flex flex-col gap-1 border-t border-line py-6">
              <p className="m-0 text-small text-ink-2">{item.eyebrow}</p>
              <h3 className="m-0 text-[17px] font-semibold">{item.title}</h3>
              <p className="m-0 text-ink-2">{item.detail}</p>
              {item.link ? (
                <div>
                  <Button href={item.link.href} newTab={item.link.newTab} variant="text">
                    {item.link.label}
                  </Button>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
