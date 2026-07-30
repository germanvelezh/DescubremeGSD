"use client";

/**
 * CTA de compra — Plan 03-01, Fase 3.
 *
 * Lo unico que hace es pedirle al servidor una Checkout Session y navegar a
 * ella. **No manda monto, ni moneda, ni identidad**: el cuerpo del POST va
 * vacio a proposito, y `/api/checkout` lo valida con zod `.strict()`, asi que
 * agregar cualquier clave aca haria fallar la peticion con 400. Todo lo
 * economico se deriva en servidor (D-19 + anti-goal del ROADMAP).
 *
 * El destino es el Checkout hospedado de Stripe: ningun dato de tarjeta toca
 * nuestro DOM, ningun iframe propio, ningun campo de pago en nuestras rutas
 * (03-UI-SPEC §Registry Safety).
 *
 * Objetivo tactil >=44px y foco visible, segun 03-UI-SPEC §Accessibility.
 */
import { useState } from "react";

import { MC_PAID_CHECKOUT_ERROR } from "@/lib/i18n/microcopy/es-CO/paid";

export function CheckoutButton({ label }: { label: string }) {
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  async function startCheckout() {
    setPending(true);
    setFailed(false);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = (await res.json()) as { url?: string };
      if (!res.ok || !data.url) {
        setFailed(true);
        setPending(false);
        return;
      }
      window.location.assign(data.url);
    } catch {
      setFailed(true);
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={startCheckout}
        disabled={pending}
        data-testid="paid-checkout-cta"
        className="inline-flex min-h-[44px] w-full max-w-sm items-center justify-center rounded-md bg-accent px-5 py-3 font-semibold text-secondary transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60 disabled:hover:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        {label}
      </button>
      {failed ? (
        // El texto vive en microcopy, nunca inline: es la unica forma de que el
        // gate COMPL-18 lo revise (SCAN_DIRS cubre lib/i18n/microcopy).
        <p role="status" className="text-sm text-text-secondary">
          {MC_PAID_CHECKOUT_ERROR}
        </p>
      ) : null}
    </div>
  );
}
