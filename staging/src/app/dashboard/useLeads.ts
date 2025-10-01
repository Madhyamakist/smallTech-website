'use client';

import { useCallback, useEffect, useState } from 'react';

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

export interface Message {
  sender: string;
  text: string;
}

interface HistoryItem {
  type: 'human' | 'ai';
  content: string;
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
  // keep rows in sync when initial changes (e.g., after parent fetch completes)
  useEffect(() => {
    setRows(initial || []);
  }, [initial]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [histories, setHistories] = useState<Record<string, Message[]>>({});
  const [historyLoading, setHistoryLoading] = useState<Record<string, boolean>>({});
  const [historyError, setHistoryError] = useState<Record<string, string | undefined>>({});

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

  const loadHistory = useCallback(async (session_id: string) => {
    if (historyLoading[session_id]) return;
    setHistoryLoading((m) => ({ ...m, [session_id]: true }));
    setHistoryError((m) => ({ ...m, [session_id]: undefined }));
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/history?session_id=${encodeURIComponent(session_id)}`;
      const res = await fetch(url, { method: 'GET' });
      const data = await res.json();
      if (res.ok) {
        const msgs: Message[] = (data.history as HistoryItem[] | undefined)?.map((h) => ({
          sender: h.type === 'human' ? 'You' : 'Bot',
          text: h.content,
        })) || [];
        setHistories((m) => ({ ...m, [session_id]: msgs }));
      } else {
        const err = (data && (data.error || data.message)) || 'Failed to load history';
        setHistoryError((m) => ({ ...m, [session_id]: String(err) }));
      }
    } catch (e) {
      setHistoryError((m) => ({ ...m, [session_id]: (e as Error).message }));
    } finally {
      setHistoryLoading((m) => ({ ...m, [session_id]: false }));
    }
  }, [historyLoading]);

  return {
    rows,
    error,
    saving,
    expanded,
    setExpanded,
    onChangeStatus,
    onSaveRemarks,
    histories,
    historyLoading,
    historyError,
    loadHistory,
  };
}
