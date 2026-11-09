import { useParams } from 'react-router-dom';

export default function AdminPropertyFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  return (
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-[0.22em] text-gold">
        {isEdit ? 'Edit' : 'Create'}
      </p>
      <h1 className="font-display text-4xl text-charcoal">
        {isEdit ? 'Edit property' : 'Add property'}
      </h1>
      <p className="text-charcoal-soft">
        Form fields and API submission will be implemented in the next phase.
      </p>
    </div>
  );
}
