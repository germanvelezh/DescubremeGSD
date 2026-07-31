/**
 * E2E — el paywall honesto y las tres salidas del checkout (Plan 03-05, Fase 3).
 *
 * QUE CUBRE ESTE ARCHIVO Y NINGUN OTRO PUEDE CUBRIR. La aritmetica del stack ya
 * tiene tests puros y uno de integracion contra la base; lo que no prueban es
 * que el numero que la funcion devuelve sea el numero que el usuario LEE. Un
 * error de cableado entre `composePaidStack` y la pantalla deja los dos verdes y
 * le muestra al usuario un total que no cuadra con las filas de arriba. Aca se
 * suman las filas RENDERIZADAS y se comparan contra el total RENDERIZADO.
 *
 * MOVIL PRIMERO, A 360px. Los tres proyectos de Playwright son de dispositivo,
 * y ninguno mide exactamente 360; el criterio de aceptacion si. El viewport se
 * fija a mano en los casos que lo exigen, para que la medida sea la del criterio
 * y no la del dispositivo que toco.
 *
 * ANCLAS POSITIVAS por texto o por rol accesible. Nunca selectores construidos
 * sobre atributos de rol (`[role=...]`): la cicatriz de los specs stale de la
 * Fase 2 es exactamente esa.
 *
 * `Dependencia de entorno declarada:` los casos que renderizan el paywall
 * necesitan `STRIPE_PRICE_ID_USD` y `STRIPE_PRICE_ID_COP` — `getStripePriceIds()`
 * LANZA sin ellas, a proposito (03-01). Sin esas variables estos casos fallan
 * por CONFIGURACION, no por regresion. Es el mismo Pitfall que 03-01, 03-02 y
 * 03-04 ya registraron. `/paid/cancelado` y el estado "ya lo tienes" NO las
 * necesitan: son ramas anteriores a la resolucion del precio.
 *
 * Anchors:
 *   - 03-05-PLAN.md Task 3 paso 5, acceptance_criteria.
 *   - 03-UI-SPEC.md §1 (orden de lectura + prohibiciones), §2, §9.
 *   - tests/e2e/paid-guard.spec.ts (el guard, que este spec NO re-prueba).
 */
import { expect, test } from "@playwright/test";

import {
  grantPaidEntitlement,
  hasLocalAuth,
  loginAsNewUser,
  writeConsent,
} from "./fixtures/real-auth";

const RUNTIME_SKIP =
  "[GAP-AUTH-4TEST-RUNTIME] local env absent (E2E_LOCAL + local host); fixture ready.";

/** El primer instrumento EXCLUSIVO del Paid (plan 03-04). */
const PAID_ONLY_PATH = "/test/bfi-2-60";

/** El ancho del criterio de aceptacion, no el del dispositivo que toco. */
const NARROW = { width: 360, height: 640 };

test.describe("Plan 03-05 — el paywall honesto", () => {
  test("el total que el usuario LEE es la suma de las filas que VE", async ({
    browser,
  }) => {
    test.skip(!hasLocalAuth(), RUNTIME_SKIP);

    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await loginAsNewUser(ctx);

    await page.goto("/paid");

    const rows = page.getByTestId("paid-stack-row");
    await expect(rows.first()).toBeVisible();

    // Se suman las filas RENDERIZADAS. Si la pantalla omitiera una, la suma
    // dejaria de cuadrar con el total — que es exactamente el fallo que D-13
    // prohibe y el unico que ni la funcion pura ni el test de base detectan.
    const counts = await rows.evaluateAll((els) =>
      els.map((el) => Number((el as HTMLElement).dataset.items ?? "0")),
    );
    expect(counts.length).toBeGreaterThan(0);
    const sum = counts.reduce((acc, n) => acc + n, 0);

    const total = page.getByTestId("paid-total");
    await expect(total).toBeVisible();
    expect(Number((await total.getAttribute("data-items")) ?? "-1")).toBe(sum);

    await ctx.close();
  });

  test("a 360px el CTA es alcanzable SIN scroll desde la carga", async ({
    browser,
  }) => {
    test.skip(!hasLocalAuth(), RUNTIME_SKIP);

    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.setViewportSize(NARROW);
    await loginAsNewUser(ctx);

    await page.goto("/paid");

    const cta = page.getByTestId("paid-checkout-cta");
    await expect(cta).toBeVisible();

    // "Visible" no basta: Playwright lo considera visible aunque este fuera del
    // viewport. La pregunta del criterio es si esta DENTRO de la pantalla sin
    // que el usuario haya hecho scroll, asi que se mide la caja contra el alto.
    const box = await cta.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.y + box.height).toBeLessThanOrEqual(NARROW.height + 1);
      // Y el area tactil minima de WCAG 2.5.5.
      expect(box.height).toBeGreaterThanOrEqual(44);
    }

    // El CTA nombra el cobro: "fijo" no puede convertirse en "monto escondido".
    const chargedLabel = await page
      .getByTestId("paid-charged-price")
      .innerText();
    const amount = chargedLabel.split(" ")[0] ?? "";
    expect(amount.length).toBeGreaterThan(0);
    await expect(cta).toContainText(amount);

    await ctx.close();
  });

  test("un usuario en frio NO ve ningun aviso de reuso", async ({ browser }) => {
    test.skip(!hasLocalAuth(), RUNTIME_SKIP);

    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await loginAsNewUser(ctx);

    await page.goto("/paid");
    await expect(page.getByTestId("paid-stack-row").first()).toBeVisible();

    // El bloque NO EXISTE en el marcado. No esta vacio, no esta oculto: no esta.
    await expect(page.getByTestId("paid-reuse-notice")).toHaveCount(0);

    await ctx.close();
  });

  test("el paywall no muestra ninguna palanca de urgencia ni ancla de descuento", async ({
    browser,
  }) => {
    test.skip(!hasLocalAuth(), RUNTIME_SKIP);

    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await loginAsNewUser(ctx);

    await page.goto("/paid");
    await expect(page.getByTestId("paid-total")).toBeVisible();

    // El guardarrail anti-dark-patterns como asercion, no como intencion. El
    // lint ya vigila el microcopy; esto vigila la PANTALLA COMPUESTA, donde
    // podria colarse texto que no venga del catalogo.
    const body = (await page.getByRole("main").innerText()).toLowerCase();
    for (const lever of [
      "solo quedan",
      "últimas horas",
      "ultimas horas",
      "por tiempo limitado",
      "personas viendo",
      "antes:",
      "descuento",
    ]) {
      expect(body, `palanca prohibida en el paywall: "${lever}"`).not.toContain(
        lever,
      );
    }
    // Y ningun precio tachado.
    await expect(page.locator("s, del, .line-through")).toHaveCount(0);

    await ctx.close();
  });
});

test.describe("Plan 03-05 — compuerta, ya-adquirido y salidas del checkout", () => {
  test("llegar por la compuerta muestra la linea neutra, no un error", async ({
    browser,
  }) => {
    test.skip(!hasLocalAuth(), RUNTIME_SKIP);

    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const { userId } = await loginAsNewUser(ctx);
    await writeConsent(userId, { sensitive: true });

    // Se llega por el camino REAL (el guard del runner), no escribiendo la URL:
    // si el marcador dejara de emitirse, este caso lo detecta.
    await page.goto(PAID_ONLY_PATH);
    await expect(page).toHaveURL(/\/paid/);

    const notice = page.getByTestId("paid-gate-notice");
    await expect(notice).toBeVisible();

    // Ningun `alert` DENTRO del contenido: la llegada por compuerta no es un
    // error. Se acota a `main` a proposito — Next.js monta su propio
    // `role="alert"` fuera del contenido (el anunciador de ruta), asi que una
    // asercion sobre la pagina entera medira el framework, no la pantalla.
    await expect(page.getByRole("main").getByRole("alert")).toHaveCount(0);

    // Y no usa el estilo que la aplicacion reserva para errores. Es la otra
    // mitad de "nada de color destructive": el rol dice que no es un error, la
    // clase dice que tampoco lo parece.
    await expect(notice).not.toHaveClass(/destructive/);
    // Y el paywall completo sigue ahi debajo: la linea explica y pasa a lo util.
    await expect(page.getByTestId("paid-stack-row").first()).toBeVisible();

    await ctx.close();
  });

  test("quien YA tiene acceso no ve un segundo cobro", async ({ browser }) => {
    test.skip(!hasLocalAuth(), RUNTIME_SKIP);

    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const { userId } = await loginAsNewUser(ctx);
    await grantPaidEntitlement(userId);

    await page.goto("/paid");

    await expect(page.getByTestId("paid-already-owned")).toBeVisible();
    // Lo que NO puede estar: el CTA de pago y el precio.
    await expect(page.getByTestId("paid-checkout-cta")).toHaveCount(0);
    await expect(page.getByTestId("paid-charged-price")).toHaveCount(0);

    await ctx.close();
  });

  test("/paid/cancelado dice que no se cobro nada y ofrece la vuelta", async ({
    page,
  }) => {
    // Pantalla estatica: no necesita sesion, ni base, ni variables de Stripe.
    await page.goto("/paid/cancelado");

    const panel = page.getByTestId("paid-cancelled");
    await expect(panel).toBeVisible();
    await expect(panel).toContainText(/no te cobramos nada/i);
    await expect(panel).toContainText(/no perdiste nada/i);

    // El camino de vuelta existe y lleva al paywall.
    const back = panel.getByRole("link");
    await expect(back).toBeVisible();
    await expect(back).toHaveAttribute("href", "/paid");

    // Sin culpa, sin perdida, sin reintento urgente.
    const text = (await panel.innerText()).toLowerCase();
    for (const forbidden of ["apúrate", "apurate", "última oportunidad", "solo hoy"]) {
      expect(text).not.toContain(forbidden);
    }
  });

  test("/api/checkout rechaza un cuerpo que intente imponer monto o moneda", async ({
    request,
  }) => {
    // La validacion de forma va ANTES de la identidad, asi que este caso no
    // necesita sesion — y eso es deliberado: un cuerpo hostil se rechaza sin
    // gastar una consulta de autenticacion (T-03-05-01).
    for (const body of [
      { amount: 1 },
      { currency: "usd" },
      { addOns: [], userId: "otro" },
    ]) {
      const res = await request.post("/api/checkout", { data: body });
      expect(res.status(), `cuerpo aceptado indebidamente: ${JSON.stringify(body)}`).toBe(
        400,
      );
    }
  });

  test("/api/checkout rechaza un add-on que no existe en el dato", async ({
    browser,
  }) => {
    test.skip(!hasLocalAuth(), RUNTIME_SKIP);

    const ctx = await browser.newContext();
    await loginAsNewUser(ctx);

    // Con sesion valida: lo que se prueba es la validacion CONTRA EL DATO, no
    // la autenticacion. Un uuid bien formado que no corresponde a ningun add-on
    // sembrado es una peticion por algo que no existe.
    const res = await ctx.request.post("/api/checkout", {
      data: { addOns: ["00000000-0000-0000-0000-000000000000"] },
    });
    expect(res.status()).toBe(400);

    await ctx.close();
  });
});
