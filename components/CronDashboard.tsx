"use client";

type Cron = {
  id: string;
  name: string;
  schedule: string;
  model: string;
  status: "ok" | "warning" | "error" | "disabled";
  lastResult: string;
  note: string;
};

const STATUS_CONFIG = {
  ok:       { icon: "✅", label: "정상",   bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700" },
  warning:  { icon: "⚠️", label: "주의",   bg: "bg-amber-50",   border: "border-amber-200",   text: "text-amber-700" },
  error:    { icon: "🔴", label: "에러",   bg: "bg-red-50",     border: "border-red-200",     text: "text-red-700" },
  disabled: { icon: "⏸️", label: "비활성", bg: "bg-gray-50",    border: "border-gray-200",    text: "text-gray-500" },
};

export default function CronDashboard({ crons = [] }: { crons?: Cron[] }) {
  const counts = {
    ok:       crons.filter((c) => c.status === "ok").length,
    warning:  crons.filter((c) => c.status === "warning").length,
    error:    crons.filter((c) => c.status === "error").length,
    disabled: crons.filter((c) => c.status === "disabled").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-blue-500 rounded-lg" />
              <div>
                <h1 className="text-lg font-bold tracking-tight leading-none">zooin Reports</h1>
                <p className="text-xs text-gray-400 mt-0.5">크론 대시보드</p>
              </div>
            </a>
          </div>
          <a href="/" className="text-xs text-gray-500 hover:text-gray-800 transition-colors">← 리포트 목록</a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Summary */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {Object.entries(counts).map(([status, count]) => {
            const cfg = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];
            return (
              <div key={status} className={`${cfg.bg} border ${cfg.border} rounded-xl p-4 text-center`}>
                <div className="text-2xl mb-1">{cfg.icon}</div>
                <div className={`text-2xl font-bold ${cfg.text}`}>{count}</div>
                <div className="text-xs text-gray-500 mt-0.5">{cfg.label}</div>
              </div>
            );
          })}
        </div>

        {/* Cron List */}
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">크론 목록 ({crons.length}개)</h2>
        <div className="space-y-3">
          {crons.map((cron) => {
            const cfg = STATUS_CONFIG[cron.status];
            return (
              <div key={cron.id} className={`bg-white border ${cfg.border} rounded-xl p-5`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-base">{cfg.icon}</span>
                      <h3 className="font-semibold text-gray-800">{cron.name}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
                        {cfg.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{cron.note}</p>
                    <p className="text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2">{cron.lastResult}</p>
                  </div>
                  <div className="text-right shrink-0 space-y-1">
                    <div className="text-xs text-gray-500">🕐 {cron.schedule}</div>
                    <div className="text-xs text-gray-400">🤖 {cron.model}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {crons.length === 0 && (
          <div className="text-center text-gray-400 py-20 text-sm">등록된 크론이 없어요</div>
        )}
      </main>
    </div>
  );
}
