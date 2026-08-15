import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

// Google Analytics 4. The measurement ID is public (it ships in the page
// source), so it lives here rather than in an env var — that way analytics
// keeps working on any deploy without extra server configuration.
const GA_ID = 'G-H9BYQ4L49S';

export const metadata: Metadata = {
  title: 'Jerumed Nexus — IT Solutions for Healthcare',
  description: 'Professional IT services for medical practices in Switzerland.',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#0B1F3A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        {children}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
