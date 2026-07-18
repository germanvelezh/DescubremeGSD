/**
 * /onboarding/mapa — the 4-stop journey map (Ola 1.6, HANDOFF_UI §3).
 *
 * Reached post-consent for a FRESH signup (the callback routes returning users
 * straight to their next pending test). Recalls the intent from /intencion (via
 * `?intent=` on the callback redirect, falling back to user_metadata) and previews
 * the 4 tests. The CTA target is resolved data-driven (resolveNextFreeTest over
 * product_stack) — never a hardcoded code (FOUND-05).
 *
 * Auth-gated: no user → /signup. Uses the same admin-client resolution pattern as
 * /test/[code]/done. Without a seeded product_stack (dev, no DB) the resolver
 * returns an empty list and the CTA degrades to /perfil-integrado.
 *
 * Anchors:
 * - HANDOFF_UI_v1.0.md §3 (Ola 1.6) + MICROCOPY §2 (Mapa) + blueprint §6 (no re-onboard).
 * - lib/free/next-test.ts (resolveNextFreeTest + loadFreeOrderedCodes).
 */
import Link from "next/link";
import { redirect } from "next/navigation";

import { PaperShell } from "@/components/PaperShell";
import { loadFreeOrderedCodes, resolveNextFreeTest } from "@/lib/free/next-test";
import { resolveIntent } from "@/lib/i18n/microcopy/es-CO/intencion";
import { MAPA_STOPS, mapa } from "@/lib/i18n/microcopy/es-CO/mapa";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function MapaPage({ searchParams }: { searchParams: SearchParams }) {
  const ssr = await getSupabaseServerClient();
  const {
    data: { user },
  } = await ssr.auth.getUser();
  if (!user) redirect("/signup");

  const sp = await searchParams;
  const metaIntent =
    typeof user.user_metadata?.intent === "string" ? user.user_metadata.intent : null;
  const intent = resolveIntent(typeof sp.intent === "string" ? sp.intent : metaIntent);

  // Resolve the next pending test (data-driven — drives the CTA target).
  const admin = getSupabaseAdminClient();
  const { data: completedRows } = await admin
    .from("assessment_session")
    .select("instrument_version!inner(instrument!inner(code))")
    .eq("user_id", user.id)
    .eq("status", "completed");
  const completedCodes = (
    (completedRows ?? []) as unknown as Array<{
      instrument_version: { instrument: { code: string } } | null;
    }>
  )
    .map((r) => r.instrument_version?.instrument?.code)
    .filter((c): c is string => typeof c === "string" && c.length > 0);
  const orderedCodes = await loadFreeOrderedCodes(admin);
  const pos = orderedCodes.length > 0 ? resolveNextFreeTest(orderedCodes, completedCodes) : null;
  const nextHref = pos && !pos.allComplete && pos.nextCode ? `/test/${pos.nextCode}` : "/perfil-integrado";

  return (
    <PaperShell width="wide" tag={mapa.MC_MAPA_TAG}>
      <div className="flex flex-1 flex-col justify-center pb-10">
        {intent ? (
          <p
            className="mx-auto mb-2 max-w-[48ch] text-center text-[13.5px] font-semibold motion-safe:animate-fade-in"
            style={{ color: "var(--dm-sage-deep)" }}
          >
            {mapa.MC_MAPA_RECALL_PREFIX} {intent.recall} {mapa.MC_MAPA_RECALL_SUFFIX}
          </p>
        ) : null}
        <h1 className="text-center font-display text-[clamp(1.75rem,5vw,2rem)] font-normal leading-tight text-text-primary motion-safe:animate-line-reveal">
          {mapa.MC_MAPA_HEADING}
        </h1>
        <p className="mx-auto mt-2 max-w-[46ch] text-center text-[14px] text-text-secondary motion-safe:animate-fade-in [animation-delay:120ms]">
          {mapa.MC_MAPA_SUB}
        </p>

        <ol className="mx-auto mt-6 flex w-full max-w-[620px] flex-col gap-3">
          {MAPA_STOPS.map((stop, i) => {
            const isLead = i === 0;
            return (
              <li
                key={stop.title}
                style={{ animationDelay: `${180 + i * 80}ms` }}
                className={`flex items-center gap-4 rounded-[14px] border bg-secondary p-4 motion-safe:animate-fade-in ${
                  isLead
                    ? "border-accent shadow-[0_8px_24px_-16px_rgba(176,82,42,0.7)]"
                    : "border-border-default"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-8 w-8 flex-none items-center justify-center rounded-full font-display text-base ${
                    isLead ? "bg-accent text-secondary" : "border border-border-default text-text-primary"
                  }`}
                  style={isLead ? undefined : { backgroundColor: "var(--dm-paper-2)" }}
                >
                  {i + 1}
                </span>
                <span className="flex-1">
                  <span className="block font-semibold text-text-primary">{stop.title}</span>
                  <span className="block text-[13px] text-text-secondary">{stop.desc}</span>
                </span>
                <span className="text-[12.5px] font-semibold" style={{ color: "var(--dm-sage-deep)" }}>
                  {stop.time}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="mt-6 text-center motion-safe:animate-fade-in [animation-delay:560ms]">
          <Link
            href={nextHref}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-secondary transition-[transform,background-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:-translate-y-0.5 hover:bg-[var(--dm-terracotta-deep)]"
          >
            {mapa.MC_MAPA_CTA}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </PaperShell>
  );
}
