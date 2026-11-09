import type { ReactNode } from 'react';

type AlertTone = 'success' | 'error' | 'info';

interface AlertProps {
  tone?: AlertTone;
  children: ReactNode;
  className?: string;
}

const toneClasses: Record<AlertTone, string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  error: 'border-red-200 bg-red-50 text-red-800',
  info: 'border-border bg-ivory-deep text-charcoal-soft',
};

export default function Alert({ tone = 'info', children, className = '' }: AlertProps) {
  return (
    <div
      role="status"
      className={`rounded-sm border px-4 py-3 text-sm ${toneClasses[tone]} ${className}`}
    >
      {children}
    </div>
  );
}
