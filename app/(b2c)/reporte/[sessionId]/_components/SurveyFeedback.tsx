/**
 * SurveyFeedback — 1-5 star feedback + optional free text (D3.4).
 *
 * - 5 radio buttons styled como estrellas con sr-only labels para a11y.
 * - Hit area 44x44 per estrella (UI-SPEC §6.5).
 * - Submit POST /api/feedback {sessionId, stars, text}.
 * - Tras envio: muestra MC_SURVEY_THANKS placeholder.
 *
 * Anchors:
 *  - 01-UI-SPEC.md §7.6 (what next).
 *  - 01-CONTEXT.md D3.4.
 */
"use client";

import { useState } from "react";

import { survey as MC } from "@/lib/i18n/microcopy/es-CO/survey";

interface SurveyFeedbackProps {
  sessionId: string;
}

const STAR_LABELS: Array<{ value: 1 | 2 | 3 | 4 | 5; label: string }> = [
  { value: 1, label: MC.MC_SURVEY_STAR_LABEL_1 },
  { value: 2, label: MC.MC_SURVEY_STAR_LABEL_2 },
  { value: 3, label: MC.MC_SURVEY_STAR_LABEL_3 },
  { value: 4, label: MC.MC_SURVEY_STAR_LABEL_4 },
  { value: 5, label: MC.MC_SURVEY_STAR_LABEL_5 },
];

export function SurveyFeedback({ sessionId }: SurveyFeedbackProps) {
  const [stars, setStars] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (submitted) {
    return (
      <p role="status" className="text-sm text-text-secondary">
        {MC.MC_SURVEY_THANKS}
      </p>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (stars == null) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          sessionId,
          stars,
          text: text.trim() === "" ? null : text.trim().slice(0, 500),
        }),
      });
      if (!res.ok) {
        setError("No pudimos guardar tu feedback. Intenta de nuevo.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("No pudimos guardar tu feedback. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-text-primary">
        {MC.MC_SURVEY_PROMPT}
      </h3>
      <p className="text-xs text-text-secondary">{MC.MC_SURVEY_STARS_HELPER}</p>

      <fieldset
        role="radiogroup"
        aria-label={MC.MC_SURVEY_PROMPT}
        className="flex items-center gap-1"
      >
        <legend className="sr-only">{MC.MC_SURVEY_PROMPT}</legend>
        {STAR_LABELS.map((s) => (
          <label
            key={s.value}
            className="inline-flex cursor-pointer items-center justify-center"
            style={{ minWidth: 44, minHeight: 44 }}
          >
            <input
              type="radio"
              name="stars"
              value={s.value}
              checked={stars === s.value}
              onChange={() => setStars(s.value)}
              className="sr-only"
            />
            <span aria-hidden="true" className="text-2xl">
              {stars != null && s.value <= stars ? "★" : "☆"}
            </span>
            <span className="sr-only">{s.label}</span>
          </label>
        ))}
      </fieldset>

      <label className="flex flex-col gap-1">
        <span className="sr-only">{MC.MC_SURVEY_TEXTFIELD_HINT}</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={MC.MC_SURVEY_TEXTFIELD_HINT}
          maxLength={500}
          className="rounded-md border border-border-default bg-surface-secondary p-2 text-sm text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          rows={3}
        />
      </label>

      <button
        type="submit"
        disabled={stars == null || submitting}
        className="self-start rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
      >
        {MC.MC_SURVEY_SUBMIT}
      </button>

      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </form>
  );
}
