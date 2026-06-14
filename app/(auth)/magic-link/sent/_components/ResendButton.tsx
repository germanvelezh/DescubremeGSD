/**
 * ResendButton — Client Component (Plan 02-21 Task 2, Gap C).
 *
 * Dispatches a REAL new magic link via `resendMagicLinkAction` and starts the
 * 60s cooldown ONLY on success. The Phase-1 version only ran a cosmetic
 * countdown and sent no email (Gap C). The server-side per-email rate limit is
 * the source of truth for abuse; this UI surfaces it (rate-limit copy) and
 * keeps a short pending state so a double-click cannot double-send.
 *
 * Anchors:
 *  - app/(auth)/magic-link/actions.ts (resendMagicLinkAction).
 *  - 01-UI-SPEC.md §7.5.
 *  - 01-CONTEXT.md D2.6.
 */
"use client";

import { useEffect, useState, useTransition } from "react";

import { resendMagicLinkAction } from "@/app/(auth)/magic-link/actions";
import { magicLink } from "@/lib/i18n/microcopy/es-CO/magic-link";

const COOLDOWN_SECONDS = 60;

type ResendStatus = "idle" | "rate-limited" | "error";

export function ResendButton({ email }: { email: string }) {
	const [remaining, setRemaining] = useState(0);
	const [status, setStatus] = useState<ResendStatus>("idle");
	const [isPending, startTransition] = useTransition();

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
				// Countdown starts ONLY on a confirmed send (Gap C: no cosmetic timer).
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
			{remaining > 0 ? (
				<p className="text-xs text-text-secondary">
					{magicLink.MC_MAGIC_COOLDOWN(remaining)}
				</p>
			) : status === "rate-limited" ? (
				<p className="text-xs text-text-secondary">
					{magicLink.MC_MAGIC_RATELIMIT_BODY}
				</p>
			) : status === "error" ? (
				<p className="text-xs text-text-secondary">
					{magicLink.MC_MAGIC_EXPIRED_BODY}
				</p>
			) : null}
		</div>
	);
}
