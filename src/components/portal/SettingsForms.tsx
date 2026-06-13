"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { PortalDict } from "@/lib/portal-i18n";

type SettingsDict = PortalDict["settings"];

type Profile = {
  name: string;
  email: string;
  practiceName: string;
  phone: string;
  avatarUrl: string | null;
};

export default function SettingsForms({ profile, t }: Readonly<{ profile: Profile; t: SettingsDict }>) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <ProfileForm profile={profile} t={t} />
      <AvatarForm avatarUrl={profile.avatarUrl} name={profile.name} t={t} />
      <PasswordForm t={t} />
    </div>
  );
}

function ProfileForm({ profile, t }: Readonly<{ profile: Profile; t: SettingsDict }>) {
  const router = useRouter();
  const [name, setName] = useState(profile.name);
  const [practiceName, setPracticeName] = useState(profile.practiceName);
  const [phone, setPhone] = useState(profile.phone);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setBusy(true);
    const res = await fetch("/api/account/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, practiceName, phone }),
    });
    setBusy(false);
    if (res.ok) {
      setMsg({ kind: "ok", text: t.saved });
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setMsg({ kind: "err", text: data.error ?? t.saveFailed });
    }
  }

  return (
    <div className="p-card">
      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>{t.profile}</h3>
      {msg && <div className={msg.kind === "ok" ? "p-success" : "p-error"}>{msg.text}</div>}
      <form onSubmit={submit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
          <div className="p-field">
            <label htmlFor="s-name">{t.name}</label>
            <input id="s-name" className="p-input" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="p-field">
            <label htmlFor="s-email">{t.emailLocked}</label>
            <input id="s-email" className="p-input" value={profile.email} disabled style={{ background: "var(--bg-soft)", color: "var(--gray)" }} />
          </div>
          <div className="p-field">
            <label htmlFor="s-practice">{t.practice}</label>
            <input id="s-practice" className="p-input" value={practiceName} onChange={(e) => setPracticeName(e.target.value)} />
          </div>
          <div className="p-field">
            <label htmlFor="s-phone">{t.phone}</label>
            <input id="s-phone" className="p-input" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>
        <button type="submit" className="p-btn" disabled={busy}>{busy ? t.saving : t.save}</button>
      </form>
    </div>
  );
}

function AvatarForm({ avatarUrl, name, t }: Readonly<{ avatarUrl: string | null; name: string; t: SettingsDict }>) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(avatarUrl);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

  function pickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 500 * 1024) {
      setMsg({ kind: "err", text: t.imgTooBig });
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setPreview(dataUrl);
      setBusy(true);
      setMsg(null);
      const res = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatarUrl: dataUrl }),
      });
      setBusy(false);
      if (res.ok) {
        setMsg({ kind: "ok", text: t.avatarUpdated });
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setMsg({ kind: "err", text: data.error ?? t.uploadFailed });
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="p-card">
      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>{t.avatar}</h3>
      {msg && <div className={msg.kind === "ok" ? "p-success" : "p-error"}>{msg.text}</div>}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {preview ? (
          <img src={preview} alt={t.avatar} style={{ width: 72, height: 72, objectFit: "cover", borderRadius: "50%" }} />
        ) : (
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700 }}>
            {initials}
          </div>
        )}
        <div>
          <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={pickFile} style={{ display: "none" }} />
          <button className="p-btn ghost" onClick={() => fileRef.current?.click()} disabled={busy}>
            {busy ? t.uploading : t.pickImage}
          </button>
          <p style={{ fontSize: 12, color: "var(--gray-light)", marginTop: 8 }}>{t.imgHint}</p>
        </div>
      </div>
    </div>
  );
}

function PasswordForm({ t }: Readonly<{ t: SettingsDict }>) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (next !== confirm) {
      setMsg({ kind: "err", text: t.pwMismatch });
      return;
    }
    setBusy(true);
    const res = await fetch("/api/account/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: current, newPassword: next }),
    });
    setBusy(false);
    if (res.ok) {
      setMsg({ kind: "ok", text: t.pwChanged });
      setCurrent(""); setNext(""); setConfirm("");
    } else {
      const data = await res.json().catch(() => ({}));
      setMsg({ kind: "err", text: data.error ?? t.pwFailed });
    }
  }

  return (
    <div className="p-card">
      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>{t.changePassword}</h3>
      {msg && <div className={msg.kind === "ok" ? "p-success" : "p-error"}>{msg.text}</div>}
      <form onSubmit={submit}>
        <div className="p-field">
          <label htmlFor="pw-current">{t.currentPw}</label>
          <input id="pw-current" type="password" className="p-input" value={current} onChange={(e) => setCurrent(e.target.value)} required autoComplete="current-password" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
          <div className="p-field">
            <label htmlFor="pw-new">{t.newPw}</label>
            <input id="pw-new" type="password" className="p-input" value={next} onChange={(e) => setNext(e.target.value)} required minLength={8} autoComplete="new-password" />
          </div>
          <div className="p-field">
            <label htmlFor="pw-confirm">{t.confirmPw}</label>
            <input id="pw-confirm" type="password" className="p-input" value={confirm} onChange={(e) => setConfirm(e.target.value)} required minLength={8} autoComplete="new-password" />
          </div>
        </div>
        <button type="submit" className="p-btn" disabled={busy}>{busy ? t.changing : t.changeBtn}</button>
      </form>
    </div>
  );
}
