/**
 * E2E threat T-01-09-01 — anonymous / cross-user cannot read /reporte.
 *
 * Verifies:
 *   1. Anonymous user (no auth cookie) requesting /reporte/<any-uuid>
 *      gets redirected to /signup (auth gate).
 *   2. Authenticated user A requesting /reporte/<sessionId-of-user-B>
 *      gets a 404 (notFound) — defense in depth alongside RLS.
 *
 * Execution: requires DB seed with two users + a session for user B.
 * Plan 01-12 sets up the seed bootstrap; until then this spec is a
 * contract scaffold (test.skip when env vars missing).
 *
 * Anchors:
 *  - PLAN 01-09 threat T-01-09-01 mitigation.
 *  - COMPL-17 partial isolation.
 */
import { expect, test } from "@playwright/test";

const HAS_DB = !!process.env.DATABASE_URL;

test.describe("Plan 01-09 — cross-user reporte isolation (T-01-09-01)", () => {
  test("anonymous user is redirected to /signup", async ({ page }) => {
    // No auth cookie. Hit a random sessionId. Should redirect to /signup.
    const randomSessionId = "00000000-0000-0000-0000-000000000000";
    const response = await page.goto(`/reporte/${randomSessionId}`);
    // The Server Component issues a redirect; Playwright follows it.
    await expect(page).toHaveURL(/\/signup/);
    // Status of the final navigation should be 200 (post-redirect).
    expect(response?.status()).toBeLessThan(400);
  });

  test.skip(!HAS_DB, "Requires DATABASE_URL for cross-user 404 check");

  test("authenticated user A gets 404 for user B's session", async () => {
    // Wired in Plan 01-12 — needs a 2-user seed + auth cookie injection
    // through Playwright's `context.storageState`. Contract: GET
    // /reporte/<userB-session> while authed as userA → 404.
    test.skip(true, "Wired in Plan 01-12 with 2-user fixture seed");
  });
});
