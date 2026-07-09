import { notFound } from 'next/navigation';
import { getDictionary, hasLocale, type Locale } from './dictionaries';
import { PageShell } from '@/components/PageShell';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { TrustBar } from '@/components/TrustBar';
import { Services } from '@/components/Services';
import { ToursShowcase } from '@/components/ToursShowcase';
import { SplitFeature } from '@/components/SplitFeature';
import { HotelsShowcase } from '@/components/HotelsShowcase';
import { StatsRow } from '@/components/StatsRow';
import { About } from '@/components/About';
import { Gallery } from '@/components/Gallery';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { CtaBand } from '@/components/CtaBand';
import { ReservationForm } from '@/components/ReservationForm';

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  return (
    <PageShell dict={dict} locale={lang}>
      <div className="-mt-24">
        <Hero dict={dict} />
      </div>
      <Marquee />
      <TrustBar dict={dict} />
      <Services dict={dict} locale={lang} />
      <ToursShowcase dict={dict} locale={lang} />
      <SplitFeature dict={dict} locale={lang} />
      <HotelsShowcase dict={dict} locale={lang} />
      <StatsRow dict={dict} />
      <About dict={dict} />
      <Gallery dict={dict} />
      <Testimonials dict={dict} />
      <FAQ dict={dict} />
      <CtaBand dict={dict} locale={lang} />
      <ReservationForm dict={dict} locale={lang} />
    </PageShell>
  );
}
