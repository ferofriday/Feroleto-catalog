import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const name = formData.get('clientName')?.toString()?.trim() ?? '';
  const res = NextResponse.json({ ok: true });
  res.cookies.set('feroleto-client-name', name || '', {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    httpOnly: false, // so client JS can read it for submit
    sameSite: 'lax',
  });
  return res;
}
