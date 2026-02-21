'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useCart } from '@/lib/cart-context';
import { getFeaturedProducts, formatPrice } from '@/data/products';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import styles from './Hero.module.css';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { addItem } = useCart();
  const featured = getFeaturedProducts()[0];

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.fromTo('[data-hero-badge]',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.3 }
      )
      .fromTo('[data-hero-title]',
        { y: 90, opacity: 0, skewY: 4 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.1 },
        '-=0.6'
      )
      .fromTo('[data-hero-subtitle]',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.65'
      )
      .fromTo('[data-hero-price]',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.55'
      )
      .fromTo('[data-hero-cta]',
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
        '-=0.5'
      )
      .fromTo('[data-hero-image]',
        { scale: 1.12, opacity: 0, x: 30 },
        { scale: 1, opacity: 1, x: 0, duration: 1.6, ease: 'power3.out' },
        '-=1.2'
      )
      .fromTo('[data-hero-stat]',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
        '-=0.8'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  if (!featured) return null;

  return (
    <section ref={heroRef} className={styles.hero}>
      {/* Background decorations */}
      <div className={styles.bgBlob1} aria-hidden="true" />
      <div className={styles.bgBlob2} aria-hidden="true" />
      <div className={styles.bgGrid} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        {/* Content */}
        <div className={styles.content}>
          <div className={styles.badge} data-hero-badge>
            <Badge variant="new" />
            <span className={styles.badgeText}>Флагманська новинка 2025</span>
          </div>

          <h1 className={`${styles.title}`} data-hero-title>
            {featured.title}
          </h1>

          <p className={styles.subtitle} data-hero-subtitle>
            {featured.subtitle}
          </p>

          <div className={styles.priceRow} data-hero-price>
            <span className={styles.price}>{formatPrice(featured.price)}</span>
            {featured.originalPrice && (
              <>
                <span className={styles.originalPrice}>{formatPrice(featured.originalPrice)}</span>
                <span className={styles.savings}>
                  Економія {formatPrice(featured.originalPrice - featured.price)}
                </span>
              </>
            )}
          </div>

          <div className={styles.ctas}>
            <Button
              variant="accent"
              size="xl"
              onClick={() => addItem(featured)}
              data-hero-cta
            >
              Купити зараз
            </Button>
            <Button
              variant="outline"
              size="xl"
              href={`/tovar/${featured.slug}`}
              data-hero-cta
            >
              Детальніше
            </Button>
            <Button
              variant="ghost"
              size="xl"
              href="/kataloh/smartphones"
              data-hero-cta
            >
              У каталог →
            </Button>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            {[
              { value: '★ ' + featured.rating, label: 'Рейтинг' },
              { value: featured.reviewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0'), label: 'Відгуків' },
              { value: '48 год', label: 'Доставка' },
            ].map((stat) => (
              <div key={stat.label} className={styles.stat} data-hero-stat>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className={styles.imageWrap} data-hero-image>
          <div className={styles.imageGlow} aria-hidden="true" />
          <Image
            src={featured.images[0]}
            alt={featured.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 55vw"
            className={styles.image}
          />
          {/* Floating card */}
          <div className={`${styles.floatCard} glass-card`} data-hero-stat>
            <div className={styles.floatCardIcon}>🚀</div>
            <div>
              <p className={styles.floatCardTitle}>Офіційна гарантія</p>
              <p className={styles.floatCardText}>24 місяці від виробника</p>
            </div>
          </div>
          <div className={`${styles.floatCard2} glass-card`} data-hero-stat>
            <div className={styles.floatCardIcon}>⚡</div>
            <div>
              <p className={styles.floatCardTitle}>Швидка доставка</p>
              <p className={styles.floatCardText}>Завтра у твоїх руках</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className={styles.scrollHint} data-hero-stat>
        <div className={styles.scrollLine} />
        <span>Гортай вниз</span>
      </div>
    </section>
  );
}
