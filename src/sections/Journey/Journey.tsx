import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { journey } from '@/data';

/**
 * Journey — career milestones.
 *
 * Responsive layout strategy: a horizontally scrollable, scroll-snap strip on
 * small screens (thumb-friendly, no squashing), switching to a vertical
 * timeline from `md` up. Pure CSS via Tailwind — no JS media-query branching
 * needed, and it stays accessible as a plain ordered list either way.
 */
export function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-heading" className="section-pad">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="Journey"
            title="The road from graduate nurse to senior critical care"
            lede="Milestones that mark the professional journey so far."
          />
        </AnimatedSection>
      </Container>

      {/* Full-bleed strip on mobile for maximum swipe room */}
      <AnimatedSection animateChildren className="mt-12">
        <ol
          className="
            no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2
            sm:px-6 md:mx-auto md:max-w-6xl md:flex-col md:overflow-visible md:px-0 md:pb-0
          "
        >
          {journey.map((milestone, index) => (
            <li
              key={milestone.year}
              className="
                w-[16rem] shrink-0 snap-start rounded-2xl border border-charcoal-900/8 bg-white p-5 shadow-card
                md:flex md:w-auto md:items-baseline md:gap-6 md:border-0 md:bg-transparent md:p-0 md:shadow-none
              "
            >
              <div className="flex items-baseline gap-3 md:w-24 md:shrink-0 md:flex-col md:gap-0">
                <span className="font-display text-2xl font-bold text-teal-700">
                  {milestone.year}
                </span>
                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-coral-400 md:hidden"
                />
              </div>
              <div className="mt-3 md:mt-0 md:border-l-2 md:border-cream-300 md:pb-8 md:pl-6 md:[&:not(:last-child)]:border-solid">
                <h3 className="font-display text-sm font-bold text-charcoal-900 sm:text-base">
                  {milestone.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-charcoal-600 sm:text-sm">
                  {milestone.description}
                </p>
              </div>
              <span className="sr-only">{`Milestone ${index + 1} of ${journey.length}`}</span>
            </li>
          ))}
        </ol>
      </AnimatedSection>
    </section>
  );
}
