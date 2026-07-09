'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

const CATS = new Set(['bosphorus', 'city', 'transfer', 'experience']);

function slugify(v: string) {
  return v
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function csv(v: string): string[] {
  return v
    .split(/\r?\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function toPayload(fd: FormData) {
  const name_en = String(fd.get('name_en') ?? '').trim();
  const slugRaw = String(fd.get('slug') ?? '').trim();
  const cat = String(fd.get('category') ?? '');
  return {
    slug: slugRaw ? slugify(slugRaw) : slugify(name_en),
    category: CATS.has(cat) ? cat : 'city',
    name_tr: String(fd.get('name_tr') ?? '').trim(),
    name_en,
    name_ar: String(fd.get('name_ar') ?? '').trim() || null,
    name_ru: String(fd.get('name_ru') ?? '').trim() || null,
    duration_hours: fd.get('duration_hours') ? Number(fd.get('duration_hours')) : null,
    price_from: fd.get('price_from') ? Number(fd.get('price_from')) : null,
    currency: String(fd.get('currency') ?? 'EUR') || 'EUR',
    cover_url: String(fd.get('cover_url') ?? '') || null,
    gallery: csv(String(fd.get('gallery') ?? '')),
    highlights_tr: csv(String(fd.get('highlights_tr') ?? '')),
    highlights_en: csv(String(fd.get('highlights_en') ?? '')),
    highlights_ar: csv(String(fd.get('highlights_ar') ?? '')),
    highlights_ru: csv(String(fd.get('highlights_ru') ?? '')),
    description_tr: String(fd.get('description_tr') ?? '') || null,
    description_en: String(fd.get('description_en') ?? '') || null,
    description_ar: String(fd.get('description_ar') ?? '') || null,
    description_ru: String(fd.get('description_ru') ?? '') || null,
    published: fd.get('published') === 'on',
    sort_order: fd.get('sort_order') ? Number(fd.get('sort_order')) : 0,
  };
}

export async function createTour(formData: FormData) {
  const payload = toPayload(formData);
  if (!payload.name_en || !payload.slug) return;
  const { error } = await supabase.from('istantrip_tours').insert(payload);
  if (error) throw error;
  revalidatePath('/admin/tours');
  revalidatePath('/');
  redirect('/admin/tours');
}

export async function updateTour(id: string, formData: FormData) {
  const payload = toPayload(formData);
  if (!payload.name_en || !payload.slug) return;
  const { error } = await supabase.from('istantrip_tours').update(payload).eq('id', id);
  if (error) throw error;
  revalidatePath('/admin/tours');
  revalidatePath('/');
  redirect('/admin/tours');
}

export async function deleteTour(id: string) {
  await supabase.from('istantrip_tours').delete().eq('id', id);
  revalidatePath('/admin/tours');
  revalidatePath('/');
  redirect('/admin/tours');
}
