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

import { test as testCopy } from "@/lib/i18n/microcopy/es-CO/test";
import { resume } from "@/lib/i18n/microcopy/es-CO/resume";
import { resolveScaleForInstrument } from "@/lib/questionnaire/response-scales";
import {
  FREE_PRODUCT_CODE,
  resolveNextFreeTest,
} from "@/lib/free/next-test";
import {
  getInstrumentVersionMeta,
  getNextItemForSession,
  getOrCreateAnonymousSession,
} from "@/lib/session/anonymous";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

type Params = Promise<{ code: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/**
 * Resolves the global "Test g de N" position for the current instrument from the
 * seeded Free `product_stack` order. Dormant until 02-13 seeds the stack — when
 * the ordered list is empty OR does not contain the current code, falls back to
 * a single-instrument display ("Test 1 de 1") so the LIVE O*NET header never
 * regresses to "Test 0 de 0".
 */
async function resolveGlobalPosition(
  instrumentCode: string,
): Promise<{ current: number; total: number; label: string }> {
  const fallback = { current: 1, total: 1, label: instrumentCode };
  try {
    const supabase = getSupabaseAdminClient();
    const { data } = await supabase
      .from("product_stack")
      .select("order, instrument_version!inner(instrument!inner(code))")
      .eq("product_code", FREE_PRODUCT_CODE)
      .order("order", { ascending: true });
    const rows = (data ?? []) as unknown as Array<{
      instrument_version: { instrument: { code: string } } | null;
    }>;
    const ordered = rows
      .map((r) => r.instrument_version?.instrument?.code)
      .filter((c): c is string => typeof c === "string");
    const idx = ordered.findIndex(
      (c) => c.toUpperCase() === instrumentCode.toUpperCase(),
    );
    if (ordered.length === 0 || idx === -1) return fallback;
    // Treat all instruments before the current one as completed for the
    // global position (the user reached this instrument in the guided order).
    const completed = ordered.slice(0, idx);
    const pos = resolveNextFreeTest(ordered, completed);
    return {
      current: pos.globalCurrent,
      total: pos.globalTotal,
      label: instrumentCode,
    };
  } catch {
    return fallback;
  }
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

  const session = await getOrCreateAnonymousSession(instrumentCode);

  // Data-driven metadata: N + scale + visual from the instrument_version row.
  const meta = await getInstrumentVersionMeta(session.instrument_version_id);
  // N from the seed (item_count). No hardcoded 60.
  const totalItems = meta?.itemCount ?? 0;
  const scale = resolveScaleForInstrument(meta?.instrumentCode ?? instrumentCode);

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
          className="mt-4 inline-flex w-full max-w-xs items-center justify-center rounded-md bg-accent px-4 py-2 font-semibold text-secondary transition-colors hover:bg-accent-muted hover:text-accent"
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

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col p-4">
      {/* Sticky header — double-level progress (global + intra). */}
      <header className="sticky top-0 z-10 bg-background py-2">
        <DoubleLevelProgress
          globalCurrent={global.current}
          globalTotal={global.total}
          intraCurrent={currentSequence}
          intraTotal={totalItems}
          instrumentLabel={global.label}
        />
      </header>

      {/* Item form — scale shape + anchors resolved from data. */}
      <section className="mt-8 flex flex-1 flex-col gap-6">
        <ItemForm
          item={{
            id: nextItem.id,
            sequenceNumber: nextItem.sequence_number,
            stem: nextItem.stem,
          }}
          sessionId={session.id}
          scaleVariant={scale.variant}
          anchors={[...scale.anchors]}
          points={scale.points}
          anchorMin={scale.anchorMin}
          anchorMax={scale.anchorMax}
          total={totalItems}
          ariaLabel={testCopy.MC_TEST_RADIOGROUP_ARIA_LABEL}
          autosaveChipLabel={testCopy.MC_TEST_AUTOSAVE_CHIP}
          retryChipLabel={testCopy.MC_TEST_AUTOSAVE_RETRY}
          exitLinkLabel={testCopy.MC_TEST_EXIT_LINK}
          nextCtaLabel={testCopy.MC_TEST_NEXT_CTA}
        />
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
