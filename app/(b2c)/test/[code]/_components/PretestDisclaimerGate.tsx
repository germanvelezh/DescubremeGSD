/**
 * PretestDisclaimerGate (Client Component) — NFR-27 pre-test gate (ADR-029).
 *
 * Wraps the first item of a sensitive instrument and blocks it behind the
 * `DisclaimerModal` until the user gives informed consent ("Entiendo y
 * continúo"). The test shell mounts this ONLY on fresh entry (session.progress
 * === 0) of a `pretest_modal` instrument, so the disclaimer fires exactly once
 * at the start — invariant to whether the user arrived via the signup callback
 * (BFI as the first test, ADR-029 funnel invertido) or a between-test
 * transition (PERMA). This is the SINGLE source of truth for the NFR-27 gate:
 * TransitionScreen no longer mounts the modal, so there is no double-show.
 *
 * "Ahora no" (onBack) exits to "/" — the same destination as the in-test exit
 * link (ItemForm) — so a user can decline a distress-flagged test without being
 * trapped. The session stays at progress 0, so the test remains their next
 * pending step if they return.
 *
 * Anchors:
 *  - 02-UI-SPEC.md §6.3 (DisclaimerModal copy + non-dismissable deviation).
 *  - estado/DECISIONS_LOG.md ADR-029 (funnel invertido, BFI-first).
 */
"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useState } from "react";

import { type ContentionLine } from "@/app/(b2c)/reporte/[sessionId]/_components/ContentionBanner";
import {
  DisclaimerModal,
  type DisclaimerVariant,
} from "@/app/(b2c)/reporte/[sessionId]/_components/DisclaimerModal";

export function PretestDisclaimerGate({
  variant,
  contentionLines,
  children,
}: {
  variant: DisclaimerVariant;
  contentionLines?: ContentionLine[];
  children: ReactNode;
}) {
  const router = useRouter();
  const [acknowledged, setAcknowledged] = useState(false);

  if (acknowledged) return <>{children}</>;

  return (
    <DisclaimerModal
      open
      variant={variant}
      contentionLines={contentionLines}
      onContinue={() => setAcknowledged(true)}
      onBack={() => router.push("/")}
    />
  );
}
