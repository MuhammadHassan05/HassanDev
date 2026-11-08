/**
 * The large visual at the top of a case study page: the project's approved
 * screenshot, its illustration on a --surface-2 panel, or, for Tiny Owlets, the interactive
 * before/after slider with its caption and highlights.
 */
import { BeforeAfterSlider } from "@/components/features/BeforeAfterSlider";
import { illustrations } from "@/components/illustrations";
import { cartComparison } from "@/content/cartComparison";
import type { CaseStudyCover as Cover } from "@/content/caseStudies";
import { projectImages } from "@/content/projectImages";
import { ProjectScreenshot } from "./ProjectScreenshot";

/** Props for {@link CaseStudyCover}. */
export interface CaseStudyCoverProps {
  cover: Cover;
}

/**
 * Renders the cover.
 *
 * @param props.cover - From the case study's content.
 */
export function CaseStudyCover({ cover }: CaseStudyCoverProps) {
  if (cover.kind === "slider") {
    return (
      <div className="flex flex-col gap-4">
        <BeforeAfterSlider />
        <p className="m-0 text-small text-ink-2">{cartComparison.caption}</p>
        <ul className="m-0 flex list-none flex-wrap gap-x-8 gap-y-2 p-0 text-ink-2">
          {cartComparison.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </div>
    );
  }
  const image = projectImages[cover.illustration];
  if (image) {
    return (
      // The cover sits just under the title, in or near the first screen, so it loads eagerly.
      <ProjectScreenshot
        project={cover.illustration}
        image={image}
        loading="eager"
        className="h-[clamp(220px,42vw,520px)] rounded-card border border-line"
      />
    );
  }
  const Illustration = illustrations[cover.illustration];
  return (
    <div className="flex h-[clamp(220px,42vw,520px)] items-center justify-center rounded-card bg-surface-2 p-6">
      <Illustration />
    </div>
  );
}
