"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type ClientDict = {
  subscription: string;
  pendingUpgrade: string;
  approve: string;
  reject: string;
  changePlan: string;
  changePlanHint: string;
  assign: string;
  assigning: string;
  saved: string;
  failed: string;
};
type PlanOption = { key: string; name: string; priceLabel: string };

export default function AdminSubscriptionPanel({
  clientId, currentPlanKey, status, requestedPlanName, plans, t,
}: Readonly<{
  clientId: string;
  currentPlanKey: string | null;
  status: string | null;
  requestedPlanName: string | null;
  plans: PlanOption[];
  t: ClientDict;
}>) {
  const router = useRouter();
  const [selected, setSelected] = useState(currentPlanKey ?? plans[0]?.key ?? "");
  const [busy, setBusy] = useState("");
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  async function call(action: string, extra: Record<string, string> = {}, key = action) {
    setBusy(key);
    setMsg(null);
    const res = await fetch(`/api/admin/clients/${clientId}/subscription`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...extra }),
    });
    setBusy("");
    if (res.ok) {
      setMsg({ kind: "ok", text: t.saved });
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setMsg({ kind: "err", text: data.error ?? t.failed });
    }
  }

  return (
    <div className="p-card">
      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>{t.subscription}</h3>
      {msg && <div className={msg.kind === "ok" ? "p-success" : "p-error"}>{msg.text}</div>}

      {/* pending upgrade */}
      {status === "pending_upgrade" && requestedPlanName && (
        <div style={{ background: "var(--green-soft)", border: "1px solid var(--green)", padding: "16px 18px", marginBottom: 20 }}>
          <div style={{ fontSize: 14, marginBottom: 12 }}>
            {t.pendingUpgrade} <strong>{requestedPlanName}</strong>
          </div>
          <div style={{ display: "flex", gap: 2 }}>
            <button className="p-btn" onClick={() => call("approveUpgrade", {}, "approve")} disabled={busy !== ""} style={{ padding: "9px 18px", fontSize: 13 }}>
              {busy === "approve" ? "…" : t.approve}
            </button>
            <button className="p-btn ghost" onClick={() => call("rejectUpgrade", {}, "reject")} disabled={busy !== ""} style={{ padding: "9px 18px", fontSize: 13 }}>
              {busy === "reject" ? "…" : t.reject}
            </button>
          </div>
        </div>
      )}

      {/* change plan */}
      <div className="p-label" style={{ marginBottom: 8 }}>{t.changePlan}</div>
      <p style={{ fontSize: 13, color: "var(--gray)", marginBottom: 14 }}>{t.changePlanHint}</p>
      <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <select className="p-select" value={selected} onChange={(e) => setSelected(e.target.value)} style={{ maxWidth: 320 }}>
          {plans.map((p) => (
            <option key={p.key} value={p.key}>{p.name} — {p.priceLabel}</option>
          ))}
        </select>
        <button className="p-btn" onClick={() => call("setPlan", { planKey: selected }, "assign")} disabled={busy !== "" || !selected}>
          {busy === "assign" ? t.assigning : t.assign}
        </button>
      </div>
    </div>
  );
}
