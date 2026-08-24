import { SITE } from '@/lib/seo';

/**
 * Whether an href leaves this site.
 *
 * Resolved against the site origin rather than string-matched, so a protocol-
 * relative `//evil.com`, a full `https://ules.org.ng/...` self-link and a bare
 * `/about` all classify correctly instead of by whether they happen to start
 * with "http".
 *
 * `mailto:` and `tel:` are not external in the sense that matters here — they
 * hand off to another application, and `target="_blank"` on them leaves an
 * orphaned blank tab behind.
 */
export function isExternalHref(href: string | undefined | null): boolean {
  if (!href) return false;
  if (href.startsWith('#') || href.startsWith('/')) return false;
  if (/^(mailto:|tel:|sms:)/i.test(href)) return false;

  try {
    return new URL(href, SITE.url).origin !== new URL(SITE.url).origin;
  } catch {
    // Not a parseable URL — treat as internal rather than opening a new tab to
    // something we can't reason about.
    return false;
  }
}

/**
 * Props to spread on an anchor pointing off-site.
 *
 * `noopener` is the one that matters: without it the destination gets a live
 * `window.opener` handle back to this page and can navigate it somewhere else
 * (reverse tabnabbing). `noreferrer` additionally withholds the referring URL.
 * Modern browsers imply `noopener` for `target="_blank"`, but older ones don't
 * and the attribute costs nothing.
 */
export function externalLinkProps(href: string | undefined | null) {
  return isExternalHref(href)
    ? ({ target: '_blank', rel: 'noopener noreferrer' } as const)
    : ({} as const);
}
