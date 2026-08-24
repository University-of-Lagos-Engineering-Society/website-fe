'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { markAppBusy, markAppReady } from '@/components/motion/app-ready';

/**
 * Full-screen loader, shown on first paint and again on every route change.
 *
 * ## Why it can't just listen for `load`
 *
 * `window.load` fires once per document. Every navigation after that is
 * client-side — React swaps the tree, the browser never reloads — so a loader
 * built on `load` alone appears exactly once and never again, no matter how
 * many images the next route pulls in. Instead this waits on `load` for the
 * very first paint, and on the actual `<img>` elements for every navigation
 * after it.
 *
 * ## Which images it waits for
 *
 * Only the ones already fetching — `loading="lazy"` images below the fold are
 * skipped. Waiting on those would mean waiting for a scroll that may never
 * happen, and the loader would sit there until its own ceiling expired. What's
 * left is precisely the above-the-fold artwork, which is what "the page looks
 * ready" actually means.
 *
 * ## Why navigations get a grace period
 *
 * Most routes here are prerendered and swap instantly. Flashing a splash screen
 * over a 40ms transition makes a fast site feel slow, so on navigation the
 * loader only appears if assets are *still* outstanding after GRACE_MS. First
 * paint has no grace — there's nothing on screen yet to protect.
 *
 * It remains an overlay, not a gate: the page renders underneath throughout, so
 * crawlers and screen readers get the real document and `aria-hidden` keeps the
 * overlay itself out of the accessibility tree.
 */

/** Minimum on-screen time once shown, so it can't strobe. */
const MIN_MS = 600;
/** How long a navigation may take before the loader appears at all. */
const GRACE_MS = 160;
/** Ceiling. One stuck asset must never trap someone behind a splash screen. */
const MAX_MS = 6000;

/** Resolves once every non-lazy image on the page has settled. */
function imagesSettled(): Promise<void> {
  const pending = Array.from(document.images).filter(
    (img) => !img.complete && img.loading !== 'lazy',
  );

  return Promise.all(
    pending.map(
      (img) =>
        new Promise<void>((resolve) => {
          // `error` resolves too — a broken image is settled, and blocking on
          // one would hold the whole page hostage.
          img.addEventListener('load', () => resolve(), { once: true });
          img.addEventListener('error', () => resolve(), { once: true });
        }),
    ),
  ).then(() => undefined);
}

/** Two frames: long enough for React to commit the new route's DOM. */
function nextPaint(): Promise<void> {
  return new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  );
}

export function PageLoader() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const isFirst = isFirstRender.current;
    isFirstRender.current = false;

    let cancelled = false;
    let shownAt: number | null = isFirst ? Date.now() : null;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;

    // Hold the reveal animations until this route's assets are in, so the first
    // screenful animates in front of the viewer rather than behind the splash.
    markAppBusy();
    if (isFirst) setVisible(true);

    // On navigation, only surface the loader if the route is actually slow.
    const graceTimer = isFirst
      ? undefined
      : setTimeout(() => {
          if (cancelled) return;
          shownAt = Date.now();
          setVisible(true);
        }, GRACE_MS);

    const finish = () => {
      if (cancelled) return;
      const heldFor = shownAt === null ? MIN_MS : Date.now() - shownAt;
      const remaining = Math.max(0, MIN_MS - heldFor);

      settleTimer = setTimeout(() => {
        if (cancelled) return;
        setVisible(false);
        markAppReady();
      }, remaining);
    };


    const waitForAssets = async () => {
      if (isFirst && document.readyState !== 'complete') {
        await new Promise<void>((resolve) =>
          window.addEventListener('load', () => resolve(), { once: true }),
        );
      } else {
        await nextPaint();
      }

      await imagesSettled();

      // Fonts swap in late and shift text when they do.
      if (typeof document !== 'undefined' && 'fonts' in document) {
        try {
          await document.fonts.ready;
        } catch {
          // Not supported, or rejected. Neither is worth stalling for.
        }
      }
    };

    void waitForAssets().then(finish, finish);

    const maxTimer = setTimeout(() => {
      if (cancelled) return;
      setVisible(false);
      markAppReady();
    }, MAX_MS);

    return () => {
      cancelled = true;
      clearTimeout(graceTimer);
      clearTimeout(settleTimer);
      clearTimeout(maxTimer);
    };
  }, [pathname]);

  // Scrolling behind a splash screen is disorienting, and it also means people
  // land mid-page when it lifts.
  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="bg-primary fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8"
          initial={false}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
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
