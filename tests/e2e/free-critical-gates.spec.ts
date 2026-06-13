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
import type { APIRequestContext, BrowserContext } from "@playwright/test";
import { expect, test } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";

import { hasLocalAuth, loginAsNewUser, writeConsent } from "./fixtures/real-auth";

const RUNTIME_SKIP =
  "[GAP-AUTH-4TEST-RUNTIME] local env absent (E2E_LOCAL + local host); fixture ready.";

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
  return createClient(url, service, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
// biome-ignore lint/suspicious/noExplicitAny: untyped local admin client
type Admin = any;

/** Latest authenticated session (id + version) for (user, code). */
async function sessionFor(admin: Admin, userId: string, code: string) {
  const { data } = await admin
    .from("assessment_session")
    .select("id, instrument_version_id, status, instrument_version!inner(instrument!inner(code))")
    .eq("user_id", userId)
    .eq("instrument_version.instrument.code", code)
    .order("started_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data as { id: string; instrument_version_id: string } | null;
}

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

/** All items of an instrument version, in order. */
async function itemsFor(admin: Admin, instrumentVersionId: string) {
  const { data } = await admin
    .from("item")
    .select("id, sequence_number")
    .eq("instrument_version_id", instrumentVersionId)
    .order("sequence_number", { ascending: true });
  return (data ?? []) as Array<{ id: string; sequence_number: number }>;
}

/** Drive ONE instrument to completion on its native scale + fire /done scoring. */
async function completeInstrument(
  page: { goto: (u: string) => Promise<unknown>; request: APIRequestContext },
  admin: Admin,
  userId: string,
  code: string,
  valueFor: (seq: number) => number,
): Promise<void> {
  await page.goto(`/test/${code}`);
  const session = await sessionFor(admin, userId, code);
  if (!session) throw new Error(`no authenticated session created for ${code}`);
  const items = await itemsFor(admin, session.instrument_version_id);
  if (items.length === 0) throw new Error(`no items seeded for ${code}`);
  for (const item of items) {
    const res = await page.request.post("/api/respond", {
      data: {
        item_id: item.id,
        raw_value: valueFor(item.sequence_number),
        session_id: session.id,
      },
    });
    if (!res.ok()) {
      throw new Error(
        `respond rejected ${code} seq=${item.sequence_number}: HTTP ${res.status()} ${await res.text()}`,
      );
    }
  }
  await page.goto(`/test/${code}/done`);
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

    // The NFR-27 modal does NOT live on the /test/[code] item screen — it mounts
    // on the INTERSTITIAL TransitionScreen (02-07 / 02-18) after pressing
    // "Empezar", keyed off the NEXT instrument's pretest_modal flag. Assert on
    // that real surface, not the item page (which never had a dialog → the old
    // assert passed vacuously = false-green).

    // Transition INTO BFI (sensitive): finish O*NET → guided order lands the
    // interstitial on personalidad. completeInstrument ends at /test/<code>/done,
    // which now renders TransitionScreen. Pressing "Empezar" mounts the NFR-27
    // DisclaimerModal (variant bfi) BEFORE navigating to the first BFI item.
    await completeInstrument(page, admin, userId, "ONET-IP-SF", (seq) => 1 + (seq % 5));
    await page.getByRole("button", { name: "Empezar" }).click();
    await expect(
      page.getByRole("dialog"),
      "NFR-27 disclaimer must mount on the interstitial into BFI (sensitive)",
    ).toBeVisible();

    // Transition INTO values (TwIVI): finish BFI → the interstitial points at
    // valores (pretest_modal=false, decoupled ethics ADR-023). Pressing
    // "Empezar" navigates directly with NO disclaimer dialog.
    await completeInstrument(page, admin, userId, "BFI-2-S", (seq) => 1 + (seq % 5));
    await page.getByRole("button", { name: "Empezar" }).click();
    await expect(
      page.getByRole("dialog"),
      "values (TwIVI) transition must NOT mount the disclaimer (decoupled ethics, ADR-023)",
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
      page.getByText(/dejamos por fuera algun cruce/i),
      "the teaser must omit the flagged-dependent cross and note it (D-F2.1)",
    ).toBeVisible();
  });
});
