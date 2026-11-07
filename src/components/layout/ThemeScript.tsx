/**
 * Applies a saved light/dark choice before the first paint. Rendered in
 * <head>, so it runs before the body is parsed and the page never flashes the
 * wrong theme. React renders the text of a <script> element as-is, so no
 * raw-HTML API is needed; the script contains no "<", so it cannot end the
 * tag early.
 */
import { THEME_SCRIPT } from "@/lib/theme";

/** Renders the inline theme script; the CSP build step allows it by hash. */
export function ThemeScript() {
  return <script>{THEME_SCRIPT}</script>;
}
