import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { stock } from '@/lib/media';
import type { Dictionary } from '@/app/[lang]/dictionaries';

export function CtaBand({ dict, locale }: { dict: Dictionary; locale: string }) {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <Image src={stock.hero.galata} alt="" fill sizes="100vw" className="object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a08]/95 via-[#0b0a08]/70 to-[#0b0a08]/50" />
      <div className="relative mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex items-center gap-5">
          <Image src="/logo.png" alt="Istantrip" width={72} height={72} className="drop-shadow-[0_0_24px_rgba(201,162,74,0.55)]" />
          <div>
            <p className="text-[color:var(--gold-soft)] tracking-[0.35em] uppercase text-xs mb-2">
              {dict.hero.eyebrow}
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-cream leading-tight max-w-2xl">
              {dict.hero.title}
            </h2>
          </div>
        </div>
        <Link
          href={`/${locale}/reservation`}
          className="btn-gold px-8 py-4 rounded-full text-sm inline-flex items-center gap-2 whitespace-nowrap"
        >
          {dict.nav.reserve} <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
