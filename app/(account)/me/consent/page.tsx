/**
 * /me/consent — Revocacion granular (Plan 01-10 Task 2).
 *
 * Per UI-SPEC §7.9. Lists active consents per product_code + the full
 * consent text + a "Revocar este consentimiento" destructive button.
 * The button opens MODAL.DELETE-style confirmation (sobrio variant);
 * on confirm calls revokeConsentAction.
 *
 * The "Que pasa si revoco?" Disclosure shows downstream effects.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.9.
 *  - lib/i18n/microcopy/es-CO/account.ts.
 */
import { redirect } from "next/navigation";

import { Disclosure } from "@/components/ui/Disclosure";
import { account } from "@/lib/i18n/microcopy/es-CO/account";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

import { ConsentCard } from "./ConsentCard";

export const dynamic = "force-dynamic";

// biome-ignore lint/suspicious/noExplicitAny: PostgREST builder type leaks.
type AnyBuilder = any;

interface ConsentRow {
  id: string;
  product_code: string;
  consent_version: string;
  granted_at: string;
  revoked_at: string | null;
  consent_general: boolean;
  consent_sensitive_data: boolean;
}

export default async function MeConsentPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/signup");
  }

  const admin = getSupabaseAdminClient();
  const { data } = await (admin.from("consent") as AnyBuilder)
    .select(
      "id, product_code, consent_version, granted_at, revoked_at, consent_general, consent_sensitive_data",
    )
    .eq("user_id", user.id);

  const rows = (data ?? []) as ConsentRow[];
  const active = rows.filter((r) => r.revoked_at === null);

  return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="text-2xl font-semibold text-text-primary">
        {account.MC_CONSENT_HEADING}
      </h1>

      {active.length === 0 ? (
        <p className="mt-4 text-sm text-text-secondary">
          No tienes consentimientos activos.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {active.map((c) => (
            <ConsentCard
              key={c.id}
              productCode={c.product_code}
              version={c.consent_version}
              grantedAt={c.granted_at}
              consentGeneral={c.consent_general}
              consentSensitive={c.consent_sensitive_data}
            />
          ))}
        </div>
      )}

      <section className="mt-6">
        <Disclosure triggerLabel={account.MC_CONSENT_WHAT_HAPPENS_TRIGGER}>
          <p className="text-sm text-text-secondary">
            {account.MC_CONSENT_WHAT_HAPPENS_BODY}
          </p>
        </Disclosure>
      </section>
    </main>
  );
}
