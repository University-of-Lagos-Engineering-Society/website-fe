import { postJson } from '@/lib/api/client';
import { createFieldResolver, type ApiResult } from '@/lib/api/errors';
import { SHEETS_ENABLED, SHEET_TABS, postToSheet } from '@/lib/sheets/submit';
import type { SubmitFn } from '@/hooks/use-form-submission';
import type { QuestionField, QuestionValues } from './schema';

/**
 * Everything specific to the questions endpoint: where it lives, what goes on
 * the wire, and which error titles belong to which input.
 *
 * Keeping this apart from both the schema and the component means the transport
 * can change — new endpoint, extra payload field, different error catalogue —
 * without touching validation rules or markup.
 */

const ENDPOINT = process.env.NEXT_PUBLIC_BASE_ENDPOINT
  ? `${process.env.NEXT_PUBLIC_BASE_ENDPOINT}/questions`
  : '';

/**
 * Whether the form accepts submissions.
 *
 * Defaults to off unless explicitly enabled AND an endpoint is configured. That
 * second condition is the point: it makes it impossible to ship a live-looking
 * form that posts into the void. Flip `NEXT_PUBLIC_QUESTIONS_FORM_ENABLED` to
 * "true" once the backend is up.
 *
 * Both are `NEXT_PUBLIC_`, so they're inlined at build time — changing either
 * needs a redeploy, not just an env edit.
 */
export const QUESTIONS_FORM_ENABLED =
  SHEETS_ENABLED ||
  (process.env.NEXT_PUBLIC_QUESTIONS_FORM_ENABLED === 'true' && ENDPOINT !== '');

export interface QuestionPayload extends QuestionValues {
  /**
   * Client-generated, stable across retries of the same submission. Give this a
   * unique index on the backend and a request that timed out after being
   * processed won't create a duplicate when the person hits retry.
   */
  request_id: string;
  /** Which surface it came from — useful once there's more than one form. */
  source: string;
  /**
   * Honeypot. Always an empty string from a real browser; reject the request
   * with a 200 if it isn't, since an error response just tells a bot what to
   * change. Safe for the backend to ignore entirely.
   */
  company_website: string;
}

/** Names of inputs that ride along in the payload but aren't validated. */
export const QUESTION_META_FIELDS = ['company_website'] as const;

/**
 * Maps a backend `error.title` to the input it belongs under, so a rejected
 * email renders beneath the email field instead of in a banner.
 *
 * Comparison is case-insensitive. Titles absent from this map become a banner,
 * which is the right default: an unknown title degrades to a visible message
 * rather than disappearing.
 *
 * Keep this in sync with the backend's error catalogue.
 */
const resolveField = createFieldResolver<QuestionField>({
  Name_mismatch: 'name',
  Invalid_name: 'name',
  Name_too_short: 'name',
  Name_too_long: 'name',

  Invalid_email: 'email',
  Email_invalid: 'email',
  Email_rejected: 'email',
  Email_undeliverable: 'email',
  Email_blocked: 'email',
  Disposable_email: 'email',
  Duplicate_submission: 'email',

  Invalid_question: 'question',
  Question_too_short: 'question',
  Question_too_long: 'question',
  Question_rejected: 'question',
});

export const submitQuestion: SubmitFn<QuestionValues> = (
  values,
  { requestId, signal, meta },
): Promise<ApiResult<QuestionField>> => {
  const payload: QuestionPayload = {
    ...values,
    request_id: requestId,
    source: 'website_faq',
    company_website: meta.company_website ?? '',
  };

  // Sheets wins while it's configured. Drop NEXT_PUBLIC_SHEETS_ENDPOINT and
  // this falls straight back to the real API — no code change.
  if (SHEETS_ENABLED) {
    return postToSheet<QuestionField>(SHEET_TABS.questions, payload, { signal });
  }

  return postJson<QuestionField>(ENDPOINT, payload, { signal, resolveField });
};
