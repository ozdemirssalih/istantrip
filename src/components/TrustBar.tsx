import { Users, Sparkles, ShieldCheck, Languages } from 'lucide-react';
import type { Dictionary } from '@/app/[lang]/dictionaries';

export function TrustBar({ dict }: { dict: Dictionary }) {
  const items = [
    { Icon: Users, label: dict.trust.guests },
    { Icon: Sparkles, label: dict.trust.guides },
    { Icon: ShieldCheck, label: dict.trust.vip },
    { Icon: Languages, label: dict.trust.languages },
  ];
  return (
    <section className="relative border-y border-white/5 py-6 px-6 bg-[#0f0d09]/60">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(({ Icon, label }, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-cream/80">
            <span className="inline-flex w-9 h-9 rounded-full items-center justify-center border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/10">
              <Icon size={16} className="text-[color:var(--gold-soft)]" />
            </span>
            <span className="tracking-wide">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
