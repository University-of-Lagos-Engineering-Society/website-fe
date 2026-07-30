import {
  CLIENT_ERROR_TITLES,
  GENERIC_ERROR_DETAIL,
  isApiErrorEnvelope,
  type ApiErrorEnvelope,
  type ApiFailure,
  type ApiResult,
  type FieldResolver,
} from './errors';

const DEFAULT_TIMEOUT_MS = 15_000;

/**
 * Split in two on purpose:
 *
 *   fetchWithTimeout  — transport only. Times out, respects abort, sends JSON,
 *                        hands back the raw Response. Knows nothing about what
 *                        a "successful" body looks like.
 *   postJson          — transport PLUS the assumption that failures arrive in
 *                        *our* envelope shape.
 *
 * That split exists because not every endpoint speaks our envelope. Substack's
 * subscribe endpoint doesn't, and never will — it's a third party. Rather than
 * bend `postJson` to understand two response shapes, `fetchWithTimeout` is the
 * shared primitive and each provider gets its own thin interpreter on top of
 * it. See `lib/newsletter/substack.ts` for the other one.
 */

export interface FetchOptions {
  signal?: AbortSignal;
  timeoutMs?: number;
  /** Defaults to 'omit' — a cross-origin call to a third party shouldn't carry cookies. */
  credentials?: RequestCredentials;
  /**
   * Merged over the default `Content-Type: application/json` / `Accept:
   * application/json` pair — set an `Authorization` header here for an
   * authenticated call, for instance. Overrides the defaults on conflict,
   * never the other way round.
   *
   * `Origin`, `Referer`, `Cookie`, `Host`, and a handful of others are on the
   * Fetch spec's forbidden-header-name list — no browser JS can set them
   * regardless of what's passed here. Anything else goes through untouched.
   */
  headers?: HeadersInit;
}

/**
 * Transport-level failure only: network down, timed out, aborted, misconfigured.
 * `field` is always null here — a raw fetch has no concept of "which input was
 * wrong", so this widens into any `ApiFailure<TField>` without a cast, since
 * `null` satisfies `TField | null` regardless of what TField turns out to be.
 */
export type TransportFailure = Omit<ApiFailure, 'field'> & { field: null };

export type RawFetchResult =
  { ok: true; response: Response } | { ok: false; failure: TransportFailure | null };

export async function fetchWithTimeout(
  url: string,
  body: unknown,
  {
    signal: externalSignal,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    credentials = 'omit',
    headers: extraHeaders,
  }: FetchOptions = {},
): Promise<RawFetchResult> {
  if (!url) {
    console.error('fetchWithTimeout called with no endpoint URL.');
    return {
      ok: false,
      failure: {
        title: CLIENT_ERROR_TITLES.notConfigured,
        detail: GENERIC_ERROR_DETAIL,
        statusCode: null,
        field: null,
        retryable: false,
      },
    };
  }

  const timeout = AbortSignal.timeout(timeoutMs);
  const signal = externalSignal ? AbortSignal.any([timeout, externalSignal]) : timeout;

  // Built as a Headers object rather than a plain literal so extraHeaders can
  // be any of the three HeadersInit shapes (object, array-of-pairs, or another
  // Headers) and still merge cleanly — `.set()` overwrites on key collision,
  // so a caller-supplied header always wins over the default.
  const headers = new Headers({ 'Content-Type': 'application/json', Accept: 'application/json' });
  if (extraHeaders) {
    for (const [key, value] of new Headers(extraHeaders)) headers.set(key, value);
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      signal,
      credentials,
      cache: 'no-store',
    });
    return { ok: true, response };
  } catch (error) {
    if (externalSignal?.aborted) return { ok: false, failure: null };

    const timedOut = error instanceof DOMException && error.name === 'TimeoutError';
    return {
      ok: false,
      failure: {
        title: timedOut ? CLIENT_ERROR_TITLES.timeout : CLIENT_ERROR_TITLES.network,
        detail: timedOut
          ? 'That took longer than expected. It may not have gone through — try again.'
          : // A CORS rejection surfaces identically to being offline — the browser
            // blocks it before any JS sees a status code, so this message covers
            // both. If everything else checks out, check CORS headers next.
            "We couldn't reach the server. Check your connection and try again.",
        statusCode: null,
        field: null,
        retryable: true,
      },
    };
  }
}

/* -------------------------------------------------------------------------- */
/* postJson — the envelope-shaped interpreter, used by the questions form.    */
/* -------------------------------------------------------------------------- */

export interface PostJsonOptions<TField extends string> extends FetchOptions {
  resolveField?: FieldResolver<TField>;
}

/**
 * Read the error envelope, tolerating everything a real deployment throws at a
 * browser: an nginx HTML 502, an empty body, a truncated response. A failure to
 * parse the failure must not itself become an unhandled exception.
 */
async function readErrorEnvelope(response: Response): Promise<ApiErrorEnvelope | null> {
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().includes('json')) return null;
  try {
    const body: unknown = await response.json();
    return isApiErrorEnvelope(body) ? body : null;
  } catch {
    return null;
  }
}

/** Fall back to something honest when the body is unusable. */
function failureForBareStatus<TField extends string>(status: number): ApiResult<TField> {
  if (status === 429) {
    return {
      ok: false,
      failure: {
        title: CLIENT_ERROR_TITLES.rateLimited,
        detail: "You've sent a few of these already. Give it a few minutes and try again.",
        statusCode: String(status),
        field: null,
        retryable: false,
      },
    };
  }
  return {
    ok: false,
    failure: {
      title: CLIENT_ERROR_TITLES.malformed,
      detail: GENERIC_ERROR_DETAIL,
      statusCode: String(status),
      field: null,
      retryable: status >= 500,
    },
  };
}

export async function postJson<TField extends string = string>(
  url: string,
  body: unknown,
  options: PostJsonOptions<TField> = {},
): Promise<ApiResult<TField>> {
  const { resolveField, ...fetchOptions } = options;

  const raw = await fetchWithTimeout(url, body, fetchOptions);
  if (!raw.ok) return { ok: false, failure: raw.failure };

  const { response } = raw;

  // Lenient on the way in: any 2xx counts, so a backend that later returns 201
  // doesn't silently start failing. 200 remains the documented contract.
  if (response.ok) return { ok: true };

  const envelope = await readErrorEnvelope(response);
  if (!envelope) return failureForBareStatus<TField>(response.status);

  return {
    ok: false,
    failure: {
      title: envelope.error.title,
      detail: envelope.error.detail.trim() || GENERIC_ERROR_DETAIL,
      statusCode: String(envelope.status_code ?? response.status),
      field: resolveField?.(envelope.error.title) ?? null,
      // A 5xx is worth retrying. A 4xx means the request itself was the problem,
      // so resending it unchanged just fails the same way.
      retryable: response.status >= 500,
    },
  };
}

/** `crypto.randomUUID` needs a secure context; this keeps http://localhost working. */
export function newRequestId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}
