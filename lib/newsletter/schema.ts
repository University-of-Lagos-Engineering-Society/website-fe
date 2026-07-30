import { z } from 'zod';

import { defineForm, type FieldOf, type ValuesOf } from '@/lib/forms/define-form';
import { normalizeEmail } from '@/lib/forms/normalizers';

/**
 * Client-side validation for the newsletter form.
 *
 * This catches mistakes before a request goes out — it is not a security
 * boundary. The backend re-validates everything.
 *
 * Note the deliberate asymmetry with the API error contract: this can surface
 * all three field errors at once, while the API returns one at a time. That's
 * consistent rather than contradictory — by the time a request is sent the
 * client has cleared every rule it knows about, so a server error is the
 * exception case, not a list to work through.
 *
 * Written against the Zod 3 API (`z.string().email()`), which is still valid in
 * Zod 4 — so this works on both without a version check.
 */

export const NEWSLETTER_LIMITS = {
  email: { max: 254 },
} as const;

/**
 * Check order decides which message is shown, because only the first failure
 * per field is kept. Presence rules come before format rules: an empty email
 * should read "enter your email", not "that isn't a valid email".
 */
export const newsletterForm = defineForm({
  email: {
    normalize: normalizeEmail,
    schema: z
      .string()
      .min(1, 'Enter the email address you want the answer sent to.')
      .max(NEWSLETTER_LIMITS.email.max, 'That email address is too long.')
      .email('That email address does not look right. Check for a typo.'),
  },
});

export type NewsletterValues = ValuesOf<typeof newsletterForm>;
export type NewsletterField = FieldOf<typeof newsletterForm>;
