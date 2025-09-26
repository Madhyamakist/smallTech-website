"use client";

import { useEffect, useState } from "react";
import DashboardPage from "./dashboardPage";
import { LeadRowData } from "./useLeads";

export default function Page() {
  const [rows, setRows] = useState<LeadRowData[]>([]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`);
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) setRows((data?.leads ?? []) as LeadRowData[]);
      } catch {
        // ignore in static export; UI starts empty
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return <DashboardPage initialRows={rows} />;
}

