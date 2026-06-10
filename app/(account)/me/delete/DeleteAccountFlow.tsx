/**
 * DeleteAccountFlow — Destructive button + confirmation modal (Plan 01-10 Task 2).
 *
 * Client Component. The destructive primary button is CLICK 2 of the
 * visible <=2 clicks (COMPL-07). Clicking it opens MODAL.DELETE.CONFIRM
 * (destructive variant — Escape DOES NOT close, must explicitly Cancel).
 *
 * The modal's "Borrar mi cuenta" button invokes deleteAccountAction
 * (Server Action) which performs the transactional deletion and
 * redirects to /me/delete/done.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §6.10 + §7.8.
 *  - components/ui/Modal.tsx (variant='destructive').
 */
"use client";

import { useState, useTransition } from "react";

import { Modal } from "@/components/ui/Modal";
import { deleteCopy } from "@/lib/i18n/microcopy/es-CO/delete";

import { deleteAccountAction } from "./actions";

export function DeleteAccountFlow() {
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    setError(null);
    startTransition(async () => {
      try {
        const r = await deleteAccountAction();
        if (r && r.ok === false) {
          setError(r.message ?? deleteCopy.MC_DELETE_ERROR);
        }
        // On success the action calls redirect() server-side; this path
        // shouldn't render further.
      } catch (e) {
        // redirect() throws a NEXT_REDIRECT — let it propagate.
        // biome-ignore lint/suspicious/noExplicitAny: Next.js throws structured digest.
        if ((e as any)?.digest?.startsWith?.("NEXT_REDIRECT")) {
          throw e;
        }
        setError(deleteCopy.MC_DELETE_ERROR);
      }
    });
  };

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        disabled={isPending}
        aria-label={deleteCopy.MC_DELETE_PRIMARY_CTA}
        className="rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2 disabled:opacity-50"
      >
        {deleteCopy.MC_DELETE_PRIMARY_CTA}
      </button>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        heading={deleteCopy.MC_DELETE_CONFIRM_HEADING}
        variant="destructive"
        primaryActionLabel={deleteCopy.MC_DELETE_CONFIRM_DESTRUCTIVE_CTA}
        onPrimaryAction={handleConfirm}
        secondaryActionLabel={deleteCopy.MC_DELETE_CONFIRM_CANCEL}
      >
        <p className="mb-2">{deleteCopy.MC_DELETE_CONFIRM_BODY_INTRO}</p>
        <ul className="list-inside list-disc space-y-1 text-sm">
          {deleteCopy.MC_DELETE_CONFIRM_BODY_LIST.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-text-secondary">
          {deleteCopy.MC_DELETE_CONFIRM_BODY_NOTE}
        </p>
        {/* Render the error INSIDE the modal — a failed delete left the
            error behind the scrim where the user could not see it, so the
            modal looked stuck ([GAP-DELETE-AUDIT-DIGEST-SEARCHPATH]). */}
        {error ? (
          <p role="alert" className="mt-3 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}
      </Modal>
    </div>
  );
}
