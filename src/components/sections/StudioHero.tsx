/**
 * Studio page hero: availability badge, the written heading (the page's h1),
 * pitch and two calls to action.
 */
import { Badge } from "@/components/ui/Badge";
import { BounceText } from "@/components/ui/BounceText";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { pitch } from "@/content/profile";

/** Renders the studio hero. */
export function StudioHero() {
  const { hero } = pitch.studio;
  const [primary, secondary] = hero.actions;

  return (
    <section className="mx-auto flex max-w-page flex-col gap-6 px-gutter pt-[clamp(48px,9vw,88px)] pb-[clamp(36px,6vw,56px)]">
      <div className="self-start">
        <Badge>{hero.availability}</Badge>
      </div>
      {/* The letters are hidden from screen readers, so the h1 carries the heading. */}
      <h1
        aria-label={hero.heading}
        className="m-0 max-w-[1000px] font-heading text-[clamp(44px,6.5vw,88px)] leading-none font-extrabold tracking-[-0.03em]"
      >
        {hero.heading ? <BounceText text={hero.heading} /> : null}
      </h1>
      <p className="m-0 max-w-[660px] text-[21px] leading-normal text-body">{hero.summary}</p>
      <div className="flex flex-wrap gap-3 pt-1.5">
        {primary ? (
          <Button href={primary.href} newTab={primary.newTab}>
            {primary.label}
            <ArrowRightIcon />
          </Button>
        ) : null}
        {secondary ? (
          <Button href={secondary.href} newTab={secondary.newTab} variant="glass">
            {secondary.label}
          </Button>
        ) : null}
      </div>
    </section>
  );
}
