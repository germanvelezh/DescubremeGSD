# implementation_packs/

Pack operacional por instrumento con todo lo que Claude Code necesita para plugin-izar el test.

**Tier:** 2 (cargar junto con el dossier correspondiente cuando se trabaje el test).

---

## Diferencia con dossiers

| Dossier (dossiers/) | Implementation Pack (implementation_packs/) |
|---|---|
| Evidencia psicometrica (el "porque") | Materiales operativos (el "que exacto") |
| Validez, confiabilidad, sesgos, contexto | Items literales, scoring formula, baremos, licencia |
| Para Cowork al razonar | Para Claude Code al implementar |

---

## Que contiene un implementation pack

- Items literales con numero de secuencia y faceta asignada
- Claves inversas marcadas
- Sensitivity flag por item (`emotional_distress`, `social_desirability`, etc.)
- Escala Likert exacta
- Formulas de scoring por faceta y dominio
- Reglas de recodificacion de inversos
- Baremos en JSON o tabla por pais / sexo / edad
- Texto de interpretacion por banda (low / medium / high)
- Pre-test disclaimer si aplica
- Post-test mitigation copy si aplica
- Metadata de licencia: titular, contacto, terminos, costo, atribucion requerida
- Cuotas de administracion permitidas (si la licencia las define)

---

## Archivos esperados

| Test | Pack | Estado |
|---|---|---|
| BFI-2-S 30 | `BFI-2-S_Implementation_Acquisition_Pack_v1.0_Consolidado.md` | Cargado |
| BFI-2 60 | Pendiente | — |
| VIA-IS-P 96 | Pendiente | — |
| WDQ-40 | Pendiente | — |
| PVQ-RR | Pendiente | — |
| PANAS | Pendiente | — |
| SWLS | Pendiente | — |
| (Resto del stack) | Pendiente | — |

---

## Convencion de nombres

`<CODIGO>_Implementation_Acquisition_Pack_v<X.Y>.md`

Si hay revision mayor del pack (e.g., nueva traduccion, baremo nuevo), incrementar version: `_v1.1`, `_v2.0`.

---

*Cada pack debe alinearse 1:1 con su dossier correspondiente en `dossiers/`. Si hay discrepancias, prevalece el dossier (es la fuente psicometrica).*
