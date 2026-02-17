import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'admin_session';
const MAX_AGE = 60 * 60 * 24; // 24 hours

function getSecret() {
  const s = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || 'dev-secret';
  return s;
}

export function signSession(timestamp: string): string {
  const secret = getSecret();
  const hmac = createHmac('sha256', secret).update(timestamp).digest('hex');
  return `${timestamp}.${hmac}`;
}

export function verifySession(value: string): boolean {
  const parts = value.split('.');
  if (parts.length !== 2) return false;
  const [timestamp, sig] = parts;
  const expected = signSession(timestamp);
  try {
    return timingSafeEqual(Buffer.from(value, 'utf8'), Buffer.from(expected, 'utf8'));
  } catch {
    return false;
  }
}

export function isSessionValid(value: string): boolean {
  const parts = value.split('.');
  if (parts.length !== 2) return false;
  const timestamp = parseInt(parts[0], 10);
  if (Number.isNaN(timestamp)) return false;
  if (Date.now() - timestamp > MAX_AGE * 1000) return false;
  return verifySession(value);
}

export async function getAdminSession(): Promise<string | null> {
  const c = await cookies();
  const cookie = c.get(COOKIE_NAME)?.value;
  if (!cookie || !isSessionValid(cookie)) return null;
  return cookie;
}

export async function setAdminSession(): Promise<string> {
  const timestamp = Date.now().toString();
  const value = signSession(timestamp);
  const c = await cookies();
  c.set(COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  });
  return value;
}

export async function clearAdminSession() {
  const c = await cookies();
  c.delete(COOKIE_NAME);
}
