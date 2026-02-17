'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function UpdateSubmissionStatus({
  submissionId,
  currentStatus,
}: {
  submissionId: string;
  currentStatus: string | null;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus ?? 'new');
  const [saving, setSaving] = useState(false);

  async function handleChange(newStatus: string) {
    setSaving(true);
    const res = await fetch('/api/admin/submission-status', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ submissionId, status: newStatus }),
    });
    setSaving(false);
    if (res.ok) {
      setStatus(newStatus);
      router.refresh();
    }
  }

  return (
    <div className="flex gap-2">
      {['new', 'planned', 'planted'].map((s) => (
        <button
          key={s}
          onClick={() => handleChange(s)}
          disabled={saving}
          className={`px-3 py-1.5 rounded text-sm font-medium capitalize ${
            status === s ? 'bg-green text-white' : 'bg-warm text-brown hover:bg-sand'
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
