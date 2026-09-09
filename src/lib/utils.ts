/**
 * Tiny class-name combiner.
 *
 * React (unlike Flutter) has no automatic style merging — joining conditional
 * class strings by hand gets messy fast. This filters out falsy values so you
 * can write `cn('base', isActive && 'active', className)`.
 *
 * (The popular full version is the `clsx` + `tailwind-merge` library combo;
 * kept dependency-free here because the portfolio doesn't need Tailwind
 * conflict resolution.)
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Extracts initials (max 2) from a name, e.g. "Alisha Shrestha" → "AS".
 * Used for avatar fallbacks.
 */
export function initialsFromName(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}
