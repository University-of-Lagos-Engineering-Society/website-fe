/**
 * Value normalisers, applied before validation.
 *
 * These run first so the trim-vs-validate ordering is never in question:
 * "  Ada   Lovelace " is a valid name, and " ADA@Example.COM " is a valid email.
 * Doing it here rather than as Zod transforms also means the same normalised
 * value is what gets sent over the wire.
 */

export const trim = (value: string): string => value.trim();

/** Trim, then collapse runs of internal whitespace to a single space. */
export const collapseWhitespace = (value: string): string => value.trim().replace(/\s+/g, ' ');

/** Email addresses are case-insensitive in practice. Store one canonical form. */
export const normalizeEmail = (value: string): string => value.trim().toLowerCase();

/** Strip everything that isn't a digit or a leading plus. */
export const normalizePhone = (value: string): string =>
  value.trim().replace(/(?!^\+)[^\d]/g, '');
