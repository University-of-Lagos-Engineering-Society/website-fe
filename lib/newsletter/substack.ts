import { fetchWithTimeout } from '@/lib/api/client';
import type { ApiResult } from '@/lib/api/errors';
import { NEWSLETTER_ERROR_TITLES } from './error-titles';
import type { NewsletterField } from './schema';

/**
 * Talks to Substack's subscribe endpoint directly from the browser.
 *
 * This replaced a Server Action that proxied the same call through our own
 * server. That got a consistent 403 from Cloudflare's bot management sitting
 * in front of Substack — a server-to-server `fetch` can't produce the
 * TLS/IP-reputation signals Cloudflare's scoring wants, no matter what headers
 * it spoofs. A real browser making the request natively has a plausible shot
 * at clearing that check. What it does NOT guarantee is CORS: Substack's own
 * app has to send back Access-Control-Allow-Origin for this domain, or the
 * browser blocks it before any JS sees a response. If every submission fails
 * with `Network_unavailable`, check the preflight OPTIONS request in the
 * Network tab before assuming it's the connection.
 *
 * Substack's response shape here is undocumented and reverse-engineered from
 * observed status codes, not a published contract — treat the specifics as
 * best-effort and revisit if their behaviour shifts.
 */

const FREE_SUBSCRIBE_PATH = '/api/v1/free';

const GENERIC_FAILURE_DETAIL = "Couldn't subscribe right now — please try again.";

async function bodySnippet(response: Response): Promise<string> {
  try {
    return (await response.text()).slice(0, 500);
  } catch {
    return '<unreadable body>';
  }
}

async function interpretSubstackResponse(response: Response): Promise<ApiResult<NewsletterField>> {
  if (response.status === 429) {
    return {
      ok: false,
      failure: {
        title: NEWSLETTER_ERROR_TITLES.rateLimited,
        detail: "You've tried a few times — give it a minute and try again.",
        statusCode: '429',
        field: null,
        retryable: false,
      },
    };
  }

  if (response.ok) {
    // Substack has been observed returning 200 with a JSON body even when the
    // subscription didn't actually take (see the linked note in this file's
    // header comment). There's no reliable signal to distinguish that from a
    // real success without a confirmed-subscriber webhook, so this is
    // optimistic by necessity.
    return { ok: true, message: 'Thanks for signing up! Check your inbox to confirm.' };
  }

  // Logged, not shown — arbitrary third-party response text isn't something
  // to put in front of a person, but it's exactly what you want in the console
  // while narrowing down a rejection.
  console.error('Substack rejected the request', response.status, await bodySnippet(response));

  if (response.status === 400 || response.status === 422) {
    return {
      ok: false,
      failure: {
        title: NEWSLETTER_ERROR_TITLES.invalidEmail,
        detail: 'That email address does not look right to Substack. Check for a typo.',
        statusCode: String(response.status),
        field: 'email',
        retryable: false,
      },
    };
  }

  // Covers 403 (Cloudflare block), 5xx, and anything else unrecognised — none
  // of these are about what was typed, so they render as a banner rather than
  // a field error.
  return {
    ok: false,
    failure: {
      title: NEWSLETTER_ERROR_TITLES.providerUnavailable,
      detail: GENERIC_FAILURE_DETAIL,
      statusCode: String(response.status),
      field: null,
      retryable: true,
    },
  };
}

export async function subscribeToSubstack(
  substackUrl: string,
  email: string,
  signal?: AbortSignal,
): Promise<ApiResult<NewsletterField>> {
  // No Origin/Referer headers here on purpose: they're forbidden request
  // headers a browser won't let JS set, and don't need to be spoofed anyway —
  // the browser sends the real ones for a genuine cross-origin request.
  const raw = await fetchWithTimeout(`${substackUrl}${FREE_SUBSCRIBE_PATH}`, { email }, { signal });

  if (!raw.ok) return { ok: false, failure: raw.failure };
  return interpretSubstackResponse(raw.response);
}
