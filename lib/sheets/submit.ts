import { fetchWithTimeout } from '@/lib/api/client';
import { CLIENT_ERROR_TITLES, GENERIC_ERROR_DETAIL, type ApiResult } from '@/lib/api/errors';

/**
 * Temporary transport: posts a form submission into a Google Sheet.
 *
 * This exists because the backend at `NEXT_PUBLIC_BASE_ENDPOINT` isn't live
 * yet, and a form that posts into the void is worse than no form. It is a
 * stopgap, not an architecture — every form still owns its schema, its payload
 * shape and its error catalogue, and `postJson` is still sitting there
 * untouched. Clearing `NEXT_PUBLIC_SHEETS_ENDPOINT` reverts everything to the
 * real API with no code change.
 *
 * ## Why it talks to Apps Script rather than the Sheets API
 *
 * The Sheets API needs an OAuth token or a service-account key. Either one
 * would have to live in the browser bundle, which would hand anyone who viewed
 * source write access to the spreadsheet. An Apps Script Web App deployed
 * "execute as me / anyone can access" runs under the sheet owner's identity and
 * exposes exactly one operation — append a row — so the worst a scraper can do
 * is add junk rows. The setup script lives in `docs/sheets-apps-script.md`.
 *
 * ## Why `Content-Type: text/plain`
 *
 * Apps Script Web Apps don't answer CORS preflight. Sending `application/json`
 * triggers one, the browser gets no `Access-Control-Allow-*` back, and the
 * request fails before it's sent. `text/plain` is a CORS-safelisted value, so
 * the POST goes straight out. The body is still JSON — the script parses
 * `e.postData.contents` itself.
 */

export const SHEETS_ENDPOINT = process.env.NEXT_PUBLIC_SHEETS_ENDPOINT ?? '';

/** True once a deployed Apps Script URL is configured. */
export const SHEETS_ENABLED = SHEETS_ENDPOINT !== '';

/** Tab names inside the spreadsheet. The script creates a tab if it's missing. */
export const SHEET_TABS = {
  contact: 'Contact',
  questions: 'Questions',
  feedback: 'Feedback',
  newsletter: 'Newsletter',
} as const;

export type SheetTab = (typeof SHEET_TABS)[keyof typeof SHEET_TABS];

export async function postToSheet<TField extends string = string>(
  tab: SheetTab,
  // `object`, not `Record<string, unknown>`: the form payloads are declared as
  // interfaces, and an interface has no implicit index signature, so it won't
  // satisfy a Record without every caller widening at the call site.
  payload: object,
  { signal }: { signal?: AbortSignal } = {},
): Promise<ApiResult<TField>> {
  const raw = await fetchWithTimeout(
    SHEETS_ENDPOINT,
    { tab, submittedAt: new Date().toISOString(), ...payload },
    {
      signal,
      // See the note above — anything else trips a preflight Apps Script
      // can't answer.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    },
  );

  if (!raw.ok) return { ok: false, failure: raw.failure };

  // Apps Script answers 302 → googleusercontent for the actual payload, which
  // `fetch` follows transparently. A 200 here means the row landed.
  if (raw.response.ok) return { ok: true };

  return {
    ok: false,
    failure: {
      title: CLIENT_ERROR_TITLES.malformed,
      detail: GENERIC_ERROR_DETAIL,
      statusCode: String(raw.response.status),
      field: null,
      retryable: raw.response.status >= 500,
    },
  };
}
