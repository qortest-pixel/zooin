import reports from "@/data/reports.json";
import { notFound } from "next/navigation";
import ReportDetail from "@/components/ReportDetail";

export function generateStaticParams() {
  return reports.map((r) => ({ id: String(r.id) }));
}

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = reports.find((r) => String(r.id) === id);
  if (!report) notFound();
  return <ReportDetail report={report} />;
}
