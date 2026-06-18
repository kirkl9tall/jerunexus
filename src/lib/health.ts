import { prisma } from "./db";

/** The full IT-monitoring set unlocked on a paid plan (stored in German; the UI localizes). */
const MONITORING_ITEMS = [
  { component: "Server & Infrastruktur", detail: "Alle Systeme laufen normal." },
  { component: "Backup", detail: "Letztes Backup erfolgreich abgeschlossen." },
  { component: "Netzwerk & VPN", detail: "Verbindung stabil." },
  { component: "IT-Sicherheit", detail: "Keine Bedrohungen erkannt." },
  { component: "Praxissoftware", detail: "Version aktuell." },
  { component: "E-Mail (HIN)", detail: "Versand und Empfang funktionieren." },
];

/**
 * Ensures a paid client has the full monitoring set. Idempotent — only creates
 * components the user is missing, so it's safe to call on every paid upgrade.
 */
export async function ensureMonitoringItems(userId: string) {
  const existing = await prisma.healthItem.findMany({
    where: { userId },
    select: { component: true },
  });
  const have = new Set(existing.map((i) => i.component));
  const missing = MONITORING_ITEMS.filter((m) => !have.has(m.component));
  if (missing.length === 0) return;

  await prisma.healthItem.createMany({
    data: missing.map((m) => ({ userId, component: m.component, status: "ok", detail: m.detail })),
  });
}
