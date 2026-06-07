/**
 * WaitlistOptIn — Opt-in for upcoming Paid products (D3.4, FREE-X).
 *
 * Single checkbox. On check, auto-POSTs to /api/waitlist with the user's
 * authenticated email (server-side). Inline confirmation chip on success.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.6 (what next).
 *  - 01-CONTEXT.md D3.4.
 */
"use client";

import { useState } from "react";

import { Checkbox } from "@/components/ui/Checkbox";
import { waitlist as MC } from "@/lib/i18n/microcopy/es-CO/waitlist";

interface WaitlistOptInProps {
  email: string;
}

export function WaitlistOptIn({ email }: WaitlistOptInProps) {
  const [checked, setChecked] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(next: boolean) {
    setChecked(next);
    if (!next) return;
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        setError(MC.MC_WAITLIST_ERROR);
        setChecked(false);
        return;
      }
      setConfirmed(true);
    } catch {
      setError(MC.MC_WAITLIST_ERROR);
      setChecked(false);
    }
  }

  return (
    <div className="flex flex-col gap-sm">
      <p className="text-sm text-text-secondary">{MC.MC_WAITLIST_PROMPT}</p>
      <Checkbox
        id="waitlist-optin"
        name="waitlist_optin"
        label={MC.MC_WAITLIST_CHECKBOX}
        checked={checked}
        onChange={handleChange}
      />
      {confirmed ? (
        <p role="status" className="text-xs text-accent">
          {MC.MC_WAITLIST_CONFIRMATION}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
