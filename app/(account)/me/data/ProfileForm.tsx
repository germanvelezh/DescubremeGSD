/**
 * ProfileForm — Editable profile inputs (Plan 01-10 Task 2).
 *
 * Client Component. Uses React 19 `useActionState` to bind to
 * `updateProfileAction`. The form only contains the WHITELISTED fields
 * (name, country_code). Email is readonly. DOB is readonly with helper
 * text per UI-SPEC §7.7.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.7.
 *  - lib/i18n/microcopy/es-CO/account.ts.
 */
"use client";

import { useActionState } from "react";

import { account } from "@/lib/i18n/microcopy/es-CO/account";
import { onboardingNivel } from "@/lib/i18n/microcopy/es-CO/onboarding-nivel";

import { type UpdateProfileResult, updateProfileAction } from "./actions";

interface ProfileFormProps {
  email: string;
  name: string | null;
  countryCode: string;
  dob: string | null;
  // Phase 02.1 — level of preparation (Job Zone inputs). Editable here so the
  // user can update or CLEAR them (revocation, pack §4). Null = not captured.
  educationLevel: string | null;
  careerStage: string | null;
}

const COUNTRY_OPTIONS = [
  { code: "CO", label: "Colombia" },
  { code: "MX", label: "Mexico" },
  { code: "AR", label: "Argentina" },
  { code: "CL", label: "Chile" },
  { code: "PE", label: "Peru" },
  { code: "EC", label: "Ecuador" },
  { code: "UY", label: "Uruguay" },
  { code: "ES", label: "Espana" },
];

export function ProfileForm({
  email,
  name,
  countryCode,
  dob,
  educationLevel,
  careerStage,
}: ProfileFormProps) {
  const [state, action, pending] = useActionState<
    UpdateProfileResult | null,
    FormData
  >(updateProfileAction, null);

  return (
    <form action={action} className="mt-2 space-y-2">
      <label className="block">
        <span className="block text-sm font-medium text-text-primary">
          {account.MC_ACCOUNT_LABEL_EMAIL}
        </span>
        <input
          type="email"
          name="email"
          value={email}
          readOnly
          className="mt-1 block w-full rounded-md border border-border-default bg-surface-secondary px-2 py-2 text-sm text-text-secondary"
        />
      </label>

      <label className="block">
        <span className="block text-sm font-medium text-text-primary">
          {account.MC_ACCOUNT_LABEL_NAME}
        </span>
        <input
          type="text"
          name="name"
          defaultValue={name ?? ""}
          maxLength={120}
          className="mt-1 block w-full rounded-md border border-border-default bg-secondary px-2 py-2 text-sm text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
      </label>

      <label className="block">
        <span className="block text-sm font-medium text-text-primary">
          {account.MC_ACCOUNT_LABEL_COUNTRY}
        </span>
        <select
          name="country_code"
          defaultValue={countryCode}
          className="mt-1 block w-full rounded-md border border-border-default bg-secondary px-2 py-2 text-sm text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {COUNTRY_OPTIONS.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      {/* Phase 02.1 — nivel de preparación (editable + revocable, pack §4). El
          option vacío deja el campo en null = revocación. */}
      <label className="block">
        <span className="block text-sm font-medium text-text-primary">
          {account.MC_ACCOUNT_LABEL_EDUCATION}
        </span>
        <select
          name="education_level"
          defaultValue={educationLevel ?? ""}
          className="mt-1 block w-full rounded-md border border-border-default bg-secondary px-2 py-2 text-sm text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <option value="">{account.MC_ACCOUNT_LEVEL_NONE}</option>
          {onboardingNivel.MC_NIVEL_EDUCATION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="block text-sm font-medium text-text-primary">
          {account.MC_ACCOUNT_LABEL_CAREER}
        </span>
        <select
          name="career_stage"
          defaultValue={careerStage ?? ""}
          className="mt-1 block w-full rounded-md border border-border-default bg-secondary px-2 py-2 text-sm text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <option value="">{account.MC_ACCOUNT_LEVEL_NONE}</option>
          {onboardingNivel.MC_NIVEL_EXPERIENCE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-text-secondary">
          {account.MC_ACCOUNT_LEVEL_HELPER}
        </p>
      </label>

      <div className="block">
        <span className="block text-sm font-medium text-text-primary">
          {account.MC_ACCOUNT_LABEL_DOB}
        </span>
        <input
          type="text"
          value={dob ?? "—"}
          readOnly
          aria-describedby="dob-helper"
          className="mt-1 block w-full rounded-md border border-border-default bg-surface-secondary px-2 py-2 text-sm text-text-secondary"
        />
        <p id="dob-helper" className="mt-1 text-xs text-text-secondary">
          {account.MC_ACCOUNT_DOB_HELPER}
        </p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-secondary shadow-sm transition-transform duration-200 ease-out hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {account.MC_ACCOUNT_SAVE}
      </button>

      {state ? (
        <p
          role={state.ok ? "status" : "alert"}
          className={
            state.ok
              ? "text-xs text-success"
              : "text-xs text-destructive"
          }
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
