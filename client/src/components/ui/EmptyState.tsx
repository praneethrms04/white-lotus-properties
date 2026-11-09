import type { ReactNode } from 'react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({
  title = 'Nothing here yet',
  description = 'Check back soon for new listings.',
  action = null,
}: EmptyStateProps) {
  return (
    <div className="rounded-sm border border-dashed border-border bg-white/50 px-8 py-16 text-center">
      <h3 className="font-display text-3xl text-charcoal">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-stone">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
