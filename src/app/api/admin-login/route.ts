import { NextRequest, NextResponse } from 'next/server';
import { setAdminSession, clearAdminSession } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { password, logout } = body;
  if (logout) {
    await clearAdminSession();
    return NextResponse.json({ ok: true });
  }
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json({ error: 'Admin not configured' }, { status: 500 });
  }
  if (password !== expected) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }
  await setAdminSession();
  return NextResponse.json({ ok: true });
}
