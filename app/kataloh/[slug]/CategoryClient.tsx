'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import { SortOption } from '@/types';
import styles from './CategoryClient.module.css';

interface CategoryClientProps {
  slug: string;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'popular',    label: 'Популярні' },
  { value: 'new',        label: 'Нові' },
  { value: 'price_asc',  label: 'Дешевші спочатку' },
  { value: 'price_desc', label: 'Дорожчі спочатку' },
  { value: 'rating',     label: 'За рейтингом' },
];

export default function CategoryClient({ slug }: CategoryClientProps) {
  const category = categories.find((c) => c.slug === slug);
  const allInCategory = products.filter((p) => p.categorySlug === slug);
  const allProducts = slug === 'all' ? products : allInCategory;

  const [sort, setSort] = useState<SortOption>('popular');
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const filterPanelRef = useRef<HTMLDivElement>(null);

  const sorted = useMemo(() => {
    let list = [...allProducts];
    if (selectedBadges.length > 0) {
      list = list.filter((p) => p.badge && selectedBadges.includes(p.badge));
    }
    switch (sort) {
      case 'new':        return list.filter((p) => p.isNew).concat(list.filter((p) => !p.isNew));
      case 'price_asc':  return list.sort((a, b) => a.price - b.price);
      case 'price_desc': return list.sort((a, b) => b.price - a.price);
      case 'rating':     return list.sort((a, b) => b.rating - a.rating);
      default:           return list.sort((a, b) => b.reviewCount - a.reviewCount);
    }
  }, [allProducts, sort, selectedBadges]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo('[data-product-item]',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.75,
          ease: 'power2.out',
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [sorted]);

  // Filter panel animation
  useEffect(() => {
    const panel = filterPanelRef.current;
    if (!panel) return;
    if (filtersOpen) {
      gsap.fromTo(panel,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.45, ease: 'power2.out' }
      );
    } else {
      gsap.to(panel, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
    }
  }, [filtersOpen]);

  const toggleBadge = (badge: string) => {
    setSelectedBadges((prev) =>
      prev.includes(badge) ? prev.filter((b) => b !== badge) : [...prev, badge]
    );
  };

  return (
    <main className={styles.main}>
      {/* Hero banner */}
      <div className={styles.banner}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Навігаційний ланцюжок">
            <a href="/">Головна</a> <span>/</span>
            <a href="/kataloh">Каталог</a> <span>/</span>
            <span>{category?.title ?? 'Всі товари'}</span>
          </nav>
          <h1 className={`heading-xl ${styles.bannerTitle}`}>
            {category?.title ?? 'Всі товари'}
          </h1>
          {category?.description && (
            <p className={`body-lg ${styles.bannerDesc}`}>{category.description}</p>
          )}
        </div>
      </div>

      <div className="container">
        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <button
              className={styles.filterToggle}
              onClick={() => setFiltersOpen((o) => !o)}
              aria-expanded={filtersOpen}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="6"  x2="20" y2="6"  />
                <line x1="4" y1="12" x2="16" y2="12" />
                <line x1="4" y1="18" x2="12" y2="18" />
              </svg>
              Фільтри
              {selectedBadges.length > 0 && (
                <span className={styles.filterCount}>{selectedBadges.length}</span>
              )}
            </button>
            <span className={styles.resultCount}>{sorted.length} товарів</span>
          </div>

          {/* Sort */}
          <div className={styles.sortWrap}>
            <span className={styles.sortLabel}>Сортування:</span>
            <select
              className={styles.sort}
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              aria-label="Сортування товарів"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filters panel */}
        <div ref={filterPanelRef} className={styles.filtersPanel} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
          <div className={styles.filterGroup}>
            <span className={styles.filterGroupTitle}>Статус:</span>
            <div className={styles.filterChips}>
              {[
                { value: 'new',     label: 'Новинки' },
                { value: 'sale',    label: 'Акція' },
                { value: 'popular', label: 'Популярні' },
                { value: 'hit',     label: 'Хіти' },
              ].map((f) => (
                <button
                  key={f.value}
                  className={`${styles.chip} ${selectedBadges.includes(f.value) ? styles.chipActive : ''}`}
                  onClick={() => toggleBadge(f.value)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            {selectedBadges.length > 0 && (
              <button
                className={styles.clearFilters}
                onClick={() => setSelectedBadges([])}
              >
                Скинути фільтри
              </button>
            )}
          </div>
        </div>

        {/* Product grid */}
        {sorted.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Товарів не знайдено</p>
            <Button variant="ghost" onClick={() => { setSelectedBadges([]); setSort('popular'); }}>
              Скинути фільтри
            </Button>
          </div>
        ) : (
          <div ref={gridRef} className={styles.grid}>
            {sorted.map((product) => (
              <div key={product.id} data-product-item>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
