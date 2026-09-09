import {
  Activity,
  ClipboardCheck,
  HeartHandshake,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react';

import type { Expertise } from '@/types';

/** Areas of clinical expertise rendered by the reusable ExpertiseCard. */
export const expertiseAreas: Expertise[] = [
  {
    icon: Activity,
    title: 'Critical Care',
    description:
      'High-acuity monitoring and intervention in intensive care settings, with a calm, methodical approach to patient deterioration.',
  },
  {
    icon: Stethoscope,
    title: 'Emergency Nursing',
    description:
      'Rapid triage, assessment and stabilisation in fast-paced emergency departments where every minute matters.',
  },
  {
    icon: HeartHandshake,
    title: 'Patient Advocacy',
    description:
      'Ensuring patients and families understand their care, their options and their rights at every step.',
  },
  {
    icon: ClipboardCheck,
    title: 'Clinical Assessment',
    description:
      'Thorough, systematic patient assessment using evidence-based frameworks to catch early warning signs.',
  },
  {
    icon: ShieldCheck,
    title: 'Medication Safety',
    description:
      ' Vigilant medication management, double-checking protocols and error-prevention practices.',
  },
  {
    icon: Users,
    title: 'Care Coordination',
    description:
      'Working across multidisciplinary teams to keep care plans coherent from admission through discharge.',
  },
];
