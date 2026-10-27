/**
 * Filter tabs for the engineer project groups. The groups are rendered on the
 * server and passed in; this component only decides which are visible, so
 * every project is in the HTML and still shows if JavaScript never runs.
 */
"use client";
import { useState, type ReactNode } from "react";
import { cx } from "@/lib/cx";
import { twoDigits } from "@/lib/format";

/** One filter button. */
export interface FilterTab {
  id: string;
  label: string;
  count: number;
}

/** A group of cards the filter can show or hide. */
export interface FilterGroup {
  id: string;
  content: ReactNode;
}

/** Props for {@link ProjectFilter}. */
export interface ProjectFilterProps {
  /** Accessible name of the button group. */
  label: string;
  /** Id of the tab that shows every group. */
  allId: string;
  tabs: readonly FilterTab[];
  groups: readonly FilterGroup[];
}

/**
 * Renders the filter buttons and the groups they control.
 *
 * @param props.tabs - Buttons in order; the one matching allId shows everything.
 * @param props.groups - Server-rendered groups keyed by tab id.
 */
export function ProjectFilter({ label, allId, tabs, groups }: ProjectFilterProps) {
  const [active, setActive] = useState(allId);

  return (
    <>
      <div
        role="group"
        aria-label={label}
        className="glass flex flex-wrap gap-1 self-start rounded-shell p-[5px]"
      >
        {tabs.map((tab) => {
          const pressed = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              aria-pressed={pressed}
              onClick={() => setActive(tab.id)}
              className={cx(
                "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-[18px] text-[15px] font-medium",
                pressed ? "bg-accent text-on-accent" : "text-soft hover:text-ink",
              )}
            >
              {tab.label}{" "}
              <span className="font-mono text-[12px] opacity-75">{twoDigits(tab.count)}</span>
            </button>
          );
        })}
      </div>
      <div className="flex flex-col gap-16">
        {groups.map((group) => (
          <div key={group.id} hidden={active !== allId && active !== group.id}>
            {group.content}
          </div>
        ))}
      </div>
    </>
  );
}
