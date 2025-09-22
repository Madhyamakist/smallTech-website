'use client';

import { useCallback, useEffect, useState } from 'react';

export type LeadStatus = 'OPEN' | 'CLOSED' | 'QUALIFYING';

interface LeadRowData {
    session_id: string;
    name: string;
    email: string;
    mobile_number: string;
    country: string;
    status: LeadStatus;
    remarks?: string;
}

// toggle mock vs API
const use_mockData = false;


const MOCK_LEADS: LeadRowData[] = [
    {
        session_id: '465017cb-b353-4037-ab14-d6f71814c773',
        name: 'Navya',
        email: 'navya@gmail.com',
        mobile_number: '+91-900000001',
        country: 'India',
        status: 'OPEN',
        remarks: 'First contact created',
    },
    {
        session_id: '565017cb-b353-4037-ab14-d6f71814c774',
        name: 'Divya',
        email: 'divya@gmail.com',
        mobile_number: '+91-900000002',
        country: 'India',
        status: 'OPEN',
        remarks: 'Closed after email follow-up (example)',
    },
    {
        session_id: '665017cb-b353-4037-ab14-d6f71814c775',
        name: 'Divya',
        email: 'divya@gmail.com',
        mobile_number: '+91-900000003',
        country: 'India',
        status: 'OPEN',
        remarks: 'Qualifying lead – demo pending (example)',
    },
    {
        session_id: '765017cb-b353-4037-ab14-d6f71814c776',
        name: 'Vivek Agarwal',
        email: 'vivek@example.com',
        mobile_number: '+91-9876543210',
        country: 'India',
        status: 'OPEN',
        remarks: 'Requested brochure',
    },
    {
        session_id: '865017cb-b353-4037-ab14-d6f71814c777',
        name: 'Aisha Khan',
        email: 'aisha.khan@example.com',
        mobile_number: '+971-500000000',
        country: 'UAE',
        status: 'OPEN',
        remarks: 'Asked for pricing details',
    },
    {
        session_id: '965017cb-b353-4037-ab14-d6f71814c778',
        name: 'John Carter',
        email: 'john.carter@example.com',
        mobile_number: '+1-202-555-0101',
        country: 'USA',
        status: 'OPEN',
        remarks: 'Wants to schedule a demo',
    },
];

// --- API calls ---
async function fetchLeadsFromAPI(): Promise<LeadRowData[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch from API');
  const data = await res.json();
  const rows = (data?.leads ?? []) as LeadRowData[];
  return rows.map((r) => ({ ...r, status: r.status || 'OPEN' }));
}
async function patchLeadAPI(
    update: Partial<Pick<LeadRowData, 'status' | 'remarks'>> & { session_id: string }
) {
    const res = await fetch('/chat-info', {
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

async function patchLeadMock(
    update: Partial<Pick<LeadRowData, 'status' | 'remarks'>> & { session_id: string }
) {
    await new Promise((r) => setTimeout(r, 400));
    return { success: true, updated_lead: update };
}

// --- Hook ---
export function useLeads() {
    const [rows, setRows] = useState<LeadRowData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState<Record<string, boolean>>({});
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    // load data
    useEffect(() => {
        let mounted = true;
        setLoading(true);

        (async () => {
            try {
                //mock
                const items = use_mockData ? MOCK_LEADS : await fetchLeadsFromAPI();
                if (mounted) setRows(items);
            } catch (e) {
                setError((e as Error).message);
                //mock
                if (use_mockData) setRows(MOCK_LEADS);
            } finally {
                setLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    const patchLead = async (
        update: Partial<Pick<LeadRowData, 'status' | 'remarks'>> & { session_id: string }
    ) => {
        //mock
        if (use_mockData) return patchLeadMock(update);
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
            setRows((prev) => prev.map((r) => (r.session_id === session_id ? { ...r, remarks } : r)));
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setSaving((s) => ({ ...s, [session_id]: false }));
        }
    }, []);

    return {
        rows,
        loading,
        error,
        saving,
        expanded,
        setExpanded,
        onChangeStatus,
        onSaveRemarks,
    };
}