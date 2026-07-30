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
 *   - Plan 03-02 (D-15) closed the last two hardcodes of this shell: the block
 *     size now comes from `instrument_version.block_size`, and the stack the
 *     global position counts over is resolved BY DATA
 *     (`resolveActiveProductCode`) instead of being fixed to the Free product.
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
import { BlockProgress } from "./_components/BlockProgress";
import { ProgressIndicator } from "./_components/ProgressIndicator";
import { PretestDisclaimerGate } from "./_components/PretestDisclaimerGate";
import { TestEntryGate } from "./_components/TestEntryGate";

import { instrumentCategoryLabel } from "@/lib/i18n/microcopy/es-CO/instrument-labels";
import { test as testCopy } from "@/lib/i18n/microcopy/es-CO/test";
import { getTestIntro } from "@/lib/i18n/microcopy/es-CO/test-intro";
import { resume } from "@/lib/i18n/microcopy/es-CO/resume";
import { resolveScaleForInstrument } from "@/lib/questionnaire/response-scales";
import { getContentionResources } from "@/lib/ethics/contention";
import { decoupleEthicalFlags } from "@/lib/ethics/middleware";
import { resolveNextFreeTest } from "@/lib/free/next-test";
import {
  loadProductStackMemberships,
  PAID_PRODUCT_CODE,
  requiresPaidAccess,
  resolveActiveProductCode,
  resolveEntitlement,
} from "@/lib/entitlement/resolve";
import {
  resolveBlockPosition,
  resolveDisplayItem,
} from "@/lib/free/runner-navigation";
import { logger } from "@/lib/logger";
import { type ContentionLine } from "@/app/(b2c)/reporte/[sessionId]/_components/ContentionBanner";
import {
  getInstrumentVersionMeta,
  getItemAtSequence,
  getNextItemForSession,
  getOrCreateAnonymousSession,
  getSavedResponse,
  type AnonymousSession,
} from "@/lib/session/anonymous";
import { getOrCreateAuthenticatedSession } from "@/lib/session/authenticated";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type Params = Promise<{ code: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/**
 * Resolves the global "Test g de N · label" position for the current instrument
 * from the seeded `product_stack` order of the ACTIVE journey, joined to the
 * es-CO instrument name for the label (NEVER the raw code).
 *
 * `productCode` is resolved BY DATA upstream (`resolveActiveProductCode`), never
 * fixed to the Free stack (Plan 03-02, D-15). Fixing it was a live defect: a
 * Paid user on a Paid-exclusive instrument lost the line entirely, and on a
 * shared one (O*NET/PERMA, D-11) saw the FREE journey's position.
 *
 * Returns `null` when the guided order is not available (`productCode` null, the
 * stack unseeded, or the current code not in that stack). In that case the
 * runner renders intra-only progress ("Paso X de N"), which is the pre-existing
 * defensive behavior — an invented position is never shown.
 */
async function resolveGlobalPosition(
  instrumentCode: string,
  productCode: string | null,
): Promise<{ current: number; total: number; label: string } | null> {
  if (!productCode) return null;
  try {
    const supabase = getSupabaseAdminClient();
    const { data } = await supabase
      .from("product_stack")
      .select(
        "order, instrument_version!inner(instrument!inner(code, name))",
      )
      .eq("product_code", productCode)
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
    // La etiqueta sale de `instrument-labels.ts` (las mismas 4 de `mapa.ts`,
    // firmadas por Cowork), NO de `instrument.name`: esa columna es el nombre
    // tecnico en ingles ("Twenty-Item Values Inventory") y el usuario acababa
    // de leer "Valores" en el mapa. El `code` va crudo del join
    // ([GAP-INSTRUMENT-CODE-CASING]: nunca `.toUpperCase()`).
    const codes = ordered.map((i) => i.code);
    const completed = codes.slice(0, idx);
    const pos = resolveNextFreeTest(codes, completed);
    return {
      current: pos.globalCurrent,
      total: pos.globalTotal,
      label: instrumentCategoryLabel(current.code),
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

  // ---- Guard `solo-Paid` (criterio 5 del ROADMAP, Plan 03-01) --------------
  //
  // Va ANTES de la compuerta de reanudacion y del early-return de `scale`: si
  // fuera despues, un instrumento exclusivo del Paid le mostraria la pantalla
  // de "sigue donde ibas" a alguien sin acceso.
  //
  // La decision se toma POR DATO (`product_stack`), nunca por una lista de
  // codigos (FOUND-05). Y el predicado es la EXCLUSIVIDAD, no la pertenencia:
  // por D-11, O*NET y PERMA son el mismo `instrument_version` en Free y Paid,
  // asi que preguntar "¿esta en el stack Paid?" mandaria al paywall a los
  // usuarios del Free. Ver lib/entitlement/resolve.ts.
  //
  // Se consulta por `instrument_version_id` (no por codigo): la pregunta es
  // sobre una version, y ademas esquiva [GAP-INSTRUMENT-CODE-CASING].
  //
  // Lecturas con el cliente user-scoped a proposito: `product_stack` tiene
  // politica de lectura publica, y la de `entitlement` DEBE pasar por
  // `own_entitlement_select` (migracion 020) para que esa politica sea la
  // mitad de base de datos del guard doble y no un adorno.
  const stackMemberships = await loadProductStackMemberships(
    supabaseSsr,
    session.instrument_version_id,
  );

  // El entitlement lo necesitan DOS decisiones: el guard, y el stack sobre el
  // que se cuenta el progreso global (Plan 03-02). Se resuelve una sola vez.
  //
  // Solo se consulta si el instrumento pertenece al stack Paid: para BFI o
  // TwIVI la respuesta no puede cambiar ningun resultado, asi que preguntarlo
  // seria una consulta por render del embudo del Free a cambio de nada.
  //
  // Cae a `false` ante error (resolveEntitlement ya devuelve `active:false`):
  // una lectura intermitente no puede paywallear ni reetiquetar el recorrido.
  const inPaidStack = stackMemberships.some(
    (r) => r.product_code === PAID_PRODUCT_CODE,
  );
  const hasPaidEntitlement =
    user && inPaidStack
      ? (await resolveEntitlement(supabaseSsr, user.id)).active
      : false;

  if (requiresPaidAccess(stackMemberships)) {
    // Sin sesion no puede haber entitlement: al paywall, que autentica.
    if (!user) redirect("/paid");
    if (!hasPaidEntitlement) redirect("/paid");
  }

  // Defensive guard (02-20 Gap D): an instrument whose scale is not yet seeded
  // resolves to ready:false with empty anchors. Rendering ItemForm with no
  // anchors produces an empty frozen radiogroup + a dead "Siguiente". Fail loud
  // with a generic es-CO unavailable state BEFORE the resume gate / item logic,
  // so a not-ready instrument never reaches the runner or /done. The message
  // leaks no instrument code or internals (T-02-20-02, CLAUDE.md §9).
  if (!scale.ready) {
    return (
      <main className="dm-paper flex min-h-[100dvh] w-full flex-col items-center justify-center gap-4 p-6 text-center">
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
      <main className="dm-paper flex min-h-[100dvh] w-full flex-col items-center justify-center gap-6 p-6 text-center">
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

  // "Atras" back-view (Ola 2.1): `?item=N` renders a PAST item preloaded. The
  // param is clamped to an already-answered item `[1, progress]` by
  // resolveDisplayItem — an out-of-bounds N is ignored and the frontier is served,
  // which is what prevents the count-driven runner from freezing on a stray/stale
  // URL (see runner-navigation.ts). Absent/invalid → the frontier (next item).
  const displayItem = resolveDisplayItem(sp.item, session.progress);
  const currentItem = displayItem.isBackView
    ? await getItemAtSequence(session.id, displayItem.seq)
    : await getNextItemForSession(session.id);
  if (!currentItem) {
    // Frontier exhausted — transition + /done handles the guided-order routing.
    // (A back-view always resolves an existing item, so only the frontier hits
    // this branch.)
    redirect(`/test/${code}/done`);
  }

  const currentSequence = displayItem.seq;
  // Preload the saved answer when reviewing a past item (back-view).
  const initialValue = displayItem.isBackView
    ? await getSavedResponse(session.id, currentItem.id)
    : null;
  // El recorrido activo sale del DATO: los stacks a los que pertenece este
  // instrument_version, desempatados por el entitlement (D-11). Ya no se fija
  // el stack del Free.
  const activeProductCode = resolveActiveProductCode(
    stackMemberships,
    hasPaidEntitlement,
  );
  const global = await resolveGlobalPosition(instrumentCode, activeProductCode);

  // El tamano de bloque sale del DATO (`instrument_version.block_size`,
  // migracion 019 / D-15). La decision ya NO vive aca: antes era
  // `runnerCode === "ONET-IP-SF" && totalItems === 60 ? 12 : null`, un branch
  // por codigo de instrumento que obligaba a un release para cada instrumento
  // con bloques. Ahora vive en el dato y sembrar uno nuevo es seed.
  // NULL → sin bloques → barra continua.
  const blockSize = meta?.blockSize ?? null;
  const blockPosition = resolveBlockPosition(
    currentSequence,
    totalItems,
    blockSize,
  );

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
  // resources (a discreet "Si quieres hablar con alguien" link) for instruments
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
      // freezing the runner. Keying by item.id resets selected to `initialValue`
      // (null on the frontier, the saved value on a back-view) per item.
      key={currentItem.id}
      item={{
        id: currentItem.id,
        sequenceNumber: currentItem.sequence_number,
        stem: currentItem.stem,
      }}
      sessionId={session.id}
      code={code}
      scaleVariant={scale.variant}
      anchors={[...scale.anchors]}
      points={scale.points}
      // Per-item endpoint anchors come from the item ROW (migration 015),
      // NOT the resolver — they vary by block for numeric-endpoints (PERMA).
      // Labeled-rows rows are NULL here and ignore these (coalesced to "").
      anchorMin={currentItem.anchor_min ?? ""}
      anchorMax={currentItem.anchor_max ?? ""}
      // "Atras" (Ola 2.1): back-view preloads the saved answer; canGoBack shows
      // the "Anterior" control for any item past the first.
      initialValue={initialValue}
      isBackView={displayItem.isBackView}
      canGoBack={currentSequence > 1}
      autosaveChipLabel={testCopy.MC_TEST_AUTOSAVE_CHIP}
      retryChipLabel={testCopy.MC_TEST_AUTOSAVE_RETRY}
      exitLinkLabel={testCopy.MC_TEST_EXIT_LINK}
      nextCtaLabel={testCopy.MC_TEST_NEXT_CTA}
      prevCtaLabel={testCopy.MC_TEST_PREV_CTA}
      continueCtaLabel={testCopy.MC_TEST_CONTINUE_CTA}
    />
  );

  // Test intro (Ola 2.2): shown ONCE at fresh entry (progress === 0, never a
  // back-view). Non-sensitive tests get hook + "antes de comenzar" + "Comenzar";
  // sensitive (BFI/PERMA) embed the NFR-27 block in the same container — a SINGLE
  // gate that blocks item 1 (no double-ack with PretestDisclaimerGate).
  const intro =
    session.progress === 0 && !displayItem.isBackView
      ? getTestIntro(instrumentCode)
      : null;
  const entry = intro ? (
    <TestEntryGate
      hook={intro.hook}
      intro={intro.intro}
      sensitive={showPretestDisclaimer}
      variant={disclaimerVariant}
      contentionLines={contentionLines}
    >
      {itemForm}
    </TestEntryGate>
  ) : showPretestDisclaimer ? (
    // Defensive net: a sensitive test with no seeded intro copy still gets the
    // NFR-27 gate via the original overlay — the safeguard is never skipped.
    <PretestDisclaimerGate
      variant={disclaimerVariant}
      contentionLines={contentionLines}
    >
      {itemForm}
    </PretestDisclaimerGate>
  ) : (
    itemForm
  );

  return (
    // Paper flip (Ola 2.1): full-bleed `.dm-paper` ground covers the nocturnal
    // body gradient (PaperShell pattern); the inner column keeps the max-w-3xl
    // runner layout + sticky header/footer.
    <main className="dm-paper flex min-h-[100dvh] w-full flex-col">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col p-4">
        {/* Sticky header — un instrumento con `block_size` sembrado renderiza
            bloques (O*NET: 5x12); sin el, la barra continua "Vas en X de Y". El
            fallback intra-only queda para el caso sin posicion global. */}
        <header className="sticky top-0 z-10 bg-background py-2">
          {blockPosition && global ? (
            <BlockProgress
              globalCurrent={global.current}
              globalTotal={global.total}
              instrumentLabel={global.label}
              block={blockPosition.block}
              totalBlocks={blockPosition.totalBlocks}
              itemInBlock={blockPosition.itemInBlock}
              blockSize={blockPosition.blockSize}
            />
          ) : global ? (
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
              <p className="mt-2 text-center text-sm font-medium text-text-primary">
                {testCopy.MC_TEST_PROGRESS_VISIBLE(currentSequence, totalItems)}
              </p>
            </>
          )}
        </header>

        {/* Item form — scale shape + anchors resolved from data. The intro/NFR-27
            gate blocks the first item of a fresh-entry test until acknowledged. */}
        <section className="mt-8 flex flex-1 flex-col gap-6">{entry}</section>

        {/* NFR-28 landmark reserved (UI-SPEC §6.4) — populated server-side on report. */}
        <aside
          id="contention-resources"
          role="complementary"
          aria-label={testCopy.MC_TEST_CONTENTION_LANDMARK_ARIA}
          hidden
        />
      </div>
    </main>
  );
}
