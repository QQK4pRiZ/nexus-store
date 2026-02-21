import React from 'react';
import styles from './Section.module.css';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  label?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'sm';
  centered?: boolean;
}

export default function Section({
  id,
  title,
  subtitle,
  label,
  headerAction,
  children,
  className = '',
  size = 'default',
  centered = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${size === 'sm' ? 'section-sm' : 'section'} ${className}`}
    >
      <div className="container">
        {(title || subtitle || label || headerAction) && (
          <div className={`${styles.header} ${centered ? styles.centered : ''}`} data-section-header>
            {label && (
              <p className={`label ${styles.label}`} data-reveal>
                {label}
              </p>
            )}
            {title && (
              <h2 className={`heading-xl ${styles.title}`} data-reveal>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`body-lg ${styles.subtitle}`} data-reveal>
                {subtitle}
              </p>
            )}
            {headerAction && (
              <div className={styles.action} data-reveal>
                {headerAction}
              </div>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
