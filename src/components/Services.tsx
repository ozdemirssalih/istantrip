'use client';

import { motion } from 'framer-motion';
import { Ship, Landmark, BedDouble, Car } from 'lucide-react';
import type { Dictionary } from '@/app/[lang]/dictionaries';

export function Services({ dict }: { dict: Dictionary }) {
  const items = [
    { key: 'bosphorus', Icon: Ship, ...dict.services.bosphorus, id: 'services' },
    { key: 'city', Icon: Landmark, ...dict.services.city, id: 'tours' },
    { key: 'hotel', Icon: BedDouble, ...dict.services.hotel, id: 'hotels' },
    { key: 'transfer', Icon: Car, ...dict.services.transfer, id: 'transfer' },
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
          <p className="mt-4 text-cream/70 max-w-xl mx-auto">
            {dict.services.sectionSubtitle}
          </p>
          <div className="divider-gold w-40 mx-auto mt-8" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map(({ key, Icon, title, desc, id }, i) => (
            <motion.article
              key={key}
              id={id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="card-glass rounded-2xl p-8 relative overflow-hidden group"
            >
              <div className="absolute -top-16 -end-16 w-40 h-40 rounded-full bg-[color:var(--gold)]/10 blur-3xl group-hover:bg-[color:var(--gold)]/20 transition" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[color:var(--gold)]/25 to-[color:var(--gold-deep)]/10 border border-[color:var(--gold)]/30 mb-6">
                  <Icon size={26} className="text-[color:var(--gold-soft)]" />
                </div>
                <h3 className="font-display text-2xl text-cream mb-3">{title}</h3>
                <p className="text-cream/70 text-sm leading-relaxed">{desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
