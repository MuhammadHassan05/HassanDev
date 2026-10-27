/**
 * Helpers for intercepting in-site navigation (used to wrap track switches in
 * a View Transition) without breaking the browser's own link behaviour.
 */

/** The parts of a click event that decide whether it is a plain navigation. */
export interface ClickLike {
  button: number;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  defaultPrevented: boolean;
}

/**
 * Whether a click is an ordinary left click. Modified clicks (new tab, new
 * window, download) must be left to the browser.
 *
 * @param event - The click event.
 */
export function isPlainLeftClick(event: ClickLike): boolean {
  return (
    event.button === 0 &&
    !event.defaultPrevented &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

/**
 * Resolves once `condition` holds, polling with `schedule`, or after
 * `timeoutMs` so a navigation that never lands cannot hang the page.
 *
 * @param condition - Checked on every poll.
 * @param timeoutMs - Give up after this long; resolves false then.
 * @param schedule - Runs the next poll. In the browser use a timer, not
 *   requestAnimationFrame: inside a View Transition callback the browser
 *   pauses rendering, so animation frames never arrive.
 * @param now - Clock in milliseconds; performance.now in the browser.
 * @returns True if the condition was met, false on timeout.
 */
export function waitUntil(
  condition: () => boolean,
  timeoutMs: number,
  schedule: (callback: () => void) => void,
  now: () => number,
): Promise<boolean> {
  const deadline = now() + timeoutMs;
  return new Promise((resolve) => {
    const check = () => {
      if (condition()) return resolve(true);
      if (now() >= deadline) return resolve(false);
      schedule(check);
    };
    check();
  });
}
