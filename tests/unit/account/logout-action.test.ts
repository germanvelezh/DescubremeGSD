/**
 * `logoutAction` — [GAP-SIN-LOGOUT-SESION-PERSISTENTE].
 *
 * Antes de este fix la app no tenia forma de cerrar sesion: `signOut` existia
 * solo en ramas de error del callback y despues de borrar la cuenta, o sea
 * nunca como accion del usuario.
 *
 * ESTOS TESTS AFIRMAN EFECTO, NO LLAMADAS. "se invoco signOut" es exactamente
 * la forma vacua que el gate 16 (ADR-039) existe para atrapar: pasa igual si el
 * `delete` de la cookie es un no-op. Asi que:
 *
 *   - el cookie store es un Map REAL cuyo `delete` muta de verdad -> se afirma
 *     que la cookie YA NO ESTA en el store, no que se llamo a delete;
 *   - `signOut()` del cliente mockeado apaga la identidad de verdad -> se
 *     afirma que un `getUser()` POSTERIOR devuelve null, no que se llamo.
 *
 * `Frontera del mock` (patron de COMPL-17): se simula QUIEN llama y el
 * transporte de cookies —lo unico que no existe sin servidor HTTP— nunca lo que
 * el control consulta.
 *
 * Verificado por falsacion; ver el bloque al final del archivo.
 *
 * Anchors:
 *  - app/(account)/me/data/actions.ts (logoutAction).
 *  - middleware.ts:50-55 (la cookie se setea con path "/").
 *  - lib/session/anonymous.ts:25 (la cookie es el UNICO identificador de cliente).
 */
// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ANONYMOUS_COOKIE_NAME } from "@/lib/session/anonymous";

const REDIRECT_MARKER = "NEXT_REDIRECT_TEST";

const state = vi.hoisted(() => ({
  /** Identidad de la sesion de Supabase. null = sin sesion. */
  authUserId: null as string | null,
  /** Cookie store en memoria; `delete` muta este Map de verdad. */
  jar: new Map<string, string>(),
  /** Destino del ultimo redirect(). */
  redirectedTo: null as string | null,
}));

vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => ({
    get: (name: string) =>
      state.jar.has(name)
        ? { name, value: state.jar.get(name) as string }
        : undefined,
    set: (name: string, value: string) => {
      state.jar.set(name, value);
    },
    delete: (name: string) => {
      state.jar.delete(name);
    },
  })),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn((to: string) => {
    state.redirectedTo = to;
    // El redirect real lanza; si no lanzamos, un `signOut` colocado DESPUES del
    // redirect pareceria correr y el test mentiria sobre el orden.
    throw new Error(REDIRECT_MARKER);
  }),
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseServerClient: vi.fn(async () => ({
    auth: {
      getUser: async () => ({
        data: { user: state.authUserId ? { id: state.authUserId } : null },
        error: null,
      }),
      signOut: async () => {
        state.authUserId = null;
        return { error: null };
      },
    },
  })),
}));

// Dependencias de `updateProfileAction`, el otro export del modulo. Se mockean
// para que importar el modulo no arrastre el secreto de PII ni el admin client.
vi.mock("@/lib/logger", () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));
vi.mock("@/lib/crypto/pii", () => ({ encryptPII: vi.fn() }));
vi.mock("@/lib/audit/writer", () => ({ writeAudit: vi.fn() }));
vi.mock("@/lib/supabase/service-role", () => ({
  getSupabaseAdminClient: vi.fn(),
}));

import { logoutAction } from "@/app/(account)/me/data/actions";
import { getSupabaseServerClient } from "@/lib/supabase/server";

/** Corre la accion y absorbe el throw del redirect. */
async function runLogout(): Promise<void> {
  await expect(logoutAction()).rejects.toThrow(REDIRECT_MARKER);
}

describe("logoutAction — [GAP-SIN-LOGOUT-SESION-PERSISTENTE]", () => {
  beforeEach(() => {
    state.authUserId = "user-abc";
    state.redirectedTo = null;
    state.jar.clear();
    state.jar.set(ANONYMOUS_COOKIE_NAME, "anon-en-curso-123");
  });

  it("deja al usuario SIN sesion: un getUser() posterior devuelve null", async () => {
    // Precondicion falsable: la sesion existe ANTES. Sin esto, un test que
    // afirma "no hay sesion" pasaria contra un estado que ya era null.
    const before = await (await getSupabaseServerClient()).auth.getUser();
    expect(before.data.user).toEqual({ id: "user-abc" });

    await runLogout();

    const after = await (await getSupabaseServerClient()).auth.getUser();
    expect(after.data.user).toBeNull();
  });

  it("borra la cookie de sesion anonima del store, no solo llama a delete", async () => {
    expect(state.jar.has(ANONYMOUS_COOKIE_NAME)).toBe(true);

    await runLogout();

    // El efecto: la cookie ya no esta. Es lo que impide que el siguiente usuario
    // del dispositivo herede las respuestas de test en curso (hasta 7 dias).
    expect(state.jar.has(ANONYMOUS_COOKIE_NAME)).toBe(false);
    expect(state.jar.get(ANONYMOUS_COOKIE_NAME)).toBeUndefined();
  });

  it("borra AMBAS cosas en la misma pasada (la decision era doble)", async () => {
    await runLogout();

    const after = await (await getSupabaseServerClient()).auth.getUser();
    expect(after.data.user).toBeNull();
    expect(state.jar.has(ANONYMOUS_COOKIE_NAME)).toBe(false);
  });

  it("manda a `/`, no a `/signup`", async () => {
    await runLogout();

    // `/signup` es el destino del guard de no-autenticado; mandar ahi justo
    // despues de cerrar sesion se lee como un bug, no como un logout.
    expect(state.redirectedTo).toBe("/");
  });

  it("no depende de que la cookie anonima exista", async () => {
    // Un usuario que nunca arranco un test no tiene la cookie. El logout tiene
    // que cerrar la sesion igual, sin lanzar.
    state.jar.clear();

    await runLogout();

    const after = await (await getSupabaseServerClient()).auth.getUser();
    expect(after.data.user).toBeNull();
    expect(state.redirectedTo).toBe("/");
  });
});

// ---------------------------------------------------------------------------
// FALSACION (corrida a mano el 2026-07-30, dos inyecciones, conjuntos disjuntos):
//
//   1. Comentar `cookieStore.delete(ANONYMOUS_COOKIE_NAME)` en la accion
//      -> enrojecen SOLO los 2 tests de cookie ("borra la cookie...", "borra
//         AMBAS..."). Los de sesion y redirect siguen verdes.
//   2. Comentar `await supabase.auth.signOut()`
//      -> enrojecen SOLO los 3 que afirman `getUser() === null`. Los de cookie
//         y redirect siguen verdes.
//
// Que los conjuntos sean disjuntos es el punto: prueba que cada mitad de la
// decision de German tiene su propio guardia y que ninguno tapa al otro.
// ---------------------------------------------------------------------------
