import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import NewArrivals from '@/components/home/NewArrivals';
import Categories from '@/components/home/Categories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Advantages from '@/components/home/Advantages';
import Brand from '@/components/home/Brand';

export const metadata: Metadata = {
  title: 'NEXUS — Преміальна техніка в Україні',
  description:
    'Офіційний магазин преміальної техніки. Смартфони, ноутбуки, навушники та аксесуари з офіційною гарантією та швидкою доставкою по Україні.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <NewArrivals />
      <Categories />
      <FeaturedProducts />
      <Advantages />
      <Brand />
    </>
  );
}

