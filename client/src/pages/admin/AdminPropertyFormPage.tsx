import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createProperty, fetchPropertyById, updateProperty } from '../../api/properties';
import PropertyForm from '../../components/properties/PropertyForm';
import Alert from '../../components/ui/Alert';
import Button from '../../components/ui/Button';
import ErrorState from '../../components/ui/ErrorState';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import type { Property, PropertyFormValues } from '../../types';

export default function AdminPropertyFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isEdit || !id) return;

    async function loadProperty() {
      try {
        setLoading(true);
        setError('');
        const response = await fetchPropertyById(id as string);
        setProperty(response.data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to load property';
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    void loadProperty();
  }, [id, isEdit]);

  async function handleSubmit(values: PropertyFormValues) {
    setSuccess('');

    if (isEdit && id) {
      await updateProperty(id, values);
      setSuccess('Property updated successfully.');
      navigate('/admin/properties');
      return;
    }

    await createProperty(values);
    setSuccess('Property created successfully.');
    navigate('/admin/properties');
  }

  if (loading) return <LoadingSpinner label="Loading property" />;

  if (isEdit && error) {
    return (
      <div className="space-y-4">
        <ErrorState message={error} onRetry={() => window.location.reload()} />
        <Link to="/admin/properties">
          <Button variant="secondary">Back to properties</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold">
            {isEdit ? 'Edit' : 'Create'}
          </p>
          <h1 className="mt-2 font-display text-4xl text-charcoal">
            {isEdit ? 'Edit property' : 'Add property'}
          </h1>
          <p className="mt-2 text-charcoal-soft">
            {isEdit
              ? 'Update listing details and publish changes to the public showcase.'
              : 'Create a new luxury residence for the White Lotus collection.'}
          </p>
        </div>
        <Link to="/admin/properties">
          <Button variant="secondary">Back</Button>
        </Link>
      </div>

      {success ? <Alert tone="success">{success}</Alert> : null}

      <div className="border border-border bg-white/70 p-6">
        <PropertyForm
          key={property?._id || 'new'}
          initialProperty={property || undefined}
          submitLabel={isEdit ? 'Save changes' : 'Create property'}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
