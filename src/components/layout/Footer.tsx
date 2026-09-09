import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { navigationItems, profile, socialLinks } from '@/data';

/**
 * Footer — the closing frame: deep teal surface bookending the dark
 * Philosophy band, quiet brand mark, generous touch targets.
 */
export function Footer() {
  const year = new Date().getFullYear();

  const initials = profile.name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <footer className="bg-teal-900 text-teal-50">
      <Container className="py-14">
        <div className="flex flex-col gap-10 sm:grid sm:grid-cols-2 sm:gap-8 md:flex md:flex-row md:items-start md:justify-between">
          {/* Identity */}
          <div className="min-w-0 sm:col-span-2 md:max-w-sm md:col-span-auto">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-display text-sm font-bold text-white ring-1 ring-inset ring-white/20"
              >
                {initials}
              </span>
              <div className="flex min-w-0 flex-col">
                <p className="truncate font-display text-lg font-bold text-white">{profile.name}</p>
                <p className="truncate text-sm text-teal-200/80">
                  {profile.title} — {profile.specialization}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-teal-100/70">
              Open to nursing opportunities across Australia — hospital, aged care and community
              settings.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300/90">
              Navigation
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-1">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="link-underline inline-flex min-h-[44px] items-center text-sm text-teal-100/85 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300/90">
              Connect
            </p>
            <ul className="mt-4 space-y-1">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="link-underline inline-flex min-h-[44px] max-w-full items-center truncate text-sm text-teal-100/85 transition-colors hover:text-white"
                >
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                  className="link-underline inline-flex min-h-[44px] items-center text-sm text-teal-100/85 transition-colors hover:text-white"
                >
                  {profile.phone}
                </a>
              </li>
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 text-sm text-teal-100/85 transition-colors hover:text-white"
                  >
                    <Icon icon={link.icon} className="h-4 w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="max-w-3xl text-xs leading-relaxed text-teal-200/60">
            © {year} {profile.name}. All rights reserved. This website does not provide medical
            advice.
          </p>
        </div>
      </Container>
    </footer>
  );
}
