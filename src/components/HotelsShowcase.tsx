import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { listHotels, hotelDesc, type Hotel } from '@/lib/public-data';
import type { Dictionary, Locale } from '@/app/[lang]/dictionaries';

export async function HotelsShowcase({ dict, locale }: { dict: Dictionary; locale: string }) {
  const hotels = (await listHotels()).slice(0, 4);
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-14">
          <p className="text-[color:var(--gold-soft)] tracking-[0.3em] uppercase text-xs mb-4">Istantrip</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream">{dict.hotels.sectionTitle}</h2>
          <p className="mt-4 text-cream/70 max-w-xl mx-auto">{dict.hotels.sectionSubtitle}</p>
          <div className="divider-gold w-40 mx-auto mt-8" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {hotels.map((h) => (
            <HotelCard key={h.id} h={h} dict={dict} locale={locale} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href={`/${locale}/hotels`} className="btn-ghost px-6 py-3 rounded-full text-sm inline-flex items-center gap-2">
            {dict.hotels.listTitle} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HotelCard({ h, dict, locale }: { h: Hotel; dict: Dictionary; locale: string }) {
  const desc = hotelDesc(h, locale as Locale);
  return (
    <Link
      href={`/${locale}/hotels/${h.slug}`}
      className="card-glass rounded-2xl overflow-hidden group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {h.cover_url && (
          <Image
            src={h.cover_url}
            alt={h.name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a08]/90 via-transparent to-transparent" />
        {h.stars ? (
          <div className="absolute top-4 end-4 flex items-center gap-1 bg-[#0b0a08]/75 backdrop-blur px-2.5 py-1 rounded-full border border-white/10">
            {Array.from({ length: h.stars }).map((_, i) => (
              <Star key={i} size={11} className="fill-[color:var(--gold-soft)] text-[color:var(--gold-soft)]" />
            ))}
          </div>
        ) : null}
      </div>
      <div className="p-5">
        <div className="text-xs uppercase tracking-widest text-[color:var(--gold-soft)] mb-2">{h.district ?? '—'}</div>
        <h3 className="font-display text-xl text-cream">{h.name}</h3>
        <p className="mt-2 text-cream/70 text-sm line-clamp-3">{desc}</p>
        <div className="mt-5 flex items-center justify-end">
          <span className="text-[color:var(--gold-soft)] text-xs inline-flex items-center gap-1">
            {dict.hotels.viewDetails} <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}
