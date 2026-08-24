'use client';

import { motion, useReducedMotion } from 'motion/react';

/**
 * Enter animation for a route, mounted from `app/template.tsx` — Next remounts
 * templates on navigation, which is what makes this replay.
 *
 * Enter only, no exit. An exit animation would mean holding the old route on
 * screen while the new one is ready, and a delay between click and response
 * costs more than the polish returns.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
