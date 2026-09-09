import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';

import { Portrait } from './Portrait';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { credentialHighlights, profile } from '@/data';
import { EASE } from '@/lib/motion';

/**
 * Hero — the opening screen.
 *
 * The entrance uses `initial` + `animate` (plays once on load) rather than
 * `whileInView`, because the hero is above the fold. Text and visual animate
 * as one staggered choreography; reduced-motion users get a static render.
 */
export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const container = shouldReduceMotion
    ? undefined
    : {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
      };

  const item = shouldReduceMotion
    ? undefined
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      };

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      {/* Soft brand wash behind the top of the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-gradient-to-b from-sage-100/70 via-cream-50/40 to-transparent"
      />
      {/* Radial glow behind the portrait — depth without a heavy gradient */}
      <div
        aria-hidden="true"
        className="glow-sage pointer-events-none absolute right-0 top-24 -z-10 hidden h-[28rem] w-[28rem] -translate-y-6 lg:block"
      />

      <Container className="grid items-center gap-12 pb-16 pt-28 sm:pt-32 lg:grid-cols-2 lg:gap-16 lg:pb-24 lg:pt-36">
        {/* Copy */}
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.p variants={item} className="flex items-center">
            {/* Availability pill — subtle presence dot; pulse only when the OS
                allows motion, static otherwise (prefers-reduced-motion) */}
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3.5 py-1.5 text-xs font-semibold text-teal-800 ring-1 ring-inset ring-teal-600/25">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-60 motion-safe:animate-ping motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
              </span>
              {profile.heroEyebrow}
            </span>
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={item}
            className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-charcoal-900 sm:text-5xl lg:text-6xl"
          >
            {profile.heroHeading}
            <span className="block text-teal-700">{profile.heroHighlight}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-base leading-relaxed text-charcoal-600 sm:text-lg"
          >
            {profile.positioning}
          </motion.p>

          <motion.div variants={item} className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:flex lg:flex-wrap lg:gap-3">
            {/* Mobile: full-width stacked buttons with larger tap area;
                sm+: side-by-side; lg+: natural width like the original. */}
            <Button as="a" href="#contact" size="lg" className="w-full sm:w-auto active:bg-teal-900">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Let's Connect
            </Button>
            <Button
              as="a"
              href="#experience"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto active:bg-teal-100"
            >
              View Experience
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </Button>
          </motion.div>

          {/* Trust / credential row */}
          <motion.ul
            variants={item}
            aria-label="Credentials"
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2"
          >
            {credentialHighlights.map((label) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-charcoal-600"
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-coral-400" />
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Visual */}        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none"
        >
          <motion.div variants={item}>
            <Portrait />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
