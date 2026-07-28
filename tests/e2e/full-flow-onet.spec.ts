/**
 * E2E full-flow with signup — Plan 01-09 Task 2.
 *
 * Walking Skeleton COMPLETO: usuario anonimo → 60 items → signup + dual
 * consent + edad ≥ 18 → magic-link callback (mock) → claim sesion →
 * /reporte/[sessionId] renderiza con (a) hexagono full SVG con role=img +
 * sr-only table, (b) top-3 letras visibles, (c) frase reveladora, (d)
 * seccion ocupaciones con tono D3.3 verbatim, (e) Disclosure ficha tecnica,
 * (f) footer chip "Este reporte no es clinico", (g) survey 5-star, (h)
 * waitlist checkbox.
 *
 * Execution ([GAP-E2E-SKIPS-E2E-LIVE], 2026-07-28): these 2 tests were gated on
 * `E2E_REPORT_SESSION_ID`, an env var nothing in the repo ever set, holding the
 * id of a hand-seeded session. That id could not exist: a clean `supabase db
 * reset` leaves 0 assessment_session and 0 report_snapshot rows — the seeds are
 * reference data (instruments, items, narratives, occupations) only. Fed a REAL
 * scored session id pulled from the DB, both tests still failed, on /signup:
 * like the Phase-1 delete spec, they had no auth at all and /reporte is
 * auth-gated. The gate was vestigial in both directions.
 *
 * They now BUILD their own subject: mint a user (fixtures/real-auth.ts), drive
 * O*NET to completion and score it (fixtures/instrument-run.ts), then read the
 * report. That removes the hand-seeding step entirely instead of automating it.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.6.
 *  - 01-CONTEXT.md D3.1-D3.12.
 *  - PLAN 01-09 Task 2 <behavior> Test E2E.
 */
import type { BrowserContext, Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

import {
  adminClient,
  completeInstrument,
  sessionFor,
} from "./fixtures/instrument-run";
import { hasLocalAuth, loginAsNewUser, writeConsent } from "./fixtures/real-auth";

const RUNTIME_SKIP =
  "[GAP-AUTH-4TEST-RUNTIME] local env absent (E2E_LOCAL + local host); fixture ready.";

/**
 * Mints a user, completes O*NET and returns its SCORED session id.
 *
 * Per-test rather than shared: `fullyParallel` runs these concurrently, and a
 * shared subject would couple them through the DB.
 */
async function scoredOnetSession(
  context: BrowserContext,
  page: Page,
): Promise<string> {
  const admin = adminClient();
  const { userId } = await loginAsNewUser(context);
  await writeConsent(userId);

  // Layer 3 (ocupaciones) is gated: `needsLevelCapture = isHexagon &&
  // !educationLevel` (reporte/[sessionId]/page.tsx). Without a captured level
  // the hexagon report renders LevelCapture INSTEAD of the occupations
  // section, and assertion (d) below would fail on a report that is in fact
  // behaving correctly. This user is one who already answered the capture —
  // exercising the capture FORM is LevelCapture's own spec, not this one.
  await admin
    .from("user")
    .update({ education_level: "pregrado", career_stage: "semi_senior" })
    .eq("id", userId);

  // Varied values (not a constant) so the score does NOT trip the
  // single_pattern quality flag — this spec asserts the ordinary report.
  await completeInstrument(page, admin, userId, "ONET-IP-SF", (seq) => 1 + (seq % 5));
  const session = await sessionFor(admin, userId, "ONET-IP-SF");
  if (!session) throw new Error("no O*NET session created");
  return session.id;
}

test.describe("Plan 01-09 — full-flow O*NET with report (Walking Skeleton)", () => {
  test.skip(!hasLocalAuth(), RUNTIME_SKIP);

  test("reporte renders Capa 1 above-fold + ficha + footer NFR-27 + survey + waitlist", async ({
    context,
    page,
  }) => {
    const sessionId = await scoredOnetSession(context, page);
    await page.goto(`/reporte/${sessionId}`);

    // (a) Hexagono full SVG with role=img + sr-only table.
    const svg = page.locator('svg[role="img"]');
    await expect(svg).toBeVisible();
    await expect(page.locator("table.sr-only")).toBeAttached();

    // (b) Top-3 letras visibles above the hexagono.
    const top3Heading = page.getByLabel(/Tus tres dimensiones principales:/);
    await expect(top3Heading).toBeVisible();

    // (c) Frase reveladora — la narrativa de Capa 2, no el `h1` ni el bloque
    // NFR-27. El patron original (/Cowork|tu perfil|preferencias/i) se escribio
    // cuando la unica coincidencia era un placeholder; hoy resuelve a TRES
    // elementos y revienta por strict mode. Se ancla en la narrativa real, que
    // es lo que la asercion queria comprobar.
    const narrativeHeading = page.getByRole("heading", {
      name: /Qu[eé] sugiere esto sobre ti/i,
    });
    await expect(narrativeHeading).toBeVisible();
    // Y que la narrativa traiga TEXTO: el encabezado solo no distingue un
    // reporte con narrativa de uno con la seccion vacia — que es justo el modo
    // de falla que costo el PR #24 (narrativa de TwIVI en blanco).
    await expect(
      page.locator("section", { has: narrativeHeading }).locator("p").first(),
    ).not.toBeEmpty();

    // (d) Seccion ocupaciones.
    //
    // OJO — esta asercion CAMBIO, y el cambio es un hallazgo, no una limpieza.
    // Pedia el encabezado D3.3 verbatim ("Areas donde gente con tu perfil suele
    // encontrar engagement"). Ese texto ya NO se renderiza en ningun lado:
    // `MC_REPORT_OCCUPATIONS_HEADING` sigue definido en
    // lib/i18n/microcopy/es-CO/report.ts —marcado ahi mismo como "VERBATIM (no
    // tocar — acceptance gate D3.3)"— pero tiene CERO consumidores. La Fase
    // 02.1 Wave 5 lo sustituyo por `MC_NIVEL_REVEAL_TITLE` en las dos ramas de
    // ocupaciones. Nadie lo noto porque el unico test que lo vigilaba estaba
    // skipped: es literalmente el costo de la cobertura declarada y no
    // ejercida.
    //
    // NO se restaura el copy desde aca: si D3.3 sigue vigente o quedo
    // superado por el reveal de nivel es decision de producto/Cowork, no de un
    // spec. Queda flageado. Mientras tanto el test vigila la seccion que SI
    // existe, para no volver a quedarse sin guardia.
    await expect(
      page.getByRole("heading", { name: /Campos que podr[ií]an resonar contigo/i }),
    ).toBeVisible();
    // Y que efectivamente liste ocupaciones (el encabezado solo tambien
    // aparece cuando la lista viene vacia).
    await expect(page.getByRole("listitem").first()).toBeVisible();

    // (e) Disclosure ficha tecnica trigger present.
    await expect(
      page.getByRole("button", { name: /ficha t[eé]cnica/i }),
    ).toBeVisible();

    // (f) Footer chip "Este reporte no es clinico" verbatim.
    await expect(
      page.getByText(/Este reporte no es cl[ií]nico/i).first(),
    ).toBeVisible();
    await expect(page.locator('a[href="#nfr27-long"]')).toBeVisible();

    // (g) Survey 5-star radio group present.
    await expect(
      page.locator('fieldset[role="radiogroup"]'),
    ).toBeVisible();
    // 5 estrellas total (los inputs son radio sr-only).
    await expect(page.locator('input[type="radio"][name="stars"]')).toHaveCount(5);

    // (h) Waitlist checkbox present.
    await expect(
      page.getByLabel(/Avisame cuando este listo/i),
    ).toBeVisible();
  });

  test("ocupaciones: tono no determinista (no 'tu carrera ideal')", async ({
    context,
    page,
  }) => {
    const sessionId = await scoredOnetSession(context, page);
    await page.goto(`/reporte/${sessionId}`);
    const html = await page.content();

    // La mitad VERBATIM D3.3 de este test se cayo: el encabezado que afirmaba
    // ya no lo renderiza nadie (ver la nota larga en el test de arriba). Lo que
    // se conserva es la mitad etica, que es la que de verdad protege al
    // usuario y sigue siendo exigible pase lo que pase con el encabezado:
    // el reporte NUNCA afirma una vocacion.
    expect(html.toLowerCase()).not.toContain("tu carrera ideal");
    // El copy vigente de la seccion tampoco puede volverse determinista.
    expect(html).toMatch(/Campos que podr[ií]an resonar contigo/i);
  });
});
