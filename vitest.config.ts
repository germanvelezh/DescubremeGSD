/**
 * Vitest 2.x configuration — DescubreMe Phase 1 Wave 0 (Plan 01-03).
 *
 * Default environment is `node`. Tests that need a DOM (React component
 * rendering) must add `// @vitest-environment jsdom` at the top of the file.
 * This keeps unit/lint/integration tests fast (no DOM bootstrap) and only
 * pays the jsdom cost where it's actually needed.
 *
 * The `@/*` alias mirrors `tsconfig.json` paths so test imports resolve
 * identically to source imports.
 *
 * NOTE: `passWithNoTests` defaults to `false` in Vitest 2.x, which lets a
 * misconfigured glob silently exit 0. We pin it explicitly so a future
 * refactor of `test.include` does not hide a regression.
 */
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
      // `server-only` is a Next.js build-time marker (throws if imported in
      // client bundles). In Vitest Node tests it must resolve to a noop so
      // server modules can be imported under test (Plan 01-06).
      "server-only": fileURLToPath(
        new URL("./tests/stubs/server-only.ts", import.meta.url),
      ),
    },
  },
  test: {
    environment: "node",
    globals: true,
    include: ["tests/**/*.test.{ts,tsx}", "lib/**/*.test.{ts,tsx}"],
    exclude: ["node_modules", ".next", "tests/e2e/**"],
    setupFiles: ["./tests/setup.ts"],
    passWithNoTests: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["lib/**/*.ts", "app/**/*.ts", "app/**/*.tsx"],
      exclude: ["**/*.test.ts", "**/*.test.tsx", "tests/**"],
    },
  },
});
