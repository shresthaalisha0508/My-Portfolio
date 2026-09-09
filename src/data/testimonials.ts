import type { PhilosophyPrinciple, Testimonial } from '@/types';

/**
 * SAMPLE testimonials — `isSample` flags each entry so the UI renders an
 * explicit "sample" badge. Replace or remove these before going live; never
 * present fabricated quotes as verified endorsements.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      'Alisha has the rare combination of clinical sharpness and genuine warmth. Families trust her, and junior nurses gravitate to her teaching.',
    name: 'Sample — Colleague',
    role: 'Clinical Nurse Manager',
    initials: 'SC',
    isSample: true,
  },
  {
    quote:
      'She explained every step of Mum’s care in a way we could actually understand. We never felt like spectators in the process.',
    name: 'Sample — Family Member',
    role: 'Patient Family Member',
    initials: 'SF',
    isSample: true,
  },
  {
    quote:
      'The colleague you want on a difficult night shift — calm under pressure, meticulous with detail, and generous with her knowledge.',
    name: 'Sample — Senior Nurse',
    role: 'Senior Nursing Colleague',
    initials: 'SS',
    isSample: true,
  },
];

/**
 * Clinical philosophy — numbered editorial items rendered in the dark
 * Philosophy section.
 */
export const philosophyPrinciples: PhilosophyPrinciple[] = [
  {
    number: '01',
    title: 'Patient Safety First',
    description: 'Safe medication practice and infection control in every single task.',
  },
  {
    number: '02',
    title: 'Thorough Assessment',
    description: 'Vital signs, labs and observations — watched carefully and acted on early.',
  },
  {
    number: '03',
    title: 'Clear Communication',
    description: 'Plain language with patients and families, precision with the care team.',
  },
  {
    number: '04',
    title: 'Calm in Emergencies',
    description: 'Urgent situations call for steady prioritisation, not panic.',
  },
  {
    number: '05',
    title: 'Team Collaboration',
    description: 'The best outcomes come from multidisciplinary teamwork.',
  },
  {
    number: '06',
    title: 'Continuous Learning',
    description: 'Healthcare moves — from BSc to MBA, the learning never stops.',
  },
];
