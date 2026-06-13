"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type ShellDict = {
  portal: string;
  home: string;
  nav: { overview: string; health: string; plan: string; upgrade: string; support: string; settings: string };
  logout: string;
  allOk: string;
  menu: string;
};

type UserInfo = { name: string; email: string; avatarUrl: string | null };

export function setPortalLang(lang: "de" | "en") {
  document.cookie = `jn_lang=${lang};path=/;max-age=${60 * 60 * 24 * 365}`;
}

export function LangToggle({ lang, dark = false }: Readonly<{ lang: "de" | "en"; dark?: boolean }>) {
  const router = useRouter();
  const idleBorder = dark ? "rgba(255,255,255,.25)" : "var(--hairline)";
  const idleColor = dark ? "rgba(255,255,255,.7)" : "var(--gray)";
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {(["de", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => { setPortalLang(l); router.refresh(); }}
          style={{
            padding: "5px 10px",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            fontFamily: "'Inter',sans-serif",
            cursor: "pointer",
            border: `1px solid ${lang === l ? "var(--green)" : idleBorder}`,
            background: lang === l ? "var(--green)" : "transparent",
            color: lang === l ? "#fff" : idleColor,
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export type NavItem = { href: string; label: string; icon: string };

export default function PortalShell({ user, lang, t, items, rootHref = "/portal", notifyHref, children }: Readonly<{ user: UserInfo; lang: "de" | "en"; t: ShellDict; items?: NavItem[]; rootHref?: string; notifyHref?: string; children: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifyCount, setNotifyCount] = useState(0);

  useEffect(() => {
    if (!notifyHref) return;
    let active = true;
    const poll = async () => {
      try {
        const res = await fetch("/api/portal/notifications");
        if (res.ok && active) setNotifyCount((await res.json()).count ?? 0);
      } catch {
        /* ignore transient errors */
      }
    };
    poll();
    const iv = setInterval(poll, 10000);
    return () => { active = false; clearInterval(iv); };
  }, [notifyHref, pathname]);

  const NAV: NavItem[] = items ?? [
    { href: "/portal", label: t.nav.overview, icon: "▦" },
    { href: "/portal/health", label: t.nav.health, icon: "♥" },
    { href: "/portal/plan", label: t.nav.plan, icon: "▤" },
    { href: "/portal/upgrade", label: t.nav.upgrade, icon: "↑" },
    { href: "/portal/support", label: t.nav.support, icon: "✉" },
    { href: "/portal/settings", label: t.nav.settings, icon: "⚙" },
  ];

  const isActive = (href: string) =>
    href === rootHref ? pathname === rootHref : pathname.startsWith(href);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/portal/login");
    router.refresh();
  }

  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const homeLink = (
    <a href="/de-CH" className="p-nav-link" style={{ borderBottom: "1px solid var(--hairline)" }}>
      <span aria-hidden style={{ width: 18, textAlign: "center", fontSize: 13 }}>⌂</span>
      {t.home}
    </a>
  );

  const navLinks = NAV.map((n) => {
    const showBadge = notifyHref === n.href && notifyCount > 0;
    return (
      <a key={n.href} href={n.href} className={`p-nav-link${isActive(n.href) ? " active" : ""}`}>
        <span aria-hidden style={{ width: 18, textAlign: "center", fontSize: 13 }}>{n.icon}</span>
        {n.label}
        {showBadge && (
          <span
            aria-label={`${notifyCount}`}
            style={{
              marginLeft: "auto", minWidth: 18, height: 18, padding: "0 5px",
              borderRadius: 9, background: "var(--crit)", color: "#fff",
              fontSize: 11, fontWeight: 700, display: "inline-flex",
              alignItems: "center", justifyContent: "center", lineHeight: 1,
            }}
          >
            {notifyCount}
          </span>
        )}
      </a>
    );
  });

  return (
    <div className="p-shell">
      <aside className="p-side">
        <div className="p-side-brand">
          <a href="/de-CH" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "'Libre Franklin',sans-serif", fontWeight: 800, fontSize: 17, color: "var(--ink)", letterSpacing: "-.01em" }}>
              jerumed<span style={{ color: "var(--green)" }}>nexus</span>
            </span>
          </a>
          <div className="p-label" style={{ marginTop: 6 }}>{t.portal}</div>
        </div>
        <nav className="p-nav">
          {homeLink}
          {navLinks}
        </nav>
        <div className="p-side-foot" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <LangToggle lang={lang} />
          <button onClick={logout} className="p-arrow-link" style={{ color: "var(--gray)" }}>
            {t.logout} →
          </button>
        </div>
      </aside>

      <div className="p-main">
        <header className="p-topbar">
          <button
            className="p-mobile-nav"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t.menu}
            style={{ background: "none", border: "1px solid var(--hairline)", padding: "8px 12px", cursor: "pointer", fontSize: 14, alignItems: "center", gap: 8 }}
          >
            ☰ {t.menu}
          </button>
          <div className="p-label" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="p-dot ok" /> {t.allOk}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{user.name}</div>
              <div style={{ fontSize: 11, color: "var(--gray)" }}>{user.email}</div>
            </div>
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="" style={{ width: 38, height: 38, objectFit: "cover", borderRadius: "50%" }} />
            ) : (
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>
                {initials}
              </div>
            )}
          </div>
        </header>

        {menuOpen && (
          <nav style={{ background: "#fff", borderBottom: "1px solid var(--hairline)" }}>
            {homeLink}
            {navLinks}
            <div style={{ padding: "12px 28px" }}>
              <LangToggle lang={lang} />
            </div>
            <button onClick={logout} className="p-nav-link" style={{ width: "100%", background: "none", border: "none", borderLeft: "3px solid transparent", cursor: "pointer", textAlign: "left" }}>
              {t.logout}
            </button>
          </nav>
        )}

        <main className="p-content">{children}</main>
      </div>
    </div>
  );
}
