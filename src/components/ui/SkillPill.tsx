import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * SkillPill — small check-marked list item used for responsibilities,
 * achievements and credential highlights.
 *
 * Extracted because three different sections render "check + text" rows; a
 * shared component guarantees identical spacing and semantics everywhere.
 */
interface SkillPillProps {
  children: React.ReactNode;
  className?: string;
}

export function SkillPill({ children, className }: SkillPillProps) {
  return (
    <li className={cn('flex items-start gap-2.5', className)}>
      <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" strokeWidth={2.25} aria-hidden="true" />
      <span className="text-sm leading-relaxed text-charcoal-600">{children}</span>
    </li>
  );
}
