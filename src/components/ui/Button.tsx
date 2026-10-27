/**
 * Pill-shaped call to action from the design. Renders a link when given an
 * href and a real <button> otherwise, so semantics always match behaviour.
 */
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "@/lib/cx";
import { AppLink } from "./AppLink";

/** Visual style: filled accent, frosted glass, or the nav's thin outline. */
export type ButtonVariant = "primary" | "glass" | "outline";

/** Height: md is the 52px hero size, sm the 44px nav size. */
export type ButtonSize = "md" | "sm";

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type LinkButtonProps = CommonProps & {
  href: string;
  newTab?: boolean;
};

type NativeButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: undefined;
  };

/** Props for {@link Button}: pass href for a link, omit it for a button. */
export type ButtonProps = LinkButtonProps | NativeButtonProps;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-accent px-[26px] font-semibold text-on-accent hover:text-on-accent",
  glass: "glass px-6 font-medium",
  outline: "border border-outline-strong px-5 font-medium",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  md: "min-h-13",
  sm: "min-h-11 text-[15px]",
};

/** Builds the class list shared by the link and button forms. */
function buttonClasses(variant: ButtonVariant, size: ButtonSize, className?: string): string {
  return cx(
    "inline-flex cursor-pointer items-center gap-2.5 rounded-full",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  );
}

/**
 * Renders a call to action.
 *
 * @param props.variant - primary (default), glass or outline.
 * @param props.size - md (default, 52px) or sm (44px).
 * @param props.href - When set, renders a link via AppLink.
 */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { href, newTab, variant = "primary", size = "md", className, children } = props;
    return (
      <AppLink href={href} newTab={newTab} className={buttonClasses(variant, size, className)}>
        {children}
      </AppLink>
    );
  }

  const { variant = "primary", size = "md", className, children, type = "button", ...rest } = props;
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
