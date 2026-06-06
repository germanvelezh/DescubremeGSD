/**
 * Playwright db-reset fixture — DescubreMe Phase 1 Wave 0 (Plan 01-03).
 *
 * `resetDb(page)` hits an admin endpoint that truncates the test-scoped
 * tables between specs. The endpoint:
 *   - Is guarded by `NODE_ENV === 'test'` AND a shared `X-Test-Token`
 *     header (value: `process.env.TEST_RESET_TOKEN`).
 *   - Only runs against the local Supabase test DB (URL must include
 *     `localhost` or `127.0.0.1`).
 *   - Returns 404 in any other environment. NEVER add a prod path.
 *
 * The endpoint itself lands in Plan 01-10 (`app/api/test/reset/route.ts`,
 * guarded by middleware.ts). Until then this fixture is a no-op when
 * the endpoint is absent — specs that need a fresh DB and find the
 * endpoint missing should `test.skip()` themselves.
 */
import type { Page } from "@playwright/test";

const RESET_ENDPOINT = "/api/test/reset";

export async function resetDb(page: Page): Promise<void> {
  if (process.env.NODE_ENV === "production") {
    throw new Error("resetDb() refused: NODE_ENV=production");
  }

  const token = process.env.TEST_RESET_TOKEN ?? "";
  if (!token) {
    // No token configured -> assume endpoint not yet wired; tests that
    // require a clean DB should detect this and skip themselves.
    return;
  }

  const response = await page.request.post(RESET_ENDPOINT, {
    headers: { "X-Test-Token": token },
  });

  if (response.status() === 404) {
    // Endpoint not yet implemented (pre-Plan-01-10). Silent no-op.
    return;
  }

  if (!response.ok()) {
    throw new Error(
      `resetDb() failed: HTTP ${response.status()} ${await response.text()}`,
    );
  }
}
