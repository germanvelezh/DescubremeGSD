/**
 * /onboarding/before-you-start (Server Component) — Plan 01-06 Task 3.
 *
 * Pre-test screen per UI-SPEC §7.2. On render:
 *   1. Read `anonymous_session_id` cookie.
 *   2. If cookie present AND a session row exists with progress>0:
 *      redirect to /test/onet-ip-sf (the resume screen lives there).
 *   3. Otherwise: render hook + time + instruction + "Empezar" CTA.
 *
 * Anchors:
 * - 01-UI-SPEC.md §7.2.
 * - 01-CONTEXT.md D2.5, D2.8.
 */
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { beforeYouStart } from "@/lib/i18n/microcopy/es-CO/before-you-start";
import { ANONYMOUS_COOKIE_NAME } from "@/lib/session/anonymous";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

export default async function BeforeYouStartPage() {
  const cookieStore = await cookies();
  const anonId = cookieStore.get(ANONYMOUS_COOKIE_NAME)?.value;

  if (anonId && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const supabase = getSupabaseAdminClient();
      const { data } = await supabase
        .from("assessment_session")
        .select("progress, user_id")
        .eq("anonymous_session_id", anonId)
        .maybeSingle();
      const row = data as { progress: number; user_id: string | null } | null;
      if (row && row.progress > 0) {
        redirect("/test/onet-ip-sf");
      }
    } catch {
      // No DB at build-time / preview: render the page normally.
    }
  }

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col gap-6 p-6">
      <Link
        href="/"
        className="self-start text-sm text-text-secondary hover:text-text-primary"
      >
        &larr; {beforeYouStart.MC_BYS_BACK_LABEL}
      </Link>
      <div className="mt-8 flex flex-1 flex-col gap-4">
        <h1 className="text-3xl font-semibold leading-tight text-text-primary">
          {beforeYouStart.MC_BYS_HOOK}
        </h1>
        <p className="text-base text-text-primary">
          {beforeYouStart.MC_BYS_TIME}
        </p>
        <p className="text-base text-text-secondary">
          {beforeYouStart.MC_BYS_INSTRUCTION}
        </p>
        <Link
          href="/test/onet-ip-sf"
          className="mt-6 inline-flex w-full max-w-xs items-center justify-center rounded-md bg-accent px-4 py-2 font-semibold text-secondary transition-colors hover:bg-accent-muted hover:text-accent"
        >
          {beforeYouStart.MC_BYS_CTA}
        </Link>
      </div>
    </main>
  );
}
