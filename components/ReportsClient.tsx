"use client";

import { useState, useMemo } from "react";

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

const CAT: Record<string, { color: string; bg: string; text: string; icon: string; border: string }> = {
  기획서:   { color: "#8b5cf6", bg: "#f5f3ff", text: "#6d28d9", icon: "📋", border: "border-l-violet-500" },
  아키텍처: { color: "#3b82f6", bg: "#eff6ff", text: "#1d4ed8", icon: "🏗️", border: "border-l-blue-500" },
  자동화:   { color: "#10b981", bg: "#ecfdf5", text: "#047857", icon: "⚡", border: "border-l-emerald-500" },
  결과보고: { color: "#f59e0b", bg: "#fffbeb", text: "#b45309", icon: "📊", border: "border-l-amber-500" },
  코드리뷰: { color: "#14b8a6", bg: "#f0fdfa", text: "#0f766e", icon: "🔍", border: "border-l-teal-500" },
  태스크:   { color: "#f97316", bg: "#fff7ed", text: "#c2410c", icon: "✅", border: "border-l-orange-500" },
};

export default function ReportsClient({ reports }: { reports: Report[] }) {
  const [activeTab, setActiveTab] = useState("전체");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "안녕하세요 대표님! 궁금한 것이나 수정사항 말씀해주세요 🙂" },
  ]);
  const [sending, setSending] = useState(false);

  const filtered = activeTab === "전체" ? reports : reports.filter((r) => r.category === activeTab);
  const cnt = (c: string) => (c === "전체" ? reports.length : reports.filter((r) => r.category === c).length);

  // Sort by date (newest first), then by id (newest first) within same date
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const dateCompare = b.date.localeCompare(a.date);
      if (dateCompare !== 0) return dateCompare;
      return b.id - a.id;
    });
  }, [filtered]);

  // Group by date
  const grouped = useMemo(() => {
    const groups: { date: string; reports: Report[] }[] = [];
    let currentDate = "";
    for (const r of sorted) {
      if (r.date !== currentDate) {
        currentDate = r.date;
        groups.push({ date: r.date, reports: [r] });
      } else {
        groups[groups.length - 1].reports.push(r);
      }
    }
    return groups;
  }, [sorted]);

  // Format date label
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr + "T00:00:00+09:00");
      const days = ["일", "월", "화", "수", "목", "금", "토"];
      const month = d.getMonth() + 1;
      const day = d.getDate();
      const dayName = days[d.getDay()];
      const today = new Date();
      const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth()+1).padStart(2,"0")}-${String(yesterday.getDate()).padStart(2,"0")}`;

      if (dateStr === todayStr) return `오늘 · ${month}월 ${day}일 (${dayName})`;
      if (dateStr === yesterdayStr) return `어제 · ${month}월 ${day}일 (${dayName})`;
      return `${month}월 ${day}일 (${dayName})`;
    } catch {
      return dateStr;
    }
  };

  async function send() {
    const msg = chatInput.trim();
    if (!msg || sending) return;
    setSending(true);
    setMessages((p) => [...p, { role: "user", text: msg }]);
    setChatInput("");
    try {
      await fetch(
        `https://api.telegram.org/bot8254002875:AAEsgasUuHMDnnXMUZl_VEYmKH9kW5PpBrY/sendMessage`,
        { method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: "6478080843", text: `[zooin] ${msg}` }) }
      );
      setMessages((p) => [...p, { role: "ai", text: "전달했습니다! 잠시 후 텔레그램으로 답변드릴게요 🙂" }]);
    } catch {
      setMessages((p) => [...p, { role: "ai", text: "전송 실패. 다시 시도해주세요." }]);
    }
    setSending(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">

      {/* ── TOP NAV ── */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center text-white font-black text-sm shadow-sm">Z</div>
            <div>
              <div className="font-bold text-gray-900 text-sm leading-none">zooin Reports</div>
              <div className="text-[10px] text-gray-400 mt-0.5">AI 협업 프로젝트 아카이브</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/tasks" className="flex items-center gap-1 text-xs text-white bg-amber-500 hover:bg-amber-600 px-2.5 py-1.5 rounded-lg font-medium transition-all shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" /> 진행 중 작업
            </a>
            <a href="/crons" className="hidden sm:flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 border border-gray-200 hover:border-gray-300 px-2.5 py-1.5 rounded-lg transition-all">
              <span>⚙️</span> 크론
            </a>
            <button onClick={() => setChatOpen(true)}
              className="flex items-center gap-1.5 text-xs text-white bg-violet-600 hover:bg-violet-700 px-3 py-1.5 rounded-lg font-medium transition-all shadow-sm">
              💬 AI 문의
            </button>
          </div>
        </div>
      </nav>

      {/* ── STATS BANNER ── */}
      <div className="bg-gradient-to-r from-violet-700 via-indigo-700 to-blue-700">
        <div className="max-w-4xl mx-auto px-5 py-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <p className="text-violet-200 text-xs font-medium tracking-widest uppercase mb-1">Work Archive</p>
            <h1 className="text-white text-xl sm:text-2xl font-bold leading-tight">AI 협업 프로젝트 기록</h1>
            <p className="text-violet-200 text-xs mt-1">멀티에이전트 · 자동화 · 전략기획 · 시장조사</p>
          </div>
          <div className="flex gap-4">
            {CATEGORIES.filter(c => c !== "전체").map(c => (
              <div key={c} className="text-center hidden sm:block">
                <div className="text-white font-bold text-lg leading-none">{cnt(c)}</div>
                <div className="text-violet-300 text-[10px] mt-0.5">{c}</div>
              </div>
            ))}
            <div className="text-center">
              <div className="text-white font-bold text-2xl leading-none">{reports.length}</div>
              <div className="text-violet-300 text-[10px] mt-0.5">전체</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="bg-white border-b border-gray-200 sticky top-14 z-20 shadow-sm">
        <div className="max-w-4xl mx-auto px-5">
          <div className="flex overflow-x-auto gap-0.5 py-1.5">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setActiveTab(c)}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === c
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                }`}>
                {c !== "전체" && CAT[c] && <span>{CAT[c].icon}</span>}
                {c}
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  activeTab === c ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"
                }`}>{cnt(c)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── REPORT LIST ── */}
      <main className="max-w-4xl mx-auto px-5 py-6">
        {sorted.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            <div className="text-5xl mb-3">🗂️</div>
            <p className="text-sm">해당 카테고리에 리포트가 없습니다</p>
          </div>
        )}

        <div className="space-y-8">
        {grouped.map((group) => (
          <section key={group.date}>
            {/* Date Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-800">{formatDate(group.date)}</span>
                <span className="text-[11px] text-gray-400 bg-gray-100 rounded-full px-2 py-0.5 font-medium">{group.reports.length}건</span>
              </div>
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[11px] text-gray-400 font-mono">{group.date}</span>
            </div>

            {/* Reports in this date */}
            <div className="space-y-3">
            {group.reports.map((r) => {
              const cat = CAT[r.category];
              return (
                <article key={r.id} onClick={() => window.open(`/reports/${r.id}`, "_blank")}
                  className={`group bg-white rounded-xl border border-gray-200 border-l-4 ${cat?.border ?? "border-l-gray-300"} hover:shadow-md hover:border-gray-300 transition-all cursor-pointer flex gap-0`}>

                  {/* INDEX */}
                  <div className="flex items-start justify-center w-12 pt-5 shrink-0">
                    <span className="text-[11px] font-mono text-gray-300 font-semibold">
                      #{String(r.id).padStart(2, "0")}
                    </span>
                  </div>

                  {/* BODY */}
                  <div className="flex-1 py-4 pr-5">
                    {/* Category */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: cat?.bg, color: cat?.text }}>
                        {cat?.icon} {r.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-[15px] font-bold text-gray-900 mb-1.5 leading-snug group-hover:text-violet-700 transition-colors">
                      {r.title}
                    </h2>

                    {/* Summary */}
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">
                      {r.summary}
                    </p>

                    {/* Tags + Arrow */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {r.tags.slice(0, 4).map(t => (
                          <span key={t} className="text-[10px] text-gray-400 bg-gray-100 rounded px-1.5 py-0.5">{t}</span>
                        ))}
                        {r.tags.length > 4 && <span className="text-[10px] text-gray-300">+{r.tags.length - 4}</span>}
                      </div>
                      <span className="text-[11px] text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity font-medium shrink-0 ml-2">
                        보기 →
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
            </div>
          </section>
        ))}
        </div>
      </main>

      {/* ── CHAT ── */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/30" onClick={() => setChatOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-gray-200 flex flex-col overflow-hidden" style={{ height: 420 }}>
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white text-sm font-semibold">AI 문의</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-white/70 hover:text-white text-xl leading-none">×</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user" ? "bg-violet-600 text-white rounded-br-sm" : "bg-white text-gray-700 border border-gray-200 rounded-bl-sm shadow-sm"
                  }`}>{m.text}</div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
              <input value={chatInput} onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
                placeholder="메시지를 입력하세요..." 
                className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-violet-400 transition-colors bg-gray-50" />
              <button onClick={send} disabled={sending || !chatInput.trim()}
                className="bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white text-sm px-4 rounded-xl font-medium transition-all">
                전송
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
