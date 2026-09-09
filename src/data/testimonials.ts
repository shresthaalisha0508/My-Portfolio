import type { PhilosophyPrinciple, Testimonial } from '@/types';

/**
 * FICTIONAL testimonials — `isSample` flags each entry so the UI renders an
 * explicit “sample” badge. Never present fabricated quotes as verified.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      'Sarah has the rare combination of clinical sharpness and genuine warmth. Families trust her, and junior nurses gravitate to her teaching.',
    name: 'Margaret Chen',
    role: 'Clinical Nurse Manager',
    initials: 'MC',
    isSample: true,
  },
  {
    quote:
      'She explained every step of Mum’s care in a way we could actually understand. We never felt like spectators in the process.',
    name: 'David Okafor',
    role: 'Patient Family Member',
    initials: 'DO',
    isSample: true,
  },
  {
    quote:
      'The colleague you want on a difficult night shift — calm under pressure, meticulous with detail, and generous with her knowledge.',
    name: 'Priya Nair',
    role: 'Senior Nursing Colleague',
    initials: 'PN',
    isSample: true,
  },
];

/**
 * Clinical philosophy — deliberately numbered editorial items so this section
 * reads differently from the card-based sections elsewhere on the page.
 */
export const philosophyPrinciples: PhilosophyPrinciple[] = [
  {
    number: '01',
    title: 'Compassion',
    description: 'Care begins with seeing the person, not the chart.',
  },
  {
    number: '02',
    title: 'Evidence-Based Practice',
    description: 'Decisions grounded in current research, never habit.',
  },
  {
    number: '03',
    title: 'Patient Advocacy',
    description: 'Every patient deserves a voice — and a champion.',
  },
  {
    number: '04',
    title: 'Clear Communication',
    description: 'Plain language with patients, precision with clinicians.',
  },
  {
    number: '05',
    title: 'Team Collaboration',
    description: 'The best outcomes are coordinated, not heroic.',
  },
  {
    number: '06',
    title: 'Continuous Learning',
    description: 'Medicine moves; so must clinical practice.',
  },
];
