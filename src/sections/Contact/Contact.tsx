import { Mail, MapPin, Phone } from 'lucide-react';

import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { profile, socialLinks } from '@/data';

import { ContactForm } from './ContactForm';

/**
 * Contact — details column plus form.
 *
 * The email/phone/location entries map over a tiny local array: the data is
 * only used here, so it stays local (state/data lives at the lowest level
 * that needs it).
 */
export function Contact() {
  const details = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, '')}` },
    { icon: MapPin, label: 'Location', value: profile.location, href: undefined },
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-pad bg-white">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="Contact"
            title="Let's connect"
            lede="Whether it's a role, a rotation or a question about critical care nursing — my inbox is open."
            align="center"
          />
        </AnimatedSection>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Details */}
          {/* min-w-0: as a grid item, this wrapper otherwise has a
              min-width:auto floor equal to its widest unbreakable content
              (the letter-spaced labels), which blows past 280px tracks at
              very narrow widths */}
          <AnimatedSection animateChildren className="min-w-0 space-y-4">
            {details.map((detail) => {
              const content = (
                <>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    <Icon icon={detail.icon} />
                  </span>
                  {/* flex-1: size the column by available space, never by
                      content — keeps long emails from stretching the card */}
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500">
                      {detail.label}
                    </span>
                    <span className="truncate text-sm font-medium text-charcoal-900">
                      {detail.value}
                    </span>
                  </span>
                </>
              );

              return detail.href ? (
                <a
                  key={detail.label}
                  href={detail.href}
                  className="flex items-center gap-4 rounded-2xl border border-charcoal-900/8 bg-cream-50 p-4 transition hover:border-teal-600/30 hover:bg-teal-50/50"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={detail.label}
                  className="flex items-center gap-4 rounded-2xl border border-charcoal-900/8 bg-cream-50 p-4"
                >
                  {content}
                </div>
              );
            })}

            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-charcoal-900/8 bg-cream-50 p-4 transition hover:border-teal-600/30 hover:bg-teal-50/50"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <Icon icon={link.icon} />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500">
                    Social
                  </span>
                  <span className="truncate text-sm font-medium text-charcoal-900">
                    {link.label}
                  </span>
                </span>
              </a>
            ))}
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection>
            <div className="rounded-2xl border border-charcoal-900/8 bg-cream-50 p-6 shadow-card sm:p-8">
              <ContactForm />
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
