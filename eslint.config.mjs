/**
 * ESLint flat config: Next.js core-web-vitals and TypeScript rules, plus the
 * project's security and hygiene rules from CLAUDE.md.
 */
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // These rules back the CLAUDE.md bans with an automated check.
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "react/no-danger": "error",
      "react/jsx-no-target-blank": [
        "error",
        { allowReferrer: false, enforceDynamicLinks: "always" },
      ],
      "no-console": "error",
    },
  },
  globalIgnores([".next/**", "out/**", "coverage/**", "design-kit/**", "next-env.d.ts"]),
]);
