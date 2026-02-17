'use client';

import Link from 'next/link';
import Image from 'next/image';

const PLACEHOLDER_CLASSES = ['placeholder-sage', 'placeholder-sand', 'placeholder-brown', 'placeholder-cream'] as const;

type CropType = {
  id: string;
  name: string;
  description: string | null;
  season: string | null;
  image_url: string | null;
  category_id?: string;
  sort_order?: number;
};

export function CropTypeCard({ cropType, index }: { cropType: CropType; index: number }) {
  const placeholderClass = PLACEHOLDER_CLASSES[index % PLACEHOLDER_CLASSES.length];
  const hasImage = !!cropType.image_url;

  return (
    <Link
      href={`/catalog/${cropType.id}`}
      className="block bg-white rounded-sm border border-line overflow-hidden hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-green/30"
    >
      <div
        className={`aspect-[4/3] flex items-center justify-center ${hasImage ? 'relative bg-warm' : placeholderClass}`}
      >
        {hasImage ? (
          <Image
            src={cropType.image_url!}
            alt={cropType.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <span className="font-display text-green text-2xl md:text-3xl text-center px-4 font-medium">
            {cropType.name}
          </span>
        )}
      </div>
      <div className="p-4">
        <h2 className="font-display text-dark text-xl mb-1">{cropType.name}</h2>
        {cropType.season && (
          <p className="text-sm text-brown">{cropType.season}</p>
        )}
      </div>
    </Link>
  );
}
