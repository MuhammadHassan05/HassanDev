/**
 * Glass pill with an accent status dot, used for the availability line.
 */
import type { ReactNode } from "react";

/** Props for {@link Badge}. */
export interface BadgeProps {
  children: ReactNode;
}

/** Renders a status badge. The dot is decorative; the text carries the meaning. */
export function Badge({ children }: BadgeProps) {
  return (
    <p className="glass m-0 inline-flex items-center gap-2.5 rounded-full px-4 py-[7px] font-mono text-[13px] text-body">
      <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-accent" />
      {children}
    </p>
  );
}
