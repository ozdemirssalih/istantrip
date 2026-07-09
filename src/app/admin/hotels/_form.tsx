import Link from 'next/link';
import { ImageUpload } from '../_components/ImageUpload';

type Hotel = {
  id?: string;
  slug?: string;
  name?: string;
  district?: string | null;
  price_from?: number | null;
  currency?: string | null;
  stars?: number | null;
  cover_url?: string | null;
  booking_url?: string | null;
  description_tr?: string | null;
  description_en?: string | null;
  description_ar?: string | null;
  description_ru?: string | null;
  amenities?: string[] | null;
  published?: boolean;
  sort_order?: number | null;
};

export function HotelForm({
  action,
  hotel,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  hotel?: Hotel;
  submitLabel: string;
}) {
  const amenitiesStr = (hotel?.amenities ?? []).join(', ');
  return (
    <form action={action} className="grid gap-5 md:grid-cols-2">
      <label className="text-sm">
        <span className="block mb-2 text-cream/80">Name *</span>
        <input name="name" required defaultValue={hotel?.name ?? ''} />
      </label>
      <label className="text-sm">
        <span className="block mb-2 text-cream/80">Slug (leave blank to auto-generate)</span>
        <input name="slug" defaultValue={hotel?.slug ?? ''} />
      </label>
      <label className="text-sm">
        <span className="block mb-2 text-cream/80">District</span>
        <input name="district" defaultValue={hotel?.district ?? ''} placeholder="Sultanahmet" />
      </label>
      <label className="text-sm">
        <span className="block mb-2 text-cream/80">Stars</span>
        <input name="stars" type="number" min={1} max={5} defaultValue={hotel?.stars ?? 5} />
      </label>
      <label className="text-sm">
        <span className="block mb-2 text-cream/80">Price from</span>
        <input name="price_from" type="number" min={0} defaultValue={hotel?.price_from ?? ''} />
      </label>
      <label className="text-sm">
        <span className="block mb-2 text-cream/80">Currency</span>
        <select name="currency" defaultValue={hotel?.currency ?? 'EUR'}>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="TRY">TRY</option>
          <option value="GBP">GBP</option>
        </select>
      </label>
      <div className="md:col-span-2">
        <ImageUpload
          name="cover_url"
          defaultValue={hotel?.cover_url ?? ''}
          scope="hotels"
          label="Cover image (upload or paste URL)"
        />
      </div>
      <label className="text-sm md:col-span-2">
        <span className="block mb-2 text-cream/80">Booking URL (optional)</span>
        <input name="booking_url" defaultValue={hotel?.booking_url ?? ''} />
      </label>
      <label className="text-sm md:col-span-2">
        <span className="block mb-2 text-cream/80">Amenities (comma-separated)</span>
        <input name="amenities" defaultValue={amenitiesStr} placeholder="Terrace, Breakfast, Spa" />
      </label>

      <label className="text-sm md:col-span-2">
        <span className="block mb-2 text-cream/80">Description — Türkçe</span>
        <textarea name="description_tr" rows={3} defaultValue={hotel?.description_tr ?? ''} />
      </label>
      <label className="text-sm md:col-span-2">
        <span className="block mb-2 text-cream/80">Description — English</span>
        <textarea name="description_en" rows={3} defaultValue={hotel?.description_en ?? ''} />
      </label>
      <label className="text-sm md:col-span-2">
        <span className="block mb-2 text-cream/80">Description — العربية</span>
        <textarea name="description_ar" rows={3} defaultValue={hotel?.description_ar ?? ''} dir="rtl" />
      </label>
      <label className="text-sm md:col-span-2">
        <span className="block mb-2 text-cream/80">Description — Русский</span>
        <textarea name="description_ru" rows={3} defaultValue={hotel?.description_ru ?? ''} />
      </label>

      <label className="text-sm">
        <span className="block mb-2 text-cream/80">Sort order</span>
        <input name="sort_order" type="number" defaultValue={hotel?.sort_order ?? 0} />
      </label>
      <label className="text-sm flex items-center gap-3 pt-8">
        <input name="published" type="checkbox" defaultChecked={hotel?.published ?? true} className="!w-4 !h-4 !p-0" />
        <span className="text-cream/80">Published</span>
      </label>

      <div className="md:col-span-2 flex items-center justify-between gap-4 pt-4">
        <Link href="/admin/hotels" className="text-cream/70 hover:text-cream text-sm">
          ← Back
        </Link>
        <button type="submit" className="btn-gold px-8 py-3 rounded-full text-sm">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
