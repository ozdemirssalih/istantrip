import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { listTours, tourName, tourDesc, type Tour } from '@/lib/public-data';
import type { Dictionary, Locale } from '@/app/[lang]/dictionaries';

export async function ToursShowcase({ dict, locale }: { dict: Dictionary; locale: string }) {
  const tours = (await listTours()).slice(0, 3);
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-14">
          <p className="text-[color:var(--gold-soft)] tracking-[0.3em] uppercase text-xs mb-4">Istantrip</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream">{dict.tours.sectionTitle}</h2>
          <p className="mt-4 text-cream/70 max-w-xl mx-auto">{dict.tours.sectionSubtitle}</p>
          <div className="divider-gold w-40 mx-auto mt-8" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {tours.map((t) => (
            <TourCard key={t.id} t={t} dict={dict} locale={locale} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href={`/${locale}/tours`} className="btn-gold px-6 py-3 rounded-full text-sm inline-flex items-center gap-2">
            {dict.tours.listTitle} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function TourCard({ t, dict, locale }: { t: Tour; dict: Dictionary; locale: string }) {
  const name = tourName(t, locale as Locale);
  const desc = tourDesc(t, locale as Locale);
  return (
    <Link
      href={`/${locale}/tours/${t.slug}`}
      className="card-glass rounded-2xl overflow-hidden group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {t.cover_url && (
          <Image
            src={t.cover_url}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a08]/90 via-transparent to-transparent" />
        {t.duration_hours ? (
          <div className="absolute top-4 end-4 flex items-center gap-1.5 bg-[#0b0a08]/75 backdrop-blur px-2.5 py-1 rounded-full border border-white/10 text-xs text-cream/85">
            <Clock size={12} className="text-[color:var(--gold-soft)]" />
            {t.duration_hours}{dict.tours.hoursShort}
          </div>
        ) : null}
      </div>
      <div className="p-6">
        <div className="text-xs uppercase tracking-widest text-[color:var(--gold-soft)] mb-2">
          {t.category === 'bosphorus'
            ? dict.tours.categoryBosphorus
            : t.category === 'city'
            ? dict.tours.categoryCity
            : t.category === 'transfer'
            ? dict.tours.categoryTransfer
            : dict.tours.categoryExperience}
        </div>
        <h3 className="font-display text-xl text-cream">{name}</h3>
        <p className="mt-2 text-cream/70 text-sm line-clamp-3">{desc}</p>
        <div className="mt-5 flex items-end justify-between">
          <div className="text-xs text-cream/60">
            <span className="text-cream/50">{dict.tours.priceFrom}</span>{' '}
            <span className="text-cream font-medium">{t.price_from} {t.currency}</span>
          </div>
          <span className="text-[color:var(--gold-soft)] text-xs inline-flex items-center gap-1">
            {dict.services.learnMore} <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}
