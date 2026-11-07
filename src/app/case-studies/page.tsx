/**
 * Case studies list (/case-studies/): every published case study as a large
 * card, one column on phones and two from 768px. Each card keeps its own
 * track colours. While every case study is a draft it renders the 404 page,
 * and nothing links to it.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { caseStudies, caseStudyLabels } from "@/content/caseStudies";
import { profile } from "@/content/profile";
import { notFound as notFoundCopy } from "@/content/site";
import { publishedCaseStudies } from "@/lib/caseStudies";
import { caseStudiesIndexMetadata } from "@/lib/seo";

const published = publishedCaseStudies(caseStudies);

// While the page is a 404, it takes the 404 page's title and no canonical URL.
export const metadata: Metadata =
  published.length > 0
    ? caseStudiesIndexMetadata()
    : { title: `${notFoundCopy.title} · ${profile.fullName}` };

/** Renders the list. */
export default function CaseStudiesPage() {
  if (published.length === 0) notFound();
  return (
    <PageShell track="engineer" current="case-studies">
      <section
        aria-labelledby="case-studies-title"
        className="mx-auto flex max-w-page flex-col gap-12 px-page pt-16 pb-section md:pt-28"
      >
        <h1 id="case-studies-title" className="m-0 text-hero">
          {caseStudyLabels.listTitle}
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {published.map((study) => (
            <CaseStudyCard key={study.slug} study={study} headingLevel="h2" />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
