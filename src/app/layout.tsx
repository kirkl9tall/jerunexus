import '@/styles/globals.css';

export const metadata = {
  title: 'Jerumed Nexus — IT Solutions for Healthcare',
  description: 'Professional IT services for medical practices in Switzerland.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
