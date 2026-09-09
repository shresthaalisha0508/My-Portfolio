import { cn } from '@/lib/utils';

/**
 * Badge — small pill label used for eyebrows, trust chips and status markers.
 * `tone` picks a semantic color pairing that already meets contrast rules.
 */
type BadgeTone = 'teal' | 'sage' | 'coral' | 'neutral';

interface BadgeProps {
  tone?: BadgeTone;
  className?: string;
  children: React.ReactNode;
}

const tones: Record<BadgeTone, string> = {
  teal: 'bg-teal-50 text-teal-800 ring-teal-600/20',
  sage: 'bg-sage-100 text-sage-800 ring-sage-600/20',
  coral: 'bg-coral-50 text-coral-700 ring-coral-600/20',
  neutral: 'bg-cream-100 text-charcoal-700 ring-charcoal-900/10',
};

export function Badge({ tone = 'teal', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
