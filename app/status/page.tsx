import statusData from "@/data/status.json";
import AppHeader from "@/components/AppHeader";

type Task = { name: string; status: string; date?: string; note?: string };
type Project = { id: string; name: string; status: string; progress: number; description: string; repo?: string | null; url?: string | null; tasks: Task[] };

const projects = statusData.projects as Project[];
const STATUS: Record<string, { label: string; className: string }> = {
  done: { label: "완료", className: "is-done" },
  "in-progress": { label: "진행 중", className: "is-progress" },
  "mvp-done": { label: "MVP 완료", className: "is-done" },
  pending: { label: "대기", className: "is-progress" },
  blocked: { label: "차단", className: "is-error" },
  planned: { label: "기획", className: "is-queued" },
  todo: { label: "대기", className: "is-queued" },
};

export default function StatusPage() {
  const totalProgress = Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / Math.max(projects.length, 1));
  const completedTasks = projects.reduce((sum, project) => sum + project.tasks.filter((task) => task.status === "done").length, 0);
  return (
    <div className="app-shell">
      <AppHeader active="status" />
      <main className="section-page wide">
        <header className="section-hero">
          <div><p className="eyebrow">PROJECT PORTFOLIO</p><h1>프로젝트 현황</h1><p>전체 프로젝트의 진행률과 다음 할 일을 확인합니다.</p></div>
          <div className="summary-numbers"><div><strong>{totalProgress}%</strong><span>전체 진행률</span></div><div><strong>{completedTasks}</strong><span>완료 태스크</span></div></div>
        </header>
        <div className="project-grid">
          {projects.map((project) => {
            const status = STATUS[project.status] || STATUS.planned;
            return (
              <article className="project-card" key={project.id}>
                <div className="data-card-top"><span className={`status-label ${status.className}`}>{status.label}</span><span className="data-id">{project.id}</span></div>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <div className="project-progress"><div><span>진행률</span><strong>{project.progress}%</strong></div><div className="progress-line"><span className={status.className} style={{ width: `${project.progress}%` }} /></div></div>
                <ul className="project-tasks">
                  {project.tasks.map((task, index) => <li key={index} className={task.status === "done" ? "done" : ""}><span>{task.status === "done" ? "✓" : "·"}</span><span>{task.name}</span>{task.date && <time>{task.date}</time>}</li>)}
                </ul>
                {(project.repo || project.url) && <div className="project-links">{project.repo && <a href={project.repo} target="_blank" rel="noreferrer">GitHub ↗</a>}{project.url && <a href={project.url} target="_blank" rel="noreferrer">사이트 ↗</a>}</div>}
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
