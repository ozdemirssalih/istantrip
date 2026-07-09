'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Dictionary } from '@/app/[lang]/dictionaries';

export function FAQ({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-28 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-cream">{dict.faq.sectionTitle}</h2>
          <div className="divider-gold w-40 mx-auto mt-8" />
        </div>
        <div className="space-y-3">
          {dict.faq.items.map((item, i) => (
            <div key={i} className="card-glass rounded-2xl overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between text-start px-6 py-5 text-cream"
                aria-expanded={open === i}
              >
                <span className="font-medium">{item.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-[color:var(--gold-soft)] transition-transform ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-cream/75 text-sm leading-relaxed">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
