/**
 * Tiny class name joiner, so components can toggle Tailwind classes without
 * pulling in a dependency.
 */

/**
 * Joins the truthy class names with single spaces.
 *
 * @param classes - Class names; false, null, undefined and "" are skipped.
 * @returns The combined class string.
 */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
