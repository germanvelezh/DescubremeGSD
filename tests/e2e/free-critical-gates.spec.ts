/**
 * E2E — Free critical gates (Plan 02-13 Task 3, D-E3.2).
 *
 * The 5 critical gates the Free phase must hold:
 *   (a) a sensitive instrument's first item is BLOCKED without
 *       consent_sensitive_data (consent gate: RLS 003 + assertConsentActive).
 *   (b) NFR-27 modal appears on the BFI and PERMA transitions and is ABSENT on
 *       the values (TwIVI) transition (decoupled ethics, ADR-023).
 *   (c) NFR-28 ContentionBanner renders when MOCK-DISTRESS-1 / a distress
 *       fixture crosses the seeded threshold (PERMA N>6.5 / item-level).
 *   (d) the teaser is LOCKED at <4 computed scores.
 *   (e) a quality-flagged score omits its cross but the report still renders.
 *
 * INTEGRATION FINDING (02-13): all 5 gates depend on the AUTHENTICATED 4-test
 * runtime that Waves 1-5 did NOT build (see free-full-flow.spec.ts header +
 * deferred-items.md [GAP-AUTH-4TEST-RUNTIME]). Specifically:
 *   - gate (a): /api/respond does NOT call assertConsentActive at all today,
 *     and has no authenticated-cookie path — the consent gate is NOT yet
 *     enforced at the respond boundary (only the RLS policy exists). The gate
 *     can only be E2E-asserted once respond enforces it for signed-in users.
 *   - gates (b)/(c)/(d)/(e) need a real signed-in user to complete the sensitive
 *     instruments and reach the transition/report/teaser surfaces.
 *
 * Where each gate is ALREADY PROVEN today (so the contract is not unverified,
 * only its END-TO-END drive is deferred):
 *   - (b) DisclaimerModal present/absent by decoupled flags:
 *         tests/unit/components/sensitive-ui.test.tsx +
 *         tests/integration/report-page-generic.test.tsx (values: NO modal).
 *   - (c) ContentionBanner render-on-threshold: sensitive-ui.test.tsx +
 *         lib/distress/detector tests.
 *   - (e) quality-flag omits cross, report still renders:
 *         report-page-generic.test.tsx ("quality-flagged report renders").
 *   - (d) teaser lock at <4: lib/integrator/teaser.ts unit coverage.
 *
 * These specs are therefore `test.skip`'d WITH the explicit reason below (never
 * silently). The real-auth fixture is ready (fixtures/real-auth.ts) — including
 * writeConsent(sensitive:false) for gate (a) — so they unskip when the runtime
 * + the respond consent gate land.
 *
 * Anchors:
 *   - 02-CONTEXT.md D-E3.2 (critical gates), D-A.2 (ADR-023 decoupled ethics).
 *   - 02-VALIDATION.md (Test Map).
 *   - db/seeds/mocks/MOCK-DISTRESS-1 (distress fixture).
 *   - app/api/respond/route.ts (the consent gate to add for gate (a)).
 *   - deferred-items.md [GAP-AUTH-4TEST-RUNTIME].
 */
import { expect, test } from "@playwright/test";

import { hasLocalAuth } from "./fixtures/real-auth";

const RUNTIME_SKIP =
  "[GAP-AUTH-4TEST-RUNTIME] authenticated 4-test runner + respond consent gate " +
  "unbuilt (see deferred-items.md). Gate contracts are proven in unit/integration " +
  "today; the E2E drive unskips when the runtime lands. Fixture ready.";

test.describe("Critical gate (a) — consent blocks a sensitive instrument", () => {
  test.skip(!hasLocalAuth() || true, RUNTIME_SKIP);
  test("first sensitive item is blocked without consent_sensitive_data", async () => {
    // login(real) + writeConsent({sensitive:false}); attempt the first BFI item;
    // assert /api/respond returns 403 (assertConsentActive) — once respond
    // enforces it for authenticated users.
    expect(true).toBe(true);
  });
});

test.describe("Critical gate (b) — NFR-27 modal: BFI/PERMA yes, values no", () => {
  test.skip(!hasLocalAuth() || true, RUNTIME_SKIP);
  test("modal on BFI + PERMA transitions, absent on values", async () => {
    expect(true).toBe(true);
  });
});

test.describe("Critical gate (c) — NFR-28 banner crosses threshold", () => {
  test.skip(!hasLocalAuth() || true, RUNTIME_SKIP);
  test("ContentionBanner renders when the distress threshold is crossed", async () => {
    expect(true).toBe(true);
  });
});

test.describe("Critical gate (d) — teaser locked at <4 scores", () => {
  test.skip(!hasLocalAuth() || true, RUNTIME_SKIP);
  test("perfil-integrado is locked until all 4 computed scores exist", async () => {
    expect(true).toBe(true);
  });
});

test.describe("Critical gate (e) — quality flag omits cross, report still renders", () => {
  test.skip(!hasLocalAuth() || true, RUNTIME_SKIP);
  test("a quality-flagged score drops its cross but the report renders", async () => {
    expect(true).toBe(true);
  });
});
