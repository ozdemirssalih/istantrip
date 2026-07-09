import { AdminShell } from '../../_components/AdminShell';
import { TourForm } from '../_form';
import { createTour } from '../actions';

export default function NewTourPage() {
  return (
    <AdminShell active="tours">
      <h1 className="font-display text-3xl text-cream mb-8">New tour</h1>
      <div className="card-glass rounded-2xl p-8">
        <TourForm action={createTour} submitLabel="Create tour" />
      </div>
    </AdminShell>
  );
}
