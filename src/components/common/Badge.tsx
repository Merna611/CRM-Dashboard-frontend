interface BadgeProps {
  label: string;
  variant?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray';
}

const variants: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-emerald-100 text-emerald-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  red: 'bg-red-100 text-red-700',
  purple: 'bg-purple-100 text-purple-700',
  gray: 'bg-gray-100 text-gray-600',
};

export function Badge({ label, variant = 'gray' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {label}
    </span>
  );
}

export const statusVariant: Record<string, BadgeProps['variant']> = {
  LEAD: 'blue',
  PROSPECT: 'purple',
  CUSTOMER: 'green',
  CHURNED: 'red',
};

export const stageVariant: Record<string, BadgeProps['variant']> = {
  LEAD: 'gray',
  QUALIFIED: 'blue',
  PROPOSAL: 'purple',
  NEGOTIATION: 'yellow',
  CLOSED_WON: 'green',
  CLOSED_LOST: 'red',
};
