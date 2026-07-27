/**
 * /perfil-integrado — the integrated teaser climax (UI-SPEC §6.7, §7.4).
 *
 * Server Component. The "magia" final screen of the B2C Free flow:
 *  1. Auth: redirect to /signup if not authenticated (T-01-09-01 + RLS).
 *  2. Resolve the user's 4 computed_score bands + quality flags from their
 *     persisted report snapshots (`resolveTeaserInputs`).
 *  3. Evaluate the declarative teaser (`evaluateTeaser`) over the seeded
 *     `integrator_rule(tier='teaser')` rows.
 *  4. GATE on the EVALUATOR's own all-4 result (D-A.6), NOT on
 *     `resolveNextFreeTest.allComplete` — that returns true on an empty
 *     product_stack (dormant until 02-13), which would leak the teaser with
 *     zero tests done. `resolveNextFreeTest` supplies only the "Te faltan {n}"
 *     copy; the two agree because both count instrument membership.
 *  5. On first reach of completion, send the idempotent FREE-14 email
 *     (`sendFreeCompleteEmail`, audit-guarded) linking to this page.
 *
 * States rendered:
 *  - locked  -> "Completa los 4 tests... Te faltan {n}." (D-A.6).
 *  - gap     -> placeholder while [GAP-TEASER-CROSS-TEMPLATES-ES-CO] is open.
 *  - teaser  -> IntegratedTeaser (phrases + crosses + upsell + waitlist).
 *
 * Plugin-as-data (FOUND-05): no instrument-code literals — bands/codes/rules all
 * come from data. This file is in `app/(b2c)` (NOT a FOUND-05 scan dir) but the
 * data loaders it calls (`lib/integrator/*`) ARE, and stay literal-free.
 *
 * Anchors:
 *   - 02-CONTEXT.md D-A.6 (gate), D-B.1/B.2 (teaser), D-B.3 (upsell), D-F2.1.
 *   - 02-RESEARCH.md § architecture data flow (teaser leg).
 *   - 02-12-PLAN.md Task 3.
 */
import { redirect } from "next/navigation";

import { Starfield } from "@/components/Starfield";
import { sendFreeCompleteEmail } from "@/lib/email/transactional";
import {
  loadFreeOrderedCodes,
  resolveNextFreeTest,
} from "@/lib/free/next-test";
import { teaser as MC } from "@/lib/i18n/microcopy/es-CO/teaser";
import { logger } from "@/lib/logger";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

import { evaluateTeaser } from "@/lib/integrator/teaser";
import {
  loadTeaserRules,
  resolveTeaserInputs,
} from "@/lib/integrator/teaser-data";

import { IntegratedTeaser } from "./_components/IntegratedTeaser";

export const runtime = "nodejs";

/**
 * Marco compartido de los dos estados no-teaser.
 *
 * `locked` y `gap` renderizaban en sans-serif con `font-bold` y sin cielo:
 * fuera del mundo nocturno que el usuario venia viendo desde la transicion, y
 * son dos de los tres finales posibles del flujo. El `role="main"` explicito
 * era redundante con el propio `<main>`.
 */
function TerminalShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative mx-auto max-w-2xl p-6">
      <Starfield className="opacity-70" />
      <div className="relative z-10 flex flex-col items-start gap-5">
        {children}
      </div>
    </main>
  );
}

const TERMINAL_CTA_CLASS =
  "inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-secondary transition-[transform,background-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:-translate-y-0.5 hover:bg-[var(--dm-terracotta-deep)]";

interface UserEmailRow {
  email: string | null;
}

export default async function PerfilIntegradoPage() {
  // 1. Auth.
  const supabaseUserScoped = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabaseUserScoped.auth.getUser();
  if (!user) {
    redirect("/signup?next=/perfil-integrado");
  }

  const admin = getSupabaseAdminClient();

  // 2. Resolve the per-instrument bands + quality flags + the seeded rules.
  const [{ bandsByInstrument, qualityFlaggedCodes }, rules, orderedCodes] =
    await Promise.all([
      resolveTeaserInputs(admin, user.id),
      loadTeaserRules(admin),
      loadFreeOrderedCodes(admin),
    ]);

  // 3. Evaluate. The evaluator owns the authoritative all-4 gate (D-A.6).
  const result = evaluateTeaser({
    bandsByInstrument,
    qualityFlaggedCodes,
    rules,
  });

  // 4. Locked state — gate on the EVALUATOR, not on resolveNextFreeTest (which
  //    reports allComplete on an empty product_stack). resolveNextFreeTest is
  //    used ONLY for the "Te faltan {n}" copy when the ordered list is seeded.
  if (result.kind === "locked") {
    const position = resolveNextFreeTest(
      orderedCodes,
      Object.keys(bandsByInstrument),
    );
    // Prefer the ordered-list remaining count when product_stack is seeded;
    // fall back to the evaluator's missingCount otherwise.
    const missing =
      orderedCodes.length > 0
        ? Math.max(0, position.globalTotal - Object.keys(bandsByInstrument).length)
        : result.missingCount;
    // Link to the next pending test when known; otherwise al mapa, que es la
    // entrada viva del flujo. `/onboarding/before-you-start` era el fallback y
    // pertenece al funnel anterior a ADR-029: habla de "60 actividades" y
    // "10-12 minutos" (un solo test) y su CTA va fija a un instrumento, lo que
    // contradice el mapa de cuatro paradas y el orden BFI-first.
    // NO se toca esa pantalla aca: dos specs E2E la conducen y estan en vuelo
    // en los PRs de la suite. Queda para despues de que mergeen.
    // Un `/test` pelado NO es una ruta (solo `/test/[code]`), nunca enlazar ahi.
    const continueHref = position.nextCode
      ? `/test/${position.nextCode}`
      : "/onboarding/mapa";
    return (
      <TerminalShell>
        <h1 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-normal leading-tight text-text-primary">
          {MC.MC_TEASER_LOCKED_TITLE}
        </h1>
        <p className="max-w-[52ch] text-base text-text-secondary">
          {MC.MC_TEASER_LOCKED_BODY.replace("{n}", String(missing))}
        </p>
        <a href={continueHref} className={TERMINAL_CTA_CLASS}>
          {MC.MC_TEASER_LOCKED_CTA}
          <span aria-hidden="true">&rarr;</span>
        </a>
      </TerminalShell>
    );
  }

  // 5. All 4 present -> send the idempotent FREE-14 completion email best-effort.
  const { data: userRow } = await admin
    .from("user")
    .select("email")
    .eq("id", user.id)
    .maybeSingle();
  const userEmail = (userRow as UserEmailRow | null)?.email ?? user.email ?? "";
  if (userEmail) {
    const appBaseUrl =
      process.env.NEXT_PUBLIC_APP_URL ?? "https://descubreme.co";
    void sendFreeCompleteEmail(
      { to: userEmail, userId: user.id, appBaseUrl },
      { supabaseAdmin: admin },
    ).catch((err) => {
      logger.error(
        { message: (err as Error).message },
        "free_complete_email_dispatch_failed",
      );
    });
  }

  // 6. Gap state — rules empty / no match. Renders without throwing.
  if (result.kind === "gap") {
    return (
      <TerminalShell>
        <h1 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-normal leading-tight text-text-primary">
          {MC.MC_TEASER_HEADING}
        </h1>
        <p className="max-w-[52ch] text-base text-text-secondary">
          {MC.MC_TEASER_GAP_NOTE}
        </p>
        {/* Sin este enlace el estado es un callejon sin salida en el ultimo
            frame del producto, despues de 12-18 minutos de trabajo: los cuatro
            reportes por test SI existen y estan enlazados desde "Mis datos". */}
        <a href="/me/data" className={TERMINAL_CTA_CLASS}>
          {MC.MC_TEASER_GAP_CTA}
          <span aria-hidden="true">&rarr;</span>
        </a>
      </TerminalShell>
    );
  }

  // 7. Teaser — phrases + crosses. omittedForQuality = there was a flag at all.
  //    Night-sky backdrop (direction B): decorative Starfield behind the teaser.
  return (
    <main role="main" className="relative mx-auto max-w-2xl p-6">
      <Starfield className="opacity-70" />
      <div className="relative z-10">
        <IntegratedTeaser
          phrases={result.phrases}
          crosses={result.crosses}
          omittedForQuality={qualityFlaggedCodes.length > 0}
          email={userEmail}
        />
      </div>
    </main>
  );
}
