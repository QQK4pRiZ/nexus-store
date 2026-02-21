'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getNewProducts, products } from '@/data/products';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import HorizontalScroll from './HorizontalScroll';

export default function NewArrivals() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const newProducts = getNewProducts().length > 0 ? getNewProducts() : products.slice(0, 6);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo('[data-section-header]',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '[data-section-header]',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <Section
        label="Щойно надійшло"
        title="Новинки"
        subtitle="Найсвіжіші надходження — будь першим"
        headerAction={
          <Button variant="ghost" href="/kataloh/smartphones">
            Всі новинки →
          </Button>
        }
      >
        <HorizontalScroll products={newProducts} />
      </Section>
    </div>
  );
}
