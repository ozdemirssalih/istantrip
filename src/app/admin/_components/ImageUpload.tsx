'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

export function ImageUpload({
  name,
  defaultValue,
  scope,
  label,
}: {
  name: string;
  defaultValue?: string | null;
  scope: string;
  label: string;
}) {
  const [value, setValue] = useState<string>(defaultValue ?? '');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function onPick(file: File) {
    setBusy(true);
    setErr(null);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('scope', scope);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setErr(json.error ?? 'upload_failed');
        return;
      }
      setValue(json.url);
    } catch {
      setErr('network');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="text-sm">
      <span className="block mb-2 text-cream/80">{label}</span>
      <div className="flex items-start gap-4">
        <div className="relative w-32 h-24 rounded-lg overflow-hidden bg-white/5 border border-white/10 shrink-0">
          {value ? (
            <>
              <Image src={value} alt="" fill sizes="128px" className="object-cover" />
              <button
                type="button"
                onClick={() => setValue('')}
                className="absolute top-1 end-1 inline-flex w-6 h-6 items-center justify-center rounded-full bg-black/70 text-white"
              >
                <X size={12} />
              </button>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-cream/40 text-xs">
              —
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            type="url"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="https://..."
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/15 text-xs text-cream/85 hover:border-[color:var(--gold)]/50 disabled:opacity-50"
            >
              <Upload size={12} />
              {busy ? 'Uploading…' : 'Upload file'}
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden !p-0"
              onChange={(e) => {
                const f = e.currentTarget.files?.[0];
                if (f) void onPick(f);
                e.currentTarget.value = '';
              }}
            />
            {err && <span className="text-xs text-red-400">{err}</span>}
          </div>
        </div>
      </div>
      <input type="hidden" name={name} value={value} />
    </div>
  );
}
