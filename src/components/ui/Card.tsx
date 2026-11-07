/**
 * The flat surface every card and panel is built on: a solid surface colour
 * and a 1px hairline.
 */
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/** Corner radius steps used by the design, from 18px to 28px. */
export type CardRadius = "card-sm" | "card" | "card-lg" | "panel" | "shell";

const RADIUS_CLASSES: Record<CardRadius, string> = {
  "card-sm": "rounded-card-sm",
  card: "rounded-card",
  "card-lg": "rounded-card-lg",
  panel: "rounded-panel",
  shell: "rounded-shell",
};

/** Props for {@link Card}. */
export interface CardProps {
  /** Element to render, so cards keep the right semantics (article, li…). */
  as?: "div" | "article" | "section" | "li" | "aside";
  radius?: CardRadius;
  className?: string;
  children: ReactNode;
}

/**
 * Renders a card. Padding and layout come from className, because they
 * differ for almost every use in the design.
 *
 * @param props.as - Element type, div by default.
 * @param props.radius - Corner radius, 20px ("card") by default.
 */
export function Card({ as: Tag = "div", radius = "card", className, children }: CardProps) {
  return <Tag className={cx("panel", RADIUS_CLASSES[radius], className)}>{children}</Tag>;
}
