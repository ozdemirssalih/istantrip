import Image from 'next/image';
import { stock } from '@/lib/media';
import type { Dictionary } from '@/app/[lang]/dictionaries';

export function Gallery({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative py-28 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-cream">{dict.gallery.sectionTitle}</h2>
          <p className="mt-4 text-cream/70">{dict.gallery.subtitle}</p>
          <div className="divider-gold w-40 mx-auto mt-8" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stock.gallery.map((src, i) => (
            <div
              key={src}
              className={`relative overflow-hidden rounded-xl group ${
                i === 0 || i === 5 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#0b0a08]/25 group-hover:bg-transparent transition" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
