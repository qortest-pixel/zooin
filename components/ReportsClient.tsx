"use client";

import { useState } from "react";

type Report = {
  id: number;
  title: string;
  summary: string;
  category: string;
  date: string;
  tags: string[];
};

const CATEGORIES = ["전체", "전략", "분석", "자동화", "대화"];

const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  전략: { bg: "bg-violet-100", text: "text-violet-700", dot: "bg-violet-400" },
  분석: { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-400" },
  자동화: { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-400" },
  대화: { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-400" },
};

// Model usage: wired up after Cloudflare tunnel setup
const MODELS: { name: string; color: string; used: number; total: number }[] = [];

export default function ReportsClient({ reports: initialReports }: { reports: Report[] }) {
  const [activeTab, setActiveTab] = useState("전체");
  const [reports, setReports] = useState(initialReports);
  const [selected, setSelected] = useState<Report | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<Report | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: string; text: string }[]>([
    { role: "ai", text: "안녕하세요 대표님! zooin 사이트 관련해서 수정하고 싶은 게 있으면 말씀해주세요." },
  ]);
  const [chatInput, setChatInput] = useState("");

  const filtered = activeTab === "전체" ? reports : reports.filter((r) => r.category === activeTab);
  const countFor = (cat: string) =>
    cat === "전체" ? reports.length : reports.filter((r) => r.category === cat).length;

  function openDetail(r: Report) {
    setSelected(r);
    setEditData({ ...r });
    setEditMode(false);
  }

  function saveEdit() {
    if (!editData) return;
    setReports((prev) => prev.map((r) => (r.id === editData.id ? editData : r)));
    setSelected(editData);
    setEditMode(false);
  }

  async function sendChat() {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setChatInput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.ok
            ? "✅ 전송됐습니다! 텔레그램으로 확인해보세요."
            : `❌ 오류: ${data.error}`,
        },
      ]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        { role: "ai", text: "❌ 네트워크 오류가 발생했습니다." },
      ]);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-blue-500 rounded-lg" />
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-none">zooin Reports</h1>
              <p className="text-xs text-gray-400 mt-0.5">전략 · 분석 · 자동화 · 대화</p>
            </div>
          </div>

          {/* Model Usage */}
          <div className="flex items-center gap-4">
            {MODELS.map((m) => (
              <div key={m.name} className="hidden sm:flex items-center gap-2">
                <span className="text-xs text-gray-500">{m.name}</span>
                <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${m.color} rounded-full transition-all`}
                    style={{ width: `${m.used}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-600">{m.used}%</span>
              </div>
            ))}
            <button
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
            >
              <span>💬</span> AI 수정 요청
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="max-w-5xl mx-auto flex gap-0 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`flex items-center gap-1.5 px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === cat
                  ? "border-violet-600 text-violet-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {cat}
              <span
                className={`text-xs rounded-full px-2 py-0.5 font-semibold ${
                  activeTab === cat ? "bg-violet-100 text-violet-600" : "bg-gray-100 text-gray-400"
                }`}
              >
                {countFor(cat)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Reports */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-400 py-20 text-sm">아직 기록이 없어요</div>
        ) : (
          <div className="grid gap-3">
            {filtered.map((report) => {
              const color = CATEGORY_COLORS[report.category];
              return (
                <div
                  key={report.id}
                  onClick={() => openDetail(report)}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:border-violet-300 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-300 text-xs font-mono">
                          #{String(report.id).padStart(3, "0")}
                        </span>
                        {color && (
                          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 ${color.bg} ${color.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${color.dot}`} />
                            {report.category}
                          </span>
                        )}
                      </div>
                      <h2 className="font-semibold text-gray-800 group-hover:text-violet-700 transition-colors">
                        {report.title}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                        {report.summary}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {report.tags.map((tag) => (
                          <span key={tag} className="text-xs text-gray-400 bg-gray-100 rounded px-2 py-0.5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <time className="text-xs text-gray-400">{report.date}</time>
                      <span className="text-gray-300 group-hover:text-violet-400 transition-colors text-lg">→</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            {!editMode ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-gray-400">#{String(selected.id).padStart(3, "0")}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditMode(true)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      ✏️ 수정
                    </button>
                    <button
                      onClick={() => setSelected(null)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-500 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      닫기
                    </button>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">{selected.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-4">{selected.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-500 rounded px-2 py-1">{tag}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-4">{selected.date}</p>
              </>
            ) : (
              <>
                <h3 className="font-semibold text-gray-800 mb-4">수정하기</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">제목</label>
                    <input
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-400"
                      value={editData?.title}
                      onChange={(e) => setEditData((d) => d ? { ...d, title: e.target.value } : d)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">요약</label>
                    <textarea
                      rows={3}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-400 resize-none"
                      value={editData?.summary}
                      onChange={(e) => setEditData((d) => d ? { ...d, summary: e.target.value } : d)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">카테고리</label>
                    <select
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-400"
                      value={editData?.category}
                      onChange={(e) => setEditData((d) => d ? { ...d, category: e.target.value } : d)}
                    >
                      {CATEGORIES.filter((c) => c !== "전체").map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={saveEdit} className="flex-1 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium py-2 rounded-lg transition-colors">
                    저장
                  </button>
                  <button onClick={() => setEditMode(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm py-2 rounded-lg transition-colors">
                    취소
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Chat Widget */}
      {chatOpen && (
        <div className="fixed bottom-4 right-4 z-30 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="bg-violet-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white text-sm font-medium">AI 수정 요청</span>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-white/70 hover:text-white text-lg leading-none">×</button>
          </div>
          <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-64">
            {chatMessages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`text-xs rounded-xl px-3 py-2 max-w-[85%] leading-relaxed ${
                  m.role === "user"
                    ? "bg-violet-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 p-2 flex gap-2">
            <input
              className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-violet-400"
              placeholder="수정 요청 입력..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendChat()}
            />
            <button onClick={sendChat} className="bg-violet-600 hover:bg-violet-700 text-white text-xs px-3 py-2 rounded-lg transition-colors">
              전송
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
