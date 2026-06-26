"use client";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({ error }: Readonly<{ error: Error & { digest?: string } }>) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="de">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 40 }}>
          <h2 style={{ fontSize: 24, marginBottom: 12 }}>Ein Fehler ist aufgetreten</h2>
          <p style={{ color: "#6B7280", marginBottom: 24 }}>Wir wurden benachrichtigt und kümmern uns darum.</p>
          <a href="/de-CH" style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>← Zur Startseite</a>
        </div>
      </body>
    </html>
  );
}
