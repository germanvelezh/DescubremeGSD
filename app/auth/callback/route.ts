/**
 * /auth/callback — Magic-link callback Route Handler (Plan 01-07 Task 3).
 *
 * Sequence:
 *  1. Read `code` (Supabase PKCE) from search params; if absent → redirect
 *     to `/magic-link/sent?error=invalid`.
 *  2. `exchangeCodeForSession(code)` → resolves the auth user.
 *  3. Re-validate the DOB (T-01-07-02: user could have tampered metadata
 *     between signup and callback). If <18 → sign out + redirect to
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
 *  - exchangeCodeForSession returns error → redirect with `error=expired`
 *    (Supabase returns "PKCE failure" for stale codes; we surface as expired).
 *  - DOB re-validation fails → redirect with `error=age`.
 *  - DB writes fail → redirect with `error=signup`.
 *
 * Anchors:
 *  - 01-RESEARCH.md §1 (magic-link), §7 (consent), §5 (claim).
 *  - 01-CONTEXT.md D2.1, D2.6, D1.6.
 *  - 01-PATTERNS.md row 7 (server-only DOB age check).
 */
import { NextResponse } from "next/server";

import { encryptPII } from "@/lib/crypto/pii";
import { getConsentTextHash } from "@/lib/consent/versions";
import { logger } from "@/lib/logger";
import { claimAnonymousSession } from "@/lib/session/claim";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";
import { writeAudit } from "@/lib/audit/writer";
import { isAtLeast18 } from "@/lib/auth/age-check";

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
  const code = url.searchParams.get("code");
  const next = safeNextPath(url.searchParams.get("next"));

  if (!code) {
    return NextResponse.redirect(new URL("/magic-link/sent?error=invalid", url));
  }

  const supabase = await getSupabaseServerClient();
  const { data: exchanged, error: exchangeErr } =
    await supabase.auth.exchangeCodeForSession(code);

  if (exchangeErr || !exchanged?.user) {
    logger.warn({ err: exchangeErr?.message }, "magic_link_exchange_failed");
    return NextResponse.redirect(new URL("/magic-link/sent?error=expired", url));
  }

  const user = exchanged.user;
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
    )
      .upsert(userPayload, { onConflict: "id" });
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
    if (consentErr) {
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

    // Step 10: redirect.
    const sessionId = metadata.session_id_pending;
    if (sessionId) {
      return NextResponse.redirect(new URL(`/reporte/${sessionId}`, url));
    }
    return NextResponse.redirect(new URL(next, url));
  } catch (e) {
    logger.error(
      { err: e instanceof Error ? e.message : String(e) },
      "callback_signup_failed",
    );
    return NextResponse.redirect(new URL("/?error=signup", url));
  }
}
