/**
 * Glass card that tilts gently toward the pointer with a soft light glint,
 * as on the project cards in the design. Only for a precise, hovering pointer
 * and only when motion is allowed; otherwise it is a still glass card.
 */
"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import { cx } from "@/lib/cx";
import { canTilt, tiltFromPointer, tiltTransform } from "@/lib/motion";

/** Props for {@link TiltCard}. */
export interface TiltCardProps {
  className?: string;
  children: ReactNode;
}

/**
 * Renders an article that tilts on hover. Pointer moves are batched to one
 * style update per animation frame.
 *
 * @param props.className - Layout and surface classes for the article.
 */
export function TiltCard({ className, children }: TiltCardProps) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef<number | null>(null);
  const pointer = useRef({ x: 0, y: 0 });

  // Cancel a pending frame if the card unmounts mid-hover (e.g. filtered out).
  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const handleMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || !canTilt(window)) return;
    pointer.current = { x: event.clientX, y: event.clientY };
    if (frame.current !== null) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const card = ref.current;
      if (!card) return;
      const tilt = tiltFromPointer(
        pointer.current.x,
        pointer.current.y,
        card.getBoundingClientRect(),
      );
      card.style.transform = tiltTransform(tilt);
      card.style.setProperty("--gx", `${tilt.glintX.toFixed(1)}%`);
      card.style.setProperty("--gy", `${tilt.glintY.toFixed(1)}%`);
      card.style.setProperty("--go", "1");
    });
  };

  const handleLeave = () => {
    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }
    const card = ref.current;
    if (!card) return;
    card.style.transform = "";
    card.style.setProperty("--go", "0");
  };

  return (
    <article
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cx("tilt-card relative", className)}
    >
      <span aria-hidden="true" className="tilt-glint" />
      {children}
    </article>
  );
}
