import { notFound } from 'next/navigation';
import { getDictionary, hasLocale, type Locale } from '../dictionaries';
import { PageShell } from '@/components/PageShell';
import { PageHero } from '@/components/PageHero';
import { HotelCard } from '@/components/HotelsShowcase';
import { listHotels } from '@/lib/public-data';
import { stock } from '@/lib/media';

export default async function HotelsListPage({ params }: PageProps<'/[lang]/hotels'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const hotels = await listHotels();
  return (
    <PageShell dict={dict} locale={lang}>
      <PageHero
        image={stock.hero.galata}
        eyebrow="Istantrip"
        title={dict.hotels.listTitle}
        subtitle={dict.hotels.listSubtitle}
      />
      <section className="relative py-16 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hotels.map((h) => (
              <HotelCard key={h.id} h={h} dict={dict} locale={lang} />
            ))}
          </div>
          {hotels.length === 0 && <p className="text-center text-cream/60 py-16">—</p>}
        </div>
      </section>
    </PageShell>
  );
}
