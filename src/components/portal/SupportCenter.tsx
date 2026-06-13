"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import type { PortalDict } from "@/lib/portal-i18n";

type SupportDict = PortalDict["support"];

type TicketSummary = {
  id: string;
  subject: string;
  channel: string;
  status: string;
  createdAt: string;
};

type Msg = { id: string; sender: string; body: string; createdAt: string };

export default function SupportCenter({ initialTickets, t, locale }: Readonly<{ initialTickets: TicketSummary[]; t: SupportDict; locale: string }>) {
  const [view, setView] = useState<"home" | "new-chat" | "new-email" | "chat">("home");
  const [tickets, setTickets] = useState(initialTickets);
  const [activeTicket, setActiveTicket] = useState<TicketSummary | null>(null);

  async function refreshTickets() {
    const res = await fetch("/api/support/tickets");
    if (res.ok) {
      const data = await res.json();
      setTickets(data.tickets);
    }
  }

  function openTicket(ticket: TicketSummary) {
    setActiveTicket(ticket);
    setView("chat");
  }

  if (view === "chat" && activeTicket) {
    return <ChatView ticket={activeTicket} t={t} locale={locale} onBack={() => { setView("home"); refreshTickets(); }} />;
  }
  if (view === "new-chat" || view === "new-email") {
    return (
      <NewTicketForm
        channel={view === "new-chat" ? "chat" : "email"}
        t={t}
        onDone={(ticketId, subject) => {
          if (view === "new-chat") {
            openTicket({ id: ticketId, subject, channel: "chat", status: "open", createdAt: new Date().toISOString() });
          } else {
            setView("home");
          }
          refreshTickets();
        }}
        onBack={() => setView("home")}
      />
    );
  }

  return (
    <>
      {/* Channel choice */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <div className="p-card">
          <div className="p-label" style={{ marginBottom: 12 }}>{t.instantHelp}</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{t.liveChat}</h3>
          <p style={{ fontSize: 14, color: "var(--gray)", lineHeight: 1.6, marginBottom: 20 }}>{t.liveChatText}</p>
          <button className="p-btn" onClick={() => setView("new-chat")}>{t.startChat}</button>
        </div>
        <div className="p-card">
          <div className="p-label" style={{ marginBottom: 12 }}>{t.classic}</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{t.emailRequest}</h3>
          <p style={{ fontSize: 14, color: "var(--gray)", lineHeight: 1.6, marginBottom: 20 }}>{t.emailRequestText}</p>
          <button className="p-btn ghost" onClick={() => setView("new-email")}>{t.writeRequest}</button>
        </div>
      </div>

      {/* Existing tickets */}
      <div style={{ marginTop: 44 }}>
        <div className="p-label" style={{ marginBottom: 14 }}>{t.yourRequests}</div>
        {tickets.length === 0 ? (
          <div className="p-card" style={{ textAlign: "center", padding: "40px 28px", color: "var(--gray-light)", fontSize: 14 }}>
            {t.empty}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {tickets.map((ticket) => (
              <button
                key={ticket.id}
                className="p-card"
                onClick={() => openTicket(ticket)}
                style={{ display: "flex", alignItems: "center", gap: 18, cursor: "pointer", textAlign: "left", width: "100%", fontFamily: "inherit" }}
              >
                <span className={`p-dot ${ticket.status === "open" ? "warn" : "ok"}`} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>{ticket.subject}</div>
                  <div style={{ fontSize: 12, color: "var(--gray)", marginTop: 3 }}>
                    {ticket.channel === "chat" ? t.liveChat : t.emailRequest} · {new Date(ticket.createdAt).toLocaleDateString(locale)} · {ticket.status === "open" ? t.open : t.closed}
                  </div>
                </div>
                <span style={{ color: "var(--green)", fontWeight: 600, fontSize: 14 }}>{t.openTicket}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function NewTicketForm({ channel, t, onDone, onBack }: Readonly<{ channel: "chat" | "email"; t: SupportDict; onDone: (ticketId: string, subject: string) => void; onBack: () => void }>) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const res = await fetch("/api/support/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, message, channel }),
    });
    setBusy(false);
    if (res.ok) {
      const data = await res.json();
      if (channel === "email") {
        setSent(true);
        setTimeout(() => onDone(data.ticketId, subject), 1800);
      } else {
        onDone(data.ticketId, subject);
      }
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? t.fallbackError);
    }
  }

  if (sent) {
    return (
      <div className="p-card" style={{ textAlign: "center", padding: "56px 28px" }}>
        <div style={{ fontSize: 40, color: "var(--green)" }}>✓</div>
        <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 12 }}>{t.sentTitle}</h3>
        <p style={{ fontSize: 14, color: "var(--gray)", marginTop: 8 }}>{t.sentText}</p>
      </div>
    );
  }

  return (
    <div className="p-card">
      <button onClick={onBack} className="p-arrow-link" style={{ marginBottom: 24, color: "var(--gray)" }}>{t.back}</button>
      <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>
        {channel === "chat" ? t.newChatTitle : t.newEmailTitle}
      </h3>
      {error && <div className="p-error">{error}</div>}
      <form onSubmit={submit}>
        <div className="p-field">
          <label htmlFor="subject">{t.subject}</label>
          <input id="subject" className="p-input" value={subject} onChange={(e) => setSubject(e.target.value)} required placeholder={t.subjectPlaceholder} />
        </div>
        <div className="p-field">
          <label htmlFor="message">{channel === "chat" ? t.firstMessage : t.yourMessage}</label>
          <textarea id="message" className="p-textarea" value={message} onChange={(e) => setMessage(e.target.value)} required placeholder={t.messagePlaceholder} />
        </div>
        <button type="submit" className="p-btn" disabled={busy}>
          {busy ? t.sending : channel === "chat" ? t.sendChat : t.send}
        </button>
      </form>
    </div>
  );
}

function ChatView({ ticket, t, locale, onBack }: Readonly<{ ticket: TicketSummary; t: SupportDict; locale: string; onBack: () => void }>) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    const res = await fetch(`/api/support/tickets/${ticket.id}/messages`);
    if (res.ok) {
      const data = await res.json();
      setMessages(data.ticket.messages);
    }
  }, [ticket.id]);

  useEffect(() => {
    load();
    const iv = setInterval(load, 4000);
    return () => clearInterval(iv);
  }, [load]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setBusy(true);
    const res = await fetch(`/api/support/tickets/${ticket.id}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: text }),
    });
    setBusy(false);
    if (res.ok) {
      setText("");
      load();
    }
  }

  return (
    <div className="p-card" style={{ padding: 0, display: "flex", flexDirection: "column", height: "calc(100vh - 240px)", minHeight: 420 }}>
      <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--hairline)", display: "flex", alignItems: "center", gap: 16 }}>
        <button onClick={onBack} className="p-arrow-link" style={{ color: "var(--gray)" }}>{t.back}</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{ticket.subject}</div>
          <div style={{ fontSize: 11, color: "var(--gray)" }}>
            {ticket.channel === "chat" ? t.liveChat : t.emailRequest} · {ticket.status === "open" ? t.open : t.closed}
          </div>
        </div>
        <span className={`p-dot ${ticket.status === "open" ? "warn" : "ok"}`} />
      </div>

      <div className="p-chat-msgs">
        {messages.map((m) => (
          <div key={m.id} className={`p-msg ${m.sender === "user" ? "user" : "support"}`}>
            {m.body}
            <time>{new Date(m.createdAt).toLocaleString(locale, { dateStyle: "short", timeStyle: "short" })}</time>
          </div>
        ))}
        {messages.length === 0 && (
          <p style={{ fontSize: 13, color: "var(--gray-light)", textAlign: "center", margin: "auto" }}>{t.loading}</p>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={send} style={{ display: "flex", gap: 2, padding: 16, borderTop: "1px solid var(--hairline)", background: "#fff" }}>
        <input
          className="p-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.writeMessage}
          style={{ flex: 1 }}
          aria-label={t.message}
        />
        <button type="submit" className="p-btn" disabled={busy || !text.trim()}>{t.sendMsg}</button>
      </form>
    </div>
  );
}
