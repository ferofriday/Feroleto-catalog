import { redirect, notFound } from 'next/navigation';
import { getAdminSession } from '@/lib/admin-auth';
import Link from 'next/link';
import { createServerClient } from '@/lib/supabase';
import { UpdateSubmissionStatus } from './update-status';

export default async function AdminSubmissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');
  const { id } = await params;
  const supabase = createServerClient();
  const { data: subData } = await supabase
    .from('client_submissions')
    .select('id, client_name, status, created_at')
    .eq('id', id)
    .single();
  if (!subData) notFound();
  const submission = subData as { id: string; client_name: string; status: string | null; created_at: string };
  const { data: selectionsData } = await supabase
    .from('submission_selections')
    .select(`
      id,
      note,
      crop_type_id,
      variety_id,
      crop_types(id, name),
      varieties(id, name)
    `)
    .eq('submission_id', id);
  type SelRow = { id: string; note: string | null; crop_types: { name: string } | null; varieties: { name: string } | null };
  const selections = (selectionsData ?? []) as SelRow[];
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/admin/submissions" className="text-green text-sm hover:underline mb-4 inline-block">
        ← Submissions
      </Link>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-dark">{submission.client_name}</h1>
          <p className="text-brown text-sm">{new Date(submission.created_at).toLocaleString()}</p>
        </div>
        <UpdateSubmissionStatus submissionId={id} currentStatus={submission.status} />
      </div>
      <ul className="space-y-3">
        {selections.map((s) => (
          <li key={s.id} className="bg-white border border-line rounded-sm p-4">
            <div className="font-medium text-dark">
              {s.crop_types?.name ?? 'Crop'}
              {s.varieties?.name && <span className="text-brown"> — {s.varieties.name}</span>}
            </div>
            {s.note && <p className="text-sm text-brown mt-1">{s.note}</p>}
          </li>
        ))}
      </ul>
      {selections.length === 0 && (
        <p className="text-brown">No selections.</p>
      )}
    </main>
  );
}
