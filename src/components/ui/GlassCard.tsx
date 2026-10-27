/**
 * The frosted glass surface every card, panel and pill in the design is built on.
 */
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/** Corner radius steps used by the design, from 18px to 28px. */
export type GlassRadius = "card-sm" | "card" | "card-lg" | "panel" | "shell";

const RADIUS_CLASSES: Record<GlassRadius, string> = {
  "card-sm": "rounded-card-sm",
  card: "rounded-card",
  "card-lg": "rounded-card-lg",
  panel: "rounded-panel",
  shell: "rounded-shell",
};

/** Props for {@link GlassCard}. */
export interface GlassCardProps {
  /** Element to render, so cards keep the right semantics (article, li…). */
  as?: "div" | "article" | "section" | "li" | "aside";
  radius?: GlassRadius;
  className?: string;
  children: ReactNode;
}

/**
 * Renders a glass panel. Padding and layout come from className, because they
 * differ for almost every use in the design.
 *
 * @param props.as - Element type, div by default.
 * @param props.radius - Corner radius, 20px ("card") by default.
 */
export function GlassCard({
  as: Tag = "div",
  radius = "card",
  className,
  children,
}: GlassCardProps) {
  return <Tag className={cx("glass", RADIUS_CLASSES[radius], className)}>{children}</Tag>;
}
