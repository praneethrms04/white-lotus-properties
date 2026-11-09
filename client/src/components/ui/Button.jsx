const variants = {
  primary:
    'bg-charcoal text-ivory hover:bg-charcoal-soft focus-visible:outline-gold',
  secondary:
    'border border-charcoal/20 bg-transparent text-charcoal hover:border-gold hover:text-gold',
  gold: 'bg-gold text-ivory hover:bg-gold-soft focus-visible:outline-charcoal',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-sm font-medium tracking-wide transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
