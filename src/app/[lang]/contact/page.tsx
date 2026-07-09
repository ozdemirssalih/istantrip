import { notFound } from 'next/navigation';
import { getDictionary, hasLocale, type Locale } from '../dictionaries';
import { PageShell } from '@/components/PageShell';
import { PageHero } from '@/components/PageHero';
import { Contact } from '@/components/Contact';
import { stock } from '@/lib/media';

export default async function ContactPage({ params }: PageProps<'/[lang]/contact'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  return (
    <PageShell dict={dict} locale={lang}>
      <PageHero
        image={stock.hero.tram}
        eyebrow="Istantrip"
        title={dict.contact.sectionTitle}
        subtitle={dict.contact.hours}
      />
      <Contact dict={dict} />
    </PageShell>
  );
}
