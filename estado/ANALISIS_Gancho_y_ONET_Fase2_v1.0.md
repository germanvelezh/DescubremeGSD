# Análisis — Gancho del Free y recomendador O*NET (Fase 2)

**Producto:** DescubreMe (MVP).
**Owner:** German Velez Hurtado.
**Rol desde el que se responde:** [Estratega de producto + Investigador psicométrico + Arquitecto].
**Fecha:** 2026-06-25.
**Estado:** Para decisión del owner.
**Alcance:** Este documento NO modifica `PRD_MAESTRO.md`, `ROADMAP.md` ni el código. Es insumo de decisión + un prompt listo para Claude Code. Si apruebas, el siguiente paso es registrar un ADR en `estado/DECISIONS_LOG.md` y abrir los ítems en `estado/BACKLOG.md`.

---

## 1. Resumen ejecutivo

- El problema que ves ("profesiones de bajo nivel, no ajustadas") es real y el código confirma la causa: el recomendador filtra ocupaciones **solo por intereses (RIASEC)** e **ignora el nivel de preparación (Job Zone)**, que es justamente el mecanismo con el que O*NET ajusta por educación y experiencia. La columna existe en la base de datos, está sembrada, y nunca se usa.
- O*NET mide **intereses, no nivel**. Por diseño no incorpora educación, edad ni sexo al puntaje. El "nivel" se resuelve en un paso aparte (selección de Job Zone). Tu implementación se saltó ese paso.
- Tu instinto está medio bien y medio mal: **educación y experiencia SÍ** deben afinar (vía Job Zone); **sexo y edad NO** deben usarse para recomendar ocupaciones (sesgo de estereotipo, choca con tu principio 6 de no determinismo y con riesgo ético-legal).
- La **arquitectura de 5 capas es sólida**. Lo que está mal compuesto es el **contenido del gancho** (el primer test), no el orden de las capas.
- Recomendación corta: liderar el Free con **personalidad (BFI-2-S)** como gancho de identidad, capturar Job Zone antes de revelar ocupaciones, y mostrar la lista ocupacional ya filtrada dentro del teaser integrado. Detalle y alternativas abajo; tú decides.

---

## 2. Qué encontré en el código (Hecho)

| Tema | Estado real en el código |
|---|---|
| Orden del Free | 4 tests en orden fijo: **1º O*NET IP-SF → 2º BFI-2-S → 3º TwIVI (valores) → 4º PERMA-Profiler**. El orden es data (`db/seeds/product-stack/free/seed.sql`, campo `product_stack.order`), no código. Cambiarlo es metadata. |
| Demografía capturada | Solo **email, fecha de nacimiento (edad), país, consentimiento** (`app/(auth)/signup/actions.ts`). NO hay sexo, NO nivel educativo, NO años de experiencia, NO historia ocupacional. |
| Recomendador de ocupaciones | `lib/report/occupation-selector.ts` filtra **solo por coincidencia de substring RIASEC** (¿el `riasec_code` de la ocupación contiene alguna de las 3 letras top?). El campo `education_level` (= Job Zone 1-5) se selecciona y se devuelve, pero **nunca filtra ni ordena**. |
| Dataset ocupacional | Solo **96 ocupaciones** (`db/seeds/occupations/LATAM/seed.sql`), 16 por dimensión, con Job Zone mezclado (ej. `Carpintero` Zona 2 junto a `Ingeniero civil` Zona 4). El parámetro `countryCode` se recibe pero no se usa. |
| Discrepancia doc vs. código | `PRD_MAESTRO.md` §8 define valores en el Free como **PVQ-21**; el código siembra **TwIVI**. Hay que conciliar (no lo cambies a ciegas; es decisión de owner/investigador). |
| Lo que SÍ está bien | Motor plugin/metadata, scoring RIASEC (suma por dimensión), bandas ipsativas (`lib/scoring/ipsative.ts`) y cómputo top-3 (`lib/riasec/top3.ts`) están correctos. La deuda es acotada, no estructural. |

---

## 3. Causa raíz (Hecho, con fuente primaria)

`Hecho psicométrico:` el O*NET Interest Profiler se basa en la teoría RIASEC de Holland (1997) y mide **la fuerza relativa de tus intereses** en seis áreas (Realistic, Investigative, Artistic, Social, Enterprising, Conventional). El flujo oficial de O*NET tiene **dos pasos**:

1. Respondes los ítems de interés y obtienes tu perfil RIASEC.
2. **Eliges un Job Zone** que representa "la cantidad de educación, experiencia y formación que ya tienes o que quieres adquirir". Según el Job Zone elegido, recibes **distintas** sugerencias ocupacionales que coinciden con tus intereses (National Center for O*NET Development, s.f.-a; Rounds et al., s.f.).

Los **Job Zones** (1 a 5) agrupan ocupaciones por nivel de preparación: Zona 1 (preparación mínima, p. ej. operarios) hasta Zona 5 (preparación extensa: posgrado, 5+ años de experiencia, p. ej. roles directivos y profesionales avanzados) (National Center for O*NET Development, s.f.-b).

`El código de DescubreMe implementó el paso 1 y omitió el paso 2.` Por eso a un profesional senior le aparecen ocupaciones de Zona 1-2 mezcladas con Zona 4-5: el sistema solo sabe qué te interesa, no a qué nivel de preparación apuntas. No es que O*NET esté mal elegido; está implementado a medias.

`Dato actual relevante (verificar al cargar el dataset):` desde **febrero 2026** O*NET consolidó las Zonas 1 y 2 en una sola categoría **"Job Zone 1-2"**, manteniendo 3, 4 y 5 (National Center for O*NET Development, s.f.-b). El nuevo crosswalk debe cargarse con este esquema.

`Mejora futura (no P0):` el matching oficial de O*NET no es por substring, sino por **correlación de Pearson** entre tu perfil RIASEC completo y los Occupational Interest Profiles (OIP) de cada ocupación, comparando la *forma* del perfil, no el nivel absoluto (Rounds et al., s.f.). El substring actual es una heurística aceptable para MVP; migrar a correlación es una mejora P2.

---

## 4. Decisión 1 — El gancho (primer test del Free)

`Aclaración previa:` lo que llamas "test gratis gancho" y "capa B2C gratis" son la **misma capa** (el Free). El gancho es el **primer test** dentro del Free, no una capa aparte. Por eso esta decisión no rompe la arquitectura: solo recompone qué va primero y dónde aparece la revelación ocupacional.

### 4.1 Las tres opciones (mi lectura de cada una)

| Opción | En qué consiste | Pros | Contras |
|---|---|---|---|
| **A. Liderar con personalidad** (BFI-2-S) | El primer test es personalidad; O*NET pasa a 2º y la lista de profesiones se muestra ya filtrada por Job Zone, dentro del teaser integrado | Da el momento "esto soy yo" de inmediato; usa un output sólido y listo; sirve de columna para el cruce integrador; es relevante a cualquier etapa de carrera | BFI-2-S tiene licencia "por confirmar" (mitigado por tu principio "legal al final" + plan-B IPIP); pierde el "hexágono RIASEC" como primera imagen |
| **B. Mantener O*NET primero, pero arreglado** | O*NET sigue de primero, pero antes de mostrar resultado captura nivel/experiencia y Job Zone, para que las profesiones salgan ajustadas | Cambio mínimo de flujo; respeta el JTBD explícito de "encontrar a qué dedicarme"; O*NET es dominio público (cero riesgo de licencia en el gancho) | Mantiene un gancho largo (60 ítems ≈ 10-12 min) antes del primer "wow"; lidera con tu output históricamente más débil; "aquí están los trabajos que te gustan" puede sentirse reductivo para un senior |
| **C. Micro-gancho nuevo (~2 min)** | Un micro-test de identidad ultracorto antes de los 4 tests, con un insight inmediato que invite a continuar | Máxima velocidad al primer "wow"; sube la activación inicial | Diseño nuevo; un micro-resultado tiene **baja validez** y mostrarlo como insight choca con tu principio 8 (transparencia psicométrica, no inflar). Riesgo de marca si el micro-resultado contradice el test completo |

### 4.2 Mi recomendación: Opción A (liderar con personalidad)

`Opinión profesional:` recomiendo **A**, por cuatro razones concretas:

1. **La conversión en autoconocimiento se gana con un momento de identidad, no con una lista de empleos.** El usuario quiere primero "esto soy yo". Un retrato de personalidad entrega ese reconocimiento de inmediato y es relevante tenga 28 o 55 años, esté establecido o en transición. Una lista de ocupaciones entrega utilidad, pero menos enganche emocional, y puede sonar reductiva para alguien con trayectoria (tus personas P1/P2).
2. **No lideres con tu output más débil.** Hoy el recomendador ocupacional es lo menos personalizado del producto. Aunque lo arregles, el resultado de personalidad ya está sólido y listo. Poner lo fuerte adelante es buena práctica de funnel.
3. **La personalidad es la mejor columna del "cruce".** Tu diferenciador es el perfil integrado. BFI-2 es el eje natural sobre el que cuelgan fortalezas, valores, intereses y bienestar. Empezar por ahí prepara mejor el teaser integrado.
4. **La revelación ocupacional gana fuerza como pago posterior.** Una vez capturado el Job Zone y enmarcada dentro del perfil integrado ("dado quién eres y tu nivel, estas ocupaciones podrían resonar contigo"), la lista pasa de débil a memorable.

`Matiz honesto (no oculto el trade-off):` O*NET quedó de primero a propósito en Fase 1 porque es **dominio público** (sin riesgo de licencia) y visualmente atractivo (hexágono). Mover el gancho a BFI-2-S introduce una licencia "por confirmar" — pero por tu principio "legal al final" no es bloqueante y ya tienes plan-B abierto (IPIP). Es una decisión de producto, no legal.

`Sobre la Opción C:` es tentadora para activación, pero tiene una **tensión con tu propio rigor**: un micro-test de 2 minutos da baja validez, y presentarlo como insight contradice el principio 8. Si lo que buscas es velocidad al primer "wow", la palanca correcta no es un micro-test desechable, sino **reducir la longitud percibida de BFI-2-S** con gran UX (bloques cortos, progreso, un resultado parcial honesto al 50%). Eso te da la velocidad de C sin sacrificar rigor.

### 4.3 Cómo se ve en el flujo (con Opción A)

`Personalidad (gancho, "esto soy yo")` → `O*NET IP-SF` (con captura de Job Zone justo antes del resultado) → `Valores corto` → `Bienestar (PERMA)` → `Perfil integrado teaser` que cruza las 4 dimensiones e incluye la **revelación ocupacional ya filtrada por Job Zone** como uno de sus elementos.

---

## 5. Decisión 2 — Ajuste por nivel (cómo se setea el Job Zone)

### 5.1 Las tres opciones (mi lectura de cada una)

| Opción | En qué consiste | Pros | Contras |
|---|---|---|---|
| **1. Inferir** (educación + experiencia → Job Zone) | Capturas nivel educativo y etapa de carrera; el sistema infiere un Job Zone y filtra ocupaciones por RIASEC + Job Zone | Cero fricción para el usuario; resuelve el problema de raíz; usa datos que de todos modos enriquecen el perfil | Una inferencia única puede equivocarse (un senior que quiere reconvertirse, o alguien dispuesto a estudiar más); le quita agencia al usuario |
| **2. El usuario elige Job Zone** (como O*NET oficial) | Tras los intereses, el usuario elige manualmente cuánto está dispuesto a estudiar (Zona 1-2 a 5) | Es el método oficial de O*NET; simple de implementar; máxima agencia | "Job Zone" es un concepto abstracto que muchos usuarios no entienden sin explicación; pide esfuerzo cognitivo y puede generar elecciones mal calibradas |
| **3. Híbrido: inferir + dejar ajustar** | Infieres un Job Zone por defecto desde educación/experiencia y dejas que el usuario lo suba o baje con una pregunta amable | Lo mejor de ambos: default sin fricción + agencia; sirve directo a tu audiencia (un senior puede decir "usar mi preparación actual" o "estoy dispuesto a estudiar más") | Más UI y más lógica que 1 o 2 |

### 5.2 Mi recomendación: Opción 3 (híbrido), con Opción 1 como mínimo viable

`Opinión profesional:` recomiendo **3**. La exploración de carrera es exactamente donde la agencia importa: la diferencia entre "muéstrame ocupaciones con lo que ya tengo" y "estoy dispuesto a estudiar más" cambia por completo la lista, y solo el usuario sabe en qué modo está. El híbrido respeta eso sin imponerle entender "Job Zones": infieres un default sensato y le ofreces una pregunta en lenguaje cotidiano para ajustarlo.

`Si el alcance de Fase 2 aprieta:` arranca con **Opción 1** (inferir, sin control de ajuste) — ya resuelve el 80% del problema que ves — y agrega el ajuste del híbrido como fast-follow. Evita la Opción 2 pura: el término "Job Zone" sin contexto confunde a usuarios LATAM no técnicos.

`Tabla de mapeo sugerida (educación + experiencia → Job Zone), para validar:`

| Nivel educativo / etapa | Job Zone por defecto |
|---|---|
| Bachillerato o menos, sin experiencia cualificada | 1-2 |
| Técnico / tecnólogo, o experiencia media | 3 |
| Pregrado universitario | 4 |
| Posgrado (maestría/doctorado) | 5 |

El ajuste del usuario ("¿explorar con tu preparación actual o estás dispuesto a estudiar más?") sube el techo (p. ej. de 4 a 5) o lo mantiene. La experiencia senior puede empujar dentro del rango, nunca por encima de Zona 5.

### 5.3 Qué NO hacer, y por qué (no negociable)

- **No filtrar ni recomendar ocupaciones por sexo/género.** Reproduce estereotipos ocupacionales de género, no aporta validez, y contradice tu principio 6 (no determinismo) además del lineamiento anti-estereotipo del proyecto. Riesgo ético y reputacional alto.
- **No usar la edad como filtro de ajuste ocupacional.** Sin base psicométrica y con riesgo de discriminación. La edad solo sirve, si acaso, para seleccionar baremos/normas — nunca para decidir qué oficio "te queda".
- **Educación y experiencia: sí, pero solo vía Job Zone**, nunca como recorte determinista del tipo "con tu título solo puedes X".

---

## 6. Flujo total recomendado — qué usar en cada capa

`Inferencia, alineado al PRD §5 y §8:`

| Capa | Objetivo | Gancho / orden | Instrumentos | Output | Nota |
|---|---|---|---|---|---|
| **Free** (gancho + adquisición) | Enamorar y convertir | **1º Personalidad (BFI-2-S)** como gancho de identidad; luego O*NET IP-SF (con captura de Job Zone), valores corto, PERMA | BFI-2-S, O*NET IP-SF, valores corto (conciliar TwIVI vs PVQ-21), PERMA-Profiler | Perfil integrado teaser (4 dimensiones) + revelación ocupacional **filtrada por Job Zone** | El gancho es el primer test, no una capa nueva |
| **Paid USD 19** | Profundidad que sorprende | Continúa desde el Free; climax = Motor Integrador | BFI-2-60, VIA-IS-P-96, PVQ-RR, O*NET + mapa ocupacional profundo por Job Zone, MLQ+WAMI, PERMA+Ryff+SWLS, PANAS, FSS-9 | Reporte profundo + Motor de Perfil Integrador (incl. ajuste persona-trabajo con Job Zone) | Aquí vive el mapa ocupacional rico, no en el Free |
| **B2B-A** | Diagnóstico organizacional de desarrollo | Paralelo al Paid, reusa stack | Stack Paid + módulos de trabajo (WDQ-40, UWES-9, WOLF, BPNSFS) | Dashboard agregado anónimo (n>=5) por lente | Nunca por individuo; nunca selección |
| **Ikigai Premium** | Integración de propósito | Add-on al Paid | Reusa Paid + Ikigai-9 | Mapper visual de 4 bloques + disclaimer cultural | Requiere adaptación es-CO de Ikigai-9 (gap conocido) |

`Veredicto sobre tu pregunta "¿el flujo es correcto?":` sí. No reordenes las capas. El cambio es de **contenido del gancho** (qué test va primero) y de **calidad del primer output ocupacional** (Job Zone), no de arquitectura.

---

## 7. Backlog priorizado para Fase 2

- **P0 — Filtro por Job Zone en el recomendador.** Reescribir `lib/report/occupation-selector.ts` para filtrar/ordenar por RIASEC **+** Job Zone. Sin esto, todo lo demás es cosmético.
- **P0 — Captura de nivel.** Onboarding que capture nivel educativo + etapa de carrera y derive un Job Zone (Opción 1 mínimo; híbrido si entra en alcance). Con consentimiento (Ley 1581).
- **P1 — Ampliar dataset ocupacional.** Cargar un crosswalk O*NET más amplio (>=150 ocupaciones, priorizando Zonas 3-5 para tu audiencia profesional), con `riasec_code` (high-point OIP) y `job_zone` bajo el nuevo esquema 1-2/3/4/5, nombres es-CO.
- **P1 — Decisión de gancho.** Si eliges Opción A, cambiar `product_stack.order` para que BFI-2-S sea primero y reposicionar la revelación ocupacional dentro del teaser integrado.
- **P2 — Usar `countryCode`** en el filtro de ocupaciones (hoy es parámetro muerto).
- **P2 — Matching por correlación** (Pearson contra OIP) en vez de substring RIASEC.
- **P2 — Conciliar valores** TwIVI vs PVQ-21 (decisión investigador/owner; no auto-cambiar).
- **P3 — Reducir longitud percibida** de BFI-2-S (bloques, progreso, resultado parcial honesto) como alternativa rigurosa a un micro-gancho.

---

## 8. Prompt para Claude Code (listo para pegar)

`Cómo usarlo:` ajusta el bloque "DECISIONES DEL OWNER" según lo que elijas (gancho y modo de Job Zone) y pégalo en Claude Code dentro del repo del MVP. Está escrito para mis opciones recomendadas (A + híbrido), pero es un cambio de una línea si decides distinto.

```text
CONTEXTO
Trabajas en el repo del MVP DescubreMe (Next.js + Supabase, GSD). Antes de codear, lee:
- PRD_MAESTRO.md §5.1 (Free), §6 (Integrador), §8 (stack).
- ROADMAP.md Fase 2.
- estado/ANALISIS_Gancho_y_ONET_Fase2_v1.0.md (este análisis).
- lib/report/occupation-selector.ts, db/schema/occupation.ts, db/seeds/occupations/LATAM/seed.sql,
  db/seeds/product-stack/free/seed.sql, app/(auth)/signup/actions.ts, db/schema/user.ts.
Declara rol [Arquitecto/Data scientist]. Respeta el CLAUDE.md del proyecto. No toques licencias (van a fase 7).

DECISIONES DEL OWNER (ajusta antes de ejecutar)
- GANCHO: BFI-2-S primero (Opción A).  [alternativa: dejar O*NET-IP-SF primero]
- MODO JOB ZONE: HÍBRIDO (inferir + permitir ajuste).  [alternativa: INFERIR_SOLO]

OBJETIVO
Que la recomendación de ocupaciones del O*NET IP-SF deje de mezclar niveles: debe filtrar por
intereses (RIASEC) Y por nivel de preparación (Job Zone), donde el Job Zone se infiere del nivel
educativo y la experiencia del usuario y (en modo híbrido) el usuario lo puede ajustar.

TAREAS
1) MODELO DE DATOS
   - Agrega al perfil de usuario: education_level (enum: secundaria | tecnico_tecnologo | pregrado | posgrado)
     y career_stage (enum: sin_experiencia | junior | semi_senior | senior). Tratar como dato personal
     estándar (Ley 1581) con consentimiento; seguir el patrón de cifrado existente solo si el repo ya
     lo aplica a campos análogos. NO marcar como dato sensible/categoría especial.
   - Agrega target_job_zone (smallint nullable, valores 12 | 3 | 4 | 5 bajo el esquema O*NET feb-2026,
     donde 12 = Job Zone 1-2 consolidada) en el lugar donde se computa el reporte O*NET.
   - Migración SQL versionada; actualizar tipos.

2) MAPEO A JOB ZONE  (nuevo: lib/onet/job-zone.ts)
   - inferJobZone({education_level, career_stage}) => 12 | 3 | 4 | 5 según:
       secundaria/sin experiencia -> 12 ; tecnico_tecnologo o experiencia media -> 3 ;
       pregrado -> 4 ; posgrado -> 5. career_stage senior puede empujar dentro del rango, nunca > 5.
   - Respeta la consolidación feb-2026: Zonas 1 y 2 se tratan como una sola "12".

3) ONBOARDING / CAPTURA
   - Paso para capturar education_level y career_stage (antes de mostrar el resultado de O*NET).
   - MODO HÍBRIDO: muestra el Job Zone inferido en lenguaje cotidiano y un control para ajustarlo,
     con copy del tipo: "¿Quieres explorar ocupaciones con tu preparación actual, o estás dispuesto a
     estudiar/formarte más?" (subir techo de Job Zone). MODO INFERIR_SOLO: omite el control.
   - Microcopy es-CO, tuteo. Sin lenguaje determinista.

4) RECOMENDADOR  (reescribe lib/report/occupation-selector.ts)
   - Filtra ocupaciones por (a) coincidencia RIASEC con el top-3 Y (b) job_zone == target_job_zone
     (y opcionalmente una zona por encima si el usuario marcó "dispuesto a estudiar más").
   - Usa countryCode para priorizar ocupaciones del país (hoy es parámetro muerto).
   - Ordena por congruencia de interés (nº/posición de letras que coinciden). Devuelve education_level/job_zone
     para que la UI lo muestre. Default limit 7.

5) DATASET  (db/seeds/occupations/...)
   - Reemplaza/expande el seed de 96 a >=150 ocupaciones, priorizando Job Zones 3-5 (audiencia profesional).
     Cada fila: code_onet, name_es_co, riasec_code (high-point OIP del crosswalk O*NET, sin inventar),
     job_zone bajo esquema 12/3/4/5. No reproducir ítems literales de ningún instrumento.

6) GANCHO  (db/seeds/product-stack/free/seed.sql)
   - Si GANCHO = BFI-2-S primero: ajusta product_stack.order para que BFI-2-S sea order=1 y O*NET pase a order=2.
     Reposiciona la revelación ocupacional para que aparezca dentro del teaser integrado, ya filtrada por Job Zone.
   - Si se mantiene O*NET primero: no cambies el orden; solo asegura que la captura de Job Zone ocurra
     antes del resultado de O*NET.

GUARDRAILES (no negociables)
- NUNCA filtrar ni rankear ocupaciones por sexo/género ni por edad. Educación y experiencia solo vía Job Zone.
- Copy de exploración, no determinista: "estas ocupaciones podrían resonar contigo", nunca "tu carrera ideal es X".
- Respeta Gate 1 (scoring auditado) y Gate 2 (consentimiento para los campos nuevos, cifrado, audit log).
- NO cambies el instrumento de valores (TwIVI vs PVQ-21): solo deja un TODO marcado para decisión del owner.

ENTREGABLES
- Migración SQL + seeds + lib/onet/job-zone.ts + occupation-selector reescrito + paso de onboarding.
- Tests unitarios: inferJobZone, y occupation-selector (un senior con posgrado NO recibe Zona 1-2;
  un usuario "dispuesto a estudiar más" sí ve la zona superior).
- Actualiza estado/STATUS.md y agrega ADR a estado/DECISIONS_LOG.md (decisión de gancho + Job Zone).
- Confirma con el owner antes de commit.
```

---

## 9. Riesgos y supuestos

- `Supuesto:` la tabla de mapeo educación→Job Zone es un punto de partida razonable; conviene validarla con datos reales de tus usuarios LATAM. Dato que la afinaría: distribución de nivel educativo y etapa de carrera de tus primeros registros.
- `Riesgo:` ampliar el dataset ocupacional con nombres es-CO correctos es trabajo de localización no trivial; subestimarlo retrasa el P1. Mitigación: empezar por Zonas 3-5 (tu audiencia) y crecer.
- `Riesgo:` cambiar el gancho a BFI-2-S introduce una licencia "por confirmar" en la pantalla de entrada. Mitigación: plan-B IPIP listo (principio 1 y 12), resolución en fase 7.
- `Reversibilidad:` alta. El orden del gancho es metadata (`product_stack.order`); el filtro de Job Zone es aditivo; el dataset es seed. Nada de esto es difícilmente reversible.

---

## 10. Fuentes (APA 7)

- Holland, J. L. (1997). *Making vocational choices: A theory of vocational personalities and work environments* (3rd ed.). Psychological Assessment Resources.
- National Center for O*NET Development. (s.f.-a). *O*NET Interest Profiler*. My Next Move. https://www.mynextmove.org/explore/ip
- National Center for O*NET Development. (s.f.-b). *O*NET OnLine Help: Job Zones*. O*NET OnLine. https://www.onetonline.org/help/online/zones
- National Center for O*NET Development. (s.f.-c). *O*NET Interest Profiler Short Form score report*. https://www.onetcenter.org/dl_tools/ipsf/IP_Score_Report.pdf
- Rounds, J., Su, R., Lewis, P., & Rivkin, D. (s.f.). *O*NET Interest Profiler manual*. National Center for O*NET Development. https://www.onetcenter.org/reports/IP.html

`Nota de verificación:` la consolidación de Job Zones 1 y 2 (feb-2026) debe confirmarse contra la documentación vigente de O*NET OnLine al momento de cargar el crosswalk, por si hubo ajustes posteriores.

---

*Fin del análisis v1.0 — 2026-06-25. Insumo de decisión; no modifica fuente de verdad. Al aprobar: registrar ADR en `estado/DECISIONS_LOG.md` y abrir ítems en `estado/BACKLOG.md`.*
