'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Upload, X, GripVertical } from 'lucide-react';

export function MultiImageUpload({
  name,
  defaultValue,
  scope,
  label,
}: {
  name: string;
  defaultValue?: string[] | null;
  scope: string;
  label: string;
}) {
  const [items, setItems] = useState<string[]>(defaultValue ?? []);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);

  async function uploadOne(file: File): Promise<string | null> {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('scope', scope);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const json = await res.json();
    if (!res.ok || !json.ok) return null;
    return json.url as string;
  }

  async function onPick(files: FileList) {
    setBusy(true);
    setErr(null);
    try {
      const uploaded: string[] = [];
      for (const f of Array.from(files)) {
        const url = await uploadOne(f);
        if (url) uploaded.push(url);
        else {
          setErr(`upload failed: ${f.name}`);
        }
      }
      if (uploaded.length) setItems((prev) => [...prev, ...uploaded]);
    } finally {
      setBusy(false);
    }
  }

  function addUrl() {
    const v = urlRef.current?.value.trim();
    if (!v) return;
    setItems((prev) => [...prev, v]);
    if (urlRef.current) urlRef.current.value = '';
  }

  function removeAt(i: number) {
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  }

  function onDragStart(i: number) {
    setDragIdx(i);
  }
  function onDragOver(e: React.DragEvent, i: number) {
    e.preventDefault();
    if (dragIdx === null || dragIdx === i) return;
    setItems((prev) => {
      const next = [...prev];
      const [m] = next.splice(dragIdx, 1);
      next.splice(i, 0, m);
      setDragIdx(i);
      return next;
    });
  }
  function onDragEnd() {
    setDragIdx(null);
  }

  return (
    <div className="text-sm">
      <span className="block mb-2 text-cream/80">{label}</span>

      {items.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
          {items.map((src, i) => (
            <div
              key={`${src}-${i}`}
              draggable
              onDragStart={() => onDragStart(i)}
              onDragOver={(e) => onDragOver(e, i)}
              onDragEnd={onDragEnd}
              className={`relative aspect-[4/3] rounded-lg overflow-hidden bg-white/5 border border-white/10 group ${
                dragIdx === i ? 'opacity-60' : ''
              }`}
            >
              <Image src={src} alt="" fill sizes="200px" className="object-cover" />
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="absolute top-1.5 end-1.5 inline-flex w-6 h-6 items-center justify-center rounded-full bg-black/75 text-white"
              >
                <X size={12} />
              </button>
              <div className="absolute top-1.5 start-1.5 inline-flex items-center gap-1 px-1.5 py-1 rounded bg-black/70 text-[10px] text-cream/80">
                <GripVertical size={10} /> {i + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-white/15 text-xs text-cream/85 hover:border-[color:var(--gold)]/50 disabled:opacity-50 whitespace-nowrap"
        >
          <Upload size={12} />
          {busy ? 'Uploading…' : 'Upload files'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden !p-0"
          onChange={(e) => {
            if (e.currentTarget.files) void onPick(e.currentTarget.files);
            e.currentTarget.value = '';
          }}
        />
        <div className="flex gap-2 flex-1">
          <input
            ref={urlRef}
            type="url"
            placeholder="…or paste an image URL"
            className="!py-2 text-xs"
          />
          <button
            type="button"
            onClick={addUrl}
            className="text-xs px-4 py-2 rounded-full border border-white/15 text-cream/80 hover:border-[color:var(--gold)]/40"
          >
            Add
          </button>
        </div>
      </div>
      {err && <p className="text-xs text-red-400 mt-2">{err}</p>}
      <p className="text-[11px] text-cream/50 mt-2">
        Drag thumbnails to reorder. First one is used as the cover-adjacent gallery start.
      </p>

      <input type="hidden" name={name} value={JSON.stringify(items)} />
    </div>
  );
}
