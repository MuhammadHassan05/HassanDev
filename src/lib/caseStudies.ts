/**
 * Lookups over the case studies: which are published, their URLs, the "next"
 * one, the ones a band features and the one behind a project card. The list
 * is passed in, so everything here is testable with small fixtures. Callers
 * pass the published list wherever a draft must not appear.
 */
import type { CaseStudy } from "@/content/caseStudies";

/** Route of the case studies list. */
export const CASE_STUDIES_PATH = "/case-studies/";

/**
 * The case studies that are finished and go into the build; drafts are left out.
 *
 * @param list - All case studies.
 */
export function publishedCaseStudies(list: readonly CaseStudy[]): CaseStudy[] {
  return list.filter((study) => !study.draft);
}

/**
 * Route of one case study page, e.g. "/case-studies/yetti-ai/".
 *
 * @param slug - The case study's slug.
 */
export function caseStudyHref(slug: string): string {
  return `${CASE_STUDIES_PATH}${slug}/`;
}

/**
 * Finds a case study by slug.
 *
 * @param list - All case studies.
 * @param slug - The slug to look for.
 */
export function findCaseStudy(list: readonly CaseStudy[], slug: string): CaseStudy | undefined {
  return list.find((study) => study.slug === slug);
}

/**
 * The case study after this one, wrapping round to the first, so every page
 * has somewhere to go next.
 *
 * @param list - All case studies, in display order.
 * @param slug - The current case study.
 * @throws If the slug is not in the list.
 */
export function nextCaseStudy(list: readonly CaseStudy[], slug: string): CaseStudy {
  const index = list.findIndex((study) => study.slug === slug);
  const next = list[(index + 1) % list.length];
  if (index === -1 || !next) throw new Error(`No case study "${slug}"`);
  return next;
}

/**
 * The published case studies a band features, in the given order. Drafts are
 * skipped, so a band shrinks (or falls back) until they are finished.
 *
 * @param list - All case studies, drafts included.
 * @param slugs - Slugs to show.
 * @throws If a slug has no case study at all, so a typo fails the build.
 */
export function featuredCaseStudies(
  list: readonly CaseStudy[],
  slugs: readonly string[],
): CaseStudy[] {
  return slugs
    .map((slug) => {
      const study = findCaseStudy(list, slug);
      if (!study) throw new Error(`Featured case study "${slug}" does not exist`);
      return study;
    })
    .filter((study) => !study.draft);
}

/**
 * The case study written about a project card, if there is one.
 *
 * @param list - All case studies.
 * @param project - The project's illustration key, which identifies its card.
 */
export function caseStudyForProject(
  list: readonly CaseStudy[],
  project: string,
): CaseStudy | undefined {
  return list.find((study) => study.project === project);
}

/**
 * Joins names as English prose: "A", "A and B", "A, B and C".
 *
 * @param names - Names in order.
 */
export function listNames(names: readonly string[]): string {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}
