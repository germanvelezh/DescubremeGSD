import { expect, test } from "@playwright/test";
/**
 * Magic link E2E — sent screen UI contract + the token_hash/verifyOtp callback
 * oracle (Plan 01-07 Task 3 scaffold; Plan 02-21 Tasks 2-3 wire the real flow).
 *
 * UI-contract (env-free, pin the discriminator + MICROCOPY §6 copy):
 *  1. Default state shows the email + "Te enviamos el enlace" heading + resend
 *     DISABLED on load (blueprint §7.3.1: "habilitado a los 30 s", no visible
 *     countdown).
 *  2. `?error=expired` shows the expired heading.
 *  3. `?error=invalid` shows the invalid heading.
 *
 * Real-flow (guarded by hasLocalAuth(); skips cleanly when the local stack env
 * is absent — these dispatch a REAL Supabase send / hit the REAL callback and
 * MUST never run against a remote/prod project, mirroring real-auth.ts):
 *  4. Resend button: it starts disabled for 30s (§7.3.1), then enables; clicking
 *     fires the REAL resendMagicLinkAction and shows the §6 confirmation "Listo,
 *     enviamos uno nuevo." only on a confirmed send (Gap C — no cosmetic timer).
 *  5. The Gap-B ORACLE: generateLink(magiclink) -> drive
 *     `/auth/callback?token_hash=...&type=email` -> assert the callback ACTIVATED
 *     the session (sb-<ref>-auth-token cookie present) and did NOT bounce to
 *     error=expired / error=age. This pre-verifies the rewritten callback BEFORE
 *     German edits the PROD email templates (Task 4 checkpoint). It deliberately
 *     does NOT reuse loginAsNewUser (that verifies in-process and injects a
 *     cookie — it never hits the route, so it would go green testing nothing).
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.5; 01-CONTEXT.md D2.6.
 *  - app/auth/callback/route.ts (the verifyOtp consumer driven here).
 *  - tests/e2e/fixtures/real-auth.ts:104-118 (the generateLink->verifyOtp
 *    pattern this reuses; "verified empirically in 02-13").
 */
import { createClient } from "@supabase/supabase-js";

import { hasLocalAuth } from "./fixtures/real-auth";

/** The @supabase/ssr session cookie name for the local URL (ref before first dot). */
function localCookieName(): string {
	const host = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").hostname;
	return `sb-${host.split(".")[0]}-auth-token`;
}

test.describe("magic-link — sent + resend + error states", () => {
	test("default state shows sent heading + resend disabled on load (§7.3.1)", async ({
		page,
	}) => {
		await page.goto("/magic-link/sent?email=dev@example.com");

		await expect(
			page.getByRole("heading", { name: /te enviamos el enlace/i }),
		).toBeVisible();
		await expect(page.getByText(/dev@example\.com/)).toBeVisible();

		// Disabled on load — enables after a 30s cooldown, with NO visible
		// countdown (blueprint §7.3.1 guardrail "sin cuenta regresiva visible").
		const resend = page.getByRole("button", { name: /reenviar enlace/i });
		await expect(resend).toBeDisabled();
		await expect(page.getByText(/\d+s/)).toHaveCount(0);
	});

	test("expired state shows expired heading", async ({ page }) => {
		await page.goto("/magic-link/sent?error=expired");
		await expect(
			page.getByRole("heading", { name: /ese enlace ya expiró/i }),
		).toBeVisible();
	});

	test("invalid state shows invalid heading", async ({ page }) => {
		await page.goto("/magic-link/sent?error=invalid");
		await expect(
			page.getByRole("heading", { name: /ese enlace no es válido/i }),
		).toBeVisible();
	});
});

test.describe("magic-link — real flow (local stack only)", () => {
	test.skip(
		!hasLocalAuth(),
		"needs the local Supabase stack (E2E_LOCAL=1 + local URL/keys)",
	);

	test("resend button dispatches a real link and shows the confirmation on success", async ({
		page,
	}) => {
		// Gap C: the click fires the REAL resendMagicLinkAction (no cosmetic timer).
		// Use a FRESH email so a per-email rate limit (429) cannot turn a genuine
		// send into the rate-limit branch — that keeps this honestly green about the
		// success path. The §6 confirmation proves the send succeeded.
		//
		// The button starts DISABLED for 30s (blueprint §7.3.1: "habilitado a los
		// 30 s"), so wait for it to enable before clicking (generous timeout past the
		// cooldown window).
		const email = `e2e-resend-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
		await page.goto(`/magic-link/sent?email=${encodeURIComponent(email)}`);

		const resend = page.getByRole("button", { name: /reenviar enlace/i });
		await expect(resend).toBeEnabled({ timeout: 35_000 });
		await resend.click();

		await expect(page.getByText(/listo, enviamos uno nuevo/i)).toBeVisible();
		await expect(resend).toBeDisabled();
	});

	test("resend (signInWithOtp without data) PRESERVES the prior pending metadata", async () => {
		// The load-bearing Gap-C contract: resendMagicLinkAction OMITS options.data
		// so the original signup's dob_pending/consent_*_pending survive. If a second
		// signInWithOtp instead RESET user_metadata, the resent link would bounce to
		// /?error=age at the callback's step-3 re-validation — i.e. "Reenviar enlace"
		// would ship a link that does not work. This asserts GoTrue's actual behavior
		// (version-specific) rather than assuming it. Pure Supabase API — no route.
		const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
		const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
		const service = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
		const admin = createClient(url, service, {
			auth: { autoRefreshToken: false, persistSession: false },
		});
		const anonClient = createClient(url, anon, {
			auth: { autoRefreshToken: false, persistSession: false },
		});

		const email = `e2e-meta-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;

		// Create the user with the SAME pending metadata the original signup writes.
		const { data: created, error: createErr } =
			await admin.auth.admin.createUser({
				email,
				email_confirm: false,
				user_metadata: {
					dob_pending: "1990-01-01",
					country_pending: "CO",
					consent_general_pending: true,
					consent_sensitive_pending: true,
					session_id_pending: null,
				},
			});
		if (createErr || !created.user?.id) {
			throw new Error(`createUser failed: ${createErr?.message ?? "no user"}`);
		}

		// Exactly what resendMagicLinkAction does: signInWithOtp with NO `data`.
		const { error: otpErr } = await anonClient.auth.signInWithOtp({
			email,
			options: { shouldCreateUser: true },
		});
		if (otpErr) throw new Error(`signInWithOtp failed: ${otpErr.message}`);

		// Assert the pending metadata SURVIVED the resend (not clobbered to null).
		const { data: after, error: getErr } = await admin.auth.admin.getUserById(
			created.user.id,
		);
		if (getErr || !after.user) {
			throw new Error(`getUserById failed: ${getErr?.message ?? "no user"}`);
		}
		const meta = after.user.user_metadata ?? {};
		expect(meta.dob_pending, "dob_pending preserved after resend").toBe(
			"1990-01-01",
		);
		expect(
			meta.consent_general_pending,
			"consent_general_pending preserved after resend",
		).toBe(true);
	});

	test("generateLink -> /auth/callback?token_hash activates the session (Gap B oracle)", async ({
		page,
		context,
	}) => {
		const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
		const service = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
		const admin = createClient(url, service, {
			auth: { autoRefreshToken: false, persistSession: false },
		});

		const email = `e2e-cb-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;

		// 1. Mint a magiclink hash for a FRESH user (the ambiguous new-user path).
		const { data: link, error: linkErr } = await admin.auth.admin.generateLink({
			type: "magiclink",
			email,
		});
		if (linkErr || !link.user?.id || !link.properties?.hashed_token) {
			throw new Error(`generateLink failed: ${linkErr?.message ?? "no token"}`);
		}

		// 2. Seed pending metadata BEFORE driving the callback. A bare generateLink
		//    user has empty user_metadata -> the callback's step-3 re-validation
		//    (!dob_pending || !isAtLeast18) signs out + bounces to /?error=age
		//    BEFORE the verifyOtp swap can be observed. verifyOtp reads the user row
		//    fresh at verify time, so this update is reflected. session_id_pending
		//    is null so the redirect target is `next` (/), not /reporte/{id}.
		const { error: updErr } = await admin.auth.admin.updateUserById(
			link.user.id,
			{
				user_metadata: {
					dob_pending: "1990-01-01",
					country_pending: "CO",
					consent_general_pending: true,
					consent_sensitive_pending: true,
					session_id_pending: null,
				},
			},
		);
		if (updErr) throw new Error(`updateUserById failed: ${updErr.message}`);

		// 3. Feed the hashed_token straight to the route (do NOT pre-verifyOtp it —
		//    it is single-use; consuming it would make the callback's verifyOtp fail
		//    and look like the fix is broken).
		// 4. Drive the REAL route.
		await page.goto(
			`/auth/callback?token_hash=${link.properties.hashed_token}&type=email`,
		);

		// 5a. NEGATIVE: the callback did NOT bounce to an error discriminator.
		await expect(page).not.toHaveURL(
			/error=(expired|age|consent|signup|invalid)/,
		);

		// 5b. POSITIVE: the callback ACTIVATED the session. "/" alone proves nothing
		//     (it is public) — assert the @supabase/ssr session cookie was written,
		//     the real auth signal real-auth.ts relies on.
		const cookies = await context.cookies();
		const authCookie = cookies.find((c) => c.name === localCookieName());
		expect(authCookie, "session cookie set by /auth/callback").toBeTruthy();
		expect(authCookie?.value ?? "").not.toBe("");
	});
});
