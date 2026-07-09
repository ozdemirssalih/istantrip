import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { getDictionary, hasLocale, type Locale } from '../../dictionaries';
import { PageShell } from '@/components/PageShell';
import { getHotel, hotelDesc } from '@/lib/public-data';

export const revalidate = 60;

export default async function HotelDetailPage({ params }: PageProps<'/[lang]/hotels/[slug]'>) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const h = await getHotel(slug);
  if (!h) notFound();
  const desc = hotelDesc(h, lang as Locale);
  return (
    <PageShell dict={dict} locale={lang}>
      <section className="relative h-[70vh] min-h-[480px] -mt-24 overflow-hidden">
        {h.cover_url && (
          <Image src={h.cover_url} alt={h.name} fill priority sizes="100vw" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0a08]/60 via-[#0b0a08]/40 to-[#0b0a08]" />
        <div className="pointer-events-none absolute inset-y-0 end-[-6%] flex items-center opacity-10 hidden md:flex">
          <Image src="/logo.png" alt="" width={520} height={520} />
        </div>
        <div className="relative z-10 h-full flex items-end pb-16">
          <div className="mx-auto max-w-7xl px-6 w-full">
            <Link href={`/${lang}/hotels`} className="inline-flex items-center gap-2 text-sm text-cream/70 hover:text-cream mb-6">
              <ArrowLeft size={14} /> {dict.hotels.backToList}
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="" width={40} height={40} className="drop-shadow-[0_0_18px_rgba(201,162,74,0.45)]" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--gold-soft)]">
                {h.district}
              </span>
              {h.stars ? (
                <span className="inline-flex items-center gap-1 ms-2">
                  {Array.from({ length: h.stars }).map((_, i) => (
                    <Star key={i} size={12} className="fill-[color:var(--gold-soft)] text-[color:var(--gold-soft)]" />
                  ))}
                </span>
              ) : null}
            </div>
            <h1 className="font-display text-4xl md:text-6xl text-cream max-w-3xl">{h.name}</h1>
            <div className="divider-gold w-40 mt-8" />
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6">
        <div className="mx-auto max-w-6xl grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <p className="text-cream/85 leading-relaxed text-lg whitespace-pre-line">{desc}</p>
            {h.amenities && h.amenities.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-2xl text-cream mb-6">{dict.hotels.amenitiesTitle}</h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {h.amenities.map((a, i) => (
                    <li key={i} className="flex items-center gap-3 text-cream/80">
                      <span className="inline-flex w-6 h-6 rounded-full items-center justify-center bg-[color:var(--gold)]/20 text-[color:var(--gold-soft)]">
                        <Check size={12} />
                      </span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <aside className="md:sticky md:top-28 h-fit card-glass rounded-2xl p-6">
            <div className="text-xs uppercase tracking-widest text-[color:var(--gold-soft)] mb-3">
              {dict.reservation.sectionTitle}
            </div>
            <p className="text-cream/80 text-sm leading-relaxed mb-6">
              {dict.reservation.sectionSubtitle}
            </p>
            <Link
              href={`/${lang}/reservation?service=hotel`}
              className="btn-gold w-full py-3 rounded-full text-sm inline-flex items-center justify-center gap-2"
            >
              {dict.hotels.book} <ArrowRight size={14} />
            </Link>
            {h.booking_url && (
              <a
                href={h.booking_url}
                target="_blank"
                className="mt-3 btn-ghost w-full py-3 rounded-full text-sm inline-flex items-center justify-center gap-2"
              >
                {dict.hotels.viewDetails}
              </a>
            )}
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
