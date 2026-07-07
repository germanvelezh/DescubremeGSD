# BRIEF Cowork — TwIVI: variante NEUTRA es-CO de los 20 stems (v1.0)

**De:** Claude Code (implementacion) · **Para:** Cowork (contenido/adaptacion es-CO)
**Fecha:** 2026-07-01 · **Prioridad:** P0 (desbloquea el test de valores vivo en prod con placeholders)
**Tipo:** handoff CC -> Cowork (spec funcional; el output final es contenido, dominio Cowork — CLAUDE.md §6).

---

## 1. Contexto y decision

`Hecho:` el test TwIVI vive en prod con 20 stems **placeholder** renderizados al usuario (`[GAP-TWIVI-ITEMS-ANCHORS-ES-CO]` vivo). Cowork ya entrego el pack + el seed M/F (`estado/TwIVI_items_es-CO_SEED_v1.0.sql`).

`Decision (German 2026-07-01, ADR pendiente):` **variante NEUTRA ahora + ramificado el/ella diferido.** Motivo: se verifico que la app **no captura genero declarado en ningun lado** (ni `user`, ni signup, ni sesion). Ramificar el/ella exige construir captura de genero + su tratamiento Ley 1581 (genero ≈ dato sensible Art. 5) — scope propio, diferido a `[GAP-TWIVI-GENDER-SCHEMA]`. Para desbloquear prod ahora se sirve **una sola variante neutra en genero**, schema-limpia (1 fila por item, sin columna nueva, sin migracion).

`Lo que ya esta hecho (no rehacer):`
- Anclas es-CO (§5 del pack): ya cableadas en `lib/questionnaire/response-scales.ts`.
- Scoring MRAT, `value_map`/`hov_map`, narrativa HOV×banda (12 textos): verificados vivos en prod.
- Los sets M y F del seed original: **quedan intactos** en `TwIVI_items_es-CO_SEED_v1.0.sql` como fuente de verdad para la fase de branching diferida. NO borrar.

---

## 2. Pedido concreto

Producir **20 stems es-CO neutros en genero**, uno por item (seq 1..20, orden oficial 1:CO..20:SE del seed), derivados de los sets M/F ya entregados. Mismo significado verbatim (Sandy et al., 2017), mismo registro (tuteo/neutro Colombia; sin rioplatense ni peninsularismos), mismo formato de **retrato en 3a persona** (juicio de semejanza: "que tanto se parece a ti").

`Restriccion critica de formato:` NO romper el frame de retrato en 3a persona — la escala es "esta persona se parece a mi". Neutralizar el genero **sin** volver el item impersonal a tal punto que deje de leerse como el retrato de una persona.

---

## 3. Superficie exacta a neutralizar

`Hecho:` de los 20, **3 ya son neutros** en el seed (M == F): **seq 4 (UN), seq 6 (ST), seq 16 (ST)** -> se copian tal cual. Los otros 17 tienen genero solo en estos puntos:

| seq | dim | Punto con genero (a resolver) | Tipo |
|---|---|---|---|
| 1 | CO | "para el/ella" | pronombre |
| 2 | TR | "para el/ella" | pronombre |
| 3 | BE | "que lo/la rodea" | pronombre objeto |
| 5 | SD | "ser curioso/a" | adjetivo |
| 7 | HE | "para el/ella" | pronombre |
| 8 | AC | "para el/ella" | pronombre |
| 9 | PO | "el/la lider" | articulo + sustantivo |
| 10 | SE | "para el/ella" | pronombre |
| 11 | CO | "para el/ella" | pronombre |
| 12 | TR | "para el/ella" | pronombre |
| 13 | BE | "para el/ella" | pronombre |
| 14 | UN | "para el/ella" | pronombre |
| 15 | SD | "ser creativo/a" + "para el/ella" | adjetivo + pronombre |
| 17 | HE | "para el/ella" | pronombre |
| 18 | AC | "para el/ella" | pronombre |
| 19 | PO | "para el/ella" + "lo que el/ella dice" | pronombre x2 |
| 20 | SE | "para el/ella" | pronombre |

`Nota:` el pronombre sujeto en 3a persona de los verbos ("Cree que...", "Piensa que...", "Le gusta...") ya es neutro en espanol — no requiere cambio. Solo los 17 puntos de arriba.

---

## 4. Estrategias de neutralizacion (elegir; recomendacion abajo)

| Estrategia | Como | Ejemplo (abstracto) | Trade-off |
|---|---|---|---|
| **A. Referente neutro "esta persona"** | Reemplazar "para el/ella" por "para esta persona" / "para ella o el" -> preferir "para esta persona" | "Para esta persona es importante ser obediente." | Preserva el frame de retrato; neutral; lee natural |
| **B. Reestructura impersonal** | Quitar el referente: "Es importante ser obediente..." | "Es importante mostrar respeto y ser obediente." | Cero genero; pero diluye el "retrato de alguien" |
| **C. Adjetivo -> frase nominal** | "ser curioso/a" -> "tener curiosidad"; "ser creativo/a" -> "tener ideas creativas"; "el/la lider" -> "liderar / ser quien lidera" | "Le gusta tener curiosidad y entender todo tipo de temas." | Necesario para los 3 items con adjetivo/sustantivo (5, 9, 15) |

`Recomendacion (Opinion profesional CC, a validar por Cowork):` **A + C**. La estrategia A mantiene el juicio de semejanza en 3a persona intacto (que es load-bearing para la escala), y C resuelve los 3 puntos que A no cubre (adjetivos/sustantivo con flexion de genero). Evitar B como default: al despersonalizar, el item deja de ser un "retrato" y cambia sutilmente lo que se pide juzgar.

`Chequeo por item con adjetivo:` seq 5 ("curioso/a"), seq 9 ("el/la lider"), seq 15 ("creativo/a") — estos NO se resuelven con solo cambiar el pronombre; requieren C.

---

## 5. Entregable y formato

1. **SQL drop-in:** llenar los 20 blancos del scaffold `estado/TwIVI_items_NEUTRAL_es-CO_SEED_SCAFFOLD_v1.0.sql` (estructura ya lista: INSERT de 5 columnas, orden oficial, idempotente NOT-EXISTS). Solo reemplazar cada `<<STEM_SEQ_NN>>` por el stem neutro. Ese archivo es el **unico lugar** con los items literales (anti-alucinacion: no reproducir en el pack ni en docs).
2. **Estado:** wording neutro = **candidato a piloto cognitivo** (ITC 2017), igual que M/F. Marcar como tal.
3. **No tocar** los sets M/F del seed original ni `response-scales.ts` (anclas ya hechas).

`Handoff de vuelta:` cuando Cowork devuelva el scaffold lleno, CC lo aplica a `db/seeds/instruments/TwIVI/items.sql` (borra placeholders), re-corre `tests/unit/scoring/twivi-mrat-fixture.test.ts` (el reorder de secuencia es scoring-neutral), y verifica en prod + smoke del ValueCircle con datos reales.

---

## 6. Fuera de alcance de este brief

- Ramificado el/ella (`[GAP-TWIVI-GENDER-SCHEMA]`, diferido) — fase propia con captura de genero + Ley 1581.
- Frase reveladora del teaser nivel-HOV (`[GAP-TEASER-CROSS-TEMPLATES-ES-CO]`) — deliverable Cowork separado.
- Hook de intro / microcopy voseo->es-CO — ya cubiertos por el pack §6/§7 (cerrar en su propio gap).

---

*Fin del brief. Referencia: `implementation_packs/TwIVI_Implementation_Acquisition_Pack_v1.0.md` §4 (genero) + `estado/TwIVI_items_es-CO_SEED_v1.0.sql` (sets M/F fuente).*
