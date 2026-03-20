import CronDashboard from "@/components/CronDashboard";
import cronsData from "@/data/crons.json";

export default function CronPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <CronDashboard crons={cronsData as any} />;
}
