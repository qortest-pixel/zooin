"use client";

import ReactMarkdown from "react-markdown";

type Report = {
  id: number;
  title: string;
  summary: string;
  category: string;
  date: string;
  tags: string[];
  content?: string;
};

const CAT: Record<string, { color: string; bg: string; text: string; icon: string; gradient: string }> = {
  기획서:   { color: "#8b5cf6", bg: "#f5f3ff", text: "#6d28d9", icon: "📋", gradient: "from-violet-600 to-purple-700" },
  아키텍처: { color: "#3b82f6", bg: "#eff6ff", text: "#1d4ed8", icon: "🏗️", gradient: "from-blue-600 to-indigo-700" },
  자동화:   { color: "#10b981", bg: "#ecfdf5", text: "#047857", icon: "⚡", gradient: "from-emerald-600 to-teal-700" },
  결과보고: { color: "#f59e0b", bg: "#fffbeb", text: "#b45309", icon: "📊", gradient: "from-amber-500 to-orange-600" },
  코드리뷰: { color: "#14b8a6", bg: "#f0fdfa", text: "#0f766e", icon: "🔍", gradient: "from-teal-600 to-cyan-700" },
  태스크:   { color: "#f97316", bg: "#fff7ed", text: "#c2410c", icon: "✅", gradient: "from-orange-500 to-red-600" },
};

export default function ReportDetail({ report }: { report: Report }) {
  const cat = CAT[report.category];

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center text-white font-black text-xs shadow-sm">Z</div>
            <span className="font-bold text-gray-900 text-sm">zooin Reports</span>
          </a>
          <a href="/" className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1 transition-colors">
            ← 전체 목록
          </a>
        </div>
      </nav>

      {/* Hero header */}
      <div className={`bg-gradient-to-br ${cat?.gradient ?? "from-gray-700 to-gray-900"}`}>
        <div className="max-w-3xl mx-auto px-5 py-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-mono bg-white/20 text-white px-2 py-0.5 rounded">
              #{String(report.id).padStart(3, "0")}
            </span>
            <span className="text-xs font-semibold bg-white/20 text-white px-2.5 py-0.5 rounded-full">
              {cat?.icon} {report.category}
            </span>
            <span className="text-xs text-white/60 font-mono ml-auto">{report.date}</span>
          </div>
          <h1 className="text-white text-xl sm:text-2xl font-bold leading-snug mb-3">{report.title}</h1>
          <p className="text-white/70 text-sm leading-relaxed">{report.summary}</p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {report.tags.map(t => (
              <span key={t} className="text-[11px] bg-white/15 text-white/80 border border-white/20 rounded-full px-2.5 py-0.5">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-5 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-10">
            <div className="prose prose-gray max-w-none
              prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
              prose-h1:text-xl prose-h1:border-b prose-h1:border-gray-100 prose-h1:pb-3 prose-h1:mb-5
              prose-h2:text-lg prose-h2:mt-10 prose-h2:mb-3 prose-h2:text-gray-800
              prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2 prose-h3:text-gray-700
              prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-[14px]
              prose-li:text-gray-600 prose-li:leading-relaxed prose-li:text-[14px]
              prose-strong:text-gray-800 prose-strong:font-semibold
              prose-code:bg-gray-100 prose-code:text-violet-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[12px] prose-code:font-mono
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:text-[12px] prose-pre:leading-relaxed
              prose-table:text-sm prose-th:bg-gray-50 prose-th:text-gray-700 prose-th:font-semibold prose-th:text-left prose-td:text-gray-600 prose-td:py-2
              prose-blockquote:border-l-4 prose-blockquote:border-violet-300 prose-blockquote:text-gray-500 prose-blockquote:italic prose-blockquote:bg-violet-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
              prose-a:text-violet-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
              prose-hr:border-gray-100">
              {report.content ? <ReactMarkdown>{report.content}</ReactMarkdown> : <p>{report.summary}</p>}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <a href="/" className="text-xs text-gray-400 hover:text-violet-600 transition-colors flex items-center gap-1 py-2 px-3 rounded-lg hover:bg-white border border-transparent hover:border-gray-200">
            ← 전체 목록으로
          </a>
          <span className="text-[10px] text-gray-300 font-mono">zooin Reports #{String(report.id).padStart(3, "0")}</span>
        </div>
      </main>
    </div>
  );
}
