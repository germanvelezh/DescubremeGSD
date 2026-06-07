/**
 * E2E walking-skeleton happy path — DescubreMe Phase 1 Wave 3 (Plan 01-06).
 *
 * History:
 *   - Task 1 (RED): committed with `test.fail()` markers so CI failed
 *     loudly until Task 3 shipped the implementation.
 *   - Task 3 (GREEN): markers removed; tests are now plain Playwright
 *     specs. They still require a running dev server + a seeded
 *     Supabase DB to pass (UAT in Plan 01-12), so they may not be
 *     part of the unit-test CI gate yet.
 *
 * Coverage (mirrors Plan 01-06 Task 1 `<behavior>` block):
 *   - URL transitions `/` -> `/onboarding/before-you-start` -> `/test/onet-ip-sf`.
 *   - Landing headline + CTA "Empezar gratis".
 *   - BYS hook + CTA "Empezar".
 *   - Item screen: `<fieldset role="radiogroup">` with verbatim O*NET stem
 *     (R1 "Construir gabinetes de cocina") + 5 verbatim anchors es-CO
 *     (UI-SPEC §6.4 lines 276-280).
 *   - Progress increments: aria-valuenow=1 after first click, =3 after 3.
 *   - Cookie `anonymous_session_id` present (nanoid 30 chars).
 *   - Auto-save chip "Te guardamos cada respuesta" visible (`role="status"`).
 *   - Mobile viewport (360x640) — vertical anchor layout, not 5-col grid.
 *
 * Source-of-truth references:
 *   - O*NET stems es-CO: `implementation_packs/O-NET-IP-SF_LEXICAL_PILOT_FIELD_KIT_v1.0.md` §B-2.
 *   - Anchors es-CO: `01-UI-SPEC.md §6.4` lines 276-280. (Note: plan referenced
 *     `RESPONSE_ANCHORS_es-CO_v1.0.md` but that addendum covers FS/BFI/PERMA
 *     only — see SUMMARY deviation log and `[GAP-ONET-ANCHORS-SOURCE]`.)
 *   - Microcopy IDs: `01-UI-SPEC.md §7.1, §7.2, §7.3`.
 */
import { expect, test } from "@playwright/test";

/**
 * Anchors verbatim from UI-SPEC §6.4 (lines 276-280). These five strings
 * are the canonical es-CO O*NET anchors for Phase 1 until Cowork ships a
 * dedicated `RESPONSE_ANCHORS_es-CO_v1.0.md` O*NET section
 * (`[GAP-ONET-ANCHORS-SOURCE]`).
 */
const ANCHORS_ES_CO = [
  "Me gustaria mucho hacerlo", // value=5
  "Me gustaria hacerlo", // value=4
  "No estoy seguro", // value=3
  "No me gustaria hacerlo", // value=2
  "No me gustaria nada hacerlo", // value=1
] as const;

const FIRST_ITEM_STEM = "Construir gabinetes de cocina"; // R1 verbatim, Lexical Pilot §B-2
const LANDING_CTA = /Empezar gratis/i;
const BYS_CTA = /^Empezar$/i;
const AUTO_SAVE_CHIP = /Te guardamos cada respuesta/i;
const COOKIE_NAME = "anonymous_session_id";

test.describe("Walking Skeleton — anonymous full flow", () => {
  test.use({ viewport: { width: 360, height: 640 } });

  test(
    "anonymous user can land, go to BYS, start the test, and answer 3 items",
    async ({ page, context }) => {
      // Step 1 — Landing
      await page.goto("/");
      await expect(
        page.getByRole("heading", { level: 1 }),
      ).toBeVisible();
      const cta = page.getByRole("link", { name: LANDING_CTA });
      await expect(cta).toBeVisible();
      await cta.click();

      // Step 2 — BYS (before-you-start)
      await expect(page).toHaveURL(/\/onboarding\/before-you-start$/);
      const bys = page.getByRole("link", { name: BYS_CTA }).or(
        page.getByRole("button", { name: BYS_CTA }),
      );
      await expect(bys).toBeVisible();
      await bys.click();

      // Step 3 — Test screen (item 1 of 60)
      await expect(page).toHaveURL(/\/test\/onet-ip-sf$/);
      const radiogroup = page.locator('[role="radiogroup"]');
      await expect(radiogroup).toBeVisible();

      // Verbatim O*NET stem R1 (Lexical Pilot §B-2).
      await expect(page.getByText(FIRST_ITEM_STEM)).toBeVisible();

      // All 5 anchors visible verbatim (UI-SPEC §6.4 lines 276-280).
      for (const anchor of ANCHORS_ES_CO) {
        await expect(page.getByText(anchor, { exact: true })).toBeVisible();
      }

      // Progress indicator exists with aria-valuenow=1 (item 1 of 60).
      const progressbar = page.locator('[role="progressbar"]');
      await expect(progressbar).toBeVisible();
      await expect(progressbar).toHaveAttribute("aria-valuenow", "1");
      await expect(progressbar).toHaveAttribute("aria-valuemax", "60");

      // Cookie anonymous_session_id is set with nanoid 30 chars.
      const cookies = await context.cookies();
      const anonCookie = cookies.find((c) => c.name === COOKIE_NAME);
      expect(anonCookie, "anonymous_session_id cookie must exist").toBeDefined();
      expect(anonCookie?.value.length).toBeGreaterThanOrEqual(21);
      expect(anonCookie?.httpOnly).toBe(true);

      // Select first anchor (value=5, "Me gustaria mucho hacerlo").
      await page
        .getByRole("radio", { name: ANCHORS_ES_CO[0], exact: true })
        .check();

      // Auto-save chip visible.
      await expect(page.getByText(AUTO_SAVE_CHIP)).toBeVisible();

      // Mobile auto-advance: progress should now reflect item 2.
      await page.waitForLoadState("networkidle");
      await expect(progressbar).toHaveAttribute("aria-valuenow", "2");

      // Answer item 2 (any anchor).
      await page
        .getByRole("radio", { name: ANCHORS_ES_CO[2], exact: true })
        .check();
      await page.waitForLoadState("networkidle");
      await expect(progressbar).toHaveAttribute("aria-valuenow", "3");

      // Answer item 3.
      await page
        .getByRole("radio", { name: ANCHORS_ES_CO[1], exact: true })
        .check();
      await page.waitForLoadState("networkidle");

      // After 3 answers, aria-valuenow should be 4 (item 4 of 60).
      await expect(progressbar).toHaveAttribute("aria-valuenow", "4");
    },
  );

  test(
    "mobile viewport renders anchors vertically (one per row, not 5-col grid)",
    async ({ page }) => {
      await page.goto("/test/onet-ip-sf");
      const radios = page.locator('[role="radio"]');
      await expect(radios.first()).toBeVisible();
      // Each anchor row should be full-width (no 5-col grid on mobile).
      // Heuristic: first two radios have different y-coordinates (stacked).
      const firstBox = await radios.nth(0).boundingBox();
      const secondBox = await radios.nth(1).boundingBox();
      expect(firstBox).not.toBeNull();
      expect(secondBox).not.toBeNull();
      if (firstBox && secondBox) {
        expect(secondBox.y).toBeGreaterThan(firstBox.y);
      }
    },
  );
});
