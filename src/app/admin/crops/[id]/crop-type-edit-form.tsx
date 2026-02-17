'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type CropType = {
  id: string;
  name: string;
  description: string | null;
  season: string | null;
  image_url: string | null;
  category_id: string;
};

type Variety = {
  id: string;
  name: string;
  type_subtype: string | null;
  days_to_maturity: string | null;
  note: string | null;
  sort_order: number;
};

export function CropTypeEditForm({ cropType, varieties }: { cropType: CropType; varieties: Variety[] }) {
  const router = useRouter();
  const [name, setName] = useState(cropType.name);
  const [description, setDescription] = useState(cropType.description ?? '');
  const [season, setSeason] = useState(cropType.season ?? '');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleSaveCropType() {
    setSaving(true);
    setError('');
    const res = await fetch('/api/admin/crop-type', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: cropType.id,
        name: name.trim(),
        description: description.trim() || null,
        season: season.trim() || null,
      }),
    });
    setSaving(false);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error || 'Failed to save');
      return;
    }
    router.refresh();
  }

  async function handleUploadPhoto(file: File) {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, WebP)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB');
      return;
    }
    setError('');
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    form.append('cropTypeId', cropType.id);
    const res = await fetch('/api/admin/upload-photo', { method: 'POST', body: form });
    setUploading(false);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error || 'Upload failed');
      return;
    }
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-line rounded-sm p-6">
        <h2 className="font-display text-lg text-dark mb-4">Edit crop type</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-line rounded-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-line rounded-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Season</label>
            <input
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="w-full px-3 py-2 border border-line rounded-sm"
              placeholder="e.g. Summer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Photo</label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleUploadPhoto(f);
              }}
              disabled={uploading}
              className="block text-sm text-brown disabled:opacity-60"
            />
            {uploading && <p className="text-sm text-brown mt-1">Uploading…</p>}
            {cropType.image_url && !uploading && (
              <p className="text-sm text-green mt-1">Current photo set. Upload a new file to replace.</p>
            )}
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            onClick={handleSaveCropType}
            disabled={saving}
            className="bg-green text-white px-4 py-2 rounded-sm font-medium disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
      <div className="bg-white border border-line rounded-sm p-6">
        <h2 className="font-display text-lg text-dark mb-4">Varieties</h2>
        <ul className="space-y-2">
          {varieties.map((v) => (
            <li key={v.id} className="flex justify-between items-center py-2 border-b border-line last:border-0">
              <span className="text-dark">{v.name}</span>
              <span className="text-sm text-brown">
                {[v.type_subtype, v.days_to_maturity].filter(Boolean).join(' · ')}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-brown mt-2">Add/edit varieties via Supabase dashboard or a future admin form.</p>
      </div>
    </div>
  );
}
