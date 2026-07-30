'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { newRequestId } from '@/lib/api/client';
import type { ApiFailure, ApiResult } from '@/lib/api/errors';
import type { FormDefinition } from '@/lib/forms/define-form';
import type { FieldErrors, FieldName, FormValues } from '@/lib/forms/types';

/**
 * Everything that is the same for every form on the site: validate on submit,
 * validate on blur, clear on edit, focus the first invalid field, hold one
 * error at a time, retry a failed attempt with the same request id, abort
 * in-flight work on unmount.
 *
 * What it deliberately does NOT own: markup, copy, or the endpoint. A form
 * component supplies a `FormDefinition` and a `submit` function, and gets back
 * state plus prop-spreaders.
 */

export interface SubmitContext {
  /** Stable across retries of the same attempt. Send it; index it server-side. */
  requestId: string;
  signal: AbortSignal;
  /**
   * Values of `metaFields` — inputs that ride along in the request but aren't
   * part of validation. Honeypots, timestamps, captcha tokens.
   */
  meta: Record<string, string>;
}

export type SubmitFn<TValues extends FormValues> = (
  values: TValues,
  context: SubmitContext,
) => Promise<ApiResult<FieldName<TValues>>>;

export interface FormSubmissionSuccess<TValues extends FormValues> {
  values: TValues;
  /** The request id of the successful attempt. Doubles as a user-facing reference. */
  reference: string;
  /** Confirmation copy from the transport, when it supplies any. */
  message?: string;
}

export interface UseFormSubmissionOptions<TValues extends FormValues> {
  form: FormDefinition<TValues>;
  submit: SubmitFn<TValues>;
  /** Stable id prefix, normally from `useId()`. Namespaces every generated id. */
  idPrefix: string;
  /** Blocks submission entirely — used by the inactive / coming-soon state. */
  disabled?: boolean;
  /** Names of unvalidated inputs to collect and pass through as `meta`. */
  metaFields?: readonly string[];
}

export interface FieldPropsOptions {
  /** Id of a hint element to reference while the field has no error. */
  describedBy?: string;
}

export interface FieldProps {
  id: string;
  name: string;
  disabled: boolean;
  'aria-invalid': boolean;
  'aria-describedby': string | undefined;
  onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export interface UseFormSubmissionResult<TValues extends FormValues> {
  formRef: React.RefObject<HTMLFormElement | null>;
  fieldErrors: FieldErrors<TValues>;
  /** Set only for failures that don't belong to one field. Never both. */
  formError: ApiFailure<FieldName<TValues>> | null;
  isSubmitting: boolean;
  succeeded: FormSubmissionSuccess<TValues> | null;
  /** Live character counts, keyed by field. Absent until the field is edited. */
  lengths: Partial<Record<FieldName<TValues>, number>>;
  /** True when the last failure is worth resending unchanged. */
  canRetry: boolean;
  handleSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
  retry: () => void;
  reset: () => void;
  fieldProps: (field: FieldName<TValues>, options?: FieldPropsOptions) => FieldProps;
  errorId: (field: FieldName<TValues>) => string;
}

interface Attempt<TValues> {
  values: TValues;
  requestId: string;
  meta: Record<string, string>;
}

/** Module constant so the default doesn't churn the memoised callbacks. */
const NO_META_FIELDS: readonly string[] = [];

export function useFormSubmission<TValues extends FormValues>({
  form,
  submit,
  idPrefix,
  disabled = false,
  metaFields = NO_META_FIELDS,
}: UseFormSubmissionOptions<TValues>): UseFormSubmissionResult<TValues> {
  type TField = FieldName<TValues>;

  const formRef = useRef<HTMLFormElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  /** Held so retry resends the identical payload — same request id, so a
   *  backend deduping on it won't create a second record. */
  const lastAttemptRef = useRef<Attempt<TValues> | null>(null);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors<TValues>>({});
  const [formError, setFormError] = useState<ApiFailure<TField> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState<FormSubmissionSuccess<TValues> | null>(null);
  const [lengths, setLengths] = useState<Partial<Record<TField, number>>>({});
  const [canRetry, setCanRetry] = useState(false);

  // Don't leave a request running against an unmounted component.
  useEffect(() => () => abortRef.current?.abort(), []);

  const errorId = useCallback((field: TField) => `${idPrefix}-${field}-error`, [idPrefix]);

  const focusField = useCallback((field: TField) => {
    const element = formRef.current?.elements.namedItem(field);
    if (element instanceof HTMLElement) element.focus();
  }, []);

  const send = useCallback(
    async (attempt: Attempt<TValues>) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setIsSubmitting(true);
      setFormError(null);
      setCanRetry(false);

      const result = await submit(attempt.values, {
        requestId: attempt.requestId,
        signal: controller.signal,
        meta: attempt.meta,
      });

      if (controller.signal.aborted) return;
      setIsSubmitting(false);

      if (result.ok) {
        lastAttemptRef.current = null;
        setSucceeded({
          values: attempt.values,
          reference: attempt.requestId,
          message: result.message,
        });
        return;
      }
      if (!result.failure) return; // aborted

      lastAttemptRef.current = attempt;
      setCanRetry(result.failure.retryable);

      // One error at a time, mirroring the API contract. If it belongs to a
      // field it goes under that field; otherwise it's a banner. Never both.
      if (result.failure.field) {
        setFieldErrors({ [result.failure.field]: result.failure.detail } as FieldErrors<TValues>);
        focusField(result.failure.field);
      } else {
        setFormError(result.failure);
      }
    },
    [submit, focusField],
  );

  const handleSubmit = useCallback(
    (event: React.SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isSubmitting || disabled) return;

      const formData = new FormData(event.currentTarget);

      const raw: Record<string, unknown> = {};
      for (const field of form.fields) raw[field] = formData.get(field);

      const parsed = form.parse(raw);
      if (!parsed.ok) {
        setFieldErrors(parsed.errors);
        setFormError(null);
        setCanRetry(false);
        const first = form.fields.find((field) => parsed.errors[field]);
        if (first) focusField(first);
        return;
      }

      const meta: Record<string, string> = {};
      for (const name of metaFields) meta[name] = String(formData.get(name) ?? '');

      setFieldErrors({});
      void send({ values: parsed.values, requestId: newRequestId(), meta });
    },
    [disabled, focusField, form, isSubmitting, metaFields, send],
  );

  const retry = useCallback(() => {
    const attempt = lastAttemptRef.current;
    if (attempt && !isSubmitting) void send(attempt);
  }, [isSubmitting, send]);

  const reset = useCallback(() => {
    formRef.current?.reset();
    lastAttemptRef.current = null;
    setFieldErrors({});
    setFormError(null);
    setLengths({});
    setSucceeded(null);
    setCanRetry(false);
  }, []);

  const fieldProps = useCallback(
    (field: TField, options: FieldPropsOptions = {}): FieldProps => {
      const hasError = Boolean(fieldErrors[field]);
      return {
        id: `${idPrefix}-${field}`,
        name: field,
        disabled: isSubmitting || disabled,
        'aria-invalid': hasError,
        'aria-describedby': hasError ? errorId(field) : options.describedBy,
        onBlur: (event) => {
          // `target`, not `currentTarget`: currentTarget is only valid while the
          // event is actively dispatching and the browser nulls it out the
          // moment dispatch ends. If anything between the DOM node and here
          // wraps, forwards, or defers the event by even a tick — a debounce, a
          // form-library adapter, a custom Select re-emitting its own event —
          // currentTarget is already gone by the time this runs. `target` has no
          // such lifetime restriction.
          const value = event.target.value;
          // Don't scold an empty field on the way past — that's submit's job.
          if (value.trim() === '') return;
          setFieldErrors((previous) => ({
            ...previous,
            [field]: form.validateField(field, value),
          }));
        },
        onChange: (event) => {
          // Captured immediately, before any setState — see the note in onBlur
          // above on why `target` and not `currentTarget`.
          const value = event.target.value;
          setLengths((previous) => ({ ...previous, [field]: value.length }));
          // Clear the error the moment they start fixing it. Re-validating per
          // keystroke means telling someone their email is invalid while they
          // are still typing it.
          setFieldErrors((previous) =>
            previous[field] ? { ...previous, [field]: undefined } : previous,
          );
          // Any edit invalidates the previous attempt, so drop the retry offer.
          setFormError(null);
          setCanRetry(false);
          lastAttemptRef.current = null;
        },
      };
    },
    [disabled, errorId, fieldErrors, form, idPrefix, isSubmitting],
  );

  return {
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
  };
}
