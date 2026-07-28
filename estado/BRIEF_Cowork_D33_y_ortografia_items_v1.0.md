# BRIEF Cowork — 2 consultas de contenido es-CO

**Fecha:** 2026-07-28. **Origen:** cierre de `[GAP-E2E-SKIPS-E2E-LIVE]` (PR #42) + escaneo de ortografia es-CO (PRs #41/#43/#45).
**Pide:** German Velez Hurtado. **Responde:** Cowork (UX Writer + Investigador psicometrico).
**Bloquea:** la consulta 1 bloquea cerrar `[GAP-D33-OCCUPATIONS-HEADING-SIN-CONSUMIDOR]`; la 2 bloquea el reseed de prod de `[GAP-STEMS-ORTOGRAFIA-RESEED-PROD]`.

Las dos son **decisiones de contenido**, no tecnicas. Claude Code se detuvo a proposito en ambas y no toco nada.

---

## Consulta 1 — D3.3: ¿sigue vigente el encabezado verbatim de ocupaciones?

### Hecho

`lib/i18n/microcopy/es-CO/report.ts` define:

```
MC_REPORT_OCCUPATIONS_HEADING: "Areas donde gente con tu perfil suele encontrar engagement"
```

y lo marca **en el mismo archivo** como:

> `VERBATIM (no tocar — acceptance gate D3.3)`

**Ese texto tiene CERO consumidores** en `app/` y en `lib/` (grep verificado). La Fase 02.1 Wave 5 lo sustituyo, en **las dos** ramas de la seccion de ocupaciones del reporte, por:

```
MC_NIVEL_REVEAL_TITLE: "Campos que podrían resonar contigo"
```

### Como se descubrio (importa para calibrar el riesgo)

El unico test que vigilaba ese verbatim estaba **`skipped`** desde la Fase 1. Al encenderlo (PR #42) fallo, y ahi aparecio que el requisito ya no se cumplia. **No hay forma de saber cuanto tiempo lleva asi.** El reporte se ha estado sirviendo en produccion con el encabezado nuevo.

### Inferencia (de Claude Code, para que la contradigan si corresponde)

El copy que **si** se renderiza es igualmente **anti-determinista**: "Campos que **podrían resonar** contigo" no afirma vocacion, igual que "Areas donde gente con tu perfil **suele** encontrar engagement". `Inferencia:` la **intencion etica** de D3.3 parece preservada; lo que se rompio es el **contrato verbatim**, no necesariamente la salvaguarda.

`Opinion profesional:` un archivo que declara "acceptance gate, no tocar" sobre una cadena que nadie usa es peor que no declarar nada — entrena a leer esas marcas como decorativas. Sea cual sea la decision, la marca deberia quedar coherente con la realidad.

### Lo que se necesita de Cowork

Elegir una y justificar en 2-3 lineas:

- **(A) D3.3 sigue vigente** -> restaurar el encabezado verbatim en la seccion de ocupaciones. Requiere decidir que pasa con "Campos que podrían resonar contigo": ¿se reemplaza, o conviven como titulo y subtitulo?
- **(B) D3.3 quedo superado** por el reveal de nivel (Fase 02.1 Wave 5) -> retirar el microcopy huerfano y su linea de contrato verbatim, y **declarar cual es el nuevo texto protegido**, si alguno.
- **(C) Otra** — p.ej. redactar un encabezado nuevo que cumpla D3.3 y encaje con el flujo de nivel.

`Nota:` si la respuesta es (B), conviene decir explicitamente si **alguna** cadena de la seccion de ocupaciones queda bajo pin verbatim. Hoy el test de #42 conserva la mitad dura de D3.3 —**el reporte nunca dice "tu carrera ideal"**— y esa asercion se mantiene pase lo que pase.

---

## Consulta 2 — Ortografia de los item banks: ¿firma para tocar prod?

### Hecho

**41 de 90 stems** tienen ortografia incorrecta en es-CO: **13 de los 30** de **BFI-2-S** y **28 de los 60** de **O*NET-IP-SF**. Son tildes faltantes y, en cuatro casos, **ñ**.

`Nota de politica editorial (CLAUDE.md raiz §6):` **no se reproduce el texto literal de los items**. Se identifican por codigo y las correcciones se listan a nivel de **palabra** — una palabra suelta no es un item.

**Items afectados:**

- **BFI-2-S** (`item_code`): `BFI-2-60-2, -4, -5, -7, -12, -20, -24, -37, -41, -47, -54, -55, -57`
- **O*NET-IP-SF** (`sequence_number`): `3, 5, 6, 7, 9, 12, 13, 18, 19, 23, 25, 27, 30, 31, 34, 35, 36, 37, 38, 39, 43, 44, 48, 49, 51, 55, 57, 60`

**Las 40 correcciones, forma actual -> forma correcta:**

| | | |
|---|---|---|
| almacen -> almacén | animo -> ánimo | area -> área |
| artisticos -> artísticos | azucar -> azúcar | barberia -> barbería |
| biologia -> biología | calculo -> cálculo | camion -> camión |
| comodo/a -> cómodo/a | contaminacion -> contaminación | corazon -> corazón |
| demas -> demás | electrodomesticos -> electrodomésticos | electronicas -> electrónicas |
| energia -> energía | ensenar -> **enseñar** | ensenarle -> **enseñarle** |
| ensenarles -> **enseñarles** | envio -> envío | estres -> estrés |
| frio/a -> frío/a | guarderia -> guardería | interes -> interés |
| linea -> línea | maquinas -> máquinas | melancolico/a -> melancólico/a |
| mercancia -> mercancía | musica -> música | ninos -> **niños** |
| organizacion -> organización | peliculas -> películas | portatil -> portátil |
| quimicos -> químicos | recepcion -> recepción | rehabilitacion -> rehabilitación |
| salon -> salón | senas -> señas | sesion -> sesión |
| television -> televisión | | |

`Como se decidieron:` se extrajeron las **307 palabras distintas** de los 90 stems y se revisaron una por una. Las ambiguas se resolvieron **en contexto**, no por lista automatica: `el`, `tu` y `se` quedan como estan (articulo, posesivo, reflexivo); `intereses`, `musical`, `practicar` y `calculadora` no llevan tilde.

**No es un problema de encoding:** PERMA-Profiler tiene sus **23 stems correctamente acentuados**, en la misma columna y el mismo pipeline de seeds.

**Peso:** son items que el usuario **lee literalmente** en el runner, y **O*NET es el PRIMER test del flujo Free** — es el primer texto del producto que ve un usuario nuevo.

### Que ya se hizo y que no

- **PR #43** corrige los **archivos de seed** (fuente de verdad) y cualquier DB nueva, incluida la del CI. Verificado: los conteos no cambian (30 y 60) y no queda ninguna forma mal escrita.
- **Produccion NO cambia con ese merge:** los seeds insertan con `WHERE NOT EXISTS`, asi que contra una DB que ya tiene las filas **pasan de largo en silencio**. Prod necesita un `UPDATE` scopeado aparte.
- **No se pudo leer prod** para confirmar el estado real (bloqueo de permisos del MCP). Lo verificado es local + los archivos de seed.

### Lo que se necesita de Cowork

**Firma para aplicar los 42 stems corregidos a produccion**, o la correccion de los que no correspondan.

`Aclaracion que deberia hacerlo simple:` el cambio es **exclusivamente ortografico**. Ninguna palabra cambia, ningun item se reformula, no se altera el orden ni la clave de puntuacion. Es la misma frase escrita bien.

`Por que se pide firma igual:` son items de **instrumentos validados** (BFI-2-S, O*NET-IP-SF). Reformular un item es decision psicometrica; ponerle la tilde no lo es — pero la frontera la deberia confirmar el rol que responde por la adaptacion es-CO, no quien corre el reseed.

### Pregunta adicional, de una sola linea

¿Corresponde revisar tambien la **redaccion** de estos stems mientras se los toca, o la adaptacion es-CO ya esta firmada y solo se arregla la ortografia? Si es lo segundo, el reseed sale directo.

---

## Contexto para las dos

Superficies del problema es-CO ya identificadas, para que Cowork vea el patron completo:

1. Microcopy `.ts` (OLA 0) — cerrado.
2. `narrative_template` — cerrado (reseed C1 verificado por md5).
3. Teaser / `integrator_rule` — cerrado (PR #26).
4. `instrument_version.what_it_measures` — abierto, `[GAP-FICHA-WHAT-MEASURES-ES-CO]`.
5. **Item banks** — esta consulta, `[GAP-STEMS-ORTOGRAFIA-RESEED-PROD]`.
6. Copy en codigo (`layout.tsx`, `delete.ts`) — cerrado (PR #45).
