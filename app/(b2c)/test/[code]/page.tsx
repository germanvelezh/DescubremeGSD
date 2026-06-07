/**
 * /test/[code] Server Component shell — Plan 01-06 Task 3.
 *
 * Implements UI-SPEC §7.3 + RESEARCH "Pattern 2" (Server Component
 * shell + Client Component item form).
 *
 * Logic:
 *   - Load instrument metadata + open/create anonymous session.
 *   - If `progress > 0` AND `searchParams.resumed !== 'true'`:
 *     render the resume screen (`MC.RESUME.SCREEN`).
 *   - Otherwise: compute next item; if null → redirect to /done (Plan 01-07).
 *   - Render <ProgressIndicator> + <ItemForm> + reserved NFR-28 aside.
 *
 * Anchors:
 * - 01-UI-SPEC.md §7.3.
 * - 01-RESEARCH.md "Pattern 2" lines 1573-1602.
 * - 01-CONTEXT.md D2.8.
 */
import Link from "next/link";
import { redirect } from "next/navigation";

import { ItemForm } from "./_components/ItemForm";
import { ProgressIndicator } from "./_components/ProgressIndicator";

import { test as testCopy } from "@/lib/i18n/microcopy/es-CO/test";
import { resume } from "@/lib/i18n/microcopy/es-CO/resume";
import { ONET_LIKERT_ANCHORS_ES_CO } from "@/lib/questionnaire/response-scales";
import {
  getNextItemForSession,
  getOrCreateAnonymousSession,
} from "@/lib/session/anonymous";

const TOTAL_ITEMS = 60;

type Params = Promise<{ code: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

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

  // Resume screen: progress already exists and user did NOT click "Continuar".
  if (session.progress > 0 && !resumed) {
    return (
      <main className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col items-center justify-center gap-lg p-lg text-center">
        <h1 className="text-3xl font-semibold leading-tight text-text-primary">
          {resume.MC_RESUME_GREETING}
        </h1>
        <p className="text-base text-text-primary">
          {resume.MC_RESUME_PROGRESS(session.progress, TOTAL_ITEMS)}
        </p>
        <Link
          href={`/test/${code}?resumed=true`}
          className="mt-md inline-flex w-full max-w-xs items-center justify-center rounded-md bg-accent px-md py-sm font-semibold text-secondary transition-colors hover:bg-accent-muted hover:text-accent"
        >
          {resume.MC_RESUME_CTA}
        </Link>
      </main>
    );
  }

  const nextItem = await getNextItemForSession(session.id);
  if (!nextItem) {
    // Completed all 60 items — pantalla /done la implementa Plan 01-07.
    redirect(`/test/${code}/done`);
  }

  const currentSequence = session.progress + 1;

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col p-md">
      {/* Sticky header — progress indicator */}
      <header className="sticky top-0 z-10 bg-background py-sm">
        <ProgressIndicator
          current={currentSequence}
          total={TOTAL_ITEMS}
          ariaLabel={testCopy.MC_TEST_PROGRESSBAR_ARIA(currentSequence, TOTAL_ITEMS)}
        />
        <p className="mt-sm text-center text-sm text-text-secondary">
          {testCopy.MC_TEST_QUESTION_LABEL(currentSequence, TOTAL_ITEMS)}
        </p>
      </header>

      {/* Item form */}
      <section className="mt-xl flex flex-1 flex-col gap-lg">
        <ItemForm
          item={{
            id: nextItem.id,
            sequenceNumber: nextItem.sequence_number,
            stem: nextItem.stem,
          }}
          sessionId={session.id}
          anchors={[...ONET_LIKERT_ANCHORS_ES_CO]}
          total={TOTAL_ITEMS}
          ariaLabel={testCopy.MC_TEST_RADIOGROUP_ARIA_LABEL}
          autosaveChipLabel={testCopy.MC_TEST_AUTOSAVE_CHIP}
          retryChipLabel={testCopy.MC_TEST_AUTOSAVE_RETRY}
          exitLinkLabel={testCopy.MC_TEST_EXIT_LINK}
          nextCtaLabel={testCopy.MC_TEST_NEXT_CTA}
        />
      </section>

      {/* NFR-28 landmark reserved (UI-SPEC §6.9) — empty in Phase 1. */}
      <aside
        id="contention-resources"
        role="complementary"
        aria-label={testCopy.MC_TEST_CONTENTION_LANDMARK_ARIA}
        hidden
      />
    </main>
  );
}
