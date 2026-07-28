/**
 * E2E — Free critical gates (Plan 02-13 Task 3, D-E3.2; bodies authored 02-16).
 *
 * The 5 critical gates the Free phase must hold, now driven for REAL against the
 * authenticated runtime (02-14 session + /done routing, 02-15 /api/respond
 * multi-scale + cookie auth + consent gate, 02-17 score-on-/done-arrival):
 *   (a) a sensitive instrument's first item is BLOCKED without
 *       consent_sensitive_data (403) and ALLOWED with it (200).
 *   (b) NFR-27 modal appears on the BFI and PERMA transitions and is ABSENT on
 *       the values (TwIVI) transition (decoupled ethics, ADR-023).
 *   (c) NFR-28 ContentionBanner renders when the PERMA score crosses the
 *       seeded distress threshold.
 *   (d) the teaser is LOCKED at <4 computed scores.
 *   (e) a quality-flagged score omits its cross but the report still renders.
 *
 * TwIVI stems are placeholders ([GAP-TWIVI-ITEMS-ANCHORS-ES-CO]); gates assert
 * by STRUCTURE (role/landmark/copy region), never by item-stem copy.
 *
 * Anchors:
 *   - 02-CONTEXT.md D-E3.2 (critical gates), D-A.2 (ADR-023 decoupled ethics).
 *   - lib/consent/guard.ts (assertConsentActive: 403 sensitive-without-consent).
 *   - app/api/respond/route.ts (the consent gate at the write boundary).
 *   - app/(b2c)/reporte/[sessionId]/_components/{ContentionBanner,QualityFlagNote}.
 *   - deferred-items.md [GAP-AUTH-4TEST-RUNTIME].
 */
import type { BrowserContext } from "@playwright/test";
import { expect, test } from "@playwright/test";

import { ENTRY_GATE_CTA } from "./fixtures/entry-gate";
import type { Admin } from "./fixtures/instrument-run";
import {
  adminClient,
  completeInstrument,
  sessionFor,
} from "./fixtures/instrument-run";
import { hasLocalAuth, loginAsNewUser, writeConsent } from "./fixtures/real-auth";

const RUNTIME_SKIP =
  "[GAP-AUTH-4TEST-RUNTIME] local env absent (E2E_LOCAL + local host); fixture ready.";

/** First item (lowest sequence) of an instrument version. */
async function firstItem(admin: Admin, instrumentVersionId: string) {
  const { data } = await admin
    .from("item")
    .select("id, sequence_number")
    .eq("instrument_version_id", instrumentVersionId)
    .order("sequence_number", { ascending: true })
    .limit(1)
    .maybeSingle();
  return data as { id: string; sequence_number: number } | null;
}

// ---------------------------------------------------------------------------
test.describe("Critical gate (a) — consent blocks a sensitive instrument", () => {
  test.skip(!hasLocalAuth(), RUNTIME_SKIP);

  test("first BFI item: 403 without sensitive consent, 200 with it", async ({
    browser,
  }) => {
    const admin = adminClient();

    // User A: general consent only (sensitive=false). The consent table has a
    // partial unique index on (user_id, product_code) for non-revoked rows
    // (migration 002), so a SECOND consent for the same user is impossible — use
    // two distinct users for the absent/present pair.
    const ctxA: BrowserContext = await browser.newContext();
    const pageA = await ctxA.newPage();
    const { userId: userA } = await loginAsNewUser(ctxA);
    await writeConsent(userA, { sensitive: false });
    await pageA.goto("/test/BFI-2-S"); // creates the authenticated session
    const sessA = await sessionFor(admin, userA, "BFI-2-S");
    if (!sessA) throw new Error("no session for user A");
    const itemA = await firstItem(admin, sessA.instrument_version_id);
    if (!itemA) throw new Error("no first BFI item");
    const resBlocked = await pageA.request.post("/api/respond", {
      data: { item_id: itemA.id, raw_value: 3, session_id: sessA.id },
    });
    expect(
      resBlocked.status(),
      "BFI (sensitive) must be 403 without consent_sensitive_data",
    ).toBe(403);
    await ctxA.close();

    // User B: sensitive consent granted -> the same first item is allowed (200).
    const ctxB: BrowserContext = await browser.newContext();
    const pageB = await ctxB.newPage();
    const { userId: userB } = await loginAsNewUser(ctxB);
    await writeConsent(userB, { sensitive: true });
    await pageB.goto("/test/BFI-2-S");
    const sessB = await sessionFor(admin, userB, "BFI-2-S");
    if (!sessB) throw new Error("no session for user B");
    const itemB = await firstItem(admin, sessB.instrument_version_id);
    if (!itemB) throw new Error("no first BFI item (B)");
    const resAllowed = await pageB.request.post("/api/respond", {
      data: { item_id: itemB.id, raw_value: 3, session_id: sessB.id },
    });
    expect(
      resAllowed.ok(),
      "BFI must be 200 once consent_sensitive_data is present",
    ).toBe(true);
    await ctxB.close();
  });
});

// ---------------------------------------------------------------------------
test.describe("Critical gate (b) — NFR-27 modal: BFI/PERMA yes, values no", () => {
  test.skip(!hasLocalAuth(), RUNTIME_SKIP);

  test("disclaimer modal mounts on the BFI transition (sensitive), absent on values", async ({
    context,
    page,
  }) => {
    const admin = adminClient();
    const { userId } = await loginAsNewUser(context);
    await writeConsent(userId, { sensitive: true });

    // DONDE VIVE NFR-27 (corregido): ya no es un overlay `dialog`. Ola 2.2 lo
    // movio a `TestEntryGate`, que lo embebe INLINE en la pantalla de entrada del
    // instrumento, dentro de la region "Antes de comenzar" — "contenido NFR-27
    // intacto, solo el contenedor cambia". El "Empezar" del interstitial NAVEGA;
    // el disclaimer aparece del otro lado, no encima de el.
    //
    // Por eso esto NO afirma por contenedor (`dialog`/`region`): ese contenedor ya
    // cambio una vez y anclarse a el firma el proximo rojo falso. Afirma el
    // CONTENIDO de la decision etica —el heading NFR-27 + el CTA de
    // acknowledgement— que es lo que la etica exige que exista.
    await completeInstrument(page, admin, userId, "ONET-IP-SF", (seq) => 1 + (seq % 5));
    await page.getByRole("button", { name: "Empezar" }).click();
    await expect(
      page.getByRole("heading", { name: "Antes de seguir" }),
      "NFR-27 disclaimer must render on the entry to BFI (sensitive)",
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: ENTRY_GATE_CTA.sensitive, exact: true }),
      "NFR-27 requires an informed acknowledgement before item 1 (criterion 4)",
    ).toBeVisible();

    // Transition INTO values (TwIVI): pretest_modal=false -> etica desacoplada
    // (ADR-023), el entry gate se sirve SIN el bloque NFR-27.
    await completeInstrument(page, admin, userId, "BFI-2-S", (seq) => 1 + (seq % 5));
    await page.getByRole("button", { name: "Empezar" }).click();
    // ANCLA POSITIVA PRIMERO. Sin esto la ausencia de abajo pasaria tambien en un
    // 404 o en una pantalla equivocada — el verde-falso que el header de 02-16 ya
    // documenta haber sufrido en este mismo test.
    await expect(
      page.getByRole("button", { name: ENTRY_GATE_CTA.plain, exact: true }),
      "the values entry gate must render (anchor: absence below must mean absence)",
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Antes de seguir" }),
      "values (TwIVI) must NOT carry the NFR-27 disclaimer (decoupled ethics, ADR-023)",
    ).toHaveCount(0);
  });
});

// ---------------------------------------------------------------------------
test.describe("Critical gate (c) — NFR-28 banner crosses threshold", () => {
  test.skip(!hasLocalAuth(), RUNTIME_SKIP);

  // [GAP-NFR28-DISTRESS-BANNER-UNWIRED] RESOLVED (02-19): score-session now
  // evaluates the SEEDED distress_thresholds over a DERIVABLE scoreMap and
  // persists {showContention, severity} in report_snapshot.html_payload; the
  // report reads that decision (no longer hardwired false). Constant-low PERMA
  // (() => 0) crosses a DERIVABLE strong trigger (hap1 = 0 <= 2) — and the
  // moderate PERMA_total = 0 < 5.0 — so the prominent ContentionBanner
  // (role=complementary) renders. Item-level N1/N3 triggers stay deferred
  // ([GAP-NFR28-ITEM-LEVEL-TRIGGERS]); they are NOT needed for this gate.

  test("ContentionBanner renders when the PERMA distress threshold is crossed", async ({
    context,
    page,
  }) => {
    const admin = adminClient();
    const { userId } = await loginAsNewUser(context);
    await writeConsent(userId, { sensitive: true });

    // Answer PERMA (0-10) with LOW wellbeing values to cross the seeded distress
    // threshold (negative/loneliness high -> contention). Constant-low is the
    // worst-case distress signal the banner must surface.
    await completeInstrument(page, admin, userId, "PERMA-Profiler", () => 0);

    const session = await sessionFor(admin, userId, "PERMA-Profiler");
    if (!session) throw new Error("no PERMA session");
    await page.goto(`/reporte/${session.id}`);
    // The ContentionBanner mounts as a role=complementary landmark with the
    // NFR-28 heading when showContention is true (threshold crossed).
    await expect(
      page.getByRole("complementary"),
      "NFR-28 ContentionBanner must render on a distress-crossing report",
    ).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
test.describe("Critical gate (d) — teaser locked at <4 scores", () => {
  test.skip(!hasLocalAuth(), RUNTIME_SKIP);

  test("perfil-integrado is locked until all 4 computed scores exist", async ({
    context,
    page,
  }) => {
    const admin = adminClient();
    const { userId } = await loginAsNewUser(context);
    await writeConsent(userId, { sensitive: true });

    // Complete a SINGLE instrument (BFI). With 1 of 4 scores, the teaser is locked.
    await completeInstrument(
      page,
      admin,
      userId,
      "BFI-2-S",
      (seq) => 1 + (seq % 5),
    );

    await page.goto("/perfil-integrado");
    await expect(
      page.getByText(/te faltan/i),
      "teaser must be LOCKED with <4 computed scores",
    ).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
test.describe("Critical gate (e) — quality flag omits cross, report still renders", () => {
  test.skip(!hasLocalAuth(), RUNTIME_SKIP);

  test("a single_pattern (constant) score flags quality, the report shows the note, and the teaser omits the dependent cross", async ({
    context,
    page,
  }) => {
    const admin = adminClient();
    const { userId } = await loginAsNewUser(context);
    await writeConsent(userId, { sensitive: true });

    // D-F2.1 has TWO halves; assert BOTH (02-16 left only `getByRole("main")`).
    // Drive all 4 Free instruments so the teaser UNLOCKS (gate d), with BFI
    // answered CONSTANT (stdev 0 -> single_pattern quality flag). The others get
    // varied values so they do NOT flag — only the BFI-dependent cross is omitted.
    await completeInstrument(page, admin, userId, "ONET-IP-SF", (seq) => 1 + (seq % 5));
    await completeInstrument(page, admin, userId, "BFI-2-S", () => 3); // constant -> flag
    await completeInstrument(page, admin, userId, "TwIVI", (seq) => 1 + (seq % 6));
    await completeInstrument(page, admin, userId, "PERMA-Profiler", (seq) => 4 + (seq % 5));

    // Half 1: the FLAGGED report still renders (never blocks, D-F2.1) AND surfaces
    // the soft QualityFlagNote (MC_QUALITY_FLAG_NOTE), not just a bare main.
    const session = await sessionFor(admin, userId, "BFI-2-S");
    if (!session) throw new Error("no BFI session");
    await page.goto(`/reporte/${session.id}`);
    await expect(
      page.getByRole("main"),
      "a quality-flagged report must still render",
    ).toBeVisible();
    await expect(
      page.getByText(/notamos un patrón muy parejo/i),
      "the QualityFlagNote must render on a flagged report (D-F2.1)",
    ).toBeVisible();

    // Half 2: the teaser OMITS the cross that depends on the flagged score and
    // surfaces the soft omission note (MC_TEASER_OMITTED_NOTE) — D-F2.1 degrade.
    await page.goto("/perfil-integrado");
    await expect(
      // "algún" CON tilde: el copy perdio los acentos en su momento por un regex
      // de E2E y la restauracion es-CO se los devolvio. Verbatim de
      // lib/i18n/microcopy/es-CO/teaser.ts (MC_TEASER_OMITTED_NOTE).
      page.getByText(/dejamos por fuera algún cruce/i),
      "the teaser must omit the flagged-dependent cross and note it (D-F2.1)",
    ).toBeVisible();
  });
});
