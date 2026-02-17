import { getAdminSession } from '@/lib/admin-auth';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  return (
    <div className="min-h-screen bg-bg">
      {session && (
        <header className="bg-white border-b border-line px-4 py-3 flex items-center justify-between">
          <Link href="/admin" className="font-display text-green text-lg">Admin</Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/admin" className="text-brown hover:text-dark">Dashboard</Link>
            <Link href="/admin/crops" className="text-brown hover:text-dark">Crops</Link>
            <Link href="/admin/submissions" className="text-brown hover:text-dark">Submissions</Link>
          </nav>
        </header>
      )}
      {children}
    </div>
  );
}
