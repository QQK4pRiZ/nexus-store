'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '@/components/ui/Button';
import styles from './Brand.module.css';

const STATS = [
  { value: 8,     suffix: '+',  label: 'Років досвіду' },
  { value: 250,   suffix: 'K+', label: 'Задоволених клієнтів' },
  { value: 5000,  suffix: '+',  label: 'Товарів у каталозі' },
  { value: 99,    suffix: '%',  label: 'Позитивних відгуків' },
];

const BENEFITS = [
  {
    icon: '🛡️',
    title: 'Офіційна гарантія',
    desc: 'Гарантія виробника на весь асортимент. Сервісні центри по всій Україні.',
  },
  {
    icon: '🚚',
    title: 'Доставка 1–3 дні',
    desc: 'Відправка в день замовлення. Безкоштовно від 1000 ₴ по всій Україні.',
  },
  {
    icon: '💳',
    title: 'Зручна оплата',
    desc: 'Картою, готівкою або частинами без переплат до 24 місяців.',
  },
  {
    icon: '🎧',
    title: 'Підтримка 24/7',
    desc: 'Консультація перед покупкою та допомога після — завжди поруч.',
  },
];

export default function Brand() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Fade-in left column
      gsap.fromTo('[data-brand-left]',
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', toggleActions: 'play none none none' },
        }
      );

      // Fade-in benefit cards staggered
      gsap.fromTo('[data-benefit]',
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', toggleActions: 'play none none none' },
        }
      );

      // Count-up animation for stats
      statRefs.current.forEach((el, i) => {
        if (!el) return;
        const stat = STATS[i];
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          onUpdate() {
            el.textContent = Math.round(obj.val) + stat.suffix;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={`container ${styles.inner}`}>

        {/* Stats row */}
        <div className={styles.stats}>
          {STATS.map((s, i) => (
            <div key={s.label} className={styles.stat}>
              <span
                className={styles.statValue}
                ref={(el) => { statRefs.current[i] = el; }}
              >
                0{s.suffix}
              </span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Two-column body */}
        <div className={styles.body}>

          {/* Left: text + CTAs */}
          <div className={styles.message} data-brand-left>
            <p className={`label ${styles.label}`}>Про нас</p>
            <h2 className={`heading-xl ${styles.title}`}>
              Ми — магазин,<br />
              якому довіряють
            </h2>
            <p className={`body-lg ${styles.text}`}>
              NEXUS — це не просто магазин електроніки. Це місце, де кожен
              покупець отримує преміальний сервіс, чесні ціни та техніку, яка
              дійсно змінює повсякденне життя. З 2016 року ми допомагаємо
              людям вибирати краще.
            </p>
            <div className={styles.ctas}>
              <Button variant="primary" href="/pro-nas" size="lg">
                Дізнатися більше
              </Button>
              <Button variant="ghost" href="/kontakty" size="lg">
                Зв'язатися з нами
              </Button>
            </div>
          </div>

          {/* Right: benefit cards */}
          <div className={styles.benefits}>
            {BENEFITS.map((b) => (
              <div key={b.title} className={styles.benefit} data-benefit>
                <span className={styles.benefitIcon}>{b.icon}</span>
                <div>
                  <p className={styles.benefitTitle}>{b.title}</p>
                  <p className={styles.benefitDesc}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
