import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, SESSION_MAX_AGE, checkPassword, issueSessionToken, verifySessionToken } from '@/lib/session';

async function login(formData: FormData) {
  'use server';
  const password = String(formData.get('password') ?? '');
  if (!checkPassword(password)) {
    redirect('/admin/login?e=1');
  }
  const jar = await cookies();
  jar.set(SESSION_COOKIE, issueSessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
  redirect('/admin');
}

export default async function LoginPage({ searchParams }: PageProps<'/admin/login'>) {
  const jar = await cookies();
  if (verifySessionToken(jar.get(SESSION_COOKIE)?.value)) redirect('/admin');
  const sp = await searchParams;
  const err = sp?.e === '1';
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0b0a08] text-cream px-6">
      <form action={login} className="w-full max-w-sm card-glass rounded-2xl p-8 space-y-5">
        <div className="text-center mb-2">
          <div className="font-display text-3xl">
            <span className="gold-gradient">Istan</span>trip
          </div>
          <div className="text-xs tracking-[0.3em] uppercase text-cream/60 mt-1">Admin</div>
        </div>
        <label className="block text-sm">
          <span className="block mb-2 text-cream/80">Password</span>
          <input name="password" type="password" required autoFocus />
        </label>
        {err && <p className="text-sm text-red-400">Invalid password.</p>}
        <button type="submit" className="btn-gold w-full py-3 rounded-full text-sm">
          Sign in
        </button>
      </form>
    </main>
  );
}
