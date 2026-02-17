'use client';

import { useEffect, useState } from 'react';
import { CatalogHeader } from '@/components/catalog-header';
import { CropTypeCard } from '@/components/crop-type-card';

type CropType = {
  id: string;
  name: string;
  description: string | null;
  season: string | null;
  image_url: string | null;
  category_id: string;
  sort_order: number;
  varieties: { id: string }[];
};

type Category = {
  id: string;
  name: string;
  sort_order: number;
  crop_types: CropType[];
};

export default function CatalogPage() {
  const [data, setData] = useState<{ categories: Category[]; error?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetch('/api/catalog')
      .then((r) => r.json().then((d) => ({ ok: r.ok, data: d })))
      .then(({ ok, data: d }) => {
        const categories = d?.categories ?? [];
        setData({
          categories: Array.isArray(categories) ? categories : [],
          error: !ok ? (d?.error || 'Connection failed') : undefined,
        });
        setLoading(false);
      })
      .catch(() => {
        setData({ categories: [], error: 'Connection failed' });
        setLoading(false);
      });
  }, []);

  const categories = data?.categories ?? [];
  const cropTypes = categories.flatMap((c) => c.crop_types);
  const filtered =
    filter === 'all'
      ? cropTypes
      : cropTypes.filter((ct) => {
          const cat = categories.find((c) => c.id === ct.category_id);
          return cat?.name === filter;
        });

  return (
    <main className="min-h-screen bg-bg">
      <CatalogHeader />
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="mb-6">
          <h1 className="font-display text-3xl md:text-4xl text-dark mb-2">What we grow</h1>
          <p className="text-brown">Browse by category and click a card to see varieties.</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
              filter === 'all' ? 'bg-green text-white' : 'bg-white border border-line text-dark hover:bg-warm'
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.name)}
              className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
                filter === c.name ? 'bg-green text-white' : 'bg-white border border-line text-dark hover:bg-warm'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-sm border border-line overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-warm/30" />
                <div className="p-4 space-y-2">
                  <div className="h-5 bg-warm/40 rounded w-3/4" />
                  <div className="h-4 bg-warm/30 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : data?.error || filtered.length === 0 ? (
          <div className="bg-white border border-line rounded-sm p-8 text-center max-w-md mx-auto">
            <p className="text-dark font-medium mb-2">
              {data?.error ? 'Connection failed' : 'No crops loaded'}
            </p>
            <p className="text-brown text-sm">
              {data?.error
                ? 'Start the dev server with npm run dev and add Supabase to .env.local to load the catalog.'
                : 'Add NEXT_PUBLIC_SUPABASE_URL and keys to .env.local, run the schema and npm run seed.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((ct, i) => (
              <CropTypeCard key={ct.id} cropType={ct} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
