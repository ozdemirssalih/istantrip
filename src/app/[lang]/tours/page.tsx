import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDictionary, hasLocale, type Locale } from '../dictionaries';
import { PageShell } from '@/components/PageShell';
import { PageHero } from '@/components/PageHero';
import { TourCard } from '@/components/ToursShowcase';
import { listTours } from '@/lib/public-data';
import { stock } from '@/lib/media';

const CATS = ['all', 'bosphorus', 'city', 'experience', 'transfer'] as const;

export default async function ToursPage({
  params,
  searchParams,
}: PageProps<'/[lang]/tours'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const sp = await searchParams;
  const catRaw = typeof sp?.cat === 'string' ? sp.cat : 'all';
  const cat = (CATS as readonly string[]).includes(catRaw) ? catRaw : 'all';

  const all = await listTours();
  const tours = cat === 'all' ? all : all.filter((t) => t.category === cat);

  const catLabel = (c: string) =>
    c === 'bosphorus'
      ? dict.tours.categoryBosphorus
      : c === 'city'
      ? dict.tours.categoryCity
      : c === 'experience'
      ? dict.tours.categoryExperience
      : c === 'transfer'
      ? dict.tours.categoryTransfer
      : dict.tours.categoryAll;

  return (
    <PageShell dict={dict} locale={lang}>
      <PageHero
        image={stock.hero.topkapi}
        eyebrow="Istantrip"
        title={dict.tours.listTitle}
        subtitle={dict.tours.listSubtitle}
      />
      <section className="relative py-16 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2 mb-10">
            {CATS.map((c) => {
              const href = c === 'all' ? `/${lang}/tours` : `/${lang}/tours?cat=${c}`;
              const active = c === cat;
              return (
                <Link
                  key={c}
                  href={href}
                  className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition ${
                    active
                      ? 'border-[color:var(--gold)]/60 bg-[color:var(--gold)]/10 text-[color:var(--gold-soft)]'
                      : 'border-white/15 text-cream/70 hover:border-white/30'
                  }`}
                >
                  {catLabel(c)}
                </Link>
              );
            })}
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tours.map((t) => (
              <TourCard key={t.id} t={t} dict={dict} locale={lang} />
            ))}
          </div>
          {tours.length === 0 && (
            <p className="text-center text-cream/60 py-16">—</p>
          )}
        </div>
      </section>
    </PageShell>
  );
}
