import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { AdminShell } from '../../_components/AdminShell';
import { TourForm } from '../_form';
import { deleteTour, updateTour } from '../actions';

export const dynamic = 'force-dynamic';

export default async function EditTourPage({ params }: PageProps<'/admin/tours/[id]'>) {
  const { id } = await params;
  const { data } = await supabase.from('istantrip_tours').select('*').eq('id', id).maybeSingle();
  if (!data) notFound();
  const update = updateTour.bind(null, id);
  const remove = deleteTour.bind(null, id);
  return (
    <AdminShell active="tours">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-cream">Edit tour</h1>
        <form action={remove}>
          <button
            type="submit"
            className="text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-red-500/40 text-red-300 hover:bg-red-500/10"
          >
            Delete
          </button>
        </form>
      </div>
      <div className="card-glass rounded-2xl p-8">
        <TourForm action={update} tour={data} submitLabel="Save changes" />
      </div>
    </AdminShell>
  );
}
