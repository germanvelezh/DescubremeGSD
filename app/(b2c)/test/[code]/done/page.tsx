/**
 * /test/[code]/done — End-of-test landing (Plan 01-07 Task 3).
 *
 * Wave 3 redirects to `/test/[code]/done` when `session.progress >= 60`.
 * This page reads the anonymous session, computes a preliminary top-3
 * RIASEC from raw item_response sums (full scoring lands in Plan 01-08),
 * and redirects to `/signup?sessionId=<id>&top3=<R,I,A>` for the
 * "Tu reporte esta listo" UI (UI-SPEC §7.4 + D2.3).
 *
 * Why redirect rather than render inline: the signup screen is auth-flow
 * scoped (`app/(auth)/signup/page.tsx`) and reads URL search params for
 * the preview hexagon. Keeping signup in a single place simplifies the
 * navigation graph (test flow ends here, auth flow begins next).
 *
 * Failure modes:
 *  - No cookie / no session row → redirect to /test/[code] (re-entry).
 *  - Progress < 60 → redirect to /test/[code] (resume).
 *  - No item_response rows joined to item.dimension → redirect with
 *    `top3=null` parameter so the signup page falls back to a generic
 *    teaser (this should not happen in practice but is defensive).
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.4 (Tu reporte esta listo).
 *  - 01-CONTEXT.md D2.3.
 *  - 01-RESEARCH.md §Gate 5 (top-3 ordering).
 */
import { redirect } from "next/navigation";

import { computeRiasecTop3, RIASEC_LETTERS, type Top3Letter } from "@/lib/riasec/top3";
import {
  ANONYMOUS_COOKIE_NAME,
  type AnonymousSession,
} from "@/lib/session/anonymous";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

import { cookies } from "next/headers";

type Params = Promise<{ code: string }>;

export default async function TestDonePage({ params }: { params: Params }) {
  const { code } = await params;
  const cookieStore = await cookies();
  const anonId = cookieStore.get(ANONYMOUS_COOKIE_NAME)?.value;
  if (!anonId) {
    redirect(`/test/${code}`);
  }

  const supabase = getSupabaseAdminClient();
  const { data: sessionRow } = await supabase
    .from("assessment_session")
    .select(
      "id, user_id, anonymous_session_id, instrument_version_id, status, progress, started_at, expires_at, completed_at",
    )
    .eq("anonymous_session_id", anonId)
    .maybeSingle();

  if (!sessionRow) {
    redirect(`/test/${code}`);
  }
  const session = sessionRow as AnonymousSession;
  if (session.progress < 60) {
    redirect(`/test/${code}`);
  }

  // Compute raw sums per dimension by joining item_response -> item.
  const { data: rows } = await supabase
    .from("item_response")
    .select("raw_value, item:item_id (dimension)")
    .eq("session_id", session.id);

  // The .select shape returns nested object for the joined relation.
  type ResponseRow = {
    raw_value: number;
    item: { dimension: string | null } | null;
  };
  const responseRows = (rows ?? []) as unknown as ResponseRow[];

  const sums: Record<Top3Letter, number> = {
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0,
  };
  for (const r of responseRows) {
    const dim = r.item?.dimension;
    if (dim && (RIASEC_LETTERS as readonly string[]).includes(dim)) {
      sums[dim as Top3Letter] += r.raw_value;
    }
  }

  const top3 = computeRiasecTop3(sums);
  const top3Param = top3.join(",");
  redirect(`/signup?sessionId=${session.id}&top3=${top3Param}`);
}
