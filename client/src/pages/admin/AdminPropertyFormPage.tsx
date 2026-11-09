import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PropertyForm from '../../components/properties/PropertyForm';
import Alert from '../../components/ui/Alert';
import Button from '../../components/ui/Button';
import ErrorState from '../../components/ui/ErrorState';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useCreateProperty } from '../../hooks/mutations/useCreateProperty';
import { useUpdateProperty } from '../../hooks/mutations/useUpdateProperty';
import { useProperty } from '../../hooks/queries/useProperty';
import type { PropertyFormValues } from '../../types';

export default function AdminPropertyFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [success, setSuccess] = useState('');

  const propertyQuery = useProperty(id, { enabled: isEdit });
  const createPropertyMutation = useCreateProperty();
  const updatePropertyMutation = useUpdateProperty();

  const property = propertyQuery.data?.data ?? null;
  const loading = isEdit && propertyQuery.isLoading;
  const error = propertyQuery.error?.message || '';

  async function handleSubmit(values: PropertyFormValues) {
    setSuccess('');

    if (isEdit && id) {
      await updatePropertyMutation.mutateAsync({ id, payload: values });
      setSuccess('Property updated successfully.');
      navigate('/admin/properties');
      return;
    }

    await createPropertyMutation.mutateAsync(values);
    setSuccess('Property created successfully.');
    navigate('/admin/properties');
  }

  if (loading) return <LoadingSpinner label="Loading property" />;

  if (isEdit && error) {
    return (
      <div className="space-y-4">
        <ErrorState message={error} onRetry={() => void propertyQuery.refetch()} />
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
