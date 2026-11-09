import { useState, type FormEvent } from 'react';
import { createInquiry } from '../../api/inquiries';
import { isValidEmail } from '../../utils/validation';
import Alert from '../ui/Alert';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface InquiryFormProps {
  propertyId: string;
  propertyName: string;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

function validateForm(state: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!state.name.trim()) errors.name = 'Full name is required';
  if (!state.email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(state.email)) {
    errors.email = 'Enter a valid email address';
  }
  if (!state.phone.trim() || state.phone.trim().length < 7) {
    errors.phone = 'Enter a valid phone number';
  }
  if (!state.message.trim()) errors.message = 'Message is required';

  return errors;
}

export default function InquiryForm({ propertyId, propertyName }: InquiryFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess('');
    setError('');

    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      setSubmitting(true);
      await createInquiry({
        property: propertyId,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
      });
      setForm(initialState);
      setErrors({});
      setSuccess(`Thank you. Our team will contact you about ${propertyName}.`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to submit inquiry';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-gold">Private inquiry</p>
        <h2 className="mt-2 font-display text-3xl text-charcoal">Request a viewing</h2>
        <p className="mt-2 text-sm text-charcoal-soft">
          Share your details and our advisors will follow up personally.
        </p>
      </div>

      {success ? <Alert tone="success">{success}</Alert> : null}
      {error ? <Alert tone="error">{error}</Alert> : null}

      <Input
        id="inquiry-name"
        label="Full name"
        value={form.name}
        onChange={(event) => updateField('name', event.target.value)}
        error={errors.name}
        autoComplete="name"
        required
      />
      <Input
        id="inquiry-email"
        label="Email"
        type="email"
        value={form.email}
        onChange={(event) => updateField('email', event.target.value)}
        error={errors.email}
        autoComplete="email"
        required
      />
      <Input
        id="inquiry-phone"
        label="Phone"
        type="tel"
        value={form.phone}
        onChange={(event) => updateField('phone', event.target.value)}
        error={errors.phone}
        autoComplete="tel"
        required
      />
      <Input
        id="inquiry-message"
        label="Message"
        as="textarea"
        rows={4}
        value={form.message}
        onChange={(event) => updateField('message', event.target.value)}
        error={errors.message}
        required
      />

      <Button type="submit" variant="gold" className="w-full" disabled={submitting}>
        {submitting ? 'Sending…' : 'Submit inquiry'}
      </Button>
    </form>
  );
}
