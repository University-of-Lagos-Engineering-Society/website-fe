import Link from 'next/link';

import { isExternalHref } from '@/lib/links';

/**
 * A link that works out where it's going.
 *
 * Internal hrefs get `next/link` and its prefetching and client-side
 * navigation. External ones get a plain anchor with `target="_blank"` and
 * `rel="noopener noreferrer"` — `next/link` would otherwise try to
 * client-navigate to another origin, which at best hard-reloads and at worst
 * leaves the router in a confused state.
 *
 * Use this anywhere the href comes from data rather than being written inline,
 * since that's where an off-site URL can appear without the call site knowing.
 */

type SmartLinkProps = React.ComponentProps<'a'> & {
  href: string;
};

export function SmartLink({ href, children, ...props }: SmartLinkProps) {
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
