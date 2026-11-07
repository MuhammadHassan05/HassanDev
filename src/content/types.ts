/**
 * Shapes shared by several content files.
 */

/** Copy for a SectionHeader: the title and its one short supporting line. */
export interface SectionIntro {
  title: string;
  description?: string;
}

/** A labelled link. href is a route, /public file, #anchor, https: or mailto: URL. */
export interface LinkAction {
  label: string;
  href: string;
  /** Opens in a new tab, where the design sets target="_blank". */
  newTab?: boolean;
}
