/**
 * D-19 — el canal por el que viaja `x-geo-country` (Plan 03-01, Fase 3).
 *
 * ESTE ES EL TEST DISCRIMINANTE de la fase: separa "la linea existe en
 * middleware.ts" de "algo la consume". `03-RESEARCH.md:312` afirmaba que "el
 * middleware ya reenvia el header" — leer el archivo confirma que hay una
 * linea que escribe `x-geo-country`, y esa lectura es exactamente lo que hace
 * que el bug sobreviva. La linea escribe en el canal EQUIVOCADO.
 *
 * Dos canales distintos salen de una misma funcion de middleware:
 *
 *   1. `NextResponse.next({ request: { headers } })` -> canal de PETICION.
 *      Next lo codifica en la respuesta como `x-middleware-override-headers`
 *      + `x-middleware-request-<nombre>`, y es lo que `headers()` lee dentro
 *      de un Server Component.
 *   2. `response.headers.set(...)` -> canal de RESPUESTA, hacia el navegador.
 *      Un Server Component NUNCA lo ve.
 *
 * El middleware escribia solo en (2), asi que `headers().get("x-geo-country")`
 * daba null siempre y todo consumidor caia a su default ("CO"). Con D-19 eso
 * significa cobrarle en la moneda equivocada a quien esta fuera de Colombia.
 *
 * La codificacion `x-middleware-request-*` se verifico empiricamente contra
 * Next 16 antes de escribir estas afirmaciones, no se asumio de la doc.
 *
 * NOTA de forma: se afirma sobre el EFECTO observable del middleware, no sobre
 * la presencia de una linea de codigo. Un test que buscara la cadena
 * "x-geo-country" en el fuente habria pasado en verde durante todo el tiempo
 * que el bug estuvo vivo.
 *
 * Anchors:
 *   - 03-01-PLAN.md must_haves D-19, key_links, Task 3 step 3.
 *   - lib/geo/header.ts (los dos nombres).
 *   - app/(auth)/signup/page.tsx:49 (el consumidor que hoy siempre cae a "CO").
 */
import { describe, expect, test } from "vitest";
import { NextRequest } from "next/server";

import { middleware } from "@/middleware";
import { GEO_COUNTRY_HEADER, VERCEL_GEO_HEADER } from "@/lib/geo/header";

/** Nombre bajo el que Next expone una cabecera de PETICION reenviada. */
const forwardedRequestHeader = (name: string) => `x-middleware-request-${name}`;

function runMiddleware(url: string, headers: Record<string, string> = {}) {
  return middleware(new NextRequest(url, { headers }));
}

describe("D-19 — x-geo-country viaja por el canal de PETICION", () => {
  test("una peticion con x-vercel-ip-country: US reenvia x-geo-country=US al servidor", () => {
    const res = runMiddleware("https://descubreme.test/paid", {
      [VERCEL_GEO_HEADER]: "US",
    });

    // La afirmacion que estaba en rojo antes del arreglo.
    expect(res.headers.get(forwardedRequestHeader(GEO_COUNTRY_HEADER))).toBe("US");

    // Y queda declarada como cabecera sobreescrita, que es lo que hace que
    // Next la inyecte en la peticion que ve el Server Component.
    expect(res.headers.get("x-middleware-override-headers")).toContain(
      GEO_COUNTRY_HEADER,
    );
  });

  test("sin la cabecera de plataforma no se reenvia nada (el consumidor cae a su default)", () => {
    const res = runMiddleware("https://descubreme.test/paid");

    expect(res.headers.get(forwardedRequestHeader(GEO_COUNTRY_HEADER))).toBeNull();
  });

  test("el canal de RESPUESTA se mantiene: no se quita nada, se anade el que faltaba", () => {
    const res = runMiddleware("https://descubreme.test/paid", {
      [VERCEL_GEO_HEADER]: "US",
    });

    // El `set` sobre la respuesta sigue ahi para cualquier consumidor de
    // cliente. El arreglo es aditivo.
    expect(res.headers.get(GEO_COUNTRY_HEADER)).toBe("US");
  });

  test("el pais viaja tal cual, sin normalizar (CO tambien se reenvia explicitamente)", () => {
    const res = runMiddleware("https://descubreme.test/paid", {
      [VERCEL_GEO_HEADER]: "CO",
    });

    // Importa que "CO" llegue por dato y no por coincidencia con el default:
    // si el reenvio se rompiera otra vez, el consumidor seguiria diciendo "CO"
    // y nadie lo notaria. Aca queda afirmado que llego de verdad.
    expect(res.headers.get(forwardedRequestHeader(GEO_COUNTRY_HEADER))).toBe("CO");
  });

  test("no rompe el minteo de la cookie anonima en /test/* (regresion Fase 1)", () => {
    const res = runMiddleware("https://descubreme.test/test/onet-ip-sf", {
      [VERCEL_GEO_HEADER]: "US",
    });

    // La cookie se sigue emitiendo al navegador...
    expect(res.cookies.get("anonymous_session_id")?.value).toBeTruthy();
    // ...y sigue viajando por el canal de peticion, junto al geo nuevo.
    expect(res.headers.get(forwardedRequestHeader(GEO_COUNTRY_HEADER))).toBe("US");
  });
});
