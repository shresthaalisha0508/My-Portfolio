import { Award, GraduationCap } from 'lucide-react';

import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { certifications } from '@/data';

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
            <Card key={credential.title} hover className="flex items-start gap-4 p-6">
              <span
                className={
                  credential.kind === 'degree'
                    ? 'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700'
                    : 'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sage-100 text-sage-700'
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
      </Container>
    </section>
  );
}
