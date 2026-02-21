import React from 'react';

type BadgeVariant = 'new' | 'sale' | 'popular' | 'hit' | 'custom';

interface BadgeProps {
  variant?: BadgeVariant;
  children?: React.ReactNode;
  className?: string;
}

const labels: Record<string, string> = {
  new: 'Новинка',
  sale: 'Акція',
  popular: 'Популярне',
  hit: 'Хіт',
};

export default function Badge({ variant = 'new', children, className = '' }: BadgeProps) {
  const variantClass = variant !== 'custom' ? `badge-${variant}` : '';
  const displayText = variant !== 'custom' ? (labels[variant] ?? children) : children;

  return (
    <span className={`badge ${variantClass} ${className}`}>
      {displayText}
    </span>
  );
}
