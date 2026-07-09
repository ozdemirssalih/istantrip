'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { Dictionary } from '@/app/[lang]/dictionaries';

export function Header({ dict, locale }: { dict: Dictionary; locale: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const base = `/${locale}`;
  const links = [
    { href: `${base}/tours`, label: dict.nav.tours },
    { href: `${base}/hotels`, label: dict.nav.hotels },
    { href: `${base}/transfer`, label: dict.nav.transfer },
    { href: `${base}/about`, label: dict.nav.about },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0b0a08]/85 backdrop-blur-xl border-b border-white/5 py-3'
          : 'py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 flex items-center justify-between gap-4">
        <Link href={base} className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="Istantrip"
            width={48}
            height={48}
            className="drop-shadow-[0_0_18px_rgba(201,162,74,0.45)] transition-transform group-hover:scale-105"
            priority
          />
          <span className="font-display text-xl tracking-tight text-cream">
            <span className="gold-gradient">Istan</span>trip
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm text-cream/80">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[color:var(--gold-soft)] transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher currentLocale={locale} />
          <Link
            href={`${base}/reservation`}
            className="hidden sm:inline-flex btn-gold px-5 py-2.5 rounded-full text-sm"
          >
            {dict.nav.reserve}
          </Link>
          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/15 text-cream"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[#0b0a08]/95 backdrop-blur-xl border-t border-white/5">
          <nav className="max-w-7xl mx-auto px-5 py-6 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-cream/85 hover:text-[color:var(--gold-soft)] py-1"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={`${base}/reservation`}
              className="btn-gold w-fit px-5 py-2.5 rounded-full text-sm mt-2"
              onClick={() => setOpen(false)}
            >
              {dict.nav.reserve}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
