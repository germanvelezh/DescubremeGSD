/**
 * /intencion — intent "taste" (Ola 1.3, HANDOFF_UI §3).
 *
 * Client component: the user picks what they want to understand about themselves
 * BEFORE any account or data (ADR-029 / Ley 1581). The choice travels to /signup
 * as `?intent=<slug>` and is persisted to user_metadata there — nothing is sent to
 * the server here. Recalled post-auth on the map (1.6), the transition and teaser.
 *
 * Anchors:
 * - MICROCOPY_ES-CO_SIGNOFF_v1.1 §2 (Intención).
 * - auditoria-ux-ui/prototipo-rediseno-free-v2.html (pantalla "2 · Intención").
 */
"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";

import { PaperShell } from "@/components/PaperShell";
import {
  DEFAULT_INTENT,
  INTENT_OPTIONS,
  type IntentSlug,
  intencion,
} from "@/lib/i18n/microcopy/es-CO/intencion";

const ICONS: Record<IntentSlug, ReactNode> = {
  general: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M3 12h18" />
    </>
  ),
  carrera: (
    <>
      <path d="M3 12h12M11 6l6 6-6 6" />
      <path d="M21 4v16" />
    </>
  ),
  bienestar: (
    <path d="M20.8 7.6a5 5 0 0 0-8.8-3 5 5 0 0 0-8.8 3c0 4.5 8.8 9.4 8.8 9.4s8.8-4.9 8.8-9.4z" />
  ),
};

export default function IntencionPage() {
  const [selected, setSelected] = useState<IntentSlug>(DEFAULT_INTENT);

  return (
    <PaperShell width="narrow">
      <div className="flex flex-1 flex-col items-center justify-center pb-10 text-center">
        <span
          className="mb-3 inline-block rounded-full border px-3 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.06em] motion-safe:animate-fade-in"
          style={{
            color: "var(--dm-sage-deep)",
            backgroundColor: "color-mix(in srgb, var(--dm-sage) 10%, transparent)",
            borderColor: "color-mix(in srgb, var(--dm-sage) 25%, transparent)",
          }}
        >
          {intencion.MC_INTENT_TAG}
        </span>
        <h1 className="font-display text-[clamp(1.75rem,5vw,2rem)] font-normal leading-tight text-text-primary motion-safe:animate-line-reveal">
          {intencion.MC_INTENT_QUESTION}
        </h1>
        <p className="mt-2 max-w-[42ch] text-[15px] leading-relaxed text-text-secondary motion-safe:animate-fade-in [animation-delay:120ms]">
          {intencion.MC_INTENT_SUB}
        </p>

        <div role="group" className="mt-6 flex w-full flex-col gap-3 text-left">
          {INTENT_OPTIONS.map((o, i) => {
            const isSel = selected === o.slug;
            return (
              <button
                key={o.slug}
                type="button"
                aria-pressed={isSel}
                onClick={() => setSelected(o.slug)}
                style={{ animationDelay: `${180 + i * 60}ms` }}
                className={`flex w-full items-center gap-4 rounded-[14px] border bg-secondary p-4 text-left transition-[border-color,transform,box-shadow] duration-[var(--duration-micro)] hover:-translate-y-px motion-safe:animate-fade-in ${
                  isSel
                    ? "border-accent shadow-[0_10px_26px_-16px_rgba(176,82,42,0.8)]"
                    : "border-border-default hover:border-[var(--dm-sage)]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 flex-none items-center justify-center rounded-[10px]"
                  style={{ backgroundColor: "var(--dm-paper-2)", color: "var(--dm-terracotta-deep)" }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {ICONS[o.slug]}
                  </svg>
                </span>
                <span>
                  <span className="block font-semibold text-text-primary">{o.title}</span>
                  <span className="block text-[13.5px] text-text-secondary">{o.desc}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 motion-safe:animate-fade-in [animation-delay:400ms]">
          <Link
            href={`/signup?intent=${selected}`}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-secondary transition-[transform,background-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:-translate-y-0.5 hover:bg-[var(--dm-terracotta-deep)]"
          >
            {intencion.MC_INTENT_CTA}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </PaperShell>
  );
}
