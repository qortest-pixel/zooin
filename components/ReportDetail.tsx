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

const CAT_STYLE: Record<string, { pill: string; bar: string; icon: string }> = {
  기획서:   { pill: "bg-violet-100 text-violet-700 border-violet-200",   bar: "bg-violet-500",  icon: "📋" },
  아키텍처: { pill: "bg-blue-100   text-blue-700   border-blue-200",     bar: "bg-blue-500",    icon: "🏗️" },
  자동화:   { pill: "bg-emerald-100 text-emerald-700 border-emerald-200", bar: "bg-emerald-500", icon: "⚡" },
  결과보고: { pill: "bg-amber-100  text-amber-700  border-amber-200",    bar: "bg-amber-500",   icon: "📊" },
  코드리뷰: { pill: "bg-teal-100   text-teal-700   border-teal-200",     bar: "bg-teal-500",    icon: "🔍" },
  태스크:   { pill: "bg-orange-100 text-orange-700 border-orange-200",   bar: "bg-orange-500",  icon: "✅" },
};

export default function ReportDetail({ report }: { report: Report }) {
  const s = CAT_STYLE[report.category];

  return (
    <div className="min-h-screen bg-[#f5f5f0] font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow">Z</div>
            <span className="font-bold text-gray-900 text-[15px]">zooin</span>
          </a>
          <a href="/" className="text-xs text-gray-400 hover:text-gray-700 transition-colors flex items-center gap-1">
            ← 목록으로
          </a>
        </div>
      </header>

      {/* Top color bar */}
      <div className={`h-1 w-full ${s?.bar ?? "bg-gray-300"}`} />

      {/* Content */}
      <main className="max-w-3xl mx-auto px-5 py-10">
        {/* Meta */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span className="text-xs font-mono text-gray-400 bg-white border border-gray-200 px-2 py-0.5 rounded">
            #{String(report.id).padStart(3, "0")}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${s?.pill ?? "bg-gray-100 text-gray-500 border-gray-200"}`}>
            {s?.icon} {report.category}
          </span>
          <span className="text-xs text-gray-400 ml-auto font-mono">{report.date}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-snug">{report.title}</h1>
        <p className="text-gray-500 text-sm mb-5 leading-relaxed border-l-2 border-gray-200 pl-3">{report.summary}</p>

        <div className="flex flex-wrap gap-1.5 mb-8">
          {report.tags.map((tag) => (
            <span key={tag} className="text-xs text-gray-500 bg-white border border-gray-200 rounded-md px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>

        {/* Main content */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="prose prose-gray max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h1:text-xl prose-h1:border-b prose-h1:border-gray-100 prose-h1:pb-2 prose-h1:mb-4
              prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-3
              prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
              prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-sm
              prose-li:text-gray-600 prose-li:leading-relaxed prose-li:text-sm
              prose-strong:text-gray-800 prose-strong:font-semibold
              prose-code:bg-gray-100 prose-code:text-violet-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:text-xs
              prose-table:text-sm prose-th:bg-gray-50 prose-th:text-gray-700 prose-th:font-semibold prose-td:text-gray-600
              prose-blockquote:border-l-4 prose-blockquote:border-violet-300 prose-blockquote:text-gray-500 prose-blockquote:italic
              prose-a:text-violet-600 prose-a:no-underline hover:prose-a:underline">
              {report.content
                ? <ReactMarkdown>{report.content}</ReactMarkdown>
                : <p>{report.summary}</p>}
            </div>
          </div>
        </div>

        {/* Bottom nav */}
        <div className="mt-8 flex justify-center">
          <a href="/" className="text-sm text-gray-400 hover:text-violet-600 transition-colors flex items-center gap-1 py-2 px-4 rounded-lg hover:bg-white border border-transparent hover:border-gray-200">
            ← 전체 리포트 보기
          </a>
        </div>
      </main>
    </div>
  );
}
