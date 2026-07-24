# BRIEF Cowork — Tratamiento visual de barras (bars) y circumplejo (ValueCircle) del reporte Free

**Para:** Cowork (UX Researcher / spec de experiencia)
**De:** Claude Code (arquitectura/implementación)
**Fecha:** 2026-07-23
**Origen:** hallazgos del deploy-smoke ADR-033 (`estado/SMOKE_ADR033_PERMA_CARE_RESULTADOS_v1.0.md`) + revisión pedida por German sobre dos capturas de las transiciones (BFI `/test/BFI-2-S/done` y TwIVI `/test/TwIVI/done`).
**Qué se pide:** dos decisiones de **spec de experiencia** (no código). Claude Code implementa después a partir de tu spec.

---

## Contexto de producto (para anclar la decisión)

DescubreMe es autoconocimiento, **no clínico ni diagnóstico**. El reporte Free devuelve un "primer mapa": personalidad (BFI-2-S), intereses (O*NET), valores (TwIVI), bienestar (PERMA). Diferenciadores: **rigor psicométrico transparente** + **experiencia clase mundial**.

Reglas éticas/de encuadre que YA rigen estos visuales (no cambiar):
- **Ipsativo:** todo es "dentro de tu propio perfil" (z intra-perfil), NO comparación normativa.
- **Sin percentiles** (no hay baremo Colombia validado; se declara explícito en el copy).
- **La banda (Bajo/Medio/Alto) es la señal primaria no-cromática.**
- **Sin rojo / sin "negativo = malo".**
- No determinista: nunca "tus valores son X" en absoluto; siempre "qué pesa más para ti".

---

## DECISIÓN 1 — Barras (BFI y PERMA): ¿qué debe comunicar la LONGITUD de la barra?

**Hecho (evidencia prod, perfil de prueba real):** hoy la longitud de la barra sale **siempre al 100%** en BFI y casi siempre en PERMA, sin importar la banda. Es un bug técnico de escala (se corregirá); la pregunta para Cowork es **qué debe significar la longitud** una vez corregida.

Datos reales del BFI de prueba (sumas de dominio, escala 6-30; media del perfil 20.2):

| Dimensión (label es-CO) | Suma | Banda (ipsativa) |
|---|---|---|
| Energía social (EXT) | 12 | Bajo |
| Cooperación (AGR) | 18 | Medio |
| Organización (CON) | 19 | Medio |
| Calma (NEG, banda invertida) | 30 | Bajo (NEG alto → Calma baja) |
| Curiosidad (OPN) | 22 | Medio |

**Tensión de diseño a resolver:** la BANDA es ipsativa (relativa a la media de ESTA persona). Si la BARRA fuera magnitud **absoluta** (posición en la escala 0-max del instrumento), barra y banda medirían cosas distintas: una persona con todos los dominios altos tendría barras largas pero bandas Medio/Bajo relativas a su propia media → contradicción visual barra-vs-banda.

**Opciones a especificar:**

| Opción | Qué comunica la barra | Pro | Contra |
|---|---|---|---|
| **A. Magnitud absoluta** | "cuánto marcaste" en la escala del instrumento | intuitiva | choca con la banda ipsativa en perfiles homogéneos |
| **B. Prioridad relativa intra-perfil** | misma señal que la banda (z/rank normalizado 0-100%) | coherente con "dentro de tu propio perfil"; barra y banda cuentan la misma historia | requiere decidir si es continuo o discreto |
| **C. Otra** | (Cowork propone) | | |

**Preguntas para Cowork:**
1. ¿La barra comunica **magnitud absoluta** o **prioridad relativa intra-perfil**?
2. Si es relativa (B): ¿la longitud mapea a la **banda** (3 niveles discretos, misma altura por nivel) o a un **continuo** (z/rank) con la banda como etiqueta? ¿Un continuo invita a comparar magnitudes que no queremos que comparen?
3. ¿Copy/leyenda que acompañe la barra para que se lea bien la longitud? (hoy: "ALTO significa que ese interés es de los más fuertes dentro de tu propio perfil… no mostramos percentiles").
4. ¿Aplica igual a BFI y PERMA, o PERMA necesita algo distinto (incluye N/Soledad = señales sensibles)?

**Constraint técnico (para que la spec sea construible):** la barra recibe por dimensión `{label, value, band}`. Se le puede alimentar cualquier magnitud derivada (banda→%, z→%, rank→%). NO hay percentiles poblacionales.

---

## DECISIÓN 2 — Circumplejo de valores (TwIVI): ¿cómo dibujar los HOV que quedan por debajo de la media?

**Hecho (evidencia prod, ver captura TwIVI):** el círculo dibuja 4 direcciones (HOV) en dos ejes bipolares: **Explorar** (apertura al cambio), **Aportar** (auto-trascendencia), **Conservar** (conservación), **Destacar** (auto-realce). Dibuja valores **centrados por la media de la persona** (centro = tu media): los sectores positivos se extienden, los ≤0 se dibujan como muñón corto en el centro.

Perfil de prueba (medias Schwartz reales AC4 BE4 CO2 HE6 PO3 SD6 SE3 ST6 TR2 UN4, media 4.0 → HOV centrados):

| HOV (label) | Centrado | Banda | Radio dibujado |
|---|---|---|---|
| Explorar | **+2.0** | Alto | punta larga |
| Aportar | 0.0 | Medio | muñón (colapsado) |
| Destacar | −0.5 | Bajo | muñón (colapsado) |
| Conservar | −1.67 | Bajo | muñón (colapsado) |

Resultado: el círculo se ve como **una aguja hacia Explorar** con las otras 3 colapsadas al centro.

**Problema estructural (Hecho):** el centrado ipsativo empuja ~la mitad de los HOV a ≤0 por construcción (la media es 0). Así, el circumplejo **casi siempre** mostrará 1-2 puntas y colapsará el resto; en un perfil de un dominante claro, es una aguja. Es fiel al dato pero se ve "vacío/roto" y no comunica un perfil de valores.

**Opciones a especificar:**

| Opción | Tratamiento | Pro | Contra |
|---|---|---|---|
| **A. Piso visible** | los sectores bajo-media reciben un radio pequeño-pero-visible (no colapsado) → siempre una forma de 4 puntas ("cometa" inclinada al dominante) | preserva el significado ipsativo (el más largo sigue pesando más); elimina la aguja | un sector bajo-media "presente" podría leerse como "también valorás esto fuerte" |
| **B. Rango relativo** | los 4 por rango/proporción, siempre forma completa | máxima legibilidad | pierde la pureza "tu media = 0" |
| **C. Aceptar la aguja** | cero cambio; apoyarse en labels + la frase compuesta | honesto, sin trabajo | pobre para un reveal "clase mundial" |
| **D. Otra metáfora** | (Cowork propone; p.ej. no-circumplejo para perfiles de un dominante) | | |

**Preguntas para Cowork:**
1. ¿El circumplejo debe **siempre** mostrar una forma de 4 direcciones, o es aceptable que colapse a aguja cuando hay un dominante?
2. Si piso visible (A): ¿cómo se distingue "por encima de tu media" de "por debajo" **sin rojo / sin negativo-como-malo**? (hoy: positivos con relleno accent, ≤0 con borde neutro). ¿El muñón visible mantiene esa distinción?
3. ¿La leyenda actual ("estas prioridades son relativas dentro de tu propio perfil… no se comparan con otras personas") basta, o hay que reforzar la lectura de un dominante claro?
4. **Ética:** ¿riesgo de que un usuario lea "Conservar bajo" como "no tenés valores de conservación" (determinismo/juicio)? ¿Copy que lo mitigue?

**Constraint técnico:** el visual recibe 4 sectores `{label, value(centrado, puede ser negativo), band}`. Se puede remapear el radio (piso visible, rank, etc.) sin tocar el scoring. Los 4 HOV y su orden de eje bipolar ya están correctos (fix #17). No cambiar: no-rojo, banda como señal primaria, tabla sr-only, "tu media = 0" como concepto.

---

## Entregable esperado de Cowork

Un decision doc corto **por decisión** (formato: contexto, opción elegida, por qué, copy/leyenda final es-CO si cambia, riesgos éticos, reversibilidad):
- **Barras:** semántica de la longitud (absoluta / ipsativa continua / discreta-por-banda) + copy de leyenda si cambia.
- **Círculo:** tratamiento de los sectores bajo-media + copy nuevo si aplica.
- Firma es-CO de cualquier texto nuevo (tuteo Colombia; evitar "vosotros/ordenador/coger").

**Lo que NO se necesita de Cowork:** código, fórmulas, valores de radio/px, `max` por instrumento. Eso lo deriva Claude Code de tu spec.

---

## Anclas (trazabilidad)

- Bug de barras: `app/(b2c)/reporte/[sessionId]/_components/BarsWithBands.tsx:40-43` (`ratioOf = value/(max ?? 5)`) + `lib/report/visual-dimensions.ts:63` (`projectBarsDimensions` no setea `max`) + `lib/report/assembler.ts:560`.
- Círculo: `app/(b2c)/reporte/[sessionId]/_components/ValueCircle.tsx:111-116` (radio: positivo escala 10→70, ≤0 = muñón 10).
- Spec vigente: `02-UI-SPEC.md` §6.1 (bars) y §6.2 (circumplex).
- Backlog: `[GAP-PERMA-BARS-VISUAL-PASS]` P1 (la decisión 1 lo cierra); la decisión 2 es nueva.
- Evidencia prod: `estado/SMOKE_ADR033_PERMA_CARE_RESULTADOS_v1.0.md` + snapshots BFI `21b0f79c` / TwIVI `96fe99d5`.
