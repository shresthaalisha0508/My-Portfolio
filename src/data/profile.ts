import { Linkedin } from 'lucide-react';

import type { NavigationItem, Profile, SocialLink } from '@/types';

/**
 * Single source of truth for personal information.
 * Change the details here and every section updates — no JSX editing needed.
 * All content is fictional demo content for a portfolio demonstration.
 */
export const profile: Profile = {
  name: 'Sarah Williams',
  title: 'Registered Nurse',
  specialization: 'Critical Care & Emergency Nursing',
  location: 'Melbourne, Australia',
  experience: '8+ Years of Clinical Experience',
  positioning:
    'Compassionate, evidence-based nursing care with a focus on critical care, patient advocacy, and clinical excellence.',
  heroEyebrow: 'Registered Nurse • Critical Care',
  heroHeading: 'Compassionate care.',
  heroHighlight: 'Clinical excellence.',
  philosophy:
    'Great nursing blends clinical precision with genuine human warmth. I believe patients heal best when they feel safe, informed and genuinely heard — so I pair rigorous evidence-based practice with time at the bedside, clear communication with families, and tireless advocacy.',
  email: 'hello@sarahwilliamsnurse.com',
  phone: '+61 400 000 000',
  cvUrl: 'cv/Sarah-Williams-CV.pdf',
  portraitUrl: 'images/sarah-portrait.jpg',
  stats: [
    { value: '8+', label: 'Years Experience' },
    { value: '1,200+', label: 'Patients Supported' },
    { value: '24/7', label: 'Critical Care Experience' },
    { value: '100%', label: 'Patient Advocacy' },
  ],
  credentialHighlights: [
    'Critical Care Certified',
    'Patient-Centered Care',
    'Evidence-Based Practice',
  ],
};

/** Placeholder used when the real portrait image is missing. */
export const portraitFallback = {
  initials: 'SW',
  label: 'Portrait placeholder for Sarah Williams',
};

export const socialLinks: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/',
    icon: Linkedin,
  },
];

/** Demo statistics shown in the About section. */
export const stats = profile.stats;

/** Credential badges surfaced in the hero trust row. */
export const credentialHighlights = profile.credentialHighlights;

export const navigationItems: NavigationItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];
