import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

type NativeInputProps = InputHTMLAttributes<HTMLInputElement>;
type NativeTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
type NativeSelectProps = SelectHTMLAttributes<HTMLSelectElement>;

type InputAs = 'input' | 'textarea' | 'select';

type InputProps = {
  label?: string;
  id: string;
  error?: string;
  className?: string;
  as?: InputAs;
  children?: ReactNode;
} & (
  | ({ as?: 'input' } & NativeInputProps)
  | ({ as: 'textarea' } & NativeTextareaProps)
  | ({ as: 'select' } & NativeSelectProps)
);

export default function Input({
  label,
  id,
  error,
  className = '',
  as = 'input',
  children,
  ...props
}: InputProps) {
  const fieldClassName = `w-full rounded-sm border bg-white/70 px-4 py-3 text-charcoal outline-none transition placeholder:text-stone/70 focus:border-gold ${
    error ? 'border-red-400' : 'border-border'
  }`;

  return (
    <label className={`block space-y-2 ${className}`} htmlFor={id}>
      {label ? (
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-stone">
          {label}
        </span>
      ) : null}

      {as === 'textarea' ? (
        <textarea id={id} className={fieldClassName} {...(props as NativeTextareaProps)} />
      ) : null}

      {as === 'select' ? (
        <select id={id} className={fieldClassName} {...(props as NativeSelectProps)}>
          {children}
        </select>
      ) : null}

      {as === 'input' ? (
        <input id={id} className={fieldClassName} {...(props as NativeInputProps)} />
      ) : null}

      {error ? <span className="text-sm text-red-600">{error}</span> : null}
    </label>
  );
}
