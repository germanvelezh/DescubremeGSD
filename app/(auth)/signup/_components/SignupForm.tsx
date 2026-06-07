/**
 * SignupForm — Client Component (Plan 01-07 Task 3).
 *
 * Dual checkbox + email + DOB + country dropdown. The "Ver mi reporte"
 * primary button is disabled until: email valid pattern + DOB present +
 * BOTH consent checkboxes checked. Server Action `signupAction` enforces
 * the same invariants server-side.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.4 (form fields + enable logic).
 *  - 01-CONTEXT.md D2.4 (DOB server-only), D1.2 (subprocesadores acordeon).
 */
"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import { Checkbox } from "@/components/ui/Checkbox";
import { DateField } from "@/components/ui/DateField";
import { Disclosure } from "@/components/ui/Disclosure";
import { HexagonoRiasecPreview } from "@/components/ui/HexagonoRiasecPreview";
import { consentCopy } from "@/lib/i18n/microcopy/es-CO/consent";
import { reportReady } from "@/lib/i18n/microcopy/es-CO/report-ready";
import { signup } from "@/lib/i18n/microcopy/es-CO/signup";
import type { Top3Letter } from "@/lib/riasec/top3";

import {
  type SignupActionResult,
  signupAction,
} from "../actions";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function maxDob(): string {
  const d = new Date();
  d.setUTCFullYear(d.getUTCFullYear() - 18);
  return d.toISOString().slice(0, 10);
}

interface SignupFormProps {
  sessionId?: string;
  initialCountry: string;
  countries: string[];
  top3: [Top3Letter, Top3Letter, Top3Letter];
}

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={disabled || pending}
      aria-busy={pending}
      className="mt-md inline-flex h-12 w-full items-center justify-center rounded-md bg-accent px-md font-semibold text-secondary transition-colors hover:bg-accent-muted hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
    >
      {reportReady.MC_REPORT_READY_CTA_VIEW_REPORT}
    </button>
  );
}

export function SignupForm({
  sessionId,
  initialCountry,
  countries,
  top3,
}: SignupFormProps) {
  const [state, formAction] = useActionState<SignupActionResult | null, FormData>(
    async (prev, formData) => signupAction(prev, formData),
    null,
  );

  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [consentGeneral, setConsentGeneral] = useState(false);
  const [consentSensitive, setConsentSensitive] = useState(false);

  const emailValid = EMAIL_RE.test(email);
  const dobPresent = dob.length === 10;
  const enabled = emailValid && dobPresent && consentGeneral && consentSensitive;

  return (
    <form action={formAction} className="flex flex-col gap-lg">
      <section
        aria-label="Vista previa del hexagono RIASEC"
        className="rounded-lg border border-border-default bg-secondary p-lg"
      >
        <HexagonoRiasecPreview top3={top3} />
        <h1 className="mt-md text-2xl font-semibold text-text-primary">
          {reportReady.MC_REPORT_READY_HEADING}
        </h1>
        <p className="mt-sm text-base text-text-secondary">
          {reportReady.MC_REPORT_READY_TEASER}
        </p>
      </section>

      <p className="text-base text-text-primary">
        {reportReady.MC_REPORT_READY_PROMPT}
      </p>

      <div className="flex flex-col gap-md">
        <div className="flex flex-col gap-xs">
          <label
            htmlFor="signup-email"
            className="text-sm font-medium text-text-primary"
          >
            {signup.MC_SIGNUP_LABEL_EMAIL}
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-describedby="signup-email-helper"
            className="rounded-md border border-border-default bg-secondary px-md py-sm text-base text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            style={{ minHeight: 44 }}
          />
          <p id="signup-email-helper" className="text-sm text-text-secondary">
            {signup.MC_SIGNUP_HELPER_EMAIL}
          </p>
        </div>

        <DateField
          id="signup-dob"
          name="dob"
          label={signup.MC_SIGNUP_LABEL_DOB}
          helperText={signup.MC_SIGNUP_HELPER_DOB}
          errorText={
            state?.field === "dob" ? state.error : undefined
          }
          value={dob}
          onChange={setDob}
          required
          max={maxDob()}
        />

        <div className="flex flex-col gap-xs">
          <label
            htmlFor="signup-country"
            className="text-sm font-medium text-text-primary"
          >
            {signup.MC_SIGNUP_LABEL_GEO}
          </label>
          <select
            id="signup-country"
            name="country"
            defaultValue={initialCountry}
            className="rounded-md border border-border-default bg-secondary px-md py-sm text-base text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            style={{ minHeight: 44 }}
          >
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <p className="text-sm text-text-secondary">
            {signup.MC_SIGNUP_HELPER_GEO}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-sm">
        <Checkbox
          id="consent-general"
          name="consentGeneral"
          label={consentCopy.MC_CONSENT_GENERAL_LABEL}
          helperText={consentCopy.MC_CONSENT_GENERAL_HELPER}
          checked={consentGeneral}
          onChange={setConsentGeneral}
          required
        />
        <Checkbox
          id="consent-sensitive"
          name="consentSensitive"
          label={consentCopy.MC_CONSENT_SENSITIVE_LABEL}
          helperText={consentCopy.MC_CONSENT_SENSITIVE_HELPER}
          checked={consentSensitive}
          onChange={setConsentSensitive}
          required
        />
      </div>

      <Disclosure
        triggerLabel={consentCopy.MC_CONSENT_SUBPROCESSORS_TRIGGER}
      >
        <ul className="list-disc pl-md">
          {consentCopy.MC_CONSENT_SUBPROCESSORS_LIST.map((line) => (
            <li key={line} className="py-xs">
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-sm">
          <a
            href="/consent"
            className="text-accent underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {consentCopy.MC_CONSENT_LEGAL_LINK}
          </a>
        </p>
      </Disclosure>

      {sessionId ? (
        <input type="hidden" name="sessionId" value={sessionId} />
      ) : null}

      {state?.error && state.field !== "dob" ? (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      <SubmitButton disabled={!enabled} />

      <p className="text-center text-xs text-text-secondary">
        {reportReady.MC_REPORT_READY_PRIVACY_INLINE}
      </p>
    </form>
  );
}
