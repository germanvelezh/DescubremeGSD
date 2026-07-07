/**
 * `resendMagicLinkAction` — Server Action for the "Reenviar enlace" button
 * (Plan 02-21 Task 2, Gap C; copy es-CO §6, Ola 2.5).
 *
 * The Phase-1 ResendButton ran a 60s cooldown but sent NOTHING — the action it
 * referenced was never implemented. This dispatches a REAL new magic link via
 * `signInWithOtp`, mirroring the signup action's `emailRedirectTo` so the
 * resent link is the same kind the rewritten `/auth/callback` now consumes via
 * `verifyOtp(token_hash)` (Task 1).
 *
 * Metadata DECISION (load-bearing): we OMIT `options.data` on resend. The user
 * is mid-signup on /magic-link/sent; the original signup already wrote
 * `dob_pending` / `consent_*_pending` / `session_id_pending` to the auth user's
 * `user_metadata`, but that state is NOT available in this action. A second
 * `signInWithOtp` with `data: {}` (or nulls) would CLOBBER the existing pending
 * metadata, and the callback's step-3 DOB+consent re-validation would then
 * bounce the resent link to `/?error=age`. Omitting `data` leaves the prior
 * pending metadata untouched, so the resent link completes the signup exactly
 * like the first one.
 *
 * Abuse control (T-02-21-02): Supabase's per-email resend rate limit (429) is
 * surfaced via the existing rate-limit copy; the email is Zod-validated at the
 * boundary and the action does not loop.
 *
 * Anchors:
 *  - app/(auth)/signup/actions.ts:101-121 (the emailRedirectTo shape mirrored here).
 *  - app/auth/callback/route.ts (the verifyOtp consumer the link targets).
 *  - 01-CONTEXT.md D2.6 (resend UX + rate limit).
 */
"use server";

import { z } from "zod";

import { logger } from "@/lib/logger";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const EmailSchema = z.string().trim().toLowerCase().email();

export type ResendMagicLinkResult =
	| { ok: true }
	| { ok: false; rateLimited: true }
	| { ok: false };

export async function resendMagicLinkAction(
	email: string,
): Promise<ResendMagicLinkResult> {
	const parsed = EmailSchema.safeParse(email);
	if (!parsed.success) {
		return { ok: false };
	}

	const supabase = await getSupabaseServerClient();
	const { error } = await supabase.auth.signInWithOtp({
		email: parsed.data,
		options: {
			shouldCreateUser: true,
			// Same absolute callback URL as signup (signup/actions.ts:112). Strip
			// trailing slashes so a value like "https://www.descubreme.co/" does not
			// produce a double slash.
			emailRedirectTo: `${(process.env.NEXT_PUBLIC_APP_URL ?? "").replace(/\/+$/, "")}/auth/callback`,
			// NO `data` — preserve the original signup's pending metadata (see file
			// docstring; clobbering it would trip the callback's DOB re-validation).
		},
	});

	if (error) {
		// Per-email resend rate limit: GoTrue returns 429 (status) and a
		// rate-limit error code/message. Surface the existing rate-limit copy
		// rather than a generic error so the user sees a calm "try again soon".
		const isRateLimited =
			error.status === 429 ||
			error.code === "over_email_send_rate_limit" ||
			/rate limit/i.test(error.message);
		if (isRateLimited) {
			logger.warn(
				{ code: error.code, status: error.status },
				"resend_magic_link_rate_limited",
			);
			return { ok: false, rateLimited: true };
		}
		logger.error(
			{ code: error.code, status: error.status, message: error.message },
			"resend_magic_link_failed",
		);
		return { ok: false };
	}

	return { ok: true };
}
