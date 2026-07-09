'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { Dictionary } from '@/app/[lang]/dictionaries';

export function Header({ dict, locale }: { dict: Dictionary; locale: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#services', label: dict.nav.tours },
    { href: '#hotels', label: dict.nav.hotels },
    { href: '#transfer', label: dict.nav.transfer },
    { href: '#about', label: dict.nav.about },
    { href: '#contact', label: dict.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0b0a08]/80 backdrop-blur-lg border-b border-white/5 py-3'
          : 'py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 flex items-center justify-between gap-4">
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="Istantrip"
            width={44}
            height={44}
            className="drop-shadow-[0_0_16px_rgba(201,162,74,0.35)]"
            priority
          />
          <span className="font-display text-xl tracking-tight text-cream">
            <span className="gold-gradient">Istan</span>trip
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm text-cream/80">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-[color:var(--gold-soft)] transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher currentLocale={locale} />
          <a href="#reservation" className="hidden sm:inline-flex btn-gold px-5 py-2.5 rounded-full text-sm">
            {dict.nav.reserve}
          </a>
        </div>
      </div>
    </header>
  );
}
