import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { createServerClient } from '@/lib/supabase';

export async function PATCH(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const { submissionId, status } = body;
  if (!submissionId || !['new', 'planned', 'planted'].includes(status)) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  const supabase = createServerClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from('client_submissions')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', submissionId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
