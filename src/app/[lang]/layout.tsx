import type { Metadata } from 'next';
import { Playfair_Display, Inter, Amiri } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';
import { getDictionary, hasLocale, isRtl, locales, type Locale } from './dictionaries';
import { LenisProvider } from '@/components/LenisProvider';

const display = Playfair_Display({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const body = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-body', display: 'swap' });
const arabic = Amiri({ subsets: ['arabic'], weight: ['400', '700'], variable: '--font-arabic', display: 'swap' });

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    icons: { icon: '/logo.png' },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      images: ['/logo.png'],
    },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dir = isRtl(lang as Locale) ? 'rtl' : 'ltr';
  return (
    <html
      lang={lang}
      dir={dir}
      className={`${display.variable} ${body.variable} ${arabic.variable}`}
    >
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
