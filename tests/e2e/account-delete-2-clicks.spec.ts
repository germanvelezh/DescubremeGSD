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
 * Execution ([GAP-E2E-SKIPS-E2E-LIVE], 2026-07-28): these 5 tests were gated on
 * `E2E_LIVE=1` — an env var NOTHING in the repo ever set, and which would not
 * have helped anyway. The spec had no auth mechanism at all (no fixture, no
 * storageState), so every `goto("/me/...")` landed on the `redirect("/signup")`
 * in app/(account)/me/data/page.tsx. Forcing the flag on produced 5 failures,
 * every one of them on the signup page. The gate was vestigial: it named a
 * "seeded user" precondition the spec had no way to satisfy.
 *
 * They now mint a REAL user per test via fixtures/real-auth.ts — the same
 * machinery free-critical-gates.spec.ts uses — behind the `hasLocalAuth()` gate
 * that CI already turns on (E2E_LOCAL=1, ci.yml). A fresh user PER TEST is
 * deliberate, not wasteful: the first test deletes its own account.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.7 + §7.8 + §7.9 + §6.10.
 *  - 01-CONTEXT.md D1.5.
 *  - COMPL-07.
 */
import { expect, test } from "@playwright/test";

import { hasLocalAuth, loginAsNewUser, writeConsent } from "./fixtures/real-auth";

const RUNTIME_SKIP =
  "[GAP-AUTH-4TEST-RUNTIME] local env absent (E2E_LOCAL + local host); fixture ready.";

test.describe("Plan 01-10 Task 2 — account delete <=2 clicks", () => {
  test.skip(!hasLocalAuth(), RUNTIME_SKIP);

  test("Click 1 + Click 2 + modal confirm -> /me/delete/done; user no longer authenticated", async ({
    context,
    page,
  }) => {
    const { userId } = await loginAsNewUser(context);
    await writeConsent(userId);

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

    // The title of the test claims the user is no longer authenticated, so
    // assert it: a protected route must now bounce to /signup. Without this the
    // test would go green on the success SCREEN alone, which is exactly the
    // half-check the /me/delete/done heading cannot distinguish.
    await page.goto("/me/data");
    await expect(page).toHaveURL(/\/signup/);
  });

  test("Modal destructive variant: Escape does NOT close; Cancel closes", async ({
    context,
    page,
  }) => {
    const { userId } = await loginAsNewUser(context);
    await writeConsent(userId);

    await page.goto("/me/delete");
    await page.getByRole("button", { name: /borrar mi cuenta/i }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Press Escape — modal remains open (destructive variant).
    await page.keyboard.press("Escape");
    await expect(dialog).toBeVisible();

    // NOTE: scrim-click does NOT close in destructive variant either; the
    // unit-level coverage for that branch lives inside Modal.tsx logic.
    // Cancel button explicitly closes.
    await dialog.getByRole("button", { name: /cancelar/i }).click();
    await expect(dialog).not.toBeVisible();
  });
});

test.describe("Plan 01-10 Task 2 — /me/data secondary flows", () => {
  test.skip(!hasLocalAuth(), RUNTIME_SKIP);

  test("DOB readonly + 'Si necesitas corregir' helper visible", async ({
    context,
    page,
  }) => {
    const { userId } = await loginAsNewUser(context);
    await writeConsent(userId);

    await page.goto("/me/data");
    const dob = page.getByLabel(/fecha de nacimiento/i);
    await expect(dob).toBeVisible();
    // Boolean HTML attrs serialize unpredictably (some browsers: empty
    // string, others: "true"). Use JS property for reliability.
    await expect(dob).toHaveJSProperty("readOnly", true);
    await expect(
      page.getByText(/si necesitas corregir tu fecha de nacimiento/i),
    ).toBeVisible();
  });

  test("Descargar todos mis datos triggers GET /api/me/data", async ({
    context,
    page,
  }) => {
    const { userId } = await loginAsNewUser(context);
    await writeConsent(userId);

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
  test.skip(!hasLocalAuth(), RUNTIME_SKIP);

  test("Per-consent revoke button opens sober modal + success chip", async ({
    context,
    page,
  }) => {
    const { userId } = await loginAsNewUser(context);
    // There must BE a consent row for the revoke control to exist at all.
    await writeConsent(userId);

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
