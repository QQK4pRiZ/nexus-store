'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import styles from './ProductGallery.module.css';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  const switchImage = useCallback((index: number) => {
    if (!mainRef.current || index === activeIndex) return;
    gsap.fromTo(
      mainRef.current,
      { opacity: 0, scale: 1.04 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' }
    );
    setActiveIndex(index);
  }, [activeIndex]);

  useEffect(() => {
    if (!mainRef.current) return;
    gsap.fromTo(
      mainRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
  }, []);

  return (
    <div className={styles.gallery}>
      {/* Thumbnails */}
      <div className={styles.thumbs}>
        {images.map((src, i) => (
          <button
            key={src}
            className={`${styles.thumb} ${i === activeIndex ? styles.thumbActive : ''}`}
            onClick={() => switchImage(i)}
            aria-label={`Фото ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${title} — фото ${i + 1}`}
              fill
              sizes="80px"
              className={styles.thumbImg}
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div ref={mainRef} className={styles.main}>
        <div className={styles.mainInner}>
          <Image
            src={images[activeIndex]}
            alt={`${title} — головне фото`}
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            priority
            className={styles.mainImg}
          />
        </div>
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={() => switchImage((activeIndex - 1 + images.length) % images.length)}
              aria-label="Попереднє фото"
              disabled={activeIndex === 0}
            >
              ‹
            </button>
            <button
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={() => switchImage((activeIndex + 1) % images.length)}
              aria-label="Наступне фото"
              disabled={activeIndex === images.length - 1}
            >
              ›
            </button>
          </>
        )}
        {/* Dots */}
        <div className={styles.dots}>
          {images.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
              onClick={() => switchImage(i)}
              aria-label={`Фото ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
