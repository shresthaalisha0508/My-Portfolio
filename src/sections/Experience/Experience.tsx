import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SkillPill } from '@/components/ui/SkillPill';
import { experiences } from '@/data';

/**
 * Experience — vertical timeline of roles.
 *
 * The rail is a pseudo-absolute border on the <ol>; each <li> positions its
 * dot against it. Keeping the list semantics (<ol> + <li>) means screen
 * readers announce "list, 3 items" — a timeline built from divs loses that.
 */
export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="section-pad bg-white">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="Experience"
            title="Bedside practice, one deliberate step at a time"
            lede="From graduate rotations through paediatric and teaching hospitals — the roles that shaped my practice."
          />
        </AnimatedSection>

        <div className="mt-12">
          <ol
            aria-label="Professional experience timeline"
            className="relative space-y-10 border-l-2 border-cream-300 pl-6 sm:pl-10"
          >
            {experiences.map((job) => (
              <li key={`${job.organization}-${job.period}`} className="relative">
                {/* Timeline dot */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-teal-700 bg-white sm:-left-[47px]"
                />

                <AnimatedSection animateChildren>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h3 className="font-display text-xl font-bold text-charcoal-900">{job.role}</h3>
                    <Badge tone="sage">{job.period}</Badge>
                  </div>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-teal-700">
                    {job.organization}
                  </p>
                  {job.location ? (
                    <p className="mt-0.5 text-xs text-charcoal-500">{job.location}</p>
                  ) : null}

                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-charcoal-600 sm:text-base">
                    {job.description}
                  </p>

                  <div className="mt-5 grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500">
                        Responsibilities
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {job.responsibilities.map((item) => (
                          <SkillPill key={item}>{item}</SkillPill>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500">
                        Achievements
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {job.achievements.map((item) => (
                          <SkillPill key={item}>{item}</SkillPill>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
