/**
 * /magic-link/sent — Magic-link confirmation screen (MICROCOPY §6 / blueprint
 * §7.3.1; Ola 2.5 reskin to paper "direction A").
 *
 * Reads `email` + optional `error` (`expired` | `invalid`) from search params
 * and renders the appropriate state per §6. The resend button is dispatched by
 * the Server Action `resendMagicLinkAction` (`../actions.ts`) and only appears
 * when an `email` is present.
 *
 * Constraint (Ola 2.5): the callback's expired/invalid redirect carries NO
 * email (at verifyOtp-failure time there is no resolved user), so the error
 * states cannot offer a targeted resend — they route the user back to `/signup`
 * to request a fresh link ("Pedir un nuevo enlace"). The 30s resend applies to
 * the normal sent state, where the email is known.
 *
 * Anchors:
 *  - MICROCOPY_ES-CO_SIGNOFF_v1.1 §6 / BLUEPRINT §7.3.1.
 *  - 01-CONTEXT.md D2.6 (resend UX + rate limit).
 */
import { ExpiredResend } from "./_components/ExpiredResend";
import { ResendButton } from "./_components/ResendButton";

import { magicLink } from "@/lib/i18n/microcopy/es-CO/magic-link";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function MagicLinkSentPage({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	const sp = await searchParams;
	const email = typeof sp.email === "string" ? sp.email : "";
	const error = typeof sp.error === "string" ? sp.error : null;

	const heading =
		error === "expired"
			? magicLink.MC_MAGIC_EXPIRED_HEADING
			: error === "invalid"
				? magicLink.MC_MAGIC_INVALID_HEADING
				: magicLink.MC_MAGIC_SENT_HEADING;

	const body =
		error === "expired"
			? magicLink.MC_MAGIC_EXPIRED_BODY
			: error === "invalid"
				? magicLink.MC_MAGIC_INVALID_BODY
				: magicLink.MC_MAGIC_SENT_BODY(email);

	const isSent = !error;

	return (
		<main className="dm-paper mx-auto flex min-h-[100dvh] max-w-md flex-col items-center justify-center gap-5 p-6 text-center">
			<h1 className="font-display text-3xl font-semibold text-text-primary motion-safe:animate-line-reveal">
				{heading}
			</h1>
			<p className="text-base text-text-secondary motion-safe:animate-fade-in [animation-delay:150ms]">{body}</p>

			{isSent ? (
				<p className="text-sm text-text-tertiary motion-safe:animate-fade-in [animation-delay:150ms]">
					{magicLink.MC_MAGIC_SENT_SECONDARY}
				</p>
			) : null}

			{email ? (
				<ResendButton email={email} />
			) : error ? (
				<ExpiredResend />
			) : null}

			{isSent ? (
				<p className="max-w-sm text-xs text-text-tertiary motion-safe:animate-fade-in [animation-delay:150ms]">
					{magicLink.MC_MAGIC_SENT_MICRO}
				</p>
			) : null}

			<a
				href="/signup"
				className="text-sm text-text-secondary underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-safe:animate-fade-in [animation-delay:150ms]"
			>
				{error
					? magicLink.MC_MAGIC_CTA_NEW_LINK
					: magicLink.MC_MAGIC_SENT_CTA_CHANGE}
			</a>
		</main>
	);
}
