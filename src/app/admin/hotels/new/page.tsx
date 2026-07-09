import { AdminShell } from '../../_components/AdminShell';
import { HotelForm } from '../_form';
import { createHotel } from '../actions';

export default function NewHotelPage() {
  return (
    <AdminShell active="hotels">
      <h1 className="font-display text-3xl text-cream mb-8">New hotel</h1>
      <div className="card-glass rounded-2xl p-8">
        <HotelForm action={createHotel} submitLabel="Create hotel" />
      </div>
    </AdminShell>
  );
}
