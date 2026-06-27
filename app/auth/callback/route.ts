import type { EmailOtpType } from "@supabase/supabase-js";
/**
 * /auth/callback — Magic-link callback Route Handler (Plan 02-21 Task 1).
 *
 * Sequence:
 *  1. Read `token_hash` + `type` (Supabase token-hash flow) from search params;
 *     if `token_hash` is absent → redirect to `/magic-link/sent?error=invalid`.
 *  2. `verifyOtp({ token_hash, type })` → resolves the auth user. Unlike the
 *     prior PKCE `exchangeCodeForSession`, verifyOtp does NOT consume a
 *     `code_verifier` cookie, so the link is browser-independent: it activates
 *     the session on the first click from any browser / window / device
 *     (closes Gap B — the cross-browser "expired" false-positive).
 *  3. Re-validate the DOB (T-01-07-02 / T-02-21-01: user could have tampered
 *     metadata between signup and callback). If <18 → sign out + redirect to
 *     `/?error=age`.
 *  4. Encrypt DOB with AAD=`user_id:<user.id>` via `lib/crypto/pii.ts`.
 *  5. INSERT/UPSERT into `public.user` (id, email, country, encrypted DOB
 *     ciphertext + DEK ciphertext).
 *  6. INSERT consent row with D1.6 metadata: `consent_version='1.0.0'`,
 *     `text_sha256_hash` from `getConsentTextHash`, `ip_truncated` (last
 *     octet zero for IPv4), `user_agent` from req header.
 *  7. `claimAnonymousSession(user.id)` (FOUND-08).
 *  8. `writeAudit({actor_id: user.id, action: 'consent_granted', ...})`.
 *  9. Clear `*_pending` user_metadata.
 * 10. Redirect to `/reporte/${session.id}` (placeholder page until Plan 01-09).
 *
 * Error modes:
 *  - `token_hash` missing/empty → redirect with `error=invalid` (the link was
 *    never present or got truncated on copy).
 *  - verifyOtp returns error / no user → redirect with `error=expired` (the
 *    hash is stale, already consumed, or otherwise rejected by GoTrue). The
 *    missing-vs-failed split preserves the invalid/expired discriminator.
 *  - DOB re-validation fails → redirect with `error=age`.
 *  - DB writes fail → redirect with `error=signup`.
 *
 * NOTE: this consumes the token_hash flow, which requires the PROD email
 * templates to emit `{{ .TokenHash }}` (link href
 * `{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=email`) on
 * BOTH the "Magic Link" and "Confirm signup" templates — German's dashboard
 * action (Plan 02-21 Task 4 checkpoint).
 *
 * Anchors:
 *  - 01-RESEARCH.md §1 (magic-link), §7 (consent), §5 (claim).
 *  - 01-CONTEXT.md D2.1, D2.6, D1.6.
 *  - 01-PATTERNS.md row 7 (server-only DOB age check).
 */
import { NextResponse } from "next/server";

import { writeAudit } from "@/lib/audit/writer";
import { isAtLeast18 } from "@/lib/auth/age-check";
import { getConsentTextHash } from "@/lib/consent/versions";
import { encryptPII } from "@/lib/crypto/pii";
import { loadFreeOrderedCodes, resolveNextFreeTest } from "@/lib/free/next-test";
import { logger } from "@/lib/logger";
import { scoreSession } from "@/lib/scoring/score-session";
import { claimAnonymousSession } from "@/lib/session/claim";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

export const runtime = "nodejs";

const CONSENT_VERSION = "1.0.0";
const PRODUCT_CODE = "free";

// biome-ignore lint/suspicious/noExplicitAny: see lib/session/anonymous.ts
type AnyBuilder = any;

/**
 * Validate the `next` query param is a same-origin internal path.
 *
 * Rejects:
 *  - null / empty
 *  - absolute URLs (`https://evil.com/...`)
 *  - protocol-relative URLs (`//evil.com/...`)
 *  - backslash-escaped variants (`/\evil.com`) which some browsers normalize
 *
 * Without this guard, `new URL(next, base)` would resolve `//evil.com` to a
 * different origin and turn the magic-link callback into an Open Redirect
 * (post-auth phishing vector).
 */
export function safeNextPath(next: string | null | undefined): string {
	if (!next || typeof next !== "string") return "/";
	if (
		!next.startsWith("/") ||
		next.startsWith("//") ||
		next.startsWith("/\\")
	) {
		return "/";
	}
	return next;
}

/** Truncate IPv4 to /24 (last octet -> 0) or IPv6 to /48. */
function truncateIp(ip: string | null): string | null {
	if (!ip) return null;
	if (ip.includes(".")) {
		const parts = ip.split(".");
		if (parts.length === 4) {
			parts[3] = "0";
			return parts.join(".");
		}
		return ip;
	}
	if (ip.includes(":")) {
		const parts = ip.split(":");
		return `${parts.slice(0, 3).join(":")}::/48`;
	}
	return ip;
}

export async function GET(request: Request) {
	const url = new URL(request.url);
	const tokenHash = url.searchParams.get("token_hash");
	// `type` is author-controlled in the email template; the template emits
	// `&type=email`. Do NOT whitelist to a closed set — EmailOtpType is broader
	// than the docs summarize, and verifyOtp validates the hash regardless of the
	// declared type (T-02-21-03). Default to "email" so a stray missing-type does
	// not silently fall into the expired branch.
	const type = (url.searchParams.get("type") ?? "email") as EmailOtpType;
	const next = safeNextPath(url.searchParams.get("next"));

	if (!tokenHash) {
		return NextResponse.redirect(
			new URL("/magic-link/sent?error=invalid", url),
		);
	}

	const supabase = await getSupabaseServerClient();
	// verifyOtp is browser-independent (no code_verifier cookie) — this is the
	// Gap B fix. Returns the same `user` (with the same `user_metadata`) as the
	// prior exchangeCodeForSession, so steps 3-10 round-trip identically.
	const { data: verified, error: verifyErr } = await supabase.auth.verifyOtp({
		token_hash: tokenHash,
		type,
	});

	if (verifyErr || !verified?.user) {
		logger.warn({ err: verifyErr?.message }, "magic_link_verify_failed");
		return NextResponse.redirect(
			new URL("/magic-link/sent?error=expired", url),
		);
	}

	const user = verified.user;
	const metadata = (user.user_metadata ?? {}) as {
		dob_pending?: string;
		country_pending?: string;
		consent_general_pending?: boolean;
		consent_sensitive_pending?: boolean;
		session_id_pending?: string | null;
	};

	// T-01-07-02: re-validate DOB server-side at callback time.
	if (!metadata.dob_pending || !isAtLeast18(metadata.dob_pending)) {
		await supabase.auth.signOut();
		return NextResponse.redirect(new URL("/?error=age", url));
	}
	if (!metadata.consent_general_pending) {
		await supabase.auth.signOut();
		return NextResponse.redirect(new URL("/?error=consent", url));
	}

	const admin = getSupabaseAdminClient();

	// Step 4-5: encrypt DOB + upsert public.user.
	try {
		const aad = `user_id:${user.id}`;
		const encDob = await encryptPII(metadata.dob_pending, aad);
		const country = metadata.country_pending ?? "CO";

		const userPayload = {
			id: user.id,
			email: user.email ?? "",
			country_code: country,
			// mig 011 (Plan 01-12): persist the full EncryptedField envelope
			// verbatim in a single jsonb column. Closes
			// [BUG-PII-STORAGE-PLAN-07] (ADR-009 §9.4) — decryptPII can now
			// round-trip end-to-end.
			date_of_birth_encrypted: encDob,
		};
		const { error: upsertErr } = await (
			admin.from("user") as AnyBuilder
		).upsert(userPayload, { onConflict: "id" });
		if (upsertErr) {
			throw new Error(`user upsert: ${upsertErr.message}`);
		}

		// Step 6: INSERT consent row.
		const headers = request.headers;
		const ipHeader =
			headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
			headers.get("x-real-ip") ??
			null;
		const ipTruncated = truncateIp(ipHeader);
		const userAgent = headers.get("user-agent") ?? null;
		const textHash = getConsentTextHash(CONSENT_VERSION);

		const consentPayload = {
			user_id: user.id,
			product_code: PRODUCT_CODE,
			consent_version: CONSENT_VERSION,
			text_sha256_hash: textHash,
			consent_general: true,
			consent_sensitive_data: Boolean(metadata.consent_sensitive_pending),
			ip_truncated: ipTruncated,
			user_agent: userAgent,
			locale: "es-CO",
		};
		const { error: consentErr } = await (
			admin.from("consent") as AnyBuilder
		).insert(consentPayload);
		// Idempotency ([BUG-CALLBACK-NOT-IDEMPOTENT]): the callback re-runs on
		// every magic-link click. If the user already has an active consent for
		// this product (a prior partial signup), the INSERT violates the partial
		// unique index `consent_user_product_active_idx (user_id, product_code)
		// WHERE revoked_at IS NULL` (mig 002) -> SQLSTATE 23505. That is the only
		// unique index on `consent`, so a 23505 here can ONLY mean "an active
		// consent already exists" — treat it as success and proceed. A 23505 from
		// any other step (notably the claim's item_response (user_id, item_id)
		// index) is NOT swallowed: it surfaces through the outer catch as
		// /?error=signup. NOTE: same-version idempotency only — the partial index
		// ignores consent_version, so a future version bump needs an explicit
		// re-consent path (tracked in BACKLOG, not handled here).
		if (consentErr && consentErr.code !== "23505") {
			throw new Error(`consent insert: ${consentErr.message}`);
		}

		// Step 7: claim anonymous session.
		await claimAnonymousSession(user.id);

		// Step 8: audit log.
		await writeAudit(admin, {
			actor_id: user.id,
			actor_role: "authenticated",
			action: "consent_granted",
			entity_type: "consent",
			entity_id: PRODUCT_CODE,
			meta: {
				version: CONSENT_VERSION,
				ip_truncated: ipTruncated,
				user_agent: userAgent,
			},
		});

		// Step 9: clear pending metadata.
		await admin.auth.admin.updateUserById(user.id, {
			user_metadata: {
				dob_pending: null,
				country_pending: null,
				consent_general_pending: null,
				consent_sensitive_pending: null,
				session_id_pending: null,
			},
		});

		// Step 9.5: generate the report snapshot now that the session is claimed
		// (user_id is set). The /reporte page reads this snapshot; without it the
		// user lands on a 404 ([GAP-REPORT-SCORING-NOT-TRIGGERED]). BEST-EFFORT:
		// a scoring failure must NEVER break the auth flow, so it runs in its own
		// try/catch and only logs. An incomplete session returns ok:false here and
		// the user simply gets no report yet — correct behavior, not an auth error.
		const sessionId = metadata.session_id_pending;
		if (sessionId) {
			try {
				const scored = await scoreSession(admin, sessionId);
				if (!scored.ok) {
					logger.warn(
						{ session_id: sessionId, reason: scored.error },
						"callback_score_session_not_ok",
					);
				}
			} catch (scoreErr) {
				logger.error(
					{
						session_id: sessionId,
						err:
							scoreErr instanceof Error ? scoreErr.message : String(scoreErr),
					},
					"callback_score_session_threw",
				);
			}
		}

		// Step 10: redirect.
		if (sessionId) {
			// Back-compat: a pre-signup anonymous session → its scored report.
			return NextResponse.redirect(new URL(`/reporte/${sessionId}`, url));
		}
		// An explicit, safe deep-link still wins (back-compat). A defaulted
		// next ("/") does NOT — a freshly-authenticated Free user enters the
		// guided journey, not the marketing landing (ADR-029, funnel invertido).
		// The stop is the first PENDING test (resolveNextFreeTest over the user's
		// completed codes), so a returning magic-link login lands on their next
		// test, never a finished one. Signup already succeeded above, so a
		// routing-query failure must NOT surface as /?error=signup — it falls
		// back to `next`.
		if (next !== "/") {
			return NextResponse.redirect(new URL(next, url));
		}
		try {
			const orderedCodes = await loadFreeOrderedCodes(admin);
			if (orderedCodes.length > 0) {
				const { data: completedRows } = await admin
					.from("assessment_session")
					.select("instrument_version!inner(instrument!inner(code))")
					.eq("user_id", user.id)
					.eq("status", "completed");
				const completedCodes = (
					(completedRows ?? []) as unknown as Array<{
						instrument_version: { instrument: { code: string } } | null;
					}>
				)
					.map((r) => r.instrument_version?.instrument?.code)
					.filter((c): c is string => typeof c === "string" && c.length > 0);
				const pos = resolveNextFreeTest(orderedCodes, completedCodes);
				if (!pos.allComplete && pos.nextCode) {
					return NextResponse.redirect(
						new URL(`/test/${pos.nextCode}`, url),
					);
				}
				// All four complete → the integrated-profile teaser (D-A.6).
				return NextResponse.redirect(new URL("/perfil-integrado", url));
			}
		} catch (routeErr) {
			logger.warn(
				{ err: routeErr instanceof Error ? routeErr.message : String(routeErr) },
				"callback_free_route_failed",
			);
		}
		// Defensive: product_stack unseeded / routing failed → safe default.
		return NextResponse.redirect(new URL(next, url));
	} catch (e) {
		logger.error(
			{ err: e instanceof Error ? e.message : String(e) },
			"callback_signup_failed",
		);
		return NextResponse.redirect(new URL("/?error=signup", url));
	}
}
