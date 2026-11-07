/**
 * The flat surface every card is built on: --surface background, 18px
 * corners, a 1px hairline in light mode and none in dark mode (the `card`
 * utility in globals.css), no shadow.
 */
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/** Props for {@link Card}. */
export interface CardProps {
  /** Element to render, so cards keep the right semantics (article, li…). */
  as?: "div" | "article" | "section" | "li" | "aside";
  className?: string;
  children: ReactNode;
}

/**
 * Renders a card. Padding and layout come from className, because they
 * differ for almost every use.
 *
 * @param props.as - Element type, div by default.
 */
export function Card({ as: Tag = "div", className, children }: CardProps) {
  return <Tag className={cx("card", className)}>{children}</Tag>;
}
