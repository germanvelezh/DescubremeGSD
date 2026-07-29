/**
 * ConsentCard — Per-product consent row with revoke modal (Plan 01-10 Task 2).
 *
 * Client Component. Renders product code + version + granted date. Una fila
 * ACTIVA trae el boton destructivo que abre el Modal sobrio; una fila REVOCADA
 * no trae boton y muestra el acuse con su fecha.
 *
 * POR QUE EL ACUSE DE EXITO NO ES ESTADO DE CLIENTE.
 *
 * Antes el exito se mostraba con `result` (estado local) dentro de esta misma
 * card, y **la revalidacion que dispara la propia accion lo destruia**:
 * `revokeConsentAction` llama `revalidatePath("/me/consent")` (actions.ts:80)
 * ANTES de devolver el mensaje, la pagina vuelve sin la fila entre las activas,
 * la card se DESMONTA y se lleva su estado. El acuse solo se veia si React
 * alcanzaba a pintar el estado antes de commitear el payload nuevo — o sea,
 * **por carrera**. En CI perdia la carrera y el E2E lo reportaba como flaky.
 *
 * Ahora el exito es **estado de la fila**: la pagina lista tambien las
 * revocadas y la card revocada dice que lo esta. No hay carrera posible porque
 * no hay estado efimero que preservar, y sobrevive a un refresh.
 *
 * `result` se conserva SOLO para el error: ahi la fila sigue activa, la card no
 * se desmonta y el mensaje transitorio es el comportamiento correcto.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.9.
 *  - components/ui/Modal.tsx.
 *  - app/(account)/me/data/page.tsx:168 (la otra pagina ya listaba revocados
 *    con `MC_CONSENT_REVOKED_CHIP`; esta asimetria era la raiz).
 *  - [GAP-CONSENT-REVOKE-CHIP-SIN-CONFIRMACION].
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
  /** ISO de la revocacion, o null si sigue activo. */
  revokedAt?: string | null;
}

export function ConsentCard({
  productCode,
  version,
  grantedAt,
  consentGeneral,
  consentSensitive,
  revokedAt = null,
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
      {revokedAt ? (
        // El acuse persistente. `role="status"` para que un lector de pantalla
        // lo anuncie al volver la pagina revalidada, igual que hacia el chip
        // efimero — pero sin depender de que la card sobreviva.
        <p role="status" className="mt-2 text-xs text-success">
          {account.MC_CONSENT_REVOKE_SUCCESS}{" "}
          <span className="text-text-secondary">
            {new Date(revokedAt).toLocaleDateString("es-CO")}
          </span>
        </p>
      ) : (
        <>
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
          {/* Solo el ERROR queda como mensaje transitorio: ahi la fila sigue
              activa, la card no se desmonta y no hay carrera. El exito lo dice
              la fila revocada de arriba. */}
          {result && !result.ok ? (
            <p role="alert" className="mt-2 text-xs text-destructive">
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
        </>
      )}
    </article>
  );
}
