'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types';
import styles from './HorizontalScroll.module.css';

interface HorizontalScrollProps {
  products: Product[];
  title?: string;
}

export default function HorizontalScroll({ products, title }: HorizontalScrollProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;

    // Drag scroll
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      wrap.classList.add(styles.grabbing);
      startX = e.pageX - wrap.offsetLeft;
      scrollLeft = wrap.scrollLeft;
    };
    const onMouseLeave = () => { isDown = false; wrap.classList.remove(styles.grabbing); };
    const onMouseUp = () => { isDown = false; wrap.classList.remove(styles.grabbing); };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - wrap.offsetLeft;
      const walk = (x - startX) * 1.5;
      wrap.scrollLeft = scrollLeft - walk;
    };

    wrap.addEventListener('mousedown', onMouseDown);
    wrap.addEventListener('mouseleave', onMouseLeave);
    wrap.addEventListener('mouseup', onMouseUp);
    wrap.addEventListener('mousemove', onMouseMove);

    // Entrance animation
    const items = track.querySelectorAll('[data-scroll-item]');
    gsap.fromTo(items,
      { x: 60, opacity: 0 },
      {
        x: 0, opacity: 1,
        stagger: 0.1,
        duration: 0.75,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: wrap,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      wrap.removeEventListener('mousedown', onMouseDown);
      wrap.removeEventListener('mouseleave', onMouseLeave);
      wrap.removeEventListener('mouseup', onMouseUp);
      wrap.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div
        ref={wrapRef}
        className={styles.wrap}
      >
        <div ref={trackRef} className={styles.track}>
          {products.map((product) => (
            <div key={product.id} className={styles.item} data-scroll-item>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
