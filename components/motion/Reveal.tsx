'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';

import { useAppReady } from '@/components/motion/app-ready';

/**
 * Scroll-triggered reveal — the site's one entrance gesture.
 *
 * Tuned to actually be seen. The travel is deliberately larger than the usual
 * 16–24px: these wrap whole page sections, and a screenful of content sliding a
 * couple of dozen pixels reads as a rendering hiccup rather than as motion. A
 * touch of scale on top gives the block some depth as it settles.
 *
 * `viewport.margin` shrinks the trigger area from the bottom, so a section
 * starts moving once it's genuinely coming into view rather than the moment its
 * top edge clips the fold — which, for a section taller than the viewport,
 * meant the animation finished long before you could see it.
 *
 * `once: true` on purpose. Content that re-animates every time it scrolls back
 * into view is exhausting to read and makes long pages feel unstable.
 *
 * Under reduced motion this renders statically — the animation is skipped
 * rather than shortened, so nothing ever starts at `opacity: 0` for someone who
 * asked not to be moved.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fires when the block is ~18% up from the bottom edge of the viewport. */
const VIEWPORT = { once: true, margin: '0px 0px -18% 0px' } as const;

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 44, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: EASE },
  },
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds. Use to cascade sibling blocks. */
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const ready = useAppReady();
  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      data-reveal
      className={className}
      variants={revealVariants}
      initial="hidden"
      // Held at "hidden" until the loader lifts, so the first screenful
      // animates in front of the viewer instead of behind the splash.
      whileInView={ready ? 'visible' : 'hidden'}
      viewport={VIEWPORT}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Staggered lists                                                            */
/* -------------------------------------------------------------------------- */

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

/**
 * Wraps a grid or list so its children cascade in rather than arriving as one
 * slab. This is what makes a page of cards feel alive — pair with `StaggerItem`
 * on each child.
 */
export function Stagger({
  children,
  className,
  as: Tag = 'ul',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'ul' | 'div';
}) {
  const reduceMotion = useReducedMotion();
  const ready = useAppReady();
  if (reduceMotion) {
    return Tag === 'ul' ? (
      <ul className={className}>{children}</ul>
    ) : (
      <div className={className}>{children}</div>
    );
  }

  const Component = Tag === 'ul' ? motion.ul : motion.div;

  return (
    <Component
      data-reveal
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView={ready ? 'visible' : 'hidden'}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  as: Tag = 'li',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'li' | 'div';
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return Tag === 'li' ? (
      <li className={className}>{children}</li>
    ) : (
      <div className={className}>{children}</div>
    );
  }

  const Component = Tag === 'li' ? motion.li : motion.div;

  return (
    <Component data-reveal className={className} variants={itemVariants}>
      {children}
    </Component>
  );
}
