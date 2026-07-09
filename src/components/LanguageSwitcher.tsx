'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Globe } from 'lucide-react';

const LOCALES = [
  { code: 'tr', label: 'TR' },
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
  { code: 'ru', label: 'RU' },
] as const;

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();

  function switchTo(code: string) {
    const segments = pathname.split('/');
    if (LOCALES.some((l) => l.code === segments[1])) {
      segments[1] = code;
    } else {
      segments.splice(1, 0, code);
    }
    const next = segments.join('/') || `/${code}`;
    setOpen(false);
    startTransition(() => router.push(next));
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/15 hover:border-[color:var(--gold)]/60 text-sm text-cream/90 transition-colors"
      >
        <Globe size={16} />
        <span className="uppercase tracking-wider">{currentLocale}</span>
      </button>
      {open && (
        <div className="absolute end-0 mt-2 min-w-[8rem] rounded-xl border border-white/10 bg-[#16130d]/95 backdrop-blur p-1 shadow-2xl z-50">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => switchTo(l.code)}
              className={`w-full text-start px-3 py-2 rounded-lg text-sm hover:bg-white/5 ${
                l.code === currentLocale ? 'text-[color:var(--gold-soft)]' : 'text-cream/80'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
