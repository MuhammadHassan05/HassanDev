/**
 * Call to action in three styles: a solid accent button, a hairline
 * secondary button, and a text link with a chevron ("Learn more ›"). Renders
 * a link when given an href and a real <button> otherwise, so semantics
 * always match behaviour.
 */
import type { ComponentPropsWithoutRef, MouseEventHandler, ReactNode } from "react";
import { cx } from "@/lib/cx";
import { AppLink } from "./AppLink";
import { ChevronRightIcon } from "./icons";

/** Visual style. */
export type ButtonVariant = "primary" | "secondary" | "text";

/** Size of the two filled styles: md (48px) for page actions, sm (44px) for the nav. */
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
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

type NativeButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: undefined;
  };

/** Props for {@link Button}: pass href for a link, omit it for a button. */
export type ButtonProps = LinkButtonProps | NativeButtonProps;

/** Shape of the two filled styles, by size: fully round. */
const FILLED_SIZES: Record<ButtonSize, string> = {
  md: "min-h-12 px-6 text-[17px]",
  sm: "min-h-11 px-5 text-[15px]",
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  // Full width on phones (the primary action is the easiest target), natural width from 768px.
  primary: "w-full bg-accent text-on-accent hover:opacity-90 md:w-auto",
  secondary: "border border-line text-ink hover:bg-surface-2",
  text: "min-h-11 gap-1 text-accent-ink hover:underline hover:underline-offset-4",
};

/** Builds the class list shared by the link and button forms. */
function buttonClasses(variant: ButtonVariant, size: ButtonSize, className?: string): string {
  return cx(
    "inline-flex cursor-pointer items-center gap-2 transition-[opacity,background-color] duration-200",
    variant !== "text" && `justify-center rounded-button font-medium ${FILLED_SIZES[size]}`,
    VARIANT_CLASSES[variant],
    className,
  );
}

/** The label, with the chevron that marks the text style. */
function Label({ variant, children }: { variant: ButtonVariant; children: ReactNode }) {
  return variant === "text" ? (
    <>
      {children}
      <ChevronRightIcon />
    </>
  ) : (
    children
  );
}

/**
 * Renders a call to action.
 *
 * @param props.variant - primary (default), secondary or text.
 * @param props.size - md (default) or sm, for the filled styles.
 * @param props.href - When set, renders a link via AppLink.
 */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { href, newTab, onClick, variant = "primary", size = "md", className, children } = props;
    return (
      <AppLink
        href={href}
        newTab={newTab}
        onClick={onClick}
        className={buttonClasses(variant, size, className)}
      >
        <Label variant={variant}>{children}</Label>
      </AppLink>
    );
  }

  const { variant = "primary", size = "md", className, children, type = "button", ...rest } = props;
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      <Label variant={variant}>{children}</Label>
    </button>
  );
}
