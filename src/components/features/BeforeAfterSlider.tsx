/**
 * Drag-to-compare slider for the Tiny Owlets case study: the old cart fills
 * the area and the rebuilt cart is revealed to the right of a divider.
 *
 * Two ways to move the divider, sharing one state: dragging anywhere in the
 * area (mouse, pen or touch, with pointer capture), and a real range input
 * underneath for keyboard and screen reader users. Both carts stay in the
 * accessibility tree; clip-path only hides the "after" cart visually.
 */
"use client";

import { useId, useRef, useState, type PointerEvent } from "react";
import { CartMock } from "@/components/ui/CartMock";
import { ChevronsHorizontalIcon } from "@/components/ui/icons";
import { caseStudy } from "@/content/caseStudy";
import {
  clampPercent,
  COMPARE_START,
  compareValueText,
  percentFromPointer,
  touchIntent,
} from "@/lib/compare";

/** Renders the comparison area and its range control. */
export function BeforeAfterSlider() {
  const { before, after, sliderLabel, sliderValueText } = caseStudy;
  const rangeId = useId();
  const [position, setPosition] = useState(COMPARE_START);
  // "pending": a touch whose direction is not known yet; "dragging": moving the divider.
  const drag = useRef<{ mode: "idle" | "pending" | "dragging"; startX: number; startY: number }>({
    mode: "idle",
    startX: 0,
    startY: 0,
  });

  const moveTo = (event: PointerEvent<HTMLDivElement>) => {
    setPosition(percentFromPointer(event.clientX, event.currentTarget.getBoundingClientRect()));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    // Capture keeps the drag going when the pointer leaves the area mid-drag.
    event.currentTarget.setPointerCapture(event.pointerId);
    if (event.pointerType === "touch") {
      // A touch may be the start of a vertical scroll: wait to see which way it goes.
      drag.current = { mode: "pending", startX: event.clientX, startY: event.clientY };
    } else {
      // A mouse or pen press is unambiguous: jump the divider there at once.
      drag.current = { mode: "dragging", startX: event.clientX, startY: event.clientY };
      moveTo(event);
    }
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    if (current.mode === "pending") {
      const intent = touchIntent(event.clientX - current.startX, event.clientY - current.startY);
      if (intent === "undecided") return;
      // A vertical swipe belongs to the page scroll; ignore the rest of this touch.
      current.mode = intent === "horizontal" ? "dragging" : "idle";
    }
    if (current.mode === "dragging") moveTo(event);
  };

  const stopDragging = () => {
    drag.current.mode = "idle";
  };

  return (
    <>
      {/* touch-action: pan-y hands vertical swipes to the browser, so the page
          still scrolls; horizontal swipes (and pointercancel) come here.
          Below 660px the carts reach under the corner tags, so the area is 480px
          tall there: the smallest height that leaves 12px between tag and cart. */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onLostPointerCapture={stopDragging}
        className="relative h-[clamp(400px,60vw,440px)] cursor-ew-resize max-nav:h-[480px] touch-pan-y overflow-hidden rounded-inset bg-[#0b1017] select-none"
      >
        <div
          role="group"
          aria-label={before.tag}
          className="absolute inset-0 flex items-center justify-center"
        >
          <CartMock cart={before} variant="before" />
        </div>
        <div
          role="group"
          aria-label={after.tag}
          className="absolute inset-0 flex items-center justify-center bg-[#0e1520]"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <CartMock cart={after} variant="after" />
        </div>

        {/* Visual labels; the groups above already carry these names. */}
        <span
          aria-hidden="true"
          className="absolute top-4 left-4 rounded-full bg-black/45 px-3 py-1.5 font-mono text-[12px] text-body"
        >
          {before.tag}
        </span>
        <span
          aria-hidden="true"
          className="absolute top-4 right-4 rounded-full bg-accent px-3 py-1.5 font-mono text-[12px] text-on-accent"
        >
          {after.tag}
        </span>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -ml-px w-0.5 bg-ink"
          style={{ left: `${position}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/18 text-ink backdrop-blur-[10px]">
            <ChevronsHorizontalIcon />
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3.5 px-2 font-mono text-[12px] text-muted">
        <label htmlFor={rangeId}>{before.tag}</label>
        <input
          id={rangeId}
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          onChange={(event) => setPosition(clampPercent(Number(event.target.value)))}
          aria-label={sliderLabel}
          aria-valuetext={compareValueText(sliderValueText, position)}
          className="min-h-11 flex-1 cursor-pointer accent-accent"
        />
        <span>{after.tag}</span>
      </div>
    </>
  );
}
