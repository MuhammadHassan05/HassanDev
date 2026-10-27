/**
 * Embeds structured data (JSON-LD) for search engines. React renders the
 * text of a <script> element as-is, so no raw-HTML API is needed;
 * serializeJsonLd escapes "<" so the content can never end the tag early.
 */
import { serializeJsonLd } from "@/lib/seo";

/** Props for {@link JsonLd}. */
export interface JsonLdProps {
  data: unknown;
}

/**
 * Renders a JSON-LD data block. It is not executable JavaScript; the CSP
 * build step hashes it along with the page's other inline scripts.
 *
 * @param props.data - A schema.org object.
 */
export function JsonLd({ data }: JsonLdProps) {
  return <script type="application/ld+json">{serializeJsonLd(data)}</script>;
}
