'use client';

import { useId } from 'react';

import {
  CharacterCount,
  FieldMessage,
  FormErrorBanner,
  FormOverlay,
  FormSuccess,
  HoneypotField,
  SubmitButton,
} from '../forms';
import { Field, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

import { useFormSubmission } from '@/hooks/use-form-submission';
import { FEEDBACK_LIMITS, feedbackForm } from '@/lib/feedback/schema';
import {
  FEEDBACK_META_FIELDS,
  FEEDBACK_FORM_ENABLED,
  submitFeedback,
} from '@/lib/feedback/submit';

/**
 * Composition only. Validation lives in `lib/feedback/schema`, transport in
 * `lib/feedback/submit`, and behaviour in `useFormSubmission` — what's left
 * here is markup and copy.
 */

const INPUT_CLASS =
  'h-12.25 rounded-lg border-gray-200 px-4 py-3 text-base/6 text-neutral-950 ' +
  'placeholder:text-neutral-950/50 aria-invalid:border-destructive ' +
  'aria-invalid:ring-destructive/20 disabled:opacity-60 dark:bg-transparent';

export function FeedbackForm() {
  const uid = useId();
  const inactive = !FEEDBACK_FORM_ENABLED;

  const {
    formRef,
    fieldErrors,
    formError,
    isSubmitting,
    succeeded,
    lengths,
    canRetry,
    handleSubmit,
    retry,
    reset,
    fieldProps,
    errorId,
  } = useFormSubmission({
    form: feedbackForm,
    submit: submitFeedback,
    idPrefix: uid,
    disabled: inactive,
    metaFields: FEEDBACK_META_FIELDS,
  });

  return (
    <section className="xs:px-[4.1%] px-4 py-16 pb-12 lg:px-[5.7855%] xl:px-[10%]">
      <h2 className="text-primary mb-2 text-left text-3xl/9 font-medium">Share Your Feedback</h2>
      <p className="mb-6 text-base/6 text-gray-700">
        Tell us what&apos;s working, what isn&apos;t, or what you&apos;d like to see. You
        don&apos;t need to leave your name.
      </p>

      {succeeded ? (
        <FormSuccess
          title="Thanks — we've got it"
          description="Your feedback goes straight to the executive council. We read everything, even when we can't reply."
          reference={succeeded.reference}
          actionLabel="Send more feedback"
          onAction={reset}
        />
      ) : (
        <FormOverlay
          active={inactive}
          label="Coming soon"
          title="This form isn't open yet"
          description="We're still setting it up. In the meantime, reach us on our social channels and we'll get back to you."
        >
          <form ref={formRef} noValidate onSubmit={handleSubmit} className="relative">
            <HoneypotField id={`${uid}-company`} />

            <FormErrorBanner
              failure={formError}
              onRetry={retry}
              canRetry={canRetry}
              retryDisabled={isSubmitting}
            />

            <FieldGroup className="gap-y-6 p-0">
              <Field className="gap-y-2">
                <FieldLabel htmlFor={`${uid}-subject`}>Subject</FieldLabel>
                <Input
                  {...fieldProps('subject')}
                  maxLength={FEEDBACK_LIMITS.subject.max}
                  placeholder="What is this about?"
                  className={INPUT_CLASS}
                />
                <FieldMessage id={errorId('subject')} message={fieldErrors.subject} />
              </Field>

              <Field className="gap-y-2">
                <FieldLabel htmlFor={`${uid}-message`}>Your Feedback</FieldLabel>
                <Textarea
                  {...fieldProps('message')}
                  maxLength={FEEDBACK_LIMITS.message.max}
                  placeholder="Write anything you'd like us to know..."
                  className={`${INPUT_CLASS} h-36.25`}
                />
                <div className="flex items-start justify-between gap-4">
                  <FieldMessage id={errorId('message')} message={fieldErrors.message} />
                  <CharacterCount
                    value={lengths.message ?? 0}
                    max={FEEDBACK_LIMITS.message.max}
                  />
                </div>
              </Field>

              <SubmitButton
                pending={isSubmitting}
                pendingLabel="Sending"
                className="mx-auto w-full max-w-153.5"
              >
                Send Feedback
              </SubmitButton>
            </FieldGroup>
          </form>
        </FormOverlay>
      )}
    </section>
  );
}
