import { useState, type FormEvent } from 'react';
import type { Property, PropertyFormValues, PropertyStatus } from '../../types';
import { splitListInput } from '../../utils/format';
import { isValidUrl } from '../../utils/validation';
import Alert from '../ui/Alert';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface PropertyFormProps {
  initialProperty?: Property;
  submitLabel: string;
  onSubmit: (values: PropertyFormValues) => Promise<void>;
}

interface FormState {
  name: string;
  location: string;
  price: string;
  area: string;
  bedrooms: string;
  bathrooms: string;
  propertyType: string;
  shortDescription: string;
  description: string;
  imagesText: string;
  amenitiesText: string;
  status: PropertyStatus;
  featured: boolean;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

function toFormState(property?: Property): FormState {
  return {
    name: property?.name ?? '',
    location: property?.location ?? '',
    price: property ? String(property.price) : '',
    area: property ? String(property.area) : '',
    bedrooms: property ? String(property.bedrooms) : '',
    bathrooms: property ? String(property.bathrooms) : '0',
    propertyType: property?.propertyType ?? 'Apartment',
    shortDescription: property?.shortDescription ?? '',
    description: property?.description ?? '',
    imagesText: property?.images?.join('\n') ?? '',
    amenitiesText: property?.amenities?.join(', ') ?? '',
    status: property?.status ?? 'available',
    featured: property?.featured ?? false,
  };
}

function validateForm(state: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!state.name.trim()) errors.name = 'Property name is required';
  if (!state.location.trim()) errors.location = 'Location is required';
  if (!state.description.trim()) errors.description = 'Description is required';

  const price = Number(state.price);
  if (!state.price || Number.isNaN(price) || price <= 0) {
    errors.price = 'Enter a positive price';
  }

  const area = Number(state.area);
  if (!state.area || Number.isNaN(area) || area <= 0) {
    errors.area = 'Enter a positive area';
  }

  const bedrooms = Number(state.bedrooms);
  if (state.bedrooms === '' || Number.isNaN(bedrooms) || bedrooms < 0 || !Number.isInteger(bedrooms)) {
    errors.bedrooms = 'Enter a valid bedroom count';
  }

  const bathrooms = Number(state.bathrooms);
  if (
    state.bathrooms === '' ||
    Number.isNaN(bathrooms) ||
    bathrooms < 0 ||
    !Number.isInteger(bathrooms)
  ) {
    errors.bathrooms = 'Enter a valid bathroom count';
  }

  const images = splitListInput(state.imagesText);
  const invalidImage = images.find((url) => !isValidUrl(url));
  if (invalidImage) {
    errors.imagesText = 'Each image must be a valid http(s) URL';
  }

  return errors;
}

export default function PropertyForm({
  initialProperty,
  submitLabel,
  onSubmit,
}: PropertyFormProps) {
  const [form, setForm] = useState<FormState>(() => toFormState(initialProperty));
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError('');

    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const payload: PropertyFormValues = {
      name: form.name.trim(),
      location: form.location.trim(),
      price: Number(form.price),
      area: Number(form.area),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      propertyType: form.propertyType.trim() || 'Apartment',
      shortDescription: form.shortDescription.trim(),
      description: form.description.trim(),
      images: splitListInput(form.imagesText),
      amenities: splitListInput(form.amenitiesText),
      status: form.status,
      featured: form.featured,
    };

    try {
      setSubmitting(true);
      await onSubmit(payload);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unable to save property';
      setFormError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {formError ? <Alert tone="error">{formError}</Alert> : null}

      <div className="grid gap-5 md:grid-cols-2">
        <Input
          id="name"
          label="Property name"
          value={form.name}
          onChange={(event) => updateField('name', event.target.value)}
          error={errors.name}
          required
        />
        <Input
          id="location"
          label="Location"
          value={form.location}
          onChange={(event) => updateField('location', event.target.value)}
          error={errors.location}
          required
        />
        <Input
          id="price"
          label="Price (INR)"
          type="number"
          min={1}
          value={form.price}
          onChange={(event) => updateField('price', event.target.value)}
          error={errors.price}
          required
        />
        <Input
          id="area"
          label="Area (sq.ft)"
          type="number"
          min={1}
          value={form.area}
          onChange={(event) => updateField('area', event.target.value)}
          error={errors.area}
          required
        />
        <Input
          id="bedrooms"
          label="Bedrooms"
          type="number"
          min={0}
          value={form.bedrooms}
          onChange={(event) => updateField('bedrooms', event.target.value)}
          error={errors.bedrooms}
          required
        />
        <Input
          id="bathrooms"
          label="Bathrooms"
          type="number"
          min={0}
          value={form.bathrooms}
          onChange={(event) => updateField('bathrooms', event.target.value)}
          error={errors.bathrooms}
          required
        />
        <Input
          id="propertyType"
          label="Property type"
          value={form.propertyType}
          onChange={(event) => updateField('propertyType', event.target.value)}
        />
        <Input
          id="status"
          label="Status"
          as="select"
          value={form.status}
          onChange={(event) => updateField('status', event.target.value as PropertyStatus)}
        >
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="sold">Sold</option>
        </Input>
      </div>

      <Input
        id="shortDescription"
        label="Short description"
        value={form.shortDescription}
        onChange={(event) => updateField('shortDescription', event.target.value)}
      />

      <Input
        id="description"
        label="Full description"
        as="textarea"
        rows={5}
        value={form.description}
        onChange={(event) => updateField('description', event.target.value)}
        error={errors.description}
        required
      />

      <Input
        id="images"
        label="Image URLs (one per line)"
        as="textarea"
        rows={4}
        value={form.imagesText}
        onChange={(event) => updateField('imagesText', event.target.value)}
        error={errors.imagesText}
        placeholder="https://example.com/image-1.jpg"
      />

      <Input
        id="amenities"
        label="Amenities (comma separated)"
        value={form.amenitiesText}
        onChange={(event) => updateField('amenitiesText', event.target.value)}
        placeholder="Pool, Concierge, Private garden"
      />

      <label className="flex items-center gap-3 text-sm text-charcoal-soft" htmlFor="featured">
        <input
          id="featured"
          type="checkbox"
          checked={form.featured}
          onChange={(event) => updateField('featured', event.target.checked)}
          className="h-4 w-4 accent-gold"
        />
        Mark as featured residence
      </label>

      <div className="flex justify-end">
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Saving…' : submitLabel}
        </Button>
      </div>
    </form>
  );
}
