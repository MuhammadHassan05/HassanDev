/**
 * TrackSwitch link that wraps the page change in a View Transition, so the
 * old track cross-fades into the new one (glow colors included). Where View
 * Transitions are unsupported, or motion is reduced, it is an ordinary link
 * and the glow background's CSS color transition does the morph instead.
 */
"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { AppLink, type AppLinkProps } from "@/components/ui/AppLink";
import { motionAllowed, supportsViewTransitions } from "@/lib/motion";
import { isPlainLeftClick, waitUntil } from "@/lib/navigation";
import { withBasePath } from "@/lib/site";

/** How long the transition waits for the new page before giving up. */
const NAVIGATION_TIMEOUT_MS = 3000;
/** Polling interval while waiting; roughly one frame. */
const POLL_MS = 16;

/**
 * Renders a track link.
 *
 * @param props.href - Route of the track, e.g. "/studio/".
 */
export function TrackLink({ href, children, ...rest }: AppLinkProps) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isPlainLeftClick(event) || !motionAllowed(window) || !supportsViewTransitions(document)) {
      return;
    }
    const target = withBasePath(href);
    if (window.location.pathname === target) {
      return;
    }
    event.preventDefault();
    // The transition snapshots the page when the callback resolves, so it waits
    // until the router has committed the new route (the URL updates after commit).
    // Polling uses a timer: rendering, and with it requestAnimationFrame, is
    // paused until this callback finishes.
    document.startViewTransition(async () => {
      router.push(href);
      await waitUntil(
        () => window.location.pathname === target,
        NAVIGATION_TIMEOUT_MS,
        (poll) => window.setTimeout(poll, POLL_MS),
        () => performance.now(),
      );
    });
  };

  return (
    <AppLink href={href} onClick={handleClick} {...rest}>
      {children}
    </AppLink>
  );
}
