/**
 * Engineer page hero, left-aligned on the page background: the name (the
 * page's h1), one line on what Hassan builds, one line on where he studies
 * and works, two calls to action, and the headline stats.
 */
import { Button } from "@/components/ui/Button";
import { DownloadIcon } from "@/components/ui/icons";
import { StatsRow } from "@/components/ui/StatsRow";
import { stats } from "@/content/stats";
import { pitch, profile } from "@/content/profile";

/** Renders the hero. The name is the page's only h1. */
export function EngineerHero() {
  const { hero } = pitch.engineer;
  const [primary, secondary] = hero.actions;

  return (
    <section className="mx-auto flex max-w-page flex-col gap-6 px-page pt-16 pb-section md:pt-28">
      <h1 className="m-0 text-hero">
        {/* Two lines on every width, so the name never breaks mid-word. */}
        <span className="block">{profile.firstName}</span>
        <span className="block">{profile.lastName}</span>
      </h1>
      <div className="flex flex-col gap-3 pt-2">
        {hero.lead ? (
          <p className="m-0 text-[clamp(21px,2.4vw,28px)] leading-[1.3] font-medium tracking-[-0.01em] text-balance">
            {hero.lead}
          </p>
        ) : null}
        <p className="m-0 text-lead text-ink-2">{hero.summary}</p>
      </div>
      <div className="flex flex-col gap-3 pt-4 md:flex-row">
        {primary ? (
          <Button href={primary.href} newTab={primary.newTab}>
            {primary.label}
          </Button>
        ) : null}
        {secondary ? (
          <Button href={secondary.href} newTab={secondary.newTab} variant="secondary">
            <DownloadIcon />
            {secondary.label}
          </Button>
        ) : null}
      </div>
      <div className="pt-12">
        <StatsRow stats={stats.engineer} />
      </div>
    </section>
  );
}
