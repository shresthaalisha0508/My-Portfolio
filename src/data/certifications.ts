import type { Certification } from '@/types';

/** Degrees and certifications rendered as credential cards. */
export const certifications: Certification[] = [
  {
    title: 'Bachelor of Nursing',
    issuer: 'University of Melbourne',
    year: '2016',
    kind: 'degree',
  },
  {
    title: 'Advanced Cardiac Life Support',
    issuer: 'Australian Resuscitation Council',
    year: '2023',
    kind: 'certification',
  },
  {
    title: 'Critical Care Nursing Certification',
    issuer: 'Australian College of Critical Care Nurses',
    year: '2021',
    kind: 'certification',
  },
  {
    title: 'Medication Safety & Clinical Practice',
    issuer: 'Monash Health Education',
    year: '2019',
    kind: 'certification',
  },
];
