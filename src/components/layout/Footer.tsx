import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { navigationItems, profile, socialLinks } from '@/data';

/**
 * Footer — closing frame for the site: identity, navigation, contact and the
 * legally-sensible disclaimer that this is a demo portfolio, not medical
 * advice.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal-900/8 bg-white">
      <Container className="py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Identity */}
          <div className="max-w-sm">
            <p className="font-display text-lg font-bold text-charcoal-900">{profile.name}</p>
            <p className="mt-1 text-sm text-charcoal-500">
              {profile.title} — {profile.specialization}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-charcoal-600">
              {profile.location} · {profile.experience}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal-500">
              Navigation
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="link-underline text-sm text-charcoal-600 hover:text-teal-800"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal-500">
              Connect
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="link-underline text-sm text-charcoal-600 hover:text-teal-800"
                >
                  {profile.email}
                </a>
              </li>
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-charcoal-600 hover:text-teal-800"
                  >
                    <Icon icon={link.icon} className="h-4 w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-charcoal-900/8 pt-6">
          <p className="text-xs leading-relaxed text-charcoal-500">
            © {year} {profile.name}. All rights reserved. This portfolio is a demonstration project
            and does not provide medical advice. All testimonials and statistics are illustrative
            sample content.
          </p>
        </div>
      </Container>
    </footer>
  );
}
