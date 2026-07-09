'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Dictionary } from '@/app/[lang]/dictionaries';

type State = 'idle' | 'loading' | 'success' | 'error';

const VALID_SERVICES = ['bosphorus', 'city', 'hotel', 'transfer'] as const;

export function ReservationForm({
  dict,
  locale,
  preselectService,
}: {
  dict: Dictionary;
  locale: string;
  preselectService?: string;
}) {
  const [state, setState] = useState<State>('idle');
  const defaultService = (VALID_SERVICES as readonly string[]).includes(preselectService ?? '')
    ? (preselectService as string)
    : 'bosphorus';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      locale,
      service: String(fd.get('service') || 'bosphorus'),
      fullName: String(fd.get('fullName') || ''),
      email: String(fd.get('email') || ''),
      phone: String(fd.get('phone') || ''),
      reservationDate: String(fd.get('reservationDate') || ''),
      guests: Number(fd.get('guests') || 2),
      notes: String(fd.get('notes') || ''),
    };
    try {
      const res = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('bad');
      setState('success');
      form.reset();
    } catch {
      setState('error');
    }
  }

  return (
    <section id="reservation" className="relative py-32 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="font-display text-4xl md:text-5xl text-cream"
          >
            {dict.reservation.sectionTitle}
          </motion.h2>
          <p className="mt-4 text-cream/70">{dict.reservation.sectionSubtitle}</p>
          <div className="divider-gold w-40 mx-auto mt-8" />
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="card-glass rounded-2xl p-8 md:p-10 grid gap-5 md:grid-cols-2"
        >
          <label className="text-sm">
            <span className="block mb-2 text-cream/80">{dict.reservation.fields.name}</span>
            <input name="fullName" required minLength={2} />
          </label>
          <label className="text-sm">
            <span className="block mb-2 text-cream/80">{dict.reservation.fields.email}</span>
            <input name="email" type="email" required />
          </label>
          <label className="text-sm">
            <span className="block mb-2 text-cream/80">{dict.reservation.fields.phone}</span>
            <input name="phone" type="tel" />
          </label>
          <label className="text-sm">
            <span className="block mb-2 text-cream/80">{dict.reservation.fields.service}</span>
            <select name="service" defaultValue={defaultService}>
              <option value="bosphorus">{dict.reservation.serviceOptions.bosphorus}</option>
              <option value="city">{dict.reservation.serviceOptions.city}</option>
              <option value="hotel">{dict.reservation.serviceOptions.hotel}</option>
              <option value="transfer">{dict.reservation.serviceOptions.transfer}</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="block mb-2 text-cream/80">{dict.reservation.fields.date}</span>
            <input name="reservationDate" type="date" />
          </label>
          <label className="text-sm">
            <span className="block mb-2 text-cream/80">{dict.reservation.fields.guests}</span>
            <input name="guests" type="number" min={1} max={50} defaultValue={2} required />
          </label>
          <label className="text-sm md:col-span-2">
            <span className="block mb-2 text-cream/80">{dict.reservation.fields.notes}</span>
            <textarea name="notes" rows={4} />
          </label>

          <div className="md:col-span-2 flex items-center justify-between gap-4 flex-wrap">
            <div className="text-sm min-h-[24px]">
              {state === 'success' && (
                <span className="text-[color:var(--gold-soft)]">{dict.reservation.success}</span>
              )}
              {state === 'error' && (
                <span className="text-red-400">{dict.reservation.error}</span>
              )}
            </div>
            <button
              type="submit"
              disabled={state === 'loading'}
              className="btn-gold px-8 py-3.5 rounded-full text-sm disabled:opacity-60"
            >
              {state === 'loading' ? '...' : dict.reservation.submit}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
