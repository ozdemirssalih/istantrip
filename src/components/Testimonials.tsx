'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import type { Dictionary } from '@/app/[lang]/dictionaries';

export function Testimonials({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="font-display text-4xl md:text-5xl text-cream"
          >
            {dict.testimonials.sectionTitle}
          </motion.h2>
          <div className="divider-gold w-40 mx-auto mt-8" />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {dict.testimonials.items.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="card-glass rounded-2xl p-8 relative"
            >
              <Quote size={28} className="text-[color:var(--gold-soft)] mb-4" />
              <p className="text-cream/85 leading-relaxed">{t.quote}</p>
              <footer className="mt-6 text-sm text-[color:var(--gold-soft)] tracking-wider uppercase">
                — {t.author}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
