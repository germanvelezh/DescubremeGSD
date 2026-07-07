# Brief Cowork — Pack de implementación TwIVI (valores, Free) es-CO — v1.0

**Fecha:** 2026-07-01. **Owner del entregable:** Cowork (research/adaptación + microcopy). **Prioridad: P0** — vive en prod mostrando placeholders `[GAP-...]` a usuarios reales.

**Contexto:** el 4º test del funnel Free (valores) corre en prod con **placeholders**: ítems `[GAP-TWIVI-ITEMS-ANCHORS-ES-CO] Punto N (placeholder)` y reporte de valores vacío ("no dice nada"). El instrumento cableado en código es **TwIVI**, pero nunca se le produjo pack (a diferencia del resto del stack). Este brief pide ese pack.

**Decisión de instrumento (CONFIRMADA por German 2026-07-01):** el instrumento de valores del Free es **TwIVI**.
- Resuelve contradicción documental: PRD_MAESTRO §8 (línea 246) lista PVQ-40 como plan-B abierto — **desactualizado**; `dossiers/24_PVQ-40_Consolidado.md:21` recomienda **NO** PVQ-40 y designa **TwIVI**; `implementation_packs/PVQ-21_..._Consolidado.md:30` coincide ("Plan-B TwIVI").
- Licencia TwIVI: uso libre explícito (Sandy et al. 2017, sitio oficial: "anyone can use it for any purpose, no need to ask permission") — sin permiso, sin bloqueo de fase 7. La más limpia del stack de valores.
- **Acción documental pendiente (Cowork/German):** corregir PRD §8 línea 246 (PVQ-40 → TwIVI).

**Instrumento:** TwIVI — Twenty-Item Values Inventory. Sandy, Gosling, Schwartz & Koelkebeck (2017), *Journal of Personality Assessment*, 99(5), 545-555. DOI 10.1080/00223891.2016.1231115. 20 ítems = 2 portraits por cada uno de los 10 valores básicos de Schwartz → 4 valores de orden superior (HOV): apertura al cambio, autopromoción, conservación, autotrascendencia.

---

## Qué necesita el código (contrato de datos, YA construido)

| Elemento | Estado en código | Qué falta |
|---|---|---|
| Escala de respuesta | 6 opciones renderizadas (radio) | Anclas verbales es-CO reales |
| 20 ítems | placeholders en `db/seeds/instruments/TwIVI/items.sql` | 20 ítems es-CO reales |
| Mapeo ítem→valor→HOV | scoring espera dimensiones | Confirmar coding key (2 ítems/valor) |
| Scoring MRAT | implementado (`tests/unit/scoring/twivi-mrat-fixture.test.ts`) | Verificar contra coding key oficial |
| Visual circumplex | implementado (`ValueCircle.tsx`) | Depende de scores reales (hoy colapsa por placeholders) |
| Narrativa / teaser | vacía → "no dice nada" en reporte | Texto interpretativo es-CO nivel HOV |
| Ficha técnica | placeholder | Metadatos reales es-CO |

## Entregables (cierra `[GAP-TWIVI-ITEMS-ANCHORS-ES-CO]`)

1. **20 ítems es-CO** — EXTRAÍDOS de la fuente TwIVI (Sandy et al. 2017 / sitio oficial), no redactados. Adaptación es-CO bajo ITC 2017: **tuteo neutro Colombia** (esto también cierra `[GAP-MICROCOPY-VOSEO-TO-ES-CO]` para este test — nada de voseo rioplatense). Como la licencia TwIVI es de uso libre explícito, los ítems traducidos SÍ pueden vivir en el seed (a diferencia de PVQ, CC BY-NC-ND).
2. **Anclas de respuesta es-CO** — confirmar la escala nativa de TwIVI y sus 6 anclas. Reusar como candidatas las de `implementation_packs/PVQ-21_..._Consolidado.md` §5 (juicio de semejanza, 6 puntos, registro neutro) y `implementation_packs/RESPONSE_ANCHORS_es-CO_v1.0.md`; verificar verbatim contra la fuente TwIVI.
3. **Mapeo ítem→valor→HOV** — reusar la teoría (pública) de PVQ-21 pack §2 y dossier 24 §1. 20 ítems → 10 valores → 4 HOV.
4. **Coding key + scoring** — verificar que el mapeo alimenta el MRAT ya implementado (centrado ipsativo). Reusar PVQ scoring (dossier 24 §7).
5. **Narrativa/teaser es-CO** — para "Qué sugiere esto sobre vos" del reporte + la frase reveladora del mini-result. **Nivel HOV, no por-valor fino:** TwIVI es ultra-breve (2 ítems/valor), confiabilidad por-valor limitada (dossier 24 §3.1). El copy se lee como "familia de valores", sin claims por-valor. Reusar la estructura de teaser de PVQ-21 pack §7.
6. **Ficha técnica es-CO** — nombre, qué mide, límites (screener breve, mirada HOV, no diagnóstico por-valor), estado LATAM (sin validación CO → "en validación").

## Reuso (no duplicar — regla CLAUDE.md §11)
- `implementation_packs/PVQ-21_..._Consolidado.md` §2 (mapeo), §5 (anclas es-CO), §7 (teaser).
- `dossiers/24_PVQ-40_Consolidado.md` §1 (teoría 10 valores + HOV + circumplex), §4 (adaptaciones español), §7 (scoring MRAT).
- Misma familia Schwartz → casi todo lo conceptual se transfiere; lo único propio de TwIVI son sus 20 portraits.
- NO existe dossier/pack TwIVI (sólo el scoring `twivi-mrat-fixture`). Per §11: producir el pack en el formato canónico.

## Reglas
- **Anti-invención:** ítems y anclas se extraen de fuente validada, no se redactan.
- **Anti-alucinación editorial (política de repo):** NO reproducir ítems literales en documentación; los ítems viven sólo en el seed (`db/seeds/instruments/TwIVI/items.sql`).
- **Formato de salida:** `implementation_packs/TwIVI_Implementation_Acquisition_Pack_v1.0.md` (formato canónico de los otros packs) + reemplazo del seed de ítems/anclas (borrar los placeholders).

## Handoff a Claude Code (tras el pack)
CC siembra los 20 ítems + anclas reales en el seed, verifica el MRAT contra la coding key, y confirma el circumplex + narrativa con datos reales (validar si el label-overlap del circumplex era artefacto de datos planos o bug de componente). Es el paso que hace usable el test de valores end-to-end.
