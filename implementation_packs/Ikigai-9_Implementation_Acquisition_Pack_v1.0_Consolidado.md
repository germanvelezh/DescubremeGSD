# Implementation Acquisition Pack v1.0 — Ikigai-9 (Imai, Osada y Nishimura, 2012, 9 items)

**Producto destino:** DescubreMe — **Ikigai Premium** (eje del mapper de proposito). Instrumento como metadata/plugin.
**Autor (Cowork):** [Rol: Investigador psicometrico senior + UX Writer + angulo compliance/etica]
**Version:** 1.0
**Fecha:** 2026-06-05
**Dossier base:** `dossiers/31_Ikigai-9_Consolidado.md`.
**Cierra:** `[GAP-PACK-Ikigai-9]` (lado pack). Abre carries de adaptacion es-CO (P1, prerequisitos de fase 5).
**Idioma:** espanol neutro (notas) / espanol Colombia (microcopy). Items en ingles citados de fuente publica; **wording es-CO a producir por adaptacion formal**.

> **Regla de oro (no inventar):** los 9 items en es-CO NO se redactan en este pack. Se producen por adaptacion ITC 2017 (traduccion doble + retrotraduccion + panel + piloto cognitivo) con permiso de los autores. Aqui se fija la estructura, el scoring, el rol en el producto, la microcopy autoral (hook, disclaimers) y las decisiones de implementacion.

---

## Seccion 0 — Portada y bloqueadores

| Campo | Valor |
|---|---|
| Instrumento | Ikigai-9 |
| Constructo | Ikigai-kan (sentimiento de que la vida vale la pena), 3 factores |
| Escala | Likert 5 puntos |
| Tiempo | ~3 min |
| Producto | Ikigai Premium (add-on al Paid) |
| ethical_flags | **emotional_distress** (dispara NFR-27 y NFR-28) |

| Bloqueador | Status | Razon |
|---|---|---|
| Items en ingles | **READY** | Publicos via Fido, Kotera y Asano (2020), open access |
| Items es-CO | **BLOCKED (adaptacion)** | No existe validacion es; requiere ITC 2017 + permiso. `[GAP-IKIGAI9-ITEMS-ES-CO]` |
| Anclas es-CO | **PARTIAL** | Escala de 5 puntos; verbatim es-CO a producir. `[GAP-IKIGAI9-ANCHORS-ES-CO]` |
| Dimensionalidad es-CO | **OPEN** | 3 factores (Japon/Alemania) vs. 1 (UK); confirmar con CFA local. `[GAP-IKIGAI9-CFA-LOCAL]` |
| Licencia comercial | **DEFERRED a fase 7** | Permiso de autores. No bloquea desarrollo. Plan-B: MLQ+WAMI+MEMS / K-1 |

---

## Seccion 1 — Plan de adquisicion del banco de items

`Hecho:` los 9 items en ingles estan publicados en Fido, Kotera y Asano (2020), open access. Son la base para la adaptacion es-CO; no se usan en ingles en el producto es.

**Pasos:**
- Paso 1: cargar los 9 items en ingles como `item_bank_ikigai9_en` con `source: 'Fido_Kotera_Asano_2020'` (referencia, no produccion es).
- Paso 2 (adaptacion ITC 2017, prerequisito de fase 5): permiso de los autores (Mejiro University); traduccion doble independiente EN/JA -> es-CO por dos psicologos bilingues; sintesis por comite; retrotraduccion ciega; panel de expertos (incluye experto en cultura japonesa); piloto cognitivo N=15-20 (regiones/estratos Colombia).
- Paso 3: cargar `item_bank_ikigai9_es_co_v1` solo despues del piloto. CFA local (`[GAP-IKIGAI9-CFA-LOCAL]`).

`No inventar:` este pack no transcribe items es-CO. Carry `[GAP-IKIGAI9-ITEMS-ES-CO]` P1.

---

## Seccion 2 — Estructura: 9 items -> 3 factores

| Factor (es-CO) | Items (en, Fido et al. 2020) | a verificar |
|---|---|---|
| Optimismo y emociones positivas hacia la vida | "I often feel that I am happy" · "I have room in my mind" · "My life is mentally rich and fulfilled" | asignacion exacta vs. fuente |
| Actitud activa hacia el futuro | "I would like to learn something new or start something" · "I am interested in many things" · "I would like to develop myself" | idem |
| Reconocimiento del significado de la propia existencia | "I feel that I am contributing to someone or to society" · "I think that my existence is needed by something or someone" · "I believe that I have some impact on someone" | idem |

`Nota dimensionalidad:` la estructura de 3 factores se sostiene en Japon (Imai et al., 2012) y Alemania (Mosing et al., 2024), pero no en UK (Fido et al., 2020: unifactorial). `Decision para es-CO:` reportar el **puntaje global de ikigai** como salida primaria (mas estable) y los 3 factores como lectura tematica sujeta a CFA local. Reversible segun datos.

---

## Seccion 3 — Scoring

**Entradas:** 9 `raw_value` (1-5).

**Calculo:**
1. Confirmar si hay items inversos (la familia suele no tenerlos en Ikigai-9; verificar en fuente). Si los hay, recodificar `(max+1) - raw`.
2. `factor_f = media de los 3 items de f` (si se reporta a nivel factor).
3. `ikigai_total = media de los 9 items` (salida primaria).
4. **POMP** (opcional para UI): `((ikigai_total - 1) / (5 - 1)) * 100`.
5. **Banda intra-individual** (no clinica, no normativa): exploracion / consolidacion / florecimiento, por tertiles intra-muestra o auto-comparacion temporal.

**Reglas:**
- Reporte **intra-individuo**; sin comparacion con norma japonesa ni entre personas (no hay baremo es-CO).
- Quality validator (Gate 1): patron unico, tiempo atipico (<90 s en 9 items), aquiescencia extrema (media >=4.5 o <=1.5).
- Trazabilidad: version de instrumento + version de traduccion + formula.

**Salidas:** `ikigai_total`, `ikigai_pomp`, `factor_scores[3]` (tematico), `band`, `quality_flags`.

---

## Seccion 4 — Anclas de respuesta es-CO (a producir/verificar)

`Escala de 5 puntos, registro-neutro` (politica de `RESPONSE_ANCHORS_es-CO_v1.0.md`). Anclas verbatim a confirmar contra la fuente validada / adaptacion; **candidatas**, no aprobadas:

| valor | ancla candidata es-CO |
|---|---|
| 5 | Me describe completamente |
| 4 | Me describe bastante |
| 3 | Me describe a medias |
| 2 | Me describe poco |
| 1 | No me describe |

Carry `[GAP-IKIGAI9-ANCHORS-ES-CO]` P1: fijar verbatim en la adaptacion + piloto cognitivo.

---

## Seccion 5 — Microcopy y onboarding (es-CO, copy autoral)

`Hecho:` Ikigai-9 lleva `emotional_distress` -> bloque NFR-27 pre-test + onboarding cultural. Va dentro de Ikigai Premium (pago, despues del Paid), no como primer instrumento.

**5.1 Onboarding cultural (obligatorio, antes del eje y del mapper):**
> Antes de empezar: el "ikigai" del que hablamos aqui es el concepto japones de sentir que la vida vale la pena en lo cotidiano (Kamiya, 1966; Mathews, 1996). No es el diagrama de los cuatro circulos que se hizo popular en internet: ese diagrama es una creacion occidental (Zuzunaga, 2011; Winn, 2014) y no representa el ikigai japones. Aqui usamos las dos cosas por separado y te decimos cual es cual.

**5.2 Hook del eje (Ikigai-9):**
> "Vamos a mirar que tan presente esta hoy, en tu dia a dia, esa sensacion de que tu vida vale la pena."

**5.3 Intro "Antes de comenzar" + bloque NFR-27 (emotional_distress):**
> Vas a leer 9 frases sobre como te sientes con tu vida. Indica que tanto te describe cada una. Toma unos {min} min.
>
> [Bloque NFR-27, separado] Este cuestionario explora tu sentido de proposito y bienestar. Es una herramienta educativa de autoconocimiento, no un diagnostico clinico ni una prueba de seleccion. No hay respuestas correctas ni incorrectas. Si en algun momento te sientes incomodo, puedes pausar o salir; al final encontraras recursos de apoyo.

**Titulo:** `Antes de comenzar`. **Boton:** `Comenzar` (acknowledge del disclaimer).

`Nota:` la microcopy es copy autoral (se puede crear). Los 9 items y las anclas no: se adaptan de fuente.

---

## Seccion 6 — Rol en el mapper Ikigai (relacion eje <-> Venn)

| Pieza | Contenido | Disclaimer |
|---|---|---|
| Eje (Ikigai-9) | Puntaje de ikigai-kan + 3 factores tematicos | "Esto mide el ikigai japones: tu sensacion de que la vida vale la pena" |
| Mapper de 4 bloques | Integra Paid: lo que amo (intereses/valores), en lo que soy bueno (fortalezas/personalidad), lo que el mundo necesita (sentido/O*NET), por lo que me pagan (O*NET/ocupaciones) | "Este mapa de 4 circulos es un marco occidental de proposito, no el ikigai japones" |
| Cierre | El mapa muestra coherencias y tensiones entre los 4 bloques; el eje aporta la profundidad cultural | "No es una respuesta unica de vida; es una exploracion" |

`No-negociable:` no correlacionar el puntaje de Ikigai-9 con el diagrama de Venn en copy/marketing. Mantener ambos separados y rotulados.

---

## Seccion 7 — Etica, NFR y compliance

- `ethical_flags = emotional_distress` -> NFR-27 (disclaimer pre/post) + NFR-28 (ruta de contencion).
- **NFR-28 (lineas Colombia)** al cierre y ante senal de malestar: Linea 106 (Bogota, apoyo emocional), Linea 123 (emergencia nacional), Linea 192 (salud mental). Sin lenguaje alarmista.
- Consentimiento granular del producto Ikigai (Ley 1581); precondicion para guardar respuestas.
- `usage_log` para auditoria de licencia (reporte a autores en fase 7).
- Audit log + cifrado (Gate 2).
- `Prohibido:` uso para seleccion/decisiones de empleo; etiquetado patologizante ("no tienes proposito"); reventa de perfiles.

---

## Seccion 8 — Licencia y plan-B (cierre fase 7)

| Item | Estado |
|---|---|
| Uso comercial | Permiso de los autores (Mejiro University); research-only por defecto |
| Items en ingles | Publicos (Fido et al., 2020, open access); verificar licencia CC del articulo |
| Adaptacion es-CO | Permiso para derivado comercial |
| Plan-B | (a) eje de proposito con MLQ + WAMI + MEMS del Paid; (b) K-1 (diferido). Ninguno equivalente exacto |
| Accion fase 7 | Solicitar permiso comercial; presupuestar; si falla, eje via plan-B (cambio de metadata del mapper) |

`Riesgo:` el plan-B no es un equivalente directo del ikigai-kan; documentar la perdida de fidelidad cultural si se activa.

---

## Seccion 9 — Piloto y prerequisitos de fase 5

`Prerequisito de la fase 5 (Ikigai Premium):` la adaptacion es-CO de Ikigai-9 debe estar lista antes de implementar el modulo.

1. Permiso de autores + adaptacion ITC 2017 (traduccion doble, retrotraduccion, panel, piloto cognitivo N=15-20).
2. Piloto cuantitativo es-CO (N>=200): CFA (3 factores vs. unifactorial), alpha/omega, validez convergente (MLQ/WAMI, SWLS).
3. Hasta tener CFA local: reportar puntaje global de ikigai; factores como lectura tematica con disclaimer.

---

## Seccion 10 — Gaps y referencias

**Gaps / carries:**
- `[GAP-IKIGAI9-ITEMS-ES-CO]` P1 — adaptacion formal es-CO + permiso.
- `[GAP-IKIGAI9-ANCHORS-ES-CO]` P1 — anclas es-CO verbatim.
- `[GAP-IKIGAI9-CFA-LOCAL]` P2 — dimensionalidad es-CO.
- `[GAP-IKIGAI9-LICENSE]` P2 (fase 7) — permiso comercial / plan-B.

**Referencias (APA 7):**

Imai, T., Osada, H., & Nishimura, Y. (2012). The reliability and validity of a new scale for measuring the concept of ikigai (Ikigai-9). *Nihon Koshu Eisei Zasshi / Japanese Journal of Public Health, 59*(7), 433-439.

Fido, D., Kotera, Y., & Asano, K. (2020). English translation and validation of the Ikigai-9 in a UK sample. *International Journal of Mental Health and Addiction, 18*(5), 1352-1359. https://doi.org/10.1007/s11469-019-00150-w

Mosing, M. A., Bjork, L., Buttkus, M., Ullen, F., & Wesseldijk, L. W. (2024). Translation and validation of the German version of the Ikigai-9. *Societies, 14*(3), 39. https://doi.org/10.3390/soc14030039

International Test Commission. (2017). *ITC guidelines for translating and adapting tests* (2nd ed.). https://www.intestcom.org

Congreso de la Republica de Colombia. (2012). *Ley 1581 de 2012* (proteccion de datos personales). https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981

---

*Fin del Implementation Acquisition Pack Ikigai-9 v1.0. Cierra `[GAP-PACK-Ikigai-9]` y deja explicitos los prerequisitos de adaptacion es-CO de la fase 5. No desplegar sin adaptacion formal es-CO + permiso. Consumir junto a `dossiers/31_Ikigai-9_Consolidado.md`.*
