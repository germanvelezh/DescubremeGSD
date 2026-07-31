/**
 * E2E — los dos Hard Gates de `/paid` que solo se ven COMPUESTOS
 * (Plan 03-01, Fase 3).
 *
 * Estos dos criterios no los cubre ningun test unitario, y esa es la razon de
 * ser del archivo:
 *
 * 1. **D-19 renderizado, no solo resuelto.** Ya hay un test de integracion de
 *    que el middleware reenvia el pais, y un unitario de que `resolvePrice`
 *    mapea `US -> usd`. **Ninguno de los dos prueba que `/paid` lea la cabecera
 *    y renderice la moneda correcta.** Un error de cableado entre las dos
 *    piezas pasa los dos tests y despliega el cobro en la moneda equivocada.
 *    El criterio del plan es explicitamente la composicion: "una peticion a
 *    /paid con x-vercel-ip-country: US renderiza USD como moneda cobrada".
 *
 * 2. **`/paid/gracias` con sesion y SIN entitlement.** La rama que importa de
 *    T-03-01-04. `paid-guard.spec.ts` solo cubre el caso anonimo (-> /signup),
 *    que no dice nada sobre el rebote al paywall: la ventana peligrosa es la
 *    del usuario AUTENTICADO que volvio de Checkout antes de que llegara el
 *    webhook. Mandarlo a `/paid` ahi seria decirle "no pagaste" justo despues
 *    de que pago.
 *
 * Corre a traves del middleware REAL sobre el build de produccion, que es la
 * unica forma de que la cabecera recorra el camino entero.
 *
 * Anchors:
 *   - 03-01-PLAN.md must_haves D-19 + "/paid/gracias nunca rebota".
 *   - tests/e2e/anon-cannot-read-item-response.spec.ts (forma del fixture auth).
 */
import { expect, test } from "@playwright/test";

import { hasLocalAuth, loginAsNewUser, writeConsent } from "./fixtures/real-auth";

const RUNTIME_SKIP =
  "[GAP-AUTH-4TEST-RUNTIME] local env absent (E2E_LOCAL + local host); fixture ready.";

test.describe("Plan 03-01 — D-19 compuesto + /paid/gracias sin entitlement", () => {
  test("con x-vercel-ip-country: US, /paid renderiza USD como moneda COBRADA", async ({
    browser,
  }) => {
    test.skip(!hasLocalAuth(), RUNTIME_SKIP);

    const ctx = await browser.newContext();
    // La cabecera de plataforma entra por la PETICION, igual que en Vercel. El
    // middleware la traduce y la reenvia; el Server Component la lee. Si
    // cualquiera de esos tres pasos se rompe, esta asercion enrojece.
    await ctx.setExtraHTTPHeaders({ "x-vercel-ip-country": "US" });
    const page = await ctx.newPage();
    const { userId } = await loginAsNewUser(ctx);
    await writeConsent(userId);

    await page.goto("/paid");

    const price = page.locator("[data-testid=paid-charged-price]");
    await expect(price).toBeVisible();
    await expect(price).toHaveAttribute("data-currency", "usd");

    await ctx.close();
  });

  test("sin la cabecera, /paid renderiza COP (el default es el mercado principal)", async ({
    browser,
  }) => {
    test.skip(!hasLocalAuth(), RUNTIME_SKIP);

    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const { userId } = await loginAsNewUser(ctx);
    await writeConsent(userId);

    await page.goto("/paid");

    const price = page.locator("[data-testid=paid-charged-price]");
    await expect(price).toBeVisible();
    // Control negativo del test de arriba: sin esto, aquel solo probaria que la
    // pagina muestra algo, no que DISCRIMINA por pais.
    await expect(price).toHaveAttribute("data-currency", "cop");

    await ctx.close();
  });

  test("un usuario autenticado SIN entitlement ve 'confirmando' y NO rebota a /paid", async ({
    browser,
  }) => {
    test.skip(!hasLocalAuth(), RUNTIME_SKIP);

    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const { userId } = await loginAsNewUser(ctx);
    await writeConsent(userId);
    // A proposito NO se concede entitlement: es exactamente la ventana entre
    // volver de Checkout y que llegue el webhook firmado.

    await page.goto("/paid/gracias");

    // La rama de confirmacion en curso, no el paywall.
    await expect(page.locator("[data-testid=paid-confirming]")).toBeVisible();
    await expect(page).toHaveURL(/\/paid\/gracias/);
    await expect(page).not.toHaveURL(/\/paid$/);

    await ctx.close();
  });
});
