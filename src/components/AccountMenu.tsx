"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const B    = "#2563EB";
const BD   = "#1d4ed8";
const INK  = "#0A0A0A";
const LINE = "#E5E7EB";

type SessionUser = { name: string | null; email: string; avatarUrl: string | null } | null;

function initials(u: { name: string | null; email: string }): string {
  const src = (u.name?.trim() || u.email);
  const parts = src.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return src.slice(0, 2).toUpperCase();
}

/**
 * Marketing-nav account control. Signed out → the "Get Started / Login" CTA.
 * Signed in → an avatar button that opens a menu (portal · settings · log out).
 * `solid` matches the nav's light/dark state (only affects the chevron colour).
 */
export default function AccountMenu({
  lang, solid, ctaLabel, labels,
}: Readonly<{
  lang: string;
  solid: boolean;
  ctaLabel: string;
  labels: { portal: string; settings: string; logout: string };
}>) {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser>(null);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : { user: null }))
      .then((d) => { if (active) setUser(d.user ?? null); })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    setUser(null);
    setOpen(false);
    router.push(`/${lang}`);
    router.refresh();
  }

  // Signed out (or still checking) → login CTA
  if (!user) {
    return (
      <a href="/portal/login"
        style={{ background: B, border: "none", padding: "10px 24px", color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "'Inter',sans-serif", textDecoration: "none", letterSpacing: ".04em", display: "inline-block", transition: "background .2s" }}
        onMouseOver={(e) => (e.currentTarget.style.background = BD)}
        onFocus={(e) => (e.currentTarget.style.background = BD)}
        onMouseOut={(e) => (e.currentTarget.style.background = B)}
        onBlur={(e) => (e.currentTarget.style.background = B)}>{ctaLabel}</a>
    );
  }

  // Signed in → avatar + dropdown
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} aria-label="Account menu" aria-expanded={open}
        style={{ display: "flex", alignItems: "center", gap: 7, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        <span style={{ width: 34, height: 34, borderRadius: "50%", background: B, backgroundImage: user.avatarUrl ? `url(${user.avatarUrl})` : undefined, backgroundSize: "cover", backgroundPosition: "center", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 12.5, flexShrink: 0 }}>
          {!user.avatarUrl && initials(user)}
        </span>
        <span style={{ fontSize: 9, color: solid ? "#6B7280" : "rgba(255,255,255,.7)", transition: "transform .2s", transform: open ? "rotate(180deg)" : "none" }}>▾</span>
      </button>

      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 10px)", right: 0, background: "#fff", border: `1px solid ${LINE}`, boxShadow: "0 14px 40px rgba(0,0,0,.14)", minWidth: 210, zIndex: 30, overflow: "hidden" }}>
          <div style={{ padding: "13px 16px", borderBottom: `1px solid ${LINE}` }}>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, color: INK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name || user.email}</div>
            <div style={{ fontSize: 11, color: "#9CA3AF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.email}</div>
          </div>
          <a href="/portal" className="acct-item">{labels.portal}</a>
          <a href="/portal/settings" className="acct-item">{labels.settings}</a>
          <button onClick={logout} className="acct-item acct-logout">{labels.logout}</button>
        </div>
      )}

      <style>{`
        .acct-item { display:block; width:100%; text-align:left; padding:11px 16px; font-size:13.5px; color:#374151; text-decoration:none; font-family:'Inter',sans-serif; background:none; border:none; cursor:pointer; }
        .acct-item:hover { background:#F5F5F3; }
        .acct-logout { color:#dc2626; border-top:1px solid ${LINE}; }
      `}</style>
    </div>
  );
}
