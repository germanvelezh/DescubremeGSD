# A1 — Smoke unificado del Free en prod: vector de respuestas + checklist

**Fecha:** 2026-07-23 · **Modo:** CC conduce con Claude in Chrome · **Prod:** descubreme.co
**Cubre a la vez:** deploy-smoke PR-A (#10), PR-B (#11), PR-C (#12) y el overhaul motion día/noche (#13/#16).
**Regla:** cero commit/push/deploy. Solo navegación + captura de evidencia.

---

## 0. Orden del Free (verificado en `db/seeds/product-stack/free/seed.sql:43-46`)

| # | Instrumento | Ítems | Escala | Anclas renderizadas |
|---|---|---|---|---|
| 1 | BFI-2-S | 30 | 1-5 acuerdo | 5 arriba ("Muy de acuerdo") → 1 abajo |
| 2 | ONET-IP-SF | 60 | 1-5 preferencia | 5 arriba ("Me gustaria mucho hacerlo") → 1 abajo |
| 3 | TwIVI | 20 | 1-6 semejanza | 6 arriba ("Se parece mucho a mí") → 1 abajo |
| 4 | PERMA-Profiler | 23 | 0-10 numérico | endpoints por ítem (0 izq → 10 der) |

Los 4 tests se responden en orden de `sequence_number` (runner count-driven, `getItemAtSequence`).

---

## 1. Perfil objetivo y frases esperadas

| Test | Perfil objetivo | Frase esperada (verbatim de `reveal-phrases.ts`) |
|---|---|---|
| BFI | NEG alto (z +1.67) · EXT bajo (z −1.40) | **"Sientes con intensidad lo que pasa a tu alrededor y recargas energía en lo tranquilo."** |
| O*NET | Pico único I (gap 10 ≥ umbral 5) | **"Entender cómo funcionan las cosas te energiza más que casi cualquier otra actividad."** |
| TwIVI | Dominante OCH/Apertura (Δ 2.0 ≥ umbral 0.5) | **"Valoras decidir tu rumbo y probar cosas nuevas, por encima de lo seguro."** |
| PERMA | LOW_OVERALL (avg 4.0 < 5.0), driver R | **"Hoy tu bienestar pasa por un momento más bajo… Tu punto de apoyo más firme hoy: tus vínculos."** |

**CHECK CRÍTICO (inversión NEG):** la frase de BFI debe decir *"sientes con intensidad"*. Si dice
*"mantienes el pulso estable aunque el entorno se agite"* → **BUG de inversión** (`invertBand` de NEG
no se aplicó). Abortar el smoke y abrir issue.

**Por qué este perfil:** las bandas son z **intra-perfil** (`lib/scoring/ipsative.ts`), y el composer
ordena saliencia con ese mismo z. Solo entran a la frase las dims con |z| ≥ 1.0, y solo las dos más
salientes. NEG queda #1 y EXT #2 con margen; AGR/CON/OPN quedan MEDIO y no aparecen.

---

## 2. BFI-2-S — 30 ítems (escala 1-5)

Sumas objetivo: **EXT 12 · AGR 18 · CON 19 · NEG 30 · OPN 22** → media 20.2, sd 5.88.
z: NEG +1.667 (ALTO) · EXT −1.395 (BAJO) · OPN +0.306 · AGR −0.374 · CON −0.204 (los 3 MEDIO).

Los 15 ítems reverse aportan `6 − respuesta`. Columna "aporta" = contribución al puntaje del dominio.

| seq | dim | rev | **responder** | aporta |
|---|---|---|---|---|
| 1 | EXT | R | **4** | 2 |
| 2 | AGR | – | **3** | 3 |
| 3 | CON | R | **3** | 3 |
| 4 | NEG | – | **5** | 5 |
| 5 | OPN | – | **4** | 4 |
| 6 | EXT | – | **2** | 2 |
| 7 | AGR | R | **3** | 3 |
| 8 | CON | R | **3** | 3 |
| 9 | NEG | – | **5** | 5 |
| 10 | OPN | R | **2** | 4 |
| 11 | EXT | – | **2** | 2 |
| 12 | AGR | – | **3** | 3 |
| 13 | CON | – | **4** | 4 |
| 14 | NEG | R | **1** | 5 |
| 15 | OPN | – | **4** | 4 |
| 16 | EXT | – | **2** | 2 |
| 17 | AGR | R | **3** | 3 |
| 18 | CON | – | **3** | 3 |
| 19 | NEG | R | **1** | 5 |
| 20 | OPN | R | **2** | 4 |
| 21 | EXT | R | **4** | 2 |
| 22 | AGR | – | **3** | 3 |
| 23 | CON | – | **3** | 3 |
| 24 | NEG | R | **1** | 5 |
| 25 | OPN | – | **3** | 3 |
| 26 | EXT | R | **4** | 2 |
| 27 | AGR | R | **3** | 3 |
| 28 | CON | R | **3** | 3 |
| 29 | NEG | – | **5** | 5 |
| 30 | OPN | R | **3** | 3 |

Atajo de lectura: **seq 4/9/29 → 5** · **seq 14/19/24 → 1** (esos seis son NEG y valen el check crítico).

---

## 3. ONET-IP-SF — 60 ítems (escala 1-5)

Ítems agrupados por dimensión en bloques de 10 correlativos.
Sumas objetivo: **I 50 · A 40 · R 30 · S 30 · E 20 · C 10** → top1 I − top2 A = 10 ≥ umbral 5 → pico único.

| seq | dim | **responder a todos** |
|---|---|---|
| 1-10 | R | **3** |
| 11-20 | I | **5** |
| 21-30 | A | **4** |
| 31-40 | S | **3** |
| 41-50 | E | **2** |
| 51-60 | C | **1** |

Nota UI: el runner los muestra en **5 bloques de 12** ("Bloque X de 5"), que NO coincide con los
bloques de dimensión. El corte de bloque cae en seq 12/24/36/48 — ahí es donde hay que ver el dot
ganado y el aria-live de bloque.

---

## 4. TwIVI — 20 ítems (escala 1-6)

10 valores Schwartz × 2 pasadas (seq 1-10 y 11-20 en el mismo orden de valor).
HOV centrados: OCH +2.0 · STR 0.0 · SEN −0.5 · CSV −1.667 → Δ(top1,top2) = 2.0 ≥ 0.5 → dominante, no par.

| seq | valor | HOV | **responder** |
|---|---|---|---|
| 1 / 11 | CO | CSV | **2** |
| 2 / 12 | TR | CSV | **2** |
| 3 / 13 | BE | STR | **4** |
| 4 / 14 | UN | STR | **4** |
| 5 / 15 | SD | OCH | **6** |
| 6 / 16 | ST | OCH | **6** |
| 7 / 17 | HE | OCH | **6** |
| 8 / 18 | AC | SEN | **4** |
| 9 / 19 | PO | SEN | **3** |
| 10 / 20 | SE | CSV | **3** |

Patrón por pasada: **2, 2, 4, 4, 6, 6, 6, 4, 3, 3** — repetido idéntico en seq 11-20.

---

## 5. PERMA-Profiler — 23 ítems (escala 0-10)

Medias objetivo: **P 3 · E 4 · R 6 · M 4 · A 3** → avg 4.0 < 5.0 → LOW_OVERALL, driver = R.
`PERMA_total` del servidor = media de P,E,R,M,A **+ hap** = 24/6 = **4.0 < 5.0** → distress **moderate**.
`N_mean` = 7 > 6.5 → moderate por segunda vía (redundante, esperado).
**NO** dispara `strong`: N1=7 y N3=7 (<8), Lon1=6 (<8, y la cláusula compuesta pide N3≥7 **y** Lon1≥7), hap=4 (>2).

| seq | dim | **responder** | seq | dim | **responder** |
|---|---|---|---|---|---|
| 1 | A1 | **3** | 13 | P2 | **3** |
| 2 | E1 | **4** | 14 | N2 | **7** |
| 3 | P1 | **3** | 15 | A3 | **3** |
| 4 | N1 | **7** | 16 | N3 | **7** |
| 5 | A2 | **3** | 17 | E3 | **4** |
| 6 | H1 | **5** | 18 | H3 | **5** |
| 7 | M1 | **4** | 19 | R2 | **6** |
| 8 | R1 | **6** | 20 | M3 | **4** |
| 9 | M2 | **4** | 21 | R3 | **6** |
| 10 | E2 | **4** | 22 | P3 | **3** |
| 11 | Lon1 | **6** | 23 | hap1 | **4** |
| 12 | H2 | **5** | | | |

---

## 6. Checklist de observación (tracker §A1 + smoke noche del overhaul, consolidados)

### Pre-test
- [ ] `/magic-link/sent`: paper, heading "Te enviamos el enlace", correo interpolado, botón reenviar **deshabilitado al cargar** ~30s → habilitado, **sin contador visible**. Reenviar → "Listo, enviamos uno nuevo."
- [ ] `/intencion` → intención declarada (para verificar el recall en las transiciones).
- [ ] `/onboarding/mapa` con recall correcto → CTA → `/test/BFI-2-S`.

### Entrada a cada test (PR-B 2.2)
- [ ] Intro única en `progress===0`: hook §4.1 + "antes de comenzar" §4.2.
- [ ] **BFI y PERMA (sensibles):** NFR-27 inline + "Entiendo y continúo" **bloquea el ítem 1**.
- [ ] La card del `TestEntryGate` **NO** anima (regresión del overhaul).
- [ ] La intro **no** se re-muestra en resume ni al volver con "Atrás".

### Runner (PR-B 2.1 + motion día)
- [ ] "Vas en X de Y" **visible** (no sr-only).
- [ ] O*NET: "Bloque X de 5" + 5 dots + barra intra-bloque; dot ganado al cruzar seq 12/24/36/48; aria-live **solo** en cambio de bloque.
- [ ] `itemIn` (280ms/12px) solo en el fieldset — footer sticky y chip de autosave **no** animan.
- [ ] PERMA móvil @360px: los 11 puntos ≥44px, flex-wrap.
- [ ] **Freeze-wiring:** `/test/BFI-2-S?resumed=true&item=999` y `?item=abc` → sirve el frontier, sin 500 ni `/done` espurio.
- [ ] "Atrás" precarga la respuesta guardada y devuelve al frontier (Model A).

### Transiciones 1→2, 2→3, 3→4 (PR-C + motion noche — LA FIRMA)
- [ ] Velo `.dm-dusk` de papel se levanta (700ms) → Starfield → secuencia por delays inline, fin ≈1.87s.
- [ ] 3 partes: "Qué medimos" (§9.5) / **frase compuesta** / "Por qué te importa" + leyenda de bandas.
- [ ] Visual compacto **se dibuja** (`dm-draw`), no aparece de golpe.
- [ ] Recap fijo §4.3 + dots ●○○○ (aria "Vas n de N") + hook del siguiente test + recall de intención (en `text-success`, legible sobre noche).
- [ ] **Las 3 frases coinciden verbatim con §1** de este doc. La de BFI es el check crítico.
- [ ] Consola sin errores en cada transición.

### Cierre (`?cierre=free`)
- [ ] Redirige a `/reporte/{onet}?cierre=free` con nivel obligatorio → reveal ocupacional.
- [ ] Capa 1 del reporte < 2.0s (título mask → visual → frase 1300ms).
- [ ] **A2 / NFR-28 — la pregunta abierta:** PERMA disparó `moderate`. ¿**Dónde** aparece la contención?
      Registrar: (a) footer del reporte de cierre, (b) en ningún lado, (c) otro. Si es (b) → no es solo
      hueco de diseño de A2, es **hueco de NFR-28**. Este dato decide A2.
- [ ] Registrar también si el mini-resultado de PERMA se pierde por completo (esperado: sí).

### Guardrail byte-safe del overhaul
- [ ] "Mis datos" → `/reporte` full: composición **idéntica** a antes (no debe animar).
- [ ] `/perfil-integrado`: Starfield + `Reveal` (IntersectionObserver).
- [ ] reduced-motion del OS activado: noche directa estática, trazos completos, todo visible.

### Contexto esperado (no marcar como bug)
- BFI **no** debe mostrar contención pese a NEG al techo: su umbral es item-level (`NEG2 ≥ 4`) y está
  `dormant_pending_facet_scoring`. Si **sí** aparece → cambió el wiring, documentarlo.
- Las narrativas del reporte full siguen en **voseo** hasta el reseed C1 (pendiente, gated por German).

---

## 7. Evidencia a capturar
Screenshot de: `/magic-link/sent`, intro de BFI (NFR-27), runner O*NET en cruce de bloque, **las 3
transiciones nocturnas completas**, cierre `?cierre=free`. Consola limpia en cada transición.
