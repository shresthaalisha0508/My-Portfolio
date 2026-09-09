import type { Variants } from 'framer-motion';

/**
 * Reusable animation variants (Framer Motion)
 * ---------------------------------------------------------------------------
 * Centralising variants keeps motion consistent across the site: same easing,
 * same distances, same feel. Components import `fadeUp`, `stagger`, etc.
 * instead of re-declaring magic numbers inline.
 *
 * Accessibility note: `useReducedMotion` from framer-motion is applied inside
 * <AnimatedSection> and the hero, so every animation built on these variants
 * is automatically disabled for users who prefer reduced motion.
 */

/** Short, professional ease used site-wide. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Single element: gentle rise + fade. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/** Parent that staggers its children's `fadeUp` (or similar) variants. */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export { fadeUp as fadeUpVariant };
