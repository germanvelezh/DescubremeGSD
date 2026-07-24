# ADR-034 — Deploy-smoke del pase visual (barras por banda + circumplejo escala-fija) en prod

**Fecha:** 2026-07-24 · **Ejecuto:** Claude Code (Chrome) · **Prod:** descubreme.co
**Deploy:** `dpl_5ASgcHnB` (target production, READY) = `main 087ffed` (PR #19, squash del pase visual).
**Cuenta conducida:** `germanvelezh+permacontrol2@gmail.com` (PERMA **alto**) — la sesion activa en el navegador.
**Objetivo:** verificar en prod ADR-034 — barras BFI/PERMA con ancho por banda (no 100%), circumplejo TwIVI en 4 puntas (no aguja), intro por instrumento, color calmo.

---

## Veredicto

**CODIGO PASA 3/3.** Las tres superficies del pase visual renderizan en prod con los anchos/radios
correctos, medidos en el DOM real y verificados contra la DB (fuente de verdad de las bandas):

1. **Barras BFI** — ancho por banda (Medio 62% / Bajo 35%), ninguna al 100%. **El bug del clamp esta muerto.**
2. **Barras PERMA** — igual; las sensibles (Emociones dificiles / Soledad) las mas cortas en la cuenta alta (contraste sano).
3. **Circumplejo TwIVI** — 4 puntas con radios reales (70 / 51.6 / 47 / 36.3), **exactos** al comparativo de ADR-034. **La aguja esta muerta.**

**Chequeo etico (D2):** el mecanismo (ancho por banda + gold calmo + intro-reframe) esta verificado vivo.
El caso especifico de la cuenta baja (permacare1, N=Alto → "Emociones dificiles" al 90%, la barra mas
larga) NO se pudo capturar en vivo (RLS por usuario + friccion PKCE, ver Nota de tooling); se juzgo
sobre una **reproduccion fiel** (anchos = BAND_RATIO ya verificado en prod + bandas reales de la DB).
**German: "dejalo asi"** — el tratamiento actual contiene la alarma; sin cambio. (Cowork ya lo habia
aprobado como esta; ADR-034 adenda.)

Conducido con click/JS programatico (cero coordenadas/teclado, `[[smoke-navegador-gotchas]]`).

---

## Las 3 superficies (medido en el DOM, verificado en DB — cuenta permacontrol2)

| Superficie | Sesion | Medido en el DOM real | DB (bandas) | Veredicto |
|---|---|---|---|---|
| **BFI-2-S** (bars) | `eb0e9393` | Cooperacion/Organizacion/Curiosidad **62%** Medio · Energia social **35%** Bajo · **Calma 35% Bajo** | EXT Bajo, AGR/CON/OPN Medio, NEG **Alto** | Ancho por banda; ninguna 100%. Calma: NEG Alto → invertBand → banda mostrada **Bajo**, y el ancho sigue la banda **mostrada** (35%), no la cruda. Intro BFI + "Ningun rasgo es mejor que otro". Sin rojo. |
| **PERMA** (bars) | `0c8331cf` | 7 dims **62%** Medio · N (Emociones dificiles) + Lon (Soledad) **35%** Bajo | P/E/R/M/A/H/hap Medio, N/Lon **Bajo** | Ancho por banda; ninguna 100%. En cuenta ALTA las sensibles son las mas cortas (contraste sano). Intro PERMA (estado del momento + reencuadre "no un defecto tuyo"). Nota de largo. Sin rojo. |
| **TwIVI** (circumplex) | `437d0ab4` | Radios **OCH 70 · STR 51.6 · SEN 47 · CSV 36.3**; OCH ganador (opacity 0.6), resto 0.4 | OCH Alto, STR Medio, CSV/SEN Bajo | 4 puntas, la menor 36.3 ≫ piso 24 (no aguja). Radios **identicos** al comparativo ADR-034 (dominante A1). Labels verbo (Explorar/Aportar/Conservar/Destacar), nota anti-ausencia, nota relativa. Sin rojo. |

**Check del clamp (muerto):** ninguna barra al 100% en ninguna de las dos superficies bars; tres anchos
discretos limpios (35 / 62 / 90). **Check de la aguja (muerto):** las 4 direcciones con radio real.
**Check de invertBand + ancho:** Calma (NEG Alto) rinde Bajo/35% — barra y banda mostradas coherentes.

---

## Chequeo etico (D2) — "Emociones dificiles" al 90%

`Hecho (DB):` la sesion PERMA de `permacare1` (bienestar bajo) `066dcdab` tiene **N = ALTO**
(Lon = Medio, P/A = Bajo, resto Medio). Con ancho por banda, **N ("Emociones dificiles") → 90%: la
barra mas larga del reporte** — el pixel que Cowork marco.

`Verificacion:` el ancho por banda (`BAND_RATIO[band]*100`) esta verificado vivo en las dos cuentas;
permacare1 es el MISMO code path con otra banda → 90% es determinista, sin comportamiento nuevo de prod.
El caso se juzgo sobre una reproduccion fiel (anchos verificados en prod + bandas reales de la DB), no
sobre un screenshot en vivo (bloqueado por RLS + PKCE, ver tooling).

`Decision (German 2026-07-24): "dejalo asi".` El tratamiento actual —largo=banda + gold calmo (nunca
rojo) + `MC_BARS_INTRO_PERMA` arriba de las barras reencuadrando "Alto = mas de eso, no un defecto
tuyo"— contiene la alarma. Sin cambio. La red de seguridad sigue siendo NFR-28 (ADR-033), desacoplada
de la barra. Pulido opcional (grouping "Señales adicionales") diferido a BACKLOG
`[GAP-PERMA-BARS-SENSITIVE-GROUPING]`, NO requerido.

---

## Hallazgos cosmeticos (preexistentes, no del pase visual) → BACKLOG P3

- `[GAP-VALUECIRCLE-THIN-WEDGES]`: las cuñas del circumplejo son finas (`sectorPoints` half-width
  `Math.PI/10`, geometria heredada de PR-C/#17) → se lee como estrella-fina de 4 puntas, no como cometa
  rellena. El radio (firmado en ADR-034) es correcto; esto es solo el ancho de cuña. Decision estetica
  de Cowork.
- `[GAP-VALUECIRCLE-LABEL-CLIP]`: las etiquetas horizontales ("Destacar" izq., "Aportar" der.) se
  recortan ~1 char por su posicion cerca del borde del viewBox (`text-anchor:middle` en x 12/188 de un
  viewBox 0-200). El texto esta COMPLETO en el DOM (a11y intacta); es solo clip visual. Fix: ampliar el
  viewBox horizontal o anclar las laterales hacia adentro.

Ambos son cosmeticos, preexistentes (independientes del pase visual, que solo cambio ancho/radio) y no
bloquean.

---

## No verificado en vivo (limites del smoke, honestidad)

- **Render en vivo de permacare1 (cuenta baja):** los reportes son RLS por usuario y el login por
  magic-link PKCE fallo dos veces en la ventana de Chrome que CC maneja (el `code_verifier` vive en el
  navegador que PIDIO el link; German lo pidio desde su entorno, no desde esa ventana). El chequeo etico
  se cerro sobre la reproduccion fiel + la confirmacion de bandas en DB. Es el MISMO code path ya
  verificado en la cuenta alta, con distinta banda.
- **D3 (supresion de `REVEAL_BAND_LEGEND` en la transicion cuando hay intro):** solo se surface en la
  transicion ENTRE tests del flujo guiado; las dos cuentas ya completaron los 4 tests, asi que no
  re-muestran transicion sin re-correr. Cubierto por el unit test `[ADR-034 / D3]`
  (`transition-screen-mini-result.test.tsx`). Verlo en vivo requeriria una cuenta fresca a mitad de flujo.

---

## Nota de tooling — PKCE

El magic-link de DescubreMe usa flujo PKCE: el `code_verifier` se guarda en el navegador que ejecuta
`signInWithOtp` y solo ahi se puede completar `/auth/callback`. Para conducir una cuenta desde la ventana
de Chrome de CC, el signup debe **enviarse desde esa misma ventana** (asi lo hizo el smoke de ADR-033).
Un link pedido desde otro navegador/correo redirige a `/signup` sin sesion. Registrado para el proximo
smoke que requiera cambiar de cuenta.

---

## Cuentas del smoke (prod — datos de prueba)

- Conducida: `germanvelezh+permacontrol2@gmail.com` (PERMA alto) — 3 superficies verificadas.
- Referenciada (DB, no logueada): `germanvelezh+permacare1@gmail.com` (PERMA bajo) — bandas del chequeo
  etico. Ambas se dejan en prod (respaldan la evidencia en DB; borrado a criterio de German).
