/**
 * E2E — la sugerencia de pausa es una PROMOCION, no una pantalla
 * (Plan 03-02 Task 3; D-16 / D-17 / D-18, 03-UI-SPEC §6).
 *
 * QUE AFIRMA, Y POR QUE ESE ES EL RIESGO REAL.
 *
 * La logica de cuando sugerir ya esta probada como funcion pura
 * (`lib/free/runner-navigation.test.ts`). Lo que un unitario NO puede desmentir
 * es la propiedad que D-18 protege: que la sugerencia aparezca **sin interrumpir
 * el flujo**. Un modal, un interstitial o un overlay pasarian todos los
 * unitarios y romperian el contrato. Por eso este spec afirma sobre la pantalla:
 * el item siguiente sigue visible y respondible, no hay dialogo, y el foco no se
 * fue al bloque nuevo.
 *
 * EL BORDE ES EL ITEM 12, LA SUGERENCIA SALE SOBRE EL 13 — no es un off-by-one.
 * El runner es server-driven: responder el item 12 sirve el item 13. Y el copy
 * dice "Terminaste el bloque 1", que no podria renderizarse mientras el usuario
 * sigue EN el item 12. Para VIA el borde sera el item 48 y la sugerencia saldra
 * sobre el 49 (03-UI-SPEC §6 nombra el borde, no la pantalla).
 *
 * POR QUE LOS 11 PRIMEROS ITEMS VAN POR API Y NO POR LA UI.
 * Primera version de este spec: 12 taps por la UI, cada uno con su
 * `router.refresh()` y su render de servidor. Medido, ~10s por item contra el
 * build de produccion — 30s de timeout se agotaban en el item 3. Los 11 primeros
 * items no son lo que este spec prueba; el BORDE si. Asi que se llega al item 12
 * por `/api/respond` (mismo endpoint real, misma cookie anonima, misma validacion
 * — es el patron de `fixtures/instrument-run.ts`) y el cruce del borde se hace
 * por la UI, que es donde vive la afirmacion.
 *
 * CONTROL NEGATIVO: se afirma tambien que en MEDIO de un bloque la sugerencia NO
 * esta. Sin eso, un componente que se renderizara siempre pasaria en verde.
 *
 * Anchors:
 *   - app/(b2c)/test/[code]/_components/PauseSuggestion.tsx.
 *   - lib/free/runner-navigation.ts (resolveClosedBlock, resolvePauseSuggestion).
 *   - tests/e2e/free-pause-resume.spec.ts (plantilla del recorrido anonimo).
 *   - tests/e2e/fixtures/instrument-run.ts (adminClient, itemsFor).
 */
import { expect, test, type Page } from "@playwright/test";

import { passEntryGate } from "./fixtures/entry-gate";
import { adminClient, itemsFor } from "./fixtures/instrument-run";

/** Ancla verbatim del seed es-CO de O*NET (labeled-rows, 5 filas). */
const ANCHOR_ES_CO = "Me gustaria mucho hacerlo";
/** Copy de la sugerencia de borde de bloque (MC_TEST_PAUSE_SUGGESTION(1)). */
const PAUSE_BLOCK_1 = /Terminaste el bloque 1/i;
/** Formulaciones PROHIBIDAS por 03-UI-SPEC §6 (advertencia / ruego / perdida). */
const FORBIDDEN_TONE =
  /seguro que quieres irte|vas a perder|perder(a|as|ias)? tu progreso|no pierdas/i;

const HAS_STACK = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
);

/** Responde el item en pantalla POR LA UI y espera el round-trip real. */
async function answerCurrentItem(page: Page): Promise<void> {
  const respond = page.waitForResponse(
    (r) => r.url().includes("/api/respond") && r.request().method() === "POST",
  );
  await page
    .getByRole("radio", { name: ANCHOR_ES_CO, exact: true })
    .first()
    .check();
  await respond;
}

test.describe("Sugerencia de pausa en el borde de bloque (D-16/D-17/D-18)", () => {
  // PREEXISTENTE y fuera de alcance: la cookie anonima no asienta en
  // mobile-webkit ([GAP-E2E-WEBKIT-ANON-COOKIE], documentado en
  // free-pause-resume.spec.ts). Mismo skip explicito, misma razon.
  test.skip(
    ({ browserName }) => browserName === "webkit",
    "[GAP-E2E-WEBKIT-ANON-COOKIE] preexistente: la cookie de sesion anonima no " +
      "asienta en webkit. Se afirma de verdad en chromium + desktop.",
  );
  test.skip(
    !HAS_STACK,
    "Stack local ausente (NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY).",
  );

  test("al cerrar el bloque 1, la salida se promueve y el item 13 sigue respondible", async ({
    browser,
  }) => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto("/test/onet-ip-sf");
    await passEntryGate(page, { sensitive: false });

    const suggestion = page.getByTestId("pause-suggestion");

    // --- Control negativo: en el item 1 no hay nada que sugerir -------------
    await expect(page.getByText(/Bloque 1 de 5/i)).toBeVisible();
    await expect(suggestion).toHaveCount(0);

    // --- Adelantar hasta el item 12 por API (ver cabecera) ------------------
    const admin = adminClient();
    const cookies = await ctx.cookies();
    const anonId = cookies.find((c) => c.name === "anonymous_session_id")?.value;
    expect(anonId, "el runner debe haber minteado la cookie anonima").toBeTruthy();

    const { data: sessionRow } = await admin
      .from("assessment_session")
      .select("id, instrument_version_id")
      .eq("anonymous_session_id", anonId as string)
      .maybeSingle();
    expect(sessionRow?.id, "la sesion anonima debe existir en la DB").toBeTruthy();

    const items = await itemsFor(
      admin,
      (sessionRow as { instrument_version_id: string }).instrument_version_id,
    );
    expect(items.length).toBe(60);

    // Items 1..11. El 12 —el que cierra el bloque— se responde por la UI.
    for (const item of items.filter((i) => i.sequence_number <= 11)) {
      const res = await page.request.post("/api/respond", {
        data: {
          item_id: item.id,
          raw_value: 1 + (item.sequence_number % 5),
          session_id: (sessionRow as { id: string }).id,
        },
      });
      // El mensaje lleva status Y cuerpo a proposito: hay un flake abierto de
      // 500 bajo concurrencia en este endpoint
      // ([GAP-E2E-FLAKE-RESPOND-500-CONCURRENCIA]), y un `toBe(true)` pelado no
      // permite distinguirlo de un rechazo legitimo (400 de validacion, 403 de
      // cookie-vs-sesion) cuando el fallo aparece en CI.
      expect(
        res.ok(),
        `respond rechazo seq=${item.sequence_number}: HTTP ${res.status()} ${await res.text()}`,
      ).toBe(true);
    }

    // `?resumed=true` salta la compuerta de reanudacion (progress>0), igual que
    // hace el propio ItemForm al avanzar en sitio.
    await page.goto("/test/onet-ip-sf?resumed=true");
    await expect(page.getByText(/Bloque 1 de 5/i)).toBeVisible();
    await expect(page.locator('[role="progressbar"]')).toHaveAttribute(
      "aria-valuenow",
      "12",
    );
    // Control negativo fuerte: en el ULTIMO item del bloque —justo antes del
    // borde— la sugerencia todavia NO esta. Si estuviera, el copy "Terminaste
    // el bloque 1" seria falso: el usuario no lo ha terminado.
    await expect(suggestion).toHaveCount(0);

    // --- El cruce del borde, por la UI -------------------------------------
    await answerCurrentItem(page);

    // Estamos en el item 13 = bloque 2, item 1. El bloque 1 quedo cerrado.
    await expect(page.getByText(/Bloque 2 de 5/i)).toBeVisible();
    await expect(page.locator('[role="progressbar"]')).toHaveAttribute(
      "aria-valuenow",
      "1",
    );

    // (a) La sugerencia aparecio, con el numero del bloque CERRADO.
    await expect(suggestion).toBeVisible();
    await expect(suggestion).toHaveText(PAUSE_BLOCK_1);

    // (b) El tono es invitacion. Ninguna advertencia, ningun ruego, y sobre
    //     todo ninguna afirmacion de perdida de progreso — seria FALSA.
    await expect(suggestion).not.toHaveText(FORBIDDEN_TONE);

    // (c) La salida esta PROMOVIDA a boton secundario, con el objetivo tactil
    //     de 44px que exige el contrato de accesibilidad.
    const promoted = page.getByTestId("pause-suggestion-exit");
    await expect(promoted).toBeVisible();
    const box = await promoted.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);

    // (d) NO ES PANTALLA: el item 13 sigue visible y respondible en la misma
    //     pantalla, sin overlay y sin dialogo. Esta es la asercion que D-18
    //     protege y la unica que un unitario no puede dar.
    await expect(page.locator('[role="dialog"]')).toHaveCount(0);
    await expect(page.locator('[role="alertdialog"]')).toHaveCount(0);
    const radios = page.getByRole("radio", { name: ANCHOR_ES_CO, exact: true });
    await expect(radios.first()).toBeVisible();
    await expect(radios.first()).toBeEnabled();

    // (e) NO ROBA EL FOCO: nada dentro de la sugerencia quedo enfocado.
    //     (La mitad "el foco sigue en la escala de respuesta" NO es afirmable:
    //     `key={item.id}` remonta el ItemForm en cada avance, asi que el radio
    //     enfocado se destruye y el foco cae al body por diseno de React. Lo
    //     que si es afirmable —y es lo que el contrato prohibe— es que la
    //     sugerencia se lo lleve.)
    const stealsFocus = await page.evaluate(() => {
      const container = document.querySelector(
        '[data-testid="pause-suggestion"]',
      );
      const active = document.activeElement;
      return Boolean(container && active && container.contains(active));
    });
    expect(stealsFocus).toBe(false);

    // (f) Y de verdad se puede seguir sin tocar la sugerencia: responder el
    //     item 13 avanza al 14 y la sugerencia desaparece.
    await answerCurrentItem(page);
    await expect(page.locator('[role="progressbar"]')).toHaveAttribute(
      "aria-valuenow",
      "2",
    );
    await expect(suggestion).toHaveCount(0);

    await ctx.close();
  });
});
