import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categories } from '@/data/categories';
import CategoryClient from './CategoryClient';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) return { title: 'Каталог' };
  return {
    title: `${category.title} — купити в NEXUS`,
    description: `${category.description}. Офіційна гарантія, швидка доставка по Україні.`,
  };
}

export default function CategoryPage({ params }: Props) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) notFound();

  return <CategoryClient slug={params.slug} />;
}
