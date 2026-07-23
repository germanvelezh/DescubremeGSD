# ADR-033 — Deploy-smoke de la pantalla de cuidado de PERMA en prod

**Fecha:** 2026-07-23 · **Ejecutó:** Claude Code (Chrome) · **Prod:** descubreme.co
**Deploy:** `m362oyc34` (alias `git-main` = cabeza de `main` `7743b63`, incluye `a27c7a5` / PR #18), Vercel Production **Ready**.
**Cuenta primaria (PERMA bajo):** `germanvelezh+permacare1@gmail.com` (`user_id cc7a2b10…`), intención = "carrera".
**Objetivo:** verificar `[GAP-PERMA-CONTENTION-GUIDED-FLOW]` cerrado (ADR-033) — la contención NFR-28 se surfacea en el flujo guiado tras el último ítem PERMA.

---

## Veredicto

**OBJETIVO PRIMARIO PASA.** Con perfil de bienestar bajo (mismo vector A1), tras el último ítem de
PERMA aparece la **pantalla de cuidado** (`/test/PERMA-Profiler/done`) antes del cierre, y al continuar
cae al cierre normal (nivel obligatorio + ocupaciones) sin alteración. El servidor decidió
`showContention:true` y el flujo guiado lo mostró — el defecto de seguridad de A1 está cerrado en prod.

Los 4 tests corridos con click programático (cero coordenadas/teclado) y verificados contra la DB de
prod. **Cero desync**: los valores crudos calzan el vector en los 4.

---

## Verificación del objetivo primario (ADR-033)

**En pantalla** (`PermaCareScreen`, papel estático, sin motion — correcto):
- H1: "Antes de cerrar, una pausa para ti" (= `MC_PERMA_CARE_SCREEN_HEADING`).
- Body: "Responder sobre cómo te sientes a veces remueve emociones. Si te sirve, aquí tienes líneas de
  apoyo; y si prefieres, puedes seguir a tu cierre sin contactar a nadie." (= `MC_PERMA_CARE_SCREEN_BODY`).
- `ContentionBanner` prominente: "Si estás pasando un momento difícil, no estás solo." + "Hablar con
  alguien puede ayudar. Estas líneas en Colombia son gratuitas y confidenciales:" + **6 líneas CO** `tel:`
  (106, Línea de la Vida 018000018596, 123, 155, Profamilia, ACP).
- CTA "Continuar" → `/reporte/{onet}?cierre=free` (el cierre normal; `closeId` = sesión O*NET, no sensible).

**En DB** (`report_snapshot.html_payload` de la sesión PERMA `066dcdab`):
- `distress: {severity:"moderate", showContention:true}` — el input real del gate `requiresContentionRoute && showContention`.
- `status completed, progress 23, responses 23`.
- Valores crudos por dimensión (= vector §5): P[3,3,3] E[4,4,4] R[6,6,6] M[4,4,4] A[3,3,3] N[7,7,7]
  H[5,5,5] Lon[6] hap[4]. → PERMA_total = 24/6 = **4.0 < 5.0** (moderate por total) **y** N_mean = 7 > 6.5
  (moderate por N). Ambas vías disparan.

**Cierre intacto tras "Continuar":** gate de nivel obligatorio ("Antes de mostrarte campos para
explorar", estudios + experiencia) → reveal ocupacional ("Campos que podrían resonar contigo",
"Ver más ocupaciones"). El interstitial es **aditivo**; no bypassa ni altera el cierre ADR-031.

**Doble render (copy/UX de Cowork, NO bug):** en la pantalla de cuidado, las 6 líneas se muestran
**completas** en el banner prominente Y hay un toggle colapsado "Si quieres hablar con alguien" debajo
con las mismas 6 líneas. El patrón dual del `ContentionBanner` (prominente + footer permanente) es
correcto para el reporte, pero en esta pantalla corta el toggle es redundante — el banner ya lo muestra
todo. Anotado para Cowork.

---

## Los 4 tests (verificados en DB, cero desync)

| Test | Sesión | responses | Bandas / scoring en pantalla | distress |
|---|---|---|---|---|
| BFI-2-S | 21b0f79c | 30/30 | Energía social **Bajo**, Calma **Bajo** (NEG ALTO→invertBand), resto Medio | `showContention:false` |
| ONET-IP-SF | 2cc214ee | 60/60 | Chips **R30 I50 A40 S30 E20 C10**, top-3 I·A·R | `showContention:false` |
| TwIVI | 96fe99d5 | 20/20 | ValueCircle 4 HOV centrados, pico Explorar (OCH dominante) | `showContention:false` |
| PERMA | 066dcdab | 23/23 | (reporte propio) bandas es-CO correctas | **`showContention:true`** |

**Check crítico de inversión NEG — PASA:** la frase del composer de BFI lee "**Sientes con intensidad**
lo que pasa a tu alrededor y recargas energía en lo tranquilo.", NO "mantienes el pulso estable". Sin
bug de inversión.

**Frases del composer (verbatim, 3 reglas):**
- BFI (saliencia): "Sientes con intensidad lo que pasa a tu alrededor y recargas energía en lo tranquilo."
- O*NET (pico): "Entender cómo funcionan las cosas te energiza más que casi cualquier otra actividad."
- TwIVI (dominante): "Valoras decidir tu rumbo y probar cosas nuevas, por encima de lo seguro."

**ValueCircle (#17) confirmado en prod:** el circumplejo dibuja 4 HOV centrados (Explorar / Aportar /
Conservar / Destacar), sin el colapso 10→4 ni códigos crudos del bug P1 de A1.

**Transiciones (PR-C + motion noche):** 3 partes (medimos/frase/por qué) + leyenda de banda + recap
+ dots (●○○○ → ●●○○ → ●●●○) + intent-recall verde legible + hook del siguiente. NFR-28 toggle presente
en sensibles (BFI, TwIVI), ausente en O*NET. NFR-27 inline en BFI y PERMA, ausente en O*NET y TwIVI.

---

## Residuales A1 verificados en esta corrida

- **Guardrail "Mis datos" → /reporte full:** el reporte completo renderiza correcto (composición
  intacta, byte-safe).
- **`[GAP-REPORT-INTERESES-MISLABEL]` (P2) sigue presente:** `/me/data` lista los 4 reportes como
  "Intereses · 23/7/2026" (idénticos) y el reporte PERMA se titula "Tu perfil de intereses".
- **Sub-observación A1 "códigos crudos A E H M N…" RESUELTA:** las barras de PERMA ahora rotulan es-CO
  (Logro, Involucramiento, Salud, Propósito, Emociones difíciles, Emociones positivas, Relaciones,
  Soledad, Felicidad) — cerrada por #17 (`[GAP-PERMA-DIM-LABELS-ES-CO]`). Bandas correctas en dirección
  (Emociones difíciles = Alto con N=7, sin doble-flip).
- **`[GAP-PERMA-BARS-VISUAL-PASS]` (P1 epic) sigue abierto:** anchos de barra inconsistentes — varias
  "Medio" (Salud, Relaciones, Soledad) llegan a ~100% mientras otras "Medio" (Involucramiento,
  Propósito, Felicidad) quedan a ~55%. Es el bug del `max` que el epic describe.

---

## Nota de método (runner O*NET)

El runner O*NET (count-driven, sin "Vas en N de M") requirió: (1) manejar el interstitial de reanudación
"Hola de nuevo. Retomamos donde lo dejaste: ya completaste N de 60" que aparece al re-entrar (click
"Continuar" con espera robusta); (2) **esperar a que "Siguiente" esté habilitado** antes de clickearlo
(clickear ~50ms tras seleccionar = no-op silencioso en O*NET, causa del primer atasco); (3) **re-click
de "Siguiente"** si no avanza en ~2s (flake transitorio al cruzar de bloque). Con esos tres, cero
desync (checksum RIASEC exacto: R×10=3, I×10=5, A×10=4, S×10=3, E×10=2, C×10=1).

Gotcha de tooling: la extensión de Chrome se desconectó una vez a mitad del O*NET; el trabajo se había
guardado (recuperado el progreso exacto desde la DB) y se reanudó sin pérdida.

---

## Control negativo (cuenta 2, PERMA alto) — PASA: el gate DISCRIMINA

**Cuenta:** `germanvelezh+permacontrol2@gmail.com` (`user_id 07d4c9f9…`, sin intención). Los 4 tests
corridos; BFI/O*NET/TwIVI completos (30/60/20) para llegar a PERMA. Vector PERMA **alto**:
P/E/R/M/A/hap=8, N/Lon=2.

- **En pantalla:** tras el último ítem PERMA, el runner fue **directo al cierre**
  (`/reporte/914fe34f…?cierre=free`, gate de nivel obligatorio) — **NO apareció la pantalla de cuidado**.
- **En DB** (sesión PERMA de la cuenta 2): `status completed, progress 23, responses 23`,
  `distress: {severity:null, showContention:false}`. Valores crudos: N[2,2,2], Lon[2], P[8,8,8],
  R[8,8,8], hap[8] → PERMA_total ≈ 8.0 ≥ 5.0 **y** N_mean 2 ≤ 6.5 (ambas vías del umbral limpias).

**Contraste que cierra la prueba:** PERMA bajo (cuenta 1) → `showContention:true` → pantalla de cuidado;
PERMA alto (cuenta 2) → `showContention:false` → sin pantalla, directo al cierre. El gate no renderiza
incondicionalmente; gatea sobre la decisión del servidor. `shouldSurfaceContention` discrimina en prod.

**El contraste aísla el término correcto:** el gate es `requiresContentionRoute && showContention`.
`requiresContentionRoute` es propiedad del **instrumento** (PERMA es contention-routed) → idéntico en
ambas cuentas; lo único que varió entre cuenta 1 y 2 fueron las respuestas, es decir `showContention`.
Por eso el contraste prueba que el discriminador es la decisión de distress, no el flag de ruta.

---

## Residuales A1 adicionales (cuenta 2)

- **Bounds-check `?item=N` a media corrida — PASA (lo que A1 no cubrió):** con BFI en progress=10,
  `/test/BFI-2-S?resumed=true&item=999` (fuera de rango) y `?item=abc` (no-numérico) **sirven el
  frontier** (ítem 11, "Vas en 11 de 30") — sin 500, sin freeze, sin `/done` espurio. El bounds-check
  `1≤N≤progress` de `resolveDisplayItem` clampea correcto en un test en curso, no solo completo.
- **Móvil PERMA ≥44px — PASA (con caveat de tooling):** Chrome clampea el ancho de ventana a ~500px
  (pedí 360, viewport interno 513), así que no se pudo probar 360px exacto. A 513px cada botón de la
  escala 0-10 mide **45×44px (≥44px)** y la escala hace **flex-wrap** (el "10" salta a fila propia). El
  `min-w-[44px]` garantiza el piso a cualquier ancho. Endpoints "nunca/siempre" por ítem, correctos.

---

## No verificable por navegador (para local/Playwright)

- **FREE-14 (email de reporte listo) — CONFIRMADO RECIBIDO (German, 2026-07-23):** el email "tu reporte
  está listo" llegó a la bandeja de `permacare1`. El branch `allComplete` no se short-circuiteó: el
  interstitial de cuidado es aditivo y el email se envió igual. Nota de copy: German lo refirió como el
  email "de interés" → posible otra superficie del mislabel `[GAP-REPORT-INTERESES-MISLABEL]` (el asunto/
  cuerpo del correo también diría "interés"); confirmar el copy exacto del email al cerrar ese P2.
- **reduced-motion del SO** y **lector de pantalla real (aria-live por bloque O*NET):** no emulables con
  las tools de Claude-in-Chrome (sin API de `prefers-reduced-motion` ni SR). Quedan para verificación
  local/Playwright (el overhaul ya los verificó con Playwright según STATUS 2026-07-18).

---

## Cuentas del smoke (prod — datos de prueba)

- Cuenta 1 (PERMA bajo): `germanvelezh+permacare1@gmail.com` — 4 tests completos + reporte.
- Cuenta 2 (control, PERMA alto): `germanvelezh+permacontrol2@gmail.com` — 4 tests completos, cierre a
  medias (gate de nivel sin llenar; el control no lo requería).

Decisión (German delegó): **se dejan** ambas cuentas — respaldan la evidencia de este doc en la DB de
prod. Borrado irreversible disponible cuando German quiera ("Borrar mi cuenta" en /me/data).
