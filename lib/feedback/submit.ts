import { postJson } from '@/lib/api/client';
import { createFieldResolver, type ApiResult } from '@/lib/api/errors';
import { SHEETS_ENABLED, SHEET_TABS, postToSheet } from '@/lib/sheets/submit';
import type { SubmitFn } from '@/hooks/use-form-submission';
import type { FeedbackField, FeedbackValues } from './schema';

/**
 * Everything specific to the feedback endpoint: where it lives, what goes on
 * the wire, and which error titles belong to which input.
 */

const ENDPOINT = process.env.NEXT_PUBLIC_BASE_ENDPOINT
  ? `${process.env.NEXT_PUBLIC_BASE_ENDPOINT}/feedback`
  : '';

/**
 * Whether the form accepts submissions.
 *
 * Loosened from the original "explicit flag AND a configured endpoint" rule so
 * a configured Sheets URL also counts. The intent behind that rule is intact —
 * the form still can't go live without *somewhere* real to post — it just
 * accepts a spreadsheet as that somewhere while the API is being built.
 */
export const FEEDBACK_FORM_ENABLED =
  SHEETS_ENABLED ||
  (process.env.NEXT_PUBLIC_FEEDBACK_FORM_ENABLED === 'true' && ENDPOINT !== '');

export interface FeedbackPayload extends FeedbackValues {
  request_id: string;
  source: string;
  company_website: string;
}

/** Names of inputs that ride along in the payload but aren't validated. */
export const FEEDBACK_META_FIELDS = ['company_website'] as const;

/** Keep this in sync with the backend's error catalogue. */
const resolveField = createFieldResolver<FeedbackField>({
  Invalid_subject: 'subject',
  Subject_mismatch: 'subject',
  Subject_too_short: 'subject',
  Subject_too_long: 'subject',

  Invalid_message: 'message',
  Message_too_short: 'message',
  Message_too_long: 'message',
  Message_rejected: 'message',
});

export const submitFeedback: SubmitFn<FeedbackValues> = (
  values,
  { requestId, signal, meta },
): Promise<ApiResult<FeedbackField>> => {
  const payload: FeedbackPayload = {
    ...values,
    request_id: requestId,
    source: 'website_feedback',
    company_website: meta.company_website ?? '',
  };

  // Honeypot: a filled trap gets a success response rather than an error, so a
  // bot learns nothing about why it failed. Nothing is written anywhere.
  if (payload.company_website.trim() !== '') {
    return Promise.resolve({ ok: true });
  }

  // Sheets wins while it's configured. Drop NEXT_PUBLIC_SHEETS_ENDPOINT and
  // this falls straight back to the real API — no code change.
  if (SHEETS_ENABLED) {
    return postToSheet<FeedbackField>(SHEET_TABS.feedback, payload, { signal });
  }

  return postJson<FeedbackField>(ENDPOINT, payload, { signal, resolveField });
};
