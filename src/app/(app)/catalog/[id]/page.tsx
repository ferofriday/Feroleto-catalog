'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CatalogHeader } from '@/components/catalog-header';
import { usePicks } from '@/context/picks-context';

type Variety = {
  id: string;
  name: string;
  type_subtype: string | null;
  days_to_maturity: string | null;
  note: string | null;
  sort_order: number;
};

type CropType = {
  id: string;
  name: string;
  description: string | null;
  season: string | null;
  image_url: string | null;
  varieties: Variety[];
};

const PLACEHOLDER_CLASSES = ['placeholder-sage', 'placeholder-sand', 'placeholder-brown', 'placeholder-cream'] as const;

export default function CropTypeDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { addPick, removePick, hasPickedCropType, hasPickedVariety } = usePicks();
  const [cropType, setCropType] = useState<CropType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/catalog')
      .then((r) => r.json())
      .then((d: { categories: { crop_types: CropType[] }[] }) => {
        const all = d.categories?.flatMap((c) => c.crop_types) ?? [];
        const found = all.find((ct) => ct.id === id);
        setCropType(found ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const wholePicked = cropType ? hasPickedCropType(cropType.id) : false;

  if (loading) {
    return (
      <main className="min-h-screen bg-bg">
        <CatalogHeader />
        <div className="max-w-2xl mx-auto px-4 py-8 text-brown">Loading…</div>
      </main>
    );
  }
  if (!cropType) {
    return (
      <main className="min-h-screen bg-bg">
        <CatalogHeader />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <p className="text-brown mb-4">Crop type not found.</p>
          <Link href="/catalog" className="text-green underline">Back to catalog</Link>
        </div>
      </main>
    );
  }

  const placeholderClass = PLACEHOLDER_CLASSES[0];
  const hasImage = !!cropType.image_url;

  return (
    <main className="min-h-screen bg-bg pb-24">
      <CatalogHeader />
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-6">
        <Link href="/catalog" className="text-green text-sm hover:underline mb-4 inline-block">
          ← Back to catalog
        </Link>
        <div className="bg-white rounded-sm border border-line overflow-hidden mb-6">
          <div
            className={`aspect-[4/3] flex items-center justify-center ${hasImage ? 'relative bg-warm' : placeholderClass}`}
          >
            {hasImage ? (
              <Image
                src={cropType.image_url!}
                alt={cropType.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            ) : (
              <span className="font-display text-green text-3xl md:text-4xl text-center px-6 font-medium">
                {cropType.name}
              </span>
            )}
          </div>
          <div className="p-6">
            <h1 className="font-display text-2xl md:text-3xl text-dark mb-2">{cropType.name}</h1>
            {cropType.season && (
              <p className="text-brown mb-4">{cropType.season}</p>
            )}
            {cropType.description && (
              <p className="text-dark leading-relaxed mb-6">{cropType.description}</p>
            )}
            <button
              onClick={() => {
                if (wholePicked) return;
                addPick({
                  cropTypeId: cropType.id,
                  cropTypeName: cropType.name,
                  varietyId: null,
                  varietyName: null,
                });
              }}
              disabled={wholePicked}
              className={`w-full py-3 rounded-sm font-medium transition-colors ${
                wholePicked
                  ? 'bg-green-soft text-white cursor-default'
                  : 'bg-green text-white hover:bg-green-mid'
              }`}
            >
              {wholePicked ? '✓ I want this (added)' : 'I want this — you pick the varieties'}
            </button>
          </div>
        </div>
        <div className="bg-white rounded-sm border border-line p-6">
          <h2 className="font-display text-xl text-dark mb-4">Varieties</h2>
          <ul className="space-y-4">
            {cropType.varieties.map((v) => {
              const picked = hasPickedVariety(cropType.id, v.id);
              return (
                <li
                  key={v.id}
                  className={`flex flex-wrap items-start justify-between gap-2 py-3 border-b border-line last:border-0 ${
                    picked ? 'bg-warm/30 -mx-2 px-2 rounded' : ''
                  }`}
                >
                  <div>
                    <div className="font-medium text-dark">{v.name}</div>
                    {(v.type_subtype || v.days_to_maturity) && (
                      <div className="text-sm text-brown">
                        {[v.type_subtype, v.days_to_maturity].filter(Boolean).join(' · ')}
                      </div>
                    )}
                    {v.note && <p className="text-sm text-dark mt-1">{v.note}</p>}
                  </div>
                  <button
                    onClick={() => {
                      if (picked) {
                        removePick(cropType.id, v.id);
                      } else {
                        addPick({
                          cropTypeId: cropType.id,
                          cropTypeName: cropType.name,
                          varietyId: v.id,
                          varietyName: v.name,
                        });
                      }
                    }}
                    className={`shrink-0 px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
                      picked
                        ? 'bg-green-soft text-white'
                        : 'bg-white border border-green text-green hover:bg-green/10'
                    }`}
                  >
                    {picked ? '✓ Added' : 'Add'}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
