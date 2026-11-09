import Button from './Button';

export default function ErrorState({
  title = 'Something went wrong',
  message = 'We could not load this content.',
  onRetry,
}) {
  return (
    <div className="rounded-sm border border-red-200 bg-red-50/70 px-8 py-12 text-center">
      <h3 className="font-display text-3xl text-charcoal">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-stone">{message}</p>
      {onRetry ? (
        <div className="mt-6">
          <Button variant="secondary" onClick={onRetry}>
            Try again
          </Button>
        </div>
      ) : null}
    </div>
  );
}
