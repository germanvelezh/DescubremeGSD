# Pedido a Cowork — bancos de ítems es-CO para el stack Paid (Fase 3 / 3A)

**Fecha:** 2026-07-30
**Origen:** ejecución parcial de la Fase 3 vía `/gsd-execute-phase 3`. PR #91.
**Estado de la fase:** 4 de 13 planes cerrados, 2 bloqueados con evidencia, 7 sin arrancar.
**Para:** Cowork (investigación psicométrica / adaptación cultural).

---

## 1. Resumen ejecutivo

La Fase 3 se detuvo en la wave 4 de 11. La causa no es técnica: **los implementation packs son planes de adquisición, no bancos de ítems.** Documentan dónde viven los enunciados, la licencia, el scoring y los baremos — pero el texto es-CO de los ítems es entregable de Cowork.

Claude Code no puede cerrar esa brecha: traducir o redactar ítems está prohibido por la política editorial anti-alucinación de la raíz y por la división de trabajo del `CLAUDE.md` del MVP (§6: "adaptación cultural y traducción de ítems" es columna Cowork).

Dos planes ya se bloquearon sobre esto (Ryff-PWB y VIA-IS-P-96), y 9 instrumentos más están detrás de la misma pregunta. **Este documento es la pregunta, instrumento por instrumento.**

`Lo que NO se pide:` estructura, scoring, dimensiones, baremos ni evidencia psicométrica. Eso ya está en los packs y es utilizable. Lo único que falta es el texto de los ítems en español, con su procedencia y su permiso.

---

## 2. Lo que sí quedó sembrado (no pedir nada)

**O\*NET-IP-SF · PERMA-Profiler · TwIVI · BFI-2-S · BFI-2-60.**

Cinco instrumentos vivos en el stack. El BFI-2-60 se sembró en esta ejecución (plan 03-04) y su reuso desde el BFI-2-S del Free funciona por `item_code`.

---

## 3. Pedido por instrumento

Prioridad: **P0** bloquea un plan ya escrito · **P1** lo bloqueará al llegar su wave · **P2** decisión previa a cualquier pedido.

### 3.1 Bloqueados y verificados en ejecución

| Instrumento | Plan | Prioridad | Qué falta exactamente |
|---|---|---|---|
| **Ryff-PWB** | 03-03 | **P0** | Banco es-CO. No existe en el corpus para **ninguna** de las dos formas (18 ni 29). El pack trae los 18 en inglés y solo 5 en español, que además son material de disparo NFR-28, no banco. Los 29 en español viven en un PDF externo (Díaz et al. 2006, Apéndice 1) que no está en el repo. |
| **VIA-IS-P-96** | 03-06 | **P0** | Banco en cualquier idioma. Los 96 enunciados son propiedad del VIA Institute; el pack marca licencia `BLOCKED` y **prohíbe el despliegue pre-licencia**. El corpus solo tiene 4 ejemplos explícitamente marcados como parafraseados. |

**Ryff-PWB — decisión previa de German, no research (P2).** Antes de pedir nada hay que fijar la forma: **18 o 29 ítems**. Es input del pedido, no consecuencia. El discriminador medido: la 29 tiene ω = .91 en muestra colombiana sobre esa forma exacta; **la 18 no tiene ningún ω publicado en español**. Y dos subescalas de la 29 (Autonomía .69, Dominio del entorno .60) no despejan el piso de 0.70 del PRD §11.1.

`Segundo hueco de Ryff, independiente del banco:` **`[GAP-RYFF-BAREMO-TOTAL-METRICA]`**. El total publicado no se puede identificar como métrica — se declara 29.50 (DE 3.87), pero la suma de las seis medias colombianas da 27.00 y ponderada por ítems 26.90. **Un baremo al que no se puede puntuar no es un baremo.** Corrobora: la guía oficial de Ryff rechaza cortes absolutos y prescribe cuartiles de la muestra propia. Esto no es research pendiente: es decisión de reportar el total descriptivamente, sin banda, hasta tener N propio.

**VIA-IS-P-96 — tres rutas, con costo (P2).**

1. Licenciar con VIA Institute: 4-8 semanas, **sin tarifa pública**. No cabe en 3A.
2. Swap a **IPIP-VIA-R** (dominio público) — pero no tiene adaptación al español en ningún país; exige un TRAPD completo de Cowork.
3. Diferir el constructo de fortalezas: el stack Paid pasa a 9 instrumentos.

`Lo más barato primero:` confirmar si Cowork tiene el banco fuera del corpus versionado. Si lo tiene, el bloqueo se cae y el plan 03-06 se re-ejecuta tal cual — la estructura, el scoring y las bandas **sí** están completos en el pack.

### 3.2 Pendientes de las waves no ejecutadas

Estado leído de los packs, **no verificado en ejecución** — cada uno necesita confirmación de Cowork.

| Instrumento | Plan | Prioridad | Estado del banco en el pack | Qué se pide |
|---|---|---|---|---|
| **MEMS** | 03-10 | — | **15 ítems en inglés Y en español, literales** (Marco et al. 2022, *Frontiers*, CC BY 4.0) | `Inferencia:` nada. Parece sembrable tal cual. **Confirmar** que la versión española de Marco et al. es la que se adopta. |
| **SWLS** | 03-08 | P1 | 5 ítems, libres de uso sin permiso desde 1985; varias columnas en español en el pack | Confirmar **cuál** adaptación es-CO se adopta y si el texto del pack es final |
| **MLQ** | 03-08 | P1 | 10 ítems en inglés, literales y abiertos (Steger 2006, Apéndice) | Adaptación es-CO seleccionada o producida. `Ojo:` la decisión macro de la raíz marca MLQ entre los que **requieren permiso** (junto a CPS/WAMI) |
| **WAMI** | 03-08 | P1 | 10 ítems **solo en inglés**; §1.1 titulada "disponibilidad… en inglés"; cero columnas en español | Adaptación es-CO completa (TRAPD). Mismo aviso de permiso que MLQ |
| **PVQ-RR** | 03-07 | P1 | 57 ítems publicados; adaptaciones al español en OSF/ORPC bajo **CC BY-NC-ND** | Dos cosas: permiso de uso **comercial** (la NC lo bloquea) y confirmación de que la ND permite usar la adaptación **sin modificar**. El pack solo reproduce ~8 ejemplos, no los 57 |
| **PANAS-S** | 03-09 | P1 | 20 ítems en inglés; nota explícita de copyright APA sobre Watson et al. 1988 | Adaptación es-CO + postura sobre el copyright APA. Circulación abierta de facto **no** equivale a dominio público |
| **BPNSFS** | 03-10 | P1 | 24 ítems en inglés (Manual CSDT, abierto) | El Manual §2.4 exige contactar a los autores **para uso comercial**. Se pide ese contacto + adaptación es-CO |
| **CFI-R** | 03-10 | P1 | 28 ítems en inglés (Apéndice Rottinghaus et al. 2017) | El pack dice literalmente que "la traducción al español es responsabilidad de DescubreMe y **debe ser autorizada por el titular**". Se piden ambas |
| **FSS-9** | 03-09 | **P1 alto** | `Hecho (pack §1.1):` los 9 ítems literales **no están reproducidos en ninguna fuente abierta verificable**. Paywall Human Kinetics + ToS de Mind Garden | Licencia escrita, o swap del constructo de flujo. **Es el mismo caso que VIA: sin licencia no hay ruta técnica** |

---

## 4. Formato de entrega pedido

Para que un banco entre a código sin nueva ida y vuelta, cada instrumento necesita:

1. **Tabla de ítems** con: `seq_no` · texto es-CO literal y final · dimensión/faceta · clave (directo/inverso).
2. **Procedencia por ítem**: de qué adaptación publicada sale, o declaración de que es traducción nueva con su método (TRAPD).
3. **Estado de permiso**: quién autorizó, cuándo, para qué uso (comercial / freemium), y dónde está el registro.
4. **Escala de respuesta** y sus anclas en es-CO.

`Nota:` el texto literal de los ítems va **a código de producción**, no a documentación — política editorial anti-alucinación de la raíz. La tabla de entrega es el vehículo, no el destino.

---

## 5. Lo que esto NO bloquea

Tres planes de la fase no dependen de qué instrumentos estén sembrados y se pueden ejecutar cuando se decida:

- **03-11** — la salvaguarda de atribución de narrativa (`narrative-attribution.ts` + el test de disyunción del keyspace). Solo sus filas de seed dependen del stack.
- **03-12** — reporte por instrumento. Funciona con lo que haya sembrado.
- **03-13** — noción de resultado vigente, retake e historial.

---

## 6. Regla que este cierre confirma

Los packs resuelven **"por qué"** y **"cómo puntuar"**. No resuelven **"qué le muestro al usuario"**. Un plan que dice "los ítems se transcriben, no se redactan" presupone una fuente de transcripción — y esa presuposición no se verificó al planear, se verificó al ejecutar, dos veces, a ~50 minutos cada una.

`Para el próximo plan de siembra:` verificar la existencia del banco es-CO **antes** de escribir el plan, no dentro de él.

---

*Fin del pedido. Versión 1.0 — 2026-07-30.*
