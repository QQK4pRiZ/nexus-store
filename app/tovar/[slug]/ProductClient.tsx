'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Product } from '@/types';
import { formatPrice, getRelatedProducts } from '@/data/products';
import { useCart } from '@/lib/cart-context';
import ProductGallery from '@/components/product/ProductGallery';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import HorizontalScroll from '@/components/home/HorizontalScroll';
import styles from './ProductClient.module.css';

interface ProductClientProps {
  product: Product;
}

export default function ProductClient({ product }: ProductClientProps) {
  const { addItem, openCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(
    product.variants.colors?.[0]?.value
  );
  const [selectedStorage, setSelectedStorage] = useState(
    product.variants.storage?.[0]?.value
  );
  const [selectedVersion, setSelectedVersion] = useState(
    product.variants.versions?.[0]?.value
  );
  const [openSpecs, setOpenSpecs] = useState<number | null>(0);
  const [qty, setQty] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);
  const related = getRelatedProducts(product);

  // Entrance animation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo('[data-product-detail]',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.1, stagger: 0.1 }
      );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  // Accordion
  const toggleSpec = useCallback((index: number) => {
    setOpenSpecs((prev) => (prev === index ? null : index));
  }, []);

  // Calculate price with modifiers
  const priceModifier =
    (product.variants.storage?.find((s) => s.value === selectedStorage)?.priceModifier ?? 0) +
    (product.variants.versions?.find((v) => v.value === selectedVersion)?.priceModifier ?? 0);
  const currentPrice = product.price + priceModifier;

  const handleBuy = useCallback(() => {
    addItem(product, qty, selectedColor, selectedStorage, selectedVersion);
    openCart();
  }, [addItem, openCart, product, qty, selectedColor, selectedStorage, selectedVersion]);

  return (
    <main className={styles.main}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Навігаційний ланцюжок">
          <a href="/">Головна</a>
          <span>/</span>
          <a href={`/kataloh/${product.categorySlug}`}>{product.category}</a>
          <span>/</span>
          <span>{product.title}</span>
        </nav>

        {/* Main layout */}
        <div ref={contentRef} className={styles.layout}>
          {/* Gallery */}
          <div className={styles.galleryCol} data-product-detail>
            <ProductGallery images={product.images} title={product.title} />
          </div>

          {/* Info */}
          <div className={styles.infoCol}>
            <div className={styles.infoTop} data-product-detail>
              {product.badge && <Badge variant={product.badge} />}
              <h1 className={`heading-lg ${styles.title}`}>{product.title}</h1>
              <p className={styles.subtitle}>{product.subtitle}</p>

              {/* Rating */}
              <div className={styles.rating}>
                <span className={styles.stars}>
                  {'★'.repeat(Math.floor(product.rating))}
                  {product.rating % 1 >= 0.5 ? '½' : ''}
                </span>
                <span className={styles.ratingValue}>{product.rating}</span>
                <span className={styles.reviewCount}>({product.reviewCount} відгуків)</span>
              </div>
            </div>

            {/* Variants */}
            <div className={styles.variants} data-product-detail>
              {/* Color picker */}
              {product.variants.colors && product.variants.colors.length > 0 && (
                <div className={styles.variantGroup}>
                  <p className={styles.variantLabel}>
                    Колір:{' '}
                    <strong>
                      {product.variants.colors.find((c) => c.value === selectedColor)?.label}
                    </strong>
                  </p>
                  <div className={styles.colorPicker}>
                    {product.variants.colors.map((color) => (
                      <button
                        key={color.value}
                        className={`${styles.colorSwatch} ${selectedColor === color.value ? styles.colorSwatchActive : ''} ${!color.inStock ? styles.outOfStock : ''}`}
                        style={{ background: color.colorHex ?? '#ccc' }}
                        title={color.label}
                        onClick={() => color.inStock && setSelectedColor(color.value)}
                        disabled={!color.inStock}
                        aria-label={color.label + (!color.inStock ? ' — немає в наявності' : '')}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Storage picker */}
              {product.variants.storage && product.variants.storage.length > 0 && (
                <div className={styles.variantGroup}>
                  <p className={styles.variantLabel}>Пам'ять:</p>
                  <div className={styles.chips}>
                    {product.variants.storage.map((s) => (
                      <button
                        key={s.value}
                        className={`${styles.chip} ${selectedStorage === s.value ? styles.chipActive : ''} ${!s.inStock ? styles.chipDisabled : ''}`}
                        onClick={() => s.inStock && setSelectedStorage(s.value)}
                        disabled={!s.inStock}
                      >
                        {s.label}
                        {s.priceModifier ? ` +${formatPrice(s.priceModifier)}` : ''}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Version picker */}
              {product.variants.versions && product.variants.versions.length > 0 && (
                <div className={styles.variantGroup}>
                  <p className={styles.variantLabel}>Конфігурація:</p>
                  <div className={styles.chips} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    {product.variants.versions.map((v) => (
                      <button
                        key={v.value}
                        className={`${styles.chip} ${selectedVersion === v.value ? styles.chipActive : ''} ${!v.inStock ? styles.chipDisabled : ''}`}
                        onClick={() => v.inStock && setSelectedVersion(v.value)}
                        disabled={!v.inStock}
                      >
                        {v.label}
                        {v.priceModifier ? ` +${formatPrice(v.priceModifier)}` : ''}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Price & CTA */}
            <div className={styles.purchaseBox} data-product-detail>
              <div className={styles.priceRow}>
                <span className={styles.price}>{formatPrice(currentPrice)}</span>
                {product.originalPrice && (
                  <span className={styles.originalPrice}>{formatPrice(product.originalPrice + priceModifier)}</span>
                )}
                {product.originalPrice && (
                  <span className={styles.savings}>
                    −{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              {/* Quantity */}
              <div className={styles.qtyRow}>
                <div className={styles.qty}>
                  <button className={styles.qtyBtn} onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1}>−</button>
                  <span className={styles.qtyVal}>{qty}</span>
                  <button className={styles.qtyBtn} onClick={() => setQty((q) => q + 1)}>+</button>
                </div>
                <span className={styles.stockStatus}>
                  {product.inStock
                    ? <><span className={styles.inStock} />В наявності</>
                    : <><span className={styles.noStock} />Очікується</>
                  }
                </span>
              </div>

              <div className={styles.ctaRow}>
                <Button variant="accent" size="xl" fullWidth onClick={handleBuy} disabled={!product.inStock}>
                  {product.inStock ? 'Додати до кошика' : 'Підписатися на наявність'}
                </Button>
                <Button variant="outline" size="xl" href="/oformlennia">
                  Купити зараз
                </Button>
              </div>

              <p className={styles.deliveryNote}>
                🚚 Безкоштовна доставка від 1000 ₴ · Гарантія 24 місяці
              </p>
            </div>

            {/* Description */}
            <div className={styles.description} data-product-detail>
              <p className="body-md">{product.description}</p>
            </div>

            {/* Specs Accordion */}
            <div className={styles.specsSection} data-product-detail>
              <h2 className={styles.specsTitle}>Характеристики</h2>
              <div className={styles.accordion}>
                {product.specs.map((group, i) => (
                  <div key={group.title} className={`${styles.accordionItem} ${openSpecs === i ? styles.accordionOpen : ''}`}>
                    <button
                      className={styles.accordionHeader}
                      onClick={() => toggleSpec(i)}
                      aria-expanded={openSpecs === i}
                    >
                      <span>{group.title}</span>
                      <span className={styles.accordionIcon}>{openSpecs === i ? '−' : '+'}</span>
                    </button>
                    {openSpecs === i && (
                      <div className={styles.accordionBody}>
                        <table className={styles.specsTable}>
                          <tbody>
                            {group.specs.map((spec) => (
                              <tr key={spec.label} className={styles.specRow}>
                                <td className={styles.specLabel}>{spec.label}</td>
                                <td className={styles.specValue}>{spec.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className={styles.related}>
            <h2 className={`heading-lg ${styles.relatedTitle}`}>Схожі товари</h2>
            <HorizontalScroll products={related} />
          </section>
        )}
      </div>

      {/* Sticky mobile add-to-cart */}
      <div className={styles.stickyBar}>
        <div className={styles.stickyInfo}>
          <span className={styles.stickyTitle}>{product.title}</span>
          <span className={styles.stickyPrice}>{formatPrice(currentPrice)}</span>
        </div>
        <Button variant="accent" size="md" onClick={handleBuy} disabled={!product.inStock}>
          До кошика
        </Button>
      </div>
    </main>
  );
}
