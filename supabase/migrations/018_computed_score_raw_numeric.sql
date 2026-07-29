-- 018_computed_score_raw_numeric.sql — ADR-042 (computed_score.raw acepta medias).
--
-- `raw` nacio `integer not null` en 002_user_data.sql:91, cuando el unico tipo de
-- formula seedeado era `sum`. El 2026-06-12 entraron los dos primeros instrumentos
-- `mean` — TwIVI (10 reglas sobre pares) y PERMA-Profiler (9 sobre tercias) — y
-- `meanFormula` no redondea (lib/scoring/formulas/mean.ts:20). Desde ese dia toda
-- media que no cae entera revienta el INSERT con `22P02`.
--
-- POR QUE numeric Y NO REDONDEAR EN EL ESCRITOR: PERMA publica medias de dominio
-- 0-10 y el centering MRAT de TwIVI opera sobre medias. Redondear guardaria un
-- valor que el motor nunca calculo, y el lector de esta tabla es el export ARCO
-- (app/api/me/data/route.ts:139, COMPL-05, art. 15 Ley 1581) — le entregaria al
-- titular un dato falseado. `normalized` en esta misma tabla ya es `numeric`, asi
-- que el tipo tambien queda consistente.
--
-- SAFE: integer -> numeric es un ensanchamiento con cast implicito y sin perdida,
-- asi que no necesita USING. `not null` se preserva a traves del ALTER TYPE. La
-- tabla es chica (decenas de filas en prod), asi que el rewrite es trivial.
-- IDEMPOTENT: re-correrla sobre una columna ya `numeric` es un no-op para Postgres.
--
-- SIN BACKFILL (decision de German, ADR-042): las filas que nunca se escribieron
-- no las restaura el ALTER. En prod faltan 15 filas repartidas en 2 cuentas de
-- prueba (`pruebasgvhv1+r6`, `+r7`) — ningun titular tercero afectado. Quedan
-- incompletas a proposito; esta migracion protege de aca en adelante.
--
-- Anchors: ADR-042, tests/integration/computed-score-fractional.test.ts (el
-- round-trip que fallaba con 22P02), lib/scoring/score-session.ts:380-397 (el
-- INSERT y el catch deliberado que hacia silenciosa la perdida).

begin;

alter table public.computed_score
  alter column raw type numeric;

commit;
