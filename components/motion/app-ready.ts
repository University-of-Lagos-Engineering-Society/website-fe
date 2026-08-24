'use client';

import { useSyncExternalStore } from 'react';

/**
 * "The loader is gone, you may now animate."
 *
 * Without this, every reveal above the fold fires the instant the page mounts —
 * which is while `PageLoader` is still covering the screen. By the time the
 * loader lifts, those animations have already finished, so the first screenful
 * appears fully settled and the site looks static exactly where it should look
 * alive.
 *
 * This is a two-way flag, not a one-way latch, because the loader re-appears on
 * every route change: each navigation flips it busy, then ready once that
 * route's assets have landed.
 *
 * A module-level store rather than context: it's read by many scattered
 * components and must survive the remount `app/template.tsx` performs on every
 * navigation. Read through `useSyncExternalStore` because that is exactly what
 * it's for, and because it gives a distinct server snapshot (always `false`) so
 * server and first-client render agree and nothing hydration-mismatches.
 */

let appReady = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

export function setAppReady(next: boolean) {
  if (appReady === next) return;
  appReady = next;
  emit();
}

export const markAppReady = () => setAppReady(true);
export const markAppBusy = () => setAppReady(false);

// Failsafe for the very first paint. If PageLoader is removed or throws before
// it can release the flag, content must not stay invisible.
if (typeof window !== 'undefined') {
  setTimeout(markAppReady, 6500);
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}

const getSnapshot = () => appReady;
const getServerSnapshot = () => false;

export function useAppReady() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
