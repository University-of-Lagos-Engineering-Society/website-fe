import { GENERIC_ERROR_DETAIL, type ApiResult } from '@/lib/api/errors';
import type { SubmitFn } from '@/hooks/use-form-submission';
import { SUBSTACK_URL } from '@/components/constants';
import { SHEETS_ENABLED, SHEET_TABS, postToSheet } from '@/lib/sheets/submit';
import { subscribeToSubstack } from './substack';
import { NEWSLETTER_ERROR_TITLES } from './error-titles';
import type { NewsletterField, NewsletterValues } from './schema';

/**
 * Calls Substack directly from the browser — see `substack.ts` for why this
 * isn't a Server Action anymore. `useFormSubmission` doesn't care either way:
 * it's built against the `ApiResult` shape, not any particular transport, so
 * swapping the Server Action for a fetch didn't touch the hook or the form
 * component at all.
 */

export const submitNewsletter: SubmitFn<NewsletterValues> = async (
  values,
  { signal, meta },
): Promise<ApiResult<NewsletterField>> => {
  // Honeypot check lives here rather than at Substack, obviously — Substack's
  // API has never heard of this field, so nothing enforces it unless this
  // layer does. Returning success on a filled trap is deliberate: telling a
  // bot it was caught just tells it what to change next time.
  if ((meta.company_website ?? '').trim() !== '') {
    return { ok: true };
  }

  // Sheets wins while it's configured — the list can be exported to Substack
  // later. Drop NEXT_PUBLIC_SHEETS_ENDPOINT to go back to subscribing directly.
  if (SHEETS_ENABLED) {
    return postToSheet<NewsletterField>(SHEET_TABS.newsletter, { ...values }, { signal });
  }

  if (!SUBSTACK_URL) {
    console.error('SUBSTACK_URL is not configured.');
    return {
      ok: false,
      failure: {
        title: NEWSLETTER_ERROR_TITLES.failed,
        detail: GENERIC_ERROR_DETAIL,
        statusCode: null,
        field: null,
        retryable: false,
      },
    };
  }

  return subscribeToSubstack(SUBSTACK_URL, values.email, signal);
};

/**
 * Defaults to on. Set to "false" to park the form behind the coming-soon
 * overlay without touching the component.
 */
export const NEWSLETTER_FORM_ENABLED = process.env.NEXT_PUBLIC_NEWSLETTER_FORM_ENABLED !== 'false';
export const NEWSLETTER_SUBSTACK_URL = process.env.NEXT_PUBLIC_NEWSLETTER_SUBSTACK_URL;

/** Names of inputs that ride along in the request but aren't validated. */
export const NEWSLETTER_META_FIELDS = ['company_website'] as const;
