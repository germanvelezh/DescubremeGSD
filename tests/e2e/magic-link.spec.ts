/**
 * Plan 01-07 Task 3 E2E — magic link sent + resend cooldown + error states.
 *
 * Asserts the contract of `/magic-link/sent`:
 *  1. Default state shows the email + "Revisa tu inbox" heading.
 *  2. Resend button starts enabled, then disables for 60s after click.
 *  3. `?error=expired` shows the expired heading + body.
 *  4. `?error=invalid` shows the invalid heading + body.
 *
 * Execution: runs in Plan 01-12 CI when dev server is wired. Phase 1
 * ships as contract scaffold.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.5.
 *  - 01-CONTEXT.md D2.6.
 */
import { expect, test } from "@playwright/test";

test.describe("Plan 01-07 — magic-link sent + resend + error states", () => {
  test("default state shows inbox heading + resend button enabled", async ({
    page,
  }) => {
    await page.goto("/magic-link/sent?email=dev@example.com");

    await expect(
      page.getByRole("heading", { name: /revisa tu inbox/i }),
    ).toBeVisible();
    await expect(page.getByText(/dev@example\.com/)).toBeVisible();

    const resend = page.getByRole("button", { name: /reenviar link/i });
    await expect(resend).toBeEnabled();
  });

  test("resend button enters cooldown after click", async ({ page }) => {
    await page.goto("/magic-link/sent?email=dev@example.com");
    const resend = page.getByRole("button", { name: /reenviar link/i });
    await resend.click();
    await expect(resend).toBeDisabled();
    await expect(page.getByText(/podes reenviar en \d+s/i)).toBeVisible();
  });

  test("expired state shows expired heading", async ({ page }) => {
    await page.goto("/magic-link/sent?error=expired");
    await expect(
      page.getByRole("heading", { name: /tu link expiro/i }),
    ).toBeVisible();
  });

  test("invalid state shows invalid heading", async ({ page }) => {
    await page.goto("/magic-link/sent?error=invalid");
    await expect(
      page.getByRole("heading", { name: /el link no es valido/i }),
    ).toBeVisible();
  });
});
