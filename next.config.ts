/**
 * Next.js configuration: a fully static export for GitHub Pages, served from
 * the /HassanDev project path.
 */
import type { NextConfig } from "next";
import { BASE_PATH } from "./src/lib/site";

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  // GitHub Pages serves folder/index.html, so every route needs a trailing slash.
  trailingSlash: true,
  // There is no image optimization server on a static host.
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
