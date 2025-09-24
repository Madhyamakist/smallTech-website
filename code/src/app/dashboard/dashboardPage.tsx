'use client';

import Dropdown from '@/app/components/common/dropdown';
import { useLeads, LeadStatus, LeadRowData } from './useLeads';
import { useEffect, useMemo, useState } from 'react';
import React from 'react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';

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

    //Pagination
    const goToPage = (page: number) => {
        const clamped = Math.min(Math.max(1, page), totalPages);
        setCurrentPage(() => clamped);
        // Reset expanded rows when changing page
        setExpanded({});
    };

    const headerClass =
        'px-4 py-3 text-left text-sm font-semibold text-white bg-brown';
    const cellClass =
        'px-4 py-3 text-sm text-white/90 border-t border-cinereous';

    const columns = useMemo<ColumnDef<LeadRowData>[]>(() => [
        {
            header: 'Session Id',
            accessorKey: 'session_id',
            cell: ({ row }) => {
                const r = row.original;
                const isOpen = !!expanded[r.session_id];

                return (
                    <button
                        type="button"
                        className="hover:text-blue-300"
                        onClick={() => {
                            setExpanded((e) => ({ ...e, [r.session_id]: !isOpen }));
                            if (!isOpen && !histories[r.session_id] && !historyLoading[r.session_id]) {
                                loadHistory(r.session_id);
                            }
                        }}
                    >
                        {r.session_id ? `${r.session_id.slice(0, 5)}...` : ''}
                    </button>
                );
            },
        },

        {
            header: 'Name',
            accessorKey: 'name',
            cell: ({ row }) => row.original.name,
        },
        {
            header: 'Contact Details',
            id: 'contact',
            cell: ({ row }) => {
                const r = row.original;
                return (
                    <div className="text-white/90">
                        <div>email: {r.email}</div>
                        <div>country: {r.country}</div>
                        <div>mobile: {r.mobile_number}</div>
                    </div>
                );
            },
        },
        {
            header: 'Status',
            id: 'status',
            cell: ({ row }) => {
                const r = row.original;
                return (
                    <div className={`w-44 ${statusColors[r.status]}`}>
                        <Dropdown<LeadStatus>
                            label={r.status}
                            options={[
                                { label: 'OPEN', value: 'OPEN' },
                                { label: 'CLOSED', value: 'CLOSED' },
                                { label: 'QUALIFYING', value: 'QUALIFYING' },
                            ]}
                            onSelect={(value) => onChangeStatus(r.session_id, value)}
                        />
                    </div>
                );
            },
        },
        {
            header: 'Remarks',
            id: 'remarks',
            cell: ({ row }) => {
                const r = row.original;
                return (
                    <RowRemarks
                        sessionId={r.session_id}
                        initialRemarks={r.remarks ?? ''}
                        saving={!!saving[r.session_id]}
                        onSave={onSaveRemarks}
                    />
                );
            },
        },
    ], [expanded, histories, historyLoading, onChangeStatus, onSaveRemarks, setExpanded, loadHistory, saving]);

    const table = useReactTable({
        data: rows,
        columns,
        getCoreRowModel: getCoreRowModel(),
        autoResetPageIndex: false,
    });

    return (
        <section className="p-6">
            <h1 className="text-xl mb-4 text-white">Dashboard</h1>
            {error && <div className="mb-3 text-yellow-200">{error}</div>}

            {/* Desktop table */}
            <div
                className="overflow-x-auto rounded-lg shadow-md hidden md:block bg-brown"
                >
                <table className="min-w-full">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className={headerClass}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.slice(startIndex, startIndex + PAGE_SIZE).map((row) => {
                            const original = row.original as LeadRowData;
                            const isOpen = !!expanded[original.session_id];
                            return (
                                <React.Fragment key={row.id}>
                                    <tr className="bg-liver">
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className={cellClass}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                    {isOpen && (
                                        <tr className="bg-liver">
                                            <td className="px-4 py-3 text-sm text-white/80" colSpan={row.getVisibleCells().length}>
                                                <div className="rounded-lg p-3 bg-brown">
                                                    <div className="mb-2 text-xs text-white/70">
                                                        <strong>Session ID:</strong> {original.session_id}
                                                    </div>
                                                    {historyLoading[original.session_id] && (
                                                        <div className="text-white/70">Loading history…</div>
                                                    )}
                                                    {!historyLoading[original.session_id] && historyError[original.session_id] && (
                                                        <div className="text-yellow-200">{historyError[original.session_id]}</div>
                                                    )}
                                                    {!historyLoading[original.session_id] && !historyError[original.session_id] && (
                                                        <div className="flex flex-col space-y-2">
                                                            {(histories[original.session_id] || []).length === 0 && (
                                                                <div className="text-white/70">No history available.</div>
                                                            )}
                                                            {(histories[original.session_id] || []).map((msg, i) => (
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

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
                {pagedRows.map((r) => {
                    const isOpen = !!expanded[r.session_id];
                    return (
                        <div key={r.session_id} className="rounded-lg shadow-md p-4 bg-liver bg-brown">
                            <div className="flex items-center justify-between">
                                <div className="text-white font-semibold">{r.name}</div>
                                <button
                                    type="button"
                                    className="text-blue-300"
                                    onClick={() => {
                                        setExpanded((e) => ({ ...e, [r.session_id]: !isOpen }));
                                        if (!isOpen && !histories[r.session_id] && !historyLoading[r.session_id]) {
                                            loadHistory(r.session_id);
                                        }
                                    }}
                                >
                                    {r.session_id ? `${r.session_id.slice(0, 5)}...` : ''}
                                </button>

                            </div>
                            <div className="mt-2 text-white/90 text-sm">
                                <div>email: {r.email}</div>
                                <div>country: {r.country}</div>
                                <div>mobile: {r.mobile_number}</div>
                            </div>
                            <div className="mt-3 flex items-center gap-3">
                                <div className={`w-40 ${statusColors[r.status]}`}>
                                    <Dropdown<LeadStatus>
                                        label={r.status}
                                        options={[
                                            { label: 'OPEN', value: 'OPEN' },
                                            { label: 'CLOSED', value: 'CLOSED' },
                                            { label: 'QUALIFYING', value: 'QUALIFYING' },
                                        ]}
                                        onSelect={(value) => onChangeStatus(r.session_id, value)}
                                    />
                                </div>
                            </div>
                            <div className="mt-3">
                                <RowRemarks
                                    sessionId={r.session_id}
                                    initialRemarks={r.remarks ?? ''}
                                    saving={!!saving[r.session_id]}
                                    onSave={onSaveRemarks}
                                />
                            </div>
                            {isOpen && (
                                <div className="mt-3 rounded-lg p-3 bg-brown">
                                    <div className="mb-2 text-xs text-white/70">
                                        <strong>Session ID:</strong> {r.session_id}
                                    </div>
                                    {historyLoading[r.session_id] && (
                                        <div className="text-white/70">Loading history…</div>
                                    )}
                                    {!historyLoading[r.session_id] && historyError[r.session_id] && (
                                        <div className="text-yellow-200">{historyError[r.session_id]}</div>
                                    )}
                                    {!historyLoading[r.session_id] && !historyError[r.session_id] && (
                                        <div className="flex flex-col space-y-2">
                                            {(histories[r.session_id] || []).length === 0 && (
                                                <div className="text-white/70">No history available.</div>
                                            )}
                                            {(histories[r.session_id] || []).map((msg, i) => (
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
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="flex items-center justify-between mt-4 text-white">
                <div className="text-sm">Page {currentPage} of {totalPages}</div>
                <div className="flex gap-2">
                    <button type="button"
                        className="px-3 py-2 rounded-md bg-caput text-white disabled:opacity-50"
                        onClick={() => goToPage(1)}
                        disabled={currentPage === 1}
                    >
                        « First
                    </button>
                    <button type="button"
                        className="px-3 py-2 rounded-md bg-caput text-white disabled:opacity-50"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        ‹ Prev
                    </button>
                    <button type="button"
                        className="px-3 py-2 rounded-md bg-caput text-white disabled:opacity-50"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next ›
                    </button>
                    <button type="button"
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
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => setValue(initialRemarks), [initialRemarks]);

    return (
        <div className="flex items-start gap-2">
            {isEditing ? (
                <textarea
                    className="w-full px-3 py-2 rounded-lg bg-[var(--color-khaki)] text-black placeholder-grey/60 text-opacity-60"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Add remarks"
                    rows={3}
                />
            ) : (
                <div className="w-full min-h-[2.5rem] px-3 py-2 rounded-lg bg-[var(--color-khaki)] text-black whitespace-pre-wrap">
                    {value || 'Add remarks'}
                </div>
            )}
            {isEditing ? (
                <button
                    type="button"
                    className="px-3 py-2 rounded-md bg-[var(--color-rose)] text-white disabled:opacity-60"
                    onClick={async () => {
                        await onSave(sessionId, value);
                        setIsEditing(false);
                    }}
                    disabled={saving}
                >
                    {saving ? 'Saving…' : 'Save'}
                </button>
            ) : (
                <button
                    type="button"
                    aria-label="Edit remarks"
                    className="p-2 rounded-md bg-[var(--color-rose)] text-white hover:opacity-90"
                    onClick={() => setIsEditing(true)}
                >
                    ✎
                </button>
            )}
        </div>
    );
}
