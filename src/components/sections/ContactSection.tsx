/**
 * Closing contact panel: eyebrow, large heading, email link and the row of
 * call-to-action buttons. The footer follows directly after it.
 */
import { AppLink } from "@/components/ui/AppLink";
import { BounceText } from "@/components/ui/BounceText";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import type { ContactContent } from "@/content/profile";

/** Props for {@link ContactSection}. */
export interface ContactSectionProps {
  content: ContactContent;
}

/**
 * Renders the contact panel. The first action is the filled primary button,
 * the rest are glass, as in the design.
 *
 * @param props.content - Contact copy from src/content/profile.ts.
 */
export function ContactSection({ content }: ContactSectionProps) {
  const titleId = "contact-title";
  const [primary, ...others] = content.actions;

  return (
    <section
      id="contact"
      aria-labelledby={titleId}
      className="mx-auto max-w-page px-gutter pt-section"
    >
      <GlassCard radius="shell" className="flex flex-col gap-7 p-[clamp(32px,6vw,72px)]">
        <p className="m-0 font-mono text-[13px] text-accent">
          {content.index} / {content.label}
        </p>
        {/* The letters are hidden from screen readers, so the h2 carries the heading. */}
        <h2
          id={titleId}
          aria-label={content.heading}
          className="m-0 max-w-[860px] font-heading text-[clamp(38px,5.5vw,72px)] leading-[1.02] font-extrabold tracking-[-0.03em]"
        >
          <BounceText text={content.heading} />
        </h2>
        {/* The link box is 44px tall for touch; the underline stays tight to the text. */}
        <AppLink
          href={content.email.href}
          className="inline-flex min-h-11 items-center self-start font-mono text-[clamp(16px,2vw,22px)] text-accent hover:text-accent"
        >
          <span className="border-b border-accent pb-1">{content.email.label}</span>
        </AppLink>
        <div className="flex flex-wrap gap-3 pt-1">
          {primary ? (
            <Button href={primary.href} newTab={primary.newTab}>
              {primary.label}
            </Button>
          ) : null}
          {others.map((action) => (
            <Button key={action.label} href={action.href} newTab={action.newTab} variant="glass">
              {action.label}
            </Button>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}
