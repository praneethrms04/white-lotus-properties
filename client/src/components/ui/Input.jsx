export default function Input({
  label,
  id,
  error,
  className = '',
  as = 'input',
  ...props
}) {
  const Field = as;

  return (
    <label className={`block space-y-2 ${className}`} htmlFor={id}>
      {label ? (
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-stone">
          {label}
        </span>
      ) : null}
      <Field
        id={id}
        className={`w-full rounded-sm border bg-white/70 px-4 py-3 text-charcoal outline-none transition placeholder:text-stone/70 focus:border-gold ${
          error ? 'border-red-400' : 'border-border'
        }`}
        {...props}
      />
      {error ? <span className="text-sm text-red-600">{error}</span> : null}
    </label>
  );
}
