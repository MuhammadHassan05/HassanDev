/**
 * Filter for the engineer project groups, styled as a segmented control: one
 * rounded track with the active option raised onto the card surface. The
 * groups are rendered on the server and passed in; this component only
 * decides which are visible, so every project is in the HTML and still shows
 * if JavaScript never runs.
 */
"use client";

import { useState, type ReactNode } from "react";
import { cx } from "@/lib/cx";

/** One filter option. */
export interface FilterTab {
  id: string;
  label: string;
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
 * Renders the segmented control and the groups it controls.
 *
 * @param props.tabs - Options in order; the one matching allId shows everything.
 * @param props.groups - Server-rendered groups keyed by tab id.
 */
export function ProjectFilter({ label, allId, tabs, groups }: ProjectFilterProps) {
  const [active, setActive] = useState(allId);

  return (
    <>
      {/* Scrolls sideways on narrow phones rather than wrapping into a broken track.
          The padding leaves room for the focus ring inside the scroll area. */}
      <div className="-mx-1 overflow-x-auto p-1">
        <div
          role="group"
          aria-label={label}
          className="mx-auto flex w-max gap-1 rounded-button bg-surface-2 p-1"
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
                  "inline-flex min-h-11 shrink-0 cursor-pointer items-center rounded-button px-4 text-[15px] whitespace-nowrap transition-colors duration-200",
                  pressed ? "bg-surface font-medium text-ink" : "text-ink-2 hover:text-ink",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-20">
        {groups.map((group) => (
          <div key={group.id} hidden={active !== allId && active !== group.id}>
            {group.content}
          </div>
        ))}
      </div>
    </>
  );
}
