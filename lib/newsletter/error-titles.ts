/**
 * Error titles shared between the Server Action that emits them and the client
 * adapter that routes them.
 *
 * They live here rather than in the action file because a `'use server'` module
 * may only export async functions — exporting this object from there is a build
 * error. Types are fine (they're erased); values are not.
 */
export const NEWSLETTER_ERROR_TITLES = {
  invalidEmail: 'Invalid_email',
  alreadySubscribed: 'Already_subscribed',
  providerUnavailable: 'Provider_unavailable',
  rateLimited: 'Too_many_requests',
  failed: 'Subscription_failed',
} as const;

export type NewsletterErrorTitle =
  (typeof NEWSLETTER_ERROR_TITLES)[keyof typeof NEWSLETTER_ERROR_TITLES];
