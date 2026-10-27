/**
 * Maths for the before/after comparison slider: where the divider sits, as a
 * percentage of the comparison area's width.
 */

/** Where the divider starts, before the visitor touches it. */
export const COMPARE_START = 50;

/** The horizontal extent of the comparison area, as from getBoundingClientRect(). */
export interface HorizontalBox {
  left: number;
  width: number;
}

/**
 * Clamps a value to a whole percentage between 0 and 100.
 *
 * @param value - Any number; NaN becomes the starting position.
 */
export function clampPercent(value: number): number {
  if (Number.isNaN(value)) return COMPARE_START;
  return Math.round(Math.min(100, Math.max(0, value)));
}

/**
 * Fills the slider's spoken value template. The divider sits at `position`,
 * so the "before" cart shows to its left and the "after" cart to its right;
 * a bare number would not tell a screen reader user which is which.
 *
 * @param template - Text with {before} and {after} placeholders.
 * @param position - Divider position; clamped like the slider itself.
 */
export function compareValueText(template: string, position: number): string {
  const before = clampPercent(position);
  return template
    .replaceAll("{before}", String(before))
    .replaceAll("{after}", String(100 - before));
}

/** How far, in pixels, a touch must travel before its direction is decided. */
export const TOUCH_SLOP = 8;

/** What a touch gesture turned out to be. */
export type TouchIntent = "undecided" | "horizontal" | "vertical";

/**
 * Decides whether a touch is a sideways drag (move the divider) or a vertical
 * swipe (leave it to the browser to scroll). Until it has travelled TOUCH_SLOP
 * pixels it is undecided, because the first few moves of a scroll arrive
 * before the browser takes the gesture over.
 *
 * @param dx - Horizontal distance from the touch start, in pixels.
 * @param dy - Vertical distance from the touch start, in pixels.
 */
export function touchIntent(dx: number, dy: number): TouchIntent {
  if (Math.hypot(dx, dy) < TOUCH_SLOP) return "undecided";
  return Math.abs(dx) > Math.abs(dy) ? "horizontal" : "vertical";
}

/**
 * Converts a pointer position to the divider position. Pointers beyond the
 * edges pin the divider to 0 or 100.
 *
 * @param clientX - Pointer x in viewport pixels.
 * @param box - The comparison area.
 */
export function percentFromPointer(clientX: number, box: HorizontalBox): number {
  if (box.width <= 0) return COMPARE_START;
  return clampPercent(((clientX - box.left) / box.width) * 100);
}
