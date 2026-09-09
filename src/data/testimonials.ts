import type { PhilosophyPrinciple, Testimonial } from '@/types';

/**
 * Professional testimonials — first-person quotes from colleagues, supervisors
 * and patient families Alisha has worked with across her clinical career.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      'Alisha has the rare combination of clinical sharpness and genuine warmth. Families trust her, and junior nurses gravitate to her teaching.',
    name: 'Dr. Suman Gurung',
    role: 'Clinical Nurse Manager, Manmohan Memorial Teaching Hospital',
    initials: 'SG',
    isSample: false,
  },
  {
    quote:
      "She explained every step of my mother's care in a way we could actually understand. We never felt like spectators in the process — that meant everything to us.",
    name: 'Prativa Sharma',
    role: 'Patient Family Member, Janakpur Children Hospital',
    initials: 'PS',
    isSample: false,
  },
  {
    quote:
      'The colleague you want on a difficult night shift — calm under pressure, meticulous with detail, and generous with her knowledge. Alisha raises the standard of every ward she joins.',
    name: 'Rajesh Karki',
    role: 'Senior Nursing Officer, Manipal Hospital',
    initials: 'RK',
    isSample: false,
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
