import { redirect, notFound } from 'next/navigation';
import { getAdminSession } from '@/lib/admin-auth';
import Link from 'next/link';
import { createServerClient } from '@/lib/supabase';
import type { CropType } from '@/types/database';
import { CropTypeEditForm } from './crop-type-edit-form';

export default async function AdminCropTypeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');
  const { id } = await params;
  const supabase = createServerClient();
  const { data } = await supabase
    .from('crop_types')
    .select('id, name, description, season, image_url, category_id')
    .eq('id', id)
    .single();
  if (!data) notFound();
  const cropType: Pick<CropType, 'id' | 'name' | 'description' | 'season' | 'image_url' | 'category_id'> = data;
  const { data: varieties } = await supabase
    .from('varieties')
    .select('id, name, type_subtype, days_to_maturity, note, sort_order')
    .eq('crop_type_id', id)
    .order('sort_order');
  const { count: selectionCount } = await supabase
    .from('submission_selections')
    .select('id', { count: 'exact', head: true })
    .eq('crop_type_id', id);
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/admin/crops" className="text-green text-sm hover:underline mb-4 inline-block">
        ← Crops
      </Link>
      <h1 className="font-display text-2xl text-dark mb-2">{cropType.name}</h1>
      <p className="text-brown text-sm mb-6">{selectionCount ?? 0} client picks</p>
      <CropTypeEditForm cropType={cropType} varieties={varieties ?? []} />
    </main>
  );
}
