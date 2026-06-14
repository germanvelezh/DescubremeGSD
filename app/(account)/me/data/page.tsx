/**
 * /me/data — Tu cuenta (Plan 01-10 Task 2).
 *
 * Server Component per UI-SPEC §7.7. Renders:
 *  - Datos personales: email readonly, name editable, country editable,
 *    DOB readonly + helper "Si necesitas corregir esto, escribinos".
 *  - Tus reportes: lista de report_snapshot con link.
 *  - Tu consentimiento: lista de consent rows + link a /me/consent.
 *  - Disclosure "Descargar todos mis datos (JSON)" -> GET /api/me/data.
 *  - Link "Borrar mi cuenta" -> /me/delete (CLICK 1 of <=2 visible clicks).
 *
 * Auth: cookie-bound SSR client. Unauthenticated -> redirect /signup.
 * PII: DOB + name graceful-null per [BUG-PII-STORAGE-PLAN-07].
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.7 (layout VERBATIM).
 *  - 01-CONTEXT.md D1.5 (delete link is click 1 of <=2 + modal safety net).
 */
import Link from "next/link";
import { redirect } from "next/navigation";

import { Disclosure } from "@/components/ui/Disclosure";
import { account } from "@/lib/i18n/microcopy/es-CO/account";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase/service-role";

import { ProfileForm } from "./ProfileForm";

export const dynamic = "force-dynamic";

// biome-ignore lint/suspicious/noExplicitAny: PostgREST builder type leaks.
type AnyBuilder = any;

interface UserRow {
  id: string;
  email: string;
  country_code: string;
  lang: string;
  created_at: string;
}

interface ReportRow {
  id: string;
  session_id: string;
  rendered_at: string;
}

interface ConsentRow {
  id: string;
  product_code: string;
  consent_version: string;
  granted_at: string;
  revoked_at: string | null;
  consent_general: boolean;
  consent_sensitive_data: boolean;
}

export default async function MeDataPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/signup");
  }

  const admin = getSupabaseAdminClient();
  const [userRes, reportsRes, consentsRes] = await Promise.all([
    (admin.from("user") as AnyBuilder)
      .select("id, email, country_code, lang, created_at")
      .eq("id", user.id)
      .maybeSingle(),
    (admin.from("report_snapshot") as AnyBuilder)
      .select("id, session_id, rendered_at")
      .eq("user_id", user.id),
    (admin.from("consent") as AnyBuilder)
      .select(
        "id, product_code, consent_version, granted_at, revoked_at, consent_general, consent_sensitive_data",
      )
      .eq("user_id", user.id),
  ]);

  const userRow = (userRes.data ?? null) as UserRow | null;
  const reports = (reportsRes.data ?? []) as ReportRow[];
  const consents = (consentsRes.data ?? []) as ConsentRow[];

  return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="text-2xl font-semibold text-text-primary">
        {account.MC_ACCOUNT_HEADING}
      </h1>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-text-primary">
          {account.MC_ACCOUNT_PERSONAL_HEADING}
        </h2>
        <ProfileForm
          email={userRow?.email ?? user.email ?? ""}
          countryCode={userRow?.country_code ?? "CO"}
          name={null /* [BUG-PII-STORAGE-PLAN-07] */}
          dob={null /* [BUG-PII-STORAGE-PLAN-07] */}
        />
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-text-primary">
          {account.MC_ACCOUNT_REPORTS_HEADING}
        </h2>
        {reports.length === 0 ? (
          <p className="mt-2 text-sm text-text-secondary">
            Aun no tienes reportes generados.
          </p>
        ) : (
          <ul className="mt-2 space-y-1">
            {reports.map((r) => (
              <li key={r.id} className="text-sm">
                <Link
                  href={`/reporte/${r.session_id}`}
                  className="text-accent underline-offset-2 hover:underline"
                >
                  Intereses ·{" "}
                  {new Date(r.rendered_at).toLocaleDateString("es-CO")}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-text-primary">
          {account.MC_ACCOUNT_CONSENT_HEADING}
        </h2>
        {consents.length === 0 ? (
          <p className="mt-2 text-sm text-text-secondary">
            No tienes consentimientos registrados.
          </p>
        ) : (
          <ul className="mt-2 space-y-2">
            {consents.map((c) => (
              <li
                key={c.id}
                className="rounded-md border border-border-default p-2 text-sm"
              >
                <div>
                  Producto <strong>{c.product_code}</strong> · v
                  {c.consent_version}{" "}
                  {c.revoked_at ? (
                    <span className="ml-1 text-xs text-text-secondary">
                      ({account.MC_CONSENT_REVOKED_CHIP})
                    </span>
                  ) : null}
                </div>
                <div className="text-xs text-text-secondary">
                  {account.MC_CONSENT_SIGNED_AT}{" "}
                  {new Date(c.granted_at).toLocaleDateString("es-CO")}
                </div>
                <Link
                  href="/me/consent"
                  className="text-xs text-accent underline-offset-2 hover:underline"
                >
                  {account.MC_CONSENT_REVOKE_LINK}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-6">
        <Disclosure triggerLabel={account.MC_ACCOUNT_DOWNLOAD_DATA}>
          <p className="mb-2 text-sm text-text-secondary">
            {account.MC_ACCOUNT_DOWNLOAD_HELPER}
          </p>
          <a
            href="/api/me/data"
            download="my-data.json"
            className="inline-block rounded-md border border-border-default px-4 py-2 text-sm font-medium text-text-primary hover:bg-accent-muted"
          >
            {account.MC_ACCOUNT_DOWNLOAD_DATA}
          </a>
          <p className="mt-2 text-xs text-text-secondary">
            Nota: la descarga requiere sesion activa. Si el browser pide
            credenciales, vuelve a iniciar sesion.
          </p>
        </Disclosure>
      </section>

      <section className="mt-6 border-t border-border-default pt-6">
        <Link
          href="/me/delete"
          className="text-sm font-medium text-destructive underline-offset-2 hover:underline"
          aria-label={account.MC_ACCOUNT_DELETE_LINK}
        >
          {account.MC_ACCOUNT_DELETE_LINK}
        </Link>
      </section>
    </main>
  );
}
