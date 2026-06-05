# Dossier Consolidado — PVQ-21 (Portrait Values Questionnaire, forma corta ESS) — v1.0

**Producto destino:** DescubreMe — B2C Free (instrumento de valores).
**Autor (Cowork):** [Rol: Investigador psicometrico senior]
**Version:** 1.0
**Fecha:** 2026-06-05
**Naturaleza:** dossier breve de evidencia ("por que"). El material operativo ("que codear") vive en `implementation_packs/PVQ-21_Implementation_Acquisition_Pack_v1.0_Consolidado.md`.
**Relacion con el stack:** complementa, no reemplaza, el dossier/pack de **PVQ-RR** (instrumento de valores del Paid/B2B). Free y Paid comparten el marco Schwartz a nivel de los 4 valores de orden superior (HOV).

---

## 1. Resumen ejecutivo

El PVQ-21 es la forma corta de 21 items del Portrait Values Questionnaire de Schwartz, desarrollada para la European Social Survey (ESS) como Human Values Scale. Mide los **10 valores basicos** de la teoria original de Schwartz (1992), que agregan a los **4 valores de orden superior** (Apertura al cambio, Autopromocion, Conservacion, Autotrascendencia). Se elige para el B2C Free por su brevedad (~4 min), su validez transcultural documentada y la existencia de adaptaciones al espanol. No mide los 19 valores refinados del PVQ-RR (eso es alcance del Paid). `Opinion profesional:` para un teaser de valores en el Free, el PVQ-21 es el mejor balance validez/brevedad disponible; su salida natural para "magia" es la jerarquia de valores de la persona (centrada, intra-individuo) y el mapa de los 4 HOV.

---

## 2. Ficha del instrumento

| Atributo | Detalle |
|---|---|
| Nombre | Portrait Values Questionnaire, forma 21 items (PVQ-21 / ESS Human Values Scale) |
| Autor | Schwartz, S. H. (forma ESS derivada del PVQ original) |
| Constructo | Valores humanos basicos (teoria de Schwartz 1992) |
| Estructura | 21 items -> 10 valores basicos -> 4 valores de orden superior (HOV) |
| Formato | Retrato verbal en tercera persona ("Es importante para el/ella...") con juicio de semejanza |
| Escala | 6 puntos: "Se parece mucho a mi" ... "No se parece nada a mi" (verbal, sin punto neutral) |
| Tiempo | ~4 minutos |
| Versiones por genero | Masculina / femenina (lenguas con genero); decision de variante en el pack |
| ethical_flags | Ninguno (no es afecto ni malestar; no dispara NFR-27 de distress) |

`Hecho:` la teoria original de Schwartz (1992) postula 10 valores en un continuo cuasi-circumplejo que agregan a 4 dimensiones de orden superior con dos tensiones bipolares: Apertura al cambio vs. Conservacion, y Autopromocion vs. Autotrascendencia.

---

## 3. Mapeo 10 valores basicos -> 4 HOV

| HOV (es-CO) | Valores basicos que agrega |
|---|---|
| Apertura al cambio | Autodireccion, Estimulacion, (Hedonismo) |
| Autopromocion | Logro, Poder, (Hedonismo) |
| Conservacion | Seguridad, Conformidad, Tradicion |
| Autotrascendencia | Universalismo, Benevolencia |

`Nota:` el Hedonismo es un valor frontera entre Apertura al cambio y Autopromocion; en la mayoria de soluciones ESS se agrupa con Apertura al cambio, a veces se reporta aparte. El pack fija la convencion a usar y la documenta. Esto es analogo (no identico) a la decision de valores frontera del PVQ-RR documentada en `implementation_packs/PVQ-RR_HOV_PARTITION_VALIDATION_v1.0.md`.

---

## 4. Evidencia psicometrica (resumen)

`Hecho:` el PVQ-21 es el instrumento de valores de la ESS, administrado en mas de 30 paises a lo largo de multiples rondas desde 2002, con amplia evidencia de estructura y uso comparado.

| Propiedad | Sintesis | Limitacion / nota |
|---|---|---|
| Validez de estructura | Reproduce el orden circular de los valores en numerosos paises (MDS / CFA con valores adyacentes) | La estructura fina de 10 valores es mas debil que en formas largas por pocos items por valor |
| Confiabilidad | Aceptable a nivel de los 4 HOV; **debil a nivel de valor individual** (2 items, en algunos 3) | Por diseno: priorizar lectura a nivel HOV y de jerarquia, no de valor aislado |
| Invarianza de medicion | Estudiada extensamente en ESS; suele sostenerse invarianza configural/metrica, no escalar entre paises | Prohibe comparar medias absolutas entre paises; el reporte de DescubreMe es intra-individuo (centrado) |
| Equivalencia es / LATAM | Adaptaciones al espanol disponibles (ESS espanol; Castro Solano y Nader, 2006, para PVQ-40/PVQ-21 en castellano rioplatense) | No hay adaptacion es-CO standalone publicada; requiere verificacion lexica + piloto cognitivo |

`Nota de validez y limites (no-negociable de reporte):` por la baja confiabilidad a nivel de valor individual, el reporte al usuario prioriza (a) la **jerarquia de valores** de la persona (que valora mas y menos, centrado MRAT) y (b) los **4 HOV** como agrupacion tematica. No se presentan puntajes de un valor aislado como medida precisa, ni se comparan personas entre si, ni se usan baremos poblacionales como si fueran normas absolutas.

---

## 5. Scoring (concepto; detalle en el pack)

1. **Centrado MRAT (within-person):** se resta a cada respuesta la media de las 21 respuestas de la persona, para corregir el estilo de respuesta (uso de escala). Recomendacion explicita de Schwartz para reportes de prioridades de valores.
2. **Puntaje por valor:** media de los items centrados de ese valor.
3. **Puntaje HOV:** media no ponderada de los valores centrados que componen el HOV (consistente con la regla del pack PVQ-RR para rollups).
4. **Salida teaser (Free):** jerarquia de valores de la persona (top y bottom) + mapa de los 4 HOV. Intra-individuo, ipsativo; no requiere baremo poblacional.

---

## 6. Licencia (preliminar; se cierra en fase 7)

| Aspecto | Estado preliminar |
|---|---|
| Titularidad | Schwartz (familia PVQ); items ESS de acceso publico |
| Uso comercial | Requiere permiso de Schwartz (igual que PVQ-RR). No es dominio publico estricto |
| Adaptacion / derivados | La adaptacion al espanol suele regir bajo NoDerivatives: no modificar lexicamente sin permiso |
| Plan-B | TwIVI (Ten-Item Values Inventory), aun mas corto; tambien familia Schwartz (permiso) |
| Atribucion | Citar a Schwartz y la fuente de adaptacion es |

`No-negociable (CLAUDE.md §12):` el desarrollo no se bloquea por esto; se construye con PVQ-21 y se marca licencia + ItemsEs (NoDerivatives) + plan-B TwIVI para la fase 7. `Riesgo (R-01 del PRD):` en valores el plan-B "abierto" es debil porque todas las formas Schwartz requieren permiso comercial; documentar esto como riesgo especifico de la fase 7.

---

## 7. Por que PVQ-21 (y no otras) para el Free

| Alternativa | Por que no para el Free |
|---|---|
| PVQ-RR (57) | Excluido del Free por duracion (12-15 min) y licencia/NoDerivatives; es el instrumento del Paid |
| Subconjunto de PVQ-RR | Prohibido: NoDerivatives impide acortar/modificar sin permiso |
| TwIVI (10) | Viable como plan-B; menor confiabilidad (1 item por valor); mejor solo a nivel HOV |
| PVQ-40 | Mas largo que PVQ-21 y con items double-barreled (limitacion conocida) |

---

## 8. Gaps y pendientes

- `[GAP-PVQ21-ITEMS-ES-CO]` extraer/verificar el wording es de los 21 items desde fuente validada (ESS espanol / Castro Solano y Nader 2006), sin inventar; decidir variante de genero.
- `[GAP-PVQ21-ANCHORS-ES-CO]` verificar las 6 anclas verbales es-CO contra fuente validada (analogo a `RESPONSE_ANCHORS_es-CO_v1.0.md`).
- Piloto cognitivo es-CO (N=6-8) de items y anclas antes de go-live.
- Confirmar convencion del Hedonismo (HOV) y documentarla.

---

## 9. Referencias (APA 7)

Schwartz, S. H. (1992). Universals in the content and structure of values: Theoretical advances and empirical tests in 20 countries. *Advances in Experimental Social Psychology, 25*, 1-65. https://doi.org/10.1016/S0065-2601(08)60281-6

Schwartz, S. H. (2003). A proposal for measuring value orientations across nations. In *Questionnaire Development Package of the European Social Survey* (chap. 7). European Social Survey. https://www.europeansocialsurvey.org

Schwartz, S. H., Cieciuch, J., Vecchione, M., Davidov, E., Fischer, R., Beierlein, C., ... Konty, M. (2012). Refining the theory of basic individual values. *Journal of Personality and Social Psychology, 103*(4), 663-688. https://doi.org/10.1037/a0029393

Castro Solano, A., & Nader, M. (2006). La evaluacion de los valores humanos con el Portrait Values Questionnaire de Schwartz. *Interdisciplinaria, 23*(2), 155-174. https://www.redalyc.org/articulo.oa?id=18023202

Cieciuch, J., & Davidov, E. (2012). A comparison of the invariance properties of the PVQ-40 and the PVQ-21 to measure human values across German and Polish samples. *Survey Research Methods, 6*(1), 37-48. https://doi.org/10.18148/srm/2012.v6i1.5091

---

*Fin del dossier PVQ-21 v1.0. Evidencia consolidada. El material operativo esta en el implementation pack. Actualizar al cerrar los gaps de items/anclas es-CO.*
