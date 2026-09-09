import { motion, useReducedMotion } from 'framer-motion';

import { fadeUp, stagger } from '@/lib/motion';

/**
 * AnimatedSection — reveal-on-scroll wrapper used by every section.
 *
 * Key ideas:
 *  1. `whileInView` + `viewport={{ once: true }}` animates the first time the
 *     section enters the viewport, never re-animating on scroll-back. Cheap
 *     and non-distracting.
 *  2. `useReducedMotion()` swaps animations for static rendering when the OS
 *     "reduce motion" preference is on — required by WCAG 2.3.3.
 *  3. `stagger` + child variants coordinate multi-element entrances through
 *     one prop (`variants={stagger}`) instead of per-child timers.
 *
 * Flutter equivalent: wrapping a widget in an implicit animation tween that
 * fires when it first builds on screen.
 */
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Render `stagger`/`fadeUp` variants on the children container. */
  animateChildren?: boolean;
}

export function AnimatedSection({ children, className, animateChildren = false }: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={animateChildren ? stagger : fadeUp}
    >
      {children}
    </motion.div>
  );
}
