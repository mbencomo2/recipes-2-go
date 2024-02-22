import '@/app/ui/global.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Recipes2Go',
    default: 'Recipes2Go',
  },
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['nextjs', 'nextjs13', 'next13', 'pwa', 'next-pwa'],
  authors: [{ name: 'Matthew Bencomo' }],
  icons: [{ rel: 'icon', url: 'icons/icon-128x128.webp' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
