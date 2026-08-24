import { ArrowUpRight } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Teaser gate at the foot of a blog post.
 *
 * The detail page is a funnel: it shows enough of the post to be worth reading
 * and hands the rest to Substack, where the writing actually lives. The excerpt
 * is capped and faded — the familiar Medium/Chegg treatment — so the cut reads
 * as deliberate rather than as a page that failed to load.
 *
 * The clipped text stays in the DOM and is not `aria-hidden`: this is a
 * marketing gate, not a paywall, so there's nothing to withhold from a screen
 * reader or a crawler. Only the visual gets truncated.
 *
 * An `<a>` styled as a button rather than `<Button>` inside an `<a>` — nesting
 * a button in a link is invalid HTML and gives keyboard users two stops for one
 * action.
 */

type ContinueReadingProps = {
  /** Absolute URL of the post on Substack. */
  href: string;
  children: React.ReactNode;
};

export function ContinueReading({ href, children }: ContinueReadingProps) {
  return (
    <>
      <div className="relative max-h-112 overflow-hidden">
        {children}

        <div
          aria-hidden="true"
          className="from-background via-background/85 pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-linear-to-t to-transparent"
        />
      </div>

      <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-8 text-center md:px-8">
        <h2 className="text-primary text-lg/7 font-medium">There&apos;s more where that came from</h2>
        <p className="mx-auto mt-2 max-w-md text-base/6 text-gray-700">
          The rest of this post and every issue we publish are lives on the ULES Substack.
        </p>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants(), 'mt-6 h-12 gap-2 px-6 text-base/6')}
        >
          Click to continue reading
          <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
          <span className="sr-only">(opens ulesblog.substack.com in a new tab)</span>
        </a>
      </div>
    </>
  );
}
