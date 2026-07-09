'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Ship, Landmark, BedDouble, Car, ArrowRight } from 'lucide-react';
import type { Dictionary } from '@/app/[lang]/dictionaries';

export function Services({ dict, locale }: { dict: Dictionary; locale: string }) {
  const base = `/${locale}`;
  const items = [
    { key: 'bosphorus', Icon: Ship, ...dict.services.bosphorus, href: `${base}/tours?cat=bosphorus` },
    { key: 'city', Icon: Landmark, ...dict.services.city, href: `${base}/tours?cat=city` },
    { key: 'hotel', Icon: BedDouble, ...dict.services.hotel, href: `${base}/hotels` },
    { key: 'transfer', Icon: Car, ...dict.services.transfer, href: `${base}/transfer` },
  ];

  return (
    <section id="services" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-[color:var(--gold-soft)] tracking-[0.3em] uppercase text-xs mb-4"
          >
            Istantrip
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="font-display text-4xl md:text-5xl text-cream"
          >
            {dict.services.sectionTitle}
          </motion.h2>
          <p className="mt-4 text-cream/70 max-w-xl mx-auto">{dict.services.sectionSubtitle}</p>
          <div className="divider-gold w-40 mx-auto mt-8" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map(({ key, Icon, title, desc, href }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
            >
              <Link
                href={href}
                className="card-glass rounded-2xl p-8 relative overflow-hidden group block h-full"
              >
                <div className="absolute -top-16 -end-16 w-40 h-40 rounded-full bg-[color:var(--gold)]/10 blur-3xl group-hover:bg-[color:var(--gold)]/25 transition" />
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[color:var(--gold)]/25 to-[color:var(--gold-deep)]/10 border border-[color:var(--gold)]/30 mb-6">
                    <Icon size={26} className="text-[color:var(--gold-soft)]" />
                  </div>
                  <h3 className="font-display text-2xl text-cream mb-3">{title}</h3>
                  <p className="text-cream/70 text-sm leading-relaxed">{desc}</p>
                  <span className="inline-flex items-center gap-2 mt-6 text-[color:var(--gold-soft)] text-sm">
                    {dict.services.learnMore} <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
