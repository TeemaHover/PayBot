import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { BRAND } from '@/lib/content';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: BRAND.metaTitle,
  description: BRAND.metaDescription,
  openGraph: {
    title: BRAND.metaTitle,
    description: BRAND.metaDescription,
    locale: 'mn_MN',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#3B9BE0',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn" className={inter.variable}>
      <body className="min-h-screen bg-ink-950 font-sans text-white antialiased">{children}</body>
    </html>
  );
}
