# Implementation Pack — Microcopy onboarding de nivel + revelación ocupacional (es-CO) v1.0

**Producto:** DescubreMe (MVP).
**Autor:** Cowork (UX Writer). **Owner:** German Velez Hurtado.
**Fecha:** 2026-06-25.
**Tipo:** Pack de contenido user-facing. Claude Code usa estos textos verbatim; NO redacta copy nuevo.
**Idioma:** español Colombia, tuteo cordial y profesional. Sin emojis. Sin lenguaje determinista, clínico ni de urgencia.
**Relacionado:** `JobZones_es-CO_Pack_v1.0.md`, `estado/ANALISIS_Gancho_y_ONET_Fase2_v1.0.md`.

---

## 1. Hooks de los tests del Free (orden con gancho = personalidad)

`Decisión:` el primer test del Free pasa a ser **BFI-2-S (personalidad)** como gancho de identidad; O*NET IP-SF pasa a segundo y queda atado a la captura de nivel. Hooks de una línea (principio de experiencia §9.1 del PRD): explican qué revela el test, sin exagerar el valor predictivo.

| Orden | Test | Hook es-CO (verbatim) |
|---|---|---|
| 1 | BFI-2-S (personalidad) | "Empecemos por ti. En unos minutos vas a ver cómo te muestras, cómo te relacionas y qué te mueve." |
| 2 | O*NET IP-SF (intereses) | "Ahora, qué tipo de actividades te prenden. Esto abre un mapa de campos para explorar, ajustado a tu momento." |
| 3 | TwIVI / valores | "Qué es lo que de verdad te importa. Tus valores explican muchas de tus decisiones." |
| 4 | PERMA-Profiler (bienestar) | "Cómo estás hoy: qué te da energía y dónde podrías estar perdiéndola." |

`Cierre del gancho (tras el resultado de personalidad), CTA al siguiente test:`
> "Esto es solo el primer trazo. Sigamos: cada test suma una pieza, y al final vas a ver cómo encajan."

---

## 2. Captura de nivel (antes del resultado de O*NET)

`Ubicación:` justo antes de mostrar la revelación ocupacional del O*NET IP-SF. Una pantalla, dos preguntas, sin fricción.

`Título de pantalla:`
> "Antes de mostrarte campos para explorar"

`Subtítulo:`
> "Dos datos rápidos para que los ejemplos te queden a la medida, y no genéricos."

### 2.1 Pregunta — nivel educativo

`Enunciado:`
> "¿Cuál es el nivel de estudios más alto que has terminado o estás cursando?"

| value | Opción (label es-CO) |
|---|---|
| `secundaria` | Bachillerato o menos |
| `tecnico_tecnologo` | Técnico o tecnólogo |
| `pregrado` | Pregrado universitario |
| `posgrado` | Posgrado (especialización, maestría o doctorado) |

### 2.2 Pregunta — experiencia

`Enunciado:`
> "¿Cuánta experiencia laboral relacionada tienes?"

| value | Opción (label es-CO) |
|---|---|
| `sin_experiencia` | Sin experiencia aún, o estoy estudiando |
| `junior` | Menos de 3 años |
| `semi_senior` | Entre 3 y 8 años |
| `senior` | Más de 8 años |

`Microcopy de ayuda (opcional, bajo las preguntas):`
> "Usamos esto solo para ajustar los ejemplos de ocupación. Lo puedes cambiar después."

---

## 3. Nivel inferido + control de ajuste (modo híbrido)

`Hecho:` no se expone el término técnico "Job Zone". Se habla de "preparación" en lenguaje cotidiano. El sistema infiere un nivel (pack Job Zones §3) y deja ajustarlo.

`Título:`
> "Listo. Vamos a mostrarte ejemplos acordes a tu preparación."

`Texto de ajuste (control con dos opciones):`
> "¿Cómo quieres explorar?"

| value | Opción (label es-CO) | Efecto |
|---|---|---|
| `current` | Con mi preparación actual | Usa la zona base (no amplía techo) |
| `study_more` | Estoy abierto/a a formarme más | Amplía el techo un nivel (pack Job Zones §3.3) |

`Microcopy bajo el control:`
> "Ninguna opción es mejor que la otra. Solo cambia el tipo de campos que verás."

---

## 4. Consentimiento para los datos de nivel (Ley 1581)

`Snippet (junto a la captura del §2, o ligado al consentimiento general si ya cubre "datos de perfil para personalizar"):`

> "Tratamiento de tus datos. Tu nivel de estudios y tu experiencia se usan únicamente para ajustar los ejemplos de ocupación que te mostramos. No se comparten con terceros y los puedes editar o eliminar cuando quieras desde tu perfil."

`Texto del enlace a política:`
> "Ver cómo tratamos tus datos"

`Confirmación de revocación (desde perfil):`
> "Tus datos de nivel se eliminaron. Las recomendaciones volverán a basarse solo en tus intereses."

---

## 5. Revelación ocupacional (encuadre no determinista)

`Título de la sección:`
> "Campos que podrían resonar contigo"

`Bajada (disclaimer integrado, principio 6 del PRD):`
> "Estos son ejemplos para explorar, no un veredicto. Son áreas donde personas con intereses parecidos a los tuyos suelen sentirse a gusto, ajustadas a tu nivel de preparación. Tú decides qué mirar de cerca."

`Etiqueta de cada tarjeta de ocupación (estructura, no determinista):`
- Nombre de la ocupación (de `name_es_co`).
- Micro-tag de coincidencia de interés, p. ej.: "Encaja con tu lado Investigador y Convencional." (derivado de las letras RIASEC coincidentes; nunca un puntaje de "match %").

`CTA bajo la lista (hacia el teaser integrado / Paid):`
> "Esto es solo por intereses. En tu perfil completo, estos campos se cruzan con tu personalidad, tus valores y tus fortalezas para afinar mucho más."

### 5.1 Estados especiales

`Sin resultados (tras fallbacks):`
> "Por ahora no encontramos ejemplos claros para esta combinación. Con tu perfil completo vamos a poder mostrarte campos más afinados."

`Cargando:`
> "Buscando campos que encajen con tus intereses y tu nivel."

---

## 6. Reglas de estilo (para mantener coherencia)

- Tuteo es-CO. Cálido, profesional, sin tono motivacional vacío.
- Prohibido: "tu carrera ideal", "deberías ser", "naciste para", "el test dice que eres", porcentajes de "match", urgencia ("solo hoy", "no te quedes sin").
- Evitar el término técnico "Job Zone" frente al usuario; usar "preparación" / "nivel".
- Sin emojis. Sin lenguaje clínico ni diagnóstico.
- Frases prohibidas heredadas del CLAUDE.md (no usar ni su equivalente en español): "desbloquear", "potenciar/empoderar", "sin fisuras", etc.

---

*Fin del pack de microcopy es-CO v1.0. Textos Cowork; integración por Claude Code.*
