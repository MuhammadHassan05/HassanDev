/**
 * One line pointing to the other track: a sentence in the secondary text
 * colour followed by a text link, e.g. "Looking for AI and SaaS work? See
 * engineering projects ›".
 */
import type { LinkAction } from "@/content/types";
import { cx } from "@/lib/cx";
import { Button } from "./Button";

/** Props for {@link CrossLink}. */
export interface CrossLinkProps {
  text: string;
  action: LinkAction;
  className?: string;
}

/**
 * Renders the line and its link.
 *
 * @param props.text - The sentence before the link.
 * @param props.action - Where the link goes and its label.
 */
export function CrossLink({ text, action, className }: CrossLinkProps) {
  return (
    <p className={cx("m-0 flex flex-wrap items-center gap-x-3 text-ink-2", className)}>
      {text}
      <Button href={action.href} newTab={action.newTab} variant="text">
        {action.label}
      </Button>
    </p>
  );
}
