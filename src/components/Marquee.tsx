import Image from 'next/image';

export function Marquee() {
  const items = [
    'Sultanahmet',
    'Galata',
    'Bosphorus',
    'Kadıköy',
    'Balat',
    'Ortaköy',
    'Beyoğlu',
    'Karaköy',
    'Kuzguncuk',
    'Fener',
  ];
  return (
    <section aria-hidden className="relative py-10 border-y border-white/5 bg-[#0f0d09]/70 overflow-hidden">
      <div className="marquee">
        <div className="marquee__track">
          {[...items, ...items, ...items].map((label, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 font-display text-3xl md:text-4xl text-cream/25 mx-8"
            >
              {label}
              <span className="inline-flex">
                <Image src="/logo.png" alt="" width={26} height={26} className="opacity-60" />
              </span>
            </span>
          ))}
        </div>
      </div>
      <style>{`
        .marquee { --gap: 0px; overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
        .marquee__track { display: inline-flex; white-space: nowrap; animation: marquee 40s linear infinite; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
      `}</style>
    </section>
  );
}
