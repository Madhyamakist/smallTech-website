'use client';

import { useCallback, useState } from 'react';

export type LeadStatus = 'OPEN' | 'CLOSED' | 'QUALIFYING';

export interface LeadRowData {
  session_id: string;
  name: string;
  email: string;
  mobile_number: string;
  country: string;
  status: LeadStatus;
  remarks?: string;
}

async function patchLeadAPI(
  update: Partial<Pick<LeadRowData, 'status' | 'remarks'>> & { session_id: string }
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat-info`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(update),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || 'Update failed');
  }
  return res.json();
}

export function useLeads(initial: LeadRowData[] = []) {
  const [rows, setRows] = useState<LeadRowData[]>(initial);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const patchLead = async (
    update: Partial<Pick<LeadRowData, 'status' | 'remarks'>> & { session_id: string }
  ) => {
    return patchLeadAPI(update);
  };

  const onChangeStatus = useCallback(async (session_id: string, status: LeadStatus) => {
    setRows((prev) => prev.map((r) => (r.session_id === session_id ? { ...r, status } : r)));
    setSaving((s) => ({ ...s, [session_id]: true }));
    try {
      await patchLead({ session_id, status });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving((s) => ({ ...s, [session_id]: false }));
    }
  }, []);

  const onSaveRemarks = useCallback(async (session_id: string, remarks: string) => {
    setSaving((s) => ({ ...s, [session_id]: true }));
    try {
      await patchLead({ session_id, remarks });
      setRows((prev) =>
        prev.map((r) => (r.session_id === session_id ? { ...r, remarks } : r))
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving((s) => ({ ...s, [session_id]: false }));
    }
  }, []);

  return {
    rows,
    error,
    saving,
    expanded,
    setExpanded,
    onChangeStatus,
    onSaveRemarks,
  };
}
