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

const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  전략:    { bg: "bg-violet-100", text: "text-violet-700", dot: "bg-violet-400" },
  분석:    { bg: "bg-blue-100",   text: "text-blue-700",   dot: "bg-blue-400" },
  자동화:  { bg: "bg-emerald-100",text: "text-emerald-700",dot: "bg-emerald-400" },
  결과보고:{ bg: "bg-amber-100",  text: "text-amber-700",  dot: "bg-amber-400" },
  아키텍처:{ bg: "bg-sky-100",    text: "text-sky-700",    dot: "bg-sky-400" },
  기획서:  { bg: "bg-pink-100",   text: "text-pink-700",   dot: "bg-pink-400" },
  태스크:  { bg: "bg-orange-100", text: "text-orange-700", dot: "bg-orange-400" },
  코드리뷰:{ bg: "bg-teal-100",   text: "text-teal-700",   dot: "bg-teal-400" },
};

export default function ReportDetail({ report }: { report: Report }) {
  const color = CATEGORY_COLORS[report.category];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-blue-500 rounded-lg" />
            <span className="font-bold text-gray-800">zooin Reports</span>
          </a>
          <a href="/" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">← 목록으로</a>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* Meta */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-mono text-gray-400">#{String(report.id).padStart(3, "0")}</span>
          {color && (
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 ${color.bg} ${color.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${color.dot}`} />
              {report.category}
            </span>
          )}
          <span className="text-xs text-gray-400 ml-auto">{report.date}</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-snug">{report.title}</h1>
        <p className="text-gray-500 mb-4 leading-relaxed">{report.summary}</p>

        <div className="flex flex-wrap gap-1.5 mb-8">
          {report.tags.map((tag) => (
            <span key={tag} className="text-xs text-gray-400 bg-gray-100 rounded px-2 py-0.5">{tag}</span>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <div className="prose prose-gray max-w-none
            prose-headings:font-bold prose-headings:text-gray-800
            prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-li:text-gray-600 prose-li:leading-relaxed
            prose-code:bg-gray-100 prose-code:text-violet-700 prose-code:px-1 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:text-gray-100
            prose-table:text-sm prose-th:bg-gray-50">
            {report.content ? (
              <ReactMarkdown>{report.content}</ReactMarkdown>
            ) : (
              <p>{report.summary}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
