import tasks from "@/data/tasks.json";
import AppHeader from "@/components/AppHeader";

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

const STATUS = {
  "in-progress": { label: "진행 중", className: "is-progress" },
  done: { label: "완료", className: "is-done" },
  queued: { label: "대기", className: "is-queued" },
};

export default function TasksPage() {
  const sorted = [...(tasks as Task[])].sort((a, b) => {
    const order = { "in-progress": 0, queued: 1, done: 2 };
    return order[a.status] - order[b.status];
  });
  const inProgress = sorted.filter((task) => task.status === "in-progress").length;
  const done = sorted.filter((task) => task.status === "done").length;

  return (
    <div className="app-shell">
      <AppHeader active="tasks" />
      <main className="section-page">
        <header className="section-hero">
          <div><p className="eyebrow">LIVE WORK QUEUE</p><h1>작업 현황</h1><p>현재 실행 중인 업무와 완료된 결과를 한눈에 확인합니다.</p></div>
          <div className="summary-numbers"><div><strong>{inProgress}</strong><span>진행 중</span></div><div><strong>{done}</strong><span>완료</span></div></div>
        </header>
        <div className="data-list">
          {sorted.map((task) => {
            const status = STATUS[task.status];
            return (
              <article className="data-card" key={task.id}>
                <div className="data-card-top">
                  <div><span className={`status-label ${status.className}`}>{status.label}</span><span className="data-id">{task.id}</span></div>
                  {task.eta && task.status === "in-progress" && <span className="eta">ETA {task.eta}</span>}
                </div>
                <h2>{task.title}</h2>
                <div className="data-meta"><span>담당 {task.assignee}</span><span>모델 {task.model}</span><span>시작 {task.started}</span>{task.completed && <span>완료 {task.completed}</span>}</div>
                <div className="progress-line"><span className={status.className} style={{ width: `${task.progress}%` }} /></div>
                <span className="progress-value">{task.progress}%</span>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
