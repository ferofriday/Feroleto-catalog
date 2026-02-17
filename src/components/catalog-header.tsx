'use client';

import Link from 'next/link';
import { usePicks } from '@/context/picks-context';

export function CatalogHeader() {
  const { picks } = usePicks();
  const count = picks.length;

  return (
    <header className="bg-white border-b border-line px-4 py-4 md:px-8 flex justify-between items-center sticky top-0 z-10">
      <Link href="/catalog" className="flex flex-col">
        <span className="font-display text-green text-lg tracking-wide">Feroleto Garden Co.</span>
        <span className="text-[10px] font-medium tracking-widest uppercase text-brown">What We Grow</span>
      </Link>
      {count > 0 && (
        <Link
          href="/review"
          className="flex items-center gap-2 bg-green text-white text-sm font-medium px-4 py-2 rounded-sm hover:bg-green-mid transition-colors"
        >
          <span>Your picks</span>
          <span className="bg-white/20 rounded-full px-2 py-0.5">{count}</span>
        </Link>
      )}
    </header>
  );
}
