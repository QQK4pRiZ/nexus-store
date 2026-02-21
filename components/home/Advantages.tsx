'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '@/components/ui/Section';
import styles from './Advantages.module.css';

const advantages = [
  {
    icon: '🛡',
    title: 'Офіційна гарантія',
    text: '24 місяці від виробника на всю техніку. Без зайвих питань.',
  },
  {
    icon: '⚡',
    title: 'Швидка доставка',
    text: 'Відправлення в день замовлення. Доставка по всій Україні.',
  },
  {
    icon: '💳',
    title: 'Зручна оплата',
    text: 'Картою, готівкою або частинами. Без переплат та прихованих комісій.',
  },
  {
    icon: '🔄',
    title: 'Легке повернення',
    text: '14 днів на повернення без пояснень. Повна сума коштів назад.',
  },
  {
    icon: '🎧',
    title: 'Підтримка 24/7',
    text: 'Наші експерти завжди готові допомогти з вибором чи технічним питанням.',
  },
  {
    icon: '✅',
    title: 'Тільки оригінал',
    text: `Ми працюємо виключно з офіційними дистриб'юторами. Нуль підробок.`,
  },
];

export default function Advantages() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo('[data-advantage]',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
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
      label="Чому NEXUS"
      title="Наші переваги"
      subtitle="Ми не просто продаємо техніку — ми забезпечуємо повний досвід"
      centered
      className={styles.section}
    >
      <div ref={gridRef} className={styles.grid}>
        {advantages.map((adv) => (
          <div key={adv.title} className={`${styles.card} glass-card`} data-advantage>
            <div className={styles.iconWrap}>
              <span className={styles.icon}>{adv.icon}</span>
            </div>
            <h3 className={styles.title}>{adv.title}</h3>
            <p className={styles.text}>{adv.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
