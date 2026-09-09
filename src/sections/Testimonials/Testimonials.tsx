import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { testimonials } from '@/data';

import { TestimonialCard } from './TestimonialCard';

/**
 * Testimonials — a quiet grid rather than a carousel: three quotes fit on
 * screen, no auto-rotation to make accessible, no timers. If quotes grow,
 * consider an accessible tabbed carousel — not before.
 *
 * The lede discloses that these are sample quotes (each card also carries a
 * "Sample" badge from `isSample` data).
 */
export function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="section-pad bg-white">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="Testimonials"
            title="Words from colleagues and families"
            lede="Sample testimonials shown for portfolio demonstration — not verified endorsements."
            align="center"
          />
        </AnimatedSection>

        <AnimatedSection animateChildren className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </AnimatedSection>
      </Container>
    </section>
  );
}
