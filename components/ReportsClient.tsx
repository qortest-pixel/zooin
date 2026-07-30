"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Report = {
  id: number;
  title: string;
  summary: string;
  category: string;
  date: string;
  tags: string[];
  content?: string;
};

const CATEGORIES = ["전체", "기획서", "아키텍처", "자동화", "결과보고", "코드리뷰", "태스크"];

const CATEGORY_META: Record<string, { color: string; mark: string }> = {
  기획서: { color: "#e85d3f", mark: "PL" },
  아키텍처: { color: "#3767d6", mark: "AR" },
  자동화: { color: "#178f67", mark: "AU" },
  결과보고: { color: "#b57816", mark: "RE" },
  코드리뷰: { color: "#7c56a8", mark: "CR" },
  태스크: { color: "#64748b", mark: "TK" },
};

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m21 21-4.3-4.3m2.3-5.2a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14m-5-5 5 5-5 5" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 18.5 3.5 21v-5.3A8.5 8.5 0 1 1 7 18.5Z" />
    </svg>
  );
}

function formatDate(dateStr: string, long = false) {
  const date = new Date(`${dateStr}T00:00:00+09:00`);
  if (Number.isNaN(date.getTime())) return dateStr;
  return new Intl.DateTimeFormat("ko-KR", {
    month: long ? "long" : "numeric",
    day: long ? "numeric" : "2-digit",
    weekday: long ? "short" : undefined,
  }).format(date);
}

export default function ReportsClient({ reports }: { reports: Report[] }) {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [query, setQuery] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "대표님, 어떤 내용을 도와드릴까요?" },
  ]);
  const [sending, setSending] = useState(false);

  const counts = useMemo(
    () => Object.fromEntries(CATEGORIES.map((category) => [
      category,
      category === "전체" ? reports.length : reports.filter((report) => report.category === category).length,
    ])),
    [reports],
  );

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return [...reports]
      .filter((report) => activeCategory === "전체" || report.category === activeCategory)
      .filter((report) => !keyword || [
        report.title,
        report.summary,
        report.category,
        ...report.tags,
      ].join(" ").toLowerCase().includes(keyword))
      .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
  }, [activeCategory, query, reports]);

  const latest = filtered[0];
  const remaining = filtered.slice(1);

  async function send() {
    const message = chatInput.trim();
    if (!message || sending) return;
    setSending(true);
    setMessages((previous) => [...previous, { role: "user", text: message }]);
    setChatInput("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) throw new Error("request failed");
      setMessages((previous) => [...previous, { role: "ai", text: "전달했습니다. 텔레그램에서 이어서 답변드릴게요." }]);
    } catch {
      setMessages((previous) => [...previous, { role: "ai", text: "전송하지 못했습니다. 잠시 후 다시 시도해주세요." }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="dashboard-shell">
      <header className="topbar">
        <Link href="/" className="brand" aria-label="zooin 홈">
          <span className="brand-mark">z</span>
          <span className="brand-name">zooin</span>
        </Link>
        <nav className="topnav" aria-label="주요 메뉴">
          <Link className="topnav-link active" href="/">리포트</Link>
          <Link className="topnav-link" href="/tasks">작업</Link>
          <Link className="topnav-link hide-mobile" href="/crons">자동화</Link>
        </nav>
        <button className="ask-button" onClick={() => setChatOpen(true)}>
          <MessageIcon />
          <span>AI에게 묻기</span>
        </button>
      </header>

      <main className="dashboard-main">
        <section className="intro">
          <div>
            <p className="eyebrow">WORK INTELLIGENCE ARCHIVE</p>
            <h1>일의 기록이<br />다음 판단이 되도록.</h1>
          </div>
          <div className="intro-side">
            <p>전략, 리서치, 자동화의 모든 결과물을<br className="hide-mobile" /> 한곳에서 빠르게 찾고 이어갑니다.</p>
            <div className="archive-stat">
              <strong>{reports.length}</strong>
              <span>누적 리포트</span>
            </div>
          </div>
        </section>

        <section className="workspace" aria-label="리포트 탐색">
          <aside className="category-panel">
            <p className="panel-label">COLLECTIONS</p>
            <div className="category-list">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  className={activeCategory === category ? "category-button active" : "category-button"}
                  onClick={() => setActiveCategory(category)}
                >
                  <span>{category}</span>
                  <span>{counts[category]}</span>
                </button>
              ))}
            </div>
            <div className="panel-note">
              <span className="status-dot" />
              <p><strong>Archive is live</strong><br />새 리포트가 자동으로 쌓입니다.</p>
            </div>
          </aside>

          <div className="report-panel">
            <div className="report-tools">
              <div>
                <p className="panel-label">LATEST DOCUMENTS</p>
                <p className="result-count">{filtered.length}개의 기록</p>
              </div>
              <label className="search-box">
                <SearchIcon />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="제목, 태그로 검색"
                  aria-label="리포트 검색"
                />
                <kbd>⌘ K</kbd>
              </label>
            </div>

            {latest ? (
              <>
                <Link href={`/reports/${latest.id}`} className="feature-report">
                  <div className="feature-index">#{String(latest.id).padStart(3, "0")}</div>
                  <div className="feature-content">
                    <div className="report-meta">
                      <span className="category-pill" style={{ "--category-color": CATEGORY_META[latest.category]?.color } as React.CSSProperties}>
                        {latest.category}
                      </span>
                      <time>{formatDate(latest.date, true)}</time>
                    </div>
                    <h2>{latest.title}</h2>
                    <p>{latest.summary}</p>
                    <div className="feature-footer">
                      <div className="tag-row">
                        {latest.tags.slice(0, 3).map((tag) => <span key={tag}>#{tag}</span>)}
                      </div>
                      <span className="read-link">리포트 열기 <ArrowIcon /></span>
                    </div>
                  </div>
                </Link>

                <div className="report-list">
                  {remaining.map((report) => {
                    const meta = CATEGORY_META[report.category] ?? { color: "#64748b", mark: "DO" };
                    return (
                      <Link href={`/reports/${report.id}`} className="report-row" key={report.id}>
                        <span className="report-mark" style={{ "--category-color": meta.color } as React.CSSProperties}>
                          {meta.mark}
                        </span>
                        <div className="report-row-content">
                          <div className="report-meta">
                            <span>{report.category}</span>
                            <span>·</span>
                            <time>{formatDate(report.date)}</time>
                          </div>
                          <h3>{report.title}</h3>
                          <p>{report.summary}</p>
                        </div>
                        <span className="row-arrow"><ArrowIcon /></span>
                      </Link>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="empty-state">
                <span>0</span>
                <h2>일치하는 리포트가 없습니다.</h2>
                <p>검색어나 컬렉션을 바꿔보세요.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>zooin archive</span>
        <span>Built for better decisions · 2026</span>
      </footer>

      {chatOpen && (
        <div className="chat-layer" role="dialog" aria-modal="true" aria-label="AI 문의">
          <button className="chat-backdrop" onClick={() => setChatOpen(false)} aria-label="닫기" />
          <div className="chat-panel">
            <div className="chat-header">
              <div><span className="status-dot" /><strong>AI 문의</strong></div>
              <button onClick={() => setChatOpen(false)} aria-label="닫기">×</button>
            </div>
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.role}`}>{message.text}</div>
              ))}
            </div>
            <div className="chat-input">
              <input
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && send()}
                placeholder="메시지를 입력하세요"
              />
              <button onClick={send} disabled={sending || !chatInput.trim()}><ArrowIcon /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
