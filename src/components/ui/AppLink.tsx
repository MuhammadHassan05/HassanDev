/**
 * The one place links are rendered. It picks next/link, a base-path-prefixed
 * file link or a hardened external anchor based on the href, so no caller can
 * forget the base path or rel="noopener noreferrer".
 */
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { siteChrome } from "@/content/site";
import { linkKind } from "@/lib/links";
import { withBasePath } from "@/lib/site";

/** Props for {@link AppLink}. target and rel are derived, never passed in. */
export interface AppLinkProps extends Omit<
  ComponentPropsWithoutRef<"a">,
  "href" | "target" | "rel"
> {
  href: string;
  /** Opens the destination in a new tab. */
  newTab?: boolean;
}

/**
 * Renders a link of the right kind for its href.
 *
 * @param props.href - Route, public file, #anchor, https: or mailto: URL.
 * @param props.newTab - Opens in a new tab; always paired with a safe rel.
 */
export function AppLink({ href, newTab = false, children, ...rest }: AppLinkProps) {
  const kind = linkKind(href);
  const target = newTab ? "_blank" : undefined;
  // Sighted users see the tab open; screen reader users are told in advance.
  const content = (
    <>
      {children}
      {newTab ? <span className="sr-only"> {siteChrome.newTabLabel}</span> : null}
    </>
  );

  if (kind === "route") {
    return (
      <Link href={href} target={target} rel={newTab ? "noopener noreferrer" : undefined} {...rest}>
        {content}
      </Link>
    );
  }

  const resolved = kind === "asset" ? withBasePath(href) : href;
  const rel = kind === "external" || newTab ? "noopener noreferrer" : undefined;

  return (
    <a href={resolved} target={target} rel={rel} {...rest}>
      {content}
    </a>
  );
}
