/**
 * /reporte/[sessionId] — Generic layered report (UI-SPEC §7.2).
 *
 * Server Component. Composes the report via `composeReport(...)` and renders
 * the layered report for ANY instrument BY DATA:
 *  - Primary visual resolved via `VISUAL_REGISTRY[report.visualType]` — an ENUM
 *    lookup, NEVER an instrument-code branch (FOUND-05, D-C.2). The only
 *    visual_type branch is props construction: the hexagon predates the generic
 *    VisualProps contract and takes `{scores, top3}`; bars/circumplex take
 *    `{dimensions}` (registry comment documents this structural seam).
 *  - Layer 1 = visual + reveal phrase (hexagon only); Layer 2 = extended
 *    narrative + bands; Layer 3 = generic FichaTecnica (+ occupations only on
 *    the O*NET/hexagon path, D-C.3).
 *  - Footer (D-D.2): NFR-27 chip (always) + NFR-28 ContentionBanner mounted in
 *    the FOOTER for any sensitive report when `report.footer.requiresContentionRoute`
 *    is true (values + BFI + PERMA — so VALUES gets the discreet footer link with
 *    NO modal, decoupled contentionRoute, CONTEXT D-A.2). The banner's prominent
 *    surface shows ONLY when the server `showContention` decision is true (dormant
 *    today — no per-score threshold persisted; the resolving plan flips it via
 *    `lib/ethics/distress.ts::evaluateDistressThreshold`). Threat model: the UI
 *    renders the server decision only — no client-side threshold.
 *  - QualityFlagNote when the computed_score carries a quality flag (D-F2.1,
 *    non-blocking — the report stays accessible).
 *  - Layer 4 stays LOCKED (Phase-3 upsell).
 *
 * Auth + isolation (T-01-09-01 / T-02-08-03): not authenticated → /signup;
 * session not owned by user → notFound() (defense in depth alongside RLS).
 * Persistence (FREE-15) reuses the Phase-1 report_snapshot path unchanged.
 *
 * Anchors:
 *  - 02-UI-SPEC.md §7.2 (layered report), §6.3 (footer chip), §6.4 (banner).
 *  - 02-CONTEXT.md D-A.4 (persistent layered report), D-C.2/D-C.3, D-D.2, D-F2.1.
 *  - 02-08-PLAN.md Task 2.
 */
import { notFound, redirect } from "next/navigation";

import { Disclosure } from "@/components/ui/Disclosure";
import { getContentionResources } from "@/lib/ethics/contention";
import { sendReportReadyEmail } from "@/lib/email/transactional";
import { report as MC } from "@/lib/i18n/microcopy/es-CO/report";
import { logger } from "@/lib/logger";
import { composeReport } from "@/lib/report/assembler";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

import {
  ContentionBanner,
  type ContentionLine,
} from "./_components/ContentionBanner";
import { FichaTecnica } from "./_components/FichaTecnica";
import { QualityFlagNote } from "./_components/QualityFlagNote";
import { SurveyFeedback } from "./_components/SurveyFeedback";
import {
  VISUAL_REGISTRY,
  type VisualProps,
} from "./_components/visual-registry";
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
  const userCountry = ((userRow as UserCountryRow | null)?.country_code) ?? "CO";
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

  // 5. Send transactional email best-effort (D3.7).
  if (userEmail) {
    const appBaseUrl =
      process.env.NEXT_PUBLIC_APP_URL ?? "https://descubreme.example";
    sendReportReadyEmail(
      { to: userEmail, userId: user.id, sessionId, appBaseUrl },
      { supabaseAdmin: admin },
    ).catch((err) => {
      logger.error(
        { session_id: sessionId, message: (err as Error).message },
        "report_ready_email_dispatch_failed",
      );
    });
  }

  // 6. Sensitive-report contention surface. Lines come from the
  //    contention_resources seed (D1.7) — never hardcoded. Loaded ONLY when the
  //    decoupled contentionRoute flag is set (VALUES/BFI/PERMA). The prominent
  //    banner is now DATA-DRIVEN (02-19, [GAP-NFR28-DISTRESS-BANNER-UNWIRED]):
  //    `showContention` is the server decision score-session persisted in
  //    report_snapshot.html_payload (derivable distress thresholds). The UI
  //    RENDERS that decision; it never computes a threshold (T-02-08-02 / threat
  //    model). The discreet footer link stays governed by requiresContentionRoute.
  let contentionLines: ContentionLine[] = [];
  const showContention = report.distress?.showContention ?? false;
  if (report.footer.requiresContentionRoute) {
    try {
      const resources = await getContentionResources(admin, userCountry);
      contentionLines = resources
        .filter((r): r is typeof r & { phone: string } => Boolean(r.phone))
        .map((r) => ({
          name: r.name,
          phone: r.phone,
          description: r.description_es_co || undefined,
        }));
    } catch (err) {
      logger.warn(
        { session_id: sessionId, message: (err as Error).message },
        "report_contention_lines_load_failed",
      );
    }
  }

  // 7. Resolve the primary visual via the registry (ENUM lookup, D-C.2). The
  //    only visual_type branch is props construction (hexagon vs generic).
  const Visual = VISUAL_REGISTRY[report.visualType];
  const isHexagon = report.visualType === "hexagon";
  const scores: Record<Letter, number> = {
    R: report.layer1.scoresByDim.R ?? 0,
    I: report.layer1.scoresByDim.I ?? 0,
    A: report.layer1.scoresByDim.A ?? 0,
    S: report.layer1.scoresByDim.S ?? 0,
    E: report.layer1.scoresByDim.E ?? 0,
    C: report.layer1.scoresByDim.C ?? 0,
  };
  const top3 = report.layer1.top3 as [Letter, Letter, Letter];
  const hexagonProps = { scores, top3 } as unknown as VisualProps;
  const genericProps: VisualProps = {
    dimensions: report.visualDimensions,
    reducedMotion: false,
  };

  const letters: Letter[] = ["R", "I", "A", "S", "E", "C"];

  return (
    <main role="main" className="mx-auto flex max-w-3xl flex-col gap-8 p-6">
      <div className="flex items-center gap-2.5 self-start">
        <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M8 0 L9.6 6.4 L16 8 L9.6 9.6 L8 16 L6.4 9.6 L0 8 L6.4 6.4 Z"
            fill="var(--color-star)"
          />
        </svg>
        <span className="font-display text-lg text-text-primary">DescubreMe</span>
      </div>

      {/* QualityFlagNote — soft, non-blocking (D-F2.1). Report stays visible. */}
      {report.qualityFlag ? <QualityFlagNote /> : null}

      {/* Capa 1 — above-fold visual + reveal phrase. */}
      <section className="flex min-h-[100dvh] flex-col items-center gap-6 sm:min-h-0">
        <h1 className="font-display text-[clamp(2.4rem,5vw,3.4rem)] leading-tight text-text-primary">
          {MC.MC_REPORT_TITLE}
        </h1>

        <Visual {...(isHexagon ? hexagonProps : genericProps)} />

        {/* Reveal phrase only meaningful on the hexagon path (top-3 combo). */}
        {report.layer1.narrativeTopPhrase ? (
          <p
            className="max-w-prose text-center text-base text-text-secondary"
            style={{ maxWidth: "65ch" }}
          >
            {report.layer1.narrativeTopPhrase}
          </p>
        ) : null}
      </section>

      {/* Capa 2 — extended narrative. */}
      <section className="flex flex-col gap-4">
        <h2 className="font-display text-2xl text-text-primary">
          {MC.MC_REPORT_SECTION2_HEADING}
        </h2>
        <div className="flex flex-col gap-2 text-base text-text-primary">
          {report.layer2.narrativeExtended.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {isHexagon ? (
          <>
            <p className="text-sm text-text-secondary">
              {MC.MC_REPORT_SCORES_INTRO}
            </p>
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
                  </li>
                );
              })}
            </ul>
            {/* Baremo note shown ONCE while the non-percentile reading is in
                effect (the generic visuals carry their own band note). */}
            {letters.some((l) => {
              const d = report.layer2.scoresWithBands[l];
              return d && !d.showPercentile;
            }) ? (
              <p className="text-xs text-text-secondary">
                {MC.MC_REPORT_BAREMO_NOTE}
              </p>
            ) : null}
          </>
        ) : null}
      </section>

      {/* Capa 3 — Ocupaciones (O*NET/hexagon only, D-C.3). Hidden entirely when
          the LATAM catalog is not yet seeded (Cowork delivery) — no user-facing
          placeholder; the section simply does not appear until occupations exist. */}
      {isHexagon && report.layer3.occupations.length > 0 ? (
        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl text-text-primary">
            {MC.MC_REPORT_OCCUPATIONS_HEADING}
          </h2>
          <ul className="flex flex-col gap-2.5">
            {report.layer3.occupations.slice(0, 5).map((occ) => (
              <li
                key={occ.id}
                className="flex items-center gap-3 text-base text-text-primary"
              >
                <span
                  className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                {occ.nameEsCo}
              </li>
            ))}
          </ul>
          {report.layer3.occupations.length > 5 ? (
            <Disclosure triggerLabel={MC.MC_REPORT_OCCUPATIONS_EXPAND}>
              <ul className="mt-2 flex flex-col gap-2.5">
                {report.layer3.occupations.slice(5).map((occ) => (
                  <li
                    key={occ.id}
                    className="flex items-center gap-3 text-base text-text-primary"
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    {occ.nameEsCo}
                  </li>
                ))}
              </ul>
            </Disclosure>
          ) : null}
        </section>
      ) : null}

      {/* Ficha tecnica expandible (generic metadata, FREE-11). */}
      <section>
        <Disclosure triggerLabel={MC.MC_REPORT_FICHA_TRIGGER}>
          <FichaTecnica
            name={report.fichaTecnica.name}
            version={report.fichaTecnica.version}
            itemCount={report.fichaTecnica.itemCount}
            alphaSummary={report.fichaTecnica.alphaSummary}
            baremoSummary={report.fichaTecnica.baremoSummary}
            whatItMeasures={report.fichaTecnica.whatItMeasures}
            limits={report.fichaTecnica.limits}
            latamStatus={report.fichaTecnica.latamStatus}
          />
        </Disclosure>
      </section>

      {/* NFR-27 long disclaimer (D3.11, always visible). */}
      <section
        id="nfr27-long"
        className="rounded-md border border-border-default bg-surface-secondary p-4 text-sm text-text-secondary"
      >
        {MC.MC_REPORT_NFR27_LONG}
      </section>

      {/* What next — survey + waitlist. The deep profile (capa 4) stays LOCKED
          as a Phase-3 upsell; the waitlist opt-in is its honest teaser. */}
      <section className="flex flex-col gap-6 border-t border-border-default pt-6">
        <SurveyFeedback sessionId={sessionId} />
        <WaitlistOptIn email={userEmail} />
      </section>

      {/* NFR-28 contention surface in the FOOTER for any sensitive report
          (values + BFI + PERMA via contentionRoute — D-D.2 locked: "link
          discreto permanente en el footer"). The discreet footer link is
          ALWAYS present; ContentionBanner renders the prominent surface ABOVE
          it only when the server `showContention` decision is true (dormant
          today — no per-score threshold persisted; the resolving plan flips it
          via lib/ethics/distress.ts::evaluateDistressThreshold). The
          distressDetector flag is reserved for that future server decision and
          does NOT change placement (threat model: UI renders server decision). */}
      {report.footer.requiresContentionRoute ? (
        <section
          id="contention-resources"
          aria-label={MC.MC_REPORT_CONTENTION_LANDMARK_ARIA}
          className="border-t border-border-default pt-4"
        >
          <ContentionBanner showContention={showContention} lines={contentionLines} />
        </section>
      ) : null}

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
