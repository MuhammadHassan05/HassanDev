/**
 * The Tiny Owlets cart before and after: the two mock carts, the slider's
 * labels, a caption and three highlights, taken word for word from the design
 * kit. It is the cover of the Tiny Owlets case study (src/content/caseStudies.ts).
 */

/** One line item in a mock cart. */
export interface CartLine {
  quantity: number;
  /** Shown faded, like the zero-quantity item that lingers in the old cart. */
  dimmed?: boolean;
}

/** A notification pill under the rebuilt cart. */
export interface CartNotification {
  label: string;
  detail: string;
}

/** One side of the comparison. */
export interface CartState {
  tag: string;
  cartTitle: string;
  lines: readonly CartLine[];
  buttonLabel: string;
  note?: string;
  notifications?: readonly CartNotification[];
}

/** The whole before/after comparison. */
export interface CartComparison {
  /** One line under the slider, inviting a drag. */
  caption: string;
  before: CartState;
  after: CartState;
  /** Accessible name of the range input that moves the divider. */
  sliderLabel: string;
  /**
   * What screen readers announce as the slider moves. {before} and {after}
   * become the share of the area each cart shows, in whole percent.
   */
  sliderValueText: string;
  highlights: readonly string[];
}

/** Tiny Owlets before/after content. */
export const cartComparison: CartComparison = {
  caption: "Drag across the store to compare the old cart with the one I rebuilt.",
  before: {
    tag: "Before",
    cartTitle: "Your cart",
    lines: [{ quantity: 1 }, { quantity: 0, dimmed: true }, { quantity: 1 }],
    buttonLabel: "Update Cart",
    note: "Zero-quantity items stay in the cart. No order alerts.",
  },
  after: {
    tag: "After",
    cartTitle: "Your cart",
    lines: [{ quantity: 1 }, { quantity: 1 }],
    buttonLabel: "Place Order",
    notifications: [
      { label: "Order placed", detail: "WhatsApp" },
      { label: "Confirmed", detail: "email sent" },
    ],
  },
  sliderLabel: "Compare before and after",
  sliderValueText: "{before}% before, {after}% after",
  highlights: [
    "Update Cart → Place Order",
    "Zero-quantity items auto-removed",
    "WhatsApp + email order alerts",
  ],
};
