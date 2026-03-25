import tasks from "@/data/tasks.json";

type Task = {
  id: string;
  status: "in-progress" | "done" | "queued";
  title: string;
  assignee: string;
  model: string;
  started: string;
  eta?: string;
  completed?: string;
  progress: number;
};

const STATUS_STYLE = {
  "in-progress": { label: "진행 중", dot: "bg-amber-400 animate-pulse", badge: "bg-amber-50 text-amber-700 border-amber-200", bar: "bg-amber-400" },
  "done":        { label: "완료", dot: "bg-emerald-400", badge: "bg-emerald-50 text-emerald-700 border-emerald-200", bar: "bg-emerald-500" },
  "queued":      { label: "대기", dot: "bg-gray-300", badge: "bg-gray-50 text-gray-500 border-gray-200", bar: "bg-gray-300" },
};

export default function TasksPage() {
  const sorted = [...(tasks as Task[])].sort((a, b) => {
    const order = { "in-progress": 0, "queued": 1, "done": 2 };
    return (order[a.status] ?? 9) - (order[b.status] ?? 9);
  });

  const inProgress = sorted.filter(t => t.status === "in-progress").length;
  const done = sorted.filter(t => t.status === "done").length;

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {/* NAV */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center text-white font-black text-sm shadow-sm">Z</div>
              <div>
                <div className="font-bold text-gray-900 text-sm leading-none">zooin Tasks</div>
                <div className="text-[10px] text-gray-400 mt-0.5">실시간 작업 현황</div>
              </div>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" className="text-xs text-gray-500 hover:text-gray-800 border border-gray-200 hover:border-gray-300 px-2.5 py-1.5 rounded-lg transition-all">
              📋 리포트
            </a>
          </div>
        </div>
      </nav>

      {/* BANNER */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto px-5 py-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <p className="text-amber-200 text-xs font-medium tracking-widest uppercase mb-1">Live Tasks</p>
            <h1 className="text-white text-xl sm:text-2xl font-bold leading-tight">진행 중인 작업</h1>
            <p className="text-amber-200 text-xs mt-1">CEO 지시 → 부서 회의 → 결과 보고 (10분 내)</p>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-white font-bold text-2xl leading-none flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-pulse inline-block" />
                {inProgress}
              </div>
              <div className="text-amber-300 text-[10px] mt-0.5">진행 중</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold text-2xl leading-none">{done}</div>
              <div className="text-amber-300 text-[10px] mt-0.5">완료</div>
            </div>
          </div>
        </div>
      </div>

      {/* TASK LIST */}
      <main className="max-w-4xl mx-auto px-5 py-6 space-y-3">
        {sorted.map((task) => {
          const s = STATUS_STYLE[task.status] ?? STATUS_STYLE["queued"];
          return (
            <article key={task.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${s.badge}`}>
                      {s.label}
                    </span>
                    <span className="text-[11px] text-gray-400 font-mono">{task.id}</span>
                  </div>
                  <h2 className="text-[15px] font-bold text-gray-900 leading-snug">{task.title}</h2>
                </div>
                {task.status === "in-progress" && task.eta && (
                  <div className="text-right shrink-0 ml-3">
                    <div className="text-[10px] text-gray-400">ETA</div>
                    <div className="text-sm font-bold text-amber-600">{task.eta}</div>
                  </div>
                )}
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-500 mb-3">
                <span>👤 {task.assignee}</span>
                <span>🤖 {task.model}</span>
                <span>🕐 {task.started}</span>
                {task.completed && <span>✅ {task.completed}</span>}
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-700 ${s.bar}`}
                  style={{ width: `${task.progress}%` }} />
              </div>
              <div className="text-right text-[10px] text-gray-400 mt-1">{task.progress}%</div>
            </article>
          );
        })}
      </main>
    </div>
  );
}
