/**
 * Microcopy es-CO — ContentionBanner NFR-28 (UI-SPEC §6.4).
 *
 * Banner calmo (NUNCA rojo / NUNCA alarma) con las lineas CO de
 * `contention_resources` (seed D1.7). Dos superficies: banner prominente solo
 * si el threshold se cruza (server-side), y link discreto permanente en el
 * footer del reporte sensible (BFI-2-S / PERMA / VALUES via contention_route).
 *
 * Las lineas telefonicas NO se hardcodean aqui: vienen del seed
 * `contention_resources` (verbatim). Este modulo solo aporta los textos de
 * encabezado / cuerpo / link.
 *
 * Copy verbatim UI-SPEC §6.4 — override final Cowork (lineas: DB seed).
 * Anti-clinico (Principio 5): cuidado, no emergencia (aria-live polite).
 *
 * Anchors:
 *   - 02-UI-SPEC.md §6.4 (copy verbatim) + §9 (aria-live polite).
 *   - 02-CONTEXT.md D-D.2.
 */
export const nfr28 = {
  MC_NFR28_BANNER_HEADING:
    "Si estás pasando un momento difícil, no estás solo.",
  MC_NFR28_BANNER_BODY:
    "Hablar con alguien puede ayudar. Estas líneas en Colombia son gratuitas y confidenciales:",
  MC_NFR28_FOOTER_LINK: "Si quieres hablar con alguien",

  // Pantalla de cuidado del flujo guiado PERMA (Free) — GAP-PERMA-CONTENTION-GUIDED-FLOW.
  // Visible solo si showContention:true, tras el ultimo item PERMA y antes del cierre.
  // Envuelve al banner generico de arriba: el titulo ORIENTA, el banner SOSTIENE la oferta.
  // Body sin repetir "gratuitas y confidenciales" (ya en MC_NFR28_BANNER_BODY, misma vista).
  // Landmark aria: reutiliza MC_REPORT_CONTENTION_LANDMARK_ARIA ("Recursos de ayuda").
  // Sign-off Cowork (UX Writer es-CO) 2026-07-23.
  MC_PERMA_CARE_SCREEN_HEADING: "Antes de cerrar, una pausa para ti",
  MC_PERMA_CARE_SCREEN_BODY:
    "Responder sobre cómo te sientes a veces remueve emociones. Si te sirve, aquí tienes líneas de apoyo; y si prefieres, puedes seguir a tu cierre sin contactar a nadie.",
  MC_PERMA_CARE_SCREEN_CTA: "Continuar",
} as const;

export type Nfr28MicrocopyKey = keyof typeof nfr28;
