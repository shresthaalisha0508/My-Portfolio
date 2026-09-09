import type { LucideIcon } from 'lucide-react';

/**
 * Central type definitions
 * ---------------------------------------------------------------------------
 * Every content shape used by the data layer lives here. Sections consume
 * these types through their props/data imports, so a renamed field in data
 * (e.g. `period` → `dates`) breaks the build instead of silently rendering
 * empty UI.
 *
 * Icons are typed as LucideIcon — the component receives the icon itself (not
 * a string name), so there is no lookup table to maintain and no `any`.
 */

export interface Profile {
  name: string;
  title: string;
  specialization: string;
  location: string;
  experience: string;
  positioning: string;
  heroEyebrow: string;
  heroHeading: string;
  heroHighlight: string;
  philosophy: string;
  email: string;
  phone: string;
  cvUrl: string;
  /** Base URL for the portrait; falls back to an initial monogram if missing. */
  portraitUrl: string;
  stats: ProfileStat[];
  credentialHighlights: string[];
}

export interface ProfileStat {
  value: string;
  label: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface Expertise {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Experience {
  role: string;
  organization: string;
  period: string;
  /** Optional city/country line, e.g. "Bangalore, India". */
  location?: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  kind: 'degree' | 'certification';
}

export interface PhilosophyPrinciple {
  number: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  /** Reserved for backwards compatibility — current testimonials are real. */
  isSample?: boolean;
}

export interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
}
