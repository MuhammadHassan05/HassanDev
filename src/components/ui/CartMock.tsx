/**
 * Mock of a store cart, as drawn in the Tiny Owlets case study. It is an
 * illustration: the "buttons" and quantity pills are not controls.
 *
 * Its greys are the illustration palette from the design kit (the same values
 * the project SVGs use), not theme tokens, so they are written inline.
 */
import type { CartState } from "@/content/caseStudy";
import { cx } from "@/lib/cx";

/** Props for {@link CartMock}. */
export interface CartMockProps {
  cart: CartState;
  /** The rebuilt cart uses the accent button; the old one a flat grey. */
  variant: "before" | "after";
}

/**
 * Renders one cart.
 *
 * @param props.cart - Lines, button label and notes from src/content/caseStudy.ts.
 */
export function CartMock({ cart, variant }: CartMockProps) {
  return (
    <div className="box-border flex w-[min(380px,86%)] flex-col gap-4 rounded-inset border border-[#2a3542] bg-[#111720] p-[22px] font-mono">
      <p className="m-0 text-[13px] text-[#e8edf2]">{cart.cartTitle}</p>
      <ul className="m-0 flex list-none flex-col gap-4 p-0">
        {cart.lines.map((line, index) => (
          <li
            // Lines are fixed mock rows with no identity of their own.
            key={index}
            className={cx("flex items-center gap-3", line.dimmed && "opacity-45")}
          >
            <span aria-hidden="true" className="size-11 shrink-0 rounded-lg bg-[#1e2733]" />
            <span aria-hidden="true" className="flex flex-1 flex-col gap-1.5">
              <span className="h-[7px] w-[70%] rounded bg-[#9aa6b2]" />
              <span className="h-1.5 w-[40%] rounded-[3px] bg-[#6b7785]" />
            </span>
            <span className="rounded-full border border-[#2a3542] px-2.5 py-1 text-[12px] text-body">
              - {line.quantity} +
            </span>
          </li>
        ))}
      </ul>
      <p
        className={cx(
          "m-0 flex min-h-11 items-center justify-center rounded-full text-[13px]",
          variant === "after"
            ? "bg-accent font-medium text-on-accent"
            : "bg-[#2a3542] text-[#c3ccd5]",
        )}
      >
        {cart.buttonLabel}
      </p>
      {cart.note ? <p className="m-0 text-[12px] text-dim">{cart.note}</p> : null}
      {cart.notifications?.map((notification) => (
        <p
          key={notification.label}
          className="glass m-0 flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
        >
          <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
          <span className="text-[12px] text-[#e8edf2]">{notification.label}</span>
          <span className="text-[11px] text-dim">{notification.detail}</span>
        </p>
      ))}
    </div>
  );
}
