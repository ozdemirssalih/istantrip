import 'server-only';
import { supabase } from './supabase';
import type { Locale } from '@/app/[lang]/dictionaries';

export type Hotel = {
  id: string;
  slug: string;
  name: string;
  district: string | null;
  price_from: number | null;
  currency: string | null;
  stars: number | null;
  cover_url: string | null;
  booking_url: string | null;
  description_tr: string | null;
  description_en: string | null;
  description_ar: string | null;
  description_ru: string | null;
  amenities: string[] | null;
  published: boolean;
  sort_order: number | null;
};

export type Tour = {
  id: string;
  slug: string;
  category: 'bosphorus' | 'city' | 'transfer' | 'experience';
  name_tr: string;
  name_en: string;
  name_ar: string | null;
  name_ru: string | null;
  duration_hours: number | null;
  price_from: number | null;
  currency: string | null;
  cover_url: string | null;
  gallery: string[] | null;
  highlights_tr: string[] | null;
  highlights_en: string[] | null;
  highlights_ar: string[] | null;
  highlights_ru: string[] | null;
  description_tr: string | null;
  description_en: string | null;
  description_ar: string | null;
  description_ru: string | null;
  published: boolean;
  sort_order: number | null;
};

export function hotelDesc(h: Hotel, locale: Locale): string {
  const map = {
    tr: h.description_tr,
    en: h.description_en,
    ar: h.description_ar,
    ru: h.description_ru,
  } as const;
  return map[locale] ?? h.description_en ?? h.description_tr ?? '';
}

export function tourName(t: Tour, locale: Locale): string {
  const map = {
    tr: t.name_tr,
    en: t.name_en,
    ar: t.name_ar,
    ru: t.name_ru,
  } as const;
  return map[locale] ?? t.name_en ?? t.name_tr;
}

export function tourDesc(t: Tour, locale: Locale): string {
  const map = {
    tr: t.description_tr,
    en: t.description_en,
    ar: t.description_ar,
    ru: t.description_ru,
  } as const;
  return map[locale] ?? t.description_en ?? t.description_tr ?? '';
}

export function tourHighlights(t: Tour, locale: Locale): string[] {
  const map = {
    tr: t.highlights_tr,
    en: t.highlights_en,
    ar: t.highlights_ar,
    ru: t.highlights_ru,
  } as const;
  return map[locale] ?? t.highlights_en ?? t.highlights_tr ?? [];
}

export async function listHotels() {
  const { data } = await supabase
    .from('istantrip_hotels')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  return (data ?? []) as Hotel[];
}

export async function getHotel(slug: string) {
  const { data } = await supabase
    .from('istantrip_hotels')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
  return data as Hotel | null;
}

export async function listTours() {
  const { data } = await supabase
    .from('istantrip_tours')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  return (data ?? []) as Tour[];
}

export async function getTour(slug: string) {
  const { data } = await supabase
    .from('istantrip_tours')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
  return data as Tour | null;
}
