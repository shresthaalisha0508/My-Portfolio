import {
  ClipboardCheck,
  Pill,
  ShieldCheck,
  Siren,
  Stethoscope,
  Users,
} from 'lucide-react';

import type { Expertise } from '@/types';

/** Areas of clinical expertise rendered by the reusable ExpertiseCard. */
export const expertiseAreas: Expertise[] = [
  {
    icon: Pill,
    title: 'Medication Administration',
    description:
      'Proficient, safety-focused administration of medications with careful monitoring for effects and interactions.',
  },
  {
    icon: Stethoscope,
    title: 'Patient Assessment',
    description:
      'Systematic clinical assessment and observation — monitoring vital signs and interpreting lab results to track patient progress.',
  },
  {
    icon: ClipboardCheck,
    title: 'Care Plan Implementation',
    description:
      'Translating care plans into consistent, well-documented day-to-day nursing practice.',
  },
  {
    icon: ShieldCheck,
    title: 'Infection Control',
    description:
      'Strong working knowledge of infection control protocols, keeping patients, families and colleagues safe.',
  },
  {
    icon: Siren,
    title: 'Emergency Response',
    description:
      'Calm and efficient in emergencies — prioritising, escalating and acting when every minute counts.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description:
      'Clear communication and interpersonal skills across patients, families and multidisciplinary healthcare teams.',
  },
];
