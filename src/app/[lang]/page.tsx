import { notFound } from 'next/navigation';
import { getDictionary, hasLocale, type Locale } from './dictionaries';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { ReservationForm } from '@/components/ReservationForm';
import { Testimonials } from '@/components/Testimonials';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <main className="min-h-screen relative">
      <Header dict={dict} locale={lang} />
      <Hero dict={dict} />
      <Services dict={dict} />
      <About dict={dict} />
      <Testimonials dict={dict} />
      <ReservationForm dict={dict} locale={lang} />
      <Contact dict={dict} />
      <Footer dict={dict} />
    </main>
  );
}
