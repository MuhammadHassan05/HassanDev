/**
 * Studio page hero, left-aligned like the engineer hero: the headline (the
 * page's h1), one line in the secondary text colour, two calls to action and
 * the headline stats.
 */
import { Button } from "@/components/ui/Button";
import { StatsRow } from "@/components/ui/StatsRow";
import { stats } from "@/content/stats";
import { pitch } from "@/content/profile";

/** Renders the studio hero. */
export function StudioHero() {
  const { hero } = pitch.studio;
  const [primary, secondary] = hero.actions;

  return (
    <section className="mx-auto flex max-w-page flex-col gap-6 px-page pt-16 pb-section md:pt-28">
      {/* A sentence, not a name, so a step below the hero-name size. */}
      <h1 className="m-0 max-w-[16ch] text-[clamp(44px,7vw,88px)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance">
        {hero.heading}
      </h1>
      <p className="m-0 pt-2 text-lead text-ink-2">{hero.summary}</p>
      <div className="flex flex-col gap-3 pt-4 md:flex-row">
        {primary ? (
          <Button href={primary.href} newTab={primary.newTab}>
            {primary.label}
          </Button>
        ) : null}
        {secondary ? (
          <Button href={secondary.href} newTab={secondary.newTab} variant="secondary">
            {secondary.label}
          </Button>
        ) : null}
      </div>
      <div className="pt-12">
        <StatsRow stats={stats.studio} />
      </div>
    </section>
  );
}
