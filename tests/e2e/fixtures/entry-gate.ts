/**
 * Playwright helper — pasar el TestEntryGate (Ola 2.2 / ADR-029).
 *
 * Desde Ola 2.2 el primer item de CUALQUIER test no se renderiza al entrar:
 * `TestEntryGate` (app/(b2c)/test/[code]/_components/TestEntryGate.tsx) muestra
 * primero el hook + "antes de comenzar" y —para un instrumento sensible
 * (`pretest_modal`: BFI/PERMA)— embebe ahi mismo el disclaimer NFR-27. El item
 * (children) solo monta despues del acknowledgement.
 *
 * Los specs escritos antes de esa ola hacen `goto('/test/<code>')` y afirman el
 * `[role="radiogroup"]` de una: encuentran la pantalla de intro y fallan por
 * timeout. Este helper es ese click, en un solo lugar, para que un cambio de
 * copy del CTA sea UNA edicion y no ocho specs en rojo.
 *
 * El gate aparece SOLO en entrada fresca (`session.progress === 0`,
 * page.tsx:282). Al retomar, el shell sirve el interstitial de resume y NO hay
 * gate — no llamar a este helper en ese camino.
 *
 * Anchors:
 *  - app/(b2c)/test/[code]/_components/TestEntryGate.tsx (las dos ramas).
 *  - lib/i18n/microcopy/es-CO/test-intro.ts (MC_INTRO_START_CTA).
 *  - lib/i18n/microcopy/es-CO/nfr27.ts (MC_NFR27_CTA_PRIMARY).
 *  - estado/DECISIONS_LOG.md ADR-029.
 */
import { expect, type Page } from "@playwright/test";

/**
 * CTA de acknowledgement del entry gate, por rama.
 * Verbatim del microcopy es-CO; los specs no importan de `@/lib` (ninguno lo
 * hace) asi que los literales viven aca, una sola vez.
 */
export const ENTRY_GATE_CTA = {
  /** Rama no-sensible (O*NET, TwIVI): testIntro.MC_INTRO_START_CTA. */
  plain: "Comenzar",
  /** Rama sensible (BFI, PERMA): nfr27.MC_NFR27_CTA_PRIMARY. */
  sensitive: "Entiendo y continúo",
} as const;

/**
 * Acknowledge el entry gate y espera a que el item quede en pantalla.
 *
 * @param sensitive true para los instrumentos con `pretest_modal=true`
 *   (BFI-2-S, PERMA-Profiler). O*NET lo trae NULL y TwIVI `false` — los dos
 *   caen en la rama `plain` (lib/ethics/middleware.ts:89 compara `=== true`).
 */
export async function passEntryGate(
  page: Page,
  { sensitive }: { sensitive: boolean },
): Promise<void> {
  const name = sensitive ? ENTRY_GATE_CTA.sensitive : ENTRY_GATE_CTA.plain;
  await page.getByRole("button", { name, exact: true }).click();
  // El gate desmonta y monta el item: anclar aca evita que cada call site
  // repita la espera del radiogroup.
  await expect(page.locator('[role="radiogroup"]')).toBeVisible();
}
