# PRD_MAESTRO — DescubreMe (v2.0)

**Producto:** DescubreMe — plataforma web de autoconocimiento profundo para adultos LATAM.
**Owner:** German Velez Hurtado (germanvelezh@gmail.com).
**Version del PRD:** 2.0
**Fecha:** 2026-06-05
**Estado:** Borrador para revision del owner.
**Horizonte:** ~12 meses.
**Productos cubiertos:** B2C Free, B2C Paid, B2B-A, Ikigai Premium.
**Audiencia primaria de este documento:** GSD (semilla de `/gsd-new-project`), Claude Code (implementacion) y German (owner).

**Reemplaza:** PRD_MAESTRO v1.0 (2026-05-13), archivado en `archivo/v1.5_pre_GSD/`. Esta version reorganiza el proyecto alrededor de cuatro decisiones del owner: (1) GSD como sistema de desarrollo, (2) legal/licencias como ultimo sprint sin bloquear el desarrollo, (3) seleccion best-test por constructo con plan-B abierto, (4) experiencia de usuario clase mundial como requisito de primer orden.

---

## 0. Como usa GSD este documento

Este PRD Maestro es la **semilla unica** del proyecto. El flujo es:

1. Claude Code corre `/gsd-map-codebase` (si hay codigo) y luego `/gsd-new-project`, usando este documento como input de vision y alcance.
2. GSD genera y mantiene sus propios artefactos: `PROJECT.md` (vision), `REQUIREMENTS.md` (alcance), `ROADMAP.md` (fases), `STATE.md` (posicion actual), `CONTEXT.md` (decisiones por fase).
3. Este PRD Maestro y el `ROADMAP.md` v2.0 del repo son la **fuente de verdad de producto**; los artefactos GSD son la capa de ejecucion. En conflicto, prevalece este PRD para decisiones de producto/research y el `CLAUDE.md` del proyecto para protocolo operativo.
4. El research por instrumento vive en `dossiers/` (evidencia: el "por que") y `implementation_packs/` (operativo: el "que codear"). GSD los referencia al planear cada fase; no se copian inline aqui.
5. La spec profunda de experiencia vivira en `UX_EXPERIENCE_SPEC.md` (tanda 2). Su resumen ejecutivo esta embebido en la seccion 9 de este documento para que GSD vea la vision de experiencia desde la semilla.

`Nota:` GSD se distribuye hoy como `@opengsd/get-shit-done-redux` (fork mantenido del repo original tras un incidente de gobernanza). Claude Code debe validar la legitimidad del paquete antes de instalar. Esta decision es de implementacion y no afecta el contenido de producto de este PRD.

---

## 1. Resumen ejecutivo

DescubreMe es una plataforma web de autoconocimiento profundo para adultos LATAM que integra instrumentos psicometricos validados y mapas ocupacionales O*NET en un motor unificado de perfilado. Cubre personalidad, intereses, valores, fortalezas, sentido, bienestar, afecto, flow, necesidades psicologicas, engagement y diseno del trabajo. No es clinico ni diagnostico: es educativo, orientador y de desarrollo. El MVP cubre cuatro productos sobre una sola plataforma: un Free de adquisicion que enamora, un Paid transaccional cuyo climax es un perfil integrador que sorprende al usuario, un B2B configurable por lentes de necesidad con dashboard agregado anonimo, y un mapper Ikigai integrador de proposito. Dos diferenciadores guian todo: rigor psicometrico transparente y una experiencia de usuario clase mundial, fluida y memorable. El desarrollo no depende de licencias; cada instrumento propietario tiene un plan-B abierto y la resolucion legal/licencias/costos ocurre en el ultimo sprint.

---

## 2. Vision y proposito

### 2.1 Problema que resuelve

El adulto LATAM que quiere entenderse y ubicarse frente al mundo del trabajo tiene tres caminos y los tres fallan:

| Camino actual | Falla |
|---|---|
| Tests gratuitos en linea (16Personalities, Truity, autotests de revistas) | Sin validez psicometrica documentada, no traducen a decisiones, refuerzan estereotipos (MBTI, eneagrama) |
| Coaching de carrera 1:1 | Costo alto (USD 80-300/sesion), variabilidad por profesional, no escalable |
| Plataformas premium globales (BetterUp, MyersBriggs.com, Strong) | Pricing inviable LATAM, en ingles, sin contextualizacion cultural |

### 2.2 Diferenciacion DescubreMe

- **Rigor psicometrico transparente:** cada instrumento declara version, confiabilidad y limitaciones al usuario, como parte del producto, no como letra pequena.
- **Experiencia clase mundial:** responder cada test es fluido, claro y hasta divertido; cada resultado se explica de forma simple y reveladora; el reporte se siente como un descubrimiento, no como un PDF tecnico.
- **Integracion entre instrumentos:** un solo perfil consolida personalidad, valores, intereses, fortalezas, sentido, bienestar y diseno del trabajo. La competencia vende silos; el valor de DescubreMe esta en el cruce.
- **Adaptacion cultural es-CO / LATAM:** el contenido nace en espanol Colombia; LATAM no es traduccion de ingles.
- **Mapeo a ocupaciones via O*NET, no determinismo:** sugerencias de exploracion, no veredictos.
- **No clinico, no seleccion:** lineas claras sobre lo que el producto NO hace.

### 2.3 Proposicion de valor por audiencia

| Audiencia | Valor que recibe |
|---|---|
| Adulto LATAM (B2C Free) | Un primer espejo de quien es, gratis, claro y atractivo, que invita a profundizar |
| Adulto LATAM (B2C Paid) | Un perfil integrado, profundo y riguroso que le revela cosas nuevas de si mismo |
| Empresa (B2B-A) | Diagnostico organizacional anonimo por lentes de necesidad (engagement, diseno del trabajo, desarrollo, cultura), sin tocar seleccion |
| Buscador de proposito (Ikigai) | Mapa visual integrador que conecta lo que ama, en lo que es bueno, lo que el mundo necesita y por lo que le pagan, con disclaimer cultural explicito |

---

## 3. Usuarios y casos de uso

`Supuesto explicito:` las personas son hipotesis pre-research; deben validarse con user research cualitativo Colombia (n=15-20) en la fase de experiencia. Sirven para anclar coherencia de producto.

### 3.1 Personas

- **P1 — Adulto en transicion (Free / Paid).** 28-38 anos, profesional con 5-10 anos de experiencia, urbano LATAM. Cuestiona su carrera, considera estudiar, cambiar de industria o emprender. Busca claridad antes de una decision irreversible.
- **P2 — Profesional senior reflexivo (Paid + Ikigai).** 38-55 anos, directivo/IC senior. Decisiones de tercer acto, sentido, reorientacion. Mas recursos, mas escepticismo frente a tests "de revista".
- **P3 — Empleado B2B-A (recibido como beneficio).** Llega via su empleador. Necesita confianza en privacidad y no-uso para seleccion. Su empleador solo ve el dashboard agregado.
- **P4 — Buscador de proposito (Ikigai).** 30-50 anos, ha leido sobre ikigai o "purpose work". Quiere un mapa integrado. Riesgo: confunde el Venn de 4 circulos con ikigai japones; el producto educa, no perpetua el error.

### 3.2 Jobs-to-be-done

| Persona | JTBD principal |
|---|---|
| P1 | "Cuando considero cambiar de carrera, quiero entender mis fortalezas, intereses y valores con rigor, para decidir informado y no impulsivo." |
| P2 | "Cuando reviso mi tercer acto, quiero un mapa integrado de quien soy hoy, para decidir donde poner mi energia en los proximos 10-15 anos." |
| P3 | "Cuando mi empleador me invita a un proceso de autoconocimiento, quiero certeza de que mis datos no afectaran mi evaluacion, para participar honestamente." |
| P4 | "Cuando exploro proposito, quiero ver como mis fortalezas, valores e intereses se conectan en una vista unica, para encontrar coherencia o nombrar tensiones." |

### 3.3 Anti-personas (NO son audiencia)

Profesionales clinicos buscando herramienta diagnostica; reclutadores buscando filtrar candidatos; menores de 18; investigadores academicos buscando datos para publicacion (requiere acuerdo separado).

---

## 4. Principios de producto

Anclan toda decision de diseno y son criterios de revision de cualquier feature o sub-PRD. Una propuesta que viole un principio debe documentar por que la excepcion es justificada.

| # | Principio | Consecuencia practica |
|---|---|---|
| 1 | **Instrumento como plugin (metadata, no codigo)** | Los instrumentos viven como datos versionados (`instrument`, `instrument_version`, `item`, `scoring_rule`, `baremo`). Anadir o intercambiar un test no requiere release de codigo. Esto habilita el plan-B abierto sin reescribir el motor. |
| 2 | **El desarrollo no depende de licencias** | Se construye con el mejor instrumento por constructo, asumido usable, con un plan-B abierto listo. La resolucion de licencia/costo/aprobacion ocurre en el ultimo sprint. Ningun bloqueo legal detiene fases de producto. Ver principio 12. |
| 3 | **Experiencia clase mundial como requisito de primer orden** | Fluidez, claridad y delight no son "nice to have": son criterio de aceptacion. Cada test responde facil; cada resultado se explica simple y revelador; cada reporte se siente como un descubrimiento. |
| 4 | **El cruce es el producto** | El valor diferencial esta en integrar instrumentos. Free entrega un perfil integrado teaser; Paid entrega un Motor de Perfil Integrador que produce insights que ningun test da por separado. |
| 5 | **No diagnostico clinico** | Ningun output puede leerse como diagnostico, etiqueta clinica o recomendacion de tratamiento. Todo copy pasa revision etica. |
| 6 | **No determinismo vocacional** | Se sugiere exploracion ("estas ocupaciones podrian resonar contigo"), no se asigna ("tu carrera ideal es X"). |
| 7 | **No seleccion B2B** | El producto B2B-A no produce outputs utilizables para contratacion, promocion o despido. Restriccion en el contrato comercial y en el modelo de datos (solo agregado, n>=5). |
| 8 | **Transparencia psicometrica al usuario** | El usuario ve version, confiabilidad y limitaciones del instrumento. No se ocultan baremos ni se inflan resultados. La magia esta en la claridad, no en la exageracion. |
| 9 | **Consentimiento granular y revocable** | Consentimiento separado por producto y revocable en <=2 clicks. Cumple Ley 1581 Colombia. |
| 10 | **Reutilizacion de respuestas, no de tests** | Una respuesta se guarda una vez y se proyecta a los productos que la usan. Cero re-toma innecesaria entre tiers. |
| 11 | **Espanol Colombia como default** | Microcopy, items adaptados y baremos LATAM cuando existan. Ingles disponible pero secundario. |
| 12 | **Licencia diferida = riesgo gestionado, no ignorado** | Cada instrumento propietario queda marcado "licencia TBD sprint final" con su plan-B abierto. No se "olvida" la licencia: se secuencia al final con un plan de contingencia ya listo. |

---

## 5. Los 4 productos

### 5.1 B2C Free

| Dimension | Definicion |
|---|---|
| **Para quien** | P1, P2 en exploracion inicial; embudo de adquisicion para Paid |
| **Que recibe el usuario** | Perfil integrado teaser que cruza 4 dimensiones (personalidad + intereses + valores + bienestar) en una narrativa breve, con una "pincelada" explicita de lo que revelaria el Paid |
| **Tiempo total** | 12-18 minutos, distribuible en 1-2 sesiones |
| **Instrumentos** | BFI-2-S (personalidad), O*NET IP-SF (intereses RIASEC), PVQ-21 (valores corto), PERMA-Profiler (bienestar) |
| **Pricing** | Gratuito. Email + consentimiento como entrada. |
| **Magia** | Cada test abre con un hook de una linea que explica que va a revelar; los resultados se entregan visualmente y en lenguaje cotidiano; el perfil integrado teaser es el gancho hacia el Paid |
| **Metrica norte** | % que completa el Free y visualiza el perfil integrado (objetivo supuesto: 60%, validar) |
| **Conversion objetivo a Paid** | 5-10% en 30 dias (supuesto, validar) |
| **Out-of-scope Free** | Facetas detalladas, O*NET completo, fortalezas VIA, integrador profundo |

`Cambio vs. v1.0:` el Free v1.0 usaba Flourishing como cuarto instrumento. v2.0 lo reemplaza por **PVQ-21 (valores)** para que el perfil integrado teaser cubra 4 dimensiones distintas y se sienta mas rico como anticipo del Paid.

### 5.2 B2C Paid

| Dimension | Definicion |
|---|---|
| **Para quien** | P1, P2 con compromiso de profundidad; usuarios convertidos desde Free |
| **Que recibe el usuario** | Reporte profundo por instrumento (cada resultado explicado a alta profundidad, profesional y legible) + **Motor de Perfil Integrador** (seccion 6) como climax |
| **Tiempo total** | 95-130 minutos distribuidos en 4-6 sesiones |
| **Instrumentos core** | BFI-2-60 (personalidad, 15 facetas), VIA-IS-P-96 (24 fortalezas), PVQ-RR (valores Schwartz, 19 valores), O*NET IP-SF + mapa O*NET (intereses/ocupaciones), MLQ + WAMI (sentido), PERMA-Profiler + Ryff-PWB + SWLS (bienestar), PANAS (afecto), FSS-9 (flow) |
| **Instrumentos opcionales (add-on)** | MEMS (sentido existencial), BPNSFS (necesidades psicologicas), CFI-R / PGI (crecimiento/curiosidad), upgrades de personalidad (IPIP-NEO-120, HEXACO-60) |
| **Pricing** | USD 19 one-time. Equivalente COP por geolocalizacion. |
| **Magia** | El integrador revela patrones que el usuario no habia nombrado: tensiones, fortalezas en accion, drivers de bienestar, ajuste persona-trabajo, una constelacion/arquetipo que unifica todo |
| **Metrica norte** | % Paid que completa el reporte (objetivo supuesto: 75%) + NPS del reporte (objetivo supuesto: >=40) |
| **Out-of-scope Paid** | Coaching 1:1, integracion con calendarios, version "para tu pareja" |

### 5.3 B2B-A (empresarial)

| Dimension | Definicion |
|---|---|
| **Para quien** | Empresas medianas LATAM (50-500 empleados) con area de gente/cultura activa |
| **Que recibe el empleado** | Su perfil Paid individual completo (autoconocimiento) + modulos de las lentes activas |
| **Que recibe la empresa** | Dashboard agregado anonimo (n>=5 por celda) por lente de necesidad, tendencias trimestrales, identificacion de equipos en riesgo. NO ve individuos. |
| **Configuracion** | La empresa elige lentes segun su pregunta de negocio (seccion 7). No es un paquete fijo. |
| **Tiempo del empleado** | 90-160 minutos segun lentes activas, distribuidos |
| **Pricing rango objetivo** | USD 8-15 por empleado/mes en contrato anual (supuesto, validar). Minimo 50 empleados. |
| **Metrica norte** | Contratos B2B firmados (objetivo supuesto: 3 clientes ancla) + NRR >=90% (supuesto) |
| **Out-of-scope B2B** | Decisiones de seleccion/promocion/despido, comparativos individuales, comparativos entre empresas, API publica, integraciones HRIS |

### 5.4 Ikigai Premium

| Dimension | Definicion |
|---|---|
| **Para quien** | P2, P4 con compra Paid previa que buscan integracion de proposito |
| **Que recibe el usuario** | Mapa visual integrado de 4 bloques (lo que amo, en lo que soy bueno, lo que el mundo necesita, por lo que me pagan) + Ikigai-9 como eje + disclaimer cultural visible |
| **Instrumentos** | No anade tests nuevos salvo Ikigai-9. Reutiliza el stack Paid + O*NET. |
| **Tiempo extra** | 10-15 minutos sobre el Paid (Ikigai-9 + onboarding del mapper) |
| **Pricing rango objetivo** | USD 29-49 como add-on al Paid (supuesto, validar) |
| **Magia** | El mapa muestra coherencias y tensiones entre los 4 bloques; nombra el "centro" sin prometer una respuesta unica de vida |
| **Out-of-scope Ikigai** | Version standalone sin Paid, K-1 Scale, coaching guiado sobre el mapa |

`Gap conocido:` no existe dossier ni implementation pack de **Ikigai-9** (Imai & Kanero 2012) en el repo. K-1 quedo diferido e Ikigai-Ryff descartado por fuente no verificable. Antes de la fase Ikigai hay que producir el dossier + pack de Ikigai-9. Registrado en BACKLOG como `[GAP-PACK-Ikigai-9]`.

**Gates de secuencia entre productos:** Free es prerequisito de Paid. Paid es prerequisito de Ikigai. B2B-A es paralelo a Free/Paid pero reutiliza su stack.

---

## 6. Motor de Perfil Integrador (climax del Paid)

`Hecho:` el integrador no es un test; es la capa de scoring + narrativa que cruza instrumentos para producir insights emergentes. Es la razon por la que el usuario "se descubre".

| Salida del integrador | Como se construye (cruce de instrumentos) | Por que sorprende |
|---|---|---|
| **Ajuste persona-trabajo** | Intereses RIASEC x Valores PVQ-RR x Personalidad BFI-2 x O*NET | Conecta quien eres con ocupaciones a explorar, sin determinismo |
| **Mapa de coherencia y tensiones** | Valores declarados vs. lo que hace; Sentido (MLQ/WAMI) vs. Engagement; Bienestar vs. afecto (PANAS) | Nombra tensiones que el usuario sentia pero no habia articulado |
| **Fortalezas en accion** | VIA (24 fortalezas) x facetas BFI-2 | Explica como se expresan tus fortalezas segun tu personalidad, no como lista generica |
| **Drivers de bienestar** | Que dimensiones se asocian a tu PERMA/Ryff/SWLS | Va mas alla del puntaje: muestra que mueve tu bienestar |
| **Constelacion / arquetipo** | Sintesis narrativa de las 8 dimensiones | Una historia unificadora que el usuario reconoce como "soy yo" |
| **Bordes de crecimiento** | CFI-R / PGI x personalidad | Senala donde hay mas palanca de desarrollo, en tono de posibilidad |

`Criterio de calidad psicometrica:` el integrador combina puntajes, no inventa constructos. Todo cruce se documenta con su logica de agregacion y trazabilidad en la spec de scoring (`implementation_packs/`). Donde un cruce sea heuristico (no respaldado por evidencia de validez), se etiqueta como exploratorio y se redacta como hipotesis para el usuario, no como hecho. `Limitacion:` las correlaciones entre constructos no implican causalidad; el copy debe evitar lenguaje causal o predictivo.

---

## 7. B2B-A — Menu de lentes de necesidad

`Inferencia:` con la bateria existente (sola o combinada) el B2B puede cubrir bastante mas que engagement/burnout/carrera. Siempre **desarrollo, nunca seleccion**, y siempre **agregado anonimo (n>=5)**. La empresa contrata por su pregunta de negocio y se activan las lentes.

| Lente | Que mide | Instrumentos / combinacion | Pregunta de negocio que responde |
|---|---|---|---|
| Engagement & energia | Vigor, dedicacion, absorcion, flow laboral | UWES-9 + WOLF + PANAS | "Que tan conectado esta el equipo?" |
| Bienestar & riesgo de desgaste | Florecimiento y senal (no clinica) de desgaste | PERMA + Ryff + SWLS + BPNSFS (frustracion) + PANAS | "Hay equipos en riesgo de burnout?" |
| Necesidades psicologicas (SDT) | Autonomia, competencia, relacion percibidas | BPNSFS | "Que necesidades esta frustrando el entorno?" |
| Diseno del trabajo / calidad del rol | Autonomia, variedad, significado de tarea, feedback, demandas, interdependencia | WDQ-40 | "Como rediseñamos los roles?" |
| Sentido & proposito laboral | Conexion entre sentido personal y el trabajo | WAMI + CMWS + MLQ | "El trabajo tiene sentido para la gente?" |
| Cultura & alineacion de valores | Congruencia entre valores del equipo y valores declarados de la empresa | PVQ-RR agregado | "Vivimos los valores que decimos?" |
| Fortalezas del equipo | Constelacion de fortalezas, complementariedad | VIA-IS-P agregado | "Con que fortalezas contamos?" |
| Composicion & diversidad de personalidad | Distribucion de rasgos, complementariedad, fricciones probables | BFI-2 agregado | "Que tan diverso/complementario es el equipo?" |
| Desarrollo de carrera | Insumos para planes de desarrollo + rutas ocupacionales | Personalidad + VIA + Valores + Intereses + PGI + CFI-R + O*NET | "Como desarrollamos a nuestro talento?" |
| Adaptabilidad / readiness al cambio | Curiosidad, flexibilidad, iniciativa de crecimiento | CFI-R + PGI | "Estamos listos para la transformacion?" |
| Ajuste persona-rol (agregado) | Brechas entre lo que el rol ofrece y lo que la persona trae | WDQ-40 x Personalidad/Valores/Intereses | "Donde rediseñar roles para mejor ajuste?" |

`Flag etico:` la lente "Bienestar & riesgo de desgaste" toca senales sensibles. Dispara NFR-27 (disclaimer no-clinico) y NFR-28 (ruta de contencion) a nivel individual, y se reporta a la empresa solo agregado, sin etiquetas clinicas ni identificacion de personas. `No-negociable:` ninguna lente produce outputs por individuo para el empleador.

**Set core B2B sugerido para el MVP** (mayor valor, instrumentos listos): Engagement & energia, Bienestar & desgaste, Diseno del trabajo, Sentido laboral, Cultura & valores, Fortalezas del equipo, Desarrollo de carrera, Adaptabilidad. Composicion de personalidad, SDT y Ajuste persona-rol entran como sub-vistas. El owner ajusta este set en el sub-PRD B2B (tanda 2).

---

## 8. Stack de instrumentos por producto

`Inferencia:` seleccion por mejor evidencia psicometrica disponible en el repo, con plan-B abierto por instrumento propietario para que el desarrollo nunca se bloquee. La evidencia de validez/confiabilidad de cada uno vive en `dossiers/`.

### 8.1 Matriz maestra

| Constructo | B2C Free | B2C Paid | B2B-A | Ikigai |
|---|---|---|---|---|
| Personalidad | BFI-2-S (30) | BFI-2-60 (15 facetas) | BFI-2-60 | reusa Paid |
| Intereses (RIASEC) | O*NET IP-SF | O*NET IP-SF + mapa O*NET | O*NET IP-SF | reusa |
| Valores | PVQ-21 | PVQ-RR (57, 19 valores) | PVQ-RR | reusa |
| Fortalezas | — | VIA-IS-P-96 (24) | VIA-IS-P-96 | reusa |
| Bienestar | PERMA-Profiler | PERMA + Ryff-PWB + SWLS | SWLS + PERMA | reusa |
| Sentido/proposito | — | MLQ + WAMI (+ MEMS opc.) | WAMI + CMWS | Ikigai-9 (eje) |
| Afecto | — | PANAS | PANAS | — |
| Flow | — | FSS-9 | WOLF | — |
| Necesidades psic. (SDT) | — | BPNSFS (opc.) | BPNSFS | — |
| Engagement laboral | — | — | UWES-9 | — |
| Diseno del trabajo | — | — | WDQ-40 | — |
| Crecimiento/curiosidad | — | CFI-R / PGI (opc.) | PGI + CFI-R | — |

### 8.2 Licencia y plan-B (a resolver en el ultimo sprint)

| Instrumento | Naturaleza de licencia (preliminar, validar sprint final) | Plan-B abierto |
|---|---|---|
| BFI-2-S / BFI-2-60 | Soto & John; uso academico amplio, uso comercial a confirmar | IPIP-NEO-120 (dominio publico) |
| VIA-IS-P-96 | VIA Institute; uso comercial requiere acuerdo | IPIP-VIA-R (Bluemke 2024, dominio publico) |
| PVQ-RR / PVQ-21 | Schwartz; uso academico/no comercial amplio | PVQ-40 (ESS, uso publico) |
| WDQ-40 | Cadena de titulares (APA / autores / editor) | WDQ corto o version inglesa via APA |
| O*NET IP-SF | Dominio publico (US DOL) | No requiere plan-B |
| PERMA-Profiler, SWLS, Ryff-PWB, PANAS, MLQ, WAMI, CMWS, UWES-9, BPNSFS, FSS-9, MEMS, CFI-R, PGI | Uso libre / academico amplio; confirmar uso comercial | N/A o variante abierta segun corresponda |
| Ikigai-9 | Imai & Kanero; confirmar | Pendiente investigacion (gap) |

`No-negociable:` esta tabla es preliminar. La revision formal de licencia, costo y permisos (comercial, adaptacion, digitalizacion, atribucion) se ejecuta en el sprint legal final. Hasta entonces el desarrollo asume usabilidad y mantiene el plan-B listo para swap sin reescribir el motor (principio 1).

---

## 9. Experiencia (resumen embebido)

`Opinion profesional:` la experiencia es el segundo diferenciador del producto y un requisito de aceptacion, no decoracion. La spec completa vivira en `UX_EXPERIENCE_SPEC.md` (tanda 2) y usara el `ui-ux-pro-max-skill` como sistema de diseno de referencia para Claude Code. Resumen de la vision:

### 9.1 Principios de experiencia

- **Hook por test:** cada instrumento abre con una frase de una linea que explica, en lenguaje cotidiano, que va a revelar y por que vale la pena ("Esto mapea que te energiza y que te drena"). Claro, atractivo, sin exagerar el valor predictivo (respeta principio 8).
- **Fluidez al responder:** un item a la vez o en bloques cortos, progreso visible, microcopy calido y profesional, pausas y reanudacion sin friccion, tiempos honestos.
- **Resultados como magia clara:** cada resultado se entrega visual primero, con una explicacion simple debajo y la profundidad disponible al expandir. La "magia" viene de la claridad y el reconocimiento, no de afirmaciones infladas.
- **Free como pincelada del Paid:** el perfil integrado teaser muestra lo justo para que el usuario sienta que hay mucho mas, sin frustrar.
- **Paid como descubrimiento:** profundidad alta por instrumento + integrador que sorprende.
- **Tono:** profesional y riguroso, calido y cercano, divertido sin ser frivolo. Tuteo es-CO.

### 9.2 Lo que la experiencia NO hace

No usa urgencia artificial, no manipula, no exagera el valor predictivo de los tests, no usa lenguaje clinico ni determinista. El delight nunca compromete el rigor ni la etica.

---

## 10. Roadmap por valor (resumen)

Detalle en `ROADMAP.md` v2.0. Principio rector: **cada fase entrega valor usable y lo legal/licencias va al final sin bloquear el desarrollo.**

| Fase | Entrega de valor | Estado |
|---|---|---|
| 1. Fundacion | Motor de instrumentos (plugin/metadata) + auth + un test E2E con experiencia "magia" | Por iniciar |
| 2. B2C Free | 4 tests + perfil integrado teaser. Primer lanzamiento de valor real | Por iniciar |
| 3. B2C Paid | Stack profundo + Motor de Perfil Integrador | Por iniciar |
| 4. B2B-A | Lentes configurables + dashboard agregado anonimo | Por iniciar |
| 5. Ikigai Premium | Mapper integrador + disclaimer cultural (requiere pack Ikigai-9) | Por iniciar |
| 6. Experiencia clase mundial | Pulido transversal con ui-ux-pro-max, user research, accesibilidad | Por iniciar |
| 7. Legal & Licencias | Revision Ley 1581, cierre de licencias, costos, swaps a plan-B si aplica | Ultimo sprint |

`Nota de secuencia:` la calidad psicometrica y el compliance-by-design (consentimiento, NFR-27/28, cifrado) se construyen de forma continua como calidad de ingenieria desde la fase 1. Lo que se difiere a la fase 7 es la **revision legal formal externa, el cierre contractual de licencias y la aprobacion de costos** — no las salvaguardas tecnicas de privacidad, que son parte del producto desde el inicio.

---

## 11. Metricas top-level

`Convencion:` rangos "supuesto" requieren validacion empirica antes de comprometerse; "no negociable" son hard floors.

### 11.1 Producto y research

| Metrica | Definicion | Objetivo | Estado |
|---|---|---|---|
| Activacion Free | % registrados que completan >=1 instrumento Free | >=60% | Supuesto |
| Completion Free | % que completa los 4 instrumentos Free y ve el perfil integrado | >=40% | Supuesto |
| Completion Paid | % Paid que termina el stack core en <=30 dias | >=75% | Supuesto |
| Dropoff por instrumento | % que abandona dentro de un instrumento iniciado | <=15% | Supuesto |
| Engagement retorno | % que vuelve al reporte a 7d / 30d | >=30% / >=15% | Supuesto |
| NPS reporte Paid | NPS a 14d post-completion | >=40 | Supuesto |
| Calidad psicometrica | Alpha/omega >=0.70 por escala antes de mostrar resultado | Por escala | No negociable |
| Consentimiento | % flujos con consentimiento explicito | 100% | No negociable (Ley 1581) |

### 11.2 Comerciales

| Metrica | Definicion | Objetivo | Estado |
|---|---|---|---|
| Conversion Free a Paid | % Free que compra Paid en 30d | 5-10% | Supuesto |
| AOV Paid | Precio medio efectivo (con add-ons) | USD 22-28 | Supuesto |
| Churn refund Paid | % compras con refund a 30d | <=5% | Supuesto |
| Activacion Ikigai | % Paid que compra Ikigai en 90d | 15-25% | Supuesto |
| Contratos B2B firmados | Clientes B2B-A activos a 12 meses | 3-8 | Supuesto |
| NRR B2B | Net Revenue Retention B2B | >=90% | Supuesto |

CAC, LTV, payback y forecast viven en un business case separado, no aqui, para evitar falsa precision.

---

## 12. Out-of-scope explicito

| Categoria | Out-of-scope |
|---|---|
| Clinico | Diagnostico DSM-5/CIE-11, screening clinico, recomendaciones de tratamiento, intervencion, derivacion automatica (solo informativa NFR-28) |
| Seleccion / RH | Outputs para contratacion, promocion, despido, evaluacion de desempeno; comparativos individuales en B2B |
| Determinismo | "Tu carrera ideal es X", "tu pareja ideal", prediccion de exito individual, ranking entre usuarios |
| Instrumentos fuera del stack | MBTI, eneagrama, DISC, astrologia, grafologia, numerologia, tests sin validacion peer-reviewed |
| Plataforma | App mobile nativa, coaching 1:1 in-product, marketplace de coaches, chat con expertos |
| Idiomas | Fuera de es-CO (default), es-MX, en (secundario). Sin portugues ni frances en este horizonte |
| Integraciones B2B | HRIS, SSO empresarial avanzado, API publica, exports automaticos |
| Investigacion academica | Acceso a datos agregados para publicacion (requiere acuerdo separado) |
| Edad | Menores de 18 |
| Diferidos | K-1 Scale, Ikigai-Ryff (descartado), Strong, SDS, PGI standalone, NEO-PI-3 (por costo/redundancia) |

---

## 13. Riesgos no negociables (top 6)

| ID | Riesgo | Impacto | Mitigacion |
|---|---|---|---|
| R-01 | Licencia de un instrumento propietario no se cierra en el sprint final | Swap tardio a plan-B con posible perdida de comparabilidad | Plan-B abierto listo por diseno (principio 1, 12); motor plugin-agnostico |
| R-02 | Compliance Ley 1581 requiere asesoria legal externa no contratada | Riesgo legal en lanzamiento | Compliance-by-design desde fase 1; revision legal formal agendada en fase 7 antes de GA |
| R-03 | Pack Ikigai-9 ausente | Bloquea fase Ikigai | Producir dossier + pack Ikigai-9 antes de fase 5 (BACKLOG `[GAP-PACK-Ikigai-9]`) |
| R-04 | Experiencia "magia" no se logra (resultados percibidos como genericos) | Baja activacion y conversion | UX research temprano, hooks por test, integrador como diferenciador, fase 6 de pulido |
| R-05 | Riesgo cultural Ikigai (Venn != ikigai japones) | Reputacional / critica academica | Disclaimer explicito en UI antes y dentro del mapper (Zuzunaga/Winn vs. Hasegawa/Kamiya/Mogi) |
| R-06 | Datos sensibles (afecto negativo PANAS, frustracion BPNSFS, animo BFI-2) sin salvaguarda | Dano al usuario + riesgo legal | NFR-27/28, cifrado, audit log construidos desde fase 1 como calidad |

Detalle completo de riesgos en el anexo de riesgos (tanda 2).

---

## 14. Gates de release

Antes de **GA publico** de cualquier producto deben cerrarse tres gates. La diferencia con v1.0: los gates psicometrico y de compliance-by-design se construyen y validan de forma continua; el gate de licencia formal se concentra en la fase 7.

### Gate 1 — Psicometrico (continuo)
Alpha/omega >=0.70 por escala en muestra LATAM (n>=200); CFA (confirmatory factor analysis) con CFI>=0.90 y RMSEA<=0.08 cuando aplique; baremos CO/MX (o INTL fallback); scoring auditado vs. publicacion original; quality validator activo (aquiescencia, patron unico, tiempo atipico).

### Gate 2 — Compliance-by-design (continuo)
Consentimiento versionado y firmado; NFR-27 activo en instrumentos con `ethical_flags=emotional_distress`; NFR-28 con lineas Colombia; cifrado en reposo (AES-256) y transito (TLS 1.3+); derecho de eliminacion en <=2 clicks; audit log inmutable de accesos a `item_response` y `computed_score`.

### Gate 3 — Licencia (fase 7, antes de GA)
Acuerdo escrito con cada titular firmado y archivado en `licencias/`; atribucion en reporte + ToS; `usage_log` configurado para reportar al titular; costo presupuestado. Si un instrumento no pasa Gate 3, se sustituye por su plan-B o se difiere.

`Aclaracion:` "legal al ultimo sprint" significa que el cierre contractual y la revision legal externa se secuencian al final, no que se lance sin ellos. El desarrollo de fases 1-6 no se bloquea por estado de licencia.

---

## 15. Governance y decision rights

| Dominio | Decide | Aprueba | Consulta |
|---|---|---|---|
| Psicometria (instrumentos, scoring, validez) | Cowork (Investigador) | German | — |
| Producto (alcance, prioridades) | Cowork (PM) | German | — |
| UX y microcopy | Cowork (UX) | German | — |
| Tecnico (schema, infra, codigo) | Claude Code | German (migraciones) | Cowork si toca psicometria |
| Comercial (pricing, GTM, B2B) | German | — | Cowork (Estratega) |
| Compliance (Ley 1581, etica) | German + asesor legal | — | Cowork (Investigador/PM) |
| Licencias (negociaciones) | German | — | Cowork prepara pitch |

Toda decision no trivial va a `estado/DECISIONS_LOG.md` en formato ADR (contexto, opciones, decision, consecuencias, reversibilidad, referencia).

---

## 16. Glosario corto

| Termino | Definicion |
|---|---|
| Instrumento | Test psicometrico individual (ej. BFI-2-S). Tiene versiones, items, scoring rules, baremos. |
| Plugin | Definicion de un instrumento como metadata. No es codigo. |
| Motor de Perfil Integrador | Capa que cruza instrumentos para producir insights emergentes (seccion 6). |
| Lente B2B | Modulo de diagnostico agregado segun una pregunta de negocio (seccion 7). |
| Plan-B abierto | Instrumento de dominio publico listo para sustituir a uno propietario sin reescribir el motor. |
| NFR-27 / NFR-28 | Disclaimer no-clinico / ruta de contencion. |
| Gate | Criterio de cierre obligatorio antes de GA (psicometrico, compliance, licencia). |
| GSD | Get Shit Done: sistema spec-driven de desarrollo que corre en Claude Code. |

---

## 17. Changelog del PRD

| Version | Fecha | Autor | Cambios |
|---|---|---|---|
| 2.0 | 2026-06-05 | Cowork (PM + Arquitecto + UX + Investigador) + German | Reorganizacion para GSD como sistema de desarrollo. Legal/licencias como ultimo sprint sin bloquear desarrollo. Seleccion best-test por constructo con plan-B abierto. Free pasa a 4 dimensiones (anade PVQ-21). Paid incorpora Motor de Perfil Integrador. B2B pasa a menu de 11 lentes de necesidad. Experiencia clase mundial como principio de primer orden con seccion embebida. Gates reordenados (psicometrico/compliance continuos, licencia en fase final). |
| 1.0 | 2026-05-13 | Cowork (PM) + German | Version inicial (archivada en `archivo/v1.5_pre_GSD/`). |

---

*Fin del PRD_MAESTRO v2.0. Documento vivo y semilla unica de GSD. Actualizar al cierre de cada fase o trimestralmente. Cualquier cambio relevante se registra aqui y en `estado/DECISIONS_LOG.md`.*
