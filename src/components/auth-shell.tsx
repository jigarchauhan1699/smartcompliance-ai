import Image from "next/image";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export function AuthShell({ eyebrow, title, description, children }: AuthShellProps) {
  void title;
  void description;

  return (
    <main className="auth-surface">
      <section className="auth-composite-card">
        <div className="auth-form-side">{children}</div>

        <section className="auth-visual" aria-label={`${eyebrow} preview`}>
          <div className="auth-visual-frame">
            <div className="auth-visual-brand">
              <Image src="/logo-shield-auth.png" alt="SmartCompliance AI logo" width={46} height={46} />
              <div>
                <strong>SmartCompliance AI</strong>
                <span>Secure compliance workspace</span>
              </div>
            </div>

            <div className="auth-visual-stage">
              <div className="auth-visual-hero">
                <div className="auth-visual-hero-bg" />
                <div className="auth-visual-hero-lines" />
                <div className="auth-visual-hero-card">
                  <Image src="/logo-shield-auth.png" alt="SmartCompliance shield" width={320} height={320} priority />
                </div>
              </div>

              <div className="auth-visual-float auth-visual-float-one">
                <strong>AI Screening</strong>
                <span>94% auto-cleared</span>
              </div>

              <div className="auth-visual-float auth-visual-float-two">
                <strong>Live Cases</strong>
                <span>42 active reviews</span>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
