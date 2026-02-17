import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import type { Category, CropType, Variety } from '@/types/database';

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()) {
    return NextResponse.json({ categories: [] });
  }
  try {
    const supabase = createServerClient();
    const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('id, name, sort_order')
    .order('sort_order');
  if (catError) {
    console.error(catError);
    return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
  }
  const { data: cropTypes, error: ctError } = await supabase
    .from('crop_types')
    .select('id, category_id, name, description, season, image_url, sort_order, created_at, updated_at')
    .order('sort_order');
  if (ctError) {
    console.error(ctError);
    return NextResponse.json({ error: 'Failed to load crop types' }, { status: 500 });
  }
  const { data: varieties, error: vError } = await supabase
    .from('varieties')
    .select('id, crop_type_id, name, type_subtype, days_to_maturity, season, note, sort_order, created_at, updated_at')
    .order('sort_order');
  if (vError) {
    console.error(vError);
    return NextResponse.json({ error: 'Failed to load varieties' }, { status: 500 });
  }
  const catMap = new Map<string, Category & { crop_types: CropType[] }>(
    (categories ?? []).map((c: Category) => [c.id, { ...c, crop_types: [] as CropType[] }])
  );
  const ctMap = new Map(
    (cropTypes ?? []).map((ct: CropType) => [
      ct.id,
      { ...ct, varieties: (varieties ?? []).filter((v: Variety) => v.crop_type_id === ct.id) ?? [] },
    ])
  );
  catMap.forEach((cat) => {
    (cropTypes ?? []).filter((ct: CropType) => ct.category_id === cat.id).forEach((ct: CropType) => {
      const full = ctMap.get(ct.id);
      if (full) cat.crop_types.push(full);
    });
    cat.crop_types.sort((a, b) => a.sort_order - b.sort_order);
  });
  const sorted = ((categories ?? []) as Category[])
    .sort((a: Category, b: Category) => a.sort_order - b.sort_order)
    .map((c: Category) => catMap.get(c.id))
    .filter(Boolean);
  return NextResponse.json({ categories: sorted });
  } catch (err) {
    console.error('Catalog API error:', err);
    return NextResponse.json({ categories: [], error: 'Connection failed' });
  }
}
