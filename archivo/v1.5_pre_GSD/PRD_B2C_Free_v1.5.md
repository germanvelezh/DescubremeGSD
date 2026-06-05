# PRD — B2C Free MVP1 (v1.5)

**Producto:** DescubreMe — Tier B2C Free MVP1.
**Version del PRD:** 1.0
**Fecha:** 2026-05-13
**Owner:** German Velez Hurtado.
**Estado:** Borrador para revision del owner.
**Audiencia primaria:** Claude Code (implementacion) + German (owner) + Cowork (UX writer para microcopy futura).
**Documento padre:** `02_producto/PRD_MAESTRO.md` (v1.0).

**Documentos relacionados:**

- Glosario: `02_producto/anexos/A1_GLOSARIO.md`.
- NFRs: `02_producto/anexos/A2_NFRs.md`.
- Mapa de instrumentos: `02_producto/anexos/A3_MAPA_INSTRUMENTOS.md` §2.1.
- Etica y Compliance: `02_producto/anexos/A4_ETICA_COMPLIANCE.md`.
- Riesgos: `02_producto/anexos/A5_RIESGOS_CONSOLIDADOS.md`.
- Arquitectura: `00_arquitectura/_ARQUITECTURA_TESTS_REUTILIZABLES.md`.
- Stack por producto: `00_arquitectura/_STACK_POR_PRODUCTO.md` (seccion B2C Free).
- Dossiers de instrumentos: `03_dossiers/01_BFI-2_Consolidado.md`, `03_dossiers/04_Flourishing_Consolidado.md` (a verificar nombre exacto), `03_dossiers/25_O-NET-IP-SF_Consolidado.md`, `03_dossiers/23_PERMA-Profiler.md` (a verificar nombre exacto).
- Implementation packs: `04_implementation_packs/BFI-2-S_v1.0...md` (resto pendiente).

---

## 1. Resumen ejecutivo

B2C Free MVP1 es el tier gratuito de adquisicion de DescubreMe. Entrega un perfil sintetico en 12-18 minutos con 4 instrumentos (BFI-2-S 30, Flourishing Scale, O*NET IP SF, PERMA-Profiler) en una sola sentada con save & resume. La mision principal es convertir visitantes en usuarios registrados con perfil completo y, en 14 dias, llevarlos a evaluar Paid USD 19. No es un producto autonomo de valor terminal, es un funnel con honestidad psicometrica. Bloqueadores criticos para lanzar: 2 licencias pendientes (BFI-2 Soto-John, PERMA UPenn / Wellbeing Lab) y asesoria legal Ley 1581.

---

## 2. Problema y oportunidad

### 2.1 Problema del usuario

El adulto LATAM que quiere empezar a entenderse mejor enfrenta tres caminos hoy y los tres fallan:

| Camino actual | Falla especifica del Free |
|---|---|
| Tests de revista / 16Personalities | Resultado entretenido pero sin validez. El usuario sospecha que "no es serio". |
| Coaching o consulta | USD 80-300 por sesion. Barrera para "solo probar". |
| Apps premium globales en ingles | Sin pricing LATAM. Idioma + contexto cultural inadecuado. |

Free responde: "20 minutos de tu tiempo, 4 instrumentos validados, un perfil sintetico riguroso, gratis, en es-CO. Si te interesa profundizar, hay un Paid riguroso. Si no, te llevas algo util."

### 2.2 Por que importa para el funnel

Free es el unico tier sin barrera economica. Es la puerta de entrada al producto y al funnel comercial. Sin Free, Paid pierde su mecanismo de adquisicion de bajo costo (CAC).

### 2.3 Por que ahora

DescubreMe v1.5 apunta a Q1 2027. Free debe estar listo en Sprint 3 (Q3 2026) tras cerrar M1 (BFI-2-S) para que haya tiempo de iterar antes de los productos pagos.

---

## 3. Usuarios y JTBD especificos Free

Sub-set de las personas P1 y P2 del PRD_MAESTRO §3.1.

### 3.1 P1-Free — Adulto en exploracion inicial

- 28-38 anos, profesional con 5-10 anos de experiencia.
- Acaba de cuestionar su carrera (cambio de jefe, frustracion en el rol, ofertas externas, embarazo, mudanza).
- Llega via busqueda organica ("test de personalidad serio en espanol"), redes (LinkedIn, IG) o referidos.
- Disposicion a invertir: ~20 minutos en un sit-down. No quiere registrarse en algo que no haya probado, pero esta dispuesto a dar email si el producto se ve serio.
- Sensibilidad a manipulacion: alta. Si percibe urgencia artificial o tono motivacional vacuo, se va.

### 3.2 P2-Free — Profesional senior reflexivo

- 38-55 anos, directivo / senior IC.
- Decisiones de tercer acto, reorientacion, proyectos personales.
- Mas escepticismo, mas exigencia de rigor.
- Mejor dispuesto a pagar Paid si la calidad del Free es coherente.

### 3.3 JTBD principal Free

> "Cuando estoy considerando entender mejor quien soy antes de tomar una decision importante, quiero un perfil rapido, riguroso y en mi idioma, para evaluar si vale la pena profundizar."

### 3.4 Anti-personas (NO son target Free)

- Adolescentes (<18 anos): el producto bloquea registro por fecha de nacimiento.
- Profesionales clinicos buscando herramienta de screening: redirigir a recursos clinicos.
- Empleadores buscando filtro de candidatos: redirigir a B2B-A con clausula explicita de no-seleccion.
- Curiosos sin intencion de invertir tiempo: el funnel los pierde y esta bien que asi sea.

---

## 4. Alcance funcional

### 4.1 Que entra v1.5

- 4 instrumentos: BFI-2-S 30, Flourishing Scale, O*NET IP SF, PERMA-Profiler.
- Registro con magic link via email + consentimiento explicito (granular: producto + marketing opcional).
- Onboarding corto (≤90 s) con expectativa de tiempo, contenido, no-clinico, derecho de eliminacion.
- Flujo continuo con save & resume (si el usuario abandona, retoma en el mismo punto).
- Reporte sintetico con layers Base + Free.
- CTA a Paid al final del reporte.
- Secuencia de 2 emails educativos post-Free (dia 2-3 y dia 10-14).
- Derecho de eliminacion accesible en ≤2 clicks desde el perfil.
- Re-toma del Free permitida despues de 90 dias (window minima de test-retest para que la comparacion tenga sentido).
- Idioma default es-CO. Disponible es-MX y en como secundarios.

### 4.2 Que NO entra v1.5 (out-of-scope explicito)

- Facetas detalladas del BFI-2 (eso es Paid).
- Mapeo O*NET completo a ocupaciones (eso es Paid; Free solo muestra RIASEC top 3).
- Comparativos historicos (eso es Paid).
- Upgrades premium (BFI-2 60, IPIP-NEO-120, HEXACO-60).
- Recomendaciones personalizadas detalladas (eso es Paid).
- Coaching, calendario, chat, marketplace de coaches.
- Soporte 1:1 humano sobre el resultado.
- Compartir resultado en redes sociales (decision diferida; ver §15).
- Version mobile nativa (web responsive solamente en v1.5).
- Idiomas fuera de es-CO / es-MX / en.

### 4.3 Out-of-scope heredado del maestro

Todas las exclusiones del PRD_MAESTRO §8 aplican: nada clinico, nada de seleccion, nada deterministico, sin instrumentos fuera del stack v1.5, sin menores de 18.

---

## 5. Flujo de usuario end-to-end

### 5.1 Diagrama de flujo

```
[Landing page]
        v
[Boton "Empezar gratis"]
        v
[Pantalla 1 — Onboarding: que es, cuanto dura, no-clinico, edad ≥18]
        v
[Pantalla 2 — Registro: email + checkbox consent producto + checkbox consent marketing (opt-in)]
        v
[Magic link enviado al email]
        v
[Usuario clic en magic link → autenticado]
        v
[Pantalla 3 — Onboarding final: "Tomate 15-20 min. Puedes pausar si necesitas. Vamos."]
        v
[Instrumento 1 — Flourishing Scale (2-3 min)]
        v
[Pantalla transicion: "Excelente. 3 mas. Sigues con intereses ocupacionales."]
        v
[Instrumento 2 — O*NET IP SF (3-5 min)]
        v
[Pantalla transicion + breve aviso NFR-27 si BFI-2-S incluye items de Depresion]
        v
[Instrumento 3 — BFI-2-S 30 (3-5 min) — con NFR-27 disclaimer pre + post]
        v
[Pantalla transicion]
        v
[Instrumento 4 — PERMA-Profiler (4-5 min) — con NFR-27 si aplica por items emocionales]
        v
[Quality Validator corre (aquiescencia, patron unico, tiempo atipico)]
        v
[Pantalla espera: "Estamos calculando tu perfil..." (≤3 s)]
        v
[Reporte Free]
        v
[CTA a Paid en reporte]
        v
[Email "tu perfil esta listo" + recordatorio del link al reporte]
```

### 5.2 Detalle de cada etapa

| Etapa | Microcopy headline (placeholder, UX Writer lo refinara) | Tiempo objetivo |
|---|---|---|
| Landing | "Conocete mejor en 20 minutos. Sin tonterias." | — |
| Onboarding 1 | "Lo que vamos a hacer + cuanto dura + lo que no es" | 30 s |
| Registro | "Tu email + acepta el consentimiento" | 30 s |
| Magic link | "Revisa tu correo (5 min ventana)" | 1-5 min wait |
| Onboarding final | "Bienvenido. Vamos por 4 cuestionarios cortos." | 30 s |
| Flourishing | 8 items, 2-3 min | 2-3 min |
| O*NET IP SF | 60 items, 3-5 min | 3-5 min |
| BFI-2-S 30 | 30 items, 3-5 min + NFR-27 | 3-5 min |
| PERMA-Profiler | 23 items, 4-5 min | 4-5 min |
| Quality validator | Async ≤1 s | 1 s |
| Espera reporte | Loader + skeleton, ≤3 s | ≤3 s |
| Reporte | Lectura sin friccion + CTA | 5-10 min de lectura |

### 5.3 Decisiones de orden y por que

| Posicion | Instrumento | Razon |
|---|---|---|
| 1 | Flourishing (2-3 min) | Corto, marco positivo. Construye momentum. Aclimata al formato Likert 1-5 y al estilo del producto. |
| 2 | O*NET IP SF (3-5 min) | Engaging (preguntas sobre actividades concretas tipo "Construir una casa", "Disenar una app"). Cambio de registro vs Flourishing. |
| 3 | BFI-2-S 30 (3-5 min) | El instrumento mas "meaty" cuando el usuario ya esta en flujo. Items mas abstractos requieren mayor atencion. NFR-27 entra aqui (faceta Depresion del Neuroticismo). |
| 4 | PERMA-Profiler (4-5 min) | Cierre con marco eudaimonico-positivo. Items emocionales pueden activar NFR-27 si aplica. Termina con sentido de logro. |

### 5.4 Save & resume

- Cada respuesta del usuario se persiste a la DB en `item_response` al momento de seleccion (no al fin del instrumento).
- Si el usuario abandona y regresa via magic link nuevo o sesion activa, retoma en el ultimo item respondido del instrumento en curso.
- Banner persistente "Continuar donde lo dejaste" cuando hay sesion en progreso.
- Sesion en progreso expira a los 30 dias de inactividad (con email recordatorio al dia 7 y dia 21).

### 5.5 Manejo de error y casos borde

| Caso | Comportamiento |
|---|---|
| Email no llega magic link | Boton "Reenviar magic link" + opcion "Cambiar email". |
| Usuario menor de 18 declarado | Bloqueo amable: "DescubreMe v1.5 es para mayores de 18. Pronto tendremos version familiar." Borrado de datos parciales. |
| Browser/conexion cae a mitad | Save & resume cubre. Usuario retoma en mismo item. |
| Patron unico extremo (aquiescencia) | Quality validator marca pero el flow no se interrumpe. Disclaimer en reporte + opcion de re-tomar. |
| Tiempo atipico (sesion <30% del estimado) | Quality validator marca. Mismo manejo que aquiescencia. |
| Usuario activa NFR-28 (umbral cruzado) | Mensaje empatico + lineas Colombia + opcion de continuar o pausar. NO bloquea el reporte. |
| Sesion abandonada >30 dias | Email "tus datos siguen aqui — quieres terminar?" + opcion eliminar. |

---

## 6. Los 4 instrumentos del Free

Detalle por instrumento. Las reglas de scoring y baremos especificos viven en los implementation packs.

### 6.1 Flourishing Scale (Diener)

| Campo | Valor |
|---|---|
| Items | 8 |
| Tiempo estimado | 2-3 min |
| Escala | Likert 1-7 (anclajes: muy en desacuerdo a muy de acuerdo) |
| Sensitivity | None |
| ethical_flags | Ninguno especial |
| NFR-27 trigger | No |
| Adaptacion es-CO | Validar con Cowork rol Investigador para muestra Colombia (referenciar dossier) |
| Output Free | Score sintetico de florecimiento + banda (bajo / medio / alto). Sin facetas. |
| Licencia | Diener Education Fund, libre con atribucion. Estado: bajo, no bloqueante. |
| Dossier | `03_dossiers/04_Flourishing_Consolidado.md` (verificar nombre exacto) |
| Pack | Pendiente — bloquea Sprint 2 |

### 6.2 O*NET Interest Profiler Short Form (IP SF)

| Campo | Valor |
|---|---|
| Items | 60 |
| Tiempo estimado | 3-5 min |
| Escala | Like / unsure / dislike (3 puntos) |
| Sensitivity | None |
| ethical_flags | Ninguno |
| NFR-27 trigger | No |
| Adaptacion es-CO | Existente, validar tono y vocabulario laboral colombiano |
| Output Free | Codigo Holland top 3 (ej. SAE = Social, Artistico, Emprendedor). Sin mapeo a ocupaciones especificas. |
| Licencia | Dominio publico O*NET (Departamento del Trabajo EE.UU.). No bloqueante. |
| Dossier | `03_dossiers/25_O-NET-IP-SF_Consolidado.md` |
| Pack | No requiere pack (items publicos). Cargar items como seed. |

### 6.3 BFI-2-S 30 (Big Five Inventory-2 Short)

| Campo | Valor |
|---|---|
| Items | 30 |
| Tiempo estimado | 3-5 min |
| Escala | Likert 1-5 |
| Sensitivity | Items de Depresion (faceta del Neuroticismo): sensitivity = emotional_distress |
| ethical_flags | emotional_distress en el instrumento |
| NFR-27 trigger | Si (pre + post) |
| NFR-28 trigger | Si umbral configurable en faceta Depresion + Neuroticismo total |
| Adaptacion es-CO | Gallardo-Pujol et al. (2022) Espana como base; piloto cognitivo Colombia recomendado |
| Output Free | 5 dominios Big Five con score + banda. **Sin facetas.** (Facetas son Paid.) |
| Licencia | Soto-John (Colby College). Bloqueante: R-01. |
| Dossier | `03_dossiers/01_BFI-2_Consolidado.md` |
| Pack | `04_implementation_packs/BFI-2-S_v1.0...md` (listo) |

### 6.4 PERMA-Profiler

| Campo | Valor |
|---|---|
| Items | 23 (15 PERMA core + 8 distractor / control) |
| Tiempo estimado | 4-5 min |
| Escala | Likert 0-10 |
| Sensitivity | Items de afecto negativo y soledad: sensitivity = emotional_distress |
| ethical_flags | emotional_distress |
| NFR-27 trigger | Si (pre + post) |
| NFR-28 trigger | Si Negative Emotion alto + Positive Emotion bajo |
| Adaptacion es-CO | Chaves (2018) base; validar tono Colombia. |
| Output Free | 5 pilares (P-E-R-M-A) con score + banda. Sin sub-analisis detallado (eso es Paid). |
| Licencia | UPenn / The Wellbeing Lab. Bloqueante (en zona gris freemium, requiere acuerdo). |
| Dossier | `03_dossiers/23_PERMA-Profiler.md` (verificar nombre exacto) |
| Pack | Pendiente |

### 6.5 Reglas comunes para los 4

- Items se presentan uno a la vez (mobile-first). Para escritorio, opcion "ver de a 5" en setting avanzado del usuario (decision diferida).
- Cada respuesta requiere selecion explicita (no continuar sin respuesta).
- Boton "no se / prefiero no responder" disponible solo si el instrumento lo permite (Free v1.5: no permitido, fuerza respuesta. Reconsiderar en v1.6 si dropoff es alto).
- Boton "pausar" persistente. Salir guarda y permite retomar.
- Items inversos (R) se recodifican en backend, no en UI (el usuario no ve marcas de "este es inverso").

---

## 7. El reporte Free

### 7.1 Estructura del reporte

Una sola pagina larga con scroll, no carrusel ni paginacion (mejor para SEO indirecto y para que el usuario pueda compartirlo via screenshot si quiere).

| Seccion | Contenido | Layers |
|---|---|---|
| **A. Hero** | "Tu perfil DescubreMe — Free" + nombre + fecha + boton imprimir | — |
| **B. Disclaimer general** | "Esto es educativo, no diagnostico. Si experimentas malestar..." | Base |
| **C. Florecimiento** | Score Flourishing + banda + 1 frase narrativa | Base + Free |
| **D. Personalidad** | 5 dominios Big Five con score, banda, 1 frase narrativa por dominio | Base + Free |
| **E. Intereses RIASEC** | Codigo Holland top 3 + 1 frase descriptiva por tipo. Sin lista de ocupaciones. | Base + Free |
| **F. Bienestar PERMA** | 5 pilares con score + banda + grafico radial simple | Base + Free |
| **G. Mitigaciones / disclaimer** | Si NFR-28 se activo: lineas Colombia + sugerencia profesional. Si quality_flags se activaron: nota + opcion de re-tomar. | Base |
| **H. CTA Paid** | "Quieres profundizar?" + 3 bullets de que anade Paid + boton "Conocer Paid USD 19" + 1 frase sobre garantia de refund 30 dias | — |
| **I. Footer** | Atribucion de instrumentos (BFI-2 by Soto & John; PERMA by Butler & Kern; Flourishing by Diener; O*NET por Departamento del Trabajo EE.UU.) + version DescubreMe + link a politica de privacidad + opcion eliminacion | Base |

### 7.2 Microcopy de bandas (placeholders, UX Writer refinara)

Por dominio, 3 textos (low / medium / high) en es-CO, cordial profesional, sin tono motivacional vacuo, sin lenguaje clinico.

**Ejemplo BFI-2-S — Extraversion banda alta:**

> "Tu puntaje en Extraversion sugiere que tiendes a buscar y disfrutar la interaccion social, te energizas con ambientes estimulantes y sueles tomar la iniciativa en grupos. Esto no es 'mejor' ni 'peor' que otra configuracion: es una manera de funcionar."

**Ejemplo BFI-2-S — Neuroticismo banda alta:**

> "Tu puntaje en Neuroticismo sugiere que experimentas las emociones con intensidad, especialmente las dificiles. Esto puede traer sensibilidad para captar matices que otros pierden, y tambien fatiga cuando hay mucha incertidumbre. Si sientes que la intensidad emocional afecta tu dia a dia, considera consultar con un profesional de la salud mental — no por etiqueta, sino por apoyo concreto."

**Reglas para el copy:**

- Nunca usar el termino "alto / bajo en X" como etiqueta de identidad ("eres una persona X").
- Siempre marcar variabilidad ("sueles", "tiendes a", "en general").
- Para constructos sensibles (Neuroticismo, Negative Emotion PERMA), incluir un puente a NFR-28.
- Sin frases motivacionales tipo "tu fortaleza es...".

### 7.3 Lo que NO va en el reporte Free

- Facetas detalladas del BFI-2.
- Lista de ocupaciones O*NET sugeridas (eso es Paid).
- Comparativos vs media LATAM o pais.
- Recomendaciones de carrera, libros, cursos.
- Score numerico crudo (raw_score). Solo banda + posicionamiento cualitativo.
- Predicciones de comportamiento futuro.

### 7.4 Acceso al reporte

- Reporte vive en `/reporte/free/<user_id>` con auth obligatorio.
- Email transaccional al completar: "Tu reporte esta listo + link directo".
- Re-acceso ilimitado mientras el usuario tenga cuenta.
- Boton "Eliminar mi reporte y datos" visible al pie con confirmacion en 2 pasos.

---

## 8. Mecanica de conversion a Paid

### 8.1 Decision DD-23 (registrada)

CTA en el reporte + secuencia corta de 2 emails educativos en ventana de 14 dias. Sin teaser durante el flujo, sin urgencia artificial, sin descuento con cuenta regresiva.

### 8.2 Touchpoints

| # | Cuando | Canal | Contenido | Tono |
|---|---|---|---|---|
| 1 | Dia 0 (en el reporte) | In-app | Seccion H del reporte: "Quieres profundizar? Paid suma 14 instrumentos mas, facetas detalladas y mapeo a ocupaciones." Boton claro. | Sobrio, informativo |
| 2 | Dia 0 (post-completion) | Email transaccional | "Tu reporte esta listo + link" + footer corto sobre Paid (no es el foco) | Cordial |
| 3 | Dia 2-3 | Email educativo | Ejemplo concreto: "Tu BFI-2-S te mostro 5 dominios. En Paid esos 5 se descomponen en 15 facetas con interpretacion. Aqui un ejemplo real de un usuario hipotetico". | Educativo |
| 4 | Dia 10-14 | Email cierre | "Recapitulacion + lo que veriamos juntos + boton claro". Opt-out visible. | Cordial, opt-out facil |

### 8.3 Frecuencia y opt-out

- 4 touchpoints en 14 dias. Despues, ningun email transaccional / promocional sin re-engagement explicito del usuario.
- Opt-out del marketing en 1 click desde cualquier email + desde el perfil.
- El consentimiento marketing es opt-in (no pre-marcado) y separado del consentimiento producto. Si el usuario solo acepto producto, solo recibe el #2 (transaccional "tu reporte esta listo"). No recibe #3 ni #4.

### 8.4 Reglas eticas

- Cero urgencia artificial.
- Cero falsa escasez ("solo X cupos").
- Cero garantia de exito ("este reporte cambiara tu vida").
- Cero descuento con countdown.
- Si se ofrece descuento, tiene que ser por razon real (lanzamiento, fundador, beta) y con criterio igual para todos.

### 8.5 Que se mide (entra a §9)

- Click-through CTA del reporte.
- Open rate de los 2 emails educativos.
- Click-through del email cierre.
- Conversion a Paid a 14 dias.
- Conversion a Paid a 30 dias.
- Conversion a Paid a 90 dias (delayed).

---

## 9. Metricas especificas Free

Subset de las metricas del PRD_MAESTRO §7 con detalle especifico Free.

### 9.1 Funnel completo

| Etapa | Metrica | Objetivo v1.5 |
|---|---|---|
| Landing → click "Empezar" | CTR de landing | ≥15% (supuesto) |
| Click → email submitted | Tasa de submit | ≥40% (supuesto) |
| Email submitted → magic link clicked | Activacion auth | ≥60% en 30 min |
| Magic link → primer instrumento iniciado | Activacion instrumento | ≥90% |
| **Primer instrumento iniciado → reporte completo** | **Completion Free (norte)** | **≥40%** |
| Reporte visto → CTA Paid clic | CTR del CTA | ≥10% |
| Reporte visto → compra Paid 14d | Conversion Free→Paid 14d | ≥3% |
| Reporte visto → compra Paid 30d | Conversion Free→Paid 30d | ≥5% |
| Reporte visto → compra Paid 90d | Conversion Free→Paid 90d | ≥7% |

### 9.2 Calidad

| Metrica | Objetivo |
|---|---|
| Dropoff por instrumento | ≤15% por instrumento |
| % sesiones con quality_flag | ≤10% |
| % sesiones con NFR-28 activado | Monitorear; no hay objetivo cuantitativo (depende de poblacion) |
| Alpha minimo por escala en muestra real | ≥0.70 (gate psicometrico, no negociable) |

### 9.3 Engagement post-completion

| Metrica | Objetivo |
|---|---|
| Re-acceso al reporte en 7 dias | ≥30% |
| Re-acceso al reporte en 30 dias | ≥15% |
| % usuarios que re-toman Free despues de 90 dias | TBD (supuesto 5-10%) |
| % usuarios que ejercen derecho de eliminacion | <2% (si es mayor, indica problema de confianza) |

### 9.4 Tecnico-operativo

| Metrica | Objetivo |
|---|---|
| TTFB landing | ≤500 ms p95 |
| LCP landing | ≤2.5 s p95 |
| Item-to-item render | ≤150 ms p95 |
| Generacion de reporte | ≤3 s p95 |
| Error rate 5xx | ≤0.5% |

### 9.5 Dashboard de seguimiento

Claude Code debe instrumentar desde Sprint 0 los eventos: `signup`, `consent_accepted`, `instrument_started`, `instrument_item_answered`, `instrument_completed`, `quality_flag_raised`, `nfr28_triggered`, `report_viewed`, `cta_paid_clicked`, `paid_purchase_completed`, `account_deleted`. Ver A2 §8 NFR-O1.

---

## 10. NFRs aplicables especificos Free

Lista de NFRs del anexo A2 que tocan a Free. No reescribir el detalle; aqui solo el subset relevante.

| NFR | Aplica a Free? | Notas Free especificas |
|---|---|---|
| **NFR-P1** TTFB / FCP | Si | Landing y reporte son los puntos criticos |
| **NFR-P2** Render item-to-item | Si | Critico para evitar dropoff en flow |
| **NFR-P3** Scoring | Si | Materializado al completar sesion |
| **NFR-P4** Generacion reporte | Si | ≤3 s |
| **NFR-S1** Auth magic link | Si | Default v1.5. Rate-limit 5 magic links / IP / hora |
| **NFR-S2** TLS 1.3+ | Si | Obligatorio |
| **NFR-S3** Cifrado en reposo | Si | item_response, computed_score, consent_log |
| **NFR-Priv1** Consentimiento versionado | Si | Granular: producto + marketing |
| **NFR-Priv2** Eliminacion ≤2 clicks | Si | Disponible desde perfil |
| **NFR-Priv3** Acceso / portabilidad | Si | Export JSON / CSV |
| **NFR-Priv4** Audit log inmutable | Si | Para item_response y computed_score |
| **NFR-Priv5** Datos sensibles identificados | Si | BFI-2 + PERMA tienen items emocionales |
| **NFR-27** Disclaimer no-clinico | **Si** | Trigger en BFI-2 y PERMA. Pre + post. |
| **NFR-28** Ruta de contencion | **Si** | Trigger en BFI-2 (Depresion/Neuroticismo) y PERMA (Negative Emotion). Lineas Colombia. |
| **NFR-35** Retrocompat | No aplica v1.5 (sera relevante en M1 cuando llegue) | — |
| **NFR-A1 WCAG AA** | Si | Cuestionario + reporte + eliminacion |
| **NFR-A2 Mobile** | Si | LATAM = smartphone-first |
| **NFR-A3 Lenguaje claro** | Si | Items en MCER ≤B1, validar piloto cognitivo |
| **NFR-O1** Event tracking | Si | Funnel completo desde Sprint 0 |
| **NFR-O2** Logs estructurados | Si | Sin loggear raw_value ni scores |
| **NFR-O3** Alertas operativas | Si | Critico: si NFR-28 falla, alarma inmediata |
| **NFR-i18n1** es-CO / es-MX / en | Si | es-CO default |
| **NFR-Auditoria licencia** | Si para BFI-2 y PERMA | usage_log + CSV mensual a titulares |
| **NFR-Calidad psicometrica** | Si | Alpha ≥0.70 por escala antes de mostrar resultado |
| **NFR-Reproducibilidad** | Si | scoring_engine_version en cada computed_score |
| **NFR-Backup** | Si | RPO ≤24 h |

---

## 11. Compliance y consentimiento Free

Referencia principal: `02_producto/anexos/A4_ETICA_COMPLIANCE.md`.

### 11.1 Consentimientos a producir para Free

Cowork rol UX Writer + asesor legal externo redactan:

1. **Consentimiento producto Free** (obligatorio para usar Free): identidad responsable, datos recogidos (email, respuestas, scores), finalidades (autoconocimiento educativo, no clinico, no seleccion), terceros (Supabase, titulares de licencia recibe agregados anonimizados), tiempo de conservacion (indefinido con derecho de eliminacion), derechos del titular, canal de queja Superintendencia, no-clinico explicito.
2. **Consentimiento marketing** (opcional, opt-in separado): consentir recibir los 2 emails educativos post-Free + futuras comunicaciones de producto. Revocable en 1 click.

### 11.2 Templates a redactar antes de Sprint 0

| Template | Estado | Owner |
|---|---|---|
| Politica de privacidad publica | Pendiente | Asesor legal + German |
| Terminos de servicio | Pendiente | Asesor legal + German |
| Consent template Free producto v1.0 | Pendiente | Asesor legal + Cowork UX Writer |
| Consent template marketing v1.0 | Pendiente | Asesor legal + Cowork UX Writer |
| Texto NFR-27 pre-test sensible | Pendiente | Cowork UX Writer + Investigador |
| Texto NFR-27 post-test sensible | Pendiente | Cowork UX Writer + Investigador |
| Texto NFR-28 ruta de contencion | Pendiente | Cowork UX Writer + Investigador |
| Footer atribucion BFI-2, PERMA, Flourishing, O*NET | Pendiente | Cowork + acuerdo con titulares |

### 11.3 Manejo de menores

Validacion por fecha de nacimiento en registro. Si <18: bloqueo amable + borrado de datos parciales + email "no podemos atenderte aun, edad minima 18".

### 11.4 Derecho de eliminacion

Accesible desde el perfil con confirmacion en 2 pasos. Borrado efectivo en ≤72 h. Email de confirmacion. Logs de auditoria del borrado preservan metadata pero NO los datos del usuario.

---

## 12. Riesgos especificos Free

Subset del A5 que aplica a Free.

| ID | Riesgo | Impacto en Free | Mitigacion |
|---|---|---|---|
| **R-01** | Licencia BFI-2 no se obtiene | Critico: bloquea Free completo | Plan B: HEXACO-60 (requiere re-diseno de reportes para 6 factores) |
| **R-04** (extendido) | Licencia PERMA no se obtiene | Critico: bloquea Free completo | Plan B: combinacion SWLS + Flourishing + Ryff corta (perdida del modelo PERMA unificado) |
| **R-05** | Ley 1581 sin asesor | Critico: no lanzar sin esto | Contratar pre-Sprint 1 |
| **R-09** | PRDs toman mas de 4 semanas | Atrasa Sprint 0 → atrasa Free | Mantener foco en Free como primer sub-PRD |
| **R-11** | Completion bajo por fatiga | Aplica a Free aunque menos critico (12-18 min vs 95-130 min Paid) | Save & resume + transiciones cortas + microcopy de progreso |
| **R-13** | Quality validator mal calibrado | Falsos positivos bloquean reporte legitimo | Umbrales conservadores iniciales + recalibracion Sprint 6 |
| **R-15** | Consentimiento granular inadecuado | Riesgo legal | Templates revisados por asesor (R-05) |
| **R-16** | Fallo NFR-28 | Reputacional + dano usuario | Alertas operativas si NFR-28 falla cuando deberia activarse |
| **R-17** | Implementation packs cuello de botella | Bloquea Sprint 1-2-3 | Cowork debe entregar packs Flourishing + PERMA antes de Sprint 2 |

Riesgo especifico Free no documentado en A5: el reporte sintetico Free puede percibirse como "demasiado poco" si la microcopy no comunica bien el valor. Mitigacion: piloto cognitivo del reporte con 5-10 usuarios antes de lanzar.

---

## 13. Gates de release Free

Free no lanza sin estos checks. Aplican los 3 gates del PRD_MAESTRO §10 con concreto Free.

### Gate 1 — Psicometrico

- [ ] BFI-2-S: alpha ≥0.70 en muestra LATAM real n≥200 (gate del lanzamiento).
- [ ] Flourishing: alpha ≥0.70 en muestra LATAM real.
- [ ] O*NET IP SF: alpha o consistencia por escala RIASEC ≥0.70.
- [ ] PERMA: alpha por pilar ≥0.70.
- [ ] Baremos cargados para CO y MX. Fallback INTL con disclaimer.
- [ ] Quality validator activo con umbrales configurados.
- [ ] Scoring rules auditadas vs publicaciones originales.

### Gate 2 — Compliance

- [ ] Consent template Free producto v1.0 firmado por asesor legal.
- [ ] Consent template marketing v1.0 firmado por asesor legal.
- [ ] NFR-27 disclaimer activo para BFI-2 + PERMA.
- [ ] NFR-28 ruta de contencion configurada con lineas Colombia vigentes.
- [ ] Cifrado en reposo verificado.
- [ ] Derecho de eliminacion en ≤2 clicks funcional.
- [ ] Politica de privacidad publica publicada.
- [ ] RNBD ante Superintendencia (si aplica por volumen / razon social).
- [ ] Revision legal externa firmada y archivada en `06_compliance/`.

### Gate 3 — Licencia

- [ ] Soto-John (BFI-2): acuerdo escrito archivado en `05_licencias/`.
- [ ] UPenn / Wellbeing Lab (PERMA): acuerdo escrito archivado.
- [ ] Diener Education Fund (Flourishing): confirmacion de uso libre + atribucion.
- [ ] O*NET: no requiere acuerdo (dominio publico) pero atribucion del Departamento del Trabajo EE.UU. en footer.
- [ ] Atribucion en reporte de cada instrumento.
- [ ] usage_log activo para BFI-2 y PERMA + export CSV mensual al titular.

---

## 14. Dependencias y bloqueadores para iniciar implementacion

Antes de que Claude Code pueda empezar a codear Free, los siguientes items deben estar listos:

| Dependencia | Owner | Estado | Sprint que la necesita |
|---|---|---|---|
| Implementation pack Flourishing | Cowork | Pendiente | Sprint 2 |
| Implementation pack O*NET IP SF (seed de items) | Cowork | Pendiente | Sprint 1 |
| Implementation pack BFI-2-S v1.0 | Cowork | **Listo** | Sprint 3 |
| Implementation pack PERMA-Profiler | Cowork | Pendiente | Sprint 6 |
| Acuerdo licencia BFI-2 | German | Pendiente | Sprint 3 |
| Acuerdo licencia PERMA | German | Pendiente | Sprint 6 |
| Asesor legal Ley 1581 contratado | German | Pendiente | Pre-Sprint 1 |
| Consent templates redactados | Asesor + Cowork | Pendiente | Sprint 0-1 |
| Microcopy del flow Free (onboarding, transiciones, errores) | Cowork UX Writer | Pendiente | Sprint 1-2 |
| Microcopy del reporte (bandas, atribucion, CTA) | Cowork UX Writer | Pendiente | Sprint 2 |
| Texto secuencia emails educativos (2 emails post-Free) | Cowork UX Writer | Pendiente | Sprint 2 |
| Region hosting Supabase decidida | German | Pendiente | Pre-Sprint 0 |
| Decision plan de pricing Paid validado (para que el CTA del reporte sea correcto) | German | USD 19 confirmado en maestro; equivalente COP TBD | Sprint 2 |

---

## 15. Open questions / decisiones pendientes

Decisiones que no se cierran en este PRD y deben resolverse en sprints siguientes o con datos reales.

| # | Pregunta | Cuando decidir | Quien decide |
|---|---|---|---|
| OQ-1 | Permitir compartir reporte en redes (LinkedIn, IG)? Si si, formato visual (imagen tipo Spotify Wrapped vs link)? | Sprint 6 con dato de viral coefficient | German + Cowork rol PM |
| OQ-2 | Boton "no se / prefiero no responder" en items? | Sprint 6 si dropoff por item es >objetivo | Cowork rol Investigador + UX |
| OQ-3 | Vista "ver 5 items a la vez" en desktop? | Sprint 10 con dato real de patrones de respuesta | Cowork UX |
| OQ-4 | Onboarding con video corto (30 s) en lugar de pantalla con texto? | Sprint 6 si activacion <objetivo | Cowork rol PM |
| OQ-5 | Equivalente COP / MXN del Paid en el CTA Free | Pre-Sprint 6 | German |
| OQ-6 | Marketing email a usuarios que se quedan en Free >6 meses sin convertir (re-engagement) | Q4 2026 | German + Cowork |
| OQ-7 | Free como producto B2C para usuario empleado de cliente B2B-A (mismo usuario, distinto contexto)? | Pre-Sprint 7 | Cowork rol PM |
| OQ-8 | Que pasa con usuarios que pidieron eliminacion y vuelven? Re-onboarding completo o restauracion parcial? | Pre-Sprint 1 con asesor legal | German + asesor |

---

## 16. Changelog del PRD

| Version | Fecha | Autor | Cambios |
|---|---|---|---|
| 1.0 | 2026-05-13 | Cowork rol PM + German | Version inicial. Decisiones DD-21 (una sentada con save & resume), DD-22 (email + magic link antes del primer instrumento), DD-23 (CTA en reporte + 2 emails educativos en 14 dias), DD-24 (retake permitido despues de 90 dias + retencion indefinida + derecho de eliminacion). |

---

*Fin del PRD_B2C_Free_v1.5 v1.0. Documento vivo. Actualizar al cierre de cada sprint que toque Free o cuando aparezcan datos reales que cambien las decisiones de diseno. Cualquier cambio relevante debe registrarse en este changelog y en `01_estado/DECISIONS_LOG.md`.*
