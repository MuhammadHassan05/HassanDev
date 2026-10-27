/**
 * The large blurred color orbs behind the content. The glass surfaces only
 * read as glass because of what these put behind them.
 *
 * Rendered once in the root layout, so the same orbs survive client-side
 * navigation: when the route changes track, their colors transition from the
 * old track to the new one (the glow morph). With reduced motion the global
 * rule in globals.css makes the change instant.
 */
"use client";

import { usePathname } from "next/navigation";
import { trackForPathname } from "@/lib/routes";

/**
 * Orb placement copied from the design. Full class strings (not built at
 * runtime) so Tailwind can find them; even orbs use the accent, odd the glow.
 */
const ORB_CLASSES = [
  "top-[-120px] left-[-8%] bg-accent opacity-30",
  "top-[500px] left-[62%] bg-glow opacity-[0.28]",
  "top-[1500px] left-[-12%] bg-glow opacity-[0.22]",
  "top-[2500px] left-[60%] bg-accent opacity-[0.22]",
  "top-[3500px] left-[-6%] bg-accent opacity-20",
  "top-[4500px] left-[58%] bg-glow opacity-[0.22]",
  "top-[5400px] left-[10%] bg-accent opacity-[0.18]",
] as const;

/**
 * Renders the orbs in the current route's track colors. Place it as the first
 * child of a relatively positioned, overflow-hidden wrapper.
 */
export function GlowBackground() {
  const track = trackForPathname(usePathname());
  return (
    <div aria-hidden="true" data-track={track} className="pointer-events-none absolute inset-0">
      {ORB_CLASSES.map((orbClasses) => (
        <div
          key={orbClasses}
          className={`absolute size-[560px] rounded-full blur-[130px] transition-colors duration-[1600ms] ${orbClasses}`}
        />
      ))}
    </div>
  );
}
