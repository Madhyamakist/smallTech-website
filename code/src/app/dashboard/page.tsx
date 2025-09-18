'use client';

import { useCallback, useEffect, useState } from 'react';
import Dropdown from '@/app/components/common/dropdown';

type LeadStatus = 'OPEN' | 'CLOSED' | 'QUALIFYING';

interface LeadRowData {
  session_id: string;
  name: string;
  email: string;
  mobile_number: string;
  country: string;
  status: LeadStatus;
  remarks?: string;
}

//mock data
const use_mockData = true;


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

//real api 
async function fetchLeadsFromAPI(): Promise<LeadRowData[]> {
  const res = await fetch('/leads', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch from API');
  const data = await res.json();
  const rows = (data?.chat_info ?? []) as LeadRowData[];
  return rows.map((r) => ({ ...r, status: (r as any).status || 'OPEN' }));
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

//mock patch
async function patchLeadMock(
  update: Partial<Pick<LeadRowData, 'status' | 'remarks'>> & { session_id: string }
) {
  await new Promise((r) => setTimeout(r, 400));
  return { success: true, message: 'Mocked update success', updated_lead: update } as any;
}

async function patchLead(
  update: Partial<Pick<LeadRowData, 'status' | 'remarks'>> & { session_id: string }
) {
  if (use_mockData) return patchLeadMock(update);
  return patchLeadAPI(update);
}

export default function DashboardPage() {
  const [rows, setRows] = useState<LeadRowData[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    (async () => {
      try {
        const items = use_mockData ? MOCK_LEADS : await fetchLeadsFromAPI();
        if (mounted) setRows(items);
      } catch (e) {
        setError((e as Error).message || 'Unable to load');
        if (use_mockData) setRows(MOCK_LEADS);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const statusOptionsFetcher = useCallback(async () => {
    const options: { label: string; value: LeadStatus }[] = [
      { label: 'OPEN', value: 'OPEN' },
      { label: 'CLOSED', value: 'CLOSED' },
      { label: 'QUALIFYING', value: 'QUALIFYING' },
    ];
    return options;
  }, []);

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

  const headerClass =
    'px-4 py-3 text-left text-sm font-semibold text-white bg-[var(--color-brown)]';
  const cellClass =
    'px-4 py-3 text-sm text-white/90 border-t border-[var(--color-cinereous)]';

  if (loading) {
    return (
      <section className="p-6">
        <h1 className="text-xl mb-4 text-white">Dashboard</h1>
        <div className="text-white/80">Loading leads…</div>
      </section>
    );
  }

  const showError = error ? (
    <div className="mb-3 text-yellow-200">{error}</div>
  ) : null;

  return (
    <section className="p-6">
      <h1 className="text-xl mb-4 text-white">Dashboard</h1>
      {showError}
      <div
        className="overflow-x-auto rounded-lg shadow-md"
        style={{ backgroundColor: 'rgba(92,71,66,0.65)' }}
      >
        <table className="min-w-full">
          <thead>
            <tr>
              <th className={headerClass}>Session Id</th>
              <th className={headerClass}>Name</th>
              <th className={headerClass}>Contact Details</th>
              <th className={headerClass}>Status</th>
              <th className={headerClass}>View</th>
              <th className={headerClass}>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isOpen = expanded[row.session_id];
              return (
                <>
                  <tr key={row.session_id} className="bg-[var(--color-liver)]/50">
                    <td className={cellClass}>{row.session_id}</td>
                    <td className={cellClass}>{row.name}</td>
                    <td className={cellClass}>
                      <div className="text-white/90">
                        <div>email: {row.email}</div>
                        <div>country: {row.country}</div>
                        <div>mobile: {row.mobile_number}</div>
                      </div>
                    </td>
                    <td className={cellClass}>
                      <div className="w-44">
                        <Dropdown<LeadStatus>
                          label={row.status}
                          fetchOptions={statusOptionsFetcher}
                          onSelect={(value) => onChangeStatus(row.session_id, value)}
                        />
                      </div>
                    </td>
                    <td className={cellClass}>
                      <button
                        className="px-4 py-2 rounded-full bg-[var(--color-caput)] text-white hover:opacity-90"
                        onClick={() =>
                          setExpanded((e) => ({ ...e, [row.session_id]: !isOpen }))
                        }
                      >
                        {isOpen ? 'Hide' : 'History'}
                      </button>
                    </td>
                    <td className={cellClass}>
                      <RowRemarks
                        sessionId={row.session_id}
                        initialRemarks={row.remarks ?? ''}
                        saving={!!saving[row.session_id]}
                        onSave={onSaveRemarks}
                      />
                    </td>
                  </tr>
                  {isOpen && (
                    <tr
                      key={`${row.session_id}-exp`}
                      className="bg-[var(--color-liver)]/40"
                    >
                      <td
                        className="px-4 py-3 text-sm text-white/80"
                        colSpan={6}
                      >
                        <div className="rounded-lg p-3 bg-[var(--color-brown)]/40">
                          No history available yet.
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function RowRemarks({
  sessionId,
  initialRemarks,
  saving,
  onSave,
}: {
  sessionId: string;
  initialRemarks: string;
  saving: boolean;
  onSave: (session_id: string, remarks: string) => Promise<void>;
}) {
  const [value, setValue] = useState(initialRemarks);
  useEffect(() => setValue(initialRemarks), [initialRemarks]);
  return (
    <div className="flex items-center gap-2">
      <input
        className="w-full px-3 py-2 rounded-lg bg-[var(--color-khaki)] text-black placeholder-black/60"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add remarks"
      />
      <button
        className="px-3 py-2 rounded-md bg-[var(--color-rose)] text-white disabled:opacity-60"
        onClick={() => onSave(sessionId, value)}
        disabled={saving}
      >
        {saving ? 'Saving…' : 'Save'}
      </button>
    </div>
  );
}
