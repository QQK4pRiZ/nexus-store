import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const footerLinks = {
  catalog: {
    title: 'Каталог',
    links: [
      { label: 'Смартфони',      href: '/kataloh/smartphones' },
      { label: 'Ноутбуки та ПК', href: '/kataloh/laptops' },
      { label: 'Ігрові гарнітури', href: '/kataloh/gaming' },
      { label: 'Студійні навушники', href: '/kataloh/headphones' },
      { label: 'Аксесуари',      href: '/kataloh/accessories' },
    ],
  },
  info: {
    title: 'Інформація',
    links: [
      { label: 'Про магазин',    href: '/pro-nas' },
      { label: 'Доставка та оплата', href: '/dostavka' },
      { label: 'Гарантія та повернення', href: '/garantia' },
      { label: 'Контакти',       href: '/kontakty' },
    ],
  },
  support: {
    title: 'Підтримка',
    links: [
      { label: 'Центр допомоги', href: '/dopomoga' },
      { label: 'Статус замовлення', href: '/zamovlennia' },
      { label: 'Публічна оферта', href: '/oferta' },
      { label: 'Конфіденційність', href: '/privacy' },
    ],
  },
};

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              NEXUS<span className={styles.logoDot} />
            </Link>
            <p className={styles.tagline}>
              Преміальна техніка.<br />Офіційна гарантія.<br />Швидка доставка по Україні.
            </p>
            <div className={styles.socials}>
              {['Instagram', 'Telegram', 'YouTube', 'TikTok'].map((s) => (
                <a key={s} href="#" className={styles.socialLink} aria-label={s} rel="noopener noreferrer">
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((col) => (
            <div key={col.title} className={styles.col}>
              <h3 className={styles.colTitle}>{col.title}</h3>
              <ul className={styles.list}>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} NEXUS. Усі права захищено.
          </p>
          <p className={styles.made}>
            Зроблено з ❤️ —{' '}
            <a
              href="https://freelancehunt.com/freelancer/K4pRiZ.html"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.madeLink}
            >
              K4pRiZ
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
