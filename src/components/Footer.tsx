import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import type { Dictionary } from '@/app/[lang]/dictionaries';

export function Footer({ dict, locale }: { dict: Dictionary; locale: string }) {
  const base = `/${locale}`;
  return (
    <footer className="relative border-t border-white/5 pt-16 pb-10 px-6 overflow-hidden">
      {/* Watermark logo */}
      <div className="pointer-events-none absolute -bottom-24 -end-24 opacity-[0.05]">
        <Image src="/logo.png" alt="" width={520} height={520} />
      </div>
      <div className="relative mx-auto max-w-7xl grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href={base} className="flex items-center gap-3 mb-5">
            <Image src="/logo.png" alt="Istantrip" width={54} height={54} className="drop-shadow-[0_0_18px_rgba(201,162,74,0.45)]" />
            <div>
              <div className="font-display text-2xl">
                <span className="gold-gradient">Istan</span>trip
              </div>
              <div className="text-xs text-cream/60 mt-1">{dict.footer.tagline}</div>
            </div>
          </Link>
          <p className="text-sm text-cream/60 max-w-md leading-relaxed">
            {dict.about.body}
          </p>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--gold-soft)] mb-4">
            {dict.footer.explore}
          </div>
          <ul className="space-y-2 text-sm text-cream/75">
            <li><Link href={`${base}/tours`} className="hover:text-[color:var(--gold-soft)]">{dict.nav.tours}</Link></li>
            <li><Link href={`${base}/hotels`} className="hover:text-[color:var(--gold-soft)]">{dict.nav.hotels}</Link></li>
            <li><Link href={`${base}/transfer`} className="hover:text-[color:var(--gold-soft)]">{dict.nav.transfer}</Link></li>
            <li><Link href={`${base}/about`} className="hover:text-[color:var(--gold-soft)]">{dict.nav.about}</Link></li>
            <li><Link href={`${base}/contact`} className="hover:text-[color:var(--gold-soft)]">{dict.nav.contact}</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--gold-soft)] mb-4">
            {dict.footer.connect}
          </div>
          <ul className="space-y-3 text-sm text-cream/75">
            <li className="flex items-center gap-3">
              <Phone size={14} className="text-[color:var(--gold-soft)]" />
              <a href={`tel:${dict.contact.phone.replace(/\s/g, '')}`} className="hover:text-[color:var(--gold-soft)]">{dict.contact.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={14} className="text-[color:var(--gold-soft)]" />
              <a href={`mailto:${dict.contact.email}`} className="hover:text-[color:var(--gold-soft)]">{dict.contact.email}</a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={14} className="text-[color:var(--gold-soft)]" />
              <span>{dict.contact.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Clock size={14} className="text-[color:var(--gold-soft)]" />
              <span>{dict.contact.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="divider-gold max-w-7xl mx-auto mt-12 mb-6" />
      <div className="relative mx-auto max-w-7xl text-xs text-cream/50 flex flex-wrap items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Istantrip. {dict.footer.rights}</p>
        <p className="tracking-widest uppercase">Istanbul · Türkiye</p>
      </div>
    </footer>
  );
}
