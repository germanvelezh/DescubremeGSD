/**
 * Security regression — Open Redirect via `next` query param at
 * `/auth/callback`. Without `safeNextPath`, `new URL(next, base)` can be
 * coerced into a different origin (post-auth phishing).
 *
 * Anchor: Plan 01-07 fix — security review flagged
 * `app/(auth)/callback/route.ts` line 73 as MEDIUM Open Redirect.
 */
import { describe, expect, it } from "vitest";

import { safeNextPath } from "@/app/(auth)/callback/route";

describe("safeNextPath", () => {
  it("allows clean internal paths", () => {
    expect(safeNextPath("/")).toBe("/");
    expect(safeNextPath("/reporte/abc-123")).toBe("/reporte/abc-123");
    expect(safeNextPath("/test/ONET-IP-SF?resumed=1")).toBe(
      "/test/ONET-IP-SF?resumed=1",
    );
  });

  it("rejects protocol-relative URLs", () => {
    expect(safeNextPath("//evil.com")).toBe("/");
    expect(safeNextPath("//evil.com/x")).toBe("/");
  });

  it("rejects absolute URLs", () => {
    expect(safeNextPath("https://evil.com")).toBe("/");
    expect(safeNextPath("http://evil.com/x")).toBe("/");
    expect(safeNextPath("javascript:alert(1)")).toBe("/");
  });

  it("rejects backslash-escaped variants", () => {
    expect(safeNextPath("/\\evil.com")).toBe("/");
    expect(safeNextPath("/\\/evil.com")).toBe("/");
  });

  it("rejects empty, null, undefined, non-strings", () => {
    expect(safeNextPath(null)).toBe("/");
    expect(safeNextPath(undefined)).toBe("/");
    expect(safeNextPath("")).toBe("/");
    // biome-ignore lint/suspicious/noExplicitAny: testing type-coercion guard
    expect(safeNextPath(123 as any)).toBe("/");
  });

  it("rejects paths without leading slash", () => {
    expect(safeNextPath("evil.com")).toBe("/");
    expect(safeNextPath("../etc/passwd")).toBe("/");
  });
});
