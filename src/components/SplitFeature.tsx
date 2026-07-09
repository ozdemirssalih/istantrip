'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { stock } from '@/lib/media';
import type { Dictionary } from '@/app/[lang]/dictionaries';

export function SplitFeature({ dict, locale }: { dict: Dictionary; locale: string }) {
  const items = [
    {
      image: stock.hero.yacht,
      eyebrow: dict.tours.categoryBosphorus,
      title: dict.services.bosphorus.title,
      body: dict.services.bosphorus.desc,
      href: `/${locale}/tours?cat=bosphorus`,
      align: 'right' as const,
    },
    {
      image: stock.hero.balat,
      eyebrow: dict.tours.categoryCity,
      title: dict.services.city.title,
      body: dict.services.city.desc,
      href: `/${locale}/tours?cat=city`,
      align: 'left' as const,
    },
    {
      image: stock.hero.dolmabahce,
      eyebrow: 'Hotels',
      title: dict.services.hotel.title,
      body: dict.services.hotel.desc,
      href: `/${locale}/hotels`,
      align: 'right' as const,
    },
  ];

  return (
    <section className="relative py-32 px-6 space-y-24">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9 }}
          className={`mx-auto max-w-7xl grid md:grid-cols-2 gap-14 items-center ${
            item.align === 'left' ? 'md:[&>*:first-child]:order-2' : ''
          }`}
        >
          <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-3xl overflow-hidden group">
            <Image
              src={item.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a08]/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 start-6 flex items-center gap-3 opacity-80">
              <Image src="/logo.png" alt="" width={38} height={38} className="drop-shadow-[0_0_16px_rgba(201,162,74,0.45)]" />
            </div>
          </div>
          <div>
            <p className="text-[color:var(--gold-soft)] tracking-[0.35em] uppercase text-xs mb-4">
              {item.eyebrow}
            </p>
            <h3 className="font-display text-4xl md:text-5xl text-cream leading-tight mb-6">
              {item.title}
            </h3>
            <div className="divider-gold w-24 mb-6" />
            <p className="text-cream/80 leading-relaxed text-lg mb-8">{item.body}</p>
            <Link
              href={item.href}
              className="btn-ghost px-6 py-3 rounded-full text-sm inline-flex items-center gap-2"
            >
              {dict.services.learnMore} <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
