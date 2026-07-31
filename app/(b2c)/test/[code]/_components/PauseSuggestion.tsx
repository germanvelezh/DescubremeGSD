/**
 * PauseSuggestion — la salida que ya existia, promovida en el borde de bloque
 * (Plan 03-02 Task 3; D-16 / D-17 / D-18, 03-UI-SPEC §6).
 *
 * QUE ES, Y QUE NO ES.
 *
 * D-17 pide que el sistema sugiera puntos de salida en los bordes de bloque.
 * D-18 prohibe cambiar el layout del runner (un item por pantalla, siempre). La
 * resolucion no es una pantalla nueva: el enlace `MC_TEST_EXIT_LINK` YA vive en
 * el pie pegajoso de cada item, y aqui simplemente **se promueve** de enlace de
 * texto a boton secundario, acompanado de una linea de invitacion.
 *
 *   - NO es modal, NO es interstitial y NO bloquea. El item siguiente sigue
 *     visible y respondible en la misma pantalla: quien quiere seguir, sigue sin
 *     tocar nada.
 *   - NO es region viva (`aria-live`). El contrato de accesibilidad del runner
 *     tiene UNA sola —la etiqueta "Bloque X de N" de `BlockProgress`— y este
 *     componente no le agrega otra. Con 96 items, anunciar mas seria fatiga de
 *     lector de pantalla, no accesibilidad.
 *   - NO roba el foco. No hay `.focus()` en ningun lado de este archivo; es
 *     contenido estatico que aparece en su sitio.
 *
 * EL SISTEMA NO IMPONE LIMITE DE SESION (D-17). Sugiere. El usuario corta cuando
 * quiere y el progreso se persiste por item, asi que reanudar es gratis — por
 * eso el copy nunca habla de perder nada: seria falso.
 *
 * El componente no recibe ni renderiza dato del usuario (T-03-02-03): solo el
 * texto ya compuesto por el servidor.
 *
 * Anchors:
 *  - 03-UI-SPEC.md §6 (promocion, no pantalla) y §Accessibility Contract.
 *  - lib/free/runner-navigation.ts (resolvePauseSuggestion, resolveClosedBlock).
 *  - ItemForm.tsx (el pie pegajoso donde se monta, DENTRO y no encima).
 */
"use client";

export interface PauseSuggestionProps {
  /** Linea de invitacion ya compuesta en es-CO (borde de bloque o punto medio). */
  message: string;
  /** Etiqueta del enlace de salida existente, promovido a boton secundario. */
  exitLabel: string;
}

export function PauseSuggestion({ message, exitLabel }: PauseSuggestionProps) {
  return (
    <div
      data-testid="pause-suggestion"
      className="flex w-full flex-col items-center gap-2"
    >
      <p className="max-w-prose text-center text-sm text-text-secondary">
        {message}
      </p>
      {/* Mismo destino que el enlace de salida de siempre: la promocion es de
          jerarquia visual, no de comportamiento. Objetivo tactil >=44px y foco
          visible, igual que toda opcion del runner (UX-05). */}
      <a
        href="/"
        data-testid="pause-suggestion-exit"
        className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-border-default bg-secondary px-4 text-sm font-semibold text-text-primary transition-[border-color,background-color] duration-[var(--duration-micro)] ease-[var(--ease-standard)] hover:bg-accent-muted focus-visible:ring-2 focus-visible:ring-accent"
      >
        {exitLabel}
      </a>
    </div>
  );
}
