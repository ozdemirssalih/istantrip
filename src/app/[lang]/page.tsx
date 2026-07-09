import { notFound } from 'next/navigation';
import { getDictionary, hasLocale, type Locale } from './dictionaries';
import { PageShell } from '@/components/PageShell';
import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { Services } from '@/components/Services';
import { ToursShowcase } from '@/components/ToursShowcase';
import { HotelsShowcase } from '@/components/HotelsShowcase';
import { About } from '@/components/About';
import { Gallery } from '@/components/Gallery';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
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
      <TrustBar dict={dict} />
      <Services dict={dict} locale={lang} />
      <ToursShowcase dict={dict} locale={lang} />
      <HotelsShowcase dict={dict} locale={lang} />
      <About dict={dict} />
      <Gallery dict={dict} />
      <Testimonials dict={dict} />
      <FAQ dict={dict} />
      <ReservationForm dict={dict} locale={lang} />
    </PageShell>
  );
}
