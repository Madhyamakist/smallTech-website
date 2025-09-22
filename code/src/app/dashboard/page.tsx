import DashboardPage from "./dashboardPage";
import { LeadRowData } from "./useLeads";

export default async function Page() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch leads");

  const data = await res.json();
  const rows = (data?.leads ?? []) as LeadRowData[];

  return <DashboardPage initialRows={rows} />;
}
