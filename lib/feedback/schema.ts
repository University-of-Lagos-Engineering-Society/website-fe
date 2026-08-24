import { z } from 'zod';

import { defineForm, type FieldOf, type ValuesOf } from '@/lib/forms/define-form';
import { collapseWhitespace, trim } from '@/lib/forms/normalizers';

/**
 * Client-side validation for the feedback form. Two fields only — a subject and
 * whatever they want to say. No name, no email: feedback people can leave
 * anonymously is feedback people actually leave.
 *
 * Not a security boundary; the backend re-validates.
 *
 * Check order decides which message is shown, because only the first failure
 * per field is kept. Presence rules before format rules.
 */

export const FEEDBACK_LIMITS = {
  subject: { min: 2, max: 100 },
  message: { min: 10, max: 2000 },
} as const;

export const feedbackForm = defineForm({
  subject: {
    normalize: collapseWhitespace,
    schema: z
      .string()
      .min(FEEDBACK_LIMITS.subject.min, 'Enter a subject — at least 2 characters.')
      .max(
        FEEDBACK_LIMITS.subject.max,
        `Keep your subject under ${FEEDBACK_LIMITS.subject.max} characters.`,
      ),
  },
  message: {
    normalize: trim,
    schema: z
      .string()
      .min(
        FEEDBACK_LIMITS.message.min,
        'Tell us a little more — at least 10 characters.',
      )
      .max(
        FEEDBACK_LIMITS.message.max,
        `Keep your feedback under ${FEEDBACK_LIMITS.message.max.toLocaleString()} characters.`,
      ),
  },
});

export type FeedbackValues = ValuesOf<typeof feedbackForm>;
export type FeedbackField = FieldOf<typeof feedbackForm>;
