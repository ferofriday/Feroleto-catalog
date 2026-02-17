'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || 'Login failed');
      return;
    }
    router.push('/admin');
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-2xl text-dark mb-6">Admin login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="password" className="block text-sm font-medium text-dark">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-line rounded-sm bg-white text-dark focus:outline-none focus:ring-2 focus:ring-green/30"
            required
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green text-white font-medium py-3 rounded-sm hover:bg-green-mid"
          >
            Log in
          </button>
        </form>
      </div>
    </main>
  );
}
