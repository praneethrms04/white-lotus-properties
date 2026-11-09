type StatusTone = 'available' | 'sold' | 'reserved' | 'new' | 'contacted' | 'closed' | string;

interface StatusBadgeProps {
  status: StatusTone;
}

const styles: Record<string, string> = {
  available: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  sold: 'bg-stone/10 text-stone border-border',
  reserved: 'bg-amber-50 text-amber-900 border-amber-200',
  new: 'bg-sky-50 text-sky-900 border-sky-200',
  contacted: 'bg-amber-50 text-amber-900 border-amber-200',
  closed: 'bg-stone/10 text-stone border-border',
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-sm border px-2.5 py-1 text-xs uppercase tracking-[0.14em] ${
        styles[status] || 'bg-ivory-deep text-charcoal-soft border-border'
      }`}
    >
      {status}
    </span>
  );
}
