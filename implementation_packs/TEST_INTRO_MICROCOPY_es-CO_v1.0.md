# Test Intro Microcopy es-CO — v1.0

**Producto:** DescubreMe
**Owner:** Germán Vélez Hurtado
**Autor (Cowork):** [Rol: UX Writer + Investigador psicométrico senior + ángulo compliance Ley 1581 / NFR-27]
**Versión:** v1.0 — 2026-06-05
**Naturaleza:** Addendum standalone (reference). NO edita `TestIntro.tsx` ni los implementation packs; vive en paralelo, análogo a `RESPONSE_ANCHORS_es-CO_v1.0.md` y a los DIFF previos.
**Estado:** Wording canónico cerrado para piloto cognitivo / beta externa. Pendiente firma legal Ley 1581 (bundle legal DD-66, junto con los strings NFR-27/28).
**Cubre:** los 4 instrumentos Free (Flourishing, O-NET-IP-SF, PERMA-Profiler, BFI-2-S).
**Decisión NFR-27 pre-disclaimer:** **A literal + variante de personalidad para BFI-2-S** (ver §1 y §2).

---

## 0. Resumen ejecutivo

- La pantalla `TestIntro` se muestra 1 vez por test, en arranque fresco, antes del ítem 1 (no en resume de sesión pausada). Es la superficie natural para el disclaimer pre-test de NFR-27, que hoy **no se renderiza en ningún componente** (solo existe `variant="post"` en `/reporte`). Esto es un gap de compliance vivo: las migraciones 015/016/018 comentan que `ethical_flags='emotional_distress'` "dispara NFR-27 disclaimer pre/post", pero el "pre" nunca llega a pantalla.
- **Decisión (A literal):** los 3 instrumentos con `emotional_distress` (PERMA-Profiler, Flourishing, BFI-2-S) muestran el disclaimer pre NFR-27 como **bloque propio, visualmente separado** del cuerpo factual de la intro. O-NET-IP-SF (sin distress) usa solo el cuerpo factual genérico.
- **Refinamiento por instrumento (decisión Q2):** PERMA y Flourishing usan el `NFR27_DISCLAIMER_PRE_TEMPLATE` genérico **verbatim** (fue redactado para bienestar y les aplica con fidelidad). BFI-2-S usa una **variante construct-aware** (`disclaimer_pre_emotional_distress__bfi2`), porque el genérico habla de "cómo te sientes… no de cómo eres", lo cual contradice un instrumento de rasgos de personalidad. Precedente del proyecto: el companion `NFR28_CONTENTION_MODERATE_PVQRR` se creó por la misma razón.
- **Reconciliación de la decisión (transparencia):** la opción Q1 elegida ("A literal") enuncia "template genérico tal cual para los 3", mientras que la Q2 elegida pide variante para BFI-2-S. Se da precedencia a la Q2 por ser la decisión más específica a nivel instrumento. Resultado neto: bloque NFR-27 separado para los 3; genérico para PERMA/Flourishing; variante para BFI-2-S.
- `{instrument_name}`: **no** se interpola con `instrument.name_es` crudo (rompe el copy en 2 de 3 — ver §4). Se usa un **display label amigable es-CO** por instrumento (§3).
- La duración estimada (~min) se renderiza como **metadato presentacional** (chip), no como copy legal: así el string aprobado de NFR-27 queda intacto y `check:microcopy-sync` no se ve afectado por la duración.
- Título "Antes de comenzar" y botón "Comenzar": **confirmados sin cambio** (§5).
- **Zero migración** de base de datos. El único string nuevo es TS (`disclaimer_pre_emotional_distress__bfi2`) + entradas de sync. Detalle de wiring para CC en §7.

---

## 1. Decisión de compliance NFR-27 (decision doc)

**Contexto.** Ley 1581 de 2012 (Habeas Data) art. 5 clasifica como dato sensible la información relativa a la salud, incluida la salud emocional. Los 3 instrumentos con `ethical_flags='emotional_distress'` recolectan respuestas que alimentan la detección de `distress_event`. NFR-27 exige un aviso informado **antes** de recolectar (pre-test), no solo después (post-test). Hoy el "pre" no se muestra.

**Problema.** Antes de respondientes reales (piloto cognitivo / beta externa) el flujo Free incumple el componente pre-test de NFR-27 y deja un flanco de consentimiento informado bajo Ley 1581.

**Opciones evaluadas.**

| Opción | Qué hace | Pros | Contras |
|---|---|---|---|
| A literal **(elegida)** | Bloque NFR-27 separado del cuerpo de la intro, para los 3 instrumentos con distress | Cumple NFR-27 pre; respeta la intención del doc canónico §2 ("modal pre-start, click-through"); separa contenido legal de UI factual | Suma un bloque de lectura; exige resolver el label de instrumento |
| A merged | Fusionar el texto NFR-27 dentro de los párrafos factuales | Un solo bloque | Mezcla copy legal con copy operativo; dificulta el audit de "qué texto legal vio el usuario" |
| B — diferir | Intro genérica para los 4; NFR-27 pre aparte/después | Cambio mínimo ahora | Deja el gap de compliance abierto antes de datos reales. **Descartada.** |
| C — corta única para los 4 | Un disclaimer corto construct-neutral para todos, incl. O*NET | Baja carga cognitiva | Diverge del string aprobado (quinto texto); aplica "no es selección laboral / no es recomendación de estudios o trabajo" sobre un test de intereses vocacionales → confuso. **Descartada.** |

**Recomendación / decisión:** **A literal**, con **variante de personalidad para BFI-2-S** (§2).

**Riesgos.**
- `Riesgo:` doble mención de "no es diagnóstico" y "puedes pausar" si se conserva el cuerpo factual completo además del bloque NFR-27. Mitigación en §3: para los instrumentos con distress, el cuerpo factual se reduce al chip de duración; el bloque NFR-27 carga el resto (cero redundancia con el copy aprobado).
- `Riesgo:` el bloque NFR-27 no sustituye el consentimiento legal granular (ya dado en `/registro`). Es un refuerzo de expectativa + aviso pre-test, no re-consentimiento. Mantener ese marco (doc NFR-27/28 §9).

**Reversibilidad:** alta. Es swap de strings + render condicional; revertir a B es quitar el render condicional. Sin migración.

---

## 2. Decisión BFI-2-S — variante construct-aware

`Hecho (hallazgo psicométrico):` el `NFR27_DISCLAIMER_PRE_TEMPLATE` genérico está redactado en clave de **bienestar/estado**: "…un cuestionario corto de {item_count} preguntas **sobre cómo te sientes** en distintas áreas de tu vida… un retrato de cómo te sientes hoy, **no de cómo eres** ni de lo que vas a ser." Es fiel para PERMA y Flourishing. Para BFI-2-S (Big Five, rasgos) es construct-inaccurate: el instrumento mide precisamente "cómo eres", así que afirmar "no de cómo eres" se contradice con su propósito.

`Trazabilidad:` el propio `NFR-27_NFR-28_es-CO_v1.0.md` §11, pendiente #4, dejó flagueado: "Para instrumentos futuros con `emotional_distress` distintos de PERMA/Flourishing (p. ej. BFI-2-S…), revisar si los textos genéricos siguen aplicando o requieren variante específica." Esta decisión cierra ese pendiente para BFI-2-S.

`Precedente de patrón:` `lib/microcopy/nfr27-28.ts` ya contiene `NFR28_CONTENTION_MODERATE_PVQRR`, una variante construct-aware del genérico de contención, creada porque el wording de "tristeza/desánimo" no encajaba en un instrumento de valores. Misma lógica → companion para el pre de BFI-2-S.

**Decisión:** añadir el string canónico `disclaimer_pre_emotional_distress__bfi2` (texto en §6), que conserva las protecciones obligatorias (triple negación, no-determinismo, no correctas/incorrectas, pausar/salir) pero habla de "tu forma de ser" en lugar de "cómo te sientes".

`Nota de validez y límites:` el genérico y la variante NO son intercambiables a nivel de constructo, pero sí equivalentes a nivel de **cobertura ética** (ambos cubren los mismos 6 riesgos APA/Singapore del cross-check del doc NFR-27/28 §7). La variante debe pasar por el mismo piloto cognitivo N=6-8 sugerido para los textos genéricos antes del go-live.

---

## 3. Común (título + botón + cuerpo base)

**Título (todos los instrumentos):** `Antes de comenzar`
**Botón primario (todos):** `Comenzar`
**Nombre del instrumento (eyebrow, ya existente):** se mantiene el `instrument.name_es` arriba del título (uso de marca, no de copy legal).

**Cuerpo base — instrumentos SIN distress (O-NET-IP-SF):** 3 párrafos factuales (corrige tildes vs. el provisional v0):

> Vas a responder {item_count} preguntas. Toma alrededor de {min} min. Responde de forma honesta e intuitiva: no hay respuestas correctas ni incorrectas.
>
> Es una herramienta educativa de autoconocimiento, no un diagnóstico clínico.
>
> Puedes pausar y retomar cuando quieras, sin perder tu progreso.

**Cuerpo — instrumentos CON distress (PERMA, Flourishing, BFI-2-S):** para evitar redundancia con el bloque NFR-27 (que ya cubre conteo, honestidad, "no diagnóstico" y pausar/salir), el cuerpo factual se reduce a **una línea-chip de duración**, y el bloque NFR-27 carga el resto:

- Chip presentacional (no legal): `{item_count} preguntas · unos {min} min`
- Debajo, bloque NFR-27 separado (region con borde, `data-testid="nfr27-disclaimer-pre"`) con el texto de §6 según instrumento.
- Botón `Comenzar` = acknowledge (dispara `disclaimer_pre_acknowledged`, ver §7).

**Display label `{instrument_name}` (no usar `name_es` crudo):**

| code | name_es (DB, NO usar en el copy) | display label es-CO (usar este) |
|---|---|---|
| PERMA-Profiler | `PERMA-Profiler` | `el perfil de bienestar PERMA-Profiler` |
| Flourishing | `Flourishing Scale` | `la Escala de Florecimiento` |
| BFI-2-S | `BFI-2-S Big Five Inventory v1.0 (30 ítems)` | (embebido en la variante: `el cuestionario de personalidad BFI-2`) |

---

## 4. Por instrumento

| instrumento | distress | cuerpo / disclaimer | fuente del texto |
|---|---|---|---|
| Flourishing (8 ítems, ~2 min) | sí | Chip duración + bloque NFR-27 con `NFR27_DISCLAIMER_PRE_TEMPLATE` genérico, `{instrument_name}` = "la Escala de Florecimiento", `{item_count}` = 8 | `lib/microcopy/nfr27-28.ts` / `NFR-27_NFR-28_es-CO_v1.0.md` §2 (verbatim, no modificar) |
| O-NET-IP-SF (60 ítems, ~5 min) | no | Cuerpo base factual de §3 (3 párrafos). Sin bloque NFR-27. | Este addendum §3 |
| PERMA-Profiler (23 ítems, ~4 min) | sí | Chip duración + bloque NFR-27 con `NFR27_DISCLAIMER_PRE_TEMPLATE` genérico, `{instrument_name}` = "el perfil de bienestar PERMA-Profiler", `{item_count}` = 23 | `lib/microcopy/nfr27-28.ts` / `NFR-27_NFR-28_es-CO_v1.0.md` §2 (verbatim, no modificar) |
| BFI-2-S (30 ítems, ~5 min) | sí | Chip duración + bloque NFR-27 con la **variante** `disclaimer_pre_emotional_distress__bfi2`, `{item_count}` = 30 | Este addendum §6 (nuevo string canónico) |

`Hecho (por qué no `name_es`):` interpolar `name_es` rompe 2 de 3 — BFI-2-S `name_es` = "BFI-2-S Big Five Inventory v1.0 (30 ítems)" insertaría versión + duplicaría el conteo; Flourishing "Flourishing Scale" suena ajeno en es-CO. Por eso el display label de §3.

---

## 5. Título y botón — confirmación

- **Título `Antes de comenzar`:** confirmado. Neutro, es-CO, sin urgencia, fija expectativa. Alternativa solo si se quisiera más calidez: "Un momento antes de empezar" (no recomendado cambiar; el actual es más limpio).
- **Botón `Comenzar`:** confirmado. Imperativo claro, sin fricción. Alternativa equivalente: "Empezar" (intercambiable; sin razón de cambio).
- `Nota:` para los 3 instrumentos con distress, el botón cumple doble función UX + compliance (acknowledge del disclaimer pre). El label se mantiene "Comenzar"; no añadir "Acepto" para no convertir la intro en un segundo muro de consentimiento legal (el consentimiento granular ya se dio en `/registro`).

---

## 6. Texto canónico nuevo — BFI-2-S pre-disclaimer

Formato compatible con el parser de `check:microcopy-sync` (header con key entre backticks + blockquote). En la promoción al bundle legal, copiar este bloque a `producto/microcopy/NFR-27_NFR-28_es-CO_v1.0.md` como "Texto 1b" y registrar la key en el sync map (§7).

**Placeholders:** `{item_count}` (entero; el nombre del instrumento va embebido en el texto, no como placeholder).
**Longitud:** 96 palabras (límite 100; el genérico pre tiene 88).

### Texto — `disclaimer_pre_emotional_distress__bfi2`

> A continuación vas a responder el cuestionario de personalidad BFI-2, con {item_count} preguntas sobre tu forma de ser y de relacionarte. Esto no es un test clínico, ni un diagnóstico de salud mental, ni una prueba de selección laboral. Es una herramienta educativa de autoconocimiento que describe tu manera de ser actual; no te pone una etiqueta fija ni predice lo que vas a lograr. No hay respuestas correctas ni incorrectas: responde según cómo te ves la mayor parte del tiempo. Si una pregunta te incomoda, puedes pausar o salir cuando quieras, sin perder tu progreso.

**Rationale clave (paralelo al genérico, doc NFR-27/28 §2):**
- "Sobre tu forma de ser y de relacionarte" → encuadre de rasgo (no de estado), fiel al constructo Big Five.
- "Esto no es un test clínico, ni un diagnóstico de salud mental, ni una prueba de selección laboral" → triple negación verbatim del genérico (cubre los 3 riesgos APA: uso clínico, etiqueta diagnóstica, selección laboral).
- "Describe tu manera de ser actual; no te pone una etiqueta fija ni predice lo que vas a lograr" → reemplaza el problemático "no de cómo eres" por una formulación que (a) admite que el rasgo se mide, (b) lo presenta como no-fijo ("actual", coherente con el producto de desarrollo, no determinista), (c) bloquea predicción individual (no-negociable CLAUDE.md §7.3).
- "Responde según cómo te ves la mayor parte del tiempo" → instrucción de respuesta apropiada para ítems de rasgo (vs. "cómo te sientes hoy" del genérico de estado).
- "Puedes pausar o salir cuando quieras, sin perder tu progreso" → ancla operativa al patrón HU-F-11 (pausar/retomar), verbatim del genérico.

**Cross-check léxico es-CO (doc NFR-27/28 §7):** tuteo (`vas, te ves, puedes`); sin voseo; sin "ordenador/coger/vosotros"; sin léxico clínico ("depresión/trastorno/síntoma"); sin signos de exclamación; frases cortas. Cumple.

---

## 7. Spec de implementación para Claude Code (conceptual — Cowork no escribe producción)

`Alcance:` swap de strings + render condicional. Zero migración de DB.

**7.1 Datos disponibles / a propagar**
- `app/test/[instrumentCode]/page.tsx` hoy hace `instrument.select("id, name_es")`. Añadir `ethical_flags` al select para resolver el flag a nivel instrumento (alternativa ya disponible: derivar de `itemSensitivities`, pero el flag de instrumento es más limpio y explícito).
- `Questionnaire.tsx` pasa hoy `instrumentName` + `total` a `TestIntro`. Añadir: `instrumentCode` y `hasEmotionalDistress: boolean`.

**7.2 Selección de texto (pseudocódigo conceptual)**
```
hasDistress = instrument.ethical_flags includes 'emotional_distress'

if (!hasDistress):
    render cuerpo base factual (§3, 3 párrafos)         // O-NET-IP-SF
else:
    render chip "{item_count} preguntas · unos {min} min"
    label = DISPLAY_LABEL[instrumentCode]               // §3 tabla
    if (instrumentCode == 'BFI-2-S'):
        text = NFR27_DISCLAIMER_PRE_BFI2.replace('{item_count}', total)
    else:                                               // PERMA / Flourishing
        text = renderDisclaimerPre(label, total)        // ya existe en nfr27-28.ts
    render <region data-testid="nfr27-disclaimer-pre"> text </region>
```

**7.3 Constante nueva (TS)** en `lib/microcopy/nfr27-28.ts`:
- `export const NFR27_DISCLAIMER_PRE_BFI2 = \`…\`;` con el texto de §6 (sin reemplazar `{item_count}`, igual que el template genérico).
- Opcional: helper `renderDisclaimerPreBfi2(itemCount)` análogo a `renderDisclaimerPre`.

**7.4 `check:microcopy-sync`** (mantener cobertura del nuevo string):
- El sync v1.0 lee `producto/microcopy/NFR-27_NFR-28_es-CO_v1.0.md`. Para cubrir el nuevo string sin romper CI:
  - **Recomendado:** promover el bloque de §6 a `NFR-27_NFR-28_es-CO_v1.0.md` (Texto 1b, mismo formato header+blockquote) y añadir la key `disclaimer_pre_emotional_distress__bfi2` a `MicrocopyKey` + a los maps de `scripts/check-microcopy-sync.ts` y `tests/integration/microcopy-sync.test.ts`. Single source of truth para todos los strings NFR-27.
  - Hasta esa promoción, este addendum (§6) es la fuente canónica del texto; el blockquote ya está en formato parseable.

**7.5 Audit (NFR-27 + Ley 1581, doc §2 y §9)**
- En "Comenzar", cuando `hasDistress`, registrar en `audit_log`: `event='disclaimer_pre_acknowledged'`, con `instrument_code`, `version`, `timestamp`. (Para O-NET sin distress no aplica.)
- No usar este evento para segmentación comercial ni marketing (no-negociable doc §9).

**7.6 Tests a tocar (follow-up CC)**
- `tests/unit/app/test/TestIntro.test.tsx`: casos (a) sin distress → 3 párrafos factuales, sin `nfr27-disclaimer-pre`; (b) PERMA/Flourishing → `nfr27-disclaimer-pre` con texto genérico + label correcto; (c) BFI-2-S → `nfr27-disclaimer-pre` con la variante (assert frase "tu forma de ser").
- `check:microcopy-sync` si se promueve el string (§7.4).
- Cerrar `[GAP-INTRO-MICROCOPY]` en BACKLOG.

---

## 8. Riesgos y supuestos

- `Supuesto:` los `item_count` reales son 8 / 60 / 23 / 30 (verificado en seeds 010/015/016/018). Si cambian las versiones activas, el chip y el `{item_count}` se actualizan solos (vienen de `items.length` / `instrument_version.item_count`).
- `Riesgo (no bloquea):` el estimador de duración en `TestIntro` (`Math.ceil(total*10/60)`) da O-NET = 10 min, pero el briefing y la naturaleza de los ítems de interés sugieren ~3-5 min. Recomendación: parametrizar segundos/ítem por instrumento (p. ej. O*NET ~5 s/ítem) o un override por `instrumentCode`. Es lógica de UI, no copy; fuera del swap de strings, sugerido como mejora menor.
- `Riesgo:` la variante BFI-2-S no ha pasado piloto cognitivo. Igual que los 4 textos genéricos, debe validarse N=6-8 colombianos urbanos antes del go-live (doc NFR-27/28 §11.1).
- `Riesgo:` mientras el string viva solo en este addendum (no promovido a la fuente v1.0), `check:microcopy-sync` no lo cubre. Mitigación: promover en el mismo commit del swap (§7.4).
- `Supuesto:` la intro NO re-pide consentimiento legal (ya dado en `/registro`); el bloque NFR-27 es refuerzo de expectativa + aviso pre-test, no re-consentimiento.

---

## 9. Trazabilidad

**Inputs verificables (knowledge):**
- `producto/microcopy/NFR-27_NFR-28_es-CO_v1.0.md` (v1.2) §2 (texto pre genérico), §7 (criterios léxicos es-CO), §9 (Ley 1581), §11 pendiente #4 (BFI-2-S).
- `producto/microcopy/NFR-27_NFR-28_es-CO_v1.1_PVQRR_companion.md` (precedente de variante construct-aware).
- `implementation_packs/RESPONSE_ANCHORS_es-CO_v1.0.md` (estándar de estilo es-CO y formato de addendum).
- Código (solo lectura): `lib/microcopy/nfr27-28.ts`, `app/test/[instrumentCode]/_components/TestIntro.tsx`, `Questionnaire.tsx`, `app/reporte/_components/NFR27Disclaimer.tsx`, `app/test/[instrumentCode]/page.tsx`, `scripts/check-microcopy-sync.ts`, `tests/integration/microcopy-sync.test.ts`, `tests/unit/app/test/TestIntro.test.tsx`.
- Seeds: migraciones `010_seed_onet_ip_sf`, `015_seed_perma_profiler`, `016_seed_flourishing`, `018_seed_bfi2_s` (`name_es`, `ethical_flags`, `item_count`).

**Estándares aplicados:**
- American Psychological Association. (2017). *Ethical principles of psychologists and code of conduct* (§10.01 Informed consent). https://www.apa.org/ethics/code
- World Conference on Research Integrity. (2010). *Singapore statement on research integrity* (§2 Responsibility). https://wcrif.org/guidance/singapore-statement
- International Test Commission. (2017). *ITC guidelines for translating and adapting tests* (2nd ed.). https://www.intestcom.org

**Marco legal Colombia:**
- Congreso de Colombia. (2012). *Ley 1581 de 2012* (Habeas Data), art. 5 (datos sensibles). https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981

**Instrumentos (atribución de constructo, no de copy):**
- Butler, J., & Kern, M. L. (2016). The PERMA-Profiler. *International Journal of Wellbeing, 6*(3), 1–48. https://doi.org/10.5502/ijw.v6i3.526
- Diener, E., Wirtz, D., Tov, W., Kim-Prieto, C., Choi, D.-W., Oishi, S., & Biswas-Diener, R. (2010). New well-being measures. *Social Indicators Research, 97*(2), 143–156. https://doi.org/10.1007/s11205-009-9493-y
- Soto, C. J., & John, O. P. (2017). The next Big Five Inventory (BFI-2). *Journal of Personality and Social Psychology, 113*(1), 117–143. https://doi.org/10.1037/pspp0000096

---

## 10. Sign-off Cowork

**Versión:** v1.0 — 2026-06-05
**Estado:** DRAFT — Cowork firma técnica/editorial.
- Decisión NFR-27: **A literal + variante personalidad BFI-2-S**. Reconciliación Q1/Q2 documentada (§0).
- Cuerpo base, display labels, chip de duración y título/botón confirmados.
- Variante BFI-2-S: triple negación + no-determinismo + pausar/salir presentes; léxico es-CO verificado; ≤ 100 palabras.

**Pendientes / riesgos abiertos:**
1. Piloto cognitivo N=6-8 de la variante BFI-2-S (junto con los textos genéricos NFR-27/28).
2. Promoción del string BFI-2-S a la fuente `NFR-27_NFR-28_es-CO_v1.0.md` + sync map (§7.4), idealmente en el commit del swap.
3. Validación asesor legal Ley 1581 (bundle legal DD-66).
4. Calibración de duración por instrumento (O*NET ~3-5 min vs. 10 min del estimador actual).

---

*Fin del documento TEST_INTRO_MICROCOPY_es-CO_v1.0.md — v1.0 — 2026-06-05 — Cowork.*
