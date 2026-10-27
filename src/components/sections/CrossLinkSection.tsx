/**
 * Standalone row holding a cross-link card, for pages where it sits between
 * sections rather than inside one (the studio page's "Looking for AI and SaaS work?").
 */
import { CrossLinkCard } from "@/components/ui/CrossLinkCard";
import type { CrossLinkContent } from "@/content/profile";

/** Props for {@link CrossLinkSection}. */
export interface CrossLinkSectionProps {
  content: CrossLinkContent;
}

/**
 * Renders the card in the page column. It has no vertical padding of its own:
 * the sections around it already provide the spacing, as in the design.
 */
export function CrossLinkSection({ content }: CrossLinkSectionProps) {
  return (
    <div className="mx-auto max-w-page px-gutter">
      <CrossLinkCard content={content} />
    </div>
  );
}
