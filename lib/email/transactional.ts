/**
 * Transactional email — D3.7 + Plan 01-09 Wave 6.
 *
 * `sendReportReadyEmail` envia UN SOLO email tras la generacion del reporte.
 * Decisiones D3.7 verbatim:
 *   - Un solo email (NO recordatorios automaticos — zona gris PRD-tono).
 *   - Plain HTML + 1 boton CTA (no React Email components Phase 1).
 *   - NO tracking pixel. NO imagenes externas. NO links de unsubscribe
 *     (es transaccional, no marketing — quedan fuera de Ley 1581 marketing
 *     opt-out porque el usuario YA dio consent + el contenido es funcional
 *     al servicio que pidio).
 *
 * Dependency injection: el cliente Resend se acepta como opcional para
 * permitir test unit. En produccion el caller pasa `new Resend(apiKey)`
 * o la fabrica lo construye via `process.env.RESEND_API_KEY`.
 *
 * Anchors:
 *  - 01-CONTEXT.md D3.7.
 *  - 01-RESEARCH.md lineas 1422-1426 (Resend Phase 1 minimal 1 email).
 *  - PLAN.md threat T-01-09-03 (Resend logs accept; tokenized link inocuo
 *    sin cookie auth).
 */
import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

import { writeAudit } from "@/lib/audit/writer";
import { emailTransactional as MC } from "@/lib/i18n/microcopy/es-CO/email-transactional";
import { logger } from "@/lib/logger";

/**
 * Minimal structural type of the Resend client. Avoids importing the
 * `resend` package at module load so tests inject mocks cleanly.
 */
export interface ResendLike {
  emails: {
    send: (payload: {
      from: string;
      to: string | string[];
      subject: string;
      html: string;
      reply_to?: string;
    }) => Promise<{
      data: { id: string } | null;
      error: { message: string; name?: string } | null;
    }>;
  };
}

export interface SendReportReadyEmailInput {
  to: string;
  userId: string;
  sessionId: string;
  /** Base URL of the app, e.g. https://descubreme.example. */
  appBaseUrl: string;
  /** Override the From address (e.g. for staging). */
  fromAddress?: string;
}

export interface SendReportReadyEmailOptions {
  /** Inject a Resend-shaped client (used in tests). */
  resendClient?: ResendLike;
  /**
   * Optional Supabase service-role client to write an audit_log
   * `email_sent` row (T-01-09-05 mitigation). When omitted the audit is
   * skipped — used in tests that mock at the email-sender boundary.
   */
  supabaseAdmin?: SupabaseClient;
}

export interface SendReportReadyEmailResult {
  ok: boolean;
  messageId: string | null;
  error?: string;
}

/**
 * Default `from` address. Resend rejects a `from` whose domain is not
 * verified, so this MUST be the verified sender. Read from
 * `RESEND_SENDER_EMAIL` (the .env contract) and fall back to the verified
 * `noreply@descubreme.co` — NEVER the `descubreme.example` placeholder,
 * which Resend bounced and silently dropped the report-ready email
 * ([GAP-REPORT-READY-EMAIL-FROM]).
 */
const DEFAULT_FROM = `${MC.MC_EMAIL_WELCOME_FROM_NAME} <${process.env.RESEND_SENDER_EMAIL ?? "noreply@descubreme.co"}>`;

export async function sendReportReadyEmail(
  input: SendReportReadyEmailInput,
  options: SendReportReadyEmailOptions = {},
): Promise<SendReportReadyEmailResult> {
  const client = options.resendClient ?? (await resolveDefaultResendClient());
  if (!client) {
    logger.error(
      { user_id_present: !!input.userId },
      "resend_client_unavailable",
    );
    return { ok: false, messageId: null, error: "resend_client_unavailable" };
  }

  const ctaUrl = `${input.appBaseUrl.replace(/\/$/, "")}/reporte/${input.sessionId}`;
  const html = renderHtml({
    greeting: MC.MC_EMAIL_WELCOME_GREETING,
    body: MC.MC_EMAIL_WELCOME_BODY,
    ctaLabel: MC.MC_EMAIL_WELCOME_CTA,
    ctaUrl,
    signoff: MC.MC_EMAIL_WELCOME_SIGNOFF,
    footer: MC.MC_EMAIL_WELCOME_FOOTER,
  });

  const { data, error } = await client.emails.send({
    from: input.fromAddress ?? DEFAULT_FROM,
    to: input.to,
    subject: MC.MC_EMAIL_WELCOME_SUBJECT,
    html,
  });

  if (error || !data) {
    logger.error(
      {
        // NEVER log `to` — pino redact catches `email` but defense in depth.
        session_id: input.sessionId,
        error_name: error?.name,
      },
      "report_ready_email_send_failed",
    );
    return {
      ok: false,
      messageId: null,
      error: error?.message ?? "send_failed",
    };
  }

  logger.info(
    {
      session_id: input.sessionId,
      message_id: data.id,
      // Note: `to` is NOT logged. Pino redact would catch `email` keys at
      // depth, but we name the field defensively here.
    },
    "report_ready_email_sent",
  );

  // T-01-09-05 mitigation: append-only audit trail for the send event.
  // `meta` carries the resend message id so we can correlate with Resend
  // dashboard manually. NEVER include `to` (PII) — pino redact would
  // catch it, but the audit_log writer enforces no-PII at the contract.
  if (options.supabaseAdmin) {
    try {
      await writeAudit(options.supabaseAdmin, {
        actor_id: input.userId,
        actor_role: "system",
        action: "email_sent",
        entity_type: "report_snapshot",
        entity_id: input.sessionId,
        meta: { message_id: data.id, template: "report_ready" },
      });
    } catch (err) {
      // Audit failure is loud but does not unsend the email — the email
      // already left the building. Surface for ops.
      logger.error(
        {
          session_id: input.sessionId,
          message: (err as Error).message,
        },
        "report_ready_email_audit_failed",
      );
    }
  }

  return { ok: true, messageId: data.id };
}

/**
 * Lazy-loads the Resend SDK when no injected client is provided. Returns
 * null when the package or API key is missing — caller surfaces the
 * "send_failed" path.
 */
async function resolveDefaultResendClient(): Promise<ResendLike | null> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  try {
    const mod = await import("resend");
    const ResendCtor = (mod as { Resend: new (key: string) => unknown }).Resend;
    return new ResendCtor(apiKey) as ResendLike;
  } catch (err) {
    logger.error(
      { message: (err as Error).message },
      "resend_module_load_failed",
    );
    return null;
  }
}

/**
 * Renders the minimal HTML body — plain text + 1 CTA button.
 *
 * Anti-pattern budget:
 *  - NO <img> tags (no pixel tracking, no remote images).
 *  - NO inline tracking JS.
 *  - NO unsubscribe link (transactional, NOT marketing).
 *  - Plain inline styles (Gmail strips <style> in many cases).
 */
function renderHtml(params: {
  greeting: string;
  body: string;
  ctaLabel: string;
  ctaUrl: string;
  signoff: string;
  footer: string;
}): string {
  const ctaUrl = escapeHtml(params.ctaUrl);
  // Signoff carries \n — convert to <br/> for HTML.
  const signoffHtml = escapeHtml(params.signoff).replace(/\n/g, "<br/>");
  return `<!doctype html>
<html lang="es-CO">
<head><meta charset="utf-8"><title>${escapeHtml(params.greeting)}</title></head>
<body style="font-family: -apple-system, system-ui, sans-serif; color: #0f1419; line-height: 1.5; max-width: 560px; margin: 0 auto; padding: 24px;">
  <p>${escapeHtml(params.greeting)}</p>
  <p>${escapeHtml(params.body)}</p>
  <p style="margin: 24px 0;">
    <a href="${ctaUrl}" style="display: inline-block; background: #0066ff; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600;">${escapeHtml(params.ctaLabel)}</a>
  </p>
  <p>${signoffHtml}</p>
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;"/>
  <p style="color: #6b7280; font-size: 12px;">${escapeHtml(params.footer)}</p>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
