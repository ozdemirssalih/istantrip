import 'server-only';
import { createHmac, timingSafeEqual } from 'crypto';

const SECRET = process.env.SESSION_SECRET;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!SECRET || !ADMIN_PASSWORD) {
  // Fail loud on the server side, but only when the module is used.
  // We don't throw at import time to keep static builds happy.
}

export const SESSION_COOKIE = 'istantrip_admin';
export const SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours

function sign(payload: string): string {
  if (!SECRET) throw new Error('SESSION_SECRET missing');
  return createHmac('sha256', SECRET).update(payload).digest('hex');
}

export function issueSessionToken(): string {
  const expires = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const payload = `admin.${expires}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token || !SECRET) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [role, expiresStr, mac] = parts;
  if (role !== 'admin') return false;
  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || expires < Math.floor(Date.now() / 1000)) return false;
  const expected = sign(`${role}.${expiresStr}`);
  try {
    const a = Buffer.from(mac, 'hex');
    const b = Buffer.from(expected, 'hex');
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function checkPassword(input: string): boolean {
  if (!ADMIN_PASSWORD) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(ADMIN_PASSWORD);
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
