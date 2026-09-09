import { cn } from '@/lib/utils';

/**
 * SectionHeading — consistent eyebrow + title + lede pattern for all sections.
 *
 * Usage:
 *   <SectionHeading eyebrow="Expertise" title="Clinical expertise built around people" />
 *
 * The `id` should be placed on the wrapping <section> in each section
 * component (not here) so nav links and the scroll observer can find it.
 */
interface SectionHeadingProps {
  /** Small uppercase label shown above the title. */
  eyebrow: string;
  /** Section title. Rendered as an h2 (each section has exactly one). */
  title: string;
  /** Optional supporting paragraph below the title. */
  lede?: string;
  /** 'center' for symmetric sections (Testimonials, Contact), 'left' otherwise. */
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={cn('max-w-2xl', centered && 'mx-auto text-center', className)}>
      <p
        className={cn(
          'text-xs font-semibold uppercase tracking-[0.2em] text-teal-700',
          centered && 'mx-auto',
        )}
      >
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-charcoal-900 sm:text-4xl">
        {title}
      </h2>
      {lede ? (
        <p className={cn('mt-4 text-base leading-relaxed text-charcoal-600', centered && 'mx-auto')}>
          {lede}
        </p>
      ) : null}
    </div>
  );
}
