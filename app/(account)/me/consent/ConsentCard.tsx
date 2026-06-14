/**
 * ConsentCard — Per-product consent row with revoke modal (Plan 01-10 Task 2).
 *
 * Client Component. Renders product code + version + granted date + a
 * destructive secondary button that opens a sober Modal (variant: default).
 * Confirm fires revokeConsentAction; success state shows inline chip.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.9.
 *  - components/ui/Modal.tsx.
 */
"use client";

import { useState, useTransition } from "react";

import { Modal } from "@/components/ui/Modal";
import { account } from "@/lib/i18n/microcopy/es-CO/account";

import { revokeConsentAction } from "./actions";

interface ConsentCardProps {
  productCode: string;
  version: string;
  grantedAt: string;
  consentGeneral: boolean;
  consentSensitive: boolean;
}

export function ConsentCard({
  productCode,
  version,
  grantedAt,
  consentGeneral,
  consentSensitive,
}: ConsentCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();

  const title =
    consentSensitive && consentGeneral
      ? `${account.MC_CONSENT_GENERAL_TITLE} + ${account.MC_CONSENT_SENSITIVE_TITLE}`
      : consentSensitive
        ? account.MC_CONSENT_SENSITIVE_TITLE
        : account.MC_CONSENT_GENERAL_TITLE;

  const handleConfirm = () => {
    startTransition(async () => {
      const r = await revokeConsentAction(productCode);
      setResult(r);
      setModalOpen(false);
    });
  };

  return (
    <article className="rounded-md border border-border-default p-4">
      <h2 className="text-base font-semibold text-text-primary">
        {title} (v{version})
      </h2>
      <p className="mt-1 text-xs text-text-secondary">
        {account.MC_CONSENT_SIGNED_AT}{" "}
        {new Date(grantedAt).toLocaleDateString("es-CO")} · producto{" "}
        <code>{productCode}</code>
      </p>
      <div className="mt-2">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          disabled={isPending}
          className="rounded-md border border-destructive bg-transparent px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 disabled:opacity-50"
        >
          {account.MC_CONSENT_REVOKE_BUTTON}
        </button>
      </div>
      {result ? (
        <p
          role={result.ok ? "status" : "alert"}
          className={
            result.ok
              ? "mt-2 text-xs text-success"
              : "mt-2 text-xs text-destructive"
          }
        >
          {result.message}
        </p>
      ) : null}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        heading={account.MC_CONSENT_REVOKE_CONFIRM_HEADING}
        primaryActionLabel={account.MC_CONSENT_REVOKE_CONFIRM_CTA}
        onPrimaryAction={handleConfirm}
        secondaryActionLabel={account.MC_CONSENT_REVOKE_CONFIRM_CANCEL}
        variant="default"
      >
        <p>{account.MC_CONSENT_REVOKE_CONFIRM_BODY}</p>
      </Modal>
    </article>
  );
}
