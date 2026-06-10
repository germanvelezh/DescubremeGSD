/**
 * /reporte/[sessionId] — Reporte O*NET completo (UI-SPEC §7.6).
 *
 * Server Component. Compone el reporte via `composeReport(supabase, ...)`
 * y renderiza las 3 capas + ficha tecnica + footer NFR-27 + survey +
 * waitlist (D3.5 progressive disclosure por scroll, no tabs).
 *
 * Auth + isolation (T-01-09-01):
 *  - Si no hay user autenticado → redirect /signup.
 *  - Si user.id !== session.user_id → notFound() (404, no leak).
 *    Defense in depth alongside RLS.
 *
 * Email transaccional (D3.7):
 *  - Si la sesion no tiene email enviado → dispara
 *    `sendReportReadyEmail` (best-effort, no bloquea render).
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.6.
 *  - 01-CONTEXT.md D3.5-D3.11 + D3.12 (NFR-27 chip).
 *  - PLAN 01-09 Task 2.
 */
import { notFound, redirect } from "next/navigation";

import { Disclosure } from "@/components/ui/Disclosure";
import { sendReportReadyEmail } from "@/lib/email/transactional";
import { report as MC } from "@/lib/i18n/microcopy/es-CO/report";
import { logger } from "@/lib/logger";
import { composeReport } from "@/lib/report/assembler";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

import { FichaTecnica } from "./_components/FichaTecnica";
import { HexagonoRiasecFull } from "./_components/HexagonoRiasecFull";
import { SurveyFeedback } from "./_components/SurveyFeedback";
import { WaitlistOptIn } from "./_components/WaitlistOptIn";

type Params = Promise<{ sessionId: string }>;
type Letter = "R" | "I" | "A" | "S" | "E" | "C";

interface SessionUserRow {
  id: string;
  user_id: string | null;
}

interface UserCountryRow {
  country_code: string | null;
  email: string;
}

export default async function ReporteSessionPage({ params }: { params: Params }) {
  const { sessionId } = await params;

  // 1. Auth: redirect to signup if not authenticated.
  const supabaseUserScoped = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabaseUserScoped.auth.getUser();
  if (!user) {
    redirect(`/signup?sessionId=${encodeURIComponent(sessionId)}`);
  }

  // 2. Verify session belongs to user (T-01-09-01 — app-side check + RLS).
  const admin = getSupabaseAdminClient();
  const { data: sessionData } = await admin
    .from("assessment_session")
    .select("id, user_id")
    .eq("id", sessionId)
    .maybeSingle();
  const session = (sessionData as SessionUserRow | null) ?? null;
  if (!session || session.user_id !== user.id) {
    notFound();
  }

  // 3. Read user.country_code + email for the assembler + email send.
  const { data: userRow } = await admin
    .from("user")
    .select("country_code, email")
    .eq("id", user.id)
    .maybeSingle();
  const userCountry =
    ((userRow as UserCountryRow | null)?.country_code) ?? "CO";
  const userEmail = (userRow as UserCountryRow | null)?.email ?? user.email ?? "";

  // 4. Compose report (reads snapshot persisted by POST /api/score).
  let report;
  try {
    report = await composeReport(admin, {
      sessionId,
      userCountryCode: userCountry,
    });
  } catch (err) {
    logger.error(
      { session_id: sessionId, message: (err as Error).message },
      "report_compose_failed",
    );
    notFound();
  }

  // 5. Send transactional email best-effort (D3.7). Track via audit_log
  //    in a future iteration to avoid duplicate sends; Phase 1 accepts
  //    occasional duplicates if the page is hit twice (idempotent at
  //    Resend's tracking level).
  if (userEmail) {
    const appBaseUrl =
      process.env.NEXT_PUBLIC_APP_URL ?? "https://descubreme.example";
    sendReportReadyEmail(
      {
        to: userEmail,
        userId: user.id,
        sessionId,
        appBaseUrl,
      },
      { supabaseAdmin: admin },
    ).catch((err) => {
      logger.error(
        { session_id: sessionId, message: (err as Error).message },
        "report_ready_email_dispatch_failed",
      );
    });
  }

  const letters: Letter[] = ["R", "I", "A", "S", "E", "C"];
  const scores: Record<Letter, number> = {
    R: report.layer1.scoresByDim.R ?? 0,
    I: report.layer1.scoresByDim.I ?? 0,
    A: report.layer1.scoresByDim.A ?? 0,
    S: report.layer1.scoresByDim.S ?? 0,
    E: report.layer1.scoresByDim.E ?? 0,
    C: report.layer1.scoresByDim.C ?? 0,
  };
  const top3 = report.layer1.top3 as [Letter, Letter, Letter];

  return (
    <main
      role="main"
      className="mx-auto flex max-w-3xl flex-col gap-8 p-6"
    >
      <p className="self-start text-base font-semibold text-text-primary">
        DescubreMe
      </p>

      {/* Capa 1 — above-fold */}
      <section className="flex min-h-[100dvh] flex-col items-center gap-6 sm:min-h-0">
        <h1 className="text-3xl font-bold text-text-primary">
          {MC.MC_REPORT_TITLE}
        </h1>

        <HexagonoRiasecFull scores={scores} top3={top3} />

        <p
          className="max-w-prose text-center text-base text-text-secondary"
          style={{ maxWidth: "65ch" }}
        >
          {report.layer1.narrativeTopPhrase}
        </p>
      </section>

      {/* Capa 2 — extended narrative */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          {MC.MC_REPORT_SECTION2_HEADING}
        </h2>
        <div className="flex flex-col gap-2 text-base text-text-primary">
          {report.layer2.narrativeExtended.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <ul className="flex flex-col gap-1 text-sm text-text-secondary">
          {letters.map((letter) => {
            const dim = report.layer2.scoresWithBands[letter];
            if (!dim) return null;
            return (
              <li key={letter}>
                <span className="font-semibold text-text-primary">
                  {letter}:
                </span>{" "}
                {dim.rawScore} ({dim.band})
                {dim.showPercentile ? "" : ` — ${MC.MC_REPORT_BAREMO_NOTE}`}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Capa 3 — Ocupaciones */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          {MC.MC_REPORT_OCCUPATIONS_HEADING}
        </h2>
        {report.layer3.occupations.length === 0 ? (
          <p className="text-sm text-text-secondary">
            [GAP - Cowork delivery: catalogo de ocupaciones LATAM pendiente]
          </p>
        ) : (
          <>
            <ul className="flex flex-col gap-1 text-base text-text-primary">
              {report.layer3.occupations.slice(0, 5).map((occ) => (
                <li key={occ.id}>• {occ.nameEsCo}</li>
              ))}
            </ul>
            {report.layer3.occupations.length > 5 ? (
              <Disclosure triggerLabel={MC.MC_REPORT_OCCUPATIONS_EXPAND}>
                <ul className="flex flex-col gap-1 text-base text-text-primary">
                  {report.layer3.occupations.slice(5).map((occ) => (
                    <li key={occ.id}>• {occ.nameEsCo}</li>
                  ))}
                </ul>
              </Disclosure>
            ) : null}
          </>
        )}
      </section>

      {/* Ficha tecnica expandible */}
      <section>
        <Disclosure triggerLabel={MC.MC_REPORT_FICHA_TRIGGER}>
          <FichaTecnica
            name={report.fichaTecnica.name}
            version={report.fichaTecnica.version}
            itemCount={report.fichaTecnica.itemCount}
            alphaSummary={report.fichaTecnica.alphaSummary}
            baremoSummary={report.fichaTecnica.baremoSummary}
          />
        </Disclosure>
      </section>

      {/* NFR-27 long disclaimer (D3.11, always visible) */}
      <section
        id="nfr27-long"
        className="rounded-md border border-border-default bg-surface-secondary p-4 text-sm text-text-secondary"
      >
        {MC.MC_REPORT_NFR27_LONG}
      </section>

      {/* What next — survey + waitlist */}
      <section className="flex flex-col gap-6 border-t border-border-default pt-6">
        <SurveyFeedback sessionId={sessionId} />
        <WaitlistOptIn email={userEmail} />
      </section>

      {/* NFR-28 reserved landmark — Phase 2 activates */}
      <aside
        id="contention-resources"
        role="complementary"
        aria-label={MC.MC_REPORT_CONTENTION_LANDMARK_ARIA}
        hidden
      />

      {/* Footer */}
      <footer className="flex flex-col gap-2 border-t border-border-default pt-4 text-xs text-text-secondary">
        <p>
          <span
            className="inline-block rounded-full border border-border-default bg-surface-secondary px-2 py-1"
            aria-label={MC.MC_REPORT_NFR27_CHIP}
          >
            {MC.MC_REPORT_NFR27_CHIP}
          </span>{" "}
          ·{" "}
          <a href="#nfr27-long" className="text-accent underline">
            {MC.MC_REPORT_NFR27_CHIP_LINK}
          </a>
        </p>
        <p>
          <a href="/me/data">Cuenta</a> ·{" "}
          <a href="/me/delete">Borrar mi cuenta</a> ·{" "}
          <a href="/consent">Politica de privacidad</a>
        </p>
      </footer>
    </main>
  );
}
