import Link from 'next/link';
import { ImageUpload } from '../_components/ImageUpload';

type Tour = {
  id?: string;
  slug?: string;
  category?: string;
  name_tr?: string;
  name_en?: string;
  name_ar?: string | null;
  name_ru?: string | null;
  duration_hours?: number | null;
  price_from?: number | null;
  currency?: string | null;
  cover_url?: string | null;
  gallery?: string[] | null;
  highlights_tr?: string[] | null;
  highlights_en?: string[] | null;
  highlights_ar?: string[] | null;
  highlights_ru?: string[] | null;
  description_tr?: string | null;
  description_en?: string | null;
  description_ar?: string | null;
  description_ru?: string | null;
  published?: boolean;
  sort_order?: number | null;
};

const joinLines = (v?: string[] | null) => (v ?? []).join('\n');
const joinCsv = (v?: string[] | null) => (v ?? []).join(', ');

export function TourForm({
  action,
  tour,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  tour?: Tour;
  submitLabel: string;
}) {
  return (
    <form action={action} className="grid gap-5 md:grid-cols-2">
      <label className="text-sm">
        <span className="block mb-2 text-cream/80">Slug (auto if blank)</span>
        <input name="slug" defaultValue={tour?.slug ?? ''} />
      </label>
      <label className="text-sm">
        <span className="block mb-2 text-cream/80">Category *</span>
        <select name="category" defaultValue={tour?.category ?? 'city'}>
          <option value="bosphorus">Bosphorus</option>
          <option value="city">City</option>
          <option value="experience">Experience</option>
          <option value="transfer">Transfer</option>
        </select>
      </label>

      <label className="text-sm">
        <span className="block mb-2 text-cream/80">Name — Türkçe *</span>
        <input name="name_tr" required defaultValue={tour?.name_tr ?? ''} />
      </label>
      <label className="text-sm">
        <span className="block mb-2 text-cream/80">Name — English *</span>
        <input name="name_en" required defaultValue={tour?.name_en ?? ''} />
      </label>
      <label className="text-sm">
        <span className="block mb-2 text-cream/80">Name — العربية</span>
        <input name="name_ar" defaultValue={tour?.name_ar ?? ''} dir="rtl" />
      </label>
      <label className="text-sm">
        <span className="block mb-2 text-cream/80">Name — Русский</span>
        <input name="name_ru" defaultValue={tour?.name_ru ?? ''} />
      </label>

      <label className="text-sm">
        <span className="block mb-2 text-cream/80">Duration (hours)</span>
        <input name="duration_hours" type="number" step="0.5" defaultValue={tour?.duration_hours ?? ''} />
      </label>
      <label className="text-sm">
        <span className="block mb-2 text-cream/80">Price from</span>
        <input name="price_from" type="number" min={0} defaultValue={tour?.price_from ?? ''} />
      </label>
      <label className="text-sm">
        <span className="block mb-2 text-cream/80">Currency</span>
        <select name="currency" defaultValue={tour?.currency ?? 'EUR'}>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="TRY">TRY</option>
          <option value="GBP">GBP</option>
        </select>
      </label>
      <label className="text-sm">
        <span className="block mb-2 text-cream/80">Sort order</span>
        <input name="sort_order" type="number" defaultValue={tour?.sort_order ?? 0} />
      </label>

      <div className="md:col-span-2">
        <ImageUpload
          name="cover_url"
          defaultValue={tour?.cover_url ?? ''}
          scope="tours"
          label="Cover image (upload or paste URL)"
        />
      </div>

      <label className="text-sm md:col-span-2">
        <span className="block mb-2 text-cream/80">Gallery URLs (comma-separated or new lines)</span>
        <textarea name="gallery" rows={3} defaultValue={joinLines(tour?.gallery)} placeholder="https://... , https://..." />
      </label>

      <label className="text-sm md:col-span-2">
        <span className="block mb-2 text-cream/80">Highlights — Türkçe (comma-separated)</span>
        <input name="highlights_tr" defaultValue={joinCsv(tour?.highlights_tr)} />
      </label>
      <label className="text-sm md:col-span-2">
        <span className="block mb-2 text-cream/80">Highlights — English (comma-separated)</span>
        <input name="highlights_en" defaultValue={joinCsv(tour?.highlights_en)} />
      </label>
      <label className="text-sm md:col-span-2">
        <span className="block mb-2 text-cream/80">Highlights — العربية (comma-separated)</span>
        <input name="highlights_ar" defaultValue={joinCsv(tour?.highlights_ar)} dir="rtl" />
      </label>
      <label className="text-sm md:col-span-2">
        <span className="block mb-2 text-cream/80">Highlights — Русский (comma-separated)</span>
        <input name="highlights_ru" defaultValue={joinCsv(tour?.highlights_ru)} />
      </label>

      <label className="text-sm md:col-span-2">
        <span className="block mb-2 text-cream/80">Description — Türkçe</span>
        <textarea name="description_tr" rows={3} defaultValue={tour?.description_tr ?? ''} />
      </label>
      <label className="text-sm md:col-span-2">
        <span className="block mb-2 text-cream/80">Description — English</span>
        <textarea name="description_en" rows={3} defaultValue={tour?.description_en ?? ''} />
      </label>
      <label className="text-sm md:col-span-2">
        <span className="block mb-2 text-cream/80">Description — العربية</span>
        <textarea name="description_ar" rows={3} defaultValue={tour?.description_ar ?? ''} dir="rtl" />
      </label>
      <label className="text-sm md:col-span-2">
        <span className="block mb-2 text-cream/80">Description — Русский</span>
        <textarea name="description_ru" rows={3} defaultValue={tour?.description_ru ?? ''} />
      </label>

      <label className="text-sm flex items-center gap-3 pt-2">
        <input name="published" type="checkbox" defaultChecked={tour?.published ?? true} className="!w-4 !h-4 !p-0" />
        <span className="text-cream/80">Published</span>
      </label>

      <div className="md:col-span-2 flex items-center justify-between gap-4 pt-4">
        <Link href="/admin/tours" className="text-cream/70 hover:text-cream text-sm">
          ← Back
        </Link>
        <button type="submit" className="btn-gold px-8 py-3 rounded-full text-sm">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
