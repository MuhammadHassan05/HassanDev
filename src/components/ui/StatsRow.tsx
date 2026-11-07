/**
 * A plain row of large numbers with a short label under each, shown under a
 * page's hero. No cards: two columns on phones, one row from 768px.
 */
import type { Stat } from "@/content/stats";

/** Props for {@link StatsRow}. */
export interface StatsRowProps {
  stats: readonly Stat[];
}

/**
 * Renders the stats.
 *
 * @param props.stats - Numbers and labels from src/content/stats.ts.
 */
export function StatsRow({ stats }: StatsRowProps) {
  return (
    <ul className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-8 border-t border-line p-0 pt-10 md:auto-cols-fr md:grid-flow-col md:grid-cols-none">
      {stats.map((stat) => (
        <li key={stat.label} className="flex flex-col gap-1">
          <span className="text-[clamp(40px,6vw,64px)] leading-none font-semibold tracking-[-0.03em]">
            {stat.value}
          </span>
          <span className="text-small text-ink-2">{stat.label}</span>
        </li>
      ))}
    </ul>
  );
}
