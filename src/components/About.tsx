'use client';

import { motion } from 'framer-motion';
import { LogoMark } from './LogoMark';
import type { Dictionary } from '@/app/[lang]/dictionaries';

export function About({ dict }: { dict: Dictionary }) {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-14 items-center">
        <div className="relative h-[420px] hidden md:block">
          <LogoMark className="absolute inset-0" size={360} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[color:var(--gold-soft)] tracking-[0.3em] uppercase text-xs mb-4">
            Istantrip
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-cream mb-6">
            {dict.about.sectionTitle}
          </h2>
          <div className="divider-gold w-32 mb-6" />
          <p className="text-cream/80 leading-relaxed text-lg">{dict.about.body}</p>
        </motion.div>
      </div>
    </section>
  );
}
