import type { Experience } from '@/types';

/** Professional history rendered by the Experience timeline. */
export const experiences: Experience[] = [
  {
    role: 'Senior Registered Nurse',
    organization: 'Royal Melbourne Hospital',
    period: '2021 — Present',
    description:
      'Part of the intensive care unit’s senior nursing team, precepting junior staff and leading quality initiatives.',
    responsibilities: [
      'Coordinate nursing care for high-acuity ICU patients',
      'Precept and mentor graduate and junior nurses',
      'Lead monthly clinical skill workshops for the unit',
    ],
    achievements: [
      'Recognised with the unit’s Clinical Excellence Award (2023)',
      'Co-authored a ventilation weaning care bundle adopted hospital-wide',
    ],
  },
  {
    role: 'Registered Nurse',
    organization: 'St Vincent’s Hospital Melbourne',
    period: '2018 — 2021',
    description:
      'Rotated through the emergency department and critical care wards, building a strong foundation in acute patient management.',
    responsibilities: [
      'Triage and manage emergency presentations across all acuity levels',
      'Administer and monitor complex medication regimens',
      'Liaise with families and multidisciplinary teams on care plans',
    ],
    achievements: [
      'Completed postgraduate studies in critical care nursing',
      'Reduced documentation errors by redesigning the shift handover checklist',
    ],
  },
  {
    role: 'Graduate Registered Nurse',
    organization: 'Melbourne Health',
    period: '2016 — 2018',
    description:
      'Completed a structured graduate nurse program with rotations across medical and surgical wards.',
    responsibilities: [
      'Deliver daily patient care across medical and surgical rotations',
      'Document assessments, observations and care plan updates',
      'Participate in supervised skill development and simulation training',
    ],
    achievements: [
      'Rated “outstanding” in the graduate program’s final clinical review',
    ],
  },
];
