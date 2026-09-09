import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Icon — thin wrapper over Lucide icons.
 *
 * Centralising the wrapper means every icon on the site gets consistent
 * sizing defaults, `aria-hidden` by default (icons are decorative unless
 * stated otherwise), and uniform stroke width.
 */
interface IconProps {
  icon: LucideIcon;
  /** Tailwind size classes, e.g. "h-5 w-5". Defaults to 20px. */
  className?: string;
  /** Set when the icon is the only content of a control (e.g. icon button). */
  label?: string;
}

export function Icon({ icon: IconComponent, className, label }: IconProps) {
  return (
    <IconComponent
      className={cn('h-5 w-5', className)}
      strokeWidth={1.75}
      aria-hidden={label ? undefined : true}
      aria-label={label}
    />
  );
}
