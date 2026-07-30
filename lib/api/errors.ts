/**
 * The backend returns one error per response, never an array. Everything here
 * is built around that: transport failures are folded into the same shape, so
 * the UI has exactly one error to render and one code path to render it.
 */

/**
 *   {
 *     "status": "failed",
 *     "status_code": "99",
 *     "error": { "title": "Name_mismatch", "detail": "..." }
 *   }
 */
export interface ApiErrorEnvelope {
  status: 'failed';
  status_code: string;
  error: {
    title: string;
    detail: string;
  };
}

export interface ApiFailure<TField extends string = string> {
  /** Symbolic code. Either the backend's `error.title` or a synthesised one. */
  title: string;
  /** Human-readable text, rendered to the person as-is. */
  detail: string;
  /** The backend's `status_code`, or null for transport-level failures. */
  statusCode: string | null;
  /** Which input to attach the message to, if the title maps to one. */
  field: TField | null;
  /** Whether offering a "Try again" button makes sense. */
  retryable: boolean;
}

/**
 * `failure: null` means the request was aborted — not a failure to report.
 *
 * `message` is optional on success because the HTTP contract ignores the
 * response body; it exists for transports that do return one, like a Server
 * Action handing back its own confirmation copy.
 */
export type ApiResult<TField extends string = string> =
  { ok: true; message?: string } | { ok: false; failure: ApiFailure<TField> | null };

/** Titles synthesised client-side. Kept distinct from anything the API sends. */
export const CLIENT_ERROR_TITLES = {
  network: 'Network_unavailable',
  timeout: 'Request_timeout',
  malformed: 'Unexpected_response',
  rateLimited: 'Too_many_requests',
  notConfigured: 'Endpoint_not_configured',
} as const;

export const GENERIC_ERROR_DETAIL =
  "We couldn't send that just now. Try again in a moment, or email us directly.";

/** Resolves a backend `error.title` to the field it belongs under, if any. */
export type FieldResolver<TField extends string> = (title: string) => TField | null;

/**
 * Builds a case-insensitive title → field resolver.
 *
 * Titles absent from the map resolve to null and render as a form-level banner,
 * which is the correct default: an unknown title degrades to a visible message
 * rather than disappearing, and anything not tied to a single input — rate
 * limits, outages, business-rule rejections — belongs in a banner anyway.
 */
export function createFieldResolver<TField extends string>(
  map: Readonly<Record<string, TField>>,
): FieldResolver<TField> {
  const lookup = new Map<string, TField>(
    Object.entries(map).map(([title, field]) => [title.toLowerCase(), field]),
  );
  return (title) => lookup.get(title.trim().toLowerCase()) ?? null;
}

export function isApiErrorEnvelope(value: unknown): value is ApiErrorEnvelope {
  if (typeof value !== 'object' || value === null) return false;
  const error = (value as Record<string, unknown>).error;
  if (typeof error !== 'object' || error === null) return false;
  const { title, detail } = error as Record<string, unknown>;
  return typeof title === 'string' && title.length > 0 && typeof detail === 'string';
}
