/**
 * Filter for the engineer project groups, styled as a segmented control: one
 * rounded track with the active option raised onto the card surface. Below
 * 480px the options use short labels, so the track fits one row at 360px. The
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
  /** Full label, shown from 480px and always the accessible name. */
  label: string;
  /** Shown below 480px; label starts with it, so what is seen is part of the name. */
  shortLabel: string;
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
      <div
        role="group"
        aria-label={label}
        className="mx-auto flex w-max gap-0.5 rounded-button bg-surface-2 p-1 md:gap-1"
      >
        {tabs.map((tab) => {
          const pressed = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              aria-pressed={pressed}
              aria-label={tab.label}
              onClick={() => setActive(tab.id)}
              className={cx(
                "inline-flex min-h-11 shrink-0 cursor-pointer items-center rounded-button px-3 text-[14px] whitespace-nowrap transition-colors duration-200 md:px-4 md:text-[15px]",
                pressed ? "bg-surface font-medium text-ink" : "text-ink-2 hover:text-ink",
              )}
            >
              <span className="min-[30rem]:hidden">{tab.shortLabel}</span>
              <span className="hidden min-[30rem]:inline">{tab.label}</span>
            </button>
          );
        })}
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
