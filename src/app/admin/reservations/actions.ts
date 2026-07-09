'use server';

import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

const ALLOWED = new Set(['new', 'contacted', 'confirmed', 'done', 'cancelled']);

export async function updateStatus(formData: FormData) {
  const id = String(formData.get('id') ?? '');
  const status = String(formData.get('status') ?? '');
  if (!id || !ALLOWED.has(status)) return;
  await supabase.from('istantrip_reservations').update({ status }).eq('id', id);
  revalidatePath('/admin/reservations');
  revalidatePath('/admin');
}
