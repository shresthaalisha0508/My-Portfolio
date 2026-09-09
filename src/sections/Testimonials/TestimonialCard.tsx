import { Card } from '@/components/ui/Card';
import { initialsFromName } from '@/lib/utils';
import type { Testimonial } from '@/types';

/**
 * TestimonialCard — one quote with attribution.
 *
 * Decorative open-quote mark adds visual richness; `isSample` is still
 * supported in the type but current testimonials are real endorsements.
 */
interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const initials = testimonial.initials || initialsFromName(testimonial.name);

  return (
    <Card className="flex h-full min-w-0 flex-col p-6">
      <blockquote className="flex-1">
        <span
          aria-hidden="true"
          className="mb-3 block font-display text-4xl leading-none text-teal-200"
        >
          &ldquo;
        </span>
        <p className="text-sm leading-relaxed text-charcoal-700">{testimonial.quote}</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-charcoal-900/8 pt-4">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-100 font-display text-sm font-bold text-sage-800"
        >
          {initials}
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-semibold text-charcoal-900">
            {testimonial.name}
          </span>
          <span className="truncate text-xs text-charcoal-500">{testimonial.role}</span>
        </span>
      </figcaption>
    </Card>
  );
}
