/**
 * The phone nav's menu: a 44px button that opens a full-width panel under the
 * nav bar, with the page links in large type and the Contact button at the
 * bottom. From 768px the links sit in the bar itself and this is hidden.
 *
 * While open, Tab stays inside the button and the panel, the page behind does
 * not scroll, and Escape (or choosing a link) closes it and returns focus to
 * the button.
 */
"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AppLink } from "@/components/ui/AppLink";
import { Button } from "@/components/ui/Button";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { cx } from "@/lib/cx";

/** One page link in the menu. */
export interface NavMenuLink {
  href: string;
  label: string;
  current: boolean;
}

/** Props for {@link NavMenu}. */
export interface NavMenuProps {
  links: readonly NavMenuLink[];
  contact: { href: string; label: string };
  /** Accessible name of the menu button. */
  label: string;
}

/** Matches the md breakpoint, where the links move into the bar. */
const DESKTOP_QUERY = "(min-width: 48rem)";

/**
 * Renders the menu button and, when open, the panel.
 *
 * @param props.links - Page links, with the current one marked.
 * @param props.contact - The Contact button's target and label.
 */
export function NavMenu({ links, contact, label }: NavMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const container = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  const close = (returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) button.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    // Move focus into the panel, and keep the page behind it still.
    container.current?.querySelector<HTMLElement>("[data-menu-panel] a")?.focus();
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const desktop = window.matchMedia(DESKTOP_QUERY);
    const closeOnDesktop = () => desktop.matches && setOpen(false);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      root.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!open) return;
    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
      return;
    }
    if (event.key !== "Tab") return;
    // Keep focus cycling between the button and the panel.
    const focusable = [
      ...(container.current?.querySelectorAll<HTMLElement>("button, a[href]") ?? []),
    ];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <div ref={container} onKeyDown={handleKeyDown} className="md:hidden">
      <button
        ref={button}
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 cursor-pointer items-center justify-center rounded-button text-ink hover:bg-surface-2"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>
      {open ? (
        <div
          id={panelId}
          data-menu-panel=""
          className="fixed inset-x-0 bottom-0 z-40 flex flex-col gap-8 overflow-y-auto bg-bg px-page pt-6 pb-[max(32px,env(safe-area-inset-bottom))] top-[calc(57px+env(safe-area-inset-top))]"
        >
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {links.map((link) => (
              <li key={link.href}>
                <AppLink
                  href={link.href}
                  aria-current={link.current ? "page" : undefined}
                  onClick={() => close(false)}
                  className={cx(
                    "flex min-h-14 items-center text-[32px] font-semibold tracking-[-0.02em]",
                    link.current ? "text-ink" : "text-ink-2 hover:text-ink",
                  )}
                >
                  {link.label}
                </AppLink>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <Button href={contact.href} onClick={() => close(false)}>
              {contact.label}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
