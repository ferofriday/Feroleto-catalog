'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export interface PickItem {
  cropTypeId: string;
  cropTypeName: string;
  varietyId: string | null;
  varietyName: string | null;
  note: string;
}

const STORAGE_KEY = 'feroleto-picks';
const NAME_KEY = 'feroleto-client-name';

function loadPicks(): PickItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s) : [];
  } catch {
    return [];
  }
}

function savePicks(picks: PickItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(picks));
}

export function loadClientName(): string {
  if (typeof window === 'undefined') return '';
  const fromCookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('feroleto-client-name='))
    ?.split('=')[1];
  if (fromCookie) return decodeURIComponent(fromCookie);
  return localStorage.getItem(NAME_KEY) || '';
}

export function saveClientName(name: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(NAME_KEY, name);
}

interface PicksContextValue {
  picks: PickItem[];
  addPick: (item: Omit<PickItem, 'note'> & { note?: string }) => void;
  removePick: (cropTypeId: string, varietyId?: string | null) => void;
  updateNote: (cropTypeId: string, varietyId: string | null, note: string) => void;
  hasPickedCropType: (cropTypeId: string) => boolean;
  hasPickedVariety: (cropTypeId: string, varietyId: string) => boolean;
  clearPicks: () => void;
}

const PicksContext = createContext<PicksContextValue | null>(null);

export function PicksProvider({ children }: { children: React.ReactNode }) {
  const [picks, setPicks] = useState<PickItem[]>([]);
  useEffect(() => {
    setPicks(loadPicks());
  }, []);
  useEffect(() => {
    savePicks(picks);
  }, [picks]);

  const addPick = useCallback((item: Omit<PickItem, 'note'> & { note?: string }) => {
    setPicks((prev) => {
      const key = item.varietyId ? `${item.cropTypeId}:${item.varietyId}` : item.cropTypeId;
      if (prev.some((p) => (p.varietyId ? `${p.cropTypeId}:${p.varietyId}` : p.cropTypeId) === key)) return prev;
      return [...prev, { ...item, note: item.note ?? '' }];
    });
  }, []);

  const removePick = useCallback((cropTypeId: string, varietyId?: string | null) => {
    setPicks((prev) =>
      prev.filter(
        (p) => !(p.cropTypeId === cropTypeId && (varietyId === undefined || p.varietyId === varietyId))
      )
    );
  }, []);

  const updateNote = useCallback((cropTypeId: string, varietyId: string | null, note: string) => {
    setPicks((prev) =>
      prev.map((p) =>
        p.cropTypeId === cropTypeId && p.varietyId === varietyId ? { ...p, note } : p
      )
    );
  }, []);

  const hasPickedCropType = useCallback(
    (cropTypeId: string) => picks.some((p) => p.cropTypeId === cropTypeId && p.varietyId === null),
    [picks]
  );
  const hasPickedVariety = useCallback(
    (cropTypeId: string, varietyId: string) =>
      picks.some((p) => p.cropTypeId === cropTypeId && p.varietyId === varietyId),
    [picks]
  );
  const clearPicks = useCallback(() => setPicks([]), []);

  const value = useMemo(
    () => ({
      picks,
      addPick,
      removePick,
      updateNote,
      hasPickedCropType,
      hasPickedVariety,
      clearPicks,
    }),
    [picks, addPick, removePick, updateNote, hasPickedCropType, hasPickedVariety, clearPicks]
  );
  return <PicksContext.Provider value={value}>{children}</PicksContext.Provider>;
}

export function usePicks() {
  const ctx = useContext(PicksContext);
  if (!ctx) throw new Error('usePicks must be used within PicksProvider');
  return ctx;
}
