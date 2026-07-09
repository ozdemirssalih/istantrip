'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

function slugify(v: string) {
  return v
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function toPayload(fd: FormData) {
  const name = String(fd.get('name') ?? '').trim();
  const slugRaw = String(fd.get('slug') ?? '').trim();
  const amenitiesRaw = String(fd.get('amenities') ?? '').trim();
  const priceRaw = String(fd.get('price_from') ?? '').trim();
  const starsRaw = String(fd.get('stars') ?? '').trim();
  const sortRaw = String(fd.get('sort_order') ?? '').trim();
  return {
    slug: slugRaw ? slugify(slugRaw) : slugify(name),
    name,
    district: String(fd.get('district') ?? '') || null,
    price_from: priceRaw ? Number(priceRaw) : null,
    currency: String(fd.get('currency') ?? 'EUR') || 'EUR',
    stars: starsRaw ? Number(starsRaw) : null,
    cover_url: String(fd.get('cover_url') ?? '') || null,
    booking_url: String(fd.get('booking_url') ?? '') || null,
    description_tr: String(fd.get('description_tr') ?? '') || null,
    description_en: String(fd.get('description_en') ?? '') || null,
    description_ar: String(fd.get('description_ar') ?? '') || null,
    description_ru: String(fd.get('description_ru') ?? '') || null,
    amenities: amenitiesRaw
      ? amenitiesRaw.split(',').map((s) => s.trim()).filter(Boolean)
      : [],
    published: fd.get('published') === 'on',
    sort_order: sortRaw ? Number(sortRaw) : 0,
    updated_at: new Date().toISOString(),
  };
}

export async function createHotel(formData: FormData) {
  const payload = toPayload(formData);
  if (!payload.name || !payload.slug) return;
  const { error } = await supabase.from('istantrip_hotels').insert(payload);
  if (error) throw error;
  revalidatePath('/admin/hotels');
  revalidatePath('/');
  redirect('/admin/hotels');
}

export async function updateHotel(id: string, formData: FormData) {
  const payload = toPayload(formData);
  if (!payload.name || !payload.slug) return;
  const { error } = await supabase.from('istantrip_hotels').update(payload).eq('id', id);
  if (error) throw error;
  revalidatePath('/admin/hotels');
  revalidatePath('/');
  redirect('/admin/hotels');
}

export async function deleteHotel(id: string) {
  await supabase.from('istantrip_hotels').delete().eq('id', id);
  revalidatePath('/admin/hotels');
  revalidatePath('/');
  redirect('/admin/hotels');
}
