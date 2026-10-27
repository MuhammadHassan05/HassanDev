/**
 * Vitest configuration for post-build checks of the static export in out/.
 * Kept apart from the unit tests because it needs `npm run build` first.
 */
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/export/**/*.test.ts"],
    environment: "node",
  },
});
