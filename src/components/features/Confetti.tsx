/**
 * Confetti burst for the terminal's easter egg: CSS-animated pieces that fall
 * from the top of the viewport and remove themselves after CONFETTI_LIFETIME_MS.
 * The caller only renders it when motion is allowed.
 */
"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CONFETTI_LIFETIME_MS, type ConfettiColor, type ConfettiPiece } from "@/lib/confetti";

/** Literal classes so Tailwind finds them. */
const COLOR_CLASSES: Record<ConfettiColor, string> = {
  accent: "bg-accent",
  glow: "bg-glow",
  ink: "bg-ink",
};

/** Props for {@link Confetti}. */
export interface ConfettiProps {
  pieces: readonly ConfettiPiece[];
  /** Called once every piece has landed, so the parent can unmount the burst. */
  onDone: () => void;
}

/**
 * Renders a burst into <body>. A portal is needed because the terminal's glass
 * card uses backdrop-filter, which would trap fixed-position children inside it.
 *
 * @param props.pieces - From createConfetti() in src/lib/confetti.ts.
 */
export function Confetti({ pieces, onDone }: ConfettiProps) {
  useEffect(() => {
    const id = window.setTimeout(onDone, CONFETTI_LIFETIME_MS);
    return () => window.clearTimeout(id);
  }, [onDone]);

  return createPortal(
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-dvh overflow-hidden"
    >
      {pieces.map((piece, index) => (
        <span
          // Pieces never reorder within a burst; a new burst remounts the whole list.
          key={index}
          className={`confetti-piece confetti-${piece.path} ${COLOR_CLASSES[piece.color]}`}
          style={{
            left: `${piece.left}%`,
            width: piece.width,
            height: piece.height,
            animationDuration: `${piece.duration}s`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>,
    document.body,
  );
}
