/**
 * Integration scaffold COMPL-12 + COMPL-13 — ethics middleware.
 *
 * `evaluateInstrumentEthics(supabase, instrumentVersionId)` lee la row
 * `instrument.ethical_flags` y retorna:
 *   - ONET-IP-SF (ethical_flags=[]): { requires_disclaimer: false,
 *     requires_contention_route: false, flags: [] }.
 *   - MOCK-DISTRESS-1 (ethical_flags.emotional_distress=true):
 *     { requires_disclaimer: true, requires_contention_route: true,
 *       flags: ['emotional_distress'] }.
 *
 * D3.12 difiere UI a Phase 2; este test cubre el seam (DB → middleware →
 * decision). UI modal/banner NO se construye en Phase 1.
 *
 * Anchors:
 *   - 01-RESEARCH.md lineas 1325-1349 (verbatim middleware).
 *   - 01-CONTEXT.md D3.12 (NFR-27/28 plumbing Phase 1).
 *   - db/seeds/mocks/MOCK-DISTRESS-1/instrument.sql.
 */
// @vitest-environment node
import {describe, it} from "vitest";

describe("COMPL-12/13: ethics middleware (DB-driven)", () => {
  // 1. Load ONET-IP-SF instrument from prod seed.
  // 2. evaluateInstrumentEthics(supabase, instrumentVersionId) →
  //    { requires_disclaimer: false, requires_contention_route: false, flags: [] }.
  it.todo("ONET-IP-SF (low-risk) returns disclaimer=false");

  // 1. Load MOCK-DISTRESS-1 seed via db/seeds/mocks/MOCK-DISTRESS-1/instrument.sql.
  // 2. evaluateInstrumentEthics →
  //    { requires_disclaimer: true, requires_contention_route: true,
  //      flags: ['emotional_distress'] }.
  // 3. recordDistressEvent → INSERT row distress_event(action_taken='disclaimer_shown').
  it.todo("MOCK-DISTRESS-1 (ethical_flags.emotional_distress=true) → disclaimer=true + contention=true");

  it.todo("missing instrument_version_id throws deterministic error");

  it.todo("contract documented; runtime gated on DATABASE_URL");
});
