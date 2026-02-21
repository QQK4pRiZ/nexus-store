'use client';

import React, { useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice } from '@/data/products';
import { useCart } from '@/lib/cart-context';
import { cardHoverIn, cardHoverOut } from '@/lib/gsap-utils';
import Badge from '@/components/ui/Badge';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  size?: 'default' | 'compact';
}

export default function ProductCard({ product, size = 'default' }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  const handleMouseEnter = useCallback(() => {
    if (cardRef.current) cardHoverIn(cardRef.current);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) cardHoverOut(cardRef.current);
  }, []);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      addItem(product);
    },
    [addItem, product]
  );

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${size === 'compact' ? styles.compact : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-card
    >
      <Link href={`/tovar/${product.slug}`} className={styles.link}>
        {/* Image */}
        <div className={styles.imageWrap}>
          {product.badge && (
            <div className={styles.badge}>
              <Badge variant={product.badge} />
            </div>
          )}
          {discount && (
            <div className={styles.discount}>−{discount}%</div>
          )}
          <div className={styles.imageInner} data-card-image>
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className={styles.image}
              priority={false}
            />
          </div>
          {/* Quick add overlay */}
          <button
            className={styles.quickAdd}
            onClick={handleAddToCart}
            aria-label={`Додати ${product.title} до кошика`}
          >
            <span>+ До кошика</span>
          </button>
        </div>

        {/* Info */}
        <div className={styles.info}>
          <p className={styles.category}>{product.category}</p>
          <h3 className={styles.title}>{product.title}</h3>
          {size !== 'compact' && (
            <p className={styles.subtitle}>{product.subtitle}</p>
          )}
          <div className={styles.footer}>
            <div className={styles.priceGroup}>
              <span className={styles.price}>{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            <div className={styles.rating}>
              <span className={styles.star}>★</span>
              <span>{product.rating}</span>
              <span className={styles.reviews}>({product.reviewCount})</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
