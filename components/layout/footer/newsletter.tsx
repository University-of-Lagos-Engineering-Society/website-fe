'use client';

import { FormOverlay } from '@/components/forms';
// import { useEffect, useId, useRef } from 'react';

// import {
//   FieldMessage,
//   FormErrorBanner,
//   FormOverlay,
//   HoneypotField,
//   SubmitButton,
// } from '../../forms';
// import { Field, FieldGroup, FieldLabel } from '../../ui/field';
// import { Input } from '../../ui/input';

// import { useFormSubmission } from '@/hooks/use-form-submission';
// import { NEWSLETTER_LIMITS, newsletterForm } from '@/lib/newsletter/schema';
// import {
//   NEWSLETTER_FORM_ENABLED,
//   NEWSLETTER_META_FIELDS,
//   submitNewsletter,
// } from '@/lib/newsletter/submit';

import { NEWSLETTER_SUBSTACK_URL } from '@/lib/newsletter/submit';

// /**
//  * Composition only. Validation lives in `lib/newsletter/schema`, transport in
//  * `lib/newsletter/submit`, behaviour in `useFormSubmission` — this file is
//  * markup and copy, same as the questions form.
//  *
//  * Sits on a dark surface, so error colours are overridden rather than
//  * inherited: `text-destructive` is tuned for light backgrounds and goes muddy
//  * against this footer's `border-[#374151]` / `text-gray-200` palette.
//  */

// const ERROR_CLASS = 'text-red-300';
// const SUCCESS_FALLBACK = "You're on the list. Check your inbox to confirm.";

export function NewsletterForm() {
  // const uid = useId();
  // const inactive = !NEWSLETTER_FORM_ENABLED;
  // const successRef = useRef<HTMLParagraphElement>(null);

  // const {
  //   formRef,
  //   fieldErrors,
  //   formError,
  //   isSubmitting,
  //   succeeded,
  //   canRetry,
  //   handleSubmit,
  //   retry,
  //   fieldProps,
  //   errorId,
  // } = useFormSubmission({
  //   form: newsletterForm,
  //   submit: submitNewsletter,
  //   idPrefix: uid,
  //   disabled: inactive,
  //   metaFields: NEWSLETTER_META_FIELDS,
  // });

  // // The form unmounts on success, which leaves focus nowhere. Move it to the
  // // confirmation so a keyboard user isn't dropped back at the top of the page.
  // useEffect(() => {
  //   if (succeeded) successRef.current?.focus();
  // }, [succeeded]);

  // if (succeeded) {
  //   return (
  //     <p
  //       ref={successRef}
  //       tabIndex={-1}
  //       role="status"
  //       className="text-muted-foreground text-sm outline-none"
  //     >
  //       {succeeded.message ?? SUCCESS_FALLBACK}
  //     </p>
  //   );
  // }

  const EMBED_HEIGHT = 320;

  return (
    <>
      {/* {succeeded ? (
        <p className="text-muted-foreground text-sm" role="status">
          Thanks for signing up! Check your inbox to confirm.
        </p>
      ) : (
        <FormOverlay
          variant="compact"
          active={inactive}
          label="Coming soon"
          title="This form isn't open yet"
          description="We're still setting it up. In the meantime, reach us on our social channels and we'll get back to you."
        >
          <form
            ref={formRef}
            noValidate
            onSubmit={handleSubmit}
            className="relative max-w-150 space-y-2 overflow-hidden lg:max-w-none"
          >
            <HoneypotField id={`${uid}-company`} />

            <FormErrorBanner
              variant="inline"
              failure={formError}
              onRetry={retry}
              canRetry={canRetry}
              retryDisabled={isSubmitting}
            />

            <FieldGroup className="flex-row gap-x-2">
              <Field className="gap-y-2">
                <FieldLabel htmlFor={`${uid}-email`} className="hidden">
                  Email
                </FieldLabel>
                <Input
                  {...fieldProps('email')}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  maxLength={NEWSLETTER_LIMITS.email.max}
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                  aria-invalid={fieldErrors.email ? 'true' : 'false'}
                  className="h-12 border border-[#374151] bg-transparent text-sm/none text-gray-200 placeholder:text-base/none placeholder:text-gray-200 md:text-base/none lg:border-gray-200 dark:bg-transparent"
                />
                {fieldErrors.email ? (
                  <FieldMessage id={errorId('email')} message={fieldErrors.email} />
                ) : null}
              </Field>
              <SubmitButton
                pending={isSubmitting}
                pendingLabel="Subscribing"
                className="bg-accent text-gray-5 hover:bg-accent/80 xs:shrink-0 h-12 w-29.75 shrink text-sm/[24px] font-medium text-gray-50 md:text-base/[24px]"
              >
                Subscribe
              </SubmitButton>
            </FieldGroup>
          </form>
        </FormOverlay>
      )} */}
      <FormOverlay
        variant="compact"
        active={!NEWSLETTER_SUBSTACK_URL}
        label="Coming soon"
        title="This form isn't open yet"
        description="We're still setting it up. In the meantime, reach us on our social channels and we'll get back to you."
      >
        {NEWSLETTER_SUBSTACK_URL ? (
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <iframe
              src={`${NEWSLETTER_SUBSTACK_URL}/embed`}
              title="Subscribe to our newsletter"
              width="100%"
              height={EMBED_HEIGHT}
              style={{ border: 'none', background: 'white', display: 'block' }}
              loading="lazy"
            />
          </div>
        ) : (
          <div className="h-full min-h-40"></div>
        )}
      </FormOverlay>
    </>
  );
}
