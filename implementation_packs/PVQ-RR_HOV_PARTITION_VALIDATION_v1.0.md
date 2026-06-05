# PVQ-RR — Validacion de la particion HOV (addendum al pack §3.0.5)

**Archivo:** `implementation_packs/PVQ-RR_HOV_PARTITION_VALIDATION_v1.0.md`
**Version:** v1.0 — 2026-05-21
**Autor:** Cowork (Rol: Investigador psicometrico senior)
**Tipo:** Addendum de investigacion + validacion bibliografica + recomendacion de accion.
**Documento base:** `implementation_packs/PVQ-RR_Implementation_Acquisition_Pack_v1.0_Consolidado.md` §3.0.5.
**Carry que cierra:** `[GAP-HOV-ROLLUP-PVQRR]` P2 (DD-91 H2). Carry pre-Planning S10 documentado en DD-90 §Composicion.
**Estatus:** este addendum **supersede** la tabla de particion del pack §3.0.5 en lo relativo a Face (FAC). El pack §3.0.5 NO se edita; rige esta correccion.

---

## 1. Resumen ejecutivo

El texto principal de Schwartz y Cieciuch (2022, *Assessment*) resuelve de forma explicita y publicada la asignacion de los tres valores frontera del PVQ-RR. Los autores correlacionaron cada valor frontera (Face, Hedonism, Humility) con sus dos valores de orden superior (HOV) vecinos en los 49 grupos culturales (N=53.472) y lo asignaron al HOV con el que correlaciono mas alto en la mayoria de grupos. Resultado canonico: **Face -> Conservacion, Hedonism -> Apertura al cambio, Humility -> Autotrascendencia**. Esto se confirma en la composicion literal de los modelos de medida CFA (Tabla 3) y de invarianza MGCFA (Tabla 4) del articulo. La particion del pack §3.0.5 es **correcta para HE y HUM, pero incorrecta para FAC**: el pack lo coloca en Autopromocion (Self-enhancement); el canon empirico lo coloca en Conservacion. La ambiguedad declarada en el pack §3.0.5 (`[Verificar — composicion exacta de HOV con valores frontera]`) queda **resuelta**: no es estructuralmente irresoluble; existe decision empirica oficial de los autores del instrumento.

---

## 2. Pregunta de investigacion y metodo

**Pregunta:** ¿A que HOV se contabilizan HE, FAC y HUM en el rollup de los 4 valores de orden superior, dado que son valores frontera en el continuo cuasi-circumplejo?

**Metodo de busqueda:**
- Fuente primaria: Schwartz y Cieciuch (2022), *Assessment*, 29(5), 1005-1019, DOI 10.1177/1073191121998760. Texto completo open access via PMC9131418 (CC BY-NC 4.0).
- Verificacion cruzada de la teoria refinada: Schwartz et al. (2012), *JPSP*; Schwartz (2017), teoria refinada.
- Triangulacion con el pack PVQ-RR v1.0 §3.0.5, §3.1, §4.

**Nota sobre la "tabla de cargas factoriales" solicitada en el briefing.** El estudio Schwartz y Cieciuch (2022) **no** modela los 4 HOV como factores latentes de segundo orden; valida la teoria refinada via CFA del modelo de 19 valores (un modelo separado por cada conjunto HOV de valores adyacentes) y MDS confirmatorio del continuo circular. Por tanto **no existe** una tabla de cargas factoriales HE/FAC/HUM sobre 4 HOV en el sentido literal del briefing. Sin embargo, existe evidencia mas directamente decisoria: una **regla de asignacion empirica** (correlacion de cada valor frontera con sus dos HOV vecinos en 49 grupos) ejecutada por los autores, con metodo y resultado publicados en el cuerpo del articulo. Esa evidencia es la base de esta recomendacion.

---

## 3. Evidencia

### 3.1 Decision empirica de asignacion (Schwartz y Cieciuch, 2022)

`Hecho.` Cita literal del articulo (Results, "Measurement Models Within Groups: CFA"):

> "Three of the narrowly defined values are located on the border between two higher order values in the value circle — face, hedonism, and humility. Because we planned to run the measurement models using the higher order values, we needed to assign these three values to one higher order value. For this purpose, we correlated each of the three values with its two neighboring higher order values in each of the 49 cultural groups. We then assigned the value to the higher order value with which it correlated more highly in the majority of cultural groups: this led to assigning **face to conservation, hedonism to openness to change, and humility to self-transcendence**." (Schwartz y Cieciuch, 2022, p. 1009)

Las correlaciones grupo-por-grupo que sustentan la decision estan en la Tabla S4 del supplement online.

### 3.2 Evidencia frontera por valor

| Valor frontera | HOV vecinos en el circulo | Asignacion canonica S&C 2022 | vs pack §3.0.5 |
|---|---|---|---|
| Hedonism (HE) | Apertura al cambio <-> Autopromocion | **Apertura al cambio** | Coincide |
| Face (FAC) | Autopromocion <-> Conservacion | **Conservacion** | **Discrepa** (pack: Autopromocion) |
| Humility (HUM) | Conservacion <-> Autotrascendencia | **Autotrascendencia** | Coincide |

### 3.3 Composicion HOV en los modelos de medida del articulo

`Hecho.` Composicion literal usada en los modelos CFA (Tabla 3) y MGCFA de invarianza (Tabla 4):

| HOV | Valores que componen el modelo de medida | n | Contiene valor frontera |
|---|---|---|---|
| Self-transcendence | UNN, UNC, UNT, BEC, BED, HUM | 6 | HUM |
| Openness to change | SDA, SDT, ST, HE | 4 | HE |
| Conservation | SEP, SES, COI, COR, TR, FAC | 6 | FAC |
| Self-enhancement | AC, POD, POR | 3 | ninguno |

### 3.4 Validez estructural de la solucion de 4 HOV

`Hecho.` Confiabilidad (Cronbach alpha): los 4 HOV alcanzaron alpha > .70 en **los 49 grupos sin excepcion** (M=.84, SD=.03). En la muestra Colombia (N=410), Tabla 6 reporta "All 4" HOV con alpha > .70.

`Hecho.` Invarianza de medicion (MGCFA, 49 grupos, Tabla 4): invarianza configural y metrica establecida para Self-transcendence, Openness to change y Conservation. Self-enhancement la alcanza tras anadir dos errores correlacionados (ac1-ac2, por1-por2). La **invarianza escalar no se sostiene en ningun HOV**.

`Hecho.` Ajuste CFA del modelo de medida por HOV (Tabla 3, % de 49 grupos con ajuste aceptable): Self-transcendence 98-100%; Openness to change 88-90%; Conservation 84-96%; Self-enhancement 45-78% sin modificaciones, 100% con modificaciones.

`Hecho.` MDS confirmatorio (Figura 2): el orden teorizado de los 19 valores alrededor del circulo se reprodujo sin inversiones; "humility, face, and hedonism are located on the borders between higher order values".

**Nota de interpretacion (psicometrica, contexto LATAM).** La ausencia de invarianza escalar prohibe comparar **medias absolutas entre paises**; no afecta el reporte de DescubreMe, que es descriptivo e intra-individuo (score centrado MRAT por persona, no comparacion inter-pais). La invarianza metrica establecida si habilita comparar hierarchies y correlatos. Para Colombia, la evidencia de confiabilidad de los 4 HOV es solida (alpha > .70).

---

## 4. Recomendacion final

**Recomendacion: B — reasignar segun la correlacion dominante del estudio empirico.**

Concretamente: **reasignar FAC de Autopromocion a Conservacion; confirmar HE en Apertura al cambio y HUM en Autotrascendencia.**

### Justificacion

- La opcion **B** se sustenta en la decision empirica publicada por los propios autores del instrumento (Schwartz y Cieciuch, 2022, p. 1009), basada en correlaciones de cada valor frontera con sus HOV vecinos en 49 grupos culturales. Es el estandar canonico del PVQ-RR.
- Se descarta **A** (mantener pack §3.0.5): ubica FAC en Autopromocion, lo cual contradice la asignacion canonica.
- Se descarta **C** (split / dual assignment con disclaimer): innecesario. Los autores realizaron una asignacion **unica y limpia** de los tres valores frontera; no recomiendan dual assignment para el rollup. Una particion no solapada es ademas requisito del modelo de datos del plugin (cada refinado en exactamente un HOV).
- Se descarta **D** (ambiguedad irresoluble): la evidencia existe, es publica y es inequivoca. No aplica `[GAP-INACCESIBLE]`.

### Referencia (APA 7)

Schwartz, S. H., y Cieciuch, J. (2022). Measuring the refined theory of individual values in 49 cultural groups: Psychometrics of the Revised Portrait Value Questionnaire. *Assessment, 29*(5), 1005-1019. https://doi.org/10.1177/1073191121998760

Schwartz, S. H., Cieciuch, J., Vecchione, M., Davidov, E., Fischer, R., Beierlein, C., Ramos, A., Verkasalo, M., Lonnqvist, J.-E., Demirutku, K., Dirilen-Gumus, O., y Konty, M. (2012). Refining the theory of basic individual values. *Journal of Personality and Social Psychology, 103*(4), 663-688. https://doi.org/10.1037/a0029393

---

## 5. Particion final canonica para seedear S11+

Esta tabla **supersede** la tabla del pack §3.0.5. Es la particion a usar en la extension del plugin PVQ-RR HOV-aware (S11+).

| HOV (es-CO) | HOV (en) | Valores refinados que agrega | n |
|---|---|---|---|
| Apertura al cambio | Openness to change | SDT, SDA, ST, HE | 4 |
| Autopromocion | Self-enhancement | AC, POD, POR | 3 |
| Conservacion | Conservation | SEP, SES, TR, COR, COI, FAC | 6 |
| Autotrascendencia | Self-transcendence | UNC, UNN, UNT, BEC, BED, HUM | 6 |

Total: 19 valores refinados, particion no solapada (cada refinado en exactamente un HOV).

**Diff vs pack §3.0.5:**
- Autopromocion: `AC, POD, POR, FAC` (n=4) -> `AC, POD, POR` (n=3). FAC removido.
- Conservacion: `SEP, SES, TR, COR, COI` (n=5) -> `SEP, SES, TR, COR, COI, FAC` (n=6). FAC anadido.
- Apertura al cambio: sin cambio (`SDT, SDA, ST, HE`, n=4).
- Autotrascendencia: sin cambio (`UNC, UNN, UNT, BEC, BED, HUM`, n=6).

**Implicacion para el calculo del rollup.** La asimetria de tamano (n=3 a n=6) **refuerza** la decision del pack §3.0.1: el rollup HOV se calcula como **media no ponderada** de los valores refinados centrados que lo componen, no como suma. Sumar haria incomparables HOV con distinto numero de valores. La formula del pack §3.0.5 / §3.0.1 se mantiene; solo cambia el conjunto `V_h` de Autopromocion y Conservacion.

`hovMap` corregido para el seed (referencia para CC, ver pack §3.0.4):

```
hovMap = {
  "OPENNESS":         ["SDT", "SDA", "ST", "HE"],
  "SELF_ENHANCEMENT": ["AC", "POD", "POR"],
  "CONSERVATION":     ["SEP", "SES", "TR", "COR", "COI", "FAC"],
  "SELF_TRANSCENDENCE": ["UNC", "UNN", "UNT", "BEC", "BED", "HUM"]
}
```

---

## 6. Caveats

### 6.1 Caveat de compliance — HOV como organizacion tematica, no dimension normada

Se mantiene la advertencia psicometrica del pack §3.0.5 y §3.0.6. El rollup HOV es **organizacion tematica** para la UI, no una dimension medida con baremo. La unica tabla normativa publicada (Schwartz y Cieciuch, 2022, Tabla 5) reporta percentiles 25/50/75 **a nivel de los 19 valores refinados**, no a nivel HOV. No existen percentiles HOV. En consecuencia:

- El nivel primario de reporte e interpretacion al usuario es el de los **19 valores refinados**.
- Los scores HOV centrados sirven para agrupar tematicamente la lectura del reporte; **no** se aplica banding por percentil ni se comparan HOV entre si como escalas normadas.
- Mantener el triple disclaimer empirico (pack §3.0.5 advertencia + §3.0.6) en la seccion UI `<ThematicGrouping>`.

Matiz favorable: con alpha > .70 en 49/49 grupos e invarianza metrica establecida, el rollup HOV es psicometricamente defendible **como agrupacion tematica** (no es un constructo arbitrario). Lo que sigue prohibido es presentarlo como puntaje normado.

### 6.2 Caveat de verificacion

- La asignacion de los valores frontera es, en palabras de los autores, una decision de modelado ("we needed to assign these three values to one higher order value"), pero es la decision empirica **oficial** de los autores del instrumento, basada en datos de 49 grupos, y constituye el estandar canonico del PVQ-RR. Para DescubreMe es la particion a seedear.
- Las correlaciones grupo-por-grupo de la Tabla S4 del supplement online **no se extrajeron** en esta sesion (el material suplementario SAGE/OSF no se descargo). No es necesario para la recomendacion: el texto principal publica el metodo y el resultado de forma inequivoca, y las Tablas 3 y 4 confirman la composicion. **No aplica `[GAP-INACCESIBLE]`.**
- Verificacion cruzada de implementacion sugerida para CC: el paquete R `persval` (CRAN) implementa scoring de valores Schwartz y puede usarse como oraculo de contraste del rollup.

---

## 7. Impacto downstream

### 7.1 Contradiccion interna del pack resuelta

El pack PVQ-RR v1.0 era internamente inconsistente sobre FAC:
- §3.0.5 (tabla de particion): FAC -> Autopromocion.
- §4 (linea "Mapeo a HOV"): listaba FAC en dos HOV — "Self-enhancement (+ FAC modificado)" y "Conservation (+ FAC)".

Este addendum resuelve la inconsistencia a favor de **FAC -> Conservacion** (canon S&C 2022). El pack §3.0.5 no se edita; rige este addendum.

### 7.2 Textos de interpretacion §5.A (es-CO)

Los 12 textos HOV del pack §5.A (4 HOV x 3 bandas) se redactaron asumiendo FAC en Autopromocion. La reasignacion cambia que valores alimentan los scores rollup de **Autopromocion** y **Conservacion**. Accion sugerida: anadir item P2 al BACKLOG con flag `[GAP-PACK-PVQRR]` para revision de los textos §5.A de esos dos HOV. Alcance probablemente menor (las descripciones HOV son conceptuales y de alto nivel), pero debe verificarse antes de exponer el rollup en la UI.

### 7.3 Implementacion CC (S11+)

Recomendacion entregada: tipo B. Segun el flujo del briefing, CC implementa `[GAP-HOV-ROLLUP-PVQRR]` P2: extension de `lib/plugins/pvq-rr-report.ts` con rollup HOV usando el `hovMap` corregido de §5 de este addendum, mas tests de integracion y seccion UI `<ThematicGrouping>` con disclaimer empirico. La diferencia operativa frente al pack §3.0.5 es minima: solo cambia el conjunto de valores de dos HOV; la formula de rollup (media no ponderada, pack §3.0.1) no cambia.

---

## 8. Fuentes

- Schwartz, S. H., y Cieciuch, J. (2022). Measuring the refined theory of individual values in 49 cultural groups: Psychometrics of the Revised Portrait Value Questionnaire. *Assessment, 29*(5), 1005-1019. https://doi.org/10.1177/1073191121998760 — texto completo open access: https://pmc.ncbi.nlm.nih.gov/articles/PMC9131418/
- Schwartz, S. H., et al. (2012). Refining the theory of basic individual values. *Journal of Personality and Social Psychology, 103*(4), 663-688. https://doi.org/10.1037/a0029393
- Repositorio OSF del estudio (versiones linguisticas, scoring instructions, supplement): https://osf.io/w9as3/
- `implementation_packs/PVQ-RR_Implementation_Acquisition_Pack_v1.0_Consolidado.md` §3.0.1, §3.0.4, §3.0.5, §3.0.6, §3.1, §4.

---

*Fin del addendum. v1.0 — 2026-05-21. Cowork, Rol Investigador psicometrico senior. Cierra el carry `[GAP-HOV-ROLLUP-PVQRR]` con recomendacion B.*
