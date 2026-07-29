# PR #40 — Smoke con cuenta en prod: RESULTADOS

**Fecha:** 2026-07-29 · **Prod:** `www.descubreme.co` · **Conduce:** Claude Code · **Signup:** German (Ley 1581)
**Hoja de ruta:** `estado/SMOKE_PR40_vector_y_checklist_v1.0.md`
**Resultado global:** **15 de 15 checks PASAN.** Cero defectos de #40.

---

## 1. Hoja de registro

| # | Check | Pantalla | Resultado | Evidencia |
|---|---|---|---|---|
| 1a | `Test 3 de 4 · Valores` + es `h1` | `/test/twivi` item 1 | **PASA** | Verbatim, `tag: H1`. Ni el nombre tecnico ni el fallback de casing |
| 1b | `Test 1 de 4 · Personalidad` | `/test/bfi-2-s` item 1 | **PASA** | Verbatim, `H1`. Llegado por el CTA de la transicion |
| 1c | `Test 4 de 4 · Bienestar` | `/test/perma-profiler` item 1 | **PASA** | Verbatim, `H1` |
| 2a | Nota corta · sin `ALTO significa que ese interés` | reporte Personalidad | **PASA** | Nota corta y nota de baremo presentes; la prohibida `false` |
| 2b | idem | reporte Bienestar | **PASA** | idem |
| 2c | Nota larga **sigue** presente | reporte Intereses | **PASA** | `ALTO significa que ese interés es de los más fuertes dentro de tu propio perfil…` verbatim |
| 3a | Una sola parada de tabulacion | PERMA item 1 | **PASA** | Estructural: `0` con `tabindex="0"`, los otros 10 con `-1`. **Y de comportamiento:** `Tab` desde el `10` salio a "Salir y continuar después" |
| 3b | Flechas + Home/End mueven foco, no seleccionan | PERMA item 1 | **PASA** | `→` 0->1 · `←←` 1->0->**10 (wrap)** · `Home`->0 · `End`->10. **`aria-checked=true` en cero botones** en todo el recorrido, item sigue en 1 |
| 3c | Enter/Espacio selecciona y avanza | PERMA items 1-2 | **PASA** | `Enter` sobre `7` -> item 2 · `Espacio` sobre `3` -> item 3. **Verificado contra DB:** item 1 = `7`, item 2 = `3` |
| 3d | `aria-label` del `0` y del `10` traen el ancla | PERMA item 1 | **PASA** | `0, nunca` · `10, siempre` · los del medio solo el numero. **`aria-valuetext` = `null` en los 11** |
| 4a | `Este reporte no es clínico` | los 4 reportes | **PASA** | Los 4. Se chequearon **las dos formas**: con tilde `true`, sin tilde `false` |
| 4b | `Ver ficha técnica del instrumento` | reportes completos | **PASA** | idem |
| 4c | `Política de privacidad` | pie de los reportes | **PASA** | idem |
| 5a | Starfield 0.6 · CTA 1150ms · velo 700ms | transicion tras TwIVI | **PASA** | `opacity-60` -> computada **0.6** · CTA `animation-delay: 1150ms` inline · `.dm-dusk` **sin** `--dm-dusk-duration` (default) |
| 5b | `div.dm-dusk` 1000ms · Starfield 1.0 | `/perfil-integrado` teaser | **PASA** | `--dm-dusk-duration:1000ms` inline, `fixed`, `inset 0`, `z-index 20` · Starfield **sin** clase de opacidad -> computada **1** |

`La inversion de 2.5 quedo medida en las dos puntas:` transicion **0.6** contra llegada **1.0**. Si el cambio no hubiera llegado, las dos leerian igual.

---

## 2. La prediccion falsable de 5b se cumplio exacta

La hoja predijo, antes de mirar: estado **`teaser`**, con **2 frases y 0 cruces**, derivadas de las bandas dominantes de `+permacare1`.

`Revalidado contra prod antes de abrir la pantalla:` `BFI-2-S MEDIO · ONET-IP-SF MEDIO · PERMA-Profiler MEDIO · TwIVI BAJO`.

Lo que renderizo, verbatim:

| Regla que machea | Frase |
|---|---|
| `ONET-IP-SF = MEDIO` | "Tus intereses se reparten de forma equilibrada entre varias areas…" |
| `BFI-2-S = MEDIO` | "En tu manera de ser conviven la apertura y la rutina segun el momento…" |

**Dos frases, cero cruces — exactamente lo predicho.** No cayo a `gap`. Esto convierte 5b de "se ve bien" en una prediccion que pudo fallar y no fallo.

---

## 3. Como se condujo (para poder repetirlo)

- **Cuenta A** `germanvelezh+permacare1@gmail.com` — 4/4 tests, 4 snapshots, **0 items nuevos**. Cubrio 5b + los 4 reportes.
- **Cuenta B** `germanvelezh+smoke0729@gmail.com` — **creada limpia** (verificado: 0 sesiones al entrar). 20 items de TwIVI + 2 de PERMA.
- `Por que dos:` `getOrCreateAuthenticatedSession` nunca crea una 2a sesion, asi que una cuenta con 4/4 no puede volver a ningun runner — y 5b exige justamente 4/4. Mitades incompatibles.
- **Conduccion por numero real de item** (`Vas en N de 20`), no por conteo ciego. Pago solo: el guardado tarda mas que el click, asi que cada item necesito 2 pasadas — y como el loop relee `N` cada vuelta, **re-responder el mismo item fue inocuo** y convergio. Con avance ciego se habria desalineado en el item 1.
- **Verificado contra la DB, no contra la pantalla:** los 20 valores de TwIVI guardaron el ciclo `2,4,6,3,5` en secuencia 1-20 **sin huecos ni duplicados**, y los 2 de PERMA guardaron `7` y `3`.
- Teclado con **eventos reales** (no sinteticos) y **una tecla por vez**, leyendo `document.activeElement` despues de cada una. Nada de `repeat`: pierde pulsaciones en silencio.

---

## 4. Hallazgos

### 4.1 `[GAP-SIN-LOGOUT-SESION-PERSISTENTE]` — P1, ya flageado (PR #73)

**La app no tiene forma de cerrar sesion.** `signOut` existe en 3 sitios y ninguno es del usuario: dos son ramas de error de `/auth/callback` (`:217`, `:221`) y el tercero corre **despues** de borrar la cuenta (`me/delete/actions.ts:117`). En prod, `/me/data` expone solo `Guardar cambios` y `Descargar todos mis datos (JSON)`.

`Es anterior a #40`, se encontro haciendo su smoke. Detalle y severidad en la fila del BACKLOG.

### 4.2 Doble `h1` en la pantalla de entrada — nuevo, atribuible a #40

En el `TestEntryGate` (antes de "Comenzar") hay **dos `h1`**: el encabezado y el hook del instrumento. Confirmado en **TwIVI y BFI-2-S**, o sea es sistematico de esa pantalla.

`Atribucion verificada, no supuesta:` `DoubleLevelProgress.tsx:53` es `<h1>` hoy y era **`<p>`** antes de #40 (`git show 124c495~1`, linea 50). El hook **ya era** `h1`. O sea el segundo `h1` lo introduce #40.

`Acotacion que baja la severidad:` **en el runner hay un solo `h1`** — el hook no se monta despues de "Comenzar". El duplicado vive **solo** en la pantalla de entrada.

`Matiz honesto:` el `h1` del encabezado es **deliberado** y esta justificado en el codigo (`:50`, "sin el, el documento queda sin h1"). El defecto no es esa decision — es que **no se considero la pantalla donde el hook ya aportaba uno**. El fix probable es degradar el hook a `h2` en el entry gate, no revertir el encabezado.

**Sugerido: P3.** Afecta el outline del documento y a lectores de pantalla, no el contenido.

### 4.3 El teaser rinde 2 frases y 0 cruces contra las 4-6 + 1-2 de la spec

**No es defecto de #40** y ya estaba anticipado en la hoja de ruta. La causa es **cobertura del seed**: cada instrumento tiene reglas para solo 2 de sus 3 bandas y 5 de los 6 cruces exigen `ALTO+ALTO`, asi que un perfil de medios queda casi sin superficie. **ADR-036 lo empeora** al revivir MEDIO en TwIVI.

Ademas **degrada en silencio**: `TEASER_PHRASE_FLOOR` existe y nadie lo consume.

**Sin flag propio todavia.** Candidato P2.

---

## 5. Lo que este smoke NO cubre

- **No se completo el Free de la cuenta B** (quedaron BFI abierto en item 1 y PERMA en item 3). No hacia falta: los 5 checks son de copy, a11y y motion, ninguno depende de puntajes.
- **La cuenta B queda con sesiones a medias.** Si se reusa, `getOrCreateAuthenticatedSession` la devuelve donde quedo, no en el item 1.
- **No se verifico con lector de pantalla real** — 3d se afirma sobre el atributo `aria-label`, no sobre lo que anuncia NVDA/VoiceOver. Sigue vigente `[GAP-A11Y-LECTOR-PANTALLA-REAL]`.
- **No se midio con `prefers-reduced-motion` activo** (T6): en esa rama el velo no se pinta nunca. La corrida fue con `reducedMotion: false`, verificado.
