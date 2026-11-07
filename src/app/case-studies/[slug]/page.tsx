/**
 * One case study (/case-studies/<slug>/), generated for every published case
 * study at build time; drafts get no page. Big title, summary and a meta row; a large cover; then each
 * section with its label on the left (stacked on phones); and links to the
 * next case study and back to the list.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { AppLink } from "@/components/ui/AppLink";
import { CaseStudyCover } from "@/components/ui/CaseStudyCover";
import { ChevronRightIcon } from "@/components/ui/icons";
import { caseStudies, caseStudyLabels, type CaseStudy } from "@/content/caseStudies";
import {
  CASE_STUDIES_PATH,
  caseStudyHref,
  findCaseStudy,
  nextCaseStudy,
  publishedCaseStudies,
} from "@/lib/caseStudies";
import { caseStudyMetadata } from "@/lib/seo";

/** The route's parameters. */
interface CaseStudyParams {
  params: Promise<{ slug: string }>;
}

// Only the case studies below exist; a static export cannot render others on request.
export const dynamicParams = false;

const published = publishedCaseStudies(caseStudies);

/**
 * A static export refuses a dynamic route with no pages, so while every case
 * study is a draft this one placeholder is generated instead. It renders the
 * 404 page, is not in the sitemap and nothing links to it.
 */
const NO_CASE_STUDIES_SLUG = "none";

/** One page per published case study, generated at build time. */
export function generateStaticParams() {
  if (published.length === 0) return [{ slug: NO_CASE_STUDIES_SLUG }];
  return published.map((study) => ({ slug: study.slug }));
}

/**
 * Title, description and canonical URL for one case study.
 *
 * @param props.params - The route's slug.
 */
export async function generateMetadata({ params }: CaseStudyParams): Promise<Metadata> {
  const study = findCaseStudy(published, (await params).slug);
  return study ? caseStudyMetadata(study) : {};
}

/**
 * A section of the case study: a small label on the left from 768px, the
 * content on the right, a hairline above.
 */
function CaseSection({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  const labelId = `${id}-label`;
  return (
    <section
      aria-labelledby={labelId}
      data-reveal=""
      className="grid gap-4 border-t border-line py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] md:gap-12 md:py-16"
    >
      <h2 id={labelId} className="m-0 text-small font-medium text-ink-2">
        {label}
      </h2>
      <div className="flex min-w-0 flex-col gap-5 text-lead">{children}</div>
    </section>
  );
}

/** The Role · Year · Stack · Link row under the summary; missing items are left out. */
function MetaRow({ study }: { study: CaseStudy }) {
  const { meta } = caseStudyLabels;
  const items: { label: string; value: ReactNode }[] = [];
  if (study.role) items.push({ label: meta.role, value: study.role });
  if (study.year) items.push({ label: meta.year, value: study.year });
  items.push({ label: meta.stack, value: study.stack.join(" · ") });
  if (study.link) {
    items.push({
      label: meta.link,
      value: (
        <AppLink
          href={study.link.href}
          newTab={study.link.newTab}
          className="inline-flex min-h-11 items-center text-accent-ink underline underline-offset-4"
        >
          {study.link.label}
        </AppLink>
      ),
    });
  }
  return (
    <dl className="m-0 grid grid-cols-1 border-t border-line sm:grid-cols-2 md:auto-cols-fr md:grid-flow-col md:grid-cols-none">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col gap-1 border-b border-line py-4 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0"
        >
          <dt className="text-small text-ink-2">{item.label}</dt>
          <dd className="m-0">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Renders one case study.
 *
 * @param props.params - The route's slug.
 */
export default async function CaseStudyPage({ params }: CaseStudyParams) {
  const study = findCaseStudy(published, (await params).slug);
  if (!study) notFound();
  const next = nextCaseStudy(published, study.slug);
  const { sections } = caseStudyLabels;

  return (
    <PageShell track={study.track} current="case-studies">
      <article className="mx-auto flex max-w-page flex-col px-page pt-16 pb-section md:pt-28">
        <header className="flex flex-col gap-6 pb-12">
          <p className="m-0 text-small text-ink-2">{study.client}</p>
          <h1 className="m-0 max-w-[20ch] text-[clamp(40px,6.5vw,80px)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance">
            {study.title}
          </h1>
          <p className="m-0 text-[clamp(19px,2vw,24px)] leading-snug text-ink-2">{study.summary}</p>
          <div className="pt-4">
            <MetaRow study={study} />
          </div>
        </header>

        <div className="pb-12">
          <CaseStudyCover cover={study.cover} />
        </div>

        <CaseSection id="challenge" label={sections.challenge}>
          {study.challenge.map((paragraph) => (
            <p key={paragraph} className="m-0">
              {paragraph}
            </p>
          ))}
        </CaseSection>

        <CaseSection id="work" label={sections.work}>
          {study.work.kind === "bullets" ? (
            <ul className="m-0 flex list-disc flex-col gap-3 pl-6">
              {study.work.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            study.work.items.map((paragraph) => (
              <p key={paragraph} className="m-0">
                {paragraph}
              </p>
            ))
          )}
        </CaseSection>

        {/* Optional: only shown when there are facts behind it. */}
        {study.decisions && study.decisions.length > 0 ? (
          <CaseSection id="decisions" label={sections.decisions}>
            <ol className="m-0 flex list-none flex-col gap-8 p-0">
              {study.decisions.map((item) => (
                <li key={item.decision} className="flex flex-col gap-2">
                  <p className="m-0 font-semibold">{item.decision}</p>
                  <p className="m-0 text-ink-2">{item.reason}</p>
                </li>
              ))}
            </ol>
          </CaseSection>
        ) : null}

        <CaseSection id="result" label={sections.result}>
          {/* With no metrics, the result is the paragraph alone. */}
          {study.result.metrics.length > 0 ? (
            <ul className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-8 p-0 md:auto-cols-fr md:grid-flow-col md:grid-cols-none">
              {study.result.metrics.map((metric) => (
                <li key={metric.label} className="flex flex-col gap-1">
                  <span className="text-[clamp(40px,6vw,64px)] leading-none font-semibold tracking-[-0.03em]">
                    {metric.value}
                  </span>
                  <span className="text-small text-ink-2">{metric.label}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <p className="m-0">{study.result.summary}</p>
        </CaseSection>

        {study.next && study.next.length > 0 ? (
          <CaseSection id="next" label={sections.next}>
            {study.next.map((paragraph) => (
              <p key={paragraph} className="m-0">
                {paragraph}
              </p>
            ))}
          </CaseSection>
        ) : null}

        <nav
          aria-label={caseStudyLabels.listTitle}
          className="flex flex-col gap-8 border-t border-line pt-12 md:flex-row md:items-end md:justify-between"
        >
          <AppLink href={caseStudyHref(next.slug)} className="group flex flex-col gap-1">
            <span className="inline-flex items-center gap-1 text-accent-ink">
              {caseStudyLabels.nextCaseStudy}
              <ChevronRightIcon />
            </span>
            <span className="text-[clamp(21px,2.4vw,28px)] font-semibold tracking-[-0.02em] text-balance group-hover:underline group-hover:underline-offset-4">
              {next.title}
            </span>
          </AppLink>
          <AppLink
            href={CASE_STUDIES_PATH}
            className="inline-flex min-h-11 items-center text-accent-ink hover:underline hover:underline-offset-4"
          >
            {caseStudyLabels.backToAll}
          </AppLink>
        </nav>
      </article>
    </PageShell>
  );
}
