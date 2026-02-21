import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

export const metadata: Metadata = {
  title: {
    default: 'NEXUS — Преміальна техніка',
    template: '%s | NEXUS',
  },
  description:
    'Преміальний магазин техніки — смартфони, ноутбуки, навушники та аксесуари провідних брендів. Офіційна гарантія, швидка доставка по Україні.',
  keywords: ['смартфони', 'ноутбуки', 'навушники', 'техніка', 'гаджети', 'електроніка', 'онлайн-магазин'],
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    siteName: 'NEXUS',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
