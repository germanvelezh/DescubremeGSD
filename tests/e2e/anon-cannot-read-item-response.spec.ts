/**
 * E2E threat T-01-09-01 — anonymous / cross-user cannot read /reporte.
 *
 * Verifies:
 *   1. Anonymous user (no auth cookie) requesting /reporte/<any-uuid>
 *      gets redirected to /signup (auth gate).
 *   2. Authenticated user A requesting /reporte/<sessionId-of-user-B>
 *      does NOT get user B's report — defense in depth alongside RLS.
 *
 * Execution ([GAP-E2E-SKIPS-E2E-LIVE], 2026-07-28): test 2 was a scaffold whose
 * entire body was `test.skip(true, "Wired in Plan 01-12 with 2-user fixture
 * seed")` — the one skip of the eight with nothing at all to run. The 2-user
 * seed it waited on never arrived as a seed; what arrived instead was
 * fixtures/real-auth.ts, which mints real users on demand. User B is therefore
 * BUILT (minted + given a scored session), not seeded.
 *
 * Anchors:
 *  - PLAN 01-09 threat T-01-09-01 mitigation.
 *  - COMPL-17 partial isolation.
 */
import { expect, test } from "@playwright/test";

import {
  adminClient,
  completeInstrument,
  sessionFor,
} from "./fixtures/instrument-run";
import { hasLocalAuth, loginAsNewUser, writeConsent } from "./fixtures/real-auth";

const RUNTIME_SKIP =
  "[GAP-AUTH-4TEST-RUNTIME] local env absent (E2E_LOCAL + local host); fixture ready.";

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

  test("authenticated user A cannot read user B's session", async ({
    browser,
  }) => {
    test.skip(!hasLocalAuth(), RUNTIME_SKIP);

    // --- User B: owns a real, scored report, in its own browser context.
    const admin = adminClient();
    const ctxB = await browser.newContext();
    const pageB = await ctxB.newPage();
    const { userId: userB } = await loginAsNewUser(ctxB);
    await writeConsent(userB);
    await completeInstrument(pageB, admin, userB, "ONET-IP-SF", (seq) => 1 + (seq % 5));
    const sessionB = await sessionFor(admin, userB, "ONET-IP-SF");
    if (!sessionB) throw new Error("no O*NET session created for user B");

    // Control: B really CAN read it. Without this, the isolation assertion
    // below would pass just as well against a report that never renders for
    // anyone — the failure mode that makes a security test green for the
    // wrong reason.
    await pageB.goto(`/reporte/${sessionB.id}`);
    await expect(pageB.getByRole("main")).toBeVisible();
    await expect(pageB.locator('svg[role="img"]')).toBeVisible();
    await ctxB.close();

    // --- User A: a DIFFERENT authenticated user asks for B's report.
    const ctxA = await browser.newContext();
    const pageA = await ctxA.newPage();
    await loginAsNewUser(ctxA);
    await pageA.goto(`/reporte/${sessionB.id}`);

    // Assert the OUTCOME (B's content is not served), not the mechanism:
    // notFound() and a redirect to /signup are both legitimate defenses, and
    // pinning one would make this spec fail on a valid hardening change.
    await expect(pageA.locator('svg[role="img"]')).toHaveCount(0);
    await ctxA.close();
  });
});
