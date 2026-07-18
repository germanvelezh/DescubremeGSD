/**
 * /onboarding/before-you-start (Server Component) — Plan 01-06 Task 3.
 *
 * Pre-test screen per UI-SPEC §7.2. On render:
 *   1. Read `anonymous_session_id` cookie.
 *   2. If cookie present AND a session row exists with progress>0:
 *      redirect to /test/onet-ip-sf (the resume screen lives there).
 *   3. Otherwise: render hook + time + instruction + "Empezar" CTA.
 *
 * Direction B "Cartografía interior" presentation (auditoria-ux-ui/AUDITORIA.md);
 * the redirect/cookie logic below is unchanged.
 *
 * Anchors:
 * - 01-UI-SPEC.md §7.2.
 * - 01-CONTEXT.md D2.5, D2.8.
 */
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Starfield } from "@/components/Starfield";
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
    <main className="relative mx-auto flex min-h-[100dvh] max-w-3xl flex-col px-5 py-6 sm:px-8">
      <Starfield className="opacity-70" />

      <Link
        href="/"
        className="relative z-10 inline-flex items-center gap-1.5 self-start text-sm text-text-secondary transition-colors hover:text-text-primary"
      >
        <span aria-hidden="true">&larr;</span> {beforeYouStart.MC_BYS_BACK_LABEL}
      </Link>

      <div className="relative z-10 flex flex-1 flex-col justify-center gap-6 py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent motion-safe:animate-fade-in">
          Antes de empezar
        </p>
        <h1 className="max-w-[20ch] font-display text-[clamp(2.2rem,5.5vw,3.7rem)] leading-[1.08] text-text-primary motion-safe:animate-line-reveal">
          {beforeYouStart.MC_BYS_HOOK}
        </h1>

        <div className="flex flex-col gap-3 motion-safe:animate-fade-in" style={{ animationDelay: "200ms" }}>
          <p className="flex items-center gap-2.5 text-base text-text-primary">
            <span
              className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              aria-hidden="true"
            />
            {beforeYouStart.MC_BYS_TIME}
          </p>
          <p className="max-w-[54ch] text-base leading-relaxed text-text-secondary">
            {beforeYouStart.MC_BYS_INSTRUCTION}
          </p>
        </div>

        <Link
          href="/test/onet-ip-sf"
          className="mt-3 inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 font-semibold text-secondary transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:-translate-y-0.5 motion-safe:animate-fade-in"
          style={{ animationDelay: "350ms" }}
        >
          {beforeYouStart.MC_BYS_CTA}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </main>
  );
}
