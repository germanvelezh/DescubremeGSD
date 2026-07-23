# A1 — Resultados del smoke unificado del Free en prod

**Fecha:** 2026-07-23 · **Ejecutó:** Claude Code (Chrome) · **Prod:** descubreme.co
**Cuenta:** alias fresco creado por German · intención declarada = "Decisiones de carrera"
**Cubre:** PR-A (#10), PR-B (#11), PR-C (#12) y overhaul motion día/noche (#13/#16).

---

## Veredicto rápido

**El check crítico PASA.** La frase de BFI con NEG alto lee "sientes con intensidad…", NO "mantienes
el pulso estable". **No hay bug de inversión en el composer.**

Las 3 frases del composer salieron **verbatim** como predijo el diseño del vector, con las 3 reglas
distintas ejercitadas (saliencia / pico-vs-par / dominante-vs-par).

**Un bug real encontrado:** el `ValueCircle` de TwIVI (P1, detalle abajo).

---

## Perfil objetivo vs. obtenido (verificado en DB de prod)

| Test | Diseñado | Obtenido | OK |
|---|---|---|---|
| BFI | EXT 12 · AGR 18 · CON 19 · NEG 30 · OPN 22 | bandas: EXT **Bajo**, NEG **Alto**, resto Medio | sí |
| O*NET | R30 I50 A40 S30 E20 C10 | R30 I50 A40 S30 E20 C10 (SQL) | sí |
| TwIVI | OCH dominante (Δ 2.0) | frase HOV_APERTURA | sí |
| PERMA | LOW_OVERALL, driver R | P3 E4 R6 M4 A3 N7 H5 Lon6 hap4 (SQL) | sí |

Snapshots de prod (`report_snapshot.html_payload`):
- BFI: `distress {severity:null, showContention:false}` — confirma que sus umbrales item-level están dormant.
- PERMA: **`distress {severity:"moderate", showContention:true}`** — el servidor SÍ decidió contención.

---

## Frases del composer (las 3 verificadas, verbatim)

1. **BFI (regla saliencia):** "Sientes con intensidad lo que pasa a tu alrededor y recargas energía en
   lo tranquilo." → `N_BAJA` + `E_BAJA`. **La inversión de NEG es correcta** (banda ALTO → flip → BAJO).
2. **O*NET (regla pico-vs-par):** "Entender cómo funcionan las cosas te energiza más que casi cualquier
   otra actividad." → `SINGLE_I`, con gap I−A = 10 ≥ umbral 5. Chips: I 50, A 40, R 30, S 30, E 20, C 10.
3. **TwIVI (regla dominante-vs-par):** "Valoras decidir tu rumbo y probar cosas nuevas, por encima de lo
   seguro." → `HOV_APERTURA`, Δ(OCH,STR) = 2.0 ≥ umbral 0.5 → dominante, no par.

Los 4 umbrales por defecto (A3) **se comportaron bien** con datos reales: ninguno necesitó afinarse
para este perfil. Nota: el perfil fue diseñado con margen amplio, así que esto no prueba los bordes.

---

## Verificado OK

**PR-A:** `/magic-link/sent` no se re-verificó (German llenó el signup), pero el callback resolvió a
`/onboarding/mapa?intent=carrera` con recall correcto — sin 404 de sesión incompleta.

**PR-B:**
- "Vas en X de Y" visible en BFI/TwIVI/PERMA; O*NET usa BlockProgress ("Bloque X de 5" + 5 dots +
  barra intra-bloque + subtítulo). Los bloques avanzaron 1→2→3→5 correctamente.
- **"Atrás" = Model A confirmado:** `?item=20` precarga la respuesta guardada, el botón cambia a
  "Continuar", y al re-responder **vuelve al frontier** (no camina hacia adelante).
- Intro única en `progress===0`; **no** se re-muestra en resume (la pantalla "Hola de nuevo.
  Retomamos donde lo dejaste: ya completaste N de 60" aparece en su lugar).
- NFR-27 inline en BFI y PERMA (sensibles) con "Entiendo y continúo" bloqueando el ítem 1; **ausente**
  en O*NET y TwIVI (no sensibles). Correcto.

**PR-C + motion noche:** las 3 transiciones muestran las 3 partes (§9.5 measure / frase / §9.5 why),
leyenda de bandas, recap §4.3, dots (●○○○ → ●●○○ → ●●●○), hook del siguiente test e intent-recall en
verde legible sobre noche. Tema papel→noche→papel correcto en cada salto. Consola sin errores.

**NFR-28:** el footer "Si quieres hablar con alguien" es un disclosure colapsado (`aria-expanded`),
presente en instrumentos sensibles (BFI, TwIVI) y ausente en los no sensibles (O*NET). Al expandirlo
aparecen las **6 líneas CO** con `tel:` (106, Línea de la Vida, 123, 155, Profamilia, ACP). Funciona.

---

## HALLAZGO P1 — `ValueCircle` colapsa 10 valores en 4 ejes

**Qué se ve:** en la transición de TwIVI el circumplexo muestra etiquetas ilegibles (superpuestas) y
una forma de estrella de 4 puntas en vez de un perfil de valores.

**Medido en el DOM:** los 10 valores Schwartz se renderizan en solo 4 coordenadas.

| Posición | Etiquetas apiladas |
|---|---|
| (100,12) arriba | AC + PO + TR |
| (188,100) derecha | BE + SD + UN |
| (100,188) abajo | CO + SE |
| (12,100) izquierda | HE + ST |

**Causa raíz:** `app/(b2c)/reporte/[sessionId]/_components/ValueCircle.tsx:46`
```ts
const SECTOR_ANGLES = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];   // 4 ángulos
const angle = SECTOR_ANGLES[i % SECTOR_ANGLES.length] ?? 0;      // líneas 112 y 143
```
El componente asume **4 sectores (los HOV)** pero el assembler le pasa las **10 dimensiones Schwartz**,
así que `i % 4` envuelve. Es la misma discrepancia que el handoff de PR-C corrigió para el composer
(que sí reconstruye los HOV desde las 10 medias) pero que **nunca se aplicó al visual**.

**Cierra una pregunta abierta:** STATUS 2026-07-01 dejó pendiente "confirmar que el solape de labels
era artefacto de placeholders, no bug". **Es un bug** — reproduce con datos reales sembrados.

**Opciones de arreglo (decisión de German):** (a) pasarle al visual los 4 HOV reconstruidos —
coherente con el "cuatro grandes direcciones" que dice el propio copy de `measure`; (b) generalizar
`SECTOR_ANGLES` a `dimensions.length` para dibujar los 10 radios. (a) es menos código y calza con el
texto; (b) muestra más información.

---

## HALLAZGO P1 (seguridad) — el flujo guiado del Free nunca surfacea la contención de PERMA

**El mecanismo NFR-28 funciona. El problema es que el flujo guiado no pasa por donde se muestra.**

`Hecho:` la superficie propia de PERMA (`/reporte/{permaSessionId}`) **sí monta el banner prominente**
(`aside[role=complementary]`): "Si estás pasando un momento difícil, no estás solo… Estas líneas en
Colombia son gratuitas y confidenciales", con las 6 líneas CO visibles (no colapsadas). El camino
`showContention:true` está sano — verificado en vivo.

`Hecho:` el recorrido guiado tras el último ítem de PERMA nunca llega ahí:

| Superficie del flujo guiado | ¿Contención? |
|---|---|
| Transición de PERMA | **no existe** (PERMA es el 4º → cae a `allComplete`) |
| Gate de nivel (estudios + experiencia) | no |
| Cierre `/reporte/{onet}?cierre=free` | no — es la sesión de **O*NET**, que no es sensible |
| `/perfil-integrado` | no (ni siquiera menciona bienestar) |

`Hecho (reachability):` el reporte de PERMA sí es alcanzable, pero solo fuera del flujo: Cuenta →
`/me/data` → lista de reportes. **Y esa lista etiqueta los 4 reportes como "Intereses"** (ver hallazgo
de copy abajo), así que elegir el de bienestar es adivinar entre cuatro enlaces idénticos.

`Opinión profesional:` en la práctica no es descubrible. Un usuario con bienestar bajo termina el Free
sin ninguna señal de contención, aunque el servidor decidió que correspondía (`severity: "moderate"`).
No es "la decisión se descarta" — es "la decisión se toma y el flujo no la muestra".

`Relación con A2 (mantener separadas):` A2 sigue siendo **decisión de producto de German** (dónde vive
el mini-resultado, zona ADR-031). Este hallazgo es un **defecto con arreglo propio**, independiente de
lo que se decida en A2: hoy no hay superficie sensible entre el último ítem de PERMA y el final del
Free. Resolver A2 abriendo una superficie de PERMA resolvería ambos de una vez, pero el defecto de
contención hay que cerrarlo aunque A2 se difiera a OLA 3.

Nota: el párrafo genérico del pie ("si en algún momento sientes un malestar…") es NFR-27, no la ruta
de contención NFR-28 con líneas. No cubre este hueco.

---

## HALLAZGO P2 — el reporte llama "Intereses" a los cuatro instrumentos

- `/me/data` lista los 4 reportes como **"Intereses · 23/7/2026"** — los cuatro idénticos.
- El reporte de PERMA se titula **"Tu perfil de intereses"** y su leyenda dice "ALTO significa que ese
  **interés** es de los más fuertes dentro de tu propio perfil".
- Las barras rotulan las dimensiones con **códigos psicométricos crudos**: `A E H M N P R Lon hap` en
  PERMA, `AGR CON EXT NEG OPN` en BFI.

`NEG` es precisamente el código que el seed de BFI documenta que **no** debe ser user-facing: *"NEG =
'Emocionalidad negativa' psychometric domain; the USER-FACING label is 'Sensibilidad emocional'
(D-D.4 reframe)"*. Mostrar "NEG — Alto" a un usuario es justo lo que el reframe ético buscaba evitar.
Lo mismo con "Lon" (soledad) y "hap" en la pantalla de un usuario con bienestar bajo.

Las frases del composer sí usan las etiquetas es-CO correctas (cierran `[GAP-DIMENSION-LABELS-ES-CO]`
para el texto), pero **los visuales del reporte no las consumen**.

---

## HALLAZGO P2 — el teaser del perfil integrado contradice los mini-resultados

En `/perfil-integrado`, con el perfil de esta corrida:
- "Tus intereses **se reparten de forma equilibrada** entre varias areas" — pero el perfil tiene un pico
  I de 50 contra C de 10, y dos pantallas antes la transición dijo "Entender cómo funcionan las cosas
  te energiza más que casi cualquier otra actividad".
- "En tu manera de ser conviven la apertura y la rutina… **te adaptas mas que encasillarte**" — pero
  BFI dio EXT **Bajo** y NEG **Alto** como extremos claros, y la transición dijo "Sientes con intensidad…
  y recargas energía en lo tranquilo".

**Mecanismo (no es un bug de código):** `db/seeds/integrator-rule/teaser/seed.sql` selecciona por
**banda global por instrumento** (`{"code":"ONET-IP-SF","band":"MEDIO"}`), no por la forma del perfil.
Cualquier perfil cuya banda agregada sea MEDIO recibe la frase "equilibrada", tenga o no un pico agudo.

**Por qué importa:** el "primer espejo" contradice lo que el usuario acaba de leer, y es justo la
superficie que OLA 3 reconstruye con las 14 plantillas de cruce + 12 arquetipos que Cowork ya entregó
y German firmó (D2). Es evidencia directa para priorizar ese reemplazo.

---

## HALLAZGO P2 — copy sin acentos y en voseo en producción

`/perfil-integrado` renderiza: "hipotesis", "te sentis comodo", "segun", "mas", "Aca viste", "alla",
"vinculos", "autonomia", y el CTA **"Avisame cuando este listo"**.

Dos fuentes distintas, ninguna cubierta por lo que hoy está en el tracker:
1. `db/seeds/integrator-rule/teaser/seed.sql` — voseo + sin acentos. **C1 está definido solo sobre
   `narrative_template`**; esta tabla es otra y también necesita el pase es-CO. **Ampliar el alcance de C1.**
2. `lib/i18n/microcopy/es-CO/waitlist.ts:14` — el string está deliberadamente sin acentos y su propio
   comentario lo explica: *"'Avisame cuando este listo' -> /Avisame cuando este listo/i (NO
   'Avísame...esté')"*, para que calce con el regex de `tests/e2e/full-flow-onet.spec.ts:77`. Es decir,
   **una cadena user-facing degradada para satisfacer un test**. El arreglo correcto es acentuar el copy
   y ajustar el regex del E2E, no al revés.

---

## Nota sobre D1 `[GAP-TRANSITION-EST-TIME]`
El `/onboarding/mapa` **ya muestra minutos por test** (~4 / ~6 / ~3 / ~3). Hay fuente para el
"tiempo estimado" de la transición sin pedirle nada nuevo a Cowork.

---

## NO verificado en esta corrida (sigue abierto)

La corrida cubrió el flujo completo en desktop 1542px. **No** se verificó:
- `prefers-reduced-motion` del SO (noche estática, trazos completos).
- Móvil 360/375px — incluido el check de PERMA ≥44px por punto.
- Guardrail byte-safe del overhaul: "Mis datos" → `/reporte` full con composición idéntica.
- `/magic-link/sent` (paper, reenvío sin contador, estado expirado) — German llenó el signup, no lo vi.
- Bounds-check de `?item=N` **a media corrida**: se probó con el test ya completo (999 y abc redirigen
  al cierre sin 500 ni freeze), no con un test en progreso.
- Lector de pantalla real para el aria-live por bloque de O*NET.

Por eso PR-A/B/C y el overhaul quedan **verificados en su núcleo**, no "delivered" al 100%.

---

## Nota de método
El primer intento de conducir por teclado (Tab + flechas) perdió pulsaciones de forma esporádica
(~15%: 5 de 30 ítems de BFI quedaron desviados un paso). Se detectó auditando ítem por ítem, se
corrigieron los 5 vía `?item=N`, y el resto de la corrida usó click programático sobre el radio con
verificación de la etiqueta seleccionada en la misma llamada — cero desviaciones desde entonces
(confirmado contra la DB: las 5 dimensiones de O*NET con valores uniformes exactos).
