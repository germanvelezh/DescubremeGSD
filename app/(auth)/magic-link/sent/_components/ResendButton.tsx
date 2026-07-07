/**
 * ResendButton — Client Component (Plan 02-21 Task 2, Gap C; Ola 2.5).
 *
 * Dispatches a REAL new magic link via `resendMagicLinkAction`. Design contract
 * (MICROCOPY §6 / BLUEPRINT §7.3.1):
 *  - The button is DISABLED for `initialCooldownSeconds` and then ENABLES
 *    ("habilitado a los 30 s"). NO visible countdown — blueprint §7.3.1 guardrail
 *    "sin cuenta regresiva visible (ansiedad)": the button is simply disabled,
 *    then enabled. On the normal sent screen the initial cooldown is 30s (a link
 *    was already sent at signup, so an instant resend would just double-send);
 *    on the expired screen it is 0 (the old link is dead — resend right away).
 *  - On a confirmed send it shows the §6 confirmation "Listo, enviamos uno
 *    nuevo." and re-enters the 30s cooldown.
 *  - The per-email rate limit (server) is the source of truth for abuse; this UI
 *    surfaces it (rate-limit copy) and a pending state blocks double-clicks.
 *
 * It also stashes the email in sessionStorage so the expired state — whose
 * callback redirect carries no email — can recover it and offer a real resend
 * in the same browser (see ExpiredResend.tsx).
 *
 * Anchors:
 *  - app/(auth)/magic-link/actions.ts (resendMagicLinkAction).
 *  - MICROCOPY_ES-CO_SIGNOFF_v1.1 §6 / BLUEPRINT §7.3.1.
 *  - 01-CONTEXT.md D2.6.
 */
"use client";

import { useEffect, useState, useTransition } from "react";

import { resendMagicLinkAction } from "@/app/(auth)/magic-link/actions";
import { magicLink } from "@/lib/i18n/microcopy/es-CO/magic-link";

const COOLDOWN_SECONDS = 30;
/** sessionStorage key shared with ExpiredResend (email recovery on ?error=). */
export const MAGIC_EMAIL_KEY = "dm_magic_email";

export function ResendButton({
	email,
	initialCooldownSeconds = COOLDOWN_SECONDS,
}: {
	email: string;
	initialCooldownSeconds?: number;
}) {
	const [remaining, setRemaining] = useState(initialCooldownSeconds);
	const [sent, setSent] = useState(false);
	const [status, setStatus] = useState<"idle" | "rate-limited" | "error">(
		"idle",
	);
	const [isPending, startTransition] = useTransition();

	// Stash the email so the expired state (no email in its URL) can resend.
	useEffect(() => {
		try {
			sessionStorage.setItem(MAGIC_EMAIL_KEY, email);
		} catch {
			// sessionStorage can be unavailable (private mode / blocked) — degrade
			// silently; the expired state falls back to the /signup link.
		}
	}, [email]);

	// Cooldown tick — advances the disabled window WITHOUT rendering the number
	// (blueprint §7.3.1: no visible countdown).
	useEffect(() => {
		if (remaining <= 0) return;
		const t = setTimeout(() => setRemaining((s) => s - 1), 1000);
		return () => clearTimeout(t);
	}, [remaining]);

	const onResend = () => {
		if (remaining > 0 || isPending) return;
		setStatus("idle");
		startTransition(async () => {
			const result = await resendMagicLinkAction(email);
			if (result.ok) {
				setSent(true);
				setRemaining(COOLDOWN_SECONDS);
			} else if ("rateLimited" in result && result.rateLimited) {
				setStatus("rate-limited");
			} else {
				setStatus("error");
			}
		});
	};

	return (
		<div className="flex flex-col items-center gap-1">
			<button
				type="button"
				disabled={remaining > 0 || isPending}
				onClick={onResend}
				className="inline-flex h-10 items-center justify-center rounded-md border border-border-default px-4 font-medium text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
			>
				{magicLink.MC_MAGIC_SENT_CTA_RESEND}
			</button>
			{sent ? (
				<p className="text-sm font-medium text-success">
					{magicLink.MC_MAGIC_RESEND_CONFIRM}
				</p>
			) : status === "rate-limited" ? (
				<p className="text-xs text-text-secondary">
					{magicLink.MC_MAGIC_RATELIMIT_BODY}
				</p>
			) : status === "error" ? (
				<p className="text-xs text-text-secondary">
					{magicLink.MC_MAGIC_RESEND_ERROR}
				</p>
			) : null}
		</div>
	);
}
