'use client';

import Dropdown from '@/app/components/common/dropdown';
import { useLeads, LeadStatus, LeadRowData } from './useLeads';
import { useEffect, useState } from 'react';
import React from 'react';

const statusColors: Record<LeadStatus, string> = {
    OPEN: "text-blue-700 font-semibold",
    CLOSED: "text-red-600 font-semibold",
    QUALIFYING: "text-green-800 font-semibold",
};

export default function DashboardPage({ initialRows }: { initialRows: LeadRowData[] }) {
    const {
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
    } = useLeads(initialRows);
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 6;
    const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const pagedRows = rows.slice(startIndex, startIndex + PAGE_SIZE);

    const goToPage = (page: number) => {
        const clamped = Math.min(Math.max(1, page), totalPages);
        setCurrentPage(clamped);
        // Reset expanded rows when changing page
        setExpanded({});
    };

    const headerClass =
        'px-4 py-3 text-left text-sm font-semibold text-white bg-brown';
    const cellClass =
        'px-4 py-3 text-sm text-white/90 border-t border-cinereous';

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
                        {pagedRows.map((row) => {
                            const isOpen = expanded[row.session_id];
                            return (
                                <React.Fragment key={row.session_id}>
                                    <tr className="bg-liver">
                                        <td className={cellClass}>
                                            <button
                                                className=" hover:text-blue-300"
                                                onClick={() =>
                                                    setExpanded((e) => ({ ...e, [row.session_id]: !isOpen }))
                                                }
                                            >
                                                {row.session_id ? `${row.session_id.slice(0, 5)}...` : ""}
                                            </button>
                                        </td>
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
                                        </td>
                                        <td className={cellClass}>
                                            <button
                                                className="px-4 py-2 rounded-full bg-caput text-white hover:opacity-90"
                                                onClick={() => {
                                                    setExpanded((e) => ({ ...e, [row.session_id]: !isOpen }));
                                                    if (!isOpen && !histories[row.session_id] && !historyLoading[row.session_id]) {
                                                        loadHistory(row.session_id);
                                                    }
                                                }}
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
                                        <tr className="bg-liver">
                                            <td
                                                className="px-4 py-3 text-sm text-white/80"
                                                colSpan={6}
                                            >

                                                <div className="rounded-lg p-3 bg-brown">
                                                    <div className="mb-2 text-xs text-white/70">
                                                        <strong>Session ID:</strong> {row.session_id}
                                                    </div>
                                                    {historyLoading[row.session_id] && (
                                                        <div className="text-white/70">Loading history…</div>
                                                    )}
                                                    {!historyLoading[row.session_id] && historyError[row.session_id] && (
                                                        <div className="text-yellow-200">{historyError[row.session_id]}</div>
                                                    )}
                                                    {!historyLoading[row.session_id] && !historyError[row.session_id] && (
                                                        <div className="flex flex-col space-y-2">
                                                            {(histories[row.session_id] || []).length === 0 && (
                                                                <div className="text-white/70">No history available.</div>
                                                            )}
                                                            {(histories[row.session_id] || []).map((msg, i) => (
                                                                <div
                                                                    key={i}
                                                                    className={`max-w-[85%] px-3 py-[1%] rounded-lg ${msg.sender === 'You'
                                                                        ? 'bg-redwood self-end text-cinereous font-semibold'
                                                                        : 'bg-cinereous self-start text-brown font-semibold'
                                                                        }`}
                                                                >
                                                                    {msg.text}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
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
            <div className="flex items-center justify-between mt-4 text-white">
                <div className="text-sm">Page {currentPage} of {totalPages}</div>
                <div className="flex gap-2">
                    <button
                        className="px-3 py-2 rounded-md bg-caput text-white disabled:opacity-50"
                        onClick={() => goToPage(1)}
                        disabled={currentPage === 1}
                    >
                        « First
                    </button>
                    <button
                        className="px-3 py-2 rounded-md bg-caput text-white disabled:opacity-50"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        ‹ Prev
                    </button>
                    <button
                        className="px-3 py-2 rounded-md bg-caput text-white disabled:opacity-50"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next ›
                    </button>
                    <button
                        className="px-3 py-2 rounded-md bg-caput text-white disabled:opacity-50"
                        onClick={() => goToPage(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        Last »
                    </button>
                </div>
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
