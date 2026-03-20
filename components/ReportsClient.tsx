"use client";

import { useState } from "react";

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

const CAT_STYLE: Record<string, { pill: string; bar: string; icon: string }> = {
  기획서:   { pill: "bg-violet-100 text-violet-700 border-violet-200",  bar: "bg-violet-400", icon: "📋" },
  아키텍처: { pill: "bg-blue-100   text-blue-700   border-blue-200",    bar: "bg-blue-400",   icon: "🏗️" },
  자동화:   { pill: "bg-emerald-100 text-emerald-700 border-emerald-200", bar: "bg-emerald-400", icon: "⚡" },
  결과보고: { pill: "bg-amber-100  text-amber-700  border-amber-200",   bar: "bg-amber-400",  icon: "📊" },
  코드리뷰: { pill: "bg-teal-100   text-teal-700   border-teal-200",    bar: "bg-teal-400",   icon: "🔍" },
  태스크:   { pill: "bg-orange-100 text-orange-700 border-orange-200",  bar: "bg-orange-400", icon: "✅" },
};

export default function ReportsClient({ reports }: { reports: Report[] }) {
  const [activeTab, setActiveTab] = useState("전체");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: "ai", text: "안녕하세요 대표님! 궁금한 점이나 수정사항 말씀해주세요." },
  ]);
  const [sending, setSending] = useState(false);

  const filtered = activeTab === "전체" ? reports : reports.filter((r) => r.category === activeTab);
  const count = (cat: string) =>
    cat === "전체" ? reports.length : reports.filter((r) => r.category === cat).length;

  async function sendChat() {
    const msg = chatInput.trim();
    if (!msg || sending) return;
    setSending(true);
    setChatMessages((p) => [...p, { role: "user", text: msg }]);
    setChatInput("");
    try {
      await fetch(
        `https://api.telegram.org/bot8254002875:AAEsgasUuHMDnnXMUZl_VEYmKH9kW5PpBrY/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: "6478080843", text: `[zooin] ${msg}` }),
        }
      );
      setChatMessages((p) => [...p, { role: "ai", text: "전달했습니다! 잠시 후 텔레그램으로 답변드릴게요 🙂" }]);
    } catch {
      setChatMessages((p) => [...p, { role: "ai", text: "전송 실패. 다시 시도해주세요." }]);
    }
    setSending(false);
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] font-sans">
      {/* ── HEADER ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow">Z</div>
            <span className="font-bold text-gray-900 text-[15px] tracking-tight">zooin</span>
            <span className="hidden sm:inline text-gray-300 text-xs ml-1">Reports</span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <a href="/crons"
              className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 border border-gray-200 hover:border-gray-300 bg-white px-3 py-1.5 rounded-lg transition-all">
              ⚙️ 크론 대시보드
            </a>
            <button
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-1.5 text-xs text-white bg-violet-600 hover:bg-violet-700 px-3 py-1.5 rounded-lg transition-all shadow-sm">
              💬 AI 문의
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5 py-8">
          <p className="text-xs text-violet-600 font-semibold tracking-widest uppercase mb-2">Work Archive</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">AI 협업 프로젝트 기록</h1>
          <p className="text-sm text-gray-500">멀티에이전트 · 자동화 · 전략기획 · 시장조사 리포트</p>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="bg-white border-b border-gray-200 sticky top-14 z-20">
        <div className="max-w-5xl mx-auto px-5">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === cat
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                }`}>
                {cat !== "전체" && CAT_STYLE[cat] && (
                  <span className="text-xs">{CAT_STYLE[cat].icon}</span>
                )}
                {cat}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                  activeTab === cat ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"
                }`}>
                  {count(cat)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── GRID ── */}
      <main className="max-w-5xl mx-auto px-5 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r) => {
            const s = CAT_STYLE[r.category];
            return (
              <article
                key={r.id}
                onClick={() => window.open(`/reports/${r.id}`, "_blank")}
                className="group bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer overflow-hidden flex flex-col">
                {/* Top color bar */}
                <div className={`h-1 w-full ${s?.bar ?? "bg-gray-300"}`} />

                <div className="p-5 flex flex-col flex-1">
                  {/* Meta row */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${s?.pill ?? "bg-gray-100 text-gray-500 border-gray-200"}`}>
                      {s?.icon} {r.category}
                    </span>
                    <span className="text-[11px] text-gray-400 font-mono">{r.date}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-[15px] font-bold text-gray-900 mb-2 leading-snug group-hover:text-violet-700 transition-colors line-clamp-2">
                    {r.title}
                  </h2>

                  {/* Summary */}
                  <p className="text-xs text-gray-500 leading-relaxed flex-1 line-clamp-3">
                    {r.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-gray-100">
                    {r.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] text-gray-400 bg-gray-50 border border-gray-100 rounded px-1.5 py-0.5">
                        {tag}
                      </span>
                    ))}
                    {r.tags.length > 3 && (
                      <span className="text-[10px] text-gray-300">+{r.tags.length - 3}</span>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-mono">#{String(r.id).padStart(3, "0")}</span>
                  <span className="text-[10px] text-violet-500 font-medium group-hover:underline">자세히 보기 →</span>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-3">🗂️</div>
            <p className="text-sm">해당 카테고리에 리포트가 없습니다</p>
          </div>
        )}
      </main>

      {/* ── CHAT WIDGET ── */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-end sm:justify-end p-4">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setChatOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm flex flex-col overflow-hidden border border-gray-200"
            style={{ height: "420px" }}>
            {/* Chat header */}
            <div className="bg-violet-600 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white text-sm font-semibold">AI 문의</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-white/70 hover:text-white transition-colors text-lg leading-none">×</button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-violet-600 text-white rounded-br-sm"
                      : "bg-gray-100 text-gray-700 rounded-bl-sm"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-100 flex gap-2">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendChat()}
                placeholder="메시지 입력..."
                className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-violet-400 transition-colors"
              />
              <button
                onClick={sendChat}
                disabled={sending || !chatInput.trim()}
                className="bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white text-sm px-4 py-2 rounded-lg font-medium transition-all">
                전송
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
