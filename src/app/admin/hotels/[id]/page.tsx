import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { AdminShell } from '../../_components/AdminShell';
import { HotelForm } from '../_form';
import { deleteHotel, updateHotel } from '../actions';

export const dynamic = 'force-dynamic';

export default async function EditHotelPage({ params }: PageProps<'/admin/hotels/[id]'>) {
  const { id } = await params;
  const { data } = await supabase.from('istantrip_hotels').select('*').eq('id', id).maybeSingle();
  if (!data) notFound();

  const update = updateHotel.bind(null, id);
  const remove = deleteHotel.bind(null, id);

  return (
    <AdminShell active="hotels">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-cream">Edit hotel</h1>
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
        <HotelForm action={update} hotel={data} submitLabel="Save changes" />
      </div>
    </AdminShell>
  );
}
