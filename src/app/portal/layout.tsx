import "./portal.css";

export const metadata = {
  title: "Kundenportal — Jerumed Nexus",
  description: "Ihr persönliches Kundenportal bei Jerumed Nexus.",
};

export default function PortalRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="portal">{children}</div>;
}
