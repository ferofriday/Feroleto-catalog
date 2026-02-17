'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePicks } from '@/context/picks-context';

export default function ConfirmPage() {
  const { clearPicks } = usePicks();
  useEffect(() => {
    clearPicks();
  }, [clearPicks]);

  return (
    <main className="min-h-screen bg-bg flex flex-col">
      <header className="bg-white border-b border-line px-4 py-5 md:px-8">
        <div className="font-display text-green text-lg tracking-wide">Feroleto Garden Co.</div>
        <div className="text-[10px] font-medium tracking-widest uppercase text-brown">What We Grow</div>
      </header>
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-md text-center">
          <h1 className="font-display text-3xl md:text-4xl text-dark mb-4">
            Thank you
          </h1>
          <p className="text-brown text-lg mb-8">
            Your selections have been submitted. We&apos;ll be in touch about your garden.
          </p>
          <Link
            href="/catalog"
            className="inline-block bg-green text-white font-medium px-8 py-3 rounded-sm hover:bg-green-mid transition-colors"
          >
            Back to catalog
          </Link>
        </div>
      </div>
    </main>
  );
}
