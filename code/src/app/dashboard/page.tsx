"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DashboardPage from "./dashboardPage";
import { LeadRowData } from "./useLeads";

export default function Page() {
  const searchParams = useSearchParams();
  const [authorized, setAuthorized] = useState(false);
  const [rows, setRows] = useState<LeadRowData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const provided = searchParams.get("p") || "";
    const expected = process.env.NEXT_PUBLIC_DASHBOARD_KEY || "";
    setAuthorized(Boolean(expected) && provided === expected);
  }, [searchParams]);

  useEffect(() => {
    if (!authorized) return;
    const api = process.env.NEXT_PUBLIC_API_URL;
    if (!api) {
      setError("Missing API URL");
      return;
    }
    fetch(`${api}/leads`, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch leads");
        return res.json();
      })
      .then((data) => setRows((data?.leads ?? []) as LeadRowData[]))
      .catch((e: any) => setError(String(e?.message || e)));
  }, [authorized]);

  if (!authorized) return null;
  if (error) throw new Error(error);
  if (!rows) return null;

  return <DashboardPage initialRows={rows} />;
}
