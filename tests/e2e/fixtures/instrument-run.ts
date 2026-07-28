/**
 * Runner helpers — drive an instrument to completion against the REAL
 * authenticated runtime and locate the session it produced.
 *
 * Extracted from free-critical-gates.spec.ts (02-16), unchanged, when the
 * Phase-1 specs were wired to the same fixtures ([GAP-E2E-SKIPS-E2E-LIVE]).
 * full-flow-onet.spec.ts needs exactly this "complete an instrument, then read
 * its scored session" machinery: it used to read a hand-seeded session id out
 * of E2E_REPORT_SESSION_ID, an env var nothing in the repo ever set. Keeping
 * one copy is what stops the two from drifting.
 *
 * Pairs with fixtures/real-auth.ts: `loginAsNewUser` mints the user, these
 * helpers give that user a completed, scored instrument.
 */
import type { APIRequestContext } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";

// biome-ignore lint/suspicious/noExplicitAny: untyped local admin client
export type Admin = any;

/** Service-role client against the local stack (bypasses RLS for setup/reads). */
export function adminClient(): Admin {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
  return createClient(url, service, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/** Latest authenticated session (id + version) for (user, code). */
export async function sessionFor(admin: Admin, userId: string, code: string) {
  const { data } = await admin
    .from("assessment_session")
    .select(
      "id, instrument_version_id, status, instrument_version!inner(instrument!inner(code))",
    )
    .eq("user_id", userId)
    .eq("instrument_version.instrument.code", code)
    .order("started_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data as { id: string; instrument_version_id: string } | null;
}

/** All items of an instrument version, in order. */
export async function itemsFor(admin: Admin, instrumentVersionId: string) {
  const { data } = await admin
    .from("item")
    .select("id, sequence_number")
    .eq("instrument_version_id", instrumentVersionId)
    .order("sequence_number", { ascending: true });
  return (data ?? []) as Array<{ id: string; sequence_number: number }>;
}

/** Drive ONE instrument to completion on its native scale + fire /done scoring. */
export async function completeInstrument(
  page: { goto: (u: string) => Promise<unknown>; request: APIRequestContext },
  admin: Admin,
  userId: string,
  code: string,
  valueFor: (seq: number) => number,
): Promise<void> {
  await page.goto(`/test/${code}`);
  const session = await sessionFor(admin, userId, code);
  if (!session) throw new Error(`no authenticated session created for ${code}`);
  const items = await itemsFor(admin, session.instrument_version_id);
  if (items.length === 0) throw new Error(`no items seeded for ${code}`);
  for (const item of items) {
    const res = await page.request.post("/api/respond", {
      data: {
        item_id: item.id,
        raw_value: valueFor(item.sequence_number),
        session_id: session.id,
      },
    });
    if (!res.ok()) {
      throw new Error(
        `respond rejected ${code} seq=${item.sequence_number}: HTTP ${res.status()} ${await res.text()}`,
      );
    }
  }
  await page.goto(`/test/${code}/done`);
}
