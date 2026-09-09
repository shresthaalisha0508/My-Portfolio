import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * AnimatedCounter — counts from 0 to a target number when it enters the
 * viewport. Uses `useInView` for detection and `requestAnimationFrame` for
 * smooth 60fps stepping. Falls back to the final number for reduced-motion
 * users.
 *
 * Parses numeric prefixes like "4+" by extracting the leading digits.
 */
interface AnimatedCounterProps {
  value: string;
  label: string;
  className?: string;
}

function parseTarget(raw: string): { numeric: number; suffix: string } {
  const match = raw.match(/^(\d+)(.*)/);
  if (!match) return { numeric: 0, suffix: raw };
  return { numeric: parseInt(match[1], 10), suffix: match[2] };
}

export function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const shouldReduceMotion = useReducedMotion();
  const { numeric, suffix } = parseTarget(value);
  const [display, setDisplay] = useState(shouldReduceMotion ? numeric : 0);

  useEffect(() => {
    if (shouldReduceMotion || !isInView || numeric === 0) return;

    let start = 0;
    const duration = 1200;
    let raf: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-cubic for a natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * numeric));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, numeric, shouldReduceMotion]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-charcoal-900/8 bg-cream-50 p-5"
    >
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="stat-value block font-display text-3xl font-bold text-teal-800">
          {display}
          {suffix}
        </span>
        <span className="mt-1 block text-sm text-charcoal-500">{label}</span>
      </dd>
    </motion.div>
  );
}
