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
 * La mitad POSITIVA (un instrumento exclusivo del Paid redirige a `/paid`) se
 * verifica en el plan 03-04, cuando exista el primer instrumento exclusivo: hoy
 * el catalogo no tiene ninguno, asi que aca no habria nada que navegar.
 *
 * OJO al medir: correr SOLO este spec no alcanza. Un guard mal predicado
 * enrojece los specs del Free, no el suyo propio. La suite completa es el
 * criterio (`npx playwright test`, sin filtro).
 *
 * Anchors:
 *   - 03-01-PLAN.md acceptance_criteria (usuario del Free sin entitlement ENTRA).
 *   - db/seeds/product-stack/paid/seed.sql (las dos filas compartidas).
 *   - lib/entitlement/resolve.ts (`requiresPaidAccess`).
 */
import { expect, test } from "@playwright/test";

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
    // pagar. La rama con sesion y sin entitlement (estado "confirmando") la
    // cubre el test de integracion.
    await page.goto("/paid/gracias");

    await expect(page).not.toHaveURL(/\/paid$/);
  });
});
