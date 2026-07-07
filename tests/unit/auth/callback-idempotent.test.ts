/**
 * Unit test — /auth/callback redirect decision.
 *
 * Two concerns, one harness:
 *
 * 1. [BUG-CALLBACK-NOT-IDEMPOTENT] (verify Test 9): the magic-link callback
 *    re-runs on every click. A user with a prior partial signup already has an
 *    ACTIVE consent row for (user_id, 'free'); the consent INSERT then violates
 *    the partial unique index `consent_user_product_active_idx` (mig 002) —
 *    SQLSTATE 23505. The fix treats a 23505 ON THE CONSENT INSERT as idempotent
 *    success; a 23505 anywhere else must STILL surface as `/?error=signup`.
 *
 * 2. [GAP-CALLBACK-INCOMPLETE-SESSION-REPORTE-404] (Ola 2.6): a returning user
 *    (reused email) whose claimed anonymous session is INCOMPLETE has no
 *    `report_snapshot`; the old code redirected to `/reporte/<id>` regardless,
 *    which throws in composeReport -> notFound() (a 404). The fix gates the
 *    /reporte redirect on the snapshot's ACTUAL presence and otherwise falls
 *    through to the guided-journey routing (resume the pending test / show the
 *    4-stop map), never a 404.
 *
 * Harness note: the route consumes verifyOtp(token_hash) (Plan 02-21 rewrite),
 * so this drives GET with `?token_hash=...` and mocks `verifyOtp` — NOT the
 * legacy `exchangeCodeForSession`/`?code=` (which this file mocked before Ola
 * 2.6 and which had silently gone red against the rewritten route).
 *
 * Anchors:
 *  - app/auth/callback/route.ts (step 6 consent insert; step 10 redirect gate).
 *  - lib/free/free-close.ts:89-96 (the report_snapshot presence check mirrored here).
 *  - supabase/migrations/002_user_data.sql:123 (partial unique index).
 */
// @vitest-environment node
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const state = vi.hoisted(() => ({
	consentInsertResult: { error: null } as { error: unknown },
	claimCalls: 0,
	scoreResult: { ok: true } as { ok: boolean; error?: string },
	scoreThrows: false,
	// Ola 2.6: does a report_snapshot exist for the claimed session?
	snapshotRow: { id: "snap-1" } as { id: string } | null,
	// Guided-journey routing inputs (used only on the no-snapshot fall-through).
	orderedCodes: ["BFI-2-S", "ONET-IP-SF"] as string[],
	completedRows: [] as Array<{
		instrument_version: { instrument: { code: string } } | null;
	}>,
	nextPos: { allComplete: false, nextCode: "ONET-IP-SF" } as {
		allComplete: boolean;
		nextCode: string | null;
	},
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

vi.mock("@/lib/scoring/score-session", () => ({
	scoreSession: vi.fn(async () => {
		if (state.scoreThrows) throw new Error("scoring blew up");
		return state.scoreResult;
	}),
}));

vi.mock("@/lib/free/next-test", () => ({
	loadFreeOrderedCodes: vi.fn(async () => state.orderedCodes),
	resolveNextFreeTest: vi.fn(() => state.nextPos),
}));

const USER_ID = "11111111-1111-1111-1111-111111111111";
const SESSION_ID = "22222222-2222-2222-2222-222222222222";

vi.mock("@/lib/supabase/server", () => ({
	getSupabaseServerClient: vi.fn(async () => ({
		auth: {
			// Route uses verifyOtp(token_hash), NOT exchangeCodeForSession.
			verifyOtp: vi.fn(async () => ({
				data: {
					user: {
						id: USER_ID,
						email: "gervel33@example.com",
						user_metadata: {
							dob_pending: "1990-01-01",
							country_pending: "CO",
							consent_general_pending: true,
							consent_sensitive_pending: true,
							session_id_pending: SESSION_ID,
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
	getSupabaseAdminClient: vi.fn(() => {
		const resultFor = (table: string) => {
			if (table === "report_snapshot")
				return { data: state.snapshotRow, error: null };
			if (table === "assessment_session")
				return { data: state.completedRows, error: null };
			return { data: null, error: null };
		};
		// Flexible PostgREST-ish builder: select/eq/order return the (thenable)
		// chain so `await ...eq()` resolves to resultFor(table); maybeSingle and
		// insert/upsert terminate directly.
		const from = (table: string) => {
			const chain = {
				upsert: vi.fn(async () => ({ error: null })),
				insert: vi.fn(async () =>
					table === "consent" ? state.consentInsertResult : { error: null },
				),
				select: vi.fn(() => chain),
				eq: vi.fn(() => chain),
				order: vi.fn(() => chain),
				maybeSingle: vi.fn(async () => resultFor(table)),
				// biome-ignore lint/suspicious/noThenProperty: deliberate thenable mock of a PostgREST query builder — `await chain` (no terminal method, e.g. the completed-codes .eq().eq()) must resolve to resultFor(table).
				then: (resolve: (v: unknown) => unknown) => resolve(resultFor(table)),
			};
			return chain;
		};
		return {
			from,
			auth: {
				admin: {
					updateUserById: vi.fn(async () => ({ data: {}, error: null })),
				},
			},
		};
	}),
}));

async function invokeCallback(): Promise<Response> {
	const { GET } = await import("@/app/auth/callback/route");
	const req = new Request(
		"https://preview.test/auth/callback?token_hash=validhash&type=email",
	);
	return GET(req);
}

beforeEach(() => {
	state.consentInsertResult = { error: null };
	state.claimCalls = 0;
	state.scoreResult = { ok: true };
	state.scoreThrows = false;
	state.snapshotRow = { id: "snap-1" };
	state.completedRows = [];
	state.orderedCodes = ["BFI-2-S", "ONET-IP-SF"];
	state.nextPos = { allComplete: false, nextCode: "ONET-IP-SF" };
});

afterEach(() => {
	vi.clearAllMocks();
});

describe("/auth/callback — consent idempotency ([BUG-CALLBACK-NOT-IDEMPOTENT])", () => {
	test("happy path: clean consent + snapshot exists -> /reporte/<sessionId>", async () => {
		const res = await invokeCallback();
		expect(res.headers.get("location")).toContain(`/reporte/${SESSION_ID}`);
		expect(state.claimCalls).toBe(1);
	});

	test("idempotent: consent 23505 (active consent exists) + snapshot -> /reporte, NOT /?error=signup", async () => {
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

describe("/auth/callback — incomplete session redirect ([GAP-CALLBACK-INCOMPLETE-SESSION-REPORTE-404], Ola 2.6)", () => {
	test("incomplete session (no snapshot) resumes the pending test, NOT /reporte", async () => {
		// scoreSession could not score an incomplete session; no snapshot written.
		state.scoreResult = { ok: false, error: "session_incomplete" };
		state.snapshotRow = null;
		// A returning user who already finished one test resumes their next pending.
		state.completedRows = [
			{ instrument_version: { instrument: { code: "BFI-2-S" } } },
		];
		const res = await invokeCallback();
		const loc = res.headers.get("location") ?? "";
		expect(loc).not.toContain(`/reporte/${SESSION_ID}`);
		expect(loc).toContain("/test/ONET-IP-SF");
	});

	test("incomplete + scoreSession THROWS (no snapshot) still avoids /reporte, not /?error=signup", async () => {
		state.scoreThrows = true;
		state.snapshotRow = null;
		state.completedRows = [
			{ instrument_version: { instrument: { code: "BFI-2-S" } } },
		];
		const res = await invokeCallback();
		const loc = res.headers.get("location") ?? "";
		expect(loc).not.toContain(`/reporte/${SESSION_ID}`);
		// Best-effort: a scoring failure is NOT an auth error.
		expect(loc).not.toContain("error=signup");
	});

	test("fresh signup, incomplete session (no snapshot) -> /onboarding/mapa, NOT /reporte", async () => {
		state.snapshotRow = null;
		state.completedRows = []; // no test completed yet
		const res = await invokeCallback();
		const loc = res.headers.get("location") ?? "";
		expect(loc).not.toContain("/reporte/");
		expect(loc).toContain("/onboarding/mapa");
	});
});
