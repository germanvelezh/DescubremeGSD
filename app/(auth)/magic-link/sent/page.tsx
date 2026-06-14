/**
 * /magic-link/sent — Magic-link confirmation screen (UI-SPEC §7.5).
 *
 * Reads `email` + optional `error` (`expired` | `invalid`) from search
 * params and renders the appropriate state per UI-SPEC §7.5 table.
 *
 * Resend is dispatched by the Server Action `resendMagicLinkAction`
 * (`../actions.ts`, wired Plan 02-21 Task 2): the button awaits it, starts the
 * countdown only on a confirmed send, and surfaces the per-email rate limit.
 * This page only renders the UI.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.5 (Magic-link sent).
 *  - 01-CONTEXT.md D2.6 (resend UX + rate limit).
 */
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

	return (
		<main className="mx-auto flex min-h-[100dvh] max-w-md flex-col items-center justify-center gap-6 p-6 text-center">
			<h1 className="text-3xl font-semibold text-text-primary">{heading}</h1>
			<p className="text-base text-text-secondary">{body}</p>

			{!error && email ? <ResendButton email={email} /> : null}

			<a
				href="/signup"
				className="text-sm text-text-secondary underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
			>
				{magicLink.MC_MAGIC_SENT_CTA_CHANGE}
			</a>
		</main>
	);
}
