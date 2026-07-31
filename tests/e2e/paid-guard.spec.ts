/**
 * E2E — el guard `solo-Paid` NO rompe el embudo del Free (Plan 03-01, Fase 3).
 *
 * **LA MITAD VERIFICABLE EN LA WAVE 1 ES LA NEGATIVA, Y ES LA QUE PROTEGE
 * PRODUCCION.** Por D-11, O*NET IP-SF y PERMA-Profiler son el MISMO
 * `instrument_version` en el Free y en el Paid, asi que tras el seed de este
 * plan cada uno tiene DOS filas de `product_stack`. Un guard que preguntara
 * "¿pertenece al stack Paid?" devolveria verdadero para O*NET y mandaria al
 * paywall a todo usuario del Free — y `main` despliega solo a produccion, asi
 * que eso apaga el embudo de adquisicion vivo.
 *
 * **LA MITAD POSITIVA YA ES VERIFICABLE (Plan 03-04).** Cuando este archivo se
 * escribio no habia en el catalogo ningun instrumento exclusivo del Paid, asi
 * que no habia nada que navegar para probar que el guard SI redirige. El
 * BFI-2-60 es el primero: vive en `product_stack` con `product_code='paid'` y
 * NO en el del Free, asi que `requiresPaidAccess` devuelve verdadero para el y
 * solo para el. **El guard NO se modifico en 03-04**: si estos casos fallan, el
 * defecto esta en `lib/entitlement/resolve.ts` (plan 03-01), no en el seed.
 *
 * OJO al medir: correr SOLO este spec no alcanza. Un guard mal predicado
 * enrojece los specs del Free, no el suyo propio. La suite completa es el
 * criterio (`npx playwright test`, sin filtro).
 *
 * Anchors:
 *   - 03-01-PLAN.md acceptance_criteria (usuario del Free sin entitlement ENTRA).
 *   - 03-04-PLAN.md Task 1 (criterio 5 del ROADMAP, mitad positiva).
 *   - db/seeds/product-stack/paid/seed.sql (las 2 compartidas + BFI-2-60 exclusivo).
 *   - lib/entitlement/resolve.ts (`requiresPaidAccess`).
 */
import { expect, test } from "@playwright/test";

import {
  grantPaidEntitlement,
  hasLocalAuth,
  loginAsNewUser,
  writeConsent,
} from "./fixtures/real-auth";

/** El primer instrumento EXCLUSIVO del Paid (plan 03-04). */
const PAID_ONLY_PATH = "/test/bfi-2-60";
const RUNTIME_SKIP =
  "[GAP-AUTH-4TEST-RUNTIME] local env absent (E2E_LOCAL + local host); fixture ready.";

test.describe("Plan 03-01 — guard solo-Paid sin regresion del Free", () => {
  test("un visitante sin entitlement ENTRA al runner de un instrumento compartido", async ({
    page,
  }) => {
    // O*NET IP-SF esta en los DOS stacks. El predicado correcto (exclusividad)
    // dice "no exige pago"; el ingenuo ("¿esta en el stack Paid?") mandaria a
    // /paid. Esta navegacion es la que los distingue.
    await page.goto("/test/onet-ip-sf");

    // Lo que importa: NO termino en el paywall.
    await expect(page).not.toHaveURL(/\/paid/);
    // Y sigue en la ruta del runner (el flujo del Free intacto).
    await expect(page).toHaveURL(/\/test\/onet-ip-sf/);
  });

  test("el paywall no se cuela en la ruta de adquisicion anonima", async ({
    page,
  }) => {
    // Control de alcance: el guard solo puede actuar sobre /test/*. Si algo del
    // flujo del Paid se filtrara al tramo publico, se veria aca.
    await page.goto("/intencion");

    await expect(page).not.toHaveURL(/\/paid/);
  });

  test("/paid exige sesion: un anonimo va a /signup, no a un error", async ({
    page,
  }) => {
    await page.goto("/paid");

    // El paywall autentica antes de mostrar precio. Nunca revienta ni muestra
    // un 500 a un visitante sin sesion.
    await expect(page).toHaveURL(/\/signup/);
  });

  test("/paid/gracias NUNCA rebota a /paid (T-03-01-04)", async ({ page }) => {
    // Sin sesion va a /signup. Lo que esta prohibido es mandar a /paid a quien
    // acaba de volver de Checkout: seria decirle "no pagaste" justo despues de
    // pagar. La rama que de verdad importa —con sesion y SIN entitlement,
    // estado "confirmando"— la cubre `paid-pricing-and-confirming.spec.ts`,
    // que necesita el fixture de auth.
    await page.goto("/paid/gracias");

    await expect(page).not.toHaveURL(/\/paid$/);
  });
});

test.describe("Plan 03-04 — mitad POSITIVA: el primer instrumento exclusivo del Paid", () => {
  test("un visitante ANONIMO no entra al runner del BFI-2-60", async ({
    page,
  }) => {
    // Sin sesion no puede haber entitlement, asi que el guard manda a `/paid`,
    // que a su vez autentica y termina en `/signup`. Lo que se afirma es lo
    // unico que el criterio exige y lo unico que no depende de esa cadena: NO
    // se llega al runner. Es la primera vez que esto es afirmable — hasta este
    // plan no existia ningun instrumento que el guard debiera bloquear.
    await page.goto(PAID_ONLY_PATH);

    await expect(page).not.toHaveURL(new RegExp(PAID_ONLY_PATH));
  });

  test("un usuario autenticado SIN entitlement aterriza en /paid", async ({
    browser,
  }) => {
    test.skip(!hasLocalAuth(), RUNTIME_SKIP);

    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const { userId } = await loginAsNewUser(ctx);
    // Consentimiento sensible: el BFI-2-60 es `sensitivity: high`. Sin el, un
    // bloqueo por consentimiento se confundiria con el bloqueo por paywall.
    await writeConsent(userId, { sensitive: true });

    await page.goto(PAID_ONLY_PATH);

    await expect(page).toHaveURL(/\/paid/);

    await ctx.close();
  });

  test("el MISMO usuario, ya con entitlement activo, ENTRA al runner", async ({
    browser,
  }) => {
    test.skip(!hasLocalAuth(), RUNTIME_SKIP);

    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const { userId } = await loginAsNewUser(ctx);
    await writeConsent(userId, { sensitive: true });
    await grantPaidEntitlement(userId);

    await page.goto(PAID_ONLY_PATH);

    // Las DOS direcciones del predicado con el mismo instrumento: sin
    // entitlement al paywall, con entitlement al runner. Una sola direccion
    // pasaria igual con un guard que ignorara el entitlement.
    await expect(page).toHaveURL(new RegExp(PAID_ONLY_PATH));
    await expect(page).not.toHaveURL(/\/paid/);

    await ctx.close();
  });
});
