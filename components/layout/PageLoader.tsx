'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

/**
 * Full-screen loader shown until the document has finished loading — not just
 * hydrated, but `window.load`, which waits on every image, font and stylesheet
 * the initial page pulled in. That's the point: the site should never be seen
 * half-painted with images popping in and pushing layout around.
 *
 * It's an overlay, not a gate. The page renders underneath the whole time, so
 * crawlers and screen readers get the real document immediately and there's no
 * SEO cost to covering it visually. `aria-hidden` keeps the overlay itself out
 * of the accessibility tree.
 *
 * Three guards worth knowing about:
 *
 * - `readyState` is checked on mount, because `load` may already have fired
 *   before React hydrated. Listening alone would hang forever on a fast cache.
 * - `MIN_MS` stops the loader strobing on an instant load — a 60ms flash reads
 *   as a glitch, not as polish.
 * - `MAX_MS` is the escape hatch. One hanging image should never trap someone
 *   behind a splash screen, so the loader leaves regardless once it expires.
 */

const MIN_MS = 700;
const MAX_MS = 6000;

export function PageLoader() {
  const [hidden, setHidden] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const startedAt = Date.now();
    let minTimer: ReturnType<typeof setTimeout>;

    const finish = () => {
      const elapsed = Date.now() - startedAt;
      minTimer = setTimeout(() => setHidden(true), Math.max(0, MIN_MS - elapsed));
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }

    const maxTimer = setTimeout(() => setHidden(true), MAX_MS);

    return () => {
      window.removeEventListener('load', finish);
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, []);

  // Scrolling behind a splash screen is disorienting, and it also means people
  // land mid-page when it lifts.
  useEffect(() => {
    if (hidden) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [hidden]);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          aria-hidden="true"
          className="bg-primary fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8"
          initial={false}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Image
              src="/ules-footer-logo.png"
              alt=""
              width={276}
              height={60}
              priority
              className="h-auto w-56 md:w-69"
            />
          </motion.div>

          {/* Indeterminate: there is no real progress figure to report, and a
              fake percentage would be a lie that stalls at 90%. */}
          <div className="h-0.5 w-40 overflow-hidden rounded-full bg-white/15 md:w-56">
            <motion.div
              className="bg-accent h-full w-1/3 rounded-full"
              animate={reduceMotion ? { opacity: 1 } : { x: ['-120%', '360%'] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
