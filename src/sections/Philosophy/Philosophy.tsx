import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Container } from '@/components/ui/Container';
import { philosophyPrinciples } from '@/data';

/**
 * Philosophy — deliberately different layout language: dark teal surface,
 * numbered editorial rows instead of cards. Sections should not all look the
 * same; changing surface colour + rhythm resets the reader's attention.
 */
export function Philosophy() {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="section-pad bg-teal-900 text-white"
    >
      <Container>
        <AnimatedSection>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
              Clinical Philosophy
            </p>
            <h2
              id="philosophy-heading"
              className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl"
            >
              The principles behind every shift
            </h2>
            <p className="mt-4 text-base leading-relaxed text-teal-100/85">
              Six commitments that shape how I practise — on good days and hard ones.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection animateChildren className="mt-14">
          <ol className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            {philosophyPrinciples.map((principle) => (
              <li key={principle.number} className="border-t border-white/15 pt-6">
                <span
                  aria-hidden="true"
                  className="font-display text-sm font-bold tracking-widest text-coral-300"
                >
                  {principle.number}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold">{principle.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-teal-100/80">
                  {principle.description}
                </p>
              </li>
            ))}
          </ol>
        </AnimatedSection>
      </Container>
    </section>
  );
}
