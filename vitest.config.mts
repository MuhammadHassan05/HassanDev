/**
 * Vitest configuration: unit and content tests. Post-build checks of out/
 * live in tests/export and run separately (vitest.export.config.mts).
 */
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    include: ["tests/**/*.test.ts"],
    exclude: ["tests/export/**"],
    environment: "node",
  },
});
