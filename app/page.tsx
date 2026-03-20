import reports from "@/data/reports.json";
import ReportsClient from "@/components/ReportsClient";

export default function Home() {
  return <ReportsClient reports={reports} />;
}
