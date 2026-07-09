import Image from 'next/image';
import type { Dictionary } from '@/app/[lang]/dictionaries';

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="relative border-t border-white/5 py-12 px-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Istantrip" width={40} height={40} />
          <div>
            <div className="font-display text-lg">
              <span className="gold-gradient">Istan</span>trip
            </div>
            <div className="text-xs text-cream/60">{dict.footer.tagline}</div>
          </div>
        </div>
        <p className="text-xs text-cream/50 tracking-wide">
          © {new Date().getFullYear()} Istantrip. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
