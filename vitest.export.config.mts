/**
 * Vitest configuration for post-build checks of the static export in out/.
 * Kept apart from the unit tests because it needs `npm run build` first.
 */
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // Same alias as the unit tests, so checks can read the content they expect in out/.
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    include: ["tests/export/**/*.test.ts"],
    environment: "node",
  },
});
