import type { Certification } from '@/types';

/** Degrees, licences and certifications rendered as credential cards. */
export const certifications: Certification[] = [
  {
    title: 'Registered Nurse',
    issuer: 'Nepal Nursing Council',
    year: '2023 — Present',
    kind: 'certification',
  },
  {
    title: 'MBA, Health Service Management',
    issuer: 'Kaplan Business School',
    year: 'Completed 2026',
    kind: 'degree',
  },
  {
    title: 'Bachelor of Science in Nursing',
    issuer: 'Koshys College of Nursing, RGUHS — Bangalore, India',
    year: '2016 — 2020',
    kind: 'degree',
  },
  {
    title: 'Higher Secondary (+2, Science — Biology)',
    issuer: 'Model Multiple College, Janakpur, Nepal',
    year: '2014 — 2016',
    kind: 'degree',
  },
  {
    title: 'School Leaving Certificate (SLC)',
    issuer: 'New Horizon Boarding School, Kathmandu, Nepal',
    year: '2014',
    kind: 'degree',
  },
];

/** Clinical training postings from the BSc Nursing program (2016–2020). */
export const clinicalPostings: Certification[] = [
  { title: 'Columbia Asia Hospital', issuer: 'Clinical posting', year: 'Bangalore', kind: 'certification' },
  { title: 'Koshys Hospital', issuer: 'Clinical posting', year: 'Bangalore', kind: 'certification' },
  { title: 'JMJ Hospital', issuer: 'Clinical posting', year: 'Clinical posting', kind: 'certification' },
  { title: 'East-Point Hospital', issuer: 'Clinical posting', year: 'Clinical posting', kind: 'certification' },
  { title: 'Cytecare Cancer Hospital', issuer: 'Clinical posting', year: 'Oncology', kind: 'certification' },
  { title: 'Payankulam Kerala Hospital', issuer: 'Clinical posting', year: 'Psychiatric posting', kind: 'certification' },
  { title: 'Little Flower Hospital', issuer: 'Clinical posting', year: 'Clinical posting', kind: 'certification' },
  { title: 'Zion Hospital', issuer: 'Clinical posting', year: 'Clinical posting', kind: 'certification' },
];
