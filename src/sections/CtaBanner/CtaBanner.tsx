import { ArrowRight, Mail } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { profile } from '@/data';

/**
 * CtaBanner — a high-impact call-to-action strip placed between the Journey
 * and Contact sections. Warm gradient background breaks the alternating
 * white/cream rhythm and draws the eye before the final contact section.
 *
 * The secondary button is an explicit <a> (not the `outline` Button variant)
 * so its white-on-teal styling can't clash with the shared variant classes.
 */
export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 py-16 sm:py-20">
      {/* Decorative radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-teal-400/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-sage-300/10 blur-3xl"
      />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-200/80">
            Open to Opportunities
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Ready to bring clinical excellence to your team
          </h2>
          <p className="mt-4 text-base leading-relaxed text-teal-100/80">{profile.positioning}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button as="a" href="#contact" size="lg" className="active:bg-teal-950">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Get in Touch
            </Button>
            <a
              href={profile.cvUrl}
              className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-base font-semibold text-white ring-1 ring-inset ring-white/40 transition duration-200 ease-out-quart hover:bg-white/10 active:translate-y-px active:bg-white/20"
            >
              Download CV
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
