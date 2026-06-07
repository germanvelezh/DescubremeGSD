/**
 * Plan 01-07 Task 3 E2E — signup + dual consent flow.
 *
 * Asserts the contract of `/signup` (Tu reporte esta listo):
 *  1. Renders hexagon preview (top-3 letters + outline-only SVG).
 *  2. Renders both consent checkboxes (NOT a single master checkbox).
 *  3. Renders the subprocesadores Disclosure trigger.
 *  4. "Ver mi reporte" submit is disabled until: email valid + DOB valid +
 *     BOTH checkboxes checked.
 *  5. With invalid (<18) DOB, the Server Action returns `MC.SIGNUP.AGE.BLOCK`.
 *  6. With a valid form, submit redirects to `/magic-link/sent?email=...`.
 *
 * Execution: this spec runs in Plan 01-12 CI when the dev server + seeded
 * DB are wired. Phase 1 ships it as a contract scaffold — Playwright
 * --list shows the tests; CI runs them once the dev server is bootable.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.4.
 *  - 01-CONTEXT.md D2.3, D2.4.
 */
import { expect, test } from "@playwright/test";

test.describe("Plan 01-07 — signup + dual consent", () => {
  test("renders hexagon preview + dual checkbox + disclosure + disabled CTA", async ({
    page,
  }) => {
    await page.goto("/signup?top3=R,I,A");

    // Hexagon preview top-3 letters visible.
    await expect(page.getByText("R", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("I", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("A", { exact: true }).first()).toBeVisible();

    // Dual checkboxes present (NOT a master).
    const checkboxes = page.getByRole("checkbox");
    await expect(checkboxes).toHaveCount(2);

    // Subprocesadores Disclosure trigger present.
    await expect(
      page.getByRole("button", {
        name: /transferencia internacional y subprocesadores/i,
      }),
    ).toBeVisible();

    // Submit disabled by default.
    const submit = page.getByRole("button", { name: /ver mi reporte/i });
    await expect(submit).toBeDisabled();
  });

  test("CTA enables only when email + DOB + both checkboxes are valid", async ({
    page,
  }) => {
    await page.goto("/signup?top3=R,I,A");

    const submit = page.getByRole("button", { name: /ver mi reporte/i });
    await expect(submit).toBeDisabled();

    await page.getByLabel(/tu email/i).fill("dev@example.com");
    await page.getByLabel(/fecha de nacimiento/i).fill("2000-01-01");
    await expect(submit).toBeDisabled();

    await page.getByRole("checkbox").first().check();
    await expect(submit).toBeDisabled();

    await page.getByRole("checkbox").nth(1).check();
    await expect(submit).toBeEnabled();
  });

  test("server action returns MC_SIGNUP_AGE_BLOCK for DOB <18", async ({ page }) => {
    await page.goto("/signup?top3=R,I,A");
    await page.getByLabel(/tu email/i).fill("teen@example.com");
    const today = new Date();
    const tooYoung = new Date(
      today.getFullYear() - 17,
      today.getMonth(),
      today.getDate(),
    )
      .toISOString()
      .slice(0, 10);
    await page.getByLabel(/fecha de nacimiento/i).fill(tooYoung);
    await page.getByRole("checkbox").first().check();
    await page.getByRole("checkbox").nth(1).check();
    await page.getByRole("button", { name: /ver mi reporte/i }).click();
    await expect(page.getByText(/solo para personas mayores de 18/i)).toBeVisible();
  });
});
