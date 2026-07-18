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
import { onboardingNivel as NivelMC } from "@/lib/i18n/microcopy/es-CO/onboarding-nivel";
import { report as MC } from "@/lib/i18n/microcopy/es-CO/report";
import { logger } from "@/lib/logger";
import { joinWithY, matchedRiasecLetters, RIASEC_NAMES_ES_CO } from "@/lib/onet/riasec";
import { composeReport } from "@/lib/report/assembler";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

import {
  ContentionBanner,
  type ContentionLine,
} from "./_components/ContentionBanner";
import { FichaTecnica } from "./_components/FichaTecnica";
import { LevelCapture } from "./_components/LevelCapture";
import { QualityFlagNote } from "./_components/QualityFlagNote";
import { SurveyFeedback } from "./_components/SurveyFeedback";
import {
  VISUAL_REGISTRY,
  type VisualProps,
} from "./_components/visual-registry";
import { WaitlistOptIn } from "./_components/WaitlistOptIn";

type Params = Promise<{ sessionId: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type Letter = "R" | "I" | "A" | "S" | "E" | "C";

interface SessionUserRow {
  id: string;
  user_id: string | null;
}

interface UserCountryRow {
  country_code: string | null;
  email: string;
  education_level: string | null;
  career_stage: string | null;
}

/**
 * One occupation card (Wave 6 §5): name + non-deterministic interest micro-tag.
 * The tag names the user's top-3 RIASEC letters this occupation shares — derived
 * at render from `top3` + `riasec_code` (recomputed, not threaded through the
 * selector). NEVER a "match %" (pack §6 / guardrail). Omitted entirely when no
 * letters match (the selector guarantees ≥1, but guard anyway).
 */
function OccupationCard({
  occ,
  top3,
}: {
  occ: { id: string; nameEsCo: string; riasecCode: string };
  top3: string[];
}) {
  const names = matchedRiasecLetters(top3, occ.riasecCode).map(
    (l) => RIASEC_NAMES_ES_CO[l],
  );
  const microTag =
    names.length > 0
      ? `${NivelMC.MC_NIVEL_MICROTAG_PREFIX} ${joinWithY(names)}.`
      : null;
  return (
    <li className="flex flex-col gap-0.5">
      <span className="flex items-center gap-3 text-base text-text-primary">
        <span
          className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
          aria-hidden="true"
        />
        {occ.nameEsCo}
      </span>
      {microTag ? (
        <span className="pl-[18px] text-sm text-text-secondary">{microTag}</span>
      ) : null}
    </li>
  );
}

export default async function ReporteSessionPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { sessionId } = await params;

  // [GAP-W5W6-ORPHANED-FREE-FLOW] Opción B (estado/DECISION_W5W6_Funnel_Surface_v0.1):
  // el cierre del Free invertido aterriza aquí con ?cierre=free para recortar la
  // superficie POR-CONTEXTO (solo nivel obligatorio → reveal ocupacional + CTA),
  // dejando la profundidad O*NET (hexagon/bandas/ficha) para el Paid. SIN el query
  // param = vista histórica (Mis datos, me/data/page.tsx:124) INTACTA — NO es una
  // poda global de la página, es render condicional por-contexto.
  const isFreeClose = (await searchParams).cierre === "free";

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

  // 3. Read user.country_code + email + level fields (Phase 02.1: the assembler
  //    needs education_level/career_stage to compute the Job Zone filter; the
  //    page needs education_level to gate the layer-3 capture).
  const { data: userRow } = await admin
    .from("user")
    .select("country_code, email, education_level, career_stage")
    .eq("id", user.id)
    .maybeSingle();
  const typedUserRow = (userRow as UserCountryRow | null) ?? null;
  const userCountry = typedUserRow?.country_code ?? "CO";
  const userEmail = typedUserRow?.email ?? user.email ?? "";
  const educationLevel = typedUserRow?.education_level ?? null;
  const careerStage = typedUserRow?.career_stage ?? null;

  // 4. Compose report (reads snapshot persisted by POST /api/score).
  let report;
  try {
    report = await composeReport(admin, {
      sessionId,
      userCountryCode: userCountry,
      educationLevel,
      careerStage,
    });
  } catch (err) {
    logger.error(
      { session_id: sessionId, message: (err as Error).message },
      "report_compose_failed",
    );
    notFound();
  }

  // 5. Send transactional email best-effort (D3.7). SUPPRESSED in the Free close
  //    context (isFreeClose): el correo de cierre del funnel es FREE-14
  //    (done/page.tsx, idempotente); sendReportReadyEmail NO es idempotente y
  //    apilaría correos sobre la sesión O*NET durante el cierre. La vista
  //    histórica (Mis datos) lo conserva igual que hoy.
  if (!isFreeClose && userEmail) {
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
  // Phase 02.1 Wave 5: the occupational reveal (layer 3) requires the user's
  // level of preparation. When it is missing on the O*NET/hexagon report, layer
  // 3 renders the capture form INSTEAD of occupations (inline gate — owner
  // decision 2026-06-26). Layers 1-2 (hexagon + narrative) always render first,
  // so the reveal/delight is never blocked. Non-hexagon reports never gate.
  const needsLevelCapture = isHexagon && !educationLevel;
  const scores: Record<Letter, number> = {
    R: report.layer1.scoresByDim.R ?? 0,
    I: report.layer1.scoresByDim.I ?? 0,
    A: report.layer1.scoresByDim.A ?? 0,
    S: report.layer1.scoresByDim.S ?? 0,
    E: report.layer1.scoresByDim.E ?? 0,
    C: report.layer1.scoresByDim.C ?? 0,
  };
  const top3 = report.layer1.top3 as [Letter, Letter, Letter];
  // Layer-1 entrance (HANDOFF §2): the visual draws itself before the phrase
  // speaks. Presentation-only — DOM content/order identical, so the "Mis datos"
  // historical view keeps its composition (Ola 3.5 guardrail).
  const hexagonProps = { scores, top3, animateIn: true } as unknown as VisualProps;
  const genericProps: VisualProps = {
    dimensions: report.visualDimensions,
    reducedMotion: false,
    animateIn: true,
  };

  const letters: Letter[] = ["R", "I", "A", "S", "E", "C"];

  // [GAP-W5W6-ORPHANED-FREE-FLOW] Variante CIERRE FREE: superficie enfocada que
  // muestra ÚNICAMENTE nivel obligatorio → reveal ocupacional + CTA al teaser,
  // ocultando la profundidad Paid (hexagon + narrativeTopPhrase, bandas, ficha,
  // survey, waitlist). Como Server Component, lo no-renderizado NO se serializa al
  // cliente: en cierre Free NO se pasan `scores`/bandas a ningún componente; las
  // ocupaciones + top3 son el único dato Paid-adjacent legítimo. La variante
  // histórica (abajo) queda EXACTAMENTE como hoy (render condicional, no poda).
  if (isFreeClose && isHexagon) {
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

        {/* QualityFlagNote — soft, non-blocking (D-F2.1). */}
        {report.qualityFlag ? <QualityFlagNote /> : null}

        {/* Capa 3 únicamente: nivel OBLIGATORIO (sin skip, gate estructural de
            LevelCapture) → reveal ocupacional no determinista → CTA primario al
            teaser. El CTA aparece SOLO en el estado post-captura (nunca junto al
            formulario). NUNCA "match %". */}
        {needsLevelCapture ? (
          <LevelCapture sessionId={sessionId} />
        ) : (
          <section className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="font-display text-2xl text-text-primary motion-safe:animate-line-reveal">
                {NivelMC.MC_NIVEL_REVEAL_TITLE}
              </h2>
              <p
                className="text-sm text-text-secondary motion-safe:animate-fade-in"
                style={{ animationDelay: "150ms" }}
              >
                {NivelMC.MC_NIVEL_REVEAL_DISCLAIMER}
              </p>
            </div>
            {report.layer3.occupations.length > 0 ? (
              <>
                <ul
                  className="flex flex-col gap-3 motion-safe:animate-fade-in"
                  style={{ animationDelay: "250ms" }}
                >
                  {report.layer3.occupations.slice(0, 5).map((occ) => (
                    <OccupationCard key={occ.id} occ={occ} top3={top3} />
                  ))}
                </ul>
                {report.layer3.occupations.length > 5 ? (
                  <Disclosure triggerLabel={MC.MC_REPORT_OCCUPATIONS_EXPAND}>
                    <ul className="mt-2 flex flex-col gap-3">
                      {report.layer3.occupations.slice(5).map((occ) => (
                        <OccupationCard key={occ.id} occ={occ} top3={top3} />
                      ))}
                    </ul>
                  </Disclosure>
                ) : null}
                <p className="text-sm text-text-secondary">
                  {NivelMC.MC_NIVEL_REVEAL_CTA}
                </p>
              </>
            ) : (
              <p className="text-base text-text-secondary">
                {NivelMC.MC_NIVEL_REVEAL_EMPTY}
              </p>
            )}
            {/* CTA primario al teaser integrado (pantalla 2). Post-captura. */}
            <a
              href="/perfil-integrado"
              className="self-start rounded-full bg-accent px-8 py-4 font-semibold text-secondary transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:-translate-y-0.5 motion-safe:animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              {NivelMC.MC_NIVEL_CLOSE_CTA}
            </a>
          </section>
        )}

        {/* NFR-27 long disclaimer (D3.11) — compliance siempre on en el cierre. */}
        <section
          id="nfr27-long"
          className="rounded-md border border-border-default bg-surface-secondary p-4 text-sm text-text-secondary"
        >
          {MC.MC_REPORT_NFR27_LONG}
        </section>

        {/* Footer — NFR-27 chip + link (compliance), sin survey/waitlist. */}
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
            <a href="/consent">Politica de privacidad</a>
          </p>
        </footer>
      </main>
    );
  }

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

      {/* Capa 1 — above-fold visual + reveal phrase. Sequence <2.0s (UI-SPEC §5):
          title mask 480ms → visual draws (500-1400ms) → phrase fades at 1300ms. */}
      <section className="flex min-h-[100dvh] flex-col items-center gap-6 sm:min-h-0">
        <h1 className="font-display text-[clamp(2.4rem,5vw,3.4rem)] leading-tight text-text-primary motion-safe:animate-line-reveal">
          {MC.MC_REPORT_TITLE}
        </h1>

        <Visual {...(isHexagon ? hexagonProps : genericProps)} />

        {/* Reveal phrase only meaningful on the hexagon path (top-3 combo). */}
        {report.layer1.narrativeTopPhrase ? (
          <p
            className="max-w-prose text-center text-base text-text-secondary motion-safe:animate-fade-in"
            style={{ maxWidth: "65ch", animationDelay: "1300ms" }}
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

      {/* Capa 3 — Revelación ocupacional (O*NET/hexagon only, D-C.3 + Wave 6 §5).
          Gate: sin nivel capturado → LevelCapture (W5). Con nivel → reveal no
          determinista (título + disclaimer + tarjetas con micro-tag de interés +
          CTA al perfil completo). Sin resultados tras los fallbacks → estado
          vacío §5.1 (honesto: el catálogo W4 ship con esta fase). NUNCA "match %". */}
      {needsLevelCapture ? (
        <LevelCapture sessionId={sessionId} />
      ) : isHexagon ? (
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-2xl text-text-primary">
              {NivelMC.MC_NIVEL_REVEAL_TITLE}
            </h2>
            <p className="text-sm text-text-secondary">
              {NivelMC.MC_NIVEL_REVEAL_DISCLAIMER}
            </p>
          </div>
          {report.layer3.occupations.length > 0 ? (
            <>
              <ul className="flex flex-col gap-3">
                {report.layer3.occupations.slice(0, 5).map((occ) => (
                  <OccupationCard key={occ.id} occ={occ} top3={top3} />
                ))}
              </ul>
              {report.layer3.occupations.length > 5 ? (
                <Disclosure triggerLabel={MC.MC_REPORT_OCCUPATIONS_EXPAND}>
                  <ul className="mt-2 flex flex-col gap-3">
                    {report.layer3.occupations.slice(5).map((occ) => (
                      <OccupationCard key={occ.id} occ={occ} top3={top3} />
                    ))}
                  </ul>
                </Disclosure>
              ) : null}
              <p className="text-sm text-text-secondary">
                {NivelMC.MC_NIVEL_REVEAL_CTA}
              </p>
            </>
          ) : (
            <p className="text-base text-text-secondary">
              {NivelMC.MC_NIVEL_REVEAL_EMPTY}
            </p>
          )}
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
