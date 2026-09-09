import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { navigationItems, profile } from '@/data';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/utils';

/**
 * Navbar — scroll-aware site header with an accessible mobile menu.
 *
 * Behaviours demonstrated:
 *  - Custom hooks (useScrolled, useActiveSection) keep this component
 *    declarative: it reads two booleans/strings instead of managing listeners.
 *  - `aria-expanded` + `aria-controls` wire the hamburger to its panel.
 *  - Escape closes the menu; body scroll is locked while it is open.
 *  - The active section link is highlighted from an IntersectionObserver.
 */

const sectionIds = navigationItems.map((item) => item.href.replace('#', ''));

export function Navbar() {
  const scrolled = useScrolled(8);
  const activeId = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  // Must match the CSS breakpoint below: the hamburger shows below `lg`, so
  // "desktop layout" begins at 1024px, not 768px. Keeping these in sync means
  // the menu can never be logically "open" while its panel is display:none.
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Close the mobile menu as soon as we cross into the desktop layout,
  // so the state can never be "open" while the panel is display:none.
  useEffect(() => {
    if (isDesktop) setMenuOpen(false);
  }, [isDesktop]);

  // Lock background scroll while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  // Escape closes the menu and returns focus to the toggle button.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-out-quart',
        solid
          ? 'border-b border-charcoal-900/8 bg-cream-50/90 shadow-sm backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between sm:h-[4.5rem]">
        {/* Brand */}
        <a
          href="#top"
          className="flex min-w-0 items-center gap-3 rounded-full pr-2"
          aria-label={`${profile.name} — back to top`}
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-700 font-display text-sm font-bold text-white"
          >
            {profile.name
              .split(/\s+/)
              .slice(0, 2)
              .map((part) => part[0]?.toUpperCase() ?? '')
              .join('')}
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-display text-sm font-bold text-charcoal-900">
              {profile.name}
            </span>
            <span className="truncate text-xs text-charcoal-500">{profile.title}</span>
          </span>
        </a>

        {/* Desktop navigation — hidden below lg: six links + CV button need
            ~850px, which overflows tablets (768–1023px). Tablets get the
            hamburger, which is the standard pattern at that width. */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navigationItems.map((item) => {
            const isActive = activeId === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'rounded-full px-3 py-2 text-sm transition-colors duration-200',
                  isActive
                    ? 'bg-teal-50 font-semibold text-teal-800'
                    : 'text-charcoal-600 hover:bg-cream-200/70 hover:text-charcoal-900',
                )}
              >
                {item.label}
              </a>
            );
          })}
          <Button as="a" href={profile.cvUrl} className="ml-3" size="md">
            Download CV
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-charcoal-800 transition-colors hover:bg-cream-200/70 lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </Container>

      {/* Mobile panel — AnimatePresence animates mount/unmount */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-charcoal-900/8 bg-cream-50 lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'rounded-xl px-4 py-3 text-base font-medium transition-colors',
                    activeId === item.href.replace('#', '')
                      ? 'bg-teal-50 text-teal-800'
                      : 'text-charcoal-700 hover:bg-cream-200/70',
                  )}
                >
                  {item.label}
                </a>
              ))}
              <Button as="a" href={profile.cvUrl} size="lg" className="mt-3 w-full">
                Download CV
              </Button>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
