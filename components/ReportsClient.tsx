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

const CATEGORY_COLORS: Record<string, string> = {
  전략: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  분석: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  자동화: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  대화: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

export default function ReportsClient({ reports }: { reports: Report[] }) {
  const [activeTab, setActiveTab] = useState("전체");

  const filtered =
    activeTab === "전체"
      ? reports
      : reports.filter((r) => r.category === activeTab);

  const countFor = (cat: string) =>
    cat === "전체"
      ? reports.length
      : reports.filter((r) => r.category === cat).length;

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              zooin <span className="text-white/40">Reports</span>
            </h1>
            <p className="text-sm text-white/40 mt-0.5">
              전략 · 분석 · 자동화 · 대화
            </p>
          </div>
          <span className="text-xs text-white/30 bg-white/5 border border-white/10 rounded-full px-3 py-1">
            {reports.length}개의 기록
          </span>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-white/10 px-6">
        <div className="max-w-4xl mx-auto flex gap-1 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === cat
                  ? "border-white text-white"
                  : "border-transparent text-white/40 hover:text-white/70"
              }`}
            >
              {cat}
              <span
                className={`text-xs rounded-full px-1.5 py-0.5 ${
                  activeTab === cat
                    ? "bg-white/20 text-white"
                    : "bg-white/5 text-white/30"
                }`}
              >
                {countFor(cat)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {filtered.length === 0 ? (
          <div className="text-center text-white/30 py-20 text-sm">
            아직 기록이 없어요
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((report) => (
              <div
                key={report.id}
                className="group bg-white/[0.03] border border-white/10 rounded-xl p-5 hover:bg-white/[0.06] hover:border-white/20 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white/30 text-xs font-mono">
                        #{String(report.id).padStart(3, "0")}
                      </span>
                      <span
                        className={`text-xs border rounded-full px-2 py-0.5 ${
                          CATEGORY_COLORS[report.category] ??
                          "bg-white/10 text-white/50 border-white/20"
                        }`}
                      >
                        {report.category}
                      </span>
                    </div>
                    <h2 className="font-semibold text-white/90 group-hover:text-white transition-colors leading-snug">
                      {report.title}
                    </h2>
                    <p className="text-sm text-white/40 mt-1.5 leading-relaxed line-clamp-2">
                      {report.summary}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {report.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-white/30 bg-white/5 rounded px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <time className="text-xs text-white/30 whitespace-nowrap pt-0.5">
                    {report.date}
                  </time>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
