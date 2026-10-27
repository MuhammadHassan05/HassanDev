/**
 * Unit tests for the navigation helpers in src/lib/navigation.ts and the
 * route-to-track mapping in src/lib/routes.ts.
 */
import { describe, expect, it } from "vitest";
import { isPlainLeftClick, waitUntil, type ClickLike } from "@/lib/navigation";
import { trackForPathname } from "@/lib/routes";

const plain: ClickLike = {
  button: 0,
  metaKey: false,
  ctrlKey: false,
  shiftKey: false,
  altKey: false,
  defaultPrevented: false,
};

describe("isPlainLeftClick", () => {
  it("accepts an ordinary left click", () => {
    expect(isPlainLeftClick(plain)).toBe(true);
  });

  it.each([
    ["middle button", { button: 1 }],
    ["cmd-click", { metaKey: true }],
    ["ctrl-click", { ctrlKey: true }],
    ["shift-click", { shiftKey: true }],
    ["alt-click", { altKey: true }],
    ["already handled", { defaultPrevented: true }],
  ])("leaves a %s to the browser", (_label, change) => {
    expect(isPlainLeftClick({ ...plain, ...change })).toBe(false);
  });
});

describe("waitUntil", () => {
  /** A fake clock and poll scheduler, so the test controls time. */
  function fakeTimer() {
    let time = 0;
    return {
      now: () => time,
      schedule: (callback: () => void) => {
        time += 16;
        queueMicrotask(callback);
      },
    };
  }

  it("resolves true once the condition holds", async () => {
    const timer = fakeTimer();
    let frames = 0;
    const result = await waitUntil(() => ++frames >= 3, 1000, timer.schedule, timer.now);
    expect(result).toBe(true);
    expect(frames).toBe(3);
  });

  it("resolves false after the timeout", async () => {
    const timer = fakeTimer();
    expect(await waitUntil(() => false, 100, timer.schedule, timer.now)).toBe(false);
  });
});

describe("trackForPathname", () => {
  it.each([
    ["/", "engineer"],
    ["/studio/", "studio"],
    ["/studio", "studio"],
    ["/studio/anything/", "studio"],
    ["/studios/", "engineer"],
    ["/_not-found/", "engineer"],
  ])("maps %s to %s", (pathname, track) => {
    expect(trackForPathname(pathname)).toBe(track);
  });
});
