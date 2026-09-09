import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { profile, stats } from '@/data';

/**
 * About — editorial two-column layout: narrative on the left, statistics on
 * the right. The stats are demo content (fictional profile); the footer
 * disclaimer plus the "portfolio demo" note in the README make clear they are
 * not factual claims about a real person.
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-pad bg-white">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="About"
            title="Nursing built on empathy, evidence and advocacy"
            lede="A snapshot of who I am as a clinician — and what you can expect when we work together."
          />
        </AnimatedSection>

        <div className="mt-12 grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Narrative */}
          <AnimatedSection className="lg:col-span-3">
            <div className="space-y-5 text-base leading-relaxed text-charcoal-600">
              <p>
                I'm Sarah — a Melbourne-based registered nurse with more than eight years across
                intensive care and emergency settings. My practice sits at the intersection of
                clinical precision and human connection: monitoring the numbers, and never
                forgetting the person behind them.
              </p>
              <p>{profile.philosophy}</p>
              <h3 id="about-heading" className="pt-2 font-display text-lg font-bold text-charcoal-900">
                My clinical values
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
                  <span>
                    <strong className="font-semibold text-charcoal-800">Patient-centred first.</strong>{' '}
                    Care plans start with the patient's own goals, not the workflow.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
                  <span>
                    <strong className="font-semibold text-charcoal-800">Communication is care.</strong>{' '}
                    Families who understand the plan become part of the care team.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
                  <span>
                    <strong className="font-semibold text-charcoal-800">Evidence over habit.</strong>{' '}
                    Practice informed by current research, audit and reflection.
                  </span>
                </li>
              </ul>
            </div>
          </AnimatedSection>

          {/* Statistics */}
          <AnimatedSection animateChildren className="lg:col-span-2">
            <dl className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-charcoal-900/8 bg-cream-50 p-5"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-3xl font-bold text-teal-800">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-sm text-charcoal-500">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-charcoal-400">
              Illustrative figures for this portfolio demo.
            </p>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
