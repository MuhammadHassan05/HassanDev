/**
 * Row of headline numbers under a page's hero.
 */
import { GlassCard } from "@/components/ui/GlassCard";
import type { Stat } from "@/content/stats";

/** Props for {@link StatsSection}. */
export interface StatsSectionProps {
  stats: readonly Stat[];
}

/**
 * Renders the stat cards as a list, so screen readers announce how many there are.
 *
 * @param props.stats - Values and labels from src/content/stats.ts.
 */
export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="mx-auto max-w-page px-gutter">
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-4 p-0">
        {stats.map((stat) => (
          <GlassCard key={stat.label} as="li" className="flex flex-col gap-1.5 p-[26px]">
            <span className="font-heading text-[44px] leading-none font-extrabold text-accent">
              {stat.value}
            </span>
            <span className="text-[15px] text-muted">{stat.label}</span>
          </GlassCard>
        ))}
      </ul>
    </section>
  );
}
