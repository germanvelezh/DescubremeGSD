# BRIEF Cowork — resultado de la auditoria de gates skipped (accion derivada del ADR-037)

**Fecha:** 2026-07-28. **Origen:** ADR-037, "Accion derivada (Cowork): auditar otros gates `skipped`".
**Pide:** German Velez Hurtado. **Responde:** Cowork (Investigador psicometrico + compliance).
**Bloquea:** nada de forma inmediata. Define como se cierra `[GAP-TESTS-INTEGRACION-HUECOS]` (P1).

Cowork pidio esta auditoria al cerrar D3.3, con una razon precisa: **un acceptance test `skipped` opero como guardia fantasma por tiempo indeterminado**, y el requisito verbatim que vigilaba se cayo sin que nadie pudiera notarlo. La auditoria se hizo. **El resultado es peor que el caso que la motivo**, y por eso vuelve a Cowork en vez de quedarse en un flag.

---

## 1. Hecho

La auditoria arranco en el unico caso conocido (`tests/integration/plugin-swap.test.ts:140`, un `it.skip` de cuerpo vacio). **Ese skip resulto ser 1 de 18.**

**24 bloques de `tests/integration/` no afirman nada.** Su cuerpo es un plan en comentarios mas una asercion que no puede fallar:

```js
const hasDb  = Boolean(process.env.DATABASE_URL);
const itIfDb = it.skipIf(!hasDb);

itIfDb("falls back CO -> MX when CO row missing", async () => {
  // 1. Seed baremo CO + MX.  2. selectBaremo -> populationUsed 'MX'.
  expect(hasDb).toBe(true);          // dentro de itIfDb, esto es una TAUTOLOGIA
});
```

**18 de esos 24 reportan `passed` en CI**, no `skipped`, porque `DATABASE_URL` existe en el runner desde la entrega 2 del CI E2E. Los otros 6 son tests sin gate (`it("contract documented; runtime gated on DATABASE_URL")`) que pasan siempre.

> **La entrega 2 no encendio cobertura: convirtio 18 skips honestos en 18 verdes que no afirman nada.** Los 18 cuentan hoy dentro de los `493 passed` de la suite.

`Por que esto es un escalon PEOR que el caso D3.3:` un `skip` al menos **se declara ausente** en el reporte — se puede auditar, como acabamos de hacer. Una tautologia **se declara presente**. No hay nada en el reporte de CI que la distinga de un test real.

### Como se midio (dos metodos independientes)

| Metodo | Resultado |
|---|---|
| Analisis estatico por bloque (`expect` totales menos tautologicos) | **24 huecos / 8 con asercion real** |
| Correr `tests/integration` con y sin `DATABASE_URL` | `33 -> 57 passed`; identidad **por nombre**: 26 ganados, 2 perdidos (`33 + 26 - 2 = 57`) |

De los **26 tests que CI gano** al aparecer `DATABASE_URL`, **solo 8 son reales**: `audit-immutable` (3) y `feedback-ownership` (5).

### Alcance, explicito

El barrido cubrio **`tests/integration/`** y la familia de gates `hasDb` / `HAS_DB` / `DATABASE_URL`. **Otras formas de test hueco fuera de ahi — en particular todo `tests/unit/` — NO se barrieron.** Esto **no** es una auditoria repo-wide terminada.

---

## 2. Lo que hace que esto sea asunto de Cowork y no solo de ingenieria

Los 18 tests huecos no estan repartidos al azar. Vigilan **nominalmente** estos criterios de aceptacion:

| Codigo | Que dice vigilar el test hueco | Archivo |
|---|---|---|
| **COMPL-05** | `GET /api/me/data` devuelve user + responses + scores + consents + audit + reports | `data-rights` |
| **COMPL-06** | `PATCH /api/me/data` aplica el UPDATE | `data-rights` |
| **COMPL-07** + **D1.5** | `DELETE` transaccional: cascade FK sobre 7 tablas + anonimiza 3 + borra el auth user | `data-rights` |
| **COMPL-08** | `POST /api/me/consent/revoke` marca `revoked_at` + audita + **bloquea INSERT posterior de alta sensibilidad** | `consent-revoke` |
| **COMPL-12/13** | Middleware de etica: `emotional_distress=true` -> **`disclaimer=true` + `contention=true`** | `ethics-middleware` |
| **COMPL-17** | `/api/respond` **rechaza 400 un body que traiga `user_id`** | `respond` |
| **QUAL-06** | Fallback de baremo CO -> MX -> INTL | `baremo-fallback` |
| **QUAL-08** | Telemetria de baremo, incluido **"no escribe `user_id` (PII no se filtra)"** | `baremo-telemetry` |
| **FOUND-06** | Swap de instrumento por datos, via formula en DB | `plugin-swap` |

**Siete de los nueve codigos son `COMPL`.** Entre lo que hoy **no** esta verificado por ninguna asercion: el borrado transaccional de Ley 1581, el bloqueo de escritura tras revocar consentimiento, la activacion del disclaimer + ruta de contencion en instrumentos con senal de malestar, el rechazo de `user_id` inyectado, y la no-filtracion de PII en telemetria.

`Aclaracion importante, para no exagerar el riesgo:` esto **no** dice que esas funcionalidades esten rotas. Varias tienen cobertura por otras vias (tests de schema/lint de RLS, tests unitarios de los handlers, y el smoke manual en prod). Lo que dice es que **el test que se presenta como su guardia no lo es**, y que si alguna se cayera, la suite seguiria en verde — que es exactamente el mecanismo del caso D3.3.

---

## 3. Consulta

**Consulta unica, en dos partes.**

### 3.1 — Prioridad: ¿cuales de estos criterios exigen un test real, y en que orden?

No se propone implementar los 18 de una. Se pide a Cowork **ordenarlos por riesgo de compliance/etica**, sabiendo que hoy ninguno esta verificado por asercion. Un orden tentativo desde ingenieria, para que Cowork lo corrija:

1. **COMPL-12/13** (disclaimer + contencion ante malestar emocional) — es el unico con consecuencia sobre una persona en el momento.
2. **COMPL-07 / D1.5** (borrado transaccional) y **COMPL-08** (bloqueo post-revocacion) — Ley 1581.
3. **COMPL-17** y **QUAL-08** (PII: `user_id` inyectado / filtrado en telemetria).
4. **COMPL-05 / 06**, **QUAL-06**, **FOUND-06**.

### 3.2 — Cierre provisional: ¿se aceptan `it.todo` mientras tanto?

Mientras no se implementen, hay dos formas de dejarlos:

| | Opcion | Efecto en el reporte | Contra |
|---|---|---|---|
| A | **Dejarlos como estan** | Siguen diciendo `passed` | La suite sigue afirmando cobertura que no existe. Es el estado que produjo el caso D3.3 |
| B | **Degradarlos a `it.todo`** | Pasan a decir `todo`; la suite iria a ~475 passed + 18 todo | No agrega ni una linea de cobertura. **Solo deja de mentir** |

`Recomendacion de ingenieria:` **B**, y explicito que es honestidad de reporte, no progreso. `Opinion:` el valor de B es que vuelve a hacer **auditable** el hueco — un `todo` se ve en cada corrida; una tautologia hay que ir a buscarla leyendo el cuerpo.

`Lo que NO se propone:` borrarlos. El plan que cada uno documenta en sus comentarios es la especificacion del test que falta, y es util.

---

## 4. Hallazgo lateral que Cowork deberia conocer

`tests/integration/audit-immutable.test.ts` **si** afirma de verdad (verifica que `audit_log` sea append-only contra la DB). Pero sus 3 tests abren con:

```js
const c = await getClient();
if (!c) return;      // si no conecta, PASA sin afirmar
```

Degrada a pase vacuo en vez de fallar. Mismo efecto que la tautologia, causa distinta. Es el gate de inmutabilidad del audit log — o sea, tambien compliance.

---

## 5. Que se pide concretamente

1. **Orden de prioridad** de 3.1 (o confirmacion del tentativo).
2. **Si/no** a la opcion B de 3.2 como cierre provisional.
3. Opcional: si Cowork considera que alguno de esos criterios **ya no esta vigente** (como paso con D3.3), decirlo — un test hueco de un criterio muerto se borra, no se implementa.

`Referencias:` ADR-037 (accion derivada), ADR-038, `[GAP-TESTS-INTEGRACION-HUECOS]` P1 en `BACKLOG.md`, `[GAP-D33-OCCUPATIONS-HEADING-SIN-CONSUMIDOR]` (el caso que motivo la auditoria).
