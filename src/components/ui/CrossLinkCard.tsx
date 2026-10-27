/**
 * Full-width glass card that links to the other track, e.g. "Also … Open Studio".
 */
import type { CrossLinkContent } from "@/content/profile";
import { AppLink } from "./AppLink";
import { ArrowRightIcon } from "./icons";

/** Props for {@link CrossLinkCard}. */
export interface CrossLinkCardProps {
  content: CrossLinkContent;
}

/**
 * Renders the whole card as one link, so the large surface is the click target.
 *
 * @param props.content - Eyebrow, title and action from src/content/profile.ts.
 */
export function CrossLinkCard({ content }: CrossLinkCardProps) {
  return (
    <AppLink
      href={content.action.href}
      newTab={content.action.newTab}
      className="glass flex flex-wrap items-center justify-between gap-4 rounded-card p-[clamp(20px,4vw,28px)]"
    >
      <span className="flex flex-col gap-1">
        <span className="font-mono text-[13px] text-muted">{content.eyebrow}</span>
        <span className="font-heading text-[clamp(19px,2.4vw,22px)] font-bold">
          {content.title}
        </span>
      </span>
      <span className="inline-flex min-h-11 items-center gap-2 font-medium text-accent">
        {content.action.label}
        <ArrowRightIcon />
      </span>
    </AppLink>
  );
}
