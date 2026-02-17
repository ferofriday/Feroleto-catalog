import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin-auth';
import Link from 'next/link';
import { createServerClient } from '@/lib/supabase';

type SubRow = { id: string; client_name: string; status: string | null; created_at: string };

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');
  const supabase = createServerClient();
  const { data } = await supabase
    .from('client_submissions')
    .select('id, client_name, status, created_at')
    .order('created_at', { ascending: false })
    .limit(50);
  const submissions = (data ?? []) as SubRow[];
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl text-dark mb-6">Dashboard</h1>
      <p className="text-brown mb-6">Recent client submissions.</p>
      <ul className="space-y-2">
        {submissions.map((s) => (
          <li key={s.id} className="flex items-center gap-4 bg-white border border-line rounded-sm p-4">
            <div className="flex-1">
              <Link href={`/admin/submissions/${s.id}`} className="font-medium text-green hover:underline">
                {s.client_name}
              </Link>
              <span className="text-brown text-sm ml-2">
                {new Date(s.created_at).toLocaleDateString()}
              </span>
            </div>
            <span className={`text-sm px-2 py-1 rounded ${s.status === 'planted' ? 'bg-green-soft text-white' : s.status === 'planned' ? 'bg-sand text-dark' : 'bg-warm text-brown'}`}>
              {s.status ?? 'new'}
            </span>
          </li>
        ))}
      </ul>
      {submissions.length === 0 && (
        <p className="text-brown">No submissions yet.</p>
      )}
    </main>
  );
}
