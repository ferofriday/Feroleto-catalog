import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin-auth';
import Link from 'next/link';
import { createServerClient } from '@/lib/supabase';

type CatRow = { id: string; name: string; sort_order: number };
type CropTypeRow = { id: string; category_id: string; name: string; sort_order: number };

export default async function AdminCropsPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');
  const supabase = createServerClient();
  const { data: categoriesData } = await supabase
    .from('categories')
    .select('id, name, sort_order')
    .order('sort_order');
  const { data: cropTypesData } = await supabase
    .from('crop_types')
    .select('id, category_id, name, sort_order')
    .order('sort_order');
  const categories = (categoriesData ?? []) as CatRow[];
  const cropTypes = (cropTypesData ?? []) as CropTypeRow[];
  const { data: selections } = await supabase
    .from('submission_selections')
    .select('crop_type_id, variety_id');
  const countByCropType: Record<string, number> = {};
  const countByVariety: Record<string, number> = {};
  ((selections ?? []) as { crop_type_id: string; variety_id: string | null }[]).forEach((s) => {
    countByCropType[s.crop_type_id] = (countByCropType[s.crop_type_id] ?? 0) + 1;
    if (s.variety_id) {
      countByVariety[s.variety_id] = (countByVariety[s.variety_id] ?? 0) + 1;
    }
  });
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl text-dark mb-2">Crops</h1>
      <p className="text-brown mb-6">View by crop: how many clients want each crop type or variety.</p>
      <div className="space-y-6">
        {categories.map((cat) => {
          const cts = cropTypes.filter((ct) => ct.category_id === cat.id);
          return (
            <div key={cat.id}>
              <h2 className="font-display text-lg text-dark mb-2">{cat.name}</h2>
              <ul className="space-y-2">
                {cts.map((ct) => (
                  <li key={ct.id} className="bg-white border border-line rounded-sm p-3 flex items-center justify-between">
                    <Link href={`/admin/crops/${ct.id}`} className="text-green hover:underline font-medium">
                      {ct.name}
                    </Link>
                    <span className="text-brown text-sm">{countByCropType[ct.id] ?? 0} picks</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </main>
  );
}

