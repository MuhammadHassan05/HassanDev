/**
 * Shares today's chai count between the hero's counter pill and the terminal
 * (whose chai command adds a cup). The count follows the clock in Lahore and
 * refreshes every minute.
 */
"use client";

import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from "react";
import { chaiCount } from "@/lib/chai";

/** How often the clock is re-read. */
const REFRESH_MS = 60_000;

/** The shared chai state. */
export interface ChaiState {
  /** Today's cups, or null before the page runs in a browser (the time is unknown). */
  count: number | null;
  /** Adds one cup, for the terminal's chai command. */
  addCup: () => void;
}

const ChaiContext = createContext<ChaiState>({ count: null, addCup: () => undefined });

/** Calls back once a minute; the returned function clears the interval. */
function subscribeToMinutes(onTick: () => void) {
  const id = window.setInterval(onTick, REFRESH_MS);
  return () => window.clearInterval(id);
}

/** The current minute; stable between ticks, so React only re-renders when it changes. */
const currentMinute = () => Math.floor(Date.now() / REFRESH_MS);

/** On the server and during hydration there is no meaningful "now". */
const noMinute = () => null;

/**
 * Provides the chai count to everything inside it.
 *
 * @param props.children - The hero, which holds the counter and the terminal.
 */
export function ChaiProvider({ children }: { children: ReactNode }) {
  const minute = useSyncExternalStore(subscribeToMinutes, currentMinute, noMinute);
  const [extraCups, setExtraCups] = useState(0);

  const value: ChaiState = {
    count: minute === null ? null : chaiCount(new Date(minute * REFRESH_MS), extraCups),
    addCup: () => setExtraCups((cups) => cups + 1),
  };

  return <ChaiContext.Provider value={value}>{children}</ChaiContext.Provider>;
}

/** Reads the shared chai state. Must be used inside {@link ChaiProvider}. */
export function useChai(): ChaiState {
  return useContext(ChaiContext);
}
