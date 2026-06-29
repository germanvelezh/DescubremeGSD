/**
 * /test/[code]/done — End-of-test routing.
 *
 * Phase 1 (Plan 01-07 Task 3): the O*NET anonymous funnel ends here — compute a
 * preliminary RIASEC top-3 and redirect to `/signup?sessionId=&top3=` ("Tu
 * reporte esta listo", UI-SPEC §7.4 + D2.3).
 *
 * Phase 2 (Plan 02-14): generalized so a SIGNED-IN user does NOT fall into the
 * Phase-1 signup funnel. A logged-in user who closes a Free test is routed by
 * the guided order (D-A.5/D-F3.1) via `resolveNextFreeTest` — to the next
 * pending test, or to `/perfil-integrado` (the teaser) once all 4 are complete
 * (D-A.6).
 *
 * Branch by `getUser()` (validated JWT, NOT getSession's raw cookie —
 * T-02-14-02; the authenticated routing activates only after a real user):
 *
 *   - user == null  → EXACT Phase-1 behavior (anon cookie → RIASEC top3 →
 *     /signup). This is the friendly O*NET anonymous path (D-A.1); it must not
 *     regress. The RIASEC top-3 is O*NET-specific by domain (riasec/top3.ts),
 *     NOT a branch on instrument code — FOUND-05 stays clean.
 *   - user != null  → guided-order routing over `product_stack` (data, never a
 *     hardcoded code list — FOUND-05).
 *
 * Completion source of truth: `assessment_session.status = 'completed'` joined
 * `instrument_version → instrument` for the code. (NOTE: the literal is
 * `'completed'` — what `score-session.ts` writes — NOT `'complete'`; the plan
 * prose said `'complete'`, a typo-level bug corrected here.) The just-closed
 * test's `code` is added to `completedCodes` explicitly as a defensive measure
 * in case scoring has not yet flipped its status.
 *
 * Anchors:
 *  - 02-CONTEXT.md D-A.1/A.5/A.6, D-F3.1.
 *  - 01-UI-SPEC.md §7.4 (Tu reporte esta listo); 01-CONTEXT.md D2.3.
 *  - lib/free/next-test.ts (resolveNextFreeTest + loadFreeOrderedCodes).
 */
import { redirect } from "next/navigation";

import {
  TransitionScreen,
  type TransitionScreenProps,
} from "@/app/(b2c)/test/[code]/_components/TransitionScreen";
import { sendFreeCompleteEmail } from "@/lib/email/transactional";
import { computeRiasecTop3, RIASEC_LETTERS, type Top3Letter } from "@/lib/riasec/top3";
import { resolveFreeCloseTarget } from "@/lib/free/free-close";
import { resolveLastScoredSessionId } from "@/lib/free/last-scored-session";
import {
  loadFreeOrderedCodes,
  resolveNextFreeTest,
} from "@/lib/free/next-test";
import { scoreCompletedSessionIfNeeded } from "@/lib/free/score-on-done";
import { composeReport } from "@/lib/report/assembler";
import { logger } from "@/lib/logger";
import { transitions } from "@/lib/i18n/microcopy/es-CO/transitions";
import {
  ANONYMOUS_COOKIE_NAME,
  type AnonymousSession,
} from "@/lib/session/anonymous";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";
import { getSupabaseServerClient } from "@/lib/supabase/server";

import { cookies } from "next/headers";

type Params = Promise<{ code: string }>;

export default async function TestDonePage({ params }: { params: Params }) {
  const { code } = await params;
  const instrumentCode = code.toUpperCase();

  // Resolve the user FIRST (validated JWT). A signed-in user has NO anonymous
  // cookie, so the Phase-1 cookie guard below would wrongly bounce them.
  const supabaseSsr = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabaseSsr.auth.getUser();

  // -- AUTHENTICATED branch: guided-order routing (D-A.5/D-F3.1) --------------
  if (user) {
    const admin = getSupabaseAdminClient();

    // [GAP-AUTH-4TEST-SCORING-TRIGGER]: the per-test submit path never calls
    // scoreSession, so reaching /done is the moment the just-finished test gets
    // scored. Score-on-arrival (idempotent + best-effort) flips this session's
    // status to 'completed' and persists computed_score + report_snapshot
    // BEFORE the completedCodes query below reads it. The anonymous branch is
    // NOT scored here — anon scores in auth/callback after the claim (D-A.1).
    await scoreCompletedSessionIfNeeded(admin, user.id, instrumentCode);

    // completedCodes = distinct instrument codes the user has FINISHED. Source
    // of truth = assessment_session.status = 'completed' (what score-session
    // writes), joined to instrument.code.
    const { data: completedRows } = await admin
      .from("assessment_session")
      .select("instrument_version!inner(instrument!inner(code))")
      .eq("user_id", user.id)
      .eq("status", "completed");
    const completedFromDb = (
      (completedRows ?? []) as unknown as Array<{
        instrument_version: { instrument: { code: string } } | null;
      }>
    )
      .map((r) => r.instrument_version?.instrument?.code)
      .filter((c): c is string => typeof c === "string" && c.length > 0);

    // The just-closed test counts as complete even if scoring has not yet
    // flipped its status (defensive — avoids re-routing to the current test).
    const completedCodes = Array.from(
      new Set([...completedFromDb, instrumentCode]),
    );

    const orderedCodes = await loadFreeOrderedCodes(admin);

    // product_stack not seeded yet (dormant until 02-13) → no ordered list.
    // /perfil-integrado degrades to a locked/gap state without throwing (02-12);
    // never redirect to a bare /test (not a route).
    if (orderedCodes.length === 0) {
      redirect("/perfil-integrado");
    }

    const pos = resolveNextFreeTest(orderedCodes, completedCodes);
    if (pos.allComplete) {
      // [GAP-W5W6-ORPHANED-FREE-FLOW] Opción B (estado/DECISION_W5W6_Funnel_Surface_v0.1):
      // route the close to the O*NET report surface recut by-context
      // (/reporte/{onet}?cierre=free → nivel obligatorio → reveal ocupacional),
      // NOT straight to /perfil-integrado. W5/W6 live on that surface; this is
      // what makes the orphaned Job Zone recommender reachable for the Free flow.
      const closeId = await resolveFreeCloseTarget(admin, user.id);

      // FREE-14 idempotent: routing allComplete to /reporte moves the completion
      // moment out of /perfil-integrado, so without firing here an abandoner on
      // screen 1 (nivel/ocupaciones) would never receive the close email. Awaited
      // (NOT a floating void) so the send is not dropped when the serverless
      // function freezes on redirect; the audit-log idempotency guard
      // (T-02-12-04) prevents a double send when the user does reach
      // /perfil-integrado (screen 2). Best-effort: a send failure is logged and
      // swallowed so the routing always proceeds (the redirect below must run).
      const { data: userRow } = await admin
        .from("user")
        .select("email")
        .eq("id", user.id)
        .maybeSingle();
      const userEmail =
        (userRow as { email: string } | null)?.email ?? user.email ?? "";
      if (userEmail) {
        const appBaseUrl =
          process.env.NEXT_PUBLIC_APP_URL ?? "https://descubreme.co";
        try {
          await sendFreeCompleteEmail(
            { to: userEmail, userId: user.id, appBaseUrl },
            { supabaseAdmin: admin },
          );
        } catch (err) {
          logger.error(
            { message: (err as Error).message },
            "free_complete_email_dispatch_failed",
          );
        }
      }

      // With a valid O*NET session (hexagon + snapshot) → recut close surface;
      // else degrade to the teaser (no session with snapshot → keep the
      // incomplete-session 404 out of scope, the resolver returned null).
      if (closeId) {
        redirect(`/reporte/${closeId}?cierre=free`);
      }
      redirect("/perfil-integrado");
    }
    if (pos.nextCode) {
      const nextCode = pos.nextCode;

      // Mini-result of the test the user JUST closed ([GAP-W6-HOOKS-1],
      // [GAP-FREE-NO-RESULTS-VISIBILITY]): the transition shows a glanceable
      // takeaway (visual + reveal phrase + link to the full report) before the
      // next test's hook, instead of a bare button. The just-closed test was
      // already scored above by scoreCompletedSessionIfNeeded, so its
      // report_snapshot exists. BEST-EFFORT: any failure (no session resolved,
      // compose throws) degrades to `result = undefined` and TransitionScreen
      // falls back to the current button+hook — routing never breaks.
      let result: TransitionScreenProps["result"] | undefined;
      const lastSessionId = await resolveLastScoredSessionId(
        admin,
        user.id,
        instrumentCode,
      );
      if (lastSessionId) {
        try {
          const { data: userRow } = await admin
            .from("user")
            .select("country_code")
            .eq("id", user.id)
            .maybeSingle();
          const userCountryCode =
            (userRow as { country_code: string | null } | null)?.country_code ??
            "CO";
          const report = await composeReport(admin, {
            sessionId: lastSessionId,
            userCountryCode,
            // The mini-result uses only visual + phrase, NOT occupations, so the
            // level inputs (which drive the Job Zone filter) are not needed.
            educationLevel: null,
            careerStage: null,
          });
          // `||` NOT `??`: narrativeTopPhrase is "" for bars (BFI) and circumplex
          // (TwIVI) — `??` would NOT fall through an empty string and the phrase
          // would render blank (exactly what [GAP-W6-HOOKS-1] fixes). With `||`,
          // BFI/TwIVI show the first paragraph of the extended narrative.
          const revealPhrase =
            report.layer1.narrativeTopPhrase ||
            report.layer2.narrativeExtended.split("\n\n")[0] ||
            "";
          const reportHref = `/reporte/${lastSessionId}`;
          // hexagon (O*NET) feeds { scores, top3 } (its contract); bars/circumplex
          // feed { dimensions }. Mirrors reporte/page.tsx props construction.
          result =
            report.visualType === "hexagon"
              ? {
                  visualType: report.visualType,
                  scores: report.layer1.scoresByDim,
                  top3: report.layer1.top3,
                  revealPhrase,
                  reportHref,
                }
              : {
                  visualType: report.visualType,
                  dimensions: report.visualDimensions,
                  revealPhrase,
                  reportHref,
                };
        } catch (err) {
          logger.warn(
            { session_id: lastSessionId, message: (err as Error).message },
            "transition_mini_result_compose_failed",
          );
          // Best-effort: leave `result` undefined → TransitionScreen degrades.
        }
      }

      // Render the interstitial TransitionScreen (D-A.4 / 02-07) instead of a
      // direct redirect. The NFR-27 disclaimer is NO LONGER mounted here — it is
      // gated at the next test's ENTRY (PretestDisclaimerGate, ADR-029), the
      // single source of truth. The hook stays the default
      // (MC_TRANSITION_HOOK_DEFAULT): the per-test hook copy is a Cowork
      // dependency ([GAP-W6-HOOKS-1]); the machinery to pass a hook is wired.
      return (
        <TransitionScreen
          nextHref={`/test/${nextCode}`}
          hook={transitions.MC_TRANSITION_HOOK_DEFAULT}
          result={result}
        />
      );
    }
    // Defensive: ordered list non-empty but no next resolved — treat as done.
    redirect("/perfil-integrado");
  }

  // -- ANONYMOUS branch: EXACT Phase-1 O*NET funnel (must not regress) --------
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
