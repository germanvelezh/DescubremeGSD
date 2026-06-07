/**
 * /me/delete/done — Success page after account deletion (Plan 01-10 Task 2).
 *
 * Per UI-SPEC §7.8 Step 3. No auth check here — the user has just been
 * signed out + their auth.users row deleted. This page is reachable
 * post-delete by the redirect from deleteAccountAction.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.8 Step 3.
 */
import Link from "next/link";

import { deleteCopy } from "@/lib/i18n/microcopy/es-CO/delete";

export const dynamic = "force-static";

export default function MeDeleteDonePage() {
  return (
    <main className="mx-auto max-w-xl px-md py-xl text-center">
      <h1 className="text-2xl font-semibold text-text-primary">
        {deleteCopy.MC_DELETE_SUCCESS_HEADING}
      </h1>
      <p className="mt-md text-sm text-text-primary">
        {deleteCopy.MC_DELETE_SUCCESS_BODY}
      </p>
      <p className="mt-lg">
        <Link
          href="/"
          className="inline-block rounded-md bg-accent px-md py-sm text-sm font-semibold text-white shadow-sm hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          {deleteCopy.MC_DELETE_SUCCESS_CTA}
        </Link>
      </p>
    </main>
  );
}
