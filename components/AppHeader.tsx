import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", label: "리포트", key: "reports" },
  { href: "/tasks", label: "작업", key: "tasks" },
  { href: "/crons", label: "자동화", key: "crons" },
  { href: "/status", label: "프로젝트", key: "status" },
];

export default function AppHeader({ active }: { active: string }) {
  return (
    <header className="app-header">
      <Link href="/" className="brand" aria-label="zooin 홈">
        <span className="brand-mark">z</span>
        <span className="brand-name">zooin</span>
      </Link>
      <nav className="app-nav" aria-label="주요 메뉴">
        {NAV_ITEMS.map((item) => (
          <Link key={item.key} href={item.href} className={active === item.key ? "active" : ""}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
