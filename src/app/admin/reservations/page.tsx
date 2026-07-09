import { supabase } from '@/lib/supabase';
import { AdminShell } from '../_components/AdminShell';
import { ReservationRow } from './_row';

export const dynamic = 'force-dynamic';

const STATUSES = ['all', 'new', 'contacted', 'confirmed', 'done', 'cancelled'] as const;

export default async function ReservationsPage({
  searchParams,
}: PageProps<'/admin/reservations'>) {
  const sp = await searchParams;
  const statusRaw = typeof sp?.status === 'string' ? sp.status : 'all';
  const status = (STATUSES as readonly string[]).includes(statusRaw) ? statusRaw : 'all';

  let query = supabase
    .from('istantrip_reservations')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(300);
  if (status !== 'all') query = query.eq('status', status);

  const { data, error } = await query;
  const rows = data ?? [];

  return (
    <AdminShell active="reservations">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <h1 className="font-display text-3xl text-cream">Reservations</h1>
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map((s) => {
            const href = s === 'all' ? '/admin/reservations' : `/admin/reservations?status=${s}`;
            const isActive = s === status;
            return (
              <a
                key={s}
                href={href}
                className={`text-xs uppercase tracking-wider px-3 py-2 rounded-full border ${
                  isActive
                    ? 'border-[color:var(--gold)]/60 bg-[color:var(--gold)]/10 text-[color:var(--gold-soft)]'
                    : 'border-white/10 text-cream/70 hover:border-white/25'
                }`}
              >
                {s}
              </a>
            );
          })}
        </div>
      </div>

      {error && <p className="text-red-400 text-sm mb-6">Error: {error.message}</p>}

      <div className="card-glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.03] border-b border-white/5 text-left text-cream/70">
            <tr>
              <th className="p-4 font-medium">When</th>
              <th className="p-4 font-medium">Guest</th>
              <th className="p-4 font-medium">Service</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Guests</th>
              <th className="p-4 font-medium">Locale</th>
              <th className="p-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="p-10 text-center text-cream/50">
                  No reservations yet.
                </td>
              </tr>
            )}
            {rows.map((r) => (
              <ReservationRow key={r.id} row={r} />
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
