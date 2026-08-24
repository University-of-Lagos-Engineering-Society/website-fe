'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Share2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FacebookIcon, LinkedinIcon, TwitterIcon } from '@/components/icons';

/**
 * Share row at the foot of a news story.
 *
 * The three network buttons are plain links to each platform's share intent —
 * no SDK, no tracking script, nothing to consent to. They're `<a>` rather than
 * `<button>` because that's what they are: a navigation to another origin.
 *
 * The labelled button prefers the Web Share API, which on a phone opens the
 * real OS share sheet (WhatsApp, Telegram, mail — where this audience actually
 * shares things). Desktop browsers mostly don't implement it, so there the
 * fallback copies the link and says so.
 *
 * `url` is passed in rather than read from `window.location` so the markup is
 * identical on the server and the client — reading location during render
 * would hydrate-mismatch, and reading it in an effect would leave the share
 * targets briefly pointing nowhere.
 */

type ShareNewsProps = {
  title: string;
  /** Absolute URL. Relative paths break every one of these share intents. */
  url: string;
};

const COPIED_RESET_MS = 2000;

export function ShareNews({ title, url }: ShareNewsProps) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (resetTimer.current) clearTimeout(resetTimer.current); }, []);

  const targets = [
    // {
    //   name: 'Facebook',
    //   Icon: FacebookIcon,
    //   href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    // },
    {
      name: 'X (formerly Twitter)',
      Icon: TwitterIcon,
      href: `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: 'LinkedIn',
      Icon: LinkedinIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ];

  const handleShare = useCallback(async () => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Dismissing the share sheet rejects, and so does a browser that
        // advertises the API but refuses the payload. Neither is worth
        // reporting — fall through and copy instead.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), COPIED_RESET_MS);
    } catch {
      // Clipboard needs a secure context and can be permission-blocked. The
      // three network buttons still work, so there's nothing to recover from.
    }
  }, [title, url]);

  return (
    <div className="mt-10 flex flex-col gap-6 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
      <Button
        type="button"
        variant="ghost"
        onClick={handleShare}
        className="h-14 w-full gap-2 rounded-lg bg-gray-200 text-base/6 font-normal text-gray-700 hover:bg-gray-300 sm:w-54.25"
      >
        <Share2 className="size-5 shrink-0" aria-hidden="true" />
        {/* Fixed width above `sm`, so swapping the label doesn't shift the row. */}
        <span aria-live="polite">{copied ? 'Link copied' : 'Share news'}</span>
      </Button>

      <ul className="flex gap-3">
        {targets.map(({ name, Icon, href }) => (
          <li key={name}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${name} (opens in a new tab)`}
              title={`Share on ${name}`}
              className="flex size-9 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200 [&_path]:stroke-gray-700"
            >
              <Icon className="size-5" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
