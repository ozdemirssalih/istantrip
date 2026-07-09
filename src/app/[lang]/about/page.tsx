import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getDictionary, hasLocale, type Locale } from '../dictionaries';
import { PageShell } from '@/components/PageShell';
import { PageHero } from '@/components/PageHero';
import { stock } from '@/lib/media';
import { Compass3D } from '@/components/Compass3D';

export default async function AboutPage({ params }: PageProps<'/[lang]/about'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  return (
    <PageShell dict={dict} locale={lang}>
      <PageHero image={stock.about.hero} eyebrow="Istantrip" title={dict.about.sectionTitle} />
      <section className="relative py-20 px-6">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-14 items-center">
          <div className="relative h-[420px] hidden md:block">
            <Compass3D className="absolute inset-0" />
          </div>
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-cream mb-6">{dict.about.story.title}</h2>
            <div className="divider-gold w-32 mb-6" />
            <p className="text-cream/85 leading-relaxed text-lg">{dict.about.body}</p>
            <p className="mt-6 text-cream/75 leading-relaxed">{dict.about.story.body}</p>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            {dict.about.values.map((v, i) => (
              <div key={i} className="card-glass rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute -top-16 -end-16 w-40 h-40 rounded-full bg-[color:var(--gold)]/10 blur-3xl" />
                <div className="relative">
                  <Image src="/logo.png" alt="" width={44} height={44} className="mb-6 opacity-90" />
                  <h3 className="font-display text-2xl text-cream mb-3">{v.title}</h3>
                  <p className="text-cream/75 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
