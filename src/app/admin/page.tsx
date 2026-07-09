import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { AdminShell } from './_components/AdminShell';

export const dynamic = 'force-dynamic';

async function getStats() {
  const [resNew, resTotal, hotelTotal] = await Promise.all([
    supabase.from('istantrip_reservations').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('istantrip_reservations').select('*', { count: 'exact', head: true }),
    supabase.from('istantrip_hotels').select('*', { count: 'exact', head: true }),
  ]);
  return {
    newReservations: resNew.count ?? 0,
    totalReservations: resTotal.count ?? 0,
    hotels: hotelTotal.count ?? 0,
  };
}

export default async function AdminHome() {
  const stats = await getStats();
  return (
    <AdminShell active="home">
      <h1 className="font-display text-3xl text-cream mb-8">Dashboard</h1>
      <div className="grid gap-5 md:grid-cols-3">
        {[
          { label: 'New reservations', value: stats.newReservations, href: '/admin/reservations?status=new' },
          { label: 'Total reservations', value: stats.totalReservations, href: '/admin/reservations' },
          { label: 'Hotels', value: stats.hotels, href: '/admin/hotels' },
        ].map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="card-glass rounded-2xl p-6 block hover:border-[color:var(--gold)]/50 transition"
          >
            <div className="text-xs uppercase tracking-widest text-cream/60">{s.label}</div>
            <div className="mt-3 font-display text-4xl gold-gradient">{s.value}</div>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
