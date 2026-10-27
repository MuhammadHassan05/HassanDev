/**
 * The chai counter's logic: how many cups of chai Hassan has had today,
 * going by the time of day in Lahore (Asia/Karachi).
 */

/** Time zone the count follows. Pakistan has no daylight saving time. */
export const CHAI_TIME_ZONE = "Asia/Karachi";

/** Hour of the first cup, and hours between cups. */
const FIRST_CUP_HOUR = 7;
const HOURS_PER_CUP = 3;
/** Cups never go above this from the clock alone. */
export const MAX_CLOCK_CUPS = 6;

/**
 * The hour (0–23) in Lahore at a given moment.
 *
 * @param date - The moment to read.
 */
export function karachiHour(date: Date): number {
  const hour = new Intl.DateTimeFormat("en-US", {
    timeZone: CHAI_TIME_ZONE,
    hour: "numeric",
    hourCycle: "h23",
  })
    .formatToParts(date)
    .find((part) => part.type === "hour")?.value;
  return Number(hour ?? 0);
}

/**
 * Cups by the clock: none before 7am, then one more every 3 hours, at most 6.
 *
 * @param hour - Hour of the day in Lahore, 0–23.
 */
export function cupsForHour(hour: number): number {
  if (hour < FIRST_CUP_HOUR) return 0;
  return Math.min(MAX_CLOCK_CUPS, Math.floor((hour - FIRST_CUP_HOUR) / HOURS_PER_CUP) + 1);
}

/**
 * Today's count: cups by the clock plus one per chai command run on the page.
 *
 * @param date - Current time.
 * @param extraCups - Chai commands run so far.
 */
export function chaiCount(date: Date, extraCups: number): number {
  return cupsForHour(karachiHour(date)) + extraCups;
}

/**
 * Fills a label template such as "Chai today: {count}".
 *
 * @param template - Copy with a {count} placeholder.
 * @param count - The number to show.
 */
export function formatChaiLabel(template: string, count: number): string {
  return template.replace("{count}", String(count));
}
