'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { useCart } from '@/lib/cart-context';
import styles from './Header.module.css';

const navLinks = [
  { label: 'Смартфони',      href: '/kataloh/smartphones' },
  { label: 'Ноутбуки та ПК', href: '/kataloh/laptops' },
  { label: 'Гарнітури',      href: '/kataloh/gaming' },
  { label: 'Навушники',      href: '/kataloh/headphones' },
  { label: 'Аксесуари',      href: '/kataloh/accessories' },
];

export default function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const { totalItems, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Header entrance animation
  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.1 }
      );
    }
  }, []);

  // Mobile menu animation
  const toggleMobile = useCallback(() => {
    if (!mobileMenuRef.current) return;
    if (!mobileOpen) {
      setMobileOpen(true);
      gsap.fromTo(
        mobileMenuRef.current,
        { x: '100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.45, ease: 'expo.out' }
      );
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll('[data-nav-item]'),
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.06, duration: 0.4, ease: 'power2.out', delay: 0.15 }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => setMobileOpen(false),
      });
    }
  }, [mobileOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
        role="banner"
      >
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="NEXUS — Головна">
            <svg width="108" height="28" viewBox="0 0 108 28" fill="none">
              <text
                x="0" y="22"
                fontFamily="Manrope, Inter, sans-serif"
                fontWeight="800"
                fontSize="22"
                letterSpacing="-1"
                fill="var(--color-text)"
              >
                NEXUS
              </text>
            </svg>
            <span className={styles.logoDot} aria-hidden="true" />
          </Link>

          {/* Desktop nav */}
          <nav className={styles.nav} aria-label="Основна навігація">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${pathname.startsWith(link.href) ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            {/* Search */}
            <button className={styles.iconBtn} aria-label="Пошук">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>

            {/* Cart */}
            <button
              className={styles.cartBtn}
              onClick={openCart}
              aria-label={`Кошик — ${totalItems} товарів`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {totalItems > 0 && (
                <span className={styles.cartBadge}>{totalItems > 99 ? '99+' : totalItems}</span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className={styles.hamburger}
              onClick={toggleMobile}
              aria-label="Меню"
              aria-expanded={mobileOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className={styles.mobileMenu}
          role="dialog"
          aria-label="Мобільне меню навігації"
        >
          <div className={styles.mobileMenuHeader}>
            <Link href="/" className={styles.logo} onClick={toggleMobile}>NEXUS</Link>
            <button className={styles.iconBtn} onClick={toggleMobile} aria-label="Закрити меню">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className={styles.mobileNav}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileNavLink} ${pathname.startsWith(link.href) ? styles.active : ''}`}
                onClick={toggleMobile}
                data-nav-item
              >
                {link.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className={styles.mobileOverlay} onClick={toggleMobile} />
      )}
    </>
  );
}
