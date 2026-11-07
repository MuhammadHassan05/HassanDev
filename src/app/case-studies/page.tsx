/**
 * Case studies list (/case-studies/): every case study as a large card, one
 * column on phones and two from 768px. Each card keeps its own track colours.
 */
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { caseStudies, caseStudyLabels } from "@/content/caseStudies";
import { caseStudiesIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = caseStudiesIndexMetadata();

/** Renders the list. */
export default function CaseStudiesPage() {
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
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} headingLevel="h2" />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
