import { Card } from '@/components/ui/Card';
import { cn, initialsFromName } from '@/lib/utils';
import type { Testimonial } from '@/types';

/**
 * TestimonialCard — one quote with attribution.
 *
 * `isSample` renders an explicit "sample" badge so fabricated quotes can
 * never pass as verified endorsements. Ethical detail that matters on any
 * professional portfolio.
 */
interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const initials = testimonial.initials || initialsFromName(testimonial.name);

  return (
    <Card className="flex h-full flex-col p-6">
      <blockquote className="flex-1">
        <p className="text-sm leading-relaxed text-charcoal-700">“{testimonial.quote}”</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-charcoal-900/8 pt-4">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-100 font-display text-sm font-bold text-sage-800"
        >
          {initials}
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-semibold text-charcoal-900">
            {testimonial.name}
            {testimonial.isSample ? (
              <span
                className={cn(
                  'ml-2 rounded-full bg-cream-100 px-2 py-0.5 align-middle',
                  'text-[10px] font-medium uppercase tracking-wide text-charcoal-500 ring-1 ring-inset ring-charcoal-900/10',
                )}
              >
                Sample
              </span>
            ) : null}
          </span>
          <span className="truncate text-xs text-charcoal-500">{testimonial.role}</span>
        </span>
      </figcaption>
    </Card>
  );
}
