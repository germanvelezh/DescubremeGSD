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

const PENDING_METADATA = {
	dob_pending: "1990-01-01",
	country_pending: "CO",
	consent_general_pending: true,
	consent_sensitive_pending: true,
	session_id_pending: "22222222-2222-2222-2222-222222222222",
};

const state = vi.hoisted(() => ({
	consentInsertResult: { error: null } as { error: unknown },
	claimCalls: 0,
	// user_metadata returned by verifyOtp. Pending = mid-signup; {} = a returning
	// user whose pending keys the callback already cleared (step 9).
	userMetadata: {} as Record<string, unknown>,
	// Active consent row for (user_id, 'free') — the returning-login gate.
	activeConsentRow: null as { id: string } | null,
	// Forces the consent lookup to fail (deny-by-default path).
	consentLookupError: null as { message: string } | null,
	// Side-effect counters: a returning LOGIN must not re-run the signup writes.
	consentInsertCalls: 0,
	userUpsertCalls: 0,
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
						user_metadata: state.userMetadata,
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
			if (table === "consent")
				return state.consentLookupError
					? { data: null, error: state.consentLookupError }
					: { data: state.activeConsentRow, error: null };
			return { data: null, error: null };
		};
		// Flexible PostgREST-ish builder: select/eq/order return the (thenable)
		// chain so `await ...eq()` resolves to resultFor(table); maybeSingle and
		// insert/upsert terminate directly.
		const from = (table: string) => {
			const chain = {
				upsert: vi.fn(async () => {
					if (table === "user") state.userUpsertCalls += 1;
					return { error: null };
				}),
				insert: vi.fn(async () => {
					if (table === "consent") {
						state.consentInsertCalls += 1;
						return state.consentInsertResult;
					}
					return { error: null };
				}),
				select: vi.fn(() => chain),
				eq: vi.fn(() => chain),
				is: vi.fn(() => chain),
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
	// Default harness = mid-signup (pending metadata present, no consent row yet).
	state.userMetadata = { ...PENDING_METADATA };
	state.activeConsentRow = null;
	state.consentLookupError = null;
	state.consentInsertCalls = 0;
	state.userUpsertCalls = 0;
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

describe("/auth/callback — returning login ([GAP-RETURNING-USER-RESIGNUP-AGE])", () => {
	// A user who already completed signup has NO pending metadata (step 9 cleared
	// it) and GoTrue silently DROPS `options.data` on signInWithOtp for an
	// existing user — so no resend and no re-signup can ever restore it. The DOB
	// re-validation then rejected every returning login with /?error=age: a total
	// lockout, reproduced in prod 2026-07-27.
	function asReturningUser() {
		state.userMetadata = {}; // step 9 cleared every *_pending key
		state.activeConsentRow = { id: "consent-1" }; // consent granted at signup
		state.snapshotRow = null; // no session_id_pending -> no /reporte redirect
	}

	test("returning user with active consent resumes their next pending test, NOT /?error=age", async () => {
		asReturningUser();
		state.completedRows = [
			{ instrument_version: { instrument: { code: "BFI-2-S" } } },
		];
		const res = await invokeCallback();
		const loc = res.headers.get("location") ?? "";
		expect(loc).not.toContain("error=age");
		expect(loc).toContain("/test/ONET-IP-SF");
	});

	test("returning user who finished the four tests lands on /perfil-integrado", async () => {
		asReturningUser();
		state.nextPos = { allComplete: true, nextCode: null };
		state.completedRows = [
			{ instrument_version: { instrument: { code: "BFI-2-S" } } },
			{ instrument_version: { instrument: { code: "ONET-IP-SF" } } },
		];
		const res = await invokeCallback();
		const loc = res.headers.get("location") ?? "";
		expect(loc).not.toContain("error=age");
		expect(loc).toContain("/perfil-integrado");
	});

	test("a login does NOT re-run the signup writes (no user upsert, no consent insert, no claim)", async () => {
		asReturningUser();
		state.completedRows = [
			{ instrument_version: { instrument: { code: "BFI-2-S" } } },
		];
		await invokeCallback();
		expect(state.userUpsertCalls).toBe(0);
		expect(state.consentInsertCalls).toBe(0);
		expect(state.claimCalls).toBe(0);
	});

	test("GATE: no pending metadata AND no active consent still rejects (never an unconsented entry)", async () => {
		state.userMetadata = {};
		state.activeConsentRow = null;
		const res = await invokeCallback();
		expect(res.headers.get("location")).toContain("error=age");
	});

	test("GATE: a consent LOOKUP FAILURE denies by default (no entry on a DB blip)", async () => {
		state.userMetadata = {};
		state.activeConsentRow = { id: "consent-1" }; // exists, but unreadable
		state.consentLookupError = { message: "connection reset" };
		const res = await invokeCallback();
		expect(res.headers.get("location")).toContain("error=age");
	});

	test("routing unavailable (product_stack unseeded) sends a login to /me/data, NOT the landing", async () => {
		asReturningUser();
		state.orderedCodes = []; // nothing to route against
		const res = await invokeCallback();
		const loc = res.headers.get("location") ?? "";
		expect(loc).toContain("/me/data");
		expect(new URL(loc).pathname).not.toBe("/");
	});
});
