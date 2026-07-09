import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDictionary, hasLocale, type Locale } from '../dictionaries';
import { PageShell } from '@/components/PageShell';
import { PageHero } from '@/components/PageHero';
import { stock } from '@/lib/media';
import { ArrowRight } from 'lucide-react';

export default async function TransferPage({ params }: PageProps<'/[lang]/transfer'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  return (
    <PageShell dict={dict} locale={lang}>
      <PageHero
        image={stock.transfer.hero}
        eyebrow="Istantrip"
        title={dict.transfer.sectionTitle}
        subtitle={dict.transfer.subtitle}
      />
      <section className="relative py-24 px-6">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-14 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image src={stock.transfer.car} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          <div>
            <div className="grid gap-5 sm:grid-cols-2">
              {dict.transfer.features.map((f, i) => (
                <div key={i} className="card-glass rounded-2xl p-6">
                  <div className="font-display text-xl text-cream mb-2">{f.title}</div>
                  <p className="text-cream/70 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link
                href={`/${lang}/reservation?service=transfer`}
                className="btn-gold px-7 py-3.5 rounded-full text-sm inline-flex items-center gap-2"
              >
                {dict.transfer.cta} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
