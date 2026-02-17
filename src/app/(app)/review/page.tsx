'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CatalogHeader } from '@/components/catalog-header';
import { usePicks, loadClientName } from '@/context/picks-context';

export default function ReviewPage() {
  const { picks, updateNote, removePick } = usePicks();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clientName = loadClientName();

  async function handleSubmit() {
    if (!clientName?.trim()) {
      setError('Please enter your name on the welcome page first.');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: clientName.trim(),
          selections: picks.map((p) => ({
            cropTypeId: p.cropTypeId,
            varietyId: p.varietyId,
            note: p.note?.trim() || null,
          })),
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || 'Submission failed');
      }
      router.push('/confirm');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-bg pb-24">
      <CatalogHeader />
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-8">
        <h1 className="font-display text-3xl text-dark mb-2">Review your picks</h1>
        <p className="text-brown mb-6">
          Add optional notes for any selection (e.g. &quot;plant near the patio&quot;). Then submit.
        </p>
        {picks.length === 0 ? (
          <div className="bg-white border border-line rounded-sm p-6 text-center text-brown">
            <p className="mb-4">You haven&apos;t added any picks yet.</p>
            <Link href="/catalog" className="text-green underline">
              Browse the catalog
            </Link>
          </div>
        ) : (
          <>
            <ul className="space-y-4 mb-8">
              {picks.map((p) => (
                <li
                  key={p.varietyId ? `${p.cropTypeId}-${p.varietyId}` : p.cropTypeId}
                  className="bg-white border border-line rounded-sm p-4"
                >
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <div>
                      <span className="font-medium text-dark">{p.cropTypeName}</span>
                      {p.varietyName && (
                        <span className="text-brown"> — {p.varietyName}</span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removePick(p.cropTypeId, p.varietyId)}
                      className="text-sm text-brown hover:text-dark underline"
                    >
                      Remove
                    </button>
                  </div>
                  <label className="block text-sm text-brown mb-1">Note (optional)</label>
                  <input
                    type="text"
                    value={p.note}
                    onChange={(e) => updateNote(p.cropTypeId, p.varietyId, e.target.value)}
                    placeholder="e.g. plant near the patio"
                    className="w-full px-3 py-2 border border-line rounded-sm text-dark placeholder-sand focus:outline-none focus:ring-2 focus:ring-green/30"
                  />
                </li>
              ))}
            </ul>
            {error && (
              <p className="text-red-600 mb-4">{error}</p>
            )}
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-green text-white font-medium py-3 rounded-sm hover:bg-green-mid transition-colors disabled:opacity-60"
            >
              {submitting ? 'Submitting…' : 'Submit my picks'}
            </button>
          </>
        )}
      </div>
    </main>
  );
}
