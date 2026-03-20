import rawCrons from "@/data/crons.json";
import CronDashboard from "@/components/CronDashboard";

type CronStatus = "ok" | "warning" | "error" | "disabled";
const crons = rawCrons.map((c) => ({ ...c, status: c.status as CronStatus }));

export default function CronsPage() {
  return <CronDashboard crons={crons} />;
}
