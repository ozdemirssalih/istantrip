import Link from 'next/link';
import Image from 'next/image';
import { Pencil, Plus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { AdminShell } from '../_components/AdminShell';

export const dynamic = 'force-dynamic';

export default async function ToursAdminPage() {
  const { data } = await supabase
    .from('istantrip_tours')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  const rows = data ?? [];
  return (
    <AdminShell active="tours">
      <div className="flex items-end justify-between mb-8">
        <h1 className="font-display text-3xl text-cream">Tours</h1>
        <Link href="/admin/tours/new" className="btn-gold px-5 py-2.5 rounded-full text-sm inline-flex items-center gap-2">
          <Plus size={16} /> New tour
        </Link>
      </div>

      <div className="grid gap-4">
        {rows.length === 0 && <p className="text-cream/60">No tours yet.</p>}
        {rows.map((t) => (
          <Link
            key={t.id}
            href={`/admin/tours/${t.id}`}
            className="card-glass rounded-2xl p-4 flex items-center gap-5 group"
          >
            <div className="relative w-24 h-20 rounded-lg overflow-hidden bg-white/5 shrink-0">
              {t.cover_url && (
                <Image src={t.cover_url} alt="" fill sizes="96px" className="object-cover" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <span className="font-display text-xl text-cream truncate">{t.name_en}</span>
                {!t.published && (
                  <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-white/15 text-cream/60">
                    Draft
                  </span>
                )}
              </div>
              <div className="text-xs text-cream/60 mt-1">
                {t.category} · {t.duration_hours ? `${t.duration_hours}h · ` : ''}from {t.price_from} {t.currency}
              </div>
            </div>
            <Pencil size={16} className="text-cream/40 group-hover:text-[color:var(--gold-soft)]" />
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
