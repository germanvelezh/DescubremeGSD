/**
 * E2E — signup + dual consent flow (Ola 1.4/1.5 reskin, HANDOFF_UI §3).
 *
 * Asserts the contract of `/signup` after the ADR-029 signup-first reskin:
 *  1. Renders both consent checkboxes (NOT a single master checkbox).
 *  2. Renders the subprocesadores Disclosure trigger.
 *  3. "Enviarme el enlace" submit is disabled until: email valid + DOB valid +
 *     BOTH checkboxes checked.
 *  4. With invalid (<18) DOB, the Server Action returns `MC.SIGNUP.AGE.BLOCK`.
 *
 * The pre-redesign hexagon/top3 preview ("Tu reporte esta listo") was removed —
 * signup-first has no prior session/report (ADR-029). Field labels + the DOB
 * mechanism are unchanged.
 *
 * Execution: contract scaffold — runs in CI once the dev server + seeded DB are
 * wired ([GAP-CI-E2E-DB-SUPABASE-ROLES]).
 *
 * Anchors:
 *  - HANDOFF_UI_v1.0.md §3 (Ola 1.4/1.5), MICROCOPY §2 (Registro).
 *  - 01-UI-SPEC.md §7.4, 01-CONTEXT.md D2.4.
 */
import { expect, test } from "@playwright/test";

test.describe("signup + dual consent (Ola 1 reskin)", () => {
  test("renders dual checkbox + disclosure + disabled CTA", async ({ page }) => {
    await page.goto("/signup");

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
    const submit = page.getByRole("button", { name: /enviarme el enlace/i });
    await expect(submit).toBeDisabled();
  });

  test("CTA enables only when email + DOB + both checkboxes are valid", async ({ page }) => {
    await page.goto("/signup");

    const submit = page.getByRole("button", { name: /enviarme el enlace/i });
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
    await page.goto("/signup");
    await page.getByLabel(/tu email/i).fill("teen@example.com");
    const today = new Date();
    const tooYoung = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate())
      .toISOString()
      .slice(0, 10);
    await page.getByLabel(/fecha de nacimiento/i).fill(tooYoung);
    await page.getByRole("checkbox").first().check();
    await page.getByRole("checkbox").nth(1).check();
    await page.getByRole("button", { name: /enviarme el enlace/i }).click();
    await expect(page.getByText(/solo para personas mayores de 18/i)).toBeVisible();
  });
});
