import { Award, GraduationCap, Hospital } from 'lucide-react';

import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { certifications, clinicalPostings } from '@/data';

/**
 * Certifications — credential grid.
 *
 * `certifications.map` renders each entry; the `kind` field switches the
 * icon — a small example of conditional rendering driven by data.
 */
export function Certifications() {
  return (
    <section id="certifications" aria-labelledby="certifications-heading" className="section-pad">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="Credentials"
            title="Certifications & education"
            lede="Formal qualifications and current certifications that underpin safe, evidence-based practice."
          />
        </AnimatedSection>

        <AnimatedSection animateChildren className="mt-12 grid gap-5 sm:grid-cols-2">
          {certifications.map((credential) => (
            <Card key={credential.title} hover className="group flex items-start gap-4 p-6">
              <span
                className={
                  credential.kind === 'degree'
                    ? 'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition duration-300 ease-out-quart group-hover:scale-105 group-hover:bg-teal-100'
                    : 'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sage-100 text-sage-700 transition duration-300 ease-out-quart group-hover:scale-105 group-hover:bg-sage-200'
                }
              >
                <Icon icon={credential.kind === 'degree' ? GraduationCap : Award} />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-base font-bold text-charcoal-900">
                  {credential.title}
                </h3>
                <p className="mt-1 text-sm text-charcoal-600">{credential.issuer}</p>
                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-charcoal-400">
                  {credential.kind === 'degree' ? 'Degree' : 'Certification'} · {credential.year}
                </p>
              </div>
            </Card>
          ))}
        </AnimatedSection>

        {/* Clinical training postings from the BSc Nursing program */}
        <AnimatedSection animateChildren className="mt-10">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500">
            Clinical training postings (2016 — 2020)
          </h3>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {clinicalPostings.map((posting) => (
              <li
                key={posting.title}
                className="flex items-center gap-3 rounded-xl border border-charcoal-900/8 bg-cream-50 px-4 py-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sage-100 text-sage-700">
                  <Icon icon={Hospital} className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-charcoal-900">
                    {posting.title}
                  </span>
                  <span className="block text-xs text-charcoal-500">{posting.year}</span>
                </span>
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </Container>
    </section>
  );
}
