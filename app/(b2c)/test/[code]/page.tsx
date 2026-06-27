/**
 * /test/[code] Server Component shell — Plan 01-06 Task 3, generalized in
 * Plan 02-07 (data-driven 4-test guided journey).
 *
 * The runner is now data-driven (D-A.1/A.4/A.5, D-F1.2, D-F4.1):
 *   - Item count N, likert range, and the report `visual_type` come from the
 *     instrument_version metadata — there is NO `TOTAL_ITEMS = 60` constant and
 *     NO O*NET anchor import. The scale shape (labeled-rows | numeric-endpoints)
 *     + anchors are resolved by `resolveScaleForInstrument` (the anchor data
 *     lives in `response-scales.ts`, the one FOUND-05-excluded home for it).
 *   - The header shows DoubleLevelProgress (global "Test g de N" + intra
 *     "Paso i de N"). Global position comes from `resolveNextFreeTest` over the
 *     seeded `product_stack` order; when that stack is not yet seeded the runner
 *     falls back to a sane single-instrument display (no "Test 0 de 0").
 *
 * Guided-order routing (D-A.5/D-F3.1) and the transition screen + NFR-27 modal
 * mount live on the /done → transition path (TransitionScreen, 02-07); this
 * shell serves items + progress for the CURRENT instrument.
 *
 * Anchors:
 * - 02-UI-SPEC.md §6.5 (DoubleLevelProgress), §6.9 (scaleVariant), §7.1.
 * - 02-CONTEXT.md D-A.5, D-F1.2, D-F4.1; D-GATE.1 (N from seed).
 * - 01-UI-SPEC.md §7.3 (inherited shell + resume).
 */
import Link from "next/link";
import { redirect } from "next/navigation";

import { ItemForm } from "./_components/ItemForm";
import { DoubleLevelProgress } from "./_components/DoubleLevelProgress";
import { ProgressIndicator } from "./_components/ProgressIndicator";
import { PretestDisclaimerGate } from "./_components/PretestDisclaimerGate";

import { test as testCopy } from "@/lib/i18n/microcopy/es-CO/test";
import { resume } from "@/lib/i18n/microcopy/es-CO/resume";
import { resolveScaleForInstrument } from "@/lib/questionnaire/response-scales";
import { getContentionResources } from "@/lib/ethics/contention";
import { decoupleEthicalFlags } from "@/lib/ethics/middleware";
import {
  FREE_PRODUCT_CODE,
  resolveNextFreeTest,
} from "@/lib/free/next-test";
import { logger } from "@/lib/logger";
import { type ContentionLine } from "@/app/(b2c)/reporte/[sessionId]/_components/ContentionBanner";
import {
  getInstrumentVersionMeta,
  getNextItemForSession,
  getOrCreateAnonymousSession,
  type AnonymousSession,
} from "@/lib/session/anonymous";
import { getOrCreateAuthenticatedSession } from "@/lib/session/authenticated";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type Params = Promise<{ code: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/**
 * Resolves the global "Test g de N · label" position for the current instrument
 * from the seeded Free `product_stack` order, joined to the es-CO instrument
 * name for the label (NEVER the raw code).
 *
 * Returns `null` when the guided order is not yet available (`product_stack`
 * unseeded — dormant until 02-13 — or the current code is not in the Free
 * stack). In that case the runner renders intra-only progress ("Paso X de N"),
 * which is exact Phase-1 parity: the LIVE O*NET funnel shows NO global line and
 * NO raw code, so there is no regression. The global "Test g de N · {name}" line
 * appears for the first time only once the stack is seeded.
 */
async function resolveGlobalPosition(
  instrumentCode: string,
): Promise<{ current: number; total: number; label: string } | null> {
  try {
    const supabase = getSupabaseAdminClient();
    const { data } = await supabase
      .from("product_stack")
      .select(
        "order, instrument_version!inner(instrument!inner(code, name))",
      )
      .eq("product_code", FREE_PRODUCT_CODE)
      .order("order", { ascending: true });
    const rows = (data ?? []) as unknown as Array<{
      instrument_version: { instrument: { code: string; name: string } } | null;
    }>;
    const ordered = rows
      .map((r) => r.instrument_version?.instrument)
      .filter((i): i is { code: string; name: string } => i != null);
    const idx = ordered.findIndex(
      (i) => i.code.toUpperCase() === instrumentCode.toUpperCase(),
    );
    const current = ordered[idx];
    if (ordered.length === 0 || !current) return null;
    // Treat all instruments before the current one as completed for the
    // global position (the user reached this instrument in the guided order).
    // NOTE: `name` is the instrument's es-CO label — 02-13 should seed a
    // user-facing label (e.g. "Intereses") rather than the technical name; this
    // line is only reached once `product_stack` is seeded.
    const codes = ordered.map((i) => i.code);
    const completed = codes.slice(0, idx);
    const pos = resolveNextFreeTest(codes, completed);
    return {
      current: pos.globalCurrent,
      total: pos.globalTotal,
      label: current.name,
    };
  } catch {
    return null;
  }
}

/**
 * Resolves the item count N for the runner with a SINGLE source of truth and
 * NO silent "de 0" mask (GAP-2, [GAP-AUTH-4TEST-RUNTIME] HARDENING).
 *
 * Phase-1 defaulted a null `meta?.itemCount` to zero, which rendered
 * "Pregunta X de 0" to the user — masking a real data
 * fault as a valid-looking state. Here, when `metaItemCount` is null/0, fall
 * back to the REAL count of `item` rows for `instrument_version_id` (the same
 * source that already feeds the numerator via `getNextItemForSession` and the
 * /done close). If that is ALSO 0, the instrument has no items seeded — a real
 * data fault — so fail loud rather than render "de 0".
 */
async function resolveTotalItems(
  instrumentVersionId: string,
  metaItemCount: number | null,
  instrumentCode: string,
): Promise<number> {
  if (metaItemCount != null && metaItemCount > 0) return metaItemCount;

  const supabase = getSupabaseAdminClient();
  const { count, error } = await supabase
    .from("item")
    .select("id", { count: "exact", head: true })
    .eq("instrument_version_id", instrumentVersionId);
  if (error) {
    throw new Error(
      `Failed to count items for instrument_version=${instrumentVersionId} (${instrumentCode}): ${error.message}`,
    );
  }
  const real = count == null ? 0 : count;
  if (real <= 0) {
    throw new Error(
      `No items seeded for instrument_version=${instrumentVersionId} (${instrumentCode}); cannot render the runner (would show "de 0").`,
    );
  }
  return real;
}

export default async function TestPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { code } = await params;
  const sp = await searchParams;
  const resumed = sp.resumed === "true";

  // Normalize URL code to instrument.code casing — DB stores uppercase.
  const instrumentCode = code.toUpperCase();

  // Auth-vs-anon session lifecycle. The user is resolved server-side via
  // getUser() (validated JWT, NOT getSession's raw cookie — COMPL-17 /
  // T-02-14-01). A signed-in user gets an authenticated session (user_id, no
  // caducidad); an anonymous visitor keeps the intact Phase-1 O*NET path.
  const supabaseSsr = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabaseSsr.auth.getUser();

  const session: AnonymousSession = user
    ? await getOrCreateAuthenticatedSession(instrumentCode, user.id)
    : await getOrCreateAnonymousSession(instrumentCode);

  // Data-driven metadata: N + scale + visual from the instrument_version row.
  const meta = await getInstrumentVersionMeta(session.instrument_version_id);
  // N with a single source of truth + fail-loud (no "de 0" mask, GAP-2).
  const totalItems = await resolveTotalItems(
    session.instrument_version_id,
    meta?.itemCount ?? null,
    meta?.instrumentCode ?? instrumentCode,
  );
  const scale = resolveScaleForInstrument(meta?.instrumentCode ?? instrumentCode);

  // Defensive guard (02-20 Gap D): an instrument whose scale is not yet seeded
  // resolves to ready:false with empty anchors. Rendering ItemForm with no
  // anchors produces an empty frozen radiogroup + a dead "Siguiente". Fail loud
  // with a generic es-CO unavailable state BEFORE the resume gate / item logic,
  // so a not-ready instrument never reaches the runner or /done. The message
  // leaks no instrument code or internals (T-02-20-02, CLAUDE.md §9).
  if (!scale.ready) {
    return (
      <main className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-2xl font-semibold leading-tight text-text-primary">
          {testCopy.MC_TEST_UNAVAILABLE_TITLE}
        </h1>
        <p className="text-base text-text-secondary">
          {testCopy.MC_TEST_UNAVAILABLE_BODY}
        </p>
      </main>
    );
  }

  // Resume screen: progress already exists and user did NOT click "Continuar".
  if (session.progress > 0 && !resumed) {
    return (
      <main className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col items-center justify-center gap-6 p-6 text-center">
        <h1 className="text-3xl font-semibold leading-tight text-text-primary">
          {resume.MC_RESUME_GREETING}
        </h1>
        <p className="text-base text-text-primary">
          {resume.MC_RESUME_PROGRESS(session.progress, totalItems)}
        </p>
        <Link
          href={`/test/${code}?resumed=true`}
          className="mt-4 inline-flex w-full max-w-xs items-center justify-center rounded-md bg-accent px-4 py-2 font-semibold text-secondary transition-transform duration-200 ease-out hover:-translate-y-0.5"
        >
          {resume.MC_RESUME_CTA}
        </Link>
      </main>
    );
  }

  const nextItem = await getNextItemForSession(session.id);
  if (!nextItem) {
    // Completed all items — transition + /done handles the guided-order routing.
    redirect(`/test/${code}/done`);
  }

  const currentSequence = session.progress + 1;
  const global = await resolveGlobalPosition(instrumentCode);

  // NFR-27 pre-test gate (ADR-029): when a sensitive instrument
  // (ethical_flags.pretest_modal) is the user's FIRST test — fresh entry, i.e.
  // session.progress === 0 — reliable because assessment_session.progress is
  // `not null default 0` (mig 002) and getOrCreateAuthenticatedSession inserts
  // progress: 0, so 0 (never null) means "no items answered"; the resume gate
  // above already returned for progress > 0 — the DisclaimerModal blocks item 1.
  // Centralizing the gate
  // here (not on the /done transition) covers BOTH the callback-first BFI entry
  // (ADR-029) and the transition-reached PERMA, with no double-show. The variant
  // mirrors the /done derivation (02-18 Task 2); pretest_modal is server data,
  // never a client instrument check (FOUND-05 / T-02-07-03).
  const ethics = decoupleEthicalFlags(meta?.ethicalFlags ?? null);
  const showPretestDisclaimer = session.progress === 0 && ethics.pretestModal;
  const disclaimerVariant: "bfi" | "perma" = instrumentCode.includes("PERMA")
    ? "perma"
    : "bfi";

  // NFR-28 (ADR-029, option a): the pre-test disclaimer surfaces contention
  // resources (a discreet "Si querés hablar con alguien" link) for instruments
  // with contention_route (BFI/PERMA). Loaded only when the gate shows, mirroring
  // the report's loader + mapping (lib/ethics/contention.ts). A failure must
  // NEVER block the test — it degrades to no lines (the disclaimer still shows).
  let contentionLines: ContentionLine[] = [];
  if (showPretestDisclaimer && ethics.contentionRoute) {
    try {
      const admin = getSupabaseAdminClient();
      let userCountry = "CO";
      if (user?.id) {
        const { data: userRow } = await admin
          .from("user")
          .select("country_code")
          .eq("id", user.id)
          .maybeSingle();
        userCountry =
          (userRow as { country_code: string | null } | null)?.country_code ??
          "CO";
      }
      const resources = await getContentionResources(admin, userCountry);
      contentionLines = resources
        .filter((r): r is typeof r & { phone: string } => Boolean(r.phone))
        .map((r) => ({
          name: r.name,
          phone: r.phone,
          description: r.description_es_co || undefined,
        }));
    } catch (contentionErr) {
      logger.warn(
        {
          err:
            contentionErr instanceof Error
              ? contentionErr.message
              : String(contentionErr),
        },
        "test_pretest_contention_load_failed",
      );
    }
  }

  const itemForm = (
    <ItemForm
      // Remount on every item (02-20 Rule 1 bug surfaced by the new e2e):
      // router.refresh() preserves client useState by design, so without a
      // per-item key the `selected` value persisted across an advance and the
      // next item rendered with the previous Likert option already checked.
      // Re-tapping the SAME value (a very common answer pattern) was then a
      // no-op (radio already checked -> no onChange -> no save -> no advance),
      // freezing the runner. Keying by item.id resets selected/chip/pending so
      // every item starts unselected.
      key={nextItem.id}
      item={{
        id: nextItem.id,
        sequenceNumber: nextItem.sequence_number,
        stem: nextItem.stem,
      }}
      sessionId={session.id}
      code={code}
      scaleVariant={scale.variant}
      anchors={[...scale.anchors]}
      points={scale.points}
      // Per-item endpoint anchors come from the item ROW (migration 015),
      // NOT the resolver — they vary by block for numeric-endpoints (PERMA).
      // Labeled-rows rows are NULL here and ignore these (coalesced to "").
      anchorMin={nextItem.anchor_min ?? ""}
      anchorMax={nextItem.anchor_max ?? ""}
      total={totalItems}
      ariaLabel={testCopy.MC_TEST_RADIOGROUP_ARIA_LABEL}
      autosaveChipLabel={testCopy.MC_TEST_AUTOSAVE_CHIP}
      retryChipLabel={testCopy.MC_TEST_AUTOSAVE_RETRY}
      exitLinkLabel={testCopy.MC_TEST_EXIT_LINK}
      nextCtaLabel={testCopy.MC_TEST_NEXT_CTA}
    />
  );

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col p-4">
      {/* Sticky header — double-level progress once the guided order is seeded;
          intra-only (Phase-1 parity, no global line / no raw code) while it is
          dormant, so the live O*NET funnel never regresses. */}
      <header className="sticky top-0 z-10 bg-background py-2">
        {global ? (
          <DoubleLevelProgress
            globalCurrent={global.current}
            globalTotal={global.total}
            intraCurrent={currentSequence}
            intraTotal={totalItems}
            instrumentLabel={global.label}
          />
        ) : (
          <>
            <ProgressIndicator
              current={currentSequence}
              total={totalItems}
              ariaLabel={testCopy.MC_TEST_PROGRESSBAR_ARIA(
                currentSequence,
                totalItems,
              )}
            />
            <p className="mt-2 text-center text-sm text-text-secondary">
              {testCopy.MC_TEST_QUESTION_LABEL(currentSequence, totalItems)}
            </p>
          </>
        )}
      </header>

      {/* Item form — scale shape + anchors resolved from data. The NFR-27 gate
          blocks the first item of a sensitive test until acknowledged. */}
      <section className="mt-8 flex flex-1 flex-col gap-6">
        {showPretestDisclaimer ? (
          <PretestDisclaimerGate
            variant={disclaimerVariant}
            contentionLines={contentionLines}
          >
            {itemForm}
          </PretestDisclaimerGate>
        ) : (
          itemForm
        )}
      </section>

      {/* NFR-28 landmark reserved (UI-SPEC §6.4) — populated server-side on report. */}
      <aside
        id="contention-resources"
        role="complementary"
        aria-label={testCopy.MC_TEST_CONTENTION_LANDMARK_ARIA}
        hidden
      />
    </main>
  );
}
