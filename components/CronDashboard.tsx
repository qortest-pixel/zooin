"use client";

import AppHeader from "@/components/AppHeader";

type Cron = {
  id: string;
  name: string;
  schedule: string;
  model: string;
  status: "ok" | "warning" | "error" | "disabled";
  lastResult: string;
  note: string;
};

const STATUS = {
  ok: { label: "정상", className: "is-done" },
  warning: { label: "주의", className: "is-progress" },
  error: { label: "오류", className: "is-error" },
  disabled: { label: "비활성", className: "is-queued" },
};

export default function CronDashboard({ crons = [] }: { crons?: Cron[] }) {
  const counts = Object.fromEntries(Object.keys(STATUS).map((key) => [key, crons.filter((cron) => cron.status === key).length]));
  return (
    <div className="app-shell">
      <AppHeader active="crons" />
      <main className="section-page">
        <header className="section-hero">
          <div><p className="eyebrow">AUTOMATION CONTROL</p><h1>자동화 현황</h1><p>예약된 자동 업무의 실행 상태와 최근 결과를 확인합니다.</p></div>
          <div className="summary-numbers compact">
            {Object.entries(STATUS).map(([key, value]) => <div key={key}><strong>{counts[key]}</strong><span>{value.label}</span></div>)}
          </div>
        </header>
        <div className="data-list">
          {crons.map((cron) => {
            const status = STATUS[cron.status];
            return (
              <article className="data-card cron-card" key={cron.id}>
                <div className="data-card-top"><div><span className={`status-label ${status.className}`}>{status.label}</span><span className="data-id">{cron.id}</span></div><span className="cron-schedule">{cron.schedule}</span></div>
                <h2>{cron.name}</h2>
                <p className="data-description">{cron.note}</p>
                <div className="data-meta"><span>모델 {cron.model}</span><span>최근 결과 {cron.lastResult}</span></div>
              </article>
            );
          })}
          {crons.length === 0 && <div className="empty-state"><h2>등록된 자동화가 없습니다.</h2></div>}
        </div>
      </main>
    </div>
  );
}
