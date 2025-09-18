'use client';

import Dropdown from '@/app/components/common/dropdown';
import { useLeads,LeadStatus } from './useLeads';
import { useEffect, useState } from 'react';
import React from 'react';

const statusColors: Record<LeadStatus, string> = {
  OPEN: "text-blue-700 font-semibold",
  CLOSED: "text-red-600 font-semibold",
  QUALIFYING: "text-green-800 font-semibold",
};

export default function DashboardPage() {
  const {
    rows,
    loading,
    error,
    saving,
    expanded,
    setExpanded,
    onChangeStatus,
    onSaveRemarks,
  } = useLeads();

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

  return (
    <section className="p-6">
      <h1 className="text-xl mb-4 text-white">Dashboard</h1>
      {error && <div className="mb-3 text-yellow-200">{error}</div>}
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
      <React.Fragment key={row.session_id}>
        <tr className="bg-[var(--color-liver)]/50">
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
            <div className={`w-44 ${statusColors[row.status]}`}>
              <div>
              <Dropdown<LeadStatus>
                label={row.status}
                fetchOptions={async () => [
                  { label: 'OPEN', value: 'OPEN' },
                  { label: 'CLOSED', value: 'CLOSED' },
                  { label: 'QUALIFYING', value: 'QUALIFYING' },
                ]}
                onSelect={(value) => onChangeStatus(row.session_id, value)}
              />
              </div>
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
          <tr className="bg-[var(--color-liver)]/40">
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
      </React.Fragment>
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
