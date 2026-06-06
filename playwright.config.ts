/**
 * Playwright 1.48+ configuration — DescubreMe Phase 1 Wave 0 (Plan 01-03).
 *
 * Coverage strategy:
 * - 3 projects: mobile-chromium (Pixel 5), mobile-webkit (iPhone 12),
 *   desktop-chromium (Desktop Chrome). Mobile-first per UX-05; webkit
 *   catches Safari quirks that Chromium hides.
 * - No firefox: two engines (Chromium + WebKit) cover the rendering
 *   matrix without doubling CI minutes.
 *
 * `webServer.command` runs `npm run dev` and reuses an existing server
 * outside CI for fast local iteration. CI gets `retries: 2` to absorb
 * the occasional first-time-magic-link flake; local gets 0 retries to
 * surface flakes immediately.
 */
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: ["**/*.spec.ts"],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? "line" : "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run dev",
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-webkit",
      use: { ...devices["iPhone 12"] },
    },
  ],
});
