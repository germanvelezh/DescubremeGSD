# arquitectura/ — DescubreMe (v2.0)

Capa conceptual del proyecto (Tier 1). Es input para la fundacion (fase 1) de GSD/Claude Code. Conceptual, no codigo.

| Archivo | Que es | Cuando leerlo |
|---|---|---|
| `MATRIZ_MAESTRA.md` | Referencia consolidada por instrumento (constructo, items, scoring, baremo, licencia preliminar, plan-B, productos, ethical_flags) | Al decidir o revisar el stack |
| `MODELO_DATOS_CONCEPTUAL.md` | Modelo entidad-relacion conceptual (instrumento-plugin, respuestas, integrador, multi-tenant B2B, compliance) | Al planear/implementar la fase 1 |
| `STACK_POR_PRODUCTO.md` | Composicion por producto: instrumentos + capas de reporte + orden + mapeo lentes B2B | Al armar un producto especifico |

`Reglas:` la autoridad de detalle de cada instrumento es su `dossiers/` + `implementation_packs/`. En conflicto sobre producto, prevalece `PRD_MAESTRO.md`; sobre implementacion tecnica, decide Claude Code. Greenfield: el codigo v1.5 es referencia, no base.

*Actualizado: 2026-06-05.*
