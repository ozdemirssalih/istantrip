import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { getDictionary, hasLocale, type Locale } from '../../dictionaries';
import { PageShell } from '@/components/PageShell';
import { getTour, tourName, tourDesc, tourHighlights } from '@/lib/public-data';

export const revalidate = 60;

export default async function TourDetailPage({ params }: PageProps<'/[lang]/tours/[slug]'>) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const tour = await getTour(slug);
  if (!tour) notFound();

  const name = tourName(tour, lang as Locale);
  const desc = tourDesc(tour, lang as Locale);
  const hl = tourHighlights(tour, lang as Locale);

  return (
    <PageShell dict={dict} locale={lang}>
      <section className="relative h-[70vh] min-h-[480px] -mt-24 overflow-hidden">
        {tour.cover_url && (
          <Image src={tour.cover_url} alt={name} fill priority sizes="100vw" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0a08]/60 via-[#0b0a08]/40 to-[#0b0a08]" />
        <div className="pointer-events-none absolute inset-y-0 end-[-6%] flex items-center opacity-10 hidden md:flex">
          <Image src="/logo.png" alt="" width={520} height={520} />
        </div>
        <div className="relative z-10 h-full flex items-end pb-16">
          <div className="mx-auto max-w-7xl px-6 w-full">
            <Link href={`/${lang}/tours`} className="inline-flex items-center gap-2 text-sm text-cream/70 hover:text-cream mb-6">
              <ArrowLeft size={14} /> {dict.tours.backToList}
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="" width={40} height={40} className="drop-shadow-[0_0_18px_rgba(201,162,74,0.45)]" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--gold-soft)]">
                {tour.category === 'bosphorus'
                  ? dict.tours.categoryBosphorus
                  : tour.category === 'city'
                  ? dict.tours.categoryCity
                  : tour.category === 'transfer'
                  ? dict.tours.categoryTransfer
                  : dict.tours.categoryExperience}
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl text-cream max-w-3xl">{name}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-cream/80 text-sm">
              {tour.duration_hours && (
                <span className="inline-flex items-center gap-2">
                  <Clock size={14} className="text-[color:var(--gold-soft)]" />
                  {tour.duration_hours}{dict.tours.hoursShort}
                </span>
              )}
              {tour.price_from && (
                <span>
                  <span className="text-cream/50">{dict.tours.priceFrom}</span>{' '}
                  <span className="text-cream font-medium">
                    {tour.price_from} {tour.currency}
                  </span>
                </span>
              )}
            </div>
            <div className="divider-gold w-40 mt-8" />
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6">
        <div className="mx-auto max-w-6xl grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <p className="text-cream/85 leading-relaxed text-lg whitespace-pre-line">{desc}</p>
            {hl.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-2xl text-cream mb-6">{dict.tours.highlights}</h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {hl.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-cream/80">
                      <span className="mt-1 inline-flex w-6 h-6 rounded-full items-center justify-center bg-[color:var(--gold)]/20 text-[color:var(--gold-soft)]">
                        <Check size={12} />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {tour.gallery && tour.gallery.length > 0 && (
              <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-3">
                {tour.gallery.map((g, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                    <Image src={g} alt="" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <aside className="md:sticky md:top-28 h-fit card-glass rounded-2xl p-6">
            <div className="text-xs uppercase tracking-widest text-[color:var(--gold-soft)] mb-3">
              {dict.reservation.sectionTitle}
            </div>
            <div className="font-display text-3xl text-cream mb-2">
              {tour.price_from} <span className="text-lg text-cream/60">{tour.currency}</span>
            </div>
            <div className="text-xs text-cream/60 mb-6">{dict.tours.priceFrom}</div>
            <Link
              href={`/${lang}/reservation?service=${
                tour.category === 'bosphorus'
                  ? 'bosphorus'
                  : tour.category === 'transfer'
                  ? 'transfer'
                  : 'city'
              }`}
              className="btn-gold w-full py-3 rounded-full text-sm inline-flex items-center justify-center gap-2"
            >
              {dict.tours.book} <ArrowRight size={14} />
            </Link>
            <div className="mt-6 border-t border-white/5 pt-6 text-xs text-cream/60 space-y-2">
              <div>{dict.trust.guides}</div>
              <div>{dict.trust.languages}</div>
              <div>{dict.contact.hours}</div>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
