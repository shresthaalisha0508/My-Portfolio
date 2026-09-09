import type { Experience } from '@/types';

/**
 * Professional work experience rendered by the Experience timeline.
 * Clinical training postings are listed separately in certifications.ts.
 */
export const experiences: Experience[] = [
  {
    role: 'Registered Nurse',
    organization: 'Manmohan Memorial Teaching Hospital',
    period: 'Sep 2022 — Dec 2022',
    location: 'Swoyambhu-15, Kathmandu, Nepal',
    description:
      'Provided nursing care in a teaching hospital setting, working closely with consultants, junior doctors and nursing staff across the ward.',
    responsibilities: [
      'Administered medications and monitored patients for responses and side effects',
      'Conducted patient assessments and updated care plans',
      'Monitored vital signs and interpreted lab results',
    ],
    achievements: [
      'Maintained strict infection control standards on the ward',
    ],
  },
  {
    role: 'Registered Nurse',
    organization: 'Janakpur Children Hospital',
    period: 'Nov 2021 — Aug 2022',
    location: 'Janakpur, Nepal',
    description:
      'Cared for paediatric patients and supported families through treatment, with a strong focus on clear communication and reassurance.',
    responsibilities: [
      'Delivered day-to-day nursing care for children across the ward',
      'Implemented and documented care plans',
      'Communicated with families about treatment and progress',
    ],
    achievements: [
      'Handled emergency situations calmly and efficiently',
    ],
  },
  {
    role: 'Registered Nurse',
    organization: 'Manipal Hospital, Old Airport Road',
    period: 'Apr 2021 — Jul 2021',
    location: 'Bangalore, India',
    description:
      'Worked in a large multi-speciality hospital, building core skills in patient assessment, medication safety and multidisciplinary collaboration.',
    responsibilities: [
      'Performed medical procedures under hospital protocols',
      'Collaborated with multidisciplinary teams on patient care',
      'Ensured a safe environment for patients',
    ],
    achievements: [
      'Strengthened foundation in acute hospital nursing practice',
    ],
  },
];
