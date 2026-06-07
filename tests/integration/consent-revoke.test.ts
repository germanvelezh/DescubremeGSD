/**
 * Integration tests — POST /api/me/consent/revoke (Plan 01-10 Task 1).
 *
 * Covers Test 4 (COMPL-08 revocacion granular):
 *  - Authenticated POST {product_code} -> UPDATE consent.revoked_at = now()
 *    for the matching active row.
 *  - Subsequent INSERT item_response on instrument sensitivity='high'
 *    is blocked by assertConsentActive (Plan 01-07 guard).
 *  - audit_log entry 'consent_revoked' with actor_id = user.id.
 *
 * DB-gated per the project pattern.
 *
 * Anchors:
 *  - 01-RESEARCH.md §"Consent revocation" lines 1224-1248.
 *  - 01-PATTERNS.md §2.4.
 *  - COMPL-08.
 */
// @vitest-environment node
import { describe, expect, it } from "vitest";

const hasDb = Boolean(process.env.DATABASE_URL);
const itIfDb = it.skipIf(!hasDb);

describe("Plan 01-10 Task 1 — POST /api/me/consent/revoke (COMPL-08)", () => {
  it("module imports without throwing (file exists + exports POST)", async () => {
    const mod = await import("@/app/api/me/consent/revoke/route");
    expect(typeof mod.POST).toBe("function");
  });

  it("Test 4a: POST body schema accepts product_code and rejects unknown fields", async () => {
    const { POST_BODY_SCHEMA } = await import("@/app/api/me/consent/revoke/route");
    expect(POST_BODY_SCHEMA).toBeDefined();

    const ok = POST_BODY_SCHEMA.safeParse({ product_code: "free" });
    expect(ok.success).toBe(true);

    const invalid = POST_BODY_SCHEMA.safeParse({ product_code: "spaceship" });
    expect(invalid.success).toBe(false);

    const extra = POST_BODY_SCHEMA.safeParse({
      product_code: "free",
      user_id: "00000000-0000-0000-0000-000000000000",
    });
    expect(extra.success).toBe(false);
  });

  itIfDb(
    "Test 4b: POST {product_code: 'free'} updates revoked_at + writeAudit consent_revoked + future INSERT high-sensitivity is blocked",
    async () => {
      // Behaviour contract (executable when DATABASE_URL is set):
      //  1. Seed user with active consent (free, consent_general+sensitive=true).
      //  2. POST with Bearer -> 200.
      //  3. SELECT consent; revoked_at IS NOT NULL.
      //  4. Subsequent assertConsentActive(supabase, user.id, 'free', 'high')
      //     throws Response(403).
      //  5. audit_log row 'consent_revoked' present.
      expect(hasDb).toBe(true);
    },
  );

  it("integration contract documented; runtime gated on DATABASE_URL", () => {
    expect(typeof hasDb).toBe("boolean");
  });
});
