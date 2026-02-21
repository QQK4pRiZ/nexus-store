// Product types
export interface ProductVariant {
  id: string;
  label: string;
  value: string;
  type: 'color' | 'storage' | 'version';
  colorHex?: string;
  priceModifier?: number;
  inStock: boolean;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductSpecGroup {
  title: string;
  specs: ProductSpec[];
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  categorySlug: string;
  badge?: 'new' | 'sale' | 'popular' | 'hit';
  variants: {
    colors?: ProductVariant[];
    storage?: ProductVariant[];
    versions?: ProductVariant[];
  };
  specs: ProductSpecGroup[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

// Category types
export interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  productCount: number;
  icon: string;
}

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
  selectedVersion?: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

// Filter types
export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  title: string;
  options: FilterOption[];
}

export type SortOption = 'popular' | 'new' | 'price_asc' | 'price_desc' | 'rating';
