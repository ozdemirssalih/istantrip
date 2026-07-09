import Image from 'next/image';
import { stock } from '@/lib/media';
import type { Dictionary } from '@/app/[lang]/dictionaries';

export function StatsRow({ dict }: { dict: Dictionary }) {
  const stats = [
    { value: '10K+', label: dict.trust.guests },
    { value: '4', label: dict.trust.languages },
    { value: '24/7', label: dict.contact.hours },
    { value: '★★★★★', label: dict.testimonials.sectionTitle },
  ];
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <Image
        src={stock.hero.sultanahmet}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0a08] via-[#0b0a08]/70 to-[#0b0a08]" />
      <div className="relative mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <div className="font-display text-5xl md:text-6xl gold-gradient">{s.value}</div>
            <div className="text-xs md:text-sm uppercase tracking-[0.3em] text-cream/75">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
