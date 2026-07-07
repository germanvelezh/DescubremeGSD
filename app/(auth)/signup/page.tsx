/**
 * /signup — registro magic link + 18+ (Ola 1.4 reskin, HANDOFF_UI §3).
 *
 * Signup-first under ADR-029: no prior session/report, so the old top3/hexagon
 * teaser is gone. Reads the intent slug (`?intent=`, from /intencion) and forwards
 * it to the form → user_metadata → recalled on the map (1.6). Country is pre-filled
 * from the `x-geo-country` header (middleware forwards Vercel's ip-country).
 *
 * Anchors:
 * - HANDOFF_UI_v1.0.md §3 (Ola 1.4) + MICROCOPY §2 (Registro).
 * - 01-CONTEXT.md D2.7 (geo pre-fill).
 */
import { headers } from "next/headers";

import { PaperShell } from "@/components/PaperShell";

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

export default async function SignupPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const sessionId = typeof sp.sessionId === "string" ? sp.sessionId : undefined;
  const intent = typeof sp.intent === "string" ? sp.intent : undefined;

  const headerStore = await headers();
  const geoCountry = headerStore.get("x-geo-country") ?? "CO";
  const initialCountry = PROBABLE_LATAM_COUNTRIES.includes(geoCountry) ? geoCountry : "CO";

  return (
    <PaperShell width="medium">
      <SignupForm
        sessionId={sessionId}
        initialCountry={initialCountry}
        countries={PROBABLE_LATAM_COUNTRIES}
        intent={intent}
      />
    </PaperShell>
  );
}
