/**
 * ExpiredResend — Client Component (Ola 2.5, MICROCOPY §6).
 *
 * The callback's `?error=expired|invalid` redirect carries NO email (at
 * verifyOtp-failure time there is no resolved user), so the error states cannot
 * offer a targeted resend from the URL alone. This recovers the email from
 * sessionStorage (stashed by ResendButton on the normal sent render, same
 * browser) to honor §6's "[ Reenviar enlace ]" on the expired state.
 *
 * Degrades gracefully: if the link was opened in a different browser/device
 * (sessionStorage empty) or storage is blocked, it renders nothing and the page
 * falls back to the "Pedir un nuevo enlace" -> /signup link.
 *
 * Resend here is enabled immediately (initialCooldownSeconds={0}): the previous
 * link already expired, so there is no recent send to debounce.
 */
"use client";

import { useEffect, useState } from "react";

import { MAGIC_EMAIL_KEY, ResendButton } from "./ResendButton";

export function ExpiredResend() {
	const [email, setEmail] = useState<string | null>(null);

	useEffect(() => {
		try {
			setEmail(sessionStorage.getItem(MAGIC_EMAIL_KEY));
		} catch {
			setEmail(null);
		}
	}, []);

	if (!email) return null;
	return <ResendButton email={email} initialCooldownSeconds={0} />;
}
