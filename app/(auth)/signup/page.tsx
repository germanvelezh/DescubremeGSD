/**
 * /signup — "Tu reporte esta listo" (UI-SPEC §7.4) — Plan 01-07 Task 3.
 *
 * Reads `sessionId` + `top3` from search params (set by `/test/[code]/done`)
 * and renders the hexagon preview teaser + signup form. The form posts to
 * the `signupAction` Server Action; on success the user is redirected to
 * `/magic-link/sent?email=<email>`.
 *
 * Country dropdown is pre-filled from the `x-geo-country` header that
 * `middleware.ts` forwards from Vercel's `x-vercel-ip-country`.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.4 (Tu reporte esta listo).
 *  - 01-CONTEXT.md D2.3 (teaser), D2.7 (geo pre-fill).
 */
import { headers } from "next/headers";

import { SignupForm } from "./_components/SignupForm";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const PROBABLE_LATAM_COUNTRIES = [
  "CO",
  "MX",
  "AR",
  "CL",
  "PE",
  "EC",
  "BO",
  "CR",
  "CU",
  "DO",
  "GT",
  "HN",
  "NI",
  "PA",
  "PY",
  "SV",
  "UY",
  "VE",
  "US",
];

export default async function SignupPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const sessionId =
    typeof sp.sessionId === "string" ? sp.sessionId : undefined;
  const top3Raw = typeof sp.top3 === "string" ? sp.top3 : "R,I,A";
  const top3 = top3Raw.split(",").slice(0, 3);

  const headerStore = await headers();
  const geoCountry = headerStore.get("x-geo-country") ?? "CO";
  const initialCountry = PROBABLE_LATAM_COUNTRIES.includes(geoCountry)
    ? geoCountry
    : "CO";

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-2xl flex-col gap-6 p-6">
      <p className="self-start text-base font-semibold text-text-primary">
        DescubreMe
      </p>
      <SignupForm
        sessionId={sessionId}
        initialCountry={initialCountry}
        countries={PROBABLE_LATAM_COUNTRIES}
        top3={[
          // biome-ignore lint/style/noNonNullAssertion: hex preview tolerates default
          (top3[0] ?? "R") as "R" | "I" | "A" | "S" | "E" | "C",
          (top3[1] ?? "I") as "R" | "I" | "A" | "S" | "E" | "C",
          (top3[2] ?? "A") as "R" | "I" | "A" | "S" | "E" | "C",
        ]}
      />
    </main>
  );
}
