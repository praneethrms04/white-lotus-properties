interface LoadingSpinnerProps {
  label?: string;
}

export default function LoadingSpinner({ label = 'Loading' }: LoadingSpinnerProps) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center gap-3 text-stone">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-gold" />
      <p className="text-sm tracking-wide">{label}</p>
    </div>
  );
}
