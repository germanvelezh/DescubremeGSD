# Implementation Acquisition Pack v1.0 — TwIVI (Twenty-Item Values Inventory, 20 items)

**Producto destino:** DescubreMe — **B2C Free** (4º test del funnel, instrumento de valores). Instrumento como metadata/plugin (Supabase/PostgreSQL).
**Autor (Cowork):** [Rol: Investigador psicometrico senior + UX Writer + angulo compliance]
**Version:** 1.0
**Fecha:** 2026-07-01
**Dossier base:** no existe dossier TwIVI standalone. Este pack **hace las veces de dossier + pack** para TwIVI (evidencia + operacion), apoyandose en `dossiers/24_PVQ-40_Consolidado.md` (teoria Schwartz, misma familia) y `dossiers/30_PVQ-21_Consolidado.md`. La teoria de los 10 valores + 4 HOV se reutiliza; lo unico propio de TwIVI son sus 20 portraits.
**Resuelve:** `[GAP-TWIVI-ITEMS-ANCHORS-ES-CO]` (lado contenido). Cierra tambien `[GAP-MICROCOPY-VOSEO-TO-ES-CO]` para este test (registro tuteo/neutro; nada de voseo rioplatense).
**Idioma:** espanol neutro (metadatos/notas) / espanol Colombia (microcopy e items dirigidos al usuario).

> **Regla de oro (no inventar):** los 20 items y las 6 anclas se **extrajeron de la fuente oficial validada** (Sandy et al., 2017 / sitio oficial Gosling, UT-Austin), no se redactaron. La traduccion es-CO es una **adaptacion forward (ITC 2017)** marcada como *candidata a piloto cognitivo*, no wording aprobado en firme.
> **Anti-alucinacion editorial (politica de repo):** este pack **no reproduce los items literales**. Los 20 items es-CO (variantes M/F) viven solo en el artefacto de seed de handoff (`estado/TwIVI_items_es-CO_SEED_v1.0.sql`), destinado a `db/seeds/instruments/TwIVI/items.sql`.

---

## Seccion 0 — Portada y bloqueadores

| Campo | Valor |
|---|---|
| Instrumento | TwIVI — Twenty-Item Values Inventory (20 items) |
| Constructo | Valores basicos de Schwartz (1992): 10 valores -> 4 valores de orden superior (HOV) |
| Escala | 6 puntos verbales de semejanza, sin punto neutral (asimetrica: 2 polos de disimilitud, 4 de similitud) |
| Tiempo | ~3-4 min |
| Producto | B2C Free |
| Fuente items | Sandy, Gosling, Schwartz & Koelkebeck (2017); instrumento oficial en el sitio Gosling (UT-Austin) |
| Licencia | **Uso libre explicito** ("anyone can use it for any purpose, no need to ask permission") |
| sensitivity | `high` (convicciones — Ley 1581 Art. 5), no distress emocional |
| ethical_flags | `pretest_modal=false`, `contention_route=true`, `distress_detector=false` (ADR-023) |

| Bloqueador | Status | Razon |
|---|---|---|
| 20 items es-CO | **RESUELTO (candidato a piloto)** | Extraidos verbatim de la fuente oficial y traducidos es-CO (M/F). Viven en el seed de handoff. Licencia de uso libre -> pueden vivir en el seed. |
| 6 anclas verbales es-CO | **RESUELTO (candidato a piloto)** | Escala nativa confirmada (1 "not like me at all" ... 6 "very much like me"); anclas es-CO de semejanza (ver §5). |
| Mapeo item->valor->HOV | **RESUELTO** | Coding key oficial verbatim (ver §2). Coincide con `value_map`/`hov_map` ya sembrados. |
| Scoring MRAT | **RESUELTO (verificado)** | Coincide con lo implementado (`lib/scoring/mrat.ts` + fixture). Ver §3. |
| Variante de genero | **DECIDIDO** | Ramificado el/ella (decision German 2026-07-01). Requiere decision de schema (ver §4). |
| Licencia comercial | **SIN BLOQUEO** | Uso libre explicito; no requiere permiso; no entra a fase 7 (unico del stack de valores). Ver §8. |
| Baremo es-CO | **N/A para el reporte** | Reporte Free intra-persona (centrado MRAT), no requiere norma poblacional. |

`Cambio de estado vs el resto del stack de valores:` a diferencia de PVQ-21/PVQ-RR (CC BY-NC-ND, permiso pendiente fase 7), TwIVI **no tiene bloqueador de licencia** y **si** permite sembrar items traducidos.

---

## Seccion 1 — Fuente y adquisicion del banco de items

`Hecho:` los 20 items del TwIVI son de acceso publico en el sitio oficial del laboratorio Gosling (UT-Austin), con licencia de uso libre. El instrumento fue derivado del PVQ-40 (Schwartz, 2003): Sandy et al. (2017) seleccionaron, con dos muestras grandes (N derivacion = 38.049; N evaluacion = 29.143), los **2 portraits por valor** que mejor recapturan los patrones del PVQ-40.

**Fuentes primarias usadas (extraccion verbatim):**
1. Instrumento + instrucciones oficiales: *TwIVI & TIVI Administration and Scoring Instructions* (Gosling Lab, UT-Austin). Forma completa de 20 items, escala e instrucciones. Contiene el coding key.
2. Manuscrito: Sandy, C. J., Gosling, S. D., Schwartz, S. H., & Koelkebeck, T. (2017). *Journal of Personality Assessment, 99*(5), 545-555. DOI 10.1080/00223891.2016.1231115. Escala 6 puntos verbatim ("1 = not like me at all ... 6 = very much like me"), metodo de derivacion y confiabilidades.
3. Licencia (texto literal del sitio oficial): *"ANYONE CAN USE IT FOR ANY PURPOSE. NO NEED TO ASK ME FOR PERMISSION."*

**Extraccion y adaptacion (procedimiento):**
- Paso 1: extraccion verbatim de los 20 items en ingles desde el instrumento oficial (confirmado ademas contra el coding key del sitio y del manuscrito).
- Paso 2: traduccion forward es-CO (Colombia), registro neutro/tuteo, evitando rioplatense y peninsularismos ("vosotros", "ordenador", "coger"). Variantes masculina y femenina (ver §4).
- Paso 3 (pendiente, no bloqueante): back-translation + panel bilingue + piloto cognitivo es-CO (N=6-8) antes de go-live cuantitativo (ITC 2017). Hasta entonces, wording = **candidato**.

**Orden de presentacion (correccion importante):**
- `Hecho:` el orden oficial del TwIVI es 1..20, donde los items 1-10 son el primer portrait de cada valor (en el orden Conformidad, Tradicion, Benevolencia, Universalismo, Autodireccion, Estimulacion, Hedonismo, Logro, Poder, Seguridad) y los items 11-20 el segundo portrait de cada valor en el mismo orden. Los dos items de un mismo valor quedan a 10 posiciones de distancia (control de aquiescencia).
- `Correccion:` el seed placeholder actual usa otro orden (seq 1=SD, 2=AC, ...). El seed de handoff **adopta el orden oficial 1:CO .. 20:SE** (el "orden validado" que el propio comentario del placeholder pide fijar). No altera el scoring (media por valor); mejora trazabilidad y comparabilidad con la fuente.

`No inventar:` este pack no transcribe los 20 items. Viven en `estado/TwIVI_items_es-CO_SEED_v1.0.sql`.

---

## Seccion 2 — Mapeo item -> valor basico -> HOV

`Hecho:` coding key oficial del TwIVI (verbatim del sitio y del instrumento). 2 items por valor.

| Items (orden oficial) | Valor basico | Codigo | HOV | Codigo HOV |
|---|---|---|---|---|
| 1, 11 | Conformidad (Conformity) | CO | Conservacion | CSV |
| 2, 12 | Tradicion (Tradition) | TR | Conservacion | CSV |
| 3, 13 | Benevolencia (Benevolence) | BE | Autotrascendencia | STR |
| 4, 14 | Universalismo (Universalism) | UN | Autotrascendencia | STR |
| 5, 15 | Autodireccion (Self-Direction) | SD | Apertura al cambio | OCH |
| 6, 16 | Estimulacion (Stimulation) | ST | Apertura al cambio | OCH |
| 7, 17 | Hedonismo (Hedonism) | HE | Apertura al cambio (frontera) | OCH |
| 8, 18 | Logro (Achievement) | AC | Autopromocion | SEN |
| 9, 19 | Poder (Power) | PO | Autopromocion | SEN |
| 10, 20 | Seguridad (Security) | SE | Conservacion | CSV |

**Particion 10 -> 4 HOV (no solapada; coincide con el seed ya sembrado):**
- **Apertura al cambio (OCH):** SD, ST, HE
- **Autopromocion (SEN):** AC, PO
- **Conservacion (CSV):** SE, CO, TR
- **Autotrascendencia (STR):** BE, UN

`Nota Hedonismo:` se agrupa en Apertura al cambio (convencion canonica; frontera con Autopromocion). Decision reversible por metadata (`hov_map`), no por codigo. Coherente con dossier 24 §1.2 y con la particion del seed.

`Nota codigos HOV:` se usa **CSV** (no CON) para Conservacion, para no colisionar con el codigo de dominio `CON` (Conscientiousness) de BFI-2-S en la columna compartida `narrative_template.dimension`. Ya resuelto en el seed.

`Consistencia con el codigo (verificado):` el scorer sintetiza la clave de cada item como `<dimension><ordinal-por-sequence>`. Con el orden oficial: CO -> CO1(seq 1)/CO2(seq 11); TR -> TR1/TR2; ... SE -> SE1(seq 10)/SE2(seq 20). Esto coincide exactamente con `value_map` y con `scoring_rule` ya sembrados (`SD1/SD2 ... UN1/UN2`). Cambiar el orden de presentacion **no rompe** el mapeo (las claves se sintetizan por valor + ordinal, no por numero de item absoluto).

---

## Seccion 3 — Scoring (MRAT verificado contra lo implementado)

`Hecho (fuente oficial):` "There is no reverse scoring. For each value, take the average of the items." + control de estilo de respuesta por **mean centering** (restar a cada respuesta la media de las 20). Es el centrado MRAT (within-person).

**Entradas:** 20 `raw_value` (1-6) por usuario.

**Calculo (paso a paso):**
1. `raw_v` = media de los 2 items de cada valor `v` (10 valores). Escala [1,6], sin reverse.
2. `MRAT` = media de las **20** respuestas crudas (vector plano completo; NO media de las medias por valor).
3. `centered_v = raw_v - MRAT` (importancia relativa del valor en el sistema personal).
4. `hov_h` = **media** (no suma) de los `centered_v` que componen `h` (segun `hov_map`).
5. **Banda within-person:** signo/magnitud de `hov_h` frente al "0" de la persona (`bandFromMrat`), NO percentil poblacional (no hay baremo HOV).

**Verificacion contra el codigo (resultado: PASA):**
- `scoring_rule` (10 reglas `mean`, item_codes `<V>1/<V>2`, scale [1,6], `reverse_keyed=[]`) == procedimiento oficial. OK.
- `centering_strategy='mrat'` + `value_map`/`hov_map` == pasos 2-4. OK.
- `lib/scoring/mrat.ts::computeMratScores` + `bandFromMrat` == within-person, HOV por media, sin division por SD. OK.
- `tests/unit/scoring/twivi-mrat-fixture.test.ts`: all-equal -> todo HOV ≈ 0 -> todas las bandas MEDIO (QUAL-05). Consistente con el metodo oficial.

`Conclusion:` el MRAT ya implementado es correcto contra la fuente oficial. No requiere cambio de logica; requiere (a) items reales sembrados y (b) el wiring pendiente `[GAP-MRAT-METADATA-READ]` (leer `value_map`/`hov_map` desde `psychometric_status` en `score-session.ts`), que es tarea de Claude Code.

`Salvaguarda de calidad (Gate 1):` marcar patron unico (todo 6 / todo 1) y tiempo atipico; con varianza intra-persona nula el MRAT pierde sentido (todas las bandas colapsan a MEDIO).

---

## Seccion 4 — Variante de genero e items

`Hecho:` los portraits originales usan "S/he" / "his/her". El instrumento oficial recomienda *branching logic* al inicio para presentar el pronombre preferido (he, she, they).

`Decision (German 2026-07-01):` **ramificado el/ella** segun genero declarado. El seed de handoff entrega **ambos sets completos** (masculino y femenino), 20 items cada uno, en orden oficial.

**Implicacion de schema (para Claude Code / Arquitecto):** la tabla `item` (`db/schema/item.ts`) tiene un unico `stem` (text) y `uniqueIndex(instrument_version_id, sequence_number)`. Sembrar dos variantes por item exige una de estas rutas:

| Opcion | Como | Pros | Contras |
|---|---|---|---|
| **A. Sustitucion en render (recomendada)** | `stem` unico con token de pronombre (p. ej. `{gp}`), resuelto en runtime por genero declarado | Cero cambio de schema; 1 fila por item; el "branching" del instrumento oficial | Requiere logica de render + capturar genero; el token debe cubrir el/ella (y ella/o en adjetivos: creativo/a) |
| **B. Columna `gender_variant`** | Anadir `gender_variant` ('M'/'F'/'N') + `uniqueIndex(version, seq, gender_variant)`; sembrar 40 filas | Datos limpios y explicitos; facil auditoria | Migracion de schema + ajuste del loader de items |
| **C. `stem_f` adicional** | Anadir columna `stem_f`; el runner elige por genero | 1 fila por item; sin cambiar unique index | Columna extra; render debe elegir |

`Recomendacion:` **Opcion A** (menor friccion, coherente con el schema single-stem actual y con el "branching" del instrumento oficial), con **Opcion B** como alternativa si se prefieren datos por-fila. El seed de handoff trae ambos sets como datos etiquetados M/F para poder aplicar cualquiera de las tres.

`Captura de genero:` requiere un paso de onboarding que capture genero declarado (con opcion no-binaria -> servir variante neutra o "they"/neutro es-CO). Registrar `gender_variant` en metadata de la respuesta (trazabilidad). Considerar una **variante neutra es-CO** adicional (sin el/ella) para no-binario; el instrumento oficial la contempla ("they").

`Nota es-CO:` como los items son retratos en 3ª persona, el voseo/tuteo NO aplica a los stems (verbo en 3ª persona es neutro). El cierre de `[GAP-MICROCOPY-VOSEO-TO-ES-CO]` para este test aplica a **instrucciones y frase reveladora** (§6, §7), que van en tuteo/neutro Colombia.

---

## Seccion 5 — Anclas de respuesta es-CO (candidatas; verificar en piloto)

`Hecho (escala nativa, verbatim):` 6 puntos de semejanza, asimetrica, sin punto neutral:
`1 = not like me at all · 2 = not like me · 3 = a little like me · 4 = somewhat like me · 5 = like me · 6 = very much like me` (2 polos de disimilitud: 1-2; 4 de similitud: 3-6).

`Candidato es-CO` (registro-neutro, sin marca tu/usted; misma politica que `RESPONSE_ANCHORS_es-CO_v1.0.md`; base: dossier 24 §2.2 + pack PVQ-21 §5, que replican la escala de semejanza Schwartz en espanol):

| valor | ancla es-CO (candidata) | mapea a |
|---|---|---|
| 6 | Se parece mucho a mi | very much like me |
| 5 | Se parece a mi | like me |
| 4 | Se parece algo a mi | somewhat like me |
| 3 | Se parece poco a mi | a little like me |
| 2 | No se parece a mi | not like me |
| 1 | No se parece nada a mi | not like me at all |

- **Fidelidad:** conserva la asimetria (1-2 lado "no se parece"; 3-6 lado "se parece"). Punto 3 = similitud debil.
- **A verificar en piloto cognitivo:** que el punto 3 ("Se parece poco a mi") se lea como *similitud debil* (lado positivo) y no como disimilitud; si confunde, alternativa a testear: "Se parece un poco a mi".
- **Wiring (Claude Code):** reemplazar `TWIVI_PLACEHOLDER_ANCHORS_ES_CO` en `lib/questionnaire/response-scales.ts` (6 labels, orden value 6->1). Es cambio de datos, no de logica (variant `labeled-rows`, `ready:true` ya estan).

---

## Seccion 6 — Microcopy de intro (es-CO, copy autoral)

`Hecho:` TwIVI es `sensitivity=high` por **convicciones** (Ley 1581 Art. 5), no por distress emocional. Por diseno (ADR-023): **sin** modal NFR-27 y **sin** detector NFR-28; **si** conserva el link discreto de contencion en el footer + disclaimer post-test (el contenido puede evocar temas de religion/familia/poder).

**Hook (capa autoral, exemplar a pilotar):**
> "Lo que mas te importa guia tus decisiones, muchas veces sin que lo notes. Vamos a ponerlo en palabras."

**Intro "Antes de comenzar" (cuerpo base, sin bloque de distress):**
> Vas a leer descripciones breves de distintas personas. Para cada una, indica que tanto se parece a ti. Toma alrededor de {min} min. No hay respuestas correctas ni incorrectas: responde con honestidad, segun tu primera impresion.
>
> Es una herramienta educativa de autoconocimiento, no un diagnostico clinico.
>
> Puedes pausar y retomar cuando quieras, sin perder tu progreso.

**Titulo:** `Antes de comenzar`. **Boton:** `Comenzar`.

`Nota:` "que tanto se parece a ti" refleja el juicio de semejanza del formato portrait, sin alterar los items. Tuteo/neutro Colombia (cierra voseo para este test).

---

## Seccion 7 — Salida al usuario (reporte de valores es-CO)

Patron por capas (UX_EXPERIENCE_SPEC §8), version Free/teaser.

| Capa | Contenido |
|---|---|
| Visual primero | Circulo de los 4 HOV (ValueCircle) con la posicion relativa de la persona |
| Frase reveladora (mini-result) | Nombrar en cotidiano la **familia de valores** (HOV) que mas pesa hoy — NO un valor fino |
| "Que sugiere esto sobre vos" | Texto interpretativo por HOV x banda (ya sembrado; ver abajo) |
| Pincelada del Paid | "El perfil completo abre estas 4 familias en 19 valores mas finos y los cruza con tu personalidad e intereses" |
| Limite honesto | "Esto refleja tus prioridades de hoy; los valores se mueven con la vida. No es una etiqueta ni una prediccion." |

**"Que sugiere esto sobre vos" (reporte):** `Hecho:` los 12 textos HOV x banda (4 HOV x {BAJO, MEDIO, ALTO}) **ya estan sembrados** en `db/seeds/narrative-templates/TwIVI/seed.sql`, en tuteo es-CO, framing de prioridad relativa y sin claims por-valor. **Validados en este pack: adecuados** (no duplicar — CLAUDE.md §11). Solo dependen de datos reales (hoy colapsan por placeholders) y del `[GAP-NARRATIVE-DIMBAND-SCHEMA]` (migracion pendiente, tarea Claude Code).

**Frase reveladora (mini-result) — copy es-CO nivel HOV (nueva, tuteo/neutro, no-determinista):**

| Familia top (HOV) | Frase reveladora (candidata) |
|---|---|
| Apertura al cambio (OCH) | "Hoy, lo que mas te mueve es la apertura al cambio: la libertad de explorar, crear y elegir tu propio camino." |
| Autopromocion (SEN) | "Hoy, lo que mas te mueve es avanzar: lograr tus metas y que tu esfuerzo se note." |
| Conservacion (CSV) | "Hoy, lo que mas pesa en ti es la estabilidad: el orden, lo confiable y lo que ya conoces." |
| Autotrascendencia (STR) | "Hoy, lo que mas te mueve es cuidar mas alla de ti: las personas y las causas que te importan." |
| Sin ganador claro (perfil parejo) | "Hoy tus prioridades estan bastante equilibradas entre varias familias de valores." |

`Salvaguarda:` no presentar un valor aislado como medida precisa (TwIVI = 2 items/valor, confiabilidad por-valor limitada; dossier 24 §3.1). El foco es la **jerarquia de las 4 familias (HOV)**. Sin determinismo, sin comparacion entre personas.

`Nota teaser integrador:` las frases TwIVI de `db/seeds/integrator-rule/teaser/seed.sql` (`teaser_phrase_valores_alto/medio`) son **placeholder** y una usa **voseo** ("sentis"). Ademas nombran un valor fino (autonomia) en vez de la familia HOV. Recomendacion: reemplazar por copy nivel-HOV en tuteo (arriba) al ejecutar `[GAP-TEASER-CROSS-TEMPLATES-ES-CO]` (deliverable separado, Owner Cowork). No se edita aqui (fuera del alcance de este brief; el teaser cross es su propio gap).

---

## Seccion 8 — Licencia (diferenciador: sin bloqueo)

| Item | Estado |
|---|---|
| Tipo de licencia | **Uso libre explicito.** Texto oficial: *"anyone can use it for any purpose, no need to ask permission"* (Gosling Lab, UT-Austin) |
| Uso comercial (freemium) | **Permitido.** Sin permiso, sin costo |
| Adaptacion / traduccion es-CO | **Permitida** (no hay clausula NoDerivatives). Los items traducidos **pueden vivir en el seed** |
| Digitalizacion (web app) | Permitida |
| Atribucion | Recomendada (buena practica): Sandy, Gosling, Schwartz & Koelkebeck (2017) + Schwartz (1992, teoria) |
| Fase 7 (legal) | **No entra.** Ningun tramite de licencia bloquea el MVP1 por el eje de valores Free |

`Diferencia clave con el stack de valores:` PVQ-21/PVQ-40/PVQ-RR son CC BY-NC-ND (permiso comercial + NoDerivatives -> fase 7). TwIVI es la opcion **mas limpia** del stack de valores: 0 bloqueo, 0 permiso, items seedables. Esta es la razon principal de la decision D-GATE.1 (TwIVI como valores Free) y de descartar PVQ-40 como plan-B (dossier 24 recomienda TwIVI).

---

## Seccion 9 — Compliance y NFR

- **sensitivity=high por convicciones** (Ley 1581 Art. 5): auto-enforza RLS + `assertConsentActive` en el primer item. Consentimiento granular del producto Free como precondicion para guardar respuestas.
- **ethical_flags (ADR-023, desacoplados):** `pretest_modal=false` (no modal NFR-27; no es distress emocional), `contention_route=true` (link discreto de contencion en footer + disclaimer post-test; el contenido puede evocar religion/familia/poder), `distress_detector=false` (no NFR-28).
- **No seleccion / no clinico:** el reporte es de autoconocimiento; prohibido su uso para seleccion, ranking inter-personal o decisiones de alto impacto (T&C). No etiquetado politico-ideologico (Autotrascendencia/Conservacion correlacionan con orientacion politica en muestras occidentales; evitar lectura determinista).
- **Cifrado + audit log:** estandar del proyecto (TLS en transito, cifrado en reposo, derecho de eliminacion accesible).
- **Trazabilidad:** guardar respuestas crudas por item con timestamp, version de instrumento (TwIVI 1.0 es-CO), version de traduccion, `gender_variant` servido, MRAT individual, version del scoring engine.

---

## Seccion 10 — Ficha tecnica es-CO

- **Nombre:** TwIVI — Inventario de Valores de 20 items (Twenty-Item Values Inventory).
- **Que mide:** que familias de valores pesan mas para la persona — apertura al cambio, autopromocion, conservacion y autotrascendencia. Espejo de prioridades **relativas** propias, no comparacion con otras personas ni etiqueta fija.
- **Formato:** 20 retratos breves en 3ª persona; juicio de semejanza en 6 puntos; ~3-4 min.
- **Scoring:** media por valor (sin reverse) + centrado MRAT within-person + rollup a 4 HOV (media). Bandas within-person (no percentil poblacional).
- **Limites:** screener ultra-breve (2 items/valor) -> confiabilidad por-valor limitada; se interpreta a **nivel HOV (familia de valores)**, no por valor fino. Mide prioridades relativas, no puntajes absolutos comparables entre personas. No es diagnostico ni prediccion.
- **Estado LATAM:** **en validacion.** No hay validacion psicometrica colombiana publicada del TwIVI. Existen validaciones en portugues (Pereira et al., 2023) y frances (2022); la teoria Schwartz esta ampliamente validada en LATAM (dossier 24 §4). Wording es-CO = candidato a piloto cognitivo.
- **Confiabilidad (referencia):** TwIVI recaptura los patrones del PVQ-40 (Sandy et al., 2017); confiabilidades por-valor moderadas y heterogeneas (rango amplio; menor en Tradicion). Por eso el reporte no hace claims por-valor.

---

## Seccion 11 — Piloto, gaps y HANDOFF a Claude Code

**Piloto cognitivo es-CO (N=6-8):** comprension de los items (juicio de semejanza), de las 6 anclas (especialmente punto 3), de la variante de genero, y del concepto de "valores" sin tecnicismos. Verificar que la frase reveladora se sienta reveladora y no generica (anti-Barnum).

**Gaps / carries:**
- `[GAP-TWIVI-ITEMS-ANCHORS-ES-CO]` — **cerrado (lado contenido)** por este pack + el seed de handoff. Queda el go-live tras piloto.
- `[GAP-MRAT-METADATA-READ]` P1 (Owner Claude Code) — `score-session.ts` aun lee `{}`; wire a `psychometric_status.value_map/hov_map`.
- `[GAP-NARRATIVE-DIMBAND-SCHEMA]` P1 (Owner Claude Code) — migracion que haga `riasec_code` nullable + agregue `dimension`/`band` + extienda el CHECK de `slot` a `dimension_band`.
- `[GAP-TWIVI-GENDER-SCHEMA]` P1 (NUEVO; Owner Claude Code/Arquitecto) — elegir e implementar la ruta de variante de genero (§4, opcion A/B/C).
- `[GAP-TEASER-CROSS-TEMPLATES-ES-CO]` P1 (Owner Cowork) — reemplazar frases TwIVI del teaser (voseo/placeholder) por copy nivel-HOV; deliverable separado.

**Handoff a Claude Code (para hacer usable el test end-to-end):**
1. **Items:** aplicar `estado/TwIVI_items_es-CO_SEED_v1.0.sql` -> `db/seeds/instruments/TwIVI/items.sql` (borrar placeholders). Orden oficial 1:CO..20:SE. Elegir ruta de genero (§4) — el archivo trae sets M y F.
2. **Anclas:** reemplazar `TWIVI_PLACEHOLDER_ANCHORS_ES_CO` en `lib/questionnaire/response-scales.ts` por las 6 anclas de §5 (orden 6->1).
3. **Verificar MRAT** contra el coding key (§2/§3): correr `tests/unit/scoring/twivi-mrat-fixture.test.ts`; confirmar `value_map`/`hov_map` sin drift (siguen validos con el orden oficial).
4. **Circumplex:** confirmar `ValueCircle` con datos reales (validar si el solape de labels era artefacto de datos planos —placeholders, todo MEDIO— o bug del componente).
5. **Wiring pendiente:** `[GAP-MRAT-METADATA-READ]` + `[GAP-NARRATIVE-DIMBAND-SCHEMA]` (arriba).
6. **Teaser:** frase reveladora nivel-HOV (§7) al ejecutar el gap del teaser.

**Correcciones documentales realizadas (Cowork):**
- `PRD_MAESTRO.md` §8.2 (linea ~246): plan-B de valores **PVQ-40 -> TwIVI (uso libre)**; y §8.1 (linea ~229): valores Free **PVQ-21 -> TwIVI** (coherencia con D-GATE.1; aprobado por German).

**Observacion (no modificada — fuera de lo aprobado):** el comentario de cabecera de `db/seeds/narrative-templates/TwIVI/seed.sql` (linea 6) menciona `OCH/SEN/CON/STR`; el codigo real usa `CSV`. Es solo comentario (no afecta datos). Sugerencia: corregir `CON`->`CSV` en ese comentario cuando se toque el archivo.

---

## Referencias (APA 7)

Sandy, C. J., Gosling, S. D., Schwartz, S. H., & Koelkebeck, T. (2017). The development and validation of brief and ultra-brief measures of values. *Journal of Personality Assessment, 99*(5), 545-555. https://doi.org/10.1080/00223891.2016.1231115

Gosling Lab (s.f.). *Two short measures of values (TIVI and TwIVI)* [instrumento e instrucciones de administracion y puntuacion]. University of Texas at Austin. https://gosling.psy.utexas.edu/two-short-measures-of-values-tivi-and-twivi/

Schwartz, S. H. (1992). Universals in the content and structure of values: Theoretical advances and empirical tests in 20 countries. *Advances in Experimental Social Psychology, 25*, 1-65. https://doi.org/10.1016/S0065-2601(08)60281-6

Schwartz, S. H. (2003). A proposal for measuring value orientations across nations. In *Questionnaire development report of the European Social Survey* (chap. 7, pp. 259-319). European Social Survey.

Schwartz, S. (2004). Evaluating the structure of human values with confirmatory factor analysis. *Journal of Research in Personality, 38*(3), 230-255. https://doi.org/10.1016/S0092-6566(03)00069-2

Pereira, H., et al. (2023). The Twenty Item Values Inventory (TwIVI) in Portuguese adults: Factorial structure, internal consistency, and criterion-related validity. *Journal of Personality Assessment, 105*(1). https://doi.org/10.1080/00223891.2022.2048844

---

*Fin del Implementation Acquisition Pack TwIVI v1.0. Cierra el lado contenido de `[GAP-TWIVI-ITEMS-ANCHORS-ES-CO]`; los items literales viven en `estado/TwIVI_items_es-CO_SEED_v1.0.sql`. Consumir junto a `dossiers/24_PVQ-40_Consolidado.md` (teoria Schwartz) y `implementation_packs/PVQ-21_..._Consolidado.md` (misma familia). TwIVI es la opcion de valores sin bloqueo de licencia del stack.*
