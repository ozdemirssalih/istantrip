'use client';

import { updateStatus } from './actions';

type Row = {
  id: string;
  created_at: string;
  locale: string;
  service: string;
  full_name: string;
  email: string;
  phone: string | null;
  reservation_date: string | null;
  guests: number;
  status: string;
  notes: string | null;
};

const STATUSES = ['new', 'contacted', 'confirmed', 'done', 'cancelled'];

export function ReservationRow({ row }: { row: Row }) {
  return (
    <tr className="hover:bg-white/[0.02]">
      <td className="p-4 whitespace-nowrap text-cream/70">
        {new Date(row.created_at).toLocaleString()}
      </td>
      <td className="p-4">
        <div className="font-medium text-cream">{row.full_name}</div>
        <div className="text-xs text-cream/60">
          <a href={`mailto:${row.email}`} className="hover:text-[color:var(--gold-soft)]">
            {row.email}
          </a>
          {row.phone ? ` · ${row.phone}` : ''}
        </div>
        {row.notes && <div className="text-xs text-cream/50 mt-1 max-w-xs truncate">{row.notes}</div>}
      </td>
      <td className="p-4 capitalize">{row.service}</td>
      <td className="p-4">{row.reservation_date ?? '—'}</td>
      <td className="p-4">{row.guests}</td>
      <td className="p-4 uppercase text-xs tracking-wider">{row.locale}</td>
      <td className="p-4">
        <form action={updateStatus}>
          <input type="hidden" name="id" value={row.id} />
          <select
            name="status"
            defaultValue={row.status}
            onChange={(e) => (e.currentTarget.form as HTMLFormElement).requestSubmit()}
            className="!py-1.5 !px-2 !text-xs !w-auto"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </form>
      </td>
    </tr>
  );
}
