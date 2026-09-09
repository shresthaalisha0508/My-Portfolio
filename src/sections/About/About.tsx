import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { profile } from '@/data';

/**
 * About — editorial two-column layout: narrative on the left, statistics on
 * the right. All figures come from the profile data (derived from Alisha's
 * real CV), not from fabricated numbers.
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-pad bg-white">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="About"
            title="Nursing built on empathy, precision and teamwork"
            lede="A snapshot of who I am as a clinician — and what you can expect when we work together."
          />
        </AnimatedSection>

        <div className="mt-12 grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Narrative */}
          <AnimatedSection className="lg:col-span-3">
            <div className="space-y-5 text-base leading-relaxed text-charcoal-600">
              <p>
                I'm Alisha — a registered nurse with a Bachelor of Science in Nursing from RGUHS,
                Bangalore, and recent hospital experience across paediatric and teaching hospitals
                in Nepal and a multi-speciality hospital in India. I'm now building on that
                foundation with an MBA in Health Service Management.
              </p>
              <p>{profile.philosophy}</p>
              <h3 id="about-heading" className="pt-2 font-display text-lg font-bold text-charcoal-900">
                How I practise
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
                  <span>
                    <strong className="font-semibold text-charcoal-800">Safe hands.</strong>{' '}
                    Careful medication administration and strict infection control, every shift.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
                  <span>
                    <strong className="font-semibold text-charcoal-800">Watchful eyes.</strong>{' '}
                    Vital signs, lab results and observations — monitored closely, escalated early.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
                  <span>
                    <strong className="font-semibold text-charcoal-800">Clear voice.</strong>{' '}
                    Patients and families who understand the plan become part of the care team.
                  </span>
                </li>
              </ul>
            </div>
          </AnimatedSection>

          {/* Statistics */}
          <AnimatedSection animateChildren className="lg:col-span-2">
            <dl className="grid grid-cols-2 gap-4">
              {profile.stats.map((stat) => (
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
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
