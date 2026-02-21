import type { Metadata } from 'next';
import CheckoutPage from './CheckoutPage';

export const metadata: Metadata = {
  title: 'Оформлення замовлення',
  description: 'Оформіть замовлення в NEXUS. Швидко та зручно.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CheckoutPage />;
}
