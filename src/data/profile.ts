import { Linkedin } from 'lucide-react';

import type { NavigationItem, Profile, SocialLink } from '@/types';

/**
 * Single source of truth for personal information.
 * Change the details here and every section updates — no JSX editing needed.
 */
export const profile: Profile = {
  name: 'Alisha Shrestha',
  title: 'Registered Nurse',
  specialization: 'Hospital & Clinical Nursing',
  location: 'Edmondson Park, NSW 2174, Australia',
  experience: '4+ Years of Clinical Experience',
  positioning:
    'Dedicated and compassionate registered nurse offering excellent patient care, strong clinical knowledge and a commitment to exceptional healthcare services.',
  heroEyebrow: 'Registered Nurse • Nepal Nursing Council',
  heroHeading: 'Compassionate care.',
  heroHighlight: 'Clinical excellence.',
  philosophy:
    'Good nursing blends clinical precision with genuine human warmth. I focus on safe medication administration, thorough patient assessment and clear communication — with patients, families and the multidisciplinary team — and I stay calm and efficient when situations become urgent.',
  email: 'shresthaalisha201@gmail.com',
  phone: '+61 451 484 417',
  cvUrl: 'cv/Alisha-Shrestha-CV.pdf',
  portraitUrl: 'images/alisha-portrait.jpg',
  stats: [
    { value: '4+', label: 'Years Clinical Experience' },
    { value: '8', label: 'Hospital Training Postings' },
    { value: '3', label: 'Professional Hospital Roles' },
    { value: 'RN', label: 'Nepal Nursing Council' },
  ],
  credentialHighlights: [
    'Nepal Nursing Council Registered',
    'Infection Control Trained',
    'Emergency Response',
  ],
};

/** Placeholder used when the real portrait image is missing. */
export const portraitFallback = {
  initials: 'AS',
  label: 'Portrait placeholder for Alisha Shrestha',
};

export const socialLinks: SocialLink[] = [
  {
    label: 'LinkedIn',
    // TODO: replace with your LinkedIn profile URL
    href: 'https://www.linkedin.com/',
    icon: Linkedin,
  },
];

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
