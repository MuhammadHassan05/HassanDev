/**
 * Small display formatters shared by components.
 */

/**
 * Formats a count with at least two digits, as the design shows counts ("06").
 *
 * @param count - A non-negative whole number.
 * @returns The zero-padded count.
 */
export function twoDigits(count: number): string {
  return String(count).padStart(2, "0");
}
