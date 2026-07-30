"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AppHeader from "@/components/AppHeader";

type Report = {
  id: number;
  title: string;
  summary: string;
  category: string;
  date: string;
  tags: string[];
  content?: string;
};

export default function ReportDetail({ report }: { report: Report }) {
  return (
    <div className="app-shell">
      <AppHeader active="reports" />
      <main className="detail-page">
        <Link href="/" className="back-link">← 전체 리포트</Link>
        <header className="detail-hero">
          <div className="detail-kicker">
            <span>#{String(report.id).padStart(3, "0")}</span>
            <span>{report.category}</span>
            <time>{report.date}</time>
          </div>
          <h1>{report.title}</h1>
          <p>{report.summary}</p>
          <div className="detail-tags">
            {report.tags.map((tag) => <span key={tag}>#{tag}</span>)}
          </div>
        </header>
        <article className="report-document">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {report.content || report.summary}
          </ReactMarkdown>
        </article>
        <footer className="detail-footer">
          <Link href="/">← 전체 목록으로 돌아가기</Link>
          <span>zooin archive · #{String(report.id).padStart(3, "0")}</span>
        </footer>
      </main>
    </div>
  );
}
