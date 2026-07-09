import { Header } from './Header';
import { Footer } from './Footer';
import type { Dictionary } from '@/app/[lang]/dictionaries';

export function PageShell({
  dict,
  locale,
  children,
}: {
  dict: Dictionary;
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative">
      <Header dict={dict} locale={locale} />
      <div className="pt-24">{children}</div>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
