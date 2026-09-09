import { cn } from '@/lib/utils';

/**
 * Card — surface primitive for every "card" on the site.
 *
 * Provides the white surface, rounded corners, hairline border and soft
 * shadow, plus a `hover` mode that lifts the card slightly. Section-specific
 * flourishes belong in the section components, not here.
 */
interface CardProps {
  className?: string;
  /** Adds the lift-on-hover interaction. */
  hover?: boolean;
  children: React.ReactNode;
}

export function Card({ className, hover = false, children }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-charcoal-900/8 bg-white shadow-card',
        hover &&
          'transition duration-300 ease-out-quart hover:-translate-y-1 hover:shadow-card-hover',
        className,
      )}
    >
      {children}
    </div>
  );
}
