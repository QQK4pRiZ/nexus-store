'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getFeaturedProducts } from '@/data/products';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/product/ProductCard';
import styles from './FeaturedProducts.module.css';

export default function FeaturedProducts() {
  const gridRef = useRef<HTMLDivElement>(null);
  const featured = getFeaturedProducts();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo('[data-product-card]',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section
      label="Вибір редакції"
      title="Рекомендовані товари"
      subtitle="Ретельно відібрані флагмани для найвибагливіших"
      headerAction={
        <Button variant="ghost" href="/kataloh/smartphones">
          Весь каталог →
        </Button>
      }
    >
      <div ref={gridRef} className={styles.grid}>
        {featured.map((product) => (
          <div key={product.id} data-product-card>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </Section>
  );
}
