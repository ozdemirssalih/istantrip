import Link from 'next/link';
import { LogOut, LayoutDashboard, CalendarCheck, BedDouble, ExternalLink } from 'lucide-react';

type ActiveKey = 'home' | 'reservations' | 'hotels';

export function AdminShell({
  active,
  children,
}: {
  active: ActiveKey;
  children: React.ReactNode;
}) {
  const nav: { key: ActiveKey; label: string; href: string; Icon: typeof LayoutDashboard }[] = [
    { key: 'home', label: 'Dashboard', href: '/admin', Icon: LayoutDashboard },
    { key: 'reservations', label: 'Reservations', href: '/admin/reservations', Icon: CalendarCheck },
    { key: 'hotels', label: 'Hotels', href: '/admin/hotels', Icon: BedDouble },
  ];
  return (
    <div className="min-h-screen bg-[#0b0a08] text-cream flex">
      <aside className="w-64 shrink-0 border-e border-white/5 bg-[#0f0d09] flex flex-col">
        <div className="p-6 border-b border-white/5">
          <Link href="/admin" className="font-display text-2xl">
            <span className="gold-gradient">Istan</span>trip
          </Link>
          <div className="text-[10px] tracking-[0.3em] uppercase text-cream/50 mt-1">Admin</div>
        </div>
        <nav className="p-4 space-y-1 text-sm flex-1">
          {nav.map(({ key, label, href, Icon }) => (
            <Link
              key={key}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                active === key
                  ? 'bg-[color:var(--gold)]/10 text-[color:var(--gold-soft)] border border-[color:var(--gold)]/25'
                  : 'text-cream/75 hover:bg-white/5 hover:text-cream'
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5 space-y-2">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-cream/70 hover:bg-white/5"
          >
            <ExternalLink size={16} />
            View site
          </a>
          <form action="/admin/logout" method="post">
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-cream/70 hover:bg-white/5"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-10 max-w-6xl">{children}</main>
    </div>
  );
}
