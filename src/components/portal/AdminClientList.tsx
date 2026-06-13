"use client";
import { useState } from "react";
import type { PortalDict } from "@/lib/portal-i18n";

type ClientsDict = PortalDict["admin"]["clients"];

type Row = {
  id: string;
  name: string;
  email: string;
  practiceName: string | null;
  planName: string | null;
  openCount: number;
  since: string;
};

export default function AdminClientList({ clients, t }: Readonly<{ clients: Row[]; t: ClientsDict }>) {
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const rows = needle
    ? clients.filter((c) =>
        [c.name, c.email, c.practiceName ?? ""].some((v) => v.toLowerCase().includes(needle)))
    : clients;

  return (
    <>
      <div className="p-field" style={{ maxWidth: 420 }}>
        <input className="p-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.search} aria-label={t.search} />
      </div>

      {rows.length === 0 ? (
        <div className="p-card" style={{ textAlign: "center", padding: "40px 28px", color: "var(--gray-light)", fontSize: 14 }}>{t.empty}</div>
      ) : (
        <div style={{ border: "1px solid var(--hairline)", background: "#fff" }}>
          <table className="p-table">
            <thead>
              <tr>
                <th>{t.name}</th>
                <th>{t.practice}</th>
                <th>{t.plan}</th>
                <th style={{ textAlign: "center" }}>{t.openReq}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: "var(--gray)" }}>{c.email}</div>
                  </td>
                  <td style={{ color: "var(--gray)" }}>{c.practiceName ?? "—"}</td>
                  <td>{c.planName ?? <span style={{ color: "var(--gray-light)" }}>{t.noPlan}</span>}</td>
                  <td style={{ textAlign: "center" }}>
                    {c.openCount > 0 ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <span className="p-dot warn" style={{ width: 8, height: 8 }} /> {c.openCount}
                      </span>
                    ) : <span style={{ color: "var(--gray-light)" }}>0</span>}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <a href={`/portal/admin/clients/${c.id}`} className="p-arrow-link">{t.view}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
