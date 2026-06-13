"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import type { PortalDict } from "@/lib/portal-i18n";

type InboxDict = PortalDict["admin"]["inbox"];

type TicketUser = { id: string; name: string; email: string; practiceName: string | null };
type Msg = { id: string; sender: string; body: string; createdAt: string };
type Ticket = {
  id: string;
  subject: string;
  channel: string;
  status: string;
  createdAt: string;
  user: TicketUser;
  messages?: Msg[];
};

export default function AdminInbox({ initialTickets, initialTicketId, t, locale }: Readonly<{ initialTickets: Ticket[]; initialTicketId: string | null; t: InboxDict; locale: string }>) {
  const [tickets, setTickets] = useState(initialTickets);
  const [filter, setFilter] = useState<"all" | "open" | "closed">("open");
  const [activeId, setActiveId] = useState<string | null>(initialTicketId);

  const refreshList = useCallback(async () => {
    const res = await fetch("/api/admin/tickets");
    if (res.ok) setTickets((await res.json()).tickets);
  }, []);

  useEffect(() => {
    const iv = setInterval(refreshList, 6000);
    return () => clearInterval(iv);
  }, [refreshList]);

  const filtered = tickets.filter((tk) => filter === "all" || tk.status === filter);
  const filters: Array<"all" | "open" | "closed"> = ["open", "all", "closed"];
  const filterLabel = { all: t.all, open: t.open, closed: t.closed };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 2, minHeight: "calc(100vh - 240px)" }}>
      {/* List */}
      <div style={{ display: "flex", flexDirection: "column", border: "1px solid var(--hairline)", background: "#fff" }}>
        <div style={{ display: "flex", gap: 2, padding: 12, borderBottom: "1px solid var(--hairline)" }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                flex: 1, padding: "7px 6px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif",
                border: `1px solid ${filter === f ? "var(--green)" : "var(--hairline)"}`,
                background: filter === f ? "var(--green)" : "transparent",
                color: filter === f ? "#fff" : "var(--gray)",
              }}
            >
              {filterLabel[f]}
            </button>
          ))}
        </div>
        <div style={{ overflowY: "auto", flex: 1 }}>
          {filtered.length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--gray-light)", textAlign: "center", padding: 32 }}>{t.empty}</p>
          ) : (
            filtered.map((tk) => (
              <button
                key={tk.id}
                onClick={() => setActiveId(tk.id)}
                style={{
                  display: "block", width: "100%", textAlign: "left", cursor: "pointer", fontFamily: "inherit",
                  padding: "14px 16px", border: "none", borderBottom: "1px solid var(--hairline)",
                  borderLeft: `3px solid ${activeId === tk.id ? "var(--green)" : "transparent"}`,
                  background: activeId === tk.id ? "var(--green-soft)" : "#fff",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className={`p-dot ${tk.status === "open" ? "warn" : "ok"}`} style={{ width: 8, height: 8 }} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tk.subject}</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--gray)", marginTop: 4 }}>
                  {tk.user.practiceName ?? tk.user.name} · {tk.channel === "chat" ? t.chat : t.email}
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Conversation */}
      {activeId ? (
        <Conversation key={activeId} ticketId={activeId} t={t} locale={locale} onChanged={refreshList} />
      ) : (
        <div style={{ border: "1px solid var(--hairline)", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-light)", fontSize: 14, padding: 32 }}>
          {t.selectPrompt}
        </div>
      )}
    </div>
  );
}

function Conversation({ ticketId, t, locale, onChanged }: Readonly<{ ticketId: string; t: InboxDict; locale: string; onChanged: () => void }>) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    const res = await fetch(`/api/admin/tickets/${ticketId}`);
    if (res.ok) setTicket((await res.json()).ticket);
  }, [ticketId]);

  useEffect(() => {
    load();
    const iv = setInterval(load, 4000);
    return () => clearInterval(iv);
  }, [load]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ticket?.messages?.length]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setBusy(true);
    const res = await fetch(`/api/admin/tickets/${ticketId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: text }),
    });
    setBusy(false);
    if (res.ok) { setText(""); load(); onChanged(); }
  }

  async function toggleStatus() {
    if (!ticket) return;
    const next = ticket.status === "open" ? "closed" : "open";
    const res = await fetch(`/api/admin/tickets/${ticketId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (res.ok) { load(); onChanged(); }
  }

  if (!ticket) {
    return <div style={{ border: "1px solid var(--hairline)", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-light)", fontSize: 14 }}>…</div>;
  }

  return (
    <div style={{ border: "1px solid var(--hairline)", background: "#fff", display: "flex", flexDirection: "column" }}>
      {/* header */}
      <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--hairline)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{ticket.subject}</div>
            <div style={{ fontSize: 12, color: "var(--gray)", marginTop: 3 }}>
              {t.from}: {ticket.user.name}{ticket.user.practiceName ? ` · ${ticket.user.practiceName}` : ""} · {ticket.user.email}
            </div>
          </div>
          <a href={`/portal/admin/clients/${ticket.user.id}`} className="p-arrow-link" style={{ fontSize: 13 }}>{t.viewClient}</a>
          <button onClick={toggleStatus} className="p-btn ghost" style={{ padding: "8px 16px", fontSize: 13 }}>
            {ticket.status === "open" ? t.markClosed : t.reopen}
          </button>
        </div>
      </div>

      {/* messages */}
      <div className="p-chat-msgs" style={{ flex: 1, minHeight: 320 }}>
        {ticket.messages?.map((m) => (
          <div key={m.id} className={`p-msg ${m.sender === "support" ? "user" : "support"}`}>
            {m.body}
            <time>{new Date(m.createdAt).toLocaleString(locale, { dateStyle: "short", timeStyle: "short" })}</time>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* reply */}
      <form onSubmit={send} style={{ display: "flex", gap: 2, padding: 16, borderTop: "1px solid var(--hairline)" }}>
        <input className="p-input" value={text} onChange={(e) => setText(e.target.value)} placeholder={t.reply} style={{ flex: 1 }} aria-label={t.reply} />
        <button type="submit" className="p-btn" disabled={busy || !text.trim()}>{t.send}</button>
      </form>
    </div>
  );
}
