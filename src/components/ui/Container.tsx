import { cn } from '@/lib/utils';

/**
 * Container — page-width wrapper.
 *
 * Every section renders its content through this so gutters and max-width stay
 * identical site-wide. Changing one line here re-formats the whole page.
 */
interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8', className)}>{children}</div>
  );
}
