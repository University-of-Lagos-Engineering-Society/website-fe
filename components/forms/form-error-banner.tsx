'use client';

import { useEffect, useRef } from 'react';
import type { ApiFailure } from '@/lib/api/errors';

/**
 * Form-level error. Shown only for failures that don't belong to a single input
 * — rate limits, outages, unmapped error titles — so a field error and a banner
 * are never on screen at once.
 *
 * Takes focus when it appears. Without that, someone using a screen reader
 * submits, hears nothing, and has no idea why the page didn't move.
 *
 * Two shapes:
 *   card   — boxed, for full-width forms with room for it
 *   inline — a line of text, for compact forms (a footer signup, say) where a
 *            bordered box would dwarf the input it's complaining about
 */
export function FormErrorBanner({
  failure,
  onRetry,
  canRetry = false,
  retryDisabled = false,
  variant = 'card',
  className = '',
}: {
  failure: ApiFailure | null;
  onRetry?: () => void;
  canRetry?: boolean;
  retryDisabled?: boolean;
  variant?: 'card' | 'inline';
  /** Escape hatch for surfaces with their own palette — a dark footer, say. */
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (failure) ref.current?.focus();
  }, [failure]);

  if (!failure) return null;

  const retryButton = canRetry && onRetry && (
    <button
      type="button"
      onClick={onRetry}
      disabled={retryDisabled}
      className="font-medium underline underline-offset-2 hover:no-underline disabled:opacity-60"
    >
      Try again
    </button>
  );

  if (variant === 'inline') {
    return (
      <div
        ref={ref}
        tabIndex={-1}
        role="alert"
        className={`text-destructive text-sm outline-none ${className}`}
      >
        {failure.detail} {retryButton}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="alert"
      className={`mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 outline-none ${className}`}
    >
      <div className="flex gap-3">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="mt-0.5 size-4 shrink-0 text-amber-700"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v5M12 16.5v.01" strokeLinecap="round" />
        </svg>
        <div className="min-w-0 flex-1 text-amber-900">
          <p className="text-sm/5">{failure.detail}</p>
          {retryButton && <p className="mt-2 text-sm/5">{retryButton}</p>}

          {/* Enough for someone to quote when they email to say it's broken. */}
          {failure.statusCode && (
            <p className="mt-2 font-mono text-xs/4 text-amber-800/70">
              Error {failure.statusCode} · {failure.title}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
