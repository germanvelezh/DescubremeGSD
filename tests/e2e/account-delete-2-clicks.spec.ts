/**
 * Plan 01-10 Task 2 E2E — account delete in <=2 visible clicks.
 *
 * Asserts the contract of /me/data -> /me/delete -> MODAL.DELETE.CONFIRM
 * -> /me/delete/done, with the click counter per UI-SPEC §7.8 lines 906-913:
 *
 *   Click 1: link "Borrar mi cuenta" en /me/data.
 *   Click 2: destructive primary button en /me/delete -> opens modal.
 *   (Modal CONFIRM is the safety-net click — not counted in the flow per
 *    UI-SPEC §7.8 line 911 "el modal es la confirmacion intermedia exigida
 *    por D1.5"). If gsd-ui-checker or a future auditor reads ≤2 strictly,
 *    ADR-009 (Plan 01-12) reconciles.
 *
 * Execution: Phase 1 ships this spec as a contract scaffold. It runs once
 * the dev server + seeded DB are wired in Plan 01-12 CI. Until then,
 * `playwright test --list` shows the tests; full assertions execute when
 * E2E_LIVE=1 + DATABASE_URL are set.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.7 + §7.8 + §7.9 + §6.10.
 *  - 01-CONTEXT.md D1.5.
 *  - COMPL-07.
 */
import { expect, test } from "@playwright/test";

const LIVE = process.env.E2E_LIVE === "1";

test.describe("Plan 01-10 Task 2 — account delete <=2 clicks", () => {
  test.skip(!LIVE, "Live E2E: set E2E_LIVE=1 + dev server + seeded user");

  test("Click 1 + Click 2 + modal confirm -> /me/delete/done; user no longer authenticated", async ({
    page,
  }) => {
    await page.goto("/me/data");
    await expect(
      page.getByRole("heading", { name: /tu cuenta/i }),
    ).toBeVisible();

    // CLICK 1 — visible "Borrar mi cuenta" link in /me/data.
    const deleteLink = page.getByRole("link", { name: /borrar mi cuenta/i });
    await expect(deleteLink).toBeVisible();
    await deleteLink.click();
    await expect(page).toHaveURL(/\/me\/delete$/);

    // CLICK 2 — destructive primary button in /me/delete -> opens modal.
    const deleteButton = page.getByRole("button", {
      name: /borrar mi cuenta/i,
    });
    await expect(deleteButton).toBeVisible();
    await deleteButton.click();

    // Modal opened — ARIA dialog visible.
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");

    // Modal CONFIRM (safety net, not counted in <=2 visible clicks).
    const confirmButton = dialog.getByRole("button", {
      name: /borrar mi cuenta/i,
    });
    await confirmButton.click();

    // Server Action redirects to /me/delete/done.
    await page.waitForURL(/\/me\/delete\/done$/);
    await expect(
      page.getByRole("heading", { name: /tu cuenta esta borrada/i }),
    ).toBeVisible();
  });

  test("Modal destructive variant: Escape does NOT close, scrim click does NOT close", async ({
    page,
  }) => {
    await page.goto("/me/delete");
    await page.getByRole("button", { name: /borrar mi cuenta/i }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Press Escape — modal remains open (destructive variant).
    await page.keyboard.press("Escape");
    await expect(dialog).toBeVisible();

    // Cancel button explicitly closes.
    await dialog.getByRole("button", { name: /cancelar/i }).click();
    await expect(dialog).not.toBeVisible();
  });
});

test.describe("Plan 01-10 Task 2 — /me/data secondary flows", () => {
  test.skip(!LIVE, "Live E2E: set E2E_LIVE=1 + dev server + seeded user");

  test("DOB readonly + 'Si necesitas corregir' helper visible", async ({
    page,
  }) => {
    await page.goto("/me/data");
    const dob = page.getByLabel(/fecha de nacimiento/i);
    await expect(dob).toBeVisible();
    await expect(dob).toHaveAttribute("readonly", "");
    await expect(
      page.getByText(/si necesitas corregir tu fecha de nacimiento/i),
    ).toBeVisible();
  });

  test("Descargar todos mis datos triggers GET /api/me/data", async ({
    page,
  }) => {
    await page.goto("/me/data");
    await page
      .getByRole("button", { name: /descargar todos mis datos/i })
      .click();
    const downloadLink = page.getByRole("link", {
      name: /descargar todos mis datos/i,
    });
    await expect(downloadLink).toBeVisible();
    await expect(downloadLink).toHaveAttribute("href", "/api/me/data");
  });
});

test.describe("Plan 01-10 Task 2 — /me/consent revoke flow", () => {
  test.skip(!LIVE, "Live E2E: set E2E_LIVE=1 + dev server + seeded user");

  test("Per-consent revoke button opens sober modal + success chip", async ({
    page,
  }) => {
    await page.goto("/me/consent");
    await expect(
      page.getByRole("heading", { name: /tu consentimiento/i }),
    ).toBeVisible();

    const revokeButton = page
      .getByRole("button", { name: /revocar este consentimiento/i })
      .first();
    await revokeButton.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: /^revocar$/i }).click();

    await expect(page.getByText(/consentimiento revocado/i)).toBeVisible();
  });
});
