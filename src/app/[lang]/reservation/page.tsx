import { notFound } from 'next/navigation';
import { getDictionary, hasLocale, type Locale } from '../dictionaries';
import { PageShell } from '@/components/PageShell';
import { PageHero } from '@/components/PageHero';
import { ReservationForm } from '@/components/ReservationForm';
import { stock } from '@/lib/media';

export default async function ReservationPage({
  params,
  searchParams,
}: PageProps<'/[lang]/reservation'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const sp = await searchParams;
  const preselect = typeof sp?.service === 'string' ? sp.service : undefined;
  return (
    <PageShell dict={dict} locale={lang}>
      <PageHero
        image={stock.hero.yacht}
        eyebrow="Istantrip"
        title={dict.reservation.sectionTitle}
        subtitle={dict.reservation.sectionSubtitle}
      />
      <ReservationForm dict={dict} locale={lang} preselectService={preselect} />
    </PageShell>
  );
}
