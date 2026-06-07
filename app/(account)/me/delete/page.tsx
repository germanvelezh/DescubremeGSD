/**
 * /me/delete — Borrar mi cuenta Step 1 (Plan 01-10 Task 2).
 *
 * Per UI-SPEC §7.8 Step 1. The "Borrar mi cuenta" button is CLICK 2 of
 * the visible <=2 clicks invariant (COMPL-07). Clicking it opens
 * MODAL.DELETE.CONFIRM as the intermediate safety net (D1.5).
 *
 * Click counter (E2E-asserted):
 *  - Click 1: link "Borrar mi cuenta" en /me/data -> arrives here.
 *  - Click 2: destructive primary button below -> opens modal.
 *  - Modal CONFIRM is the safety-net click (NOT counted as a flow step
 *    per UI-SPEC §7.8 lines 906-913).
 *
 * Auth: redirect to /signup if not authenticated.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.8 (layout VERBATIM).
 *  - lib/i18n/microcopy/es-CO/delete.ts.
 */
import Link from "next/link";
import { redirect } from "next/navigation";

import { deleteCopy } from "@/lib/i18n/microcopy/es-CO/delete";
import { getSupabaseServerClient } from "@/lib/supabase/server";

import { DeleteAccountFlow } from "./DeleteAccountFlow";

export const dynamic = "force-dynamic";

export default async function MeDeletePage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/signup");
  }

  return (
    <main className="mx-auto max-w-2xl px-md py-lg">
      <Link
        href="/me/data"
        className="text-sm text-text-secondary underline-offset-2 hover:underline"
      >
        ← {deleteCopy.MC_DELETE_BACK}
      </Link>

      <h1 className="mt-md text-2xl font-semibold text-text-primary">
        {deleteCopy.MC_DELETE_HEADING}
      </h1>

      <p className="mt-md text-sm text-text-primary">
        {deleteCopy.MC_DELETE_BODY_INTRO}
      </p>
      <ul className="mt-sm list-inside list-disc space-y-xs text-sm text-text-primary">
        {deleteCopy.MC_DELETE_BODY_ITEMS.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      <p className="mt-md text-sm text-text-secondary">
        {deleteCopy.MC_DELETE_BODY_ANONYMIZED}
      </p>

      <p className="mt-md text-sm font-semibold text-red-700">
        {deleteCopy.MC_DELETE_BODY_IRREVERSIBLE}
      </p>

      <DeleteAccountFlow />

      <p className="mt-sm">
        <Link
          href="/me/data"
          className="text-sm text-text-secondary underline-offset-2 hover:underline"
        >
          {deleteCopy.MC_DELETE_GHOST_CTA}
        </Link>
      </p>
    </main>
  );
}
