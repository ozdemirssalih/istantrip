import Image from 'next/image';

export function PageHero({
  image,
  eyebrow,
  title,
  subtitle,
}: {
  image: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative h-[62vh] min-h-[420px] w-full overflow-hidden -mt-24">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0a08]/60 via-[#0b0a08]/40 to-[#0b0a08]" />
      <div className="absolute inset-0 grain" />
      {/* Watermark logo center-right */}
      <div className="pointer-events-none absolute inset-y-0 end-[-6%] flex items-center opacity-10 hidden md:flex">
        <Image src="/logo.png" alt="" width={520} height={520} />
      </div>
      <div className="relative z-10 h-full flex items-end pb-16">
        <div className="mx-auto max-w-7xl px-6 w-full">
          <div className="flex items-center gap-4 mb-5">
            <Image src="/logo.png" alt="Istantrip" width={44} height={44} className="drop-shadow-[0_0_18px_rgba(201,162,74,0.45)]" />
            {eyebrow && (
              <span className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--gold-soft)]">
                {eyebrow}
              </span>
            )}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-cream max-w-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-lg text-cream/80 max-w-2xl">{subtitle}</p>
          )}
          <div className="divider-gold w-40 mt-8" />
        </div>
      </div>
    </section>
  );
}
