/**
 * ResendButton — Client Component (Plan 01-07 Task 3).
 *
 * Shows a 60s cooldown countdown after each click. Server-side rate limit
 * (Upstash 1/60s + 5/hour/email) is the source of truth — this UI is just
 * an optimistic UX guard that prevents the user from hammering the button.
 *
 * For Phase 1 the actual server-side resend uses the same `signupAction`
 * via the parent screen's redirect. A dedicated `resendMagicLinkAction`
 * Server Action lands in a follow-up if a tighter abuse pattern emerges.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.5.
 *  - 01-CONTEXT.md D2.6.
 */
"use client";

import { useEffect, useState } from "react";

import { magicLink } from "@/lib/i18n/microcopy/es-CO/magic-link";

const COOLDOWN_SECONDS = 60;

export function ResendButton({ email: _email }: { email: string }) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (remaining <= 0) return;
    const t = setTimeout(() => setRemaining((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining]);

  return (
    <div className="flex flex-col items-center gap-xs">
      <button
        type="button"
        disabled={remaining > 0}
        onClick={() => {
          // For Phase 1 we just trigger a cooldown locally. Plan 01-09
          // wires the real resend action when /me/data is built.
          setRemaining(COOLDOWN_SECONDS);
        }}
        className="inline-flex h-10 items-center justify-center rounded-md border border-border-default px-md font-medium text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        {magicLink.MC_MAGIC_SENT_CTA_RESEND}
      </button>
      {remaining > 0 ? (
        <p className="text-xs text-text-secondary">
          {magicLink.MC_MAGIC_COOLDOWN(remaining)}
        </p>
      ) : null}
    </div>
  );
}
