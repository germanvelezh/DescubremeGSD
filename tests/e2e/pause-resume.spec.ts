/**
 * E2E pause/resume — DescubreMe Phase 1 Wave 3 (Plan 01-06 Task 1).
 *
 * TDD RED: committed FIRST, fails until Plan 01-06 Task 3 lands the
 * BYS resume detection + `MC.RESUME.SCREEN` on `/test/onet-ip-sf`.
 *
 * Behavior under test (Plan 01-06 Task 1 `<behavior>` Test 2):
 *   - User answers 3 items, browser closes (`context.close()`).
 *   - New context opens with the same persistent cookie (`storageState`).
 *   - Visit `/onboarding/before-you-start` -> middleware/page detects
 *     open anonymous session with progress=3 -> redirects to
 *     `/test/onet-ip-sf`.
 *   - Test shell renders the resume screen with greeting "Hola de nuevo."
 *     + "Continuar" CTA (UI-SPEC §7.3 `MC.RESUME.SCREEN`).
 *   - Click "Continuar" -> next item is item 4 (sequence_number=4),
 *     NOT item 1.
 *
 * Source-of-truth:
 *   - UI-SPEC §7.3 `MC.RESUME.SCREEN`, `MC.RESUME.GREETING`, `MC.RESUME.CTA`.
 *   - CONTEXT D2.8 (pause/resume microcopy).
 *
 * Note on storageState: Playwright `context.storageState()` snapshots
 * cookies+localStorage. We snapshot after answering 3 items, close the
 * context, then re-open with the snapshot. The httpOnly cookie travels.
 */
import { expect, test } from "@playwright/test";

const ANCHORS_ES_CO = [
  "Me gustaria mucho hacerlo",
  "Me gustaria hacerlo",
  "No estoy seguro",
  "No me gustaria hacerlo",
  "No me gustaria nada hacerlo",
] as const;

const RESUME_GREETING = /Hola de nuevo/i;
const RESUME_CTA = /^Continuar$/i;
const COOKIE_NAME = "anonymous_session_id";

test.describe("Walking Skeleton — pause and resume across browser sessions", () => {
  test.use({ viewport: { width: 360, height: 640 } });

  test.fail(
    "user answers 3 items, closes browser, reopens within 7d, lands on resume screen at item 4",
    async ({ browser }) => {
      // -- Session 1: answer 3 items --
      const context1 = await browser.newContext();
      const page1 = await context1.newPage();
      await page1.goto("/");
      await page1.getByRole("link", { name: /Empezar gratis/i }).click();
      await page1.getByRole("link", { name: /^Empezar$/i }).or(
        page1.getByRole("button", { name: /^Empezar$/i }),
      ).click();
      await expect(page1).toHaveURL(/\/test\/onet-ip-sf$/);

      for (let i = 0; i < 3; i++) {
        const radio = page1
          .getByRole("radio", { name: ANCHORS_ES_CO[0], exact: true })
          .first();
        await radio.check();
        await page1.waitForLoadState("networkidle");
      }

      const progressbar1 = page1.locator('[role="progressbar"]');
      await expect(progressbar1).toHaveAttribute("aria-valuenow", "4");

      // Snapshot cookies (httpOnly anonymous_session_id travels).
      const storage = await context1.storageState();
      const anonCookie = storage.cookies.find((c) => c.name === COOKIE_NAME);
      expect(anonCookie, "cookie must persist across browser close").toBeDefined();

      await context1.close();

      // -- Session 2: reopen with the same cookie --
      const context2 = await browser.newContext({ storageState: storage });
      const page2 = await context2.newPage();
      await page2.goto("/onboarding/before-you-start");

      // BYS detects open anonymous session with progress>0 -> redirect.
      await expect(page2).toHaveURL(/\/test\/onet-ip-sf/);

      // Resume screen visible (UI-SPEC §7.3 MC.RESUME.SCREEN).
      await expect(page2.getByText(RESUME_GREETING)).toBeVisible();

      // Click "Continuar" to enter the test at item 4.
      const continueCta = page2
        .getByRole("link", { name: RESUME_CTA })
        .or(page2.getByRole("button", { name: RESUME_CTA }));
      await expect(continueCta).toBeVisible();
      await continueCta.click();

      // Now at item 4 (sequence_number=4), NOT item 1.
      const progressbar2 = page2.locator('[role="progressbar"]');
      await expect(progressbar2).toBeVisible();
      await expect(progressbar2).toHaveAttribute("aria-valuenow", "4");

      await context2.close();
    },
  );
});
