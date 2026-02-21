'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/data/products';
import { openDrawer, closeDrawer } from '@/lib/gsap-utils';
import Button from '@/components/ui/Button';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const drawer = drawerRef.current;
    const overlay = overlayRef.current;
    if (!drawer || !overlay) return;

    if (isOpen && !wasOpen.current) {
      wasOpen.current = true;
      openDrawer(drawer, overlay);
    } else if (!isOpen && wasOpen.current) {
      wasOpen.current = false;
      closeDrawer(drawer, overlay);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeCart();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeCart]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className={styles.overlay}
        onClick={closeCart}
        style={{ display: 'none', opacity: 0 }}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={styles.drawer}
        style={{ visibility: 'hidden', transform: 'translateX(100%)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Кошик"
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>Кошик</h2>
            {totalItems > 0 && (
              <span className={styles.count}>{totalItems}</span>
            )}
          </div>
          <button
            className={styles.closeBtn}
            onClick={closeCart}
            aria-label="Закрити кошик"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🛒</div>
              <p className={styles.emptyTitle}>Кошик порожній</p>
              <p className={styles.emptyText}>Додайте товари, щоб оформити замовлення</p>
              <Button variant="primary" href="/kataloh/smartphones" onClick={closeCart}>
                Перейти в каталог
              </Button>
            </div>
          ) : (
            <ul className={styles.list}>
              {items.map((item) => (
                <li key={`${item.product.id}-${item.selectedColor}-${item.selectedStorage}`} className={styles.item}>
                  <div className={styles.itemImage}>
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fill
                      sizes="80px"
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.itemInfo}>
                    <Link href={`/tovar/${item.product.slug}`} className={styles.itemTitle} onClick={closeCart}>
                      {item.product.title}
                    </Link>
                    {(item.selectedColor || item.selectedStorage) && (
                      <p className={styles.itemVariant}>
                        {[item.selectedColor, item.selectedStorage].filter(Boolean).join(' · ')}
                      </p>
                    )}
                    <div className={styles.itemFooter}>
                      <div className={styles.qty}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label="Зменшити кількість"
                        >
                          −
                        </button>
                        <span className={styles.qtyVal}>{item.quantity}</span>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          aria-label="Збільшити кількість"
                        >
                          +
                        </button>
                      </div>
                      <span className={styles.itemPrice}>
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.product.id)}
                    aria-label={`Видалити ${item.product.title}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totals}>
              <span>Разом:</span>
              <span className={styles.totalPrice}>{formatPrice(totalPrice)}</span>
            </div>
            <Button
              variant="accent"
              size="lg"
              fullWidth
              href="/oformlennia"
              onClick={closeCart}
            >
              Оформити замовлення →
            </Button>
            <button className={styles.continueShopping} onClick={closeCart}>
              Продовжити покупки
            </button>
          </div>
        )}
      </div>
    </>
  );
}
