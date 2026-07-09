import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { AdminShell } from '../_components/AdminShell';
import { Pencil, Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HotelsAdminPage() {
  const { data } = await supabase
    .from('istantrip_hotels')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  const rows = data ?? [];

  return (
    <AdminShell active="hotels">
      <div className="flex items-end justify-between mb-8">
        <h1 className="font-display text-3xl text-cream">Hotels</h1>
        <Link href="/admin/hotels/new" className="btn-gold px-5 py-2.5 rounded-full text-sm inline-flex items-center gap-2">
          <Plus size={16} /> New hotel
        </Link>
      </div>

      <div className="grid gap-4">
        {rows.length === 0 && <p className="text-cream/60">No hotels yet.</p>}
        {rows.map((h) => (
          <Link
            key={h.id}
            href={`/admin/hotels/${h.id}`}
            className="card-glass rounded-2xl p-4 flex items-center gap-5 group"
          >
            <div className="relative w-24 h-20 rounded-lg overflow-hidden bg-white/5 shrink-0">
              {h.cover_url && (
                <Image
                  src={h.cover_url}
                  alt={h.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <span className="font-display text-xl text-cream truncate">{h.name}</span>
                {!h.published && (
                  <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-white/15 text-cream/60">
                    Draft
                  </span>
                )}
              </div>
              <div className="text-xs text-cream/60 mt-1">
                {h.district} · {h.stars ? `${'★'.repeat(h.stars)}` : ''} · from {h.price_from} {h.currency}
              </div>
            </div>
            <Pencil size={16} className="text-cream/40 group-hover:text-[color:var(--gold-soft)]" />
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
