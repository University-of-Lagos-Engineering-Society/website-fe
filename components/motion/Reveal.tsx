'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';

/**
 * Scroll-triggered reveal — the site's one entrance gesture.
 *
 * `once: true` on purpose. Content that re-animates every time it scrolls back
 * into view is exhausting to read and makes long pages feel unstable.
 *
 * `initial={false}` under reduced motion skips the animation entirely rather
 * than shortening it, so nothing ever starts at `opacity: 0` for someone who
 * asked not to be moved.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds. Use to cascade sibling blocks. */
  delay?: number;
  /** Distance travelled, in px. */
  y?: number;
};

export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      // A negative margin fires the animation slightly before the block reaches
      // the fold, so it's already settling by the time it's properly on screen.
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: EASE, delay }}
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
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/**
 * Wraps a grid or list so its children cascade in rather than all appearing at
 * once. Pair with `StaggerItem` on each child.
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
  const Component = Tag === 'ul' ? motion.ul : motion.div;

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
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
  const Component = Tag === 'li' ? motion.li : motion.div;
  return (
    <Component className={className} variants={itemVariants}>
      {children}
    </Component>
  );
}
