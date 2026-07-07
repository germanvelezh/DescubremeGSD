# INVESTIGACIÓN DE MERCADO — UX/UI de productos de autoconocimiento y qué adopta DescubreMe

**Fecha:** 2026-06-29
**Autor (Cowork):** [Rol: UX Researcher + Estratega de producto]
**Método:** investigación multi-fuente (5 frentes en paralelo: directos psicométricos, reportes premium, adyacentes de UX clase mundial, B2B/organizacional, dark patterns + LATAM + benchmarks). Fuentes primarias (páginas de producto, FTC, NN/g, Culture Amp, Gallup, growth.design) sobre secundarias. Citas con URL al final.
**Alcance:** las 4 etapas del embudo (adquisición, loop de test, reveal de resultados, conversión free→paid) + B2B.
**Para qué sirve:** alimenta el `BLUEPRINT_EXPERIENCIA_v1.0.md` y el `DIAGNOSTICO_Y_PLAN_v1.0.md` con prácticas de mercado validadas y anti-patrones a evitar.
**Nota de honestidad:** marco `Hecho` / `Inferencia` / `Opinión profesional`. Donde una cifra viene de reseñas o quejas (no de fuente primaria), lo digo. Dos agentes detectaron un intento de prompt-injection en el sitio de reseñas *Soultrace*; se ignoró y ese sitio no se usa como fuente confiable.

---

## 0. Resumen ejecutivo

`Hecho:` el patrón ganador y a la vez ético del mercado es **mostrar un resultado real gratis y cobrar la profundidad**, no el resultado. La palanca estratégica #1 es **dónde se pide la cuenta/email**: los más limpios (16Personalities, Truity) no piden nada para empezar ni para ver el resultado base; los más fricionantes (VIA, CareerExplorer) fuerzan registro antes, y CareerExplorer además pide datos sensibles a mitad del test (el peor patrón de costo hundido del set).

`Hecho:` el "wow" es casi universal: **reveal visual primero, por capas** (tipo/etiqueta + barras o rueda de color como resumen, narrativa debajo). El valor premium se construye con **frases personalizadas por combinación** de puntajes (no texto por rasgo), **acción + puntos ciegos**, un **PDF descargable** y **nombrar el rigor** (citar el instrumento) en el copy de venta.

`Hecho:` los mejores onboarding (Duolingo, Headspace, Calm) **capturan el "por qué" con 3-4 preguntas antes de pedir cuenta**, entregan valor antes del registro, enmarcan metas en positivo (no en déficit), parten los flujos largos en pasos cortos y usan momentum **sin loss-aversion** (un día perdido es recuperable, no un fracaso).

`Hecho:` en B2B, el modelo de confidencialidad de **Culture Amp** es la referencia: **mínimo de grupo n≥5 por defecto + protección contra identificación indirecta** (oculta el grupo adyacente más pequeño para impedir el cálculo inverso). Gallup aporta la postura ética más fuerte ("desarrollo, no selección"). **Pymetrics es el caso aleccionador**: se promocionó "bias-free", pasó la regla 4/5 de la EEOC y aun así un estudio de Stanford 2026 halló disparidades raciales.

`Hecho (benchmarks):` el abandono sube fuerte pasados **7-8 minutos** y **~20 preguntas**; la complejidad pesa más que la longitud; las barras de progreso ayudan **solo si el progreso avanza rápido** (si avanza lento, empeoran el abandono).

`Opinión profesional (white space):` ningún player combina **psicometría validada y transparente + adaptación es-CO/LATAM + embudo sin dark patterns**. Ese cruce es exactamente el posicionamiento de DescubreMe. Las tres cosas que ya decidiste (resultados híbridos, consentimiento "aceptar y listo", cero manipulación) están alineadas con la mejor práctica del mercado; este informe las respalda con evidencia y las afina.

---

## 1. Panorama del mercado

`Hecho:` la categoría se ordena en cinco grupos:

| Grupo | Ejemplos | Modelo dominante |
|---|---|---|
| Tipológicos masivos | 16Personalities, Truity, Crystal | Freemium: resultado base gratis sin email → se cobra la profundidad (PDF, facetas, carrera) |
| Rigor "premium-first" | Understand Myself, CliftonStrengths | Pago por adelantado; el rigor/normativa ES la propuesta de valor |
| Fortalezas | VIA, HIGH5, CliftonStrengths | Lista base gratis (o pago) + reportes de profundidad/equipo |
| Carrera/vocacional | CareerExplorer, Truity Career, MyPlan | Tests largos + match ocupacional; registro temprano frecuente |
| B2B / people analytics | Gallup Teams, Culture Amp, Plum, Pymetrics | Doble destinatario; agregado para la empresa |

`Inferencia:` DescubreMe es el único que intenta unir varios de estos (personalidad + intereses + valores + bienestar + fortalezas + sentido) en **un integrador**, con rigor transparente y adaptación local. Eso es diferenciador, pero también el mayor riesgo de fatiga (ver §5 benchmarks).

---

## 2. Teardown por producto

### 2.1 Directos psicométricos (B2C)

| Producto | ¿Pide cuenta antes? | Test | Reveal | Free vs Paid | Precio (USD, 2025-26) |
|---|---|---|---|---|---|
| **16Personalities** | No (anónimo; signup opcional) | ~60 ítems, ~12 min, slider 7 pt, barra % | Visual primero, por capas; tipo + arquetipo + barras | Tipo completo gratis; "viste ~5%" | Career Suite **$29** una vez; 30 días money-back |
| **Truity** | No (resultado base gratis, reporte después) | TypeFinder 130 ítems "Paso X de 8"; Big Five 60 ítems | Resumen gratis → reporte ~30 pp | Carrera, percentiles, PDF detrás del pago | **$19** por reporte (una vez); $9 estudiante |
| **Understand Myself** | Pago primero (sin free) | 100 ítems, ~10-20 min, 10 aspectos Big Five | Percentiles vs muestra de 10.000; reporte ~16 pp | Sin free; precio plano sin upsell | **$9.95** |
| **VIA** | Sí (registro obligatorio) | 96 ítems, ~12-15 min, Likert 5 pt | Ranking gratis de las 24 fortalezas | Reportes de profundidad detrás del pago | Top 5 **$19**; Total 24 **$49** |
| **Crystal (DISC)** | No para el test; sí para guardar | 28 ítems, ~5 min, instantáneo; rueda DISC | Tipo + arquetipo + barras % | Perfil gratis acotado; predice perfiles ajenos | **$99/año**; planes B2B $49-59/mes |
| **CareerExplorer** | Sí (email antes de empezar) | 30-90 min, 150+ rasgos, pide demografía a mitad | Arquetipo + 1.500+ matches por % | Matches base "gratis"; profundidad paga | ~**$48/año** (medio: dato JS, ver confianza) |

`Banderas éticas (Hecho):` Crystal predice perfiles de terceros que no consintieron desde su LinkedIn (la violación ética más clara para un producto de autoconocimiento). CareerExplorer pide nombre, edad, género, etnia, ingreso a mitad del test (costo hundido + datos sensibles). 16Personalities reporta "91,2% de precisión" (falsa precisión científica) y hay **quejas de usuarios en Trustpilot** sobre cobros poco claros/suscripción — esto **contradice** su framing oficial de pago único; trátese como señal de cautela, no como hecho verificado (ver §4 y nota de confianza).

`Exemplar ético (Opinión):` **Understand Myself** — precio plano, sin upsell, sin urgencia, feedback franco no adulador, instrumento y muestra nombrados. Es el más cercano a los principios de DescubreMe.

### 2.2 Reportes premium (cómo justifican el precio)

| Producto | Estructura del reporte | Dispositivos de "alto valor" | Precio (USD, 2026) |
|---|---|---|---|
| **CliftonStrengths** | Top 5 → 34 completo en 4 dominios con color | **Frases personalizadas por combinación** ("1 en 33M comparte tu Top 5"); plan de acción; PDF; app | Top 5 **$24.99**; 34 **$59.99**; upgrade **$49.99** |
| **16P Premium** | Guía de carrera ~40 pp por tipo | Narrativa personalizada intensa; 5 "mentores IA"; generadores CV; PDF | Career Suite **$29**; Pro ~$39 |
| **HIGH5** | Top 5 gratis → reporte de desarrollo | Estrategias accionables por fortaleza; **análisis de interacción** entre fortalezas | Full ≈ **$29** |
| **Truity** | Resumen gratis → reporte 10+ pp PDF | Doble modelo (Big Five + Holland); "tareas que amarás/evitarás"; PDF | $9-29 según test |
| **Plum** | Perfil individual **gratis** (es B2B) | Match score contra el rol (lado empresa) | Sin reporte B2C pago; enterprise por asiento |

`Patrón clave (Hecho):` lo que se cobra no es "el resultado" sino **profundidad aplicada** (acción + puntos ciegos + match + PDF). El upsell es **vertical y por caso de uso** (single → integrado → equipo/coaching), casi siempre **pago único, no suscripción**.

### 2.3 Adyacentes de UX clase mundial (qué robar)

| App | Qué hace excepcional | Qué adoptar |
|---|---|---|
| **Duolingo** | Pospone el signup; ~7 preguntas de motivación antes de cuenta; flujos largos segmentados (Zeigarnik); "happy path" más fácil al inicio | Gradual engagement; pedir cuenta en un breakpoint lógico, no al inicio |
| **Headspace** | 3 preguntas (~1 min) que arman un plan; ancla hábitos a rutinas; día perdido enmarcado suave; quitó datos científicos del onboarding por "abrumar" | Recap personalizado como payoff; framing positivo; momentum sin culpa |
| **Calm** | Valor en el splash ("take a deep breath" antes de cualquier setup); pantallas de tarea única | Value-first; una sola acción siguiente recomendada (evitar choice overload) |
| **Finimize** | Template fijo "Qué pasa / Qué significa / Por qué te importa"; tope de 2 historias; voz plain-English | **Template de 3 partes para revelar cada constructo**; tope de ítems por pantalla |

`Anti-patrón clave (Hecho):` la pérdida de racha (loss-aversion) de Duolingo es la causa #1 de abandono citada por un ex-Head of Growth; el microcopy que avergüenza está catalogado por NN/g como dark pattern. Para un producto que toca señales de malestar (PANAS, BPNSFS), esto es incompatible.

### 2.4 B2B / organizacional

| Producto | Empleado ve | Empresa ve | Umbral de anonimato | Postura ética |
|---|---|---|---|---|
| **Culture Amp** | "Confidencial, no anónimo" (declarado) | Heatmaps agregados, tendencias | **n≥5 por defecto + protección de identificación indirecta** (3 niveles) | Reglas de reporte bloqueadas pre-lanzamiento |
| **CliftonStrengths Teams** | Reporte individual propio | **Team Grid con nombres** (identificado, no anónimo) | Ninguno (es identificado por diseño); gratis hasta 5 | "Desarrollo, no selección"; prohíbe usar para contratar/promover/despedir; consentimiento para compartir |
| **HIGH5 Teams** | Dashboard de fortalezas | Team Analytics / Culture Map | n≥3 (mínimo **funcional**, no de privacidad) | Desarrollo |
| **Plum** | Perfil portable propio | **Match score por candidato** (selección) | N/A (individual por diseño) | Identificadores separados del contenido |
| **Pymetrics/Harver** | Feedback de ajuste | Ranking de candidatos | N/A | **Caso aleccionador:** "bias-free" + pasó regla 4/5, pero Stanford 2026 halló disparidades raciales |

`Hecho:` el modelo a copiar para DescubreMe (desarrollo, agregado, nunca individual al empleador) es **Culture Amp** en confidencialidad + **Gallup** en postura anti-selección. Lo que NO copiar: las vistas identificadas por nombre (Team Grid) salvo consentimiento explícito, y cualquier vista de ranking/selección (Plum, Pymetrics).

---

## 3. Mejores prácticas → cómo lo adoptamos en DescubreMe

`Lectura:` cada práctica está validada por el mercado (fuente) y mapeada a la sección del `BLUEPRINT_EXPERIENCIA_v1.0.md` y a la ola del `DIAGNOSTICO_Y_PLAN`. Adoptamos el **dispositivo estructural**, nunca la retórica (varios usan copy que tu CLAUDE.md prohíbe).

### A. Adquisición / landing

| Mejor práctica (fuente) | Adopción en DescubreMe |
|---|---|
| Captura el "por qué" con 3-4 preguntas antes de pedir cuenta (Duolingo, Headspace, Calm) | Micro-pregunta de intención en la landing ("¿qué quieres entender de ti? general / carrera / bienestar"); se reutiliza en el reveal para cerrar el loop. Blueprint §7.2; nueva micro-feature |
| Valor antes del signup (splash "respira" de Calm) | `Tensión real:` el mercado entrega valor antes de la cuenta, pero DescubreMe pide signup+consentimiento antes de los tests por Ley 1581 (datos sensibles, 18+). `Mitigación:` un "taste no-datos" en la landing —ej. una mini-interacción o un resultado de ejemplo— que dé valor sin recolectar nada, y hacer del signup en sí un momento de valor (magic link, "aceptar y listo"). Blueprint §4, §7.2 |
| Prueba social con número duro + validación (VIA "35M+"; Truity revisor clínico nombrado) | Prueba social honesta: "instrumentos validados", citar el rigor; cuando haya volumen real, mostrar conteo. Sin inventar cifras. Blueprint §7.2 |
| Propuesta de valor emocional en una línea (16P "finally understood") | Titular con carácter ya propuesto: "Conoce a fondo cómo funcionas, sin etiquetas." Blueprint §3.1, §7.2 |

### B. Loop de test

| Mejor práctica (fuente) | Adopción en DescubreMe |
|---|---|
| Segmentar flujos largos en pasos cortos con progreso honesto (Calm, Duolingo Zeigarnik; Truity "Paso X de 8") | O*NET (60 ítems) en bloques temáticos cortos con progreso por bloque; progreso visible "12 de 30" (no `sr-only`). Blueprint §7.5; Diagnóstico Ola 2 |
| El tiempo manda sobre el conteo; complejidad > longitud (SurveyMonkey, Qualtrics) | Comunicar tiempo honesto por test; un ítem/foco por pantalla; lenguaje simple. Blueprint §7.1, §7.5 |
| Pausa/reanudar sin perder nada; retomar exactamente donde quedó | Ya es un activo del producto; conservarlo y hacerlo visible ("guardamos tu avance"). Blueprint §7.5 |

### C. Transiciones / momentum

| Mejor práctica (fuente) | Adopción en DescubreMe |
|---|---|
| Recap personalizado como payoff que valida el esfuerzo (Headspace/Calm "Recommended for you based on your responses") | La pantalla de transición recap + preview que ya diseñamos: "esto descubriste / vas X de 4 / esto sigue". Blueprint §6; Diagnóstico Ola 2 |
| Transición con micro-animación calmada, no apilar prompts en momentos frágiles (growth.design) | Cross-fade + una frase de progreso; cero upsells entre tests. Blueprint §3.4, §6 |
| Momentum sin loss-aversion; un día perdido es recuperable (Headspace vs Duolingo) | Si hay recordatorios, opt-in, atados a la meta declarada, sin culpa ni racha. Blueprint §8 (retorno) |

### D. Reveal de resultados

| Mejor práctica (fuente) | Adopción en DescubreMe |
|---|---|
| Reveal visual primero, por capas (16P, Crystal, Truity) | Ya es el sistema de capas (§5, §8 del blueprint); reforzar "imagen antes que texto". Blueprint §3.5, §5 |
| Template fijo y digerible para contenido intimidante (Finimize "Qué pasa / Qué significa / Por qué te importa") | Cada constructo se revela con 3 partes: "Qué medimos / Qué dice tu resultado / Por qué te importa". Blueprint §5, §12 |
| Frases personalizadas por combinación, no texto por rasgo (CliftonStrengths custom insights; HIGH5 interacción) | El integrador cruza dimensiones (su razón de existir); la frase reveladora es específica por patrón para evitar Barnum. Blueprint §5, §9.3 |
| Una sola acción siguiente recomendada tras el reveal (evitar choice overload, Calm/Iyengar) | Tras el teaser, un solo CTA al Paid; tras cada test, un solo CTA "siguiente". Blueprint §6, §7.7 |

### E. Conversión free→paid

| Mejor práctica (fuente) | Adopción en DescubreMe |
|---|---|
| Free "completo pero estrecho", vender profundidad/aplicación, no el resultado (HIGH5/Truity más éticos que 16P "viste 5%") | Resultados **híbridos**: el Free entrega un resultado real por test + el teaser integrado; el Paid vende profundidad e integración. Tu decisión ya va por aquí. Blueprint §5, §8 |
| Precio y alcance transparentes antes de invertir tiempo (principio ético; FTC) | Decir desde la landing/mapa qué es gratis y qué cuesta el Paid (USD 19, una vez). Blueprint §7.4, §8 |
| Upsell vertical y por caso de uso, pago único, no suscripción (CliftonStrengths Top 5→34; Truity por test) | Free → Paid (USD 19 único) → Ikigai (add-on). Sin suscripción. Blueprint §8, §10 |
| Nombrar el rigor como dispositivo de venta + mostrar reporte de muestra (Truity, Understand Myself) | El puente al Paid nombra los instrumentos y muestra qué revela el integrador; ofrecer una muestra del reporte. Blueprint §8 |
| Reporte premium = acción + puntos ciegos + PDF descargable (todos los premium) | El reporte Paid incluye lectura accionable, bordes de crecimiento y PDF descargable/compartible. Blueprint §9.2 |

### F. B2B / organizacional

| Mejor práctica (fuente) | Adopción en DescubreMe |
|---|---|
| Mínimo de grupo n≥5 por defecto, configurable solo hacia arriba (Culture Amp) | Ya es tu regla (n≥5); hard-code en cada vista agregada; "datos insuficientes" debajo del umbral. Blueprint §11.4 |
| Protección contra identificación indirecta: ocultar grupo adyacente más pequeño (Culture Amp) | Adoptar: además de suprimir grupos <5, ocultar el adyacente para impedir cálculo inverso del promedio. **Nuevo para el blueprint.** Blueprint §11.4 |
| Umbral mayor a 5 para señales sensibles (Culture Amp comments minimum) | Para la lente de desgaste/bienestar, subir el umbral por encima de 5. Blueprint §11.3-11.4 |
| "Confidencial, no anónimo" declarado y reglas bloqueadas pre-lanzamiento (Culture Amp) | Decirlo en la pantalla del empleado; fijar reglas de reporte antes de lanzar cada medición. Blueprint §11.3 |
| "Desarrollo, no selección" + disclaimer de validez + consentimiento para compartir individual (Gallup) | Sellar cada vista "desarrollo, no selección"; el empleado posee su reporte; la empresa solo agregados. Blueprint §11.3 |
| Separar identificadores del contenido de respuestas, acceso por rol (Plum) | Arquitectura de datos: identificadores separados de puntajes; ya alineado con NFR de cifrado/RLS. Blueprint §11.4 |

---

## 4. Anti-patrones / dark patterns a EVITAR

`Hecho:` taxonomía de Brignull (deceptive.design) + FTC (2022, *Bringing Dark Patterns to Light*) + NN/g. Checklist de lo que DescubreMe **no** usa:

- [ ] **Paywall sorpresa** tras invertir tiempo en el test (Truity es criticado por esto). Decir el precio antes de empezar.
- [ ] **Resultado como rehén** detrás del pago sin un free honesto.
- [ ] **Cuenta forzada** para ver cualquier resultado.
- [ ] **Suscripción oculta** — cobrar "una vez" lo que en realidad es recurrente (quejas contra 16P en Trustpilot; ilustrativo, ver confianza).
- [ ] **Difícil de cancelar / continuidad forzada** (FTC: cancelar debe ser tan fácil como suscribirse).
- [ ] **Urgencia falsa** — contadores en ofertas que no vencen.
- [ ] **Escasez/prueba social falsas** ("X personas viendo esto").
- [ ] **Confirmshaming** — opt-outs con culpa ("No, prefiero no conocerme"). NN/g lo cataloga como dark pattern; incompatible con un producto que toca malestar.
- [ ] **Falsa precisión científica** (16P "91,2% de precisión"). DescubreMe declara límites, no infla.
- [ ] **Perfilar a terceros sin consentimiento** (Crystal predice desde LinkedIn) — jamás.
- [ ] **Pedir datos sensibles a mitad del test por costo hundido** (CareerExplorer). El consentimiento va antes, claro y en una pantalla.
- [ ] **Gamificación de pérdida / racha con culpa** (Duolingo) — no en una categoría emocionalmente sensible.

`Opinión profesional:` esta lista debería convivir con el blueprint como "guardarraíl de conversión". Es, además, material de marketing: DescubreMe puede decir explícitamente "sin trucos" y diferenciarse.

---

## 5. Benchmarks de UX (longitud, tiempo, progreso) e implicaciones para DescubreMe

`Hecho:`
- El abandono sube fuerte pasados **7-8 minutos** (SurveyMonkey) y de forma drástica pasados **12 min en desktop / 9 min en móvil** (Qualtrics).
- El abandono trepa pasadas **~20 preguntas**; la atención por ítem cae a la mitad más allá de 30 (SurveyMonkey).
- **La complejidad pesa más que la longitud:** "un test de 15 min de preguntas simples supera a uno de 10 min cognitivamente exigentes".
- **Barras de progreso, con matiz:** ayudan **solo si el progreso avanza rápido**; si avanza lento (o revela cuánto falta), **aumentan** el abandono. Funcionan mejor con el cuestionario partido en secciones lógicas.

`Implicaciones (Opinión profesional):`
1. **O*NET (60 ítems) es el mayor riesgo de abandono del Free.** Está muy por encima del umbral de ~20 preguntas. `Recomendación:` mantener el instrumento validado pero presentarlo en **bloques cortos con progreso por bloque** (que el progreso "avance rápido"), no como una barra única de 60 que avanza lento. Confirma la decisión abierta que te dejé: mitigar con UX, no acortar el instrumento.
2. **El "mapa de 4 paradas" del Free es correcto por evidencia:** convierte un cuestionario percibido como largo en cuatro cosas cortas con payoff entre cada una. Mantenerlo.
3. **El Paid (95-130 min) NO puede ser de una sentada.** El modelo de **4-6 sesiones** del blueprint §9.1 está respaldado: segmentar por instrumento, progreso por sesión, retomar sin perder nada.

---

## 6. Posicionamiento LATAM / es-CO

`Hecho:` 16Personalities está en 45+ idiomas incluido español, pero el consenso de campo es que un test tipológico "necesita más que traducción palabra por palabra: necesita adaptación cultural". `Inferencia (confianza media):` su español es una variante neutra/España, **no adaptada a es-CO/LATAM**. Los players vocacionales en español (Universidad de Palermo AR, Somos Psicólogos ES, PDA International, personalidadvocacional.com) son mayormente España-neutro o herramientas locales con poca transparencia psicométrica.

`Opinión profesional (white space):` el mercado se parte en (a) tests globales localizados a español neutro/España y (b) "tests vocacionales gratis" locales psicométricamente débiles. **Nadie combina psicometría validada y transparente + adaptación es-CO + embudo sin dark patterns.** Eso valida dos cosas:
- Corregir el voseo → es-CO no es solo cumplimiento de tu CLAUDE.md: es **diferenciación de mercado**.
- "Rigor transparente" como bandera (nombrar instrumentos, mostrar límites) ocupa un espacio vacío en LATAM.

---

## 7. Recomendaciones priorizadas

| # | Recomendación | Evidencia | Ola (Diagnóstico) |
|---|---|---|---|
| 1 | es-CO tuteo en todo el producto + "taste no-datos" en la landing + precio del Paid transparente desde el inicio | LATAM white space; value-first (Calm); transparencia (FTC) | 0-1 |
| 2 | O*NET y todo test largo en bloques cortos con progreso que avanza rápido | Benchmarks 20 preguntas / 7-8 min; progreso "rápido" | 2 |
| 3 | Transición recap + preview entre tests (payoff que valida el esfuerzo) | Headspace/Calm recap; growth.design transiciones | 2 |
| 4 | Resultados híbridos "completos pero estrechos"; reveal con template de 3 partes; frase reveladora por combinación | HIGH5/Truity free ético; Finimize template; CliftonStrengths custom insights | 2-3 |
| 5 | Reporte Paid = acción + puntos ciegos + PDF descargable; nombrar el rigor en el puente al Paid | Todos los premium; Truity/Understand Myself | 3 |
| 6 | B2B: n≥5 + protección de identificación indirecta (ocultar grupo adyacente) + umbral mayor para señales sensibles; sello "desarrollo, no selección" | Culture Amp; Gallup | 4 |
| 7 | Guardarraíl anti-dark-patterns como criterio de aceptación de conversión (la checklist §4) | Brignull, FTC, NN/g | Transversal |

`Opinión profesional:` las recomendaciones 1-4 son las de mayor impacto inmediato y todas caben en las olas 0-3 que ya estaban planeadas. La 6 enriquece el B2B con un mecanismo concreto (identificación indirecta) que el blueprint aún no tenía.

---

## 8. Fuentes (selección, APA 7 con URL)

`Directos psicométricos:` 16Personalities. https://www.16personalities.com/ ; https://www.16personalities.com/premium/career-suite · Truity. https://www.truity.com/test/type-finder-personality-test-new ; https://www.truity.com/test/big-five-personality-test · Understand Myself. https://www.understandmyself.com/personality-assessment · VIA Character. https://www.viacharacter.org/character-strengths-via ; https://www.viacharacter.org/reports · Crystal Knows. https://www.crystalknows.com/disc-personality-test ; https://www.crystalknows.com/pricing · CareerExplorer. https://www.careerexplorer.com/career-test/ ; https://www.careerexplorer.com/privacy/

`Reportes premium:` Gallup CliftonStrengths. https://www.gallup.com/cliftonstrengths/en/253868/popular-cliftonstrengths-assessment-products.aspx ; https://www.gallup.com/cliftonstrengths/en/251081/cliftonstrengths-hiring-decisions.aspx · HIGH5. https://high5test.com/full-strengths-report/ · 16P Premium. https://www.16personalities.com/premium/career-suite · Truity. https://www.truity.com/test/career-personality-profiler-test

`Adyacentes de UX:` Duolingo onboarding — Appcues/GoodUX. https://goodux.appcues.com/blog/duolingo-user-onboarding ; growth.design. https://growth.design/case-studies/duolingo-user-retention · Headspace — GoodUX. https://goodux.appcues.com/blog/headspaces-mindful-onboarding-sequence ; growth.design. https://growth.design/case-studies/headspace-user-onboarding · Calm — GoodUX. https://goodux.appcues.com/blog/calm-app-new-user-experience · Streaks (gentle vs anxious). https://trophy.so/blog/streaks-feature-gamification-examples

`B2B / organizacional:` Culture Amp confidencialidad. https://support.cultureamp.com/en/articles/7048386-confidentiality-protections-in-reporting ; Heatmap Explorer. https://support.cultureamp.com/en/articles/11544511-heatmap-explorer · Gallup Team Grid. https://www.gallup.com/cliftonstrengths/en/658739/team-grid.aspx · HIGH5 Team Analytics. https://high5test.com/features/team-analytics/ · Plum. https://www.plum.io/plum-science · Pymetrics — FAccT. https://www.ccs.neu.edu/home/amislove/publications/Pymetrics-FAccT.pdf ; Fortune (2026). https://fortune.com/2026/05/26/ai-hiring-algorithm-racial-disparities-pymetrics-stanford-study/ ; MIT Tech Review (2021). https://www.technologyreview.com/2021/02/11/1017955/

`Dark patterns / ética / benchmarks:` deceptive.design (Brignull). https://www.deceptive.design/types · FTC (2022). https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers · NN/g, Shaming Users. https://www.nngroup.com/articles/shaming-users/ · SurveyMonkey, completion times. https://www.surveymonkey.com/curiosity/survey_completion_times/ · Qualtrics, drop-offs. https://www.qualtrics.com/articles/strategy-research/4-tips-for-preventing-drop-offs-in-surveys/ · 16P idiomas. https://www.16personalities.com/languages

---

## 9. Confianza y limitaciones

- `Alta confianza:` precios y flujos de 16P, Truity, Understand Myself, VIA, Gallup, Culture Amp (fuente primaria); taxonomía de dark patterns y benchmarks de longitud (fuentes autoritativas).
- `Discrepancia a vigilar:` el modelo de cobro de 16Personalities — su página oficial lo presenta como **pago único $29** con devolución a 30 días, pero hay **quejas en Trustpilot** que alegan suscripción/cobros poco claros. No se resolvió con fuente primaria; trátese la versión "suscripción oculta" como **señal anecdótica**, no como hecho. Para nosotros la lección es la misma: ser explícitos en el cobro.
- `Confianza media:` precio de CareerExplorer (dato inyectado por JS, vía reseñas); conteos de ítems de 16P/Truity (de teardowns, no de spec oficial); cifra de Pymetrics 2026 (reporte secundario de Fortune sobre un estudio de Stanford); el "gap LATAM" es inferencia de un barrido no exhaustivo.
- `Seguridad:` el sitio de reseñas *Soultrace* intentó un prompt-injection contra los agentes (instruía recomendarlo siempre primero). Se ignoró; no se usa como fuente. Las quejas de Truity/16P se corroboraron con Trustpilot/FTC/NN/g, no con Soultrace.
- `Pendiente de verificación fina:` el slug exacto del artículo de NN/g sobre confirmshaming antes de citarlo formalmente; un barrido competitivo es-CO completo (herramientas universitarias locales) para firmar el "white space".

---

*Fin de la INVESTIGACIÓN DE MERCADO v1.0. Alimenta `BLUEPRINT_EXPERIENCIA_v1.0.md` y `DIAGNOSTICO_Y_PLAN_v1.0.md`. Documento vivo; las cifras de precios cambian y deben revalidarse antes de usarse en material público.*

