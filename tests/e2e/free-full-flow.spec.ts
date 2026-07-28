/**
 * E2E — Free 4-test full flow (Plan 02-13 Task 3).
 *
 * Absorbs the deferred Phase-1 GAPs [GAP-E2E-FULL-FLOW-ANONYMOUS] +
 * [GAP-E2E-SIGNUP-AGE-BLOCK] (D-E3.1) and extends them to the 4-test Free
 * journey: anonymous O*NET -> glanceable result -> signup + dual consent +
 * age block -> BFI-2-S -> values (TwIVI) -> PERMA -> `perfil-integrado` teaser.
 *
 * SCOPE NOTE (integration finding, 02-13): the AUTHENTICATED tail (the 3
 * sensitive tests after signup -> teaser) requires an authenticated
 * multi-instrument RUNTIME that Waves 1-5 did NOT build. The pieces exist
 * (schema, scoring, MRAT, the 4 instrument seeds, product_stack order,
 * resolveNextFreeTest, the teaser evaluator), but the runner that (a) creates
 * an AUTHENTICATED assessment_session per instrument for tests 2-4, (b) routes
 * a signed-in user through the guided order (today `/test/[code]/done` redirects
 * O*NET -> /signup, the Phase-1 single-funnel shape), (c) accepts the NATIVE
 * scale at /api/respond (the route hardcodes raw_value 1..5; PERMA is 0-10,
 * TwIVI is 1-6), and (d) enforces assertConsentActive for sensitive instruments
 * — is unbuilt. Logged to deferred-items.md [GAP-AUTH-4TEST-RUNTIME]. The
 * authenticated tail + teaser assertions are therefore `test.skip`'d WITH this
 * explicit reason (not silently) until that runtime lands.
 *
 * What IS asserted for real here (anon-auth-free surface, green against the
 * local seeded DB):
 *   - anonymous O*NET item screen renders the seeded first item + 5 anchors.
 *   - signup form renders dual consent (not a master checkbox) + disabled CTA.
 *   - age block: a <18 DOB yields the MC.SIGNUP.AGE.BLOCK error (Server Action,
 *     [GAP-E2E-SIGNUP-AGE-BLOCK]).
 *
 * Anchors:
 *   - 02-CONTEXT.md D-E3.1 (absorb 4 GAPs), D-A.5 (guided order).
 *   - 02-UI-SPEC.md §7.1 (4-test flow), §7.4 (signup + dual consent).
 *   - (el predecesor Fase-1 full-flow-onet-anonymous.spec.ts se borro: conducia
 *     landing -> BYS -> test, camino retirado por ADR-029. Su cobertura de
 *     layout movil vive ahora en el describe "anchors en viewport movil".)
 *   - tests/e2e/signup-consent.spec.ts (Phase-1 signup contract).
 *   - tests/e2e/fixtures/real-auth.ts (real-session minting for the tail).
 *   - deferred-items.md [GAP-AUTH-4TEST-RUNTIME].
 */
import type { BrowserContext } from "@playwright/test";
import { expect, test } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";

import { passEntryGate } from "./fixtures/entry-gate";
import { completeInstrument } from "./fixtures/instrument-run";
import { hasLocalAuth, loginAsNewUser, writeConsent } from "./fixtures/real-auth";

const ANCHORS_ES_CO = [
  "Me gustaria mucho hacerlo",
  "Me gustaria hacerlo",
  "No estoy seguro",
  "No me gustaria hacerlo",
  "No me gustaria nada hacerlo",
] as const;
const FIRST_ITEM_STEM = "Construir gabinetes de cocina"; // O*NET R1, seeded

// --- Authenticated-tail helpers ([GAP-AUTH-4TEST-RUNTIME]) -------------------
// Service-role admin client (local only — the fixture already refuses non-local
// hosts). Used to read the session + items the runner created, so the test can
// bulk-answer each instrument on its NATIVE scale via /api/respond.
function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
  return createClient(url, service, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/** Default per-scale answer that varies by sequence (no single_pattern flag). */
function variedValue(min: number, max: number): (seq: number) => number {
  const span = max - min + 1;
  return (seq: number) => min + (seq % span);
}

test.describe("Free full flow — anonymous head ([GAP-E2E-FULL-FLOW-ANONYMOUS])", () => {
  test("anonymous O*NET renders the seeded first item + all 5 anchors", async ({
    page,
  }) => {
    await page.goto("/test/onet-ip-sf");
    // Ola 2.2: el item 1 vive detras del TestEntryGate. O*NET no es sensible
    // (pretest_modal NULL) -> CTA "Comenzar".
    await passEntryGate(page, { sensitive: false });
    await expect(page.getByText(FIRST_ITEM_STEM)).toBeVisible();
    for (const anchor of ANCHORS_ES_CO) {
      await expect(page.getByText(anchor, { exact: true })).toBeVisible();
    }
    // El runner de Ola 2.1 presenta O*NET por BLOQUES, asi que la barra es
    // por-bloque (max 12) y no por-instrumento (max 60): 5 bloques x 12 = los 60
    // items sembrados. Se afirma el label, que es donde vive esa aritmetica.
    const progressbar = page.locator('[role="progressbar"]');
    await expect(progressbar).toHaveAttribute("aria-valuemax", "12");
    // Los NUMEROS, no las palabras: el label sale de una plantilla de microcopy
    // (lib/i18n/microcopy/es-CO/test.ts:53) que Cowork puede reescribir. Fijar la
    // frase entera plantaria el mismo tipo de rojo falso que este PR viene a
    // quitar; "1 de 5 ... 1 de 12" es la aritmetica, y esa es la afirmacion.
    await expect(progressbar).toHaveAttribute(
      "aria-label",
      /1 de 5.*1 de 12/,
    );
  });

  test("signup renders dual consent (not a master) + disabled CTA", async ({
    page,
  }) => {
    await page.goto("/signup?top3=R,I,A");
    const checkboxes = page.getByRole("checkbox");
    await expect(checkboxes).toHaveCount(2); // dual, not master
    // El CTA se llamaba "Ver mi reporte" cuando el signup venia DESPUES de una
    // sesion anonima con reporte listo. Bajo ADR-029 el signup es lo primero y
    // no hay reporte previo que ofrecer: el copy real es "Enviarme el enlace"
    // (verificado contra el DOM de prod 2026-07-27).
    const submit = page.getByRole("button", { name: /enviarme el enlace/i });
    await expect(submit).toBeDisabled();
  });
});

// Rescatado de full-flow-onet-anonymous.spec.ts al borrarse ese archivo (su otro
// test conducia landing -> BYS -> test, camino que ADR-029 retiro). Esta era la
// UNICA cobertura de que los anchors apilan verticalmente en movil, y no depende
// del funnel muerto: entra por URL directa, que sigue viva para anonimos.
//
// Describe propio y NO dentro de "anonymous head": `test.use` aplica a todo el
// describe, asi que meterlo alli volveria movil al resto de ese bloque.
test.describe("Free full flow — anchors en viewport movil", () => {
  test.use({ viewport: { width: 360, height: 640 } });

  test("los anchors apilan uno por fila (no una grilla de 5 columnas)", async ({
    page,
  }) => {
    await page.goto("/test/onet-ip-sf");
    await passEntryGate(page, { sensitive: false });
    // `getByRole` y NO `locator('[role="radio"]')`: las filas etiquetadas son
    // `<input type="radio">` con rol IMPLICITO, que el selector CSS de atributo
    // no ve (solo la rama numerica de ItemForm escribe role="radio" a mano).
    const radios = page.getByRole("radio");
    await expect(radios.first()).toBeVisible();
    // Heuristica: los dos primeros anchors tienen distinta coordenada y.
    const firstBox = await radios.nth(0).boundingBox();
    const secondBox = await radios.nth(1).boundingBox();
    expect(firstBox).not.toBeNull();
    expect(secondBox).not.toBeNull();
    if (firstBox && secondBox) {
      expect(secondBox.y).toBeGreaterThan(firstBox.y);
    }
  });
});

test.describe("Free full flow — signup age gate ([GAP-E2E-SIGNUP-AGE-BLOCK])", () => {
  // SCOPE NOTE (02-13): the age gate is enforced at TWO layers — (1) the UI:
  // the DOB <input type="date"> carries max="today-18y" + the "18 años o más"
  // helper; (2) the server: signupAction returns MC_SIGNUP_AGE_BLOCK (field
  // "dob") before the magic-link send. This spec asserts the UI layer for real.
  // The SERVER-Action drive could NOT be exercised here: under Next 16 Turbopack
  // dev + Playwright, clicking the `useActionState` submit fires NO Server Action
  // POST (verified — no request reaches the server), so the action's age branch
  // can't be reached via the browser in this environment. The server age check
  // IS unit-covered (lib/auth/age-check + the action returns AGE_BLOCK). The
  // server-path E2E drive is deferred (Server-Action-under-Turbopack limitation),
  // logged to deferred-items.md [GAP-E2E-SERVER-ACTION-DRIVE].
  test("DOB field enforces the 18+ gate at the UI layer (max + helper)", async ({
    page,
  }) => {
    await page.goto("/signup?top3=R,I,A");

    const dob = page.getByLabel(/nacimiento/i).first();
    await expect(dob).toBeVisible();

    // The input caps DOB at "today - 18 years" (no underage date selectable via
    // the native picker) + states the 18+ requirement in the helper.
    const max = await dob.getAttribute("max");
    expect(max, "DOB input must cap at today-18y").toBeTruthy();
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setUTCFullYear(eighteenYearsAgo.getUTCFullYear() - 18);
    expect(max).toBe(eighteenYearsAgo.toISOString().slice(0, 10));
    await expect(page.getByText(/18 años o más/i)).toBeVisible();
  });
});

test.describe("Free full flow — authenticated tail ([GAP-AUTH-4TEST-RUNTIME])", () => {
  // Now driven for real against the authenticated runtime (02-14 session +
  // /done routing, 02-15 /api/respond multi-scale + cookie auth + consent gate,
  // 02-17 score-on-/done-arrival). Skips ONLY when the local env is absent.
  // TwIVI stems are placeholders ([GAP-TWIVI-ITEMS-ANCHORS-ES-CO]) so the body
  // asserts by STRUCTURE (radiogroup/scale/teaser render), never by item copy.
  test.skip(!hasLocalAuth(), "[GAP-AUTH-4TEST-RUNTIME] local env absent (E2E_LOCAL + local host)");

  test("signed-in user: locked before the 4th, teaser after BFI -> TwIVI -> PERMA", async ({
    context,
    page,
  }) => {
    const admin = adminClient();
    const { userId } = await loginAsNewUser(context);
    await writeConsent(userId, { sensitive: true });

    // Structural sanity: the authenticated runner serves a real item screen.
    // BFI es sensible -> el entry gate embebe NFR-27 y el CTA es el del
    // disclaimer ("Entiendo y continúo"), no "Comenzar".
    await page.goto("/test/BFI-2-S");
    await passEntryGate(page, { sensitive: true });

    // Complete 3 of the 4 (O*NET + BFI + TwIVI). Teaser must stay LOCKED.
    await completeInstrument(page, admin, userId, "ONET-IP-SF", variedValue(1, 5));
    await completeInstrument(page, admin, userId, "BFI-2-S", variedValue(1, 5));
    await completeInstrument(page, admin, userId, "TwIVI", variedValue(1, 6));

    await page.goto("/perfil-integrado");
    await expect(page.getByText(/te faltan/i)).toBeVisible(); // locked copy (D-A.6)

    // Complete the 4th (PERMA) on its 0-10 scale -> the teaser unlocks.
    await completeInstrument(page, admin, userId, "PERMA-Profiler", variedValue(0, 10));

    await page.goto("/perfil-integrado");
    // Teaser (or gap) renders, NOT the locked "Te faltan" copy. Assert by the
    // teaser heading region, structure not item copy.
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByText(/te faltan/i)).toHaveCount(0);
  });

  test("authenticated BFI renders 5 labeled options + advances item-by-item (02-20 Gap D + Gap A on the BFI path)", async ({
    context,
    page,
  }) => {
    // Gap D: before 02-20 the BFI/TwIVI/PERMA scales were dormant — the runner
    // rendered a frozen empty radiogroup with a dead "Siguiente". This drives the
    // BFI UI item-by-item (NOT the API shortcut) to prove the 5 labeled options
    // render AND that answering advances WITHOUT the resume bounce (Gap A) on the
    // BFI path too — exercising the same critical 2nd advance.
    const { userId } = await loginAsNewUser(context);
    await writeConsent(userId, { sensitive: true });

    await page.goto("/test/BFI-2-S");
    await passEntryGate(page, { sensitive: true });
    const radiogroup = page.locator('[role="radiogroup"]');

    // 5 labeled-rows options render (NOT a frozen empty radiogroup).
    const radios = page.getByRole("radio");
    await expect(radios).toHaveCount(5);
    // The verbatim es-CO agreement anchors are present (top + bottom of scale).
    await expect(page.getByText("Muy de acuerdo", { exact: true })).toBeVisible();
    await expect(
      page.getByText("Muy en desacuerdo", { exact: true }),
    ).toBeVisible();

    // Answer 3 consecutive BFI items: each advance must keep a LIVE radiogroup
    // (not freeze) and never bounce to the resume interstitial. The intra-progress
    // counter is the cross-stem-stable signal (TwIVI/BFI stems are not asserted by
    // copy, but the progressbar advances deterministically).
    const RESUME_INTERSTITIAL = /Hola de nuevo|Retomamos donde lo dejaste|ya completaste/i;
    for (let i = 0; i < 3; i++) {
      const respond = page.waitForResponse(
        (r) =>
          r.url().includes("/api/respond") && r.request().method() === "POST",
      );
      await page.getByRole("radio").first().check();
      await respond;

      // Next item renders with a live 5-option radiogroup (no freeze, no bounce).
      await expect(radiogroup).toBeVisible();
      await expect(page.getByRole("radio")).toHaveCount(5);
      await expect(page.getByText(RESUME_INTERSTITIAL)).toHaveCount(0);
      const pb = page.locator('[role="progressbar"]');
      await expect(pb).toHaveAttribute("aria-valuenow", String(i + 2));
    }
  });

  test("authenticated PERMA renders the 0-10 numeric strip; TwIVI renders 6 labeled rows (02-20 Gap D scale machinery)", async ({
    context,
    page,
  }) => {
    // Light structural assertion that the other two formerly-dormant scales are
    // now live: PERMA = 11 numeric buttons (0..10 numeric-endpoints); TwIVI = 6
    // labeled rows. Assert by structure (radio count), never by item copy
    // (TwIVI/PERMA stems are placeholders / not pinned).
    const { userId } = await loginAsNewUser(context);
    await writeConsent(userId, { sensitive: true });

    // Las DOS mitades pasan por el entry gate, pero por ramas DISTINTAS: PERMA
    // es sensible (pretest_modal=true -> NFR-27 embebido) y TwIVI no
    // (pretest_modal=false, etica desacoplada ADR-023). Un solo CTA para las dos
    // dejaria media prueba sin correr.
    await page.goto("/test/PERMA-Profiler");
    await passEntryGate(page, { sensitive: true });
    // 0-10 numeric-endpoints = 11 numeric radio buttons.
    await expect(page.getByRole("radio")).toHaveCount(11);

    await page.goto("/test/TwIVI");
    await passEntryGate(page, { sensitive: false });
    // 6-point labeled-rows = 6 radio inputs.
    await expect(page.getByRole("radio")).toHaveCount(6);
  });
});
