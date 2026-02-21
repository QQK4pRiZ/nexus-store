'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  href,
  onClick,
  disabled = false,
  type = 'button',
  children,
  className = '',
  icon,
  iconPosition = 'right',
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;
    const onEnter = () => gsap.to(el, { scale: 1.02, duration: 0.2, ease: 'power2.out' });
    const onLeave = () => gsap.to(el, { scale: 1, duration: 0.2, ease: 'power2.out' });
    const onDown  = () => gsap.to(el, { scale: 0.97, duration: 0.1, ease: 'power2.out' });
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mousedown', onDown);
    el.addEventListener('mouseup', onEnter);
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('mouseup', onEnter);
    };
  }, [disabled]);

  const classes = [
    styles.btn,
    styles[`btn-${variant}`],
    styles[`btn-${size}`],
    fullWidth ? styles['btn-full'] : '',
    disabled ? styles['btn-disabled'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className={styles.icon}>{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} ref={ref as React.Ref<HTMLAnchorElement>} onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}>
        {content}
      </Link>
    );
  }

  return (
    <button ref={ref} type={type} className={classes} onClick={onClick as React.MouseEventHandler<HTMLButtonElement>} disabled={disabled}>
      {content}
    </button>
  );
}
