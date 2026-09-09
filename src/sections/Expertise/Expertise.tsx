import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { expertiseAreas } from '@/data';

import { ExpertiseCard } from './ExpertiseCard';

/**
 * Expertise — the clearest example of data-driven rendering in the project.
 *
 * `expertiseAreas` (src/data/expertise.ts) is a typed array; the section maps
 * it to <ExpertiseCard> elements. Adding a seventh expertise area is a data
 * edit, not a component edit. `key={expertise.title}` lets React match items
 * across re-renders so state and DOM are reused efficiently.
 */
export function Expertise() {
  return (
    <section id="expertise" aria-labelledby="expertise-heading" className="section-pad">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="Expertise"
            title="Clinical expertise built around people"
            lede="Specialised skills developed across eight years of critical care and emergency nursing."
          />
        </AnimatedSection>

        <AnimatedSection animateChildren className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {expertiseAreas.map((area) => (
            <ExpertiseCard key={area.title} expertise={area} />
          ))}
        </AnimatedSection>
      </Container>
    </section>
  );
}
