"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type PlanInfo = {
  key: string;
  name: string;
  priceLabel: string;
  description: string;
  features: string[];
};

type GridDict = {
  current: string;
  pending: string;
  active: string;
  requested: string;
  request: string;
  requesting: string;
  fallbackError: string;
};

export default function UpgradeGrid({ plans, currentKey, pendingKey, t }: Readonly<{ plans: PlanInfo[]; currentKey: string | null; pendingKey: string | null; t: GridDict }>) {
  const router = useRouter();
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");

  async function requestUpgrade(planKey: string) {
    setError("");
    setBusy(planKey);
    const res = await fetch("/api/plan/upgrade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planKey }),
    });
    setBusy("");
    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? t.fallbackError);
    }
  }

  function cardLabel(isCurrent: boolean, isPending: boolean) {
    if (isCurrent) return t.current;
    if (isPending) return t.pending;
    return " ";
  }

  return (
    <>
      {error && <div className="p-error">{error}</div>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 2 }}>
        {plans.map((plan) => {
          const isCurrent = plan.key === currentKey;
          const isPending = plan.key === pendingKey;

          let action;
          if (isCurrent) {
            action = <button className="p-btn ghost" disabled style={{ justifyContent: "center" }}>{t.active}</button>;
          } else if (isPending) {
            action = <button className="p-btn" disabled style={{ justifyContent: "center" }}>{t.requested}</button>;
          } else {
            action = (
              <button className="p-btn" onClick={() => requestUpgrade(plan.key)} disabled={busy !== ""} style={{ justifyContent: "center" }}>
                {busy === plan.key ? t.requesting : t.request}
              </button>
            );
          }

          return (
            <div key={plan.key} className="p-card" style={{ display: "flex", flexDirection: "column", borderTop: isCurrent ? "3px solid var(--green)" : "3px solid transparent" }}>
              <div className="p-label" style={{ color: isCurrent ? "var(--green-dark)" : undefined }}>
                {cardLabel(isCurrent, isPending)}
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginTop: 10 }}>{plan.name}</h3>
              <div style={{ fontFamily: "'Libre Franklin',sans-serif", fontSize: 17, fontWeight: 600, color: "var(--green)", marginTop: 6 }}>
                {plan.priceLabel}
              </div>
              <p style={{ fontSize: 13, color: "var(--gray)", lineHeight: 1.6, margin: "12px 0 18px" }}>{plan.description}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 9, flex: 1 }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: "flex", gap: 9, fontSize: 13, alignItems: "flex-start" }}>
                    <span style={{ color: "var(--green)", fontWeight: 700 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              {action}
            </div>
          );
        })}
      </div>
    </>
  );
}
