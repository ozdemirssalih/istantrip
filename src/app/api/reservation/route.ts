import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

const schema = z.object({
  locale: z.enum(['tr', 'en', 'ar', 'ru']),
  service: z.enum(['bosphorus', 'city', 'hotel', 'transfer']),
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional().or(z.literal('')),
  reservationDate: z.string().optional().or(z.literal('')),
  guests: z.coerce.number().int().min(1).max(50),
  notes: z.string().max(2000).optional().or(z.literal('')),
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'validation', issues: parsed.error.issues }, { status: 400 });
  }
  const d = parsed.data;

  const userAgent = request.headers.get('user-agent') ?? undefined;

  const { error } = await supabase.from('istantrip_reservations').insert({
    locale: d.locale,
    service: d.service,
    full_name: d.fullName,
    email: d.email,
    phone: d.phone || null,
    reservation_date: d.reservationDate || null,
    guests: d.guests,
    notes: d.notes || null,
    source: 'web',
    user_agent: userAgent,
  });

  if (error) {
    console.error('reservation insert failed', error);
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
