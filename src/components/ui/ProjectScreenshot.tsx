/**
 * An approved project screenshot from src/content/projectImages.ts, filling
 * its box with object-fit cover from the top, where each site's logo and
 * headline are. Shared by project cards, case study cards and case study covers.
 */
import Image from "next/image";
import type { ProjectImage } from "@/content/projectImages";
import type { IllustrationKey } from "@/content/illustrations";
import { cx } from "@/lib/cx";
import { withBasePath } from "@/lib/site";

/** Props for {@link ProjectScreenshot}. */
export interface ProjectScreenshotProps {
  project: IllustrationKey;
  image: ProjectImage;
  /** "eager" only for an image visible when the page first loads. */
  loading?: "lazy" | "eager";
  /** Size, corners and borders, which differ per use. */
  className?: string;
}

/**
 * Renders the screenshot.
 *
 * @param props.project - Project key; the file is public/projects/<key>.webp.
 * @param props.image - Alt text and the file's size.
 * @param props.loading - lazy (default) or eager.
 */
export function ProjectScreenshot({
  project,
  image,
  loading = "lazy",
  className,
}: ProjectScreenshotProps) {
  return (
    // next/image does not add the base path to unoptimized images, so it is added here.
    <Image
      src={withBasePath(`/projects/${project}.webp`)}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={loading}
      className={cx("block w-full object-cover object-top", className)}
    />
  );
}
