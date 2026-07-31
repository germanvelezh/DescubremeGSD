"use client";

/**
 * ConfirmationPoller — el reintento que le ahorra al usuario recargar a mano
 * (Plan 03-05 Task 3).
 *
 * EL PROBLEMA QUE RESUELVE. Volver del Checkout y que exista el `entitlement`
 * son dos canales asincronos: el webhook firmado puede llegar unos segundos
 * despues. En esa ventana el usuario YA PAGO y la pantalla todavia no lo sabe.
 * La version del plan 03-01 le pedia hacer clic en "volver a revisar"; esto lo
 * hace por el.
 *
 * `router.refresh()` re-ejecuta el Server Component, que vuelve a leer
 * `entitlement` **de la base**. No hay estado de acceso en el cliente: esta
 * pieza solo dispara el reintento, nunca decide si hay acceso. Esa separacion es
 * lo que impide que un cliente manipulado se conceda acceso a si mismo.
 *
 * TIENE TECHO, y el techo es la mitad del contrato. Un reintento infinito es un
 * spinner eterno con otro nombre: la pantalla se quedaria girando en silencio.
 * Agotados los intentos, se muestra la rama que dice **que hacer y a donde
 * escribir** — y que **no afirma que el pago fallo**, porque no lo sabemos.
 *
 * Anchors:
 *   - 03-05-PLAN.md Task 3 paso 1, must_haves Gracias/loading y Gracias/error.
 *   - app/(b2c)/paid/gracias/page.tsx (quien decide de verdad, en servidor).
 */
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  MC_PAID_CONFIRMING_DELAYED_BODY,
  MC_PAID_CONFIRMING_DELAYED_TITLE,
  MC_PAID_SUPPORT_EMAIL,
} from "@/lib/i18n/microcopy/es-CO/paid";

/** Cada cuanto se vuelve a preguntar. Cinco segundos: ni ansioso ni dormido. */
const RETRY_INTERVAL_MS = 5_000;

/** Techo de intentos. ~1 minuto en total antes de pasar a la rama demorada. */
const MAX_ATTEMPTS = 12;

export function ConfirmationPoller() {
  const router = useRouter();
  const [attempts, setAttempts] = useState(0);
  const exhausted = attempts >= MAX_ATTEMPTS;

  useEffect(() => {
    if (exhausted) return;
    const timer = setTimeout(() => {
      setAttempts((n) => n + 1);
      router.refresh();
    }, RETRY_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [attempts, exhausted, router]);

  if (!exhausted) return null;

  return (
    <div
      role="status"
      data-testid="paid-confirming-delayed"
      className="flex max-w-prose flex-col gap-2 rounded-md bg-surface-tertiary p-4"
    >
      <p className="text-base font-semibold text-text-primary">
        {MC_PAID_CONFIRMING_DELAYED_TITLE}
      </p>
      <p className="text-sm text-text-primary">
        {MC_PAID_CONFIRMING_DELAYED_BODY(MC_PAID_SUPPORT_EMAIL)}
      </p>
    </div>
  );
}
