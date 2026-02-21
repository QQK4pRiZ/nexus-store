'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { categories } from '@/data/categories';
import Section from '@/components/ui/Section';
import styles from './Categories.module.css';

export default function Categories() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo('[data-cat-card]',
        { y: 50, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
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
      label="Весь асортимент"
      title="Категорії"
      subtitle="Від флагманських смартфонів до студійних навушників"
      centered
      className={styles.section}
    >
      <div ref={gridRef} className={styles.grid}>
        {categories.map((cat, index) => (
          <Link
            key={cat.id}
            href={`/kataloh/${cat.slug}`}
            className={`${styles.card} ${index === 0 ? styles.large : ''}`}
            data-cat-card
          >
            <div className={styles.imageWrap}>
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
              />
              <div className={styles.overlay} />
            </div>
            <div className={styles.info}>
              <span className={styles.icon}>{cat.icon}</span>
              <div>
                <h3 className={styles.title}>{cat.title}</h3>
                <p className={styles.count}>{cat.productCount} товарів</p>
              </div>
              <span className={styles.arrow}>→</span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
