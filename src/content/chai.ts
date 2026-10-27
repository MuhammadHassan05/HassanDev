/**
 * Copy for the chai counter pill in the engineer hero, taken word for word
 * from the design kit.
 */

/** Chai counter copy. */
export interface ChaiContent {
  /** Tooltip on the pill. */
  title: string;
  /** Shown while the count is 0. */
  emptyLabel: string;
  /** Shown otherwise; {count} is today's total. */
  label: string;
}

/** Chai counter copy. */
export const chai: ChaiContent = {
  title: "Updates through the day, Lahore time",
  emptyLabel: "Chai today: 0, still early",
  label: "Chai today: {count}",
};
