import { CLIENT_ERROR_TITLES, type ApiResult } from './errors';

/**
 * The Server Action counterpart to `postJson`.
 *
 * A Server Action is just an async function, so the transport concerns `fetch`
 * gives you for free have to be added back:
 *
 * - **Timeout.** An action call cannot be aborted — the request to the server
 *   keeps going regardless. What this can do is stop *waiting* on it, so the
 *   person gets an answer instead of a spinner that never resolves. The work may
 *   still land server-side, which is exactly why the request id matters: retry
 *   sends the same one, and a unique index turns the duplicate into a no-op.
 *
 * - **Thrown errors.** Actions reject on network failure and on server errors
 *   Next couldn't serialise. Unhandled, that's an uncaught rejection and a form
 *   stuck in its pending state.
 *
 * - **Abort.** Same unmount check as the fetch path, so a resolved call can't
 *   set state on a component that's gone.
 */

const DEFAULT_TIMEOUT_MS = 15_000;

export interface CallActionOptions {
  signal?: AbortSignal;
  timeoutMs?: number;
}

const TIMED_OUT = Symbol('timed-out');

export async function callAction<TField extends string = string>(
  run: () => Promise<ApiResult<TField>>,
  { signal, timeoutMs = DEFAULT_TIMEOUT_MS }: CallActionOptions = {},
): Promise<ApiResult<TField>> {
  let timer: ReturnType<typeof setTimeout> | undefined;

  try {
    const result = await Promise.race([
      run(),
      new Promise<typeof TIMED_OUT>((resolve) => {
        timer = setTimeout(() => resolve(TIMED_OUT), timeoutMs);
      }),
    ]);

    if (signal?.aborted) return { ok: false, failure: null };

    if (result === TIMED_OUT) {
      return {
        ok: false,
        failure: {
          title: CLIENT_ERROR_TITLES.timeout,
          detail: 'That took longer than expected. It may not have gone through — try again.',
          statusCode: null,
          field: null,
          retryable: true,
        },
      };
    }

    return result;
  } catch (error) {
    if (signal?.aborted) return { ok: false, failure: null };

    console.error('Server action failed', error);
    return {
      ok: false,
      failure: {
        title: CLIENT_ERROR_TITLES.network,
        detail: "We couldn't reach the server. Check your connection and try again.",
        statusCode: null,
        field: null,
        retryable: true,
      },
    };
  } finally {
    clearTimeout(timer);
  }
}
