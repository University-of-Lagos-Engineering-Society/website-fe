'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

import { HIGHLIGHTED_EVENT_ITEMS } from '@/components/constants';
import { isEventPast } from '@/lib/utils';

/**
 * Countdown strip promoting the annual dinner, pinned under the navbar.
 *
 * Positioned `absolute` inside the wrapper around `<main>`, so it overlays the
 * top of the page rather than pushing the hero down, and scrolls away with the
 * content instead of sticking like the navbar above it.
 *
 * It removes itself once the event is over — `isEventPast` applies the same
 * three-hour grace the rest of the site uses, so the banner survives the
 * evening of the event rather than vanishing the moment it starts.
 *
 * Nothing renders until after mount. A countdown is time-dependent by
 * definition, so server and client would disagree on the seconds digit and
 * React would report a hydration mismatch on every single load.
 */

const EVENT_SLUG = 'dinner-awards-2026';

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function breakdown(ms: number): Remaining {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <span className="flex items-baseline gap-1">
      <span className="font-mono text-sm/5 font-semibold tabular-nums md:text-base/6">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px]/4 uppercase opacity-80 md:text-xs/4">{label}</span>
    </span>
  );
}

export function EventCountdownBanner() {
  const event = HIGHLIGHTED_EVENT_ITEMS.find((item) => item.slug === EVENT_SLUG);
  const timestamp = event?.timestamp;

  const [remaining, setRemaining] = useState<Remaining | null>(null);
  const [finished, setFinished] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!timestamp) return;

    const target = new Date(timestamp).getTime();

    const tick = () => {
      if (isEventPast(timestamp)) {
        setFinished(true);
        return;
      }
      setRemaining(breakdown(target - Date.now()));
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timestamp]);

  if (!event || finished || !remaining) return null;

  return (
    <motion.div
      className="absolute inset-x-0 top-0 z-40"
      initial={reduceMotion ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
    >
      <Link
        href={`/activities/events/${event.slug}`}
        className="bg-accent hover:bg-accent/90 focus-visible:ring-ring/60 group flex w-full items-center justify-center gap-3 px-4 py-2.5 text-white transition-colors outline-none focus-visible:ring-3 focus-visible:ring-inset md:gap-4 md:py-3"
      >
        <span className="relative flex size-2 shrink-0">
          {!reduceMotion && (
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-75" />
          )}
          <span className="relative inline-flex size-2 rounded-full bg-white" />
        </span>

        <span className="truncate text-sm/5 font-medium md:text-base/6">
          <span className="hidden sm:inline">{event.details.title}</span>
          <span className="sm:hidden">Dinner &amp; Awards</span>
        </span>

        <span aria-hidden="true" className="hidden h-4 w-px bg-white/40 sm:block" />

        <span
          className="flex shrink-0 items-baseline gap-2 md:gap-3"
          aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes and ${remaining.seconds} seconds remaining`}
        >
          <Unit value={remaining.days} label="d" />
          <Unit value={remaining.hours} label="h" />
          <Unit value={remaining.minutes} label="m" />
          <Unit value={remaining.seconds} label="s" />
        </span>

        <ArrowRight
          aria-hidden="true"
          className="hidden size-4 shrink-0 transition-transform group-hover:translate-x-1 md:block"
        />
      </Link>
    </motion.div>
  );
}
