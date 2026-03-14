import Link from "next/link";

export function TopNav() {
  return (
    <header className="top-nav">
      <div>
        <div className="nav-badge">SmartCompliance AI</div>
      </div>
      <nav className="nav-links">
        <Link className="ghost-link" href="/">
          Home
        </Link>
        <Link className="ghost-link" href="/dashboard">
          Dashboard
        </Link>
        <Link className="ghost-link" href="/auth">
          Auth
        </Link>
      </nav>
    </header>
  );
}
