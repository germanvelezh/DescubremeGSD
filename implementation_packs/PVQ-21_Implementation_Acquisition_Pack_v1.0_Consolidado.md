# Implementation Acquisition Pack v1.0 — PVQ-21 (Portrait Values Questionnaire, forma corta ESS, 21 items)

**Producto destino:** DescubreMe — **B2C Free** (instrumento de valores). Migracion a plugin Supabase/PostgreSQL (instrumento como metadata).
**Autor (Cowork):** [Rol: Investigador psicometrico senior + UX Writer + angulo compliance]
**Version:** 1.0
**Fecha:** 2026-06-05
**Dossier base:** `dossiers/30_PVQ-21_Consolidado.md`.
**Resuelve:** `[GAP-PVQ21-FREE-MICROCOPY]` (UX_EXPERIENCE_SPEC §16). Abre carries `[GAP-PVQ21-ITEMS-ES-CO]` y `[GAP-PVQ21-ANCHORS-ES-CO]`.
**Idioma:** espanol neutro (metadatos/notas) / espanol Colombia (microcopy e items dirigidos al usuario).

> **Regla de oro (no inventar):** los items y las anclas dirigidos al usuario se **extraen de fuente validada**, no se redactan. Donde este pack muestra texto es-CO de item/ancla, es **candidato a verificar** contra la fuente, no wording aprobado. Lo que este pack si fija son: el mapeo item->valor->HOV (publico), el scoring, la microcopy autoral de intro, y las decisiones de implementacion.

---

## Seccion 0 — Portada y bloqueadores

| Campo | Valor |
|---|---|
| Instrumento | PVQ-21 (ESS Human Values Scale, 21 items) |
| Constructo | Valores humanos basicos (Schwartz 1992): 10 valores -> 4 HOV |
| Escala | 6 puntos verbales, sin punto neutral |
| Tiempo | ~4 min |
| Producto | B2C Free |
| ethical_flags | ninguno (no dispara NFR-27 de distress) |

| Bloqueador | Status | Razon |
|---|---|---|
| Items literales es-CO | **PARTIAL** | Items ESS publicos; wording es a extraer de fuente validada (ESS espanol / Castro Solano y Nader 2006). NoDerivatives sobre adaptacion. |
| Anclas verbales es-CO | **PARTIAL** | Estandar ESS conocido; verificar verbatim es-CO. |
| Licencia uso comercial | **DEFERRED a fase 7** | Familia Schwartz; requiere permiso. No bloquea desarrollo (CLAUDE.md §12). Plan-B TwIVI. |
| Baremo es-CO | **N/A para el teaser** | El reporte Free es intra-individuo (centrado MRAT), no requiere norma poblacional. |

---

## Seccion 1 — Plan de adquisicion del banco de items

`Hecho:` los 21 items del PVQ-21 son la Human Values Scale de la ESS, de acceso publico en la documentacion de la European Social Survey y en el Questionnaire Development Package (Schwartz, 2003). Las versiones masculina/femenina existen para lenguas con genero.

**Fuentes para extraer el wording es (verbatim):**
1. ESS — version espanola oficial de la Human Values Scale (cuestionario ESS administrado en Espana y paises hispanohablantes). Fuente canonica del wording es.
2. Castro Solano y Nader (2006), *Interdisciplinaria* 23(2) — adaptacion al castellano de PVQ-40/PVQ-21 (rioplatense); referencia lexica iberoamericana.
3. Referencia lexica de apoyo (no fuente primaria del PVQ-21): los ejemplos es del pack `PVQ-RR_Implementation_Acquisition_Pack_v1.0` §2 (formato "Es importante para el/ella..."). Sirven de guia de estilo, no como items del PVQ-21 (son instrumentos distintos).

**Pasos:**
- Paso 1: extraer los 21 items es de la fuente ESS espanola y cotejar con Castro Solano y Nader (2006). Cargar como `item_bank_pvq21_es` con `source` y `gender_variant`.
- Paso 2: decidir variante de genero (ver §4) y registrar.
- Paso 3: piloto cognitivo es-CO N=6-8 antes de go-live.

`No inventar:` este pack no transcribe los 21 items; los referencia para extraccion. Carry `[GAP-PVQ21-ITEMS-ES-CO]`.

---

## Seccion 2 — Mapeo item -> valor basico -> HOV

`Hecho:` mapeo estandar de la ESS Human Values Scale (21 items). Universalismo tiene 3 items; los demas valores, 2 cada uno (3 + 9x2 = 21).

| Item # (ESS) | Valor basico | HOV |
|---|---|---|
| 1, 11 | Autodireccion (Self-Direction) | Apertura al cambio |
| 6, 15 | Estimulacion (Stimulation) | Apertura al cambio |
| 10, 21 | Hedonismo (Hedonism) | Apertura al cambio (frontera; ver nota) |
| 4, 13 | Logro (Achievement) | Autopromocion |
| 2, 17 | Poder (Power) | Autopromocion |
| 5, 14 | Seguridad (Security) | Conservacion |
| 7, 16 | Conformidad (Conformity) | Conservacion |
| 9, 20 | Tradicion (Tradition) | Conservacion |
| 3, 8, 19 | Universalismo (Universalism) | Autotrascendencia |
| 12, 18 | Benevolencia (Benevolence) | Autotrascendencia |

`Nota Hedonismo (convencion fijada):` se agrupa en **Apertura al cambio** (convencion ESS dominante). Se documenta como decision; si el piloto/uso sugiere reportarlo aparte, es reversible (cambio de metadata del `hovMap`, no de codigo). Analogo a la decision de valores frontera del PVQ-RR (`PVQ-RR_HOV_PARTITION_VALIDATION_v1.0.md`).

`hovMap` (referencia para Claude Code, seed):
```
hovMap = {
  "OPENNESS":          ["SELF_DIRECTION", "STIMULATION", "HEDONISM"],
  "SELF_ENHANCEMENT":  ["ACHIEVEMENT", "POWER"],
  "CONSERVATION":      ["SECURITY", "CONFORMITY", "TRADITION"],
  "SELF_TRANSCENDENCE":["UNIVERSALISM", "BENEVOLENCE"]
}
```

---

## Seccion 3 — Scoring

`Hecho:` Schwartz recomienda centrar las respuestas within-person (MRAT) antes de interpretar prioridades de valores, para corregir el estilo de uso de la escala.

**Entradas:** 21 `raw_value` (1-6) por usuario.

**Calculo (paso a paso):**
1. `MRAT = media de las 21 respuestas crudas del usuario`.
2. `centered_i = raw_i - MRAT` para cada item.
3. `valor_v = media de los centered_i de los items de v` (2 items, o 3 para Universalismo).
4. `hov_h = media no ponderada de los valor_v que componen h` (segun `hovMap`).
5. **Salida teaser (Free):**
   - Jerarquia de valores: orden de `valor_v` de mayor a menor (top 3 y bottom 2 para el teaser).
   - Mapa de 4 HOV: `hov_h` relativos entre si (perfil de la persona).

**Reglas:**
- Reporte **intra-individuo** (ipsativo): describe la jerarquia de la persona, no la compara con otros.
- No banding por percentil poblacional (no hay norma HOV; coherente con PVQ-RR pack §3.0.6).
- Quality validator (Gate 1): marcar respuesta de patron unico (todo 6, todo 1) y tiempo atipico; MRAT pierde sentido si no hay varianza intra-persona.

**Salidas:** `value_hierarchy` (10 valores ordenados, centrados), `hov_profile` (4 HOV centrados), `top_values` / `bottom_values` (para microcopy del teaser).

`Trazabilidad:` cada salida referencia la version del instrumento y la formula MRAT; reproducible (Gate 1).

---

## Seccion 4 — Variante de genero e items

`Hecho:` el PVQ original tiene retratos en masculino y femenino ("Es importante para el..." / "...para ella..."). Decision para DescubreMe:

| Opcion | Pro | Contra |
|---|---|---|
| Variante por genero declarado del usuario | Fidelidad al instrumento | Requiere capturar genero; manejo de no-binario |
| Variante neutra (3a persona neutra) | Inclusiva, sin capturar genero | Puede divergir del wording validado (NoDerivatives) |

`Recomendacion:` usar variante segun genero declarado cuando exista, con opcion neutra disponible; registrar `gender_variant` en metadata. `Riesgo:` la version neutra es-CO puede requerir permiso (NoDerivatives) -> a resolver en fase 7. Carry `[GAP-PVQ21-ITEMS-ES-CO]`.

---

## Seccion 5 — Anclas de respuesta es-CO (candidatas; verificar)

`Hecho:` la ESS usa 6 anclas verbales de semejanza, sin punto neutral. `Candidato es-CO a verificar contra fuente ESS espanola` (no aprobado verbatim; tratar como `RESPONSE_ANCHORS_es-CO_v1.0.md` trata sus anclas: extraer literal de la fuente).

| valor | ancla candidata es-CO | fuente a verificar |
|---|---|---|
| 6 | Se parece mucho a mi | ESS espanol (verificar) |
| 5 | Se parece a mi | ESS espanol (verificar) |
| 4 | Se parece algo a mi | ESS espanol (verificar) |
| 3 | Se parece poco a mi | ESS espanol (verificar) |
| 2 | No se parece a mi | ESS espanol (verificar) |
| 1 | No se parece nada a mi | ESS espanol (verificar) |

`Nota es-CO:` anclas en registro-neutro (sin marca tu/usted), consistente con la politica de `RESPONSE_ANCHORS_es-CO_v1.0.md`. 6 puntos fijos. Carry `[GAP-PVQ21-ANCHORS-ES-CO]`: confirmar verbatim antes de go-live.

---

## Seccion 6 — Microcopy de intro (es-CO, copy autoral)

`Hecho:` PVQ-21 no tiene `emotional_distress`, por lo que **no** lleva el bloque NFR-27 de distress (a diferencia de BFI-2-S/PERMA). Usa el cuerpo base factual, analogo a O*NET (ver `TEST_INTRO_MICROCOPY_es-CO_v1.0.md` §3).

**Hook (capa autoral, exemplar a pilotar):**
> "Lo que mas te importa guia tus decisiones, muchas veces sin que lo notes. Vamos a ponerlo en palabras."

**Intro "Antes de comenzar" (cuerpo base, sin distress):**
> Vas a leer descripciones breves de personas. Para cada una, indica que tanto se parece a ti. Toma alrededor de {min} min. No hay respuestas correctas ni incorrectas: responde de forma honesta e intuitiva.
>
> Es una herramienta educativa de autoconocimiento, no un diagnostico clinico.
>
> Puedes pausar y retomar cuando quieras, sin perder tu progreso.

**Titulo:** `Antes de comenzar`. **Boton:** `Comenzar`. (Consistente con el estandar del proyecto.)

`Nota:` "que tanto se parece a ti" refleja el formato de juicio de semejanza del PVQ, sin alterar los items. Esta intro es copy autoral (se puede crear); los items y anclas no.

---

## Seccion 7 — Salida al usuario (teaser de valores, es-CO)

Patron por capas (UX_EXPERIENCE_SPEC §8), version Free/teaser:

| Capa | Contenido |
|---|---|
| Visual primero | Mapa de los 4 HOV (cuadrantes) con la posicion relativa de la persona |
| Frase reveladora | Nombrar el/los valor(es) top en cotidiano (ej. "Lo que mas te mueve hoy es la autonomia y el cuidado de los demas") |
| Explicacion simple | Que significa su valor top, sin jerga |
| Pincelada del Paid | "El perfil completo abre estos 4 grandes grupos en 19 valores mas finos y los cruza con tu personalidad e intereses" |
| Limite honesto | "Esto refleja tus prioridades de hoy; los valores se mueven con la vida. No es una etiqueta ni una prediccion." |

`Salvaguarda:` no presentar un valor aislado como medida precisa (baja confiabilidad por valor); el foco es la jerarquia y los 4 HOV. Sin determinismo, sin comparacion entre personas.

---

## Seccion 8 — Licencia (preliminar; cierre en fase 7)

| Item | Estado |
|---|---|
| Uso comercial | Requiere permiso de Schwartz (familia PVQ). No dominio publico estricto |
| Items es (adaptacion) | NoDerivatives: no modificar lexicamente sin permiso |
| Atribucion | Schwartz + fuente de adaptacion ESS/es |
| Plan-B | TwIVI (10 items, Sandy, Gosling, Schwartz, Koelkebeck, 2017); tambien permiso |
| Accion fase 7 | Solicitar permiso comercial a Schwartz para PVQ-21 + wording es; presupuestar; si no, swap a plan-B (cambio de metadata) |

`Riesgo especifico (R-01):` en valores el plan-B "abierto" es debil (todas las formas Schwartz requieren permiso). Documentar como riesgo de la fase 7, no como bloqueador del desarrollo.

---

## Seccion 9 — Compliance y NFR

- ethical_flags: ninguno -> sin NFR-27 de distress, sin NFR-28.
- Consentimiento: granular del producto Free (Ley 1581); precondicion para guardar respuestas.
- `usage_log`: registrar administracion para auditoria de licencia (reporte a Schwartz en fase 7).
- Audit log + cifrado: estandar del proyecto (Gate 2).

---

## Seccion 10 — Piloto, gaps y referencias

**Piloto cognitivo es-CO (N=6-8):** comprension de los items (juicio de semejanza), de las 6 anclas, y del concepto de "valores" sin tecnicismos. Verificar que la salida teaser se siente reveladora y no generica (anti-Barnum).

**Gaps / carries:**
- `[GAP-PVQ21-ITEMS-ES-CO]` P1 — extraer/verificar 21 items es-CO desde fuente validada + variante de genero.
- `[GAP-PVQ21-ANCHORS-ES-CO]` P1 — verificar 6 anclas es-CO verbatim.
- `[GAP-PVQ21-LICENSE]` P2 (fase 7) — permiso comercial Schwartz + wording es (NoDerivatives) o swap a TwIVI.

**Referencias (APA 7):**

Schwartz, S. H. (1992). Universals in the content and structure of values. *Advances in Experimental Social Psychology, 25*, 1-65. https://doi.org/10.1016/S0065-2601(08)60281-6

Schwartz, S. H. (2003). A proposal for measuring value orientations across nations. In *Questionnaire Development Package of the European Social Survey* (chap. 7). European Social Survey. https://www.europeansocialsurvey.org

Castro Solano, A., & Nader, M. (2006). La evaluacion de los valores humanos con el Portrait Values Questionnaire de Schwartz. *Interdisciplinaria, 23*(2), 155-174. https://www.redalyc.org/articulo.oa?id=18023202

Cieciuch, J., & Davidov, E. (2012). A comparison of the invariance properties of the PVQ-40 and the PVQ-21. *Survey Research Methods, 6*(1), 37-48. https://doi.org/10.18148/srm/2012.v6i1.5091

Sandy, C. J., Gosling, S. D., Schwartz, S. H., & Koelkebeck, T. (2017). The development and validation of brief and ultrabrief measures of values. *Journal of Personality Assessment, 99*(5), 545-555. https://doi.org/10.1080/00223891.2016.1231115

---

*Fin del Implementation Acquisition Pack PVQ-21 v1.0. Resuelve el gap de microcopy del Free; abre carries de items/anclas es-CO (extraccion de fuente validada, no invencion) y licencia (fase 7). Consumir junto a `dossiers/30_PVQ-21_Consolidado.md`.*
