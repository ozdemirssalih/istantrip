'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import type { Dictionary } from '@/app/[lang]/dictionaries';

export function Contact({ dict }: { dict: Dictionary }) {
  const items = [
    { Icon: Phone, label: dict.contact.phone, href: `tel:${dict.contact.phone.replace(/\s/g, '')}` },
    { Icon: Mail, label: dict.contact.email, href: `mailto:${dict.contact.email}` },
    { Icon: MapPin, label: dict.contact.address, href: '#' },
  ];
  return (
    <section id="contact" className="relative py-24 px-6 border-t border-white/5">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-cream">{dict.contact.sectionTitle}</h2>
          <div className="divider-gold w-32 mx-auto mt-6" />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map(({ Icon, label, href }, i) => (
            <motion.a
              key={i}
              href={href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="card-glass rounded-2xl p-6 flex items-center gap-4 group"
            >
              <span className="inline-flex w-12 h-12 rounded-xl bg-gradient-to-br from-[color:var(--gold)]/25 to-[color:var(--gold-deep)]/10 border border-[color:var(--gold)]/30 items-center justify-center">
                <Icon size={20} className="text-[color:var(--gold-soft)]" />
              </span>
              <span className="text-cream/85 group-hover:text-[color:var(--gold-soft)] transition-colors">
                {label}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
