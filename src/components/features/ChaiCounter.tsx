/**
 * "Chai today" pill beside the availability badge. The count depends on the
 * visitor's current time, so it is only shown once the page runs in a
 * browser; until then the pill keeps its space but stays invisible.
 */
"use client";

import { chai } from "@/content/chai";
import { formatChaiLabel } from "@/lib/chai";
import { cx } from "@/lib/cx";
import { useChai } from "./ChaiProvider";

/** Renders the counter pill. */
export function ChaiCounter() {
  const { count } = useChai();
  const label =
    count === null || count === 0 ? chai.emptyLabel : formatChaiLabel(chai.label, count);

  return (
    <p
      title={chai.title}
      aria-hidden={count === null ? true : undefined}
      className={cx(
        "glass m-0 inline-flex items-center gap-2 rounded-full px-4 py-[7px] font-mono text-[13px] text-body",
        count === null && "invisible",
      )}
    >
      <svg
        aria-hidden="true"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="stroke-accent"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path className="chai-steam" d="M8 2.5c-.8 1.2.8 2 0 3.5M12 2.5c-.8 1.2.8 2 0 3.5" />
        <path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" />
        <path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16" />
      </svg>
      <span>{label}</span>
    </p>
  );
}
