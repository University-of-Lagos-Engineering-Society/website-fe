'use server';

import { SITE_URL, SUBSTACK_URL } from '@/components/constants';
import { newsletterForm } from '@/lib/newsletter/schema';
import { NEWSLETTER_ERROR_TITLES } from '@/lib/newsletter/error-titles';

/**
 * `title` and `retryable` are additive — both optional, so any code still on
 * the old `{ status, message }` shape keeps compiling. They exist so the
 * adapter (`lib/newsletter/submit.ts`) can route a failure to the email field
 * versus a form-level banner, and decide whether "Try again" makes sense,
 * instead of guessing from message text.
 */
export type SubscribeState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string; title?: string; retryable?: boolean };

const GENERIC_FAILURE_MESSAGE = "Couldn't subscribe right now — please try again.";

export async function subscribe(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  // Same schema the client validates against — imported, not duplicated, so
  // "enter a valid email" can't drift into two different wordings depending on
  // which side of the network caught the mistake.
  console.log('Substack response', 'prepping to send...');
  const parsed = newsletterForm.parse({ email: formData.get('email') });
  if (!parsed.ok) {
    return {
      status: 'error',
      message: parsed.errors.email ?? 'Please enter a valid email address.',
      title: NEWSLETTER_ERROR_TITLES.invalidEmail,
      retryable: false,
    };
  }

  const { email } = parsed.values;

  console.log('Substack response', `parsed email: ${email}`);

  try {
    console.log('Substack response', 'trying request...');
    const res = await fetch(`${SUBSTACK_URL}/api/v1/free`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Substack checks these — spoof the embed's context
        Origin: SITE_URL,
        Referer: `${SITE_URL}/`,
      },
      body: JSON.stringify({ email }),
    });

    console.log('Substack response', res.status, res.statusText);

    if (res.status === 429) {
      return {
        status: 'error',
        message: "You've tried a few times — give it a minute and try again.",
        title: NEWSLETTER_ERROR_TITLES.rateLimited,
        retryable: false,
      };
    }

    if (!res.ok) {
      // Substack's undocumented API doesn't give a reliable signal for "this
      // address is already subscribed" versus "the service is unhappy" — if
      // you find one (a specific status or response body shape), branch here
      // and return NEWSLETTER_ERROR_TITLES.alreadySubscribed instead.
      console.log('Error occurred while subscribing', res);
      return {
        status: 'error',
        message: GENERIC_FAILURE_MESSAGE,
        title: NEWSLETTER_ERROR_TITLES.providerUnavailable,
        retryable: true,
      };
    }

    return {
      status: 'success',
      message: 'Thanks for signing up! Check your inbox to confirm.',
    };
  } catch (err) {
    console.log('Error occurred while subscribing', err);
    return {
      status: 'error',
      message: GENERIC_FAILURE_MESSAGE,
      title: NEWSLETTER_ERROR_TITLES.providerUnavailable,
      retryable: true,
    };
  }
}
