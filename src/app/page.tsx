import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="marketing-shell">
      <section className="marketing-card">
        <div className="marketing-copy">
          <div className="eyebrow">Imported Design Direction</div>
          <h1>SmartCompliance AI now follows the provided enterprise UI system.</h1>
          <p>
            The supplied design pack has been translated into a clean Next.js experience with a left navigation shell,
            data-first workspace screens, and corrected spacing and mobile behavior.
          </p>
          <div className="hero-actions">
            <Link href="/dashboard" className="primary-button">
              Open Dashboard
            </Link>
            <Link href="/login" className="secondary-button">
              View Login
            </Link>
          </div>
        </div>
        <div className="marketing-visual">
          <Image src="/logo-shield.png" alt="SmartCompliance AI shield" width={120} height={120} />
          <div className="visual-card">
            <strong>11 screens</strong>
            <span>Dashboard, monitoring, risk, cases, watchlists, reports, audit, settings, and auth.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
