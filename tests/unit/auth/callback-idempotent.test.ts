/**
 * Unit test — /auth/callback consent-insert idempotency
 * ([BUG-CALLBACK-NOT-IDEMPOTENT], verify Test 9).
 *
 * The magic-link callback re-runs on every click. A user with a prior
 * partial signup already has an ACTIVE consent row for (user_id, 'free').
 * The consent INSERT then violates the partial unique index
 * `consent_user_product_active_idx (user_id, product_code) WHERE
 * revoked_at IS NULL` (mig 002:123) — Postgres SQLSTATE 23505. Before the
 * fix the handler threw, the outer try/catch caught it, and the user was
 * redirected to `/?error=signup` — permanently blocking re-auth for anyone
 * with residual state (and any real user who double-clicks or retries).
 *
 * The fix treats a 23505 ON THE CONSENT INSERT as an idempotent success:
 * the consent table has exactly one relevant unique index, so a 23505 here
 * can only mean "an active consent already exists". A 23505 anywhere else —
 * notably the claim step's `item_response (user_id, item_id)` unique index —
 * must STILL surface as `/?error=signup`; the swallow is scoped to the
 * consent insert call site only, never the outer catch.
 *
 * Anchors:
 *  - app/auth/callback/route.ts step 6 (consent insert).
 *  - supabase/migrations/002_user_data.sql:123 (partial unique index).
 *  - [BUG-CALLBACK-NOT-IDEMPOTENT] in estado/BACKLOG.md.
 */
// @vitest-environment node
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const state = vi.hoisted(() => ({
  consentInsertResult: { error: null } as { error: unknown },
  claimCalls: 0,
}));

vi.mock("@/lib/logger", () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

vi.mock("@/lib/crypto/pii", () => ({
  encryptPII: vi.fn(async () => ({
    ciphertext: "ct",
    dek_ciphertext: "dek",
    iv: "iv",
    tag: "tag",
    kid: "kid",
    v: 1,
  })),
}));

vi.mock("@/lib/consent/versions", () => ({
  getConsentTextHash: vi.fn(() => "sha256hash"),
}));

vi.mock("@/lib/session/claim", () => ({
  claimAnonymousSession: vi.fn(async () => {
    state.claimCalls += 1;
    return { sessionsClaimed: 0, responsesClaimed: 0 };
  }),
}));

vi.mock("@/lib/audit/writer", () => ({
  writeAudit: vi.fn(async () => undefined),
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseServerClient: vi.fn(async () => ({
    auth: {
      exchangeCodeForSession: vi.fn(async () => ({
        data: {
          user: {
            id: "11111111-1111-1111-1111-111111111111",
            email: "gervel33@example.com",
            user_metadata: {
              dob_pending: "1990-01-01",
              country_pending: "CO",
              consent_general_pending: true,
              consent_sensitive_pending: true,
              session_id_pending: "22222222-2222-2222-2222-222222222222",
            },
          },
        },
        error: null,
      })),
      signOut: vi.fn(async () => ({ error: null })),
    },
  })),
}));

vi.mock("@/lib/supabase/service-role", () => ({
  getSupabaseAdminClient: vi.fn(() => ({
    from: (table: string) => ({
      upsert: vi.fn(async () => ({ error: null })),
      insert: vi.fn(async () =>
        table === "consent" ? state.consentInsertResult : { error: null },
      ),
    }),
    auth: {
      admin: { updateUserById: vi.fn(async () => ({ data: {}, error: null })) },
    },
  })),
}));

const SESSION_ID = "22222222-2222-2222-2222-222222222222";

async function invokeCallback(): Promise<Response> {
  const { GET } = await import("@/app/auth/callback/route");
  const req = new Request("https://preview.test/auth/callback?code=validcode");
  return GET(req);
}

beforeEach(() => {
  state.consentInsertResult = { error: null };
  state.claimCalls = 0;
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("/auth/callback — consent insert idempotency ([BUG-CALLBACK-NOT-IDEMPOTENT])", () => {
  test("happy path: clean consent insert -> redirect /reporte/<sessionId>", async () => {
    state.consentInsertResult = { error: null };
    const res = await invokeCallback();
    expect(res.headers.get("location")).toContain(`/reporte/${SESSION_ID}`);
    expect(state.claimCalls).toBe(1);
  });

  test("idempotent: consent insert 23505 (active consent exists) -> proceeds to /reporte, NOT /?error=signup", async () => {
    state.consentInsertResult = {
      error: {
        code: "23505",
        message:
          'duplicate key value violates unique constraint "consent_user_product_active_idx"',
      },
    };
    const res = await invokeCallback();
    const loc = res.headers.get("location") ?? "";
    expect(loc).toContain(`/reporte/${SESSION_ID}`);
    expect(loc).not.toContain("error=signup");
    // Idempotent proceed: claim still runs so the anonymous session transfers.
    expect(state.claimCalls).toBe(1);
  });

  test("scoping guard: a non-23505 consent error still fails to /?error=signup", async () => {
    state.consentInsertResult = {
      error: {
        code: "23502",
        message: "null value in column violates not-null constraint",
      },
    };
    const res = await invokeCallback();
    const loc = res.headers.get("location") ?? "";
    expect(loc).toContain("error=signup");
    expect(loc).not.toContain("/reporte/");
  });
});
