/**
 * SignupForm — Client Component (Ola 1.4 registro reskin, HANDOFF_UI §3).
 *
 * Under ADR-029 (signup-first funnel) there is no prior session/report at signup,
 * so the old "Tu reporte esta listo" teaser + RIASEC hexagon preview are removed;
 * the screen now uses the MICROCOPY §2 "Registro" framing. The fields (email, DOB,
 * country) + dual consent (COMPL-01) + subprocesadores disclosure are kept as-is
 * (DOB is the age-verification mechanism; the labels are E2E-pinned). The consent
 * block is wrapped in a single contained card ("aceptar y listo" — 1.5); the legal
 * text at /consent is untouched. The intent slug (1.3) rides as a hidden field.
 *
 * The "Enviarme el enlace" button is disabled until email valid + DOB present +
 * BOTH consent checkboxes checked. Server Action `signupAction` re-enforces this.
 *
 * Anchors:
 * - HANDOFF_UI_v1.0.md §3 (Ola 1.4 + 1.5) + MICROCOPY §2 (Registro).
 * - 01-UI-SPEC.md §7.4 (form fields + enable logic), 01-CONTEXT.md D2.4 (DOB server-only).
 */
"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import { Checkbox } from "@/components/ui/Checkbox";
import { DateField } from "@/components/ui/DateField";
import { Disclosure } from "@/components/ui/Disclosure";
import { consentCopy } from "@/lib/i18n/microcopy/es-CO/consent";
import { signup } from "@/lib/i18n/microcopy/es-CO/signup";

import { type SignupActionResult, signupAction } from "../actions";

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
  intent?: string;
}

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={disabled || pending}
      aria-busy={pending}
      className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-4 font-semibold text-secondary transition-[transform,background-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:-translate-y-0.5 hover:bg-[var(--dm-terracotta-deep)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
    >
      {signup.MC_SIGNUP_CTA}
      <span aria-hidden="true">&rarr;</span>
    </button>
  );
}

export function SignupForm({ sessionId, initialCountry, countries, intent }: SignupFormProps) {
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
    <form action={formAction} className="flex flex-1 flex-col justify-center gap-6 pb-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
          {signup.MC_SIGNUP_EYEBROW}
        </p>
        <h1 className="mt-2 font-display text-[clamp(1.75rem,5vw,2.25rem)] font-normal leading-tight text-text-primary motion-safe:animate-line-reveal">
          {signup.MC_SIGNUP_HEADING}
        </h1>
        <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-text-secondary">
          {signup.MC_SIGNUP_BODY}
        </p>
      </div>

      <div className="flex flex-col gap-4 motion-safe:animate-fade-in [animation-delay:150ms]">
        <div className="flex flex-col gap-1">
          <label htmlFor="signup-email" className="text-sm font-medium text-text-primary">
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
            className="rounded-md border border-border-default bg-secondary px-4 py-2 text-base text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
          errorText={state?.field === "dob" ? state.error : undefined}
          value={dob}
          onChange={setDob}
          required
          max={maxDob()}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="signup-country" className="text-sm font-medium text-text-primary">
            {signup.MC_SIGNUP_LABEL_GEO}
          </label>
          <select
            id="signup-country"
            name="country"
            defaultValue={initialCountry}
            className="rounded-md border border-border-default bg-secondary px-4 py-2 text-base text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            style={{ minHeight: 44 }}
          >
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <p className="text-sm text-text-secondary">{signup.MC_SIGNUP_HELPER_GEO}</p>
        </div>
      </div>

      {/* Consent container (1.5 — "aceptar y listo"): dual checkbox (COMPL-01) +
          subprocesadores disclosure in a single contained card. Legal text intact. */}
      <div className="flex flex-col gap-2 rounded-[14px] border border-border-default bg-surface-secondary p-4 motion-safe:animate-fade-in [animation-delay:150ms]">
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
        <Disclosure triggerLabel={consentCopy.MC_CONSENT_SUBPROCESSORS_TRIGGER}>
          <ul className="list-disc pl-4">
            {consentCopy.MC_CONSENT_SUBPROCESSORS_LIST.map((line) => (
              <li key={line} className="py-1">
                {line}
              </li>
            ))}
          </ul>
          <p className="mt-2">
            <a
              href="/consent"
              className="text-accent underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {consentCopy.MC_CONSENT_LEGAL_LINK}
            </a>
          </p>
        </Disclosure>
      </div>

      {sessionId ? <input type="hidden" name="sessionId" value={sessionId} /> : null}
      {intent ? <input type="hidden" name="intent" value={intent} /> : null}

      {state?.error && state.field !== "dob" ? (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 motion-safe:animate-fade-in [animation-delay:150ms]">
        <SubmitButton disabled={!enabled} />
        <p className="text-center text-xs text-text-secondary">
          {signup.MC_SIGNUP_PRIVACY_INLINE}
        </p>
      </div>
    </form>
  );
}
