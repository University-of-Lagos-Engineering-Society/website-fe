'use client';

import { useEffect, useRef } from 'react';
import { Button } from '../ui/button';

/**
 * Replaces the form after a successful submission.
 *
 * Takes focus on mount so keyboard and screen-reader users land on the
 * confirmation instead of somewhere in a form that no longer exists.
 */
export function FormSuccess({
  title,
  description,
  reference,
  actionLabel,
  onAction,
}: {
  title: string;
  description: React.ReactNode;
  /** Shown truncated, for someone to quote when following up. */
  reference?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="status"
      aria-live="polite"
      className="rounded-lg border border-gray-200 px-4 py-10 text-center outline-none md:px-8"
    >
      <span
        aria-hidden="true"
        className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-green-50 text-green-700"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-6">
          <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>

      <h3 className="text-primary text-xl/7 font-medium">{title}</h3>
      <div className="mx-auto mt-3 max-w-md text-base/6 text-gray-700">{description}</div>

      {reference && (
        <p className="mt-4 font-mono text-sm/5 text-gray-500">
          Reference {reference.slice(0, 8).toUpperCase()}
        </p>
      )}

      {actionLabel && onAction && (
        <Button variant="outline" onClick={onAction} className="mt-7 h-12">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
