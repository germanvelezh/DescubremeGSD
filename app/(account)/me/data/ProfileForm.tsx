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

import { type UpdateProfileResult, updateProfileAction } from "./actions";

interface ProfileFormProps {
  email: string;
  name: string | null;
  countryCode: string;
  dob: string | null;
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
}: ProfileFormProps) {
  const [state, action, pending] = useActionState<
    UpdateProfileResult | null,
    FormData
  >(updateProfileAction, null);

  return (
    <form action={action} className="mt-sm space-y-sm">
      <label className="block">
        <span className="block text-sm font-medium text-text-primary">
          {account.MC_ACCOUNT_LABEL_EMAIL}
        </span>
        <input
          type="email"
          name="email"
          value={email}
          readOnly
          className="mt-xs block w-full rounded-md border border-border-default bg-gray-50 px-sm py-sm text-sm text-text-secondary"
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
          className="mt-xs block w-full rounded-md border border-border-default bg-white px-sm py-sm text-sm text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
      </label>

      <label className="block">
        <span className="block text-sm font-medium text-text-primary">
          {account.MC_ACCOUNT_LABEL_COUNTRY}
        </span>
        <select
          name="country_code"
          defaultValue={countryCode}
          className="mt-xs block w-full rounded-md border border-border-default bg-white px-sm py-sm text-sm text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {COUNTRY_OPTIONS.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.label}
            </option>
          ))}
        </select>
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
          className="mt-xs block w-full rounded-md border border-border-default bg-gray-50 px-sm py-sm text-sm text-text-secondary"
        />
        <p id="dob-helper" className="mt-xs text-xs text-text-secondary">
          {account.MC_ACCOUNT_DOB_HELPER}
        </p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-accent px-md py-sm text-sm font-semibold text-white shadow-sm hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50"
      >
        {account.MC_ACCOUNT_SAVE}
      </button>

      {state ? (
        <p
          role={state.ok ? "status" : "alert"}
          className={
            state.ok
              ? "text-xs text-green-700"
              : "text-xs text-red-700"
          }
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
