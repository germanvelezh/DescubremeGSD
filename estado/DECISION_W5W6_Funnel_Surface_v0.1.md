# Decision Doc — Superficie de W5 (captura de nivel) + W6 (reveal ocupacional Job Zone) en el funnel invertido

**Estado:** **DECIDIDO v1.0 (2026-06-29, German)** — Opción B + 4 respuestas de producto (ver §0). Siguiente: plan de implementación.
**Fecha:** 2026-06-29. **Rol:** Arquitecto + PM. **Gap:** `[GAP-W5W6-ORPHANED-FREE-FLOW]` (P1).
**Relacionado:** `[GAP-FREE-NO-RESULTS-VISIBILITY]`, `[GAP-UX-FLOW-REDESIGN]`, `[GAP-W6-HOOKS-1]`, ADR-029 (funnel invertido).

---

## 0. DECISIÓN (2026-06-29, German)

**Rumbo: Opción B** (rutear post-PERMA a la superficie `/reporte` recortada → luego teaser), con las 4 respuestas de §5:

1. Reveal ocupacional = **payoff Free**.
2. Captura de nivel = **obligatoria** (sin skip).
3. Cierre = **dos pantallas**: [nivel + ocupaciones] → [teaser].
4. **Sí, un mini-resultado por test** antes del cierre.

**Flujo resuelto del Free:**

```
signup → BFI → mini-result → O*NET → mini-result → TwIVI → mini-result → PERMA → mini-result
  → PANTALLA 1: captura de nivel (OBLIGATORIA) → reveal ocupacional Job Zone (Free)
  → PANTALLA 2: teaser integrado (/perfil-integrado)
```

**Cluster de gaps que esto resuelve/toca:** `[GAP-W5W6-ORPHANED-FREE-FLOW]` (routing B + recut por-contexto), `[GAP-FREE-NO-RESULTS-VISIBILITY]` (mini-results + reveal), `[GAP-W6-HOOKS-1]` (transición = mini-result + preview del próximo). **Dependencias de contenido (Cowork):** `[GAP-MICROCOPY-VOSEO-TO-ES-CO]` (es-CO neutro), `[GAP-TWIVI-ITEMS-ANCHORS-ES-CO]` (items reales, placeholders vivos en prod), `[GAP-FREE-TEST-INTRO-COPY]`, copy de mini-results por test (NUEVO).

Las opciones A y C quedan descartadas (registradas abajo para trazabilidad).

---

## 1. Contexto

El funnel invertido (ADR-029) reorganizó el Free a `signup → BFI → O*NET → TwIVI → PERMA → teaser`. La mejora de Job Zone (seed_ext_v1.1: 29 ocupaciones Zona 3-5 → 125 totales) buscaba un reveal ocupacional más rico, **condicionado al nivel profesional del usuario** (educación + experiencia → `target_job_zone` → filtra qué zonas ve). En el smoke (2026-06-29) ese reveal y la pregunta de nivel **nunca aparecieron**.

## 2. Hallazgo (verificado, file:line)

La maquinaria de W5/W6 **es correcta y completa**, pero está enchufada a una página que el funnel Free ya no visita.

- **Maquinaria (OK):** `LevelCapture` (W5) → `captureLevelAction` (`reporte/[sessionId]/actions.ts:60`) setea `user.education_level/career_stage` (`:102`) + `report_snapshot.target_job_zone` (`:120`) → `lib/report/assembler.ts` filtra ocupaciones por Job Zone → reveal (`reporte/[sessionId]/page.tsx:333`). Gate: `needsLevelCapture = isHexagon && !educationLevel` (`page.tsx:221`).
- **Routing (MAL):** `done/page.tsx` enruta el final del Free a `/perfil-integrado` (`:108/:113/:132`), **nunca a `/reporte/[sessionId]`**. El flujo guiado va test→test directo y saltea TODOS los reportes intermedios, incluido el reporte O*NET donde viven W5/W6.
- **`/perfil-integrado` (teaser):** sin captura de nivel, sin ocupaciones, sin Job Zone (0 referencias).

**Causa raíz:** W5/W6 se construyeron sobre el reporte O*NET por-sesión (`/reporte/[sessionId]`, herencia Fase 1), pero el funnel invertido cierra en el teaser integrado (`/perfil-integrado`). Quedaron huérfanos. Sin pisar `/reporte`: nivel nunca se pregunta → `target_job_zone` nunca se computa → el reveal de 125 ocupaciones nunca se muestra.

## 3. Opciones

| | Opción | Dónde caen W5 + ocupaciones | Esfuerzo | Reúso de maquinaria |
|---|--------|------------------------------|----------|---------------------|
| **A** | **Re-homear al teaser** | Captura de nivel + reveal ocupacional dentro de `/perfil-integrado` | Medio-alto (rehacer componentes en superficie nueva) | Parcial (lógica sí, JSX se re-monta) |
| **B** | **Rutear a través del reporte O*NET** | Tras PERMA, mostrar `/reporte/{onet-session}` (hexagon + W5 gate + W6) → luego teaser | Bajo (reúso directo, solo routing) | Total |
| **C** | **Pantalla nueva post-PERMA** | Paso dedicado "nivel + ocupaciones" entre el último test y el teaser | Medio | Parcial |

**Pros/contras:**

- **A — Re-homear al teaser.** Pro: un solo cierre, el usuario ve todo junto; coherente con "el final es el teaser". Con: el teaser hoy es "integrado cross-instrumento + upsell + waitlist"; sumarle captura de nivel + reveal ocupacional lo recarga y mezcla dos lógicas (integrador vs O*NET); hay que portar `LevelCapture`/assembler a la superficie del teaser.
- **B — Rutear al reporte O*NET.** Pro: esfuerzo mínimo (la página ya tiene W5 gate + W6 reveal funcionando); cero reescritura de componentes; respeta el diseño original. **Prerequisito VERIFICADO (2026-06-29):** las sesiones O*NET completadas SÍ generan `report_snapshot` en el flujo guiado (`done/page.tsx:44` → `score-on-done.ts:102` → `scoreSession` escribe el snapshot; en prod **3/3** sesiones O*NET completadas tienen snapshot) → `/reporte/{onet}` renderiza, NO 404. B **no** hereda generación de snapshot (el 404 del smoke era solo la sesión incompleta). Con: muestra el reporte O*NET hexagon COMPLETO (bandas RIASEC + ficha) — puede ser más de lo que el Free quiere regalar; aparece una superficie de "reporte por-test" en un flujo que se diseñó sin reportes intermedios; requiere un CTA claro reporte→teaser. **Con clave:** `/reporte/[sessionId]` es superficie **COMPARTIDA** (`me/data/page.tsx:124` la linkea para reportes pasados en "Mis datos"), así que el recorte hacia C (ocultar hexagon, mostrar solo nivel+ocupaciones) es un cambio de **render condicional por-contexto** —flujo Free vs reporte histórico—, no routing puro.
- **C — Pantalla nueva post-PERMA.** Pro: separa concerns (nivel + ocupaciones aislado del teaser y del reporte hexagon); control fino de qué se muestra. Con: un paso más en el flujo; hay que construir la superficie nueva (reúso parcial).

## 4. Recomendación

**Opción B como base mecánica, con recorte de alcance hacia C.** Rationale:

- **Reúso total** = el camino más corto a "que funcione" con la maquinaria ya verificada (riesgo bajo, sin reescritura). El prerequisito está **verificado**: las sesiones O*NET completadas tienen snapshot en el flujo guiado (3/3 en prod), así que rutear a `/reporte` no introduce el 404 ni hereda scoring.
- El momento natural para preguntar el nivel es **al final** (post-PERMA: "personalicemos tus sugerencias ocupacionales"), no mid-flow (rompe el ritmo test→test).
- ADR-029 dice que O*NET "sigue alimentando la rec Job Zone" en Free → el reveal ocupacional **es un payoff legítimo del Free**, no Paid.
- El recorte hacia C: en vez de mostrar el reporte O*NET hexagon entero (bandas + ficha técnica), exponer en esa superficie **solo** la captura de nivel + el reveal ocupacional (las capas que el Free necesita), dejando el hexagon completo para el Paid. Esto evita "regalar" el reporte profundo manteniendo el reúso de `LevelCapture` + assembler. **Caveat:** como `/reporte/[sessionId]` también sirve "Mis datos" (reportes pasados), el recorte debe ser **render condicional por-contexto** (flujo Free de cierre vs vista histórica), no una poda global de la página — sube un poco el costo de B respecto del "routing puro".

Resultado propuesto: `... PERMA → [captura de nivel + reveal ocupacional Job Zone] → teaser integrado`.

## 5. Preguntas abiertas (a resolver antes de planear — producto/Cowork)

1. **¿El reveal ocupacional es payoff Free o se reserva para Paid?** (ADR-029 sugiere Free; confirmar.)
2. **¿Captura de nivel = obligatoria o saltable?** Si es saltable, ¿qué ve quien la saltea? (¿ocupaciones sin filtrar zona, o nada?)
3. **¿Una sola superficie de cierre (nivel+ocupaciones+teaser juntos) o dos pantallas (nivel+ocupaciones → teaser)?** Afecta A vs B/C.
4. **¿Se muestra algún resultado por-test antes del cierre** (liga a `[GAP-FREE-NO-RESULTS-VISIBILITY]`), o el cierre es el único momento de "resultados"?

## 6. Riesgos / Reversibilidad

- **Reversibilidad alta:** es cambio de routing + composición de UI, sin migración de datos. `education_level`/`career_stage` ya existen en schema (mig 016) y la captura es revocable en "Mis datos". Volver atrás = revertir el routing.
- **Riesgo de scope creep:** esto toca la misma superficie que `[GAP-FREE-NO-RESULTS-VISIBILITY]` y `[GAP-W6-HOOKS-1]` (transición/recap). Conviene decidir las 4 preguntas de §5 de una, para no rehacer la superficie de cierre tres veces.
- **Dependencia de contenido:** el reveal ocupacional con copy es-CO (no voseo, `[GAP-MICROCOPY-VOSEO-TO-ES-CO]`) + micro-tags RIASEC (`[GAP-MICROTAG-RIASEC-NAME]`) son Cowork.

## 7. Referencias

- `app/(b2c)/test/[code]/done/page.tsx:108,113,132` (routing al teaser).
- `app/(b2c)/reporte/[sessionId]/page.tsx:221,322,333` (gate W5 + reveal W6).
- `app/(b2c)/reporte/[sessionId]/actions.ts:60,102,120` (captura + target_job_zone).
- `lib/report/assembler.ts` (filtro Job Zone). `app/(b2c)/perfil-integrado/page.tsx` (teaser, sin W5/W6).
- ADR-029 (funnel invertido). BACKLOG `[GAP-W5W6-ORPHANED-FREE-FLOW]`.
