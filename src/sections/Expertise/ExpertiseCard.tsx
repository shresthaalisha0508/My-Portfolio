import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import type { Expertise } from '@/types';

/**
 * ExpertiseCard — reusable card for one area of expertise.
 *
 * It knows nothing about *which* expertise it shows; it just renders whatever
 * `Expertise` data it receives. The parent maps over the data array and
 * produces one card per item — change the data and the UI follows, no JSX
 * edits required.
 *
 * Flutter equivalent: a stateless widget that takes an `Expertise` model.
 */
interface ExpertiseCardProps {
  expertise: Expertise;
}

export function ExpertiseCard({ expertise }: ExpertiseCardProps) {
  const { icon, title, description } = expertise;

  return (
    <Card hover className="group flex h-full min-w-0 flex-col p-6">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition duration-300 ease-out-quart group-hover:-rotate-3 group-hover:bg-teal-100 group-hover:text-teal-800">
        <Icon icon={icon} />
      </span>
      <h3 className="mt-4 font-display text-base font-bold text-charcoal-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{description}</p>
    </Card>
  );
}
