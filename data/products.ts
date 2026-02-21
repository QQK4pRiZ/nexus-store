import { Product } from '@/types';

export const products: Product[] = [

  // ─── SMARTPHONES ────────────────────────────────────────────────────────────

  {
    id: 'sm-001',
    slug: 'apple-iphone-16-pro-max',
    title: 'Apple iPhone 16 Pro Max',
    subtitle: 'Titanium. Tough. Totally Pro.',
    description: `iPhone 16 Pro Max — найпотужніший iPhone в історії. Чіп A18 Pro, камера 48 МП з оптичним зумом 5×, дисплей ProMotion 120 Гц та акумулятор до 33 годин відео.`,
    price: 64999,
    originalPrice: 69999,
    images: [
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=900&q=85',
      'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=900&q=85',
    ],
    category: 'Смартфони',
    categorySlug: 'smartphones',
    badge: 'new',
    variants: {
      colors: [
        { id: 'c1', label: 'Чорний титан',  value: 'black-titanium', type: 'color', colorHex: '#2C2C2E', inStock: true },
        { id: 'c2', label: 'Білий титан',   value: 'white-titanium', type: 'color', colorHex: '#F5F0EB', inStock: true },
        { id: 'c3', label: 'Натуральний',   value: 'natural',        type: 'color', colorHex: '#C8B89A', inStock: true },
        { id: 'c4', label: 'Пустельний',    value: 'desert',         type: 'color', colorHex: '#D4B896', inStock: true },
      ],
      storage: [
        { id: 's1', label: '256 GB', value: '256gb', type: 'storage', inStock: true },
        { id: 's2', label: '512 GB', value: '512gb', type: 'storage', priceModifier: 7000,  inStock: true },
        { id: 's3', label: '1 TB',   value: '1tb',   type: 'storage', priceModifier: 15000, inStock: true },
      ],
    },
    specs: [
      { title: 'Дисплей', specs: [
        { label: 'Діагональ',    value: '6.9"' },
        { label: 'Технологія',   value: 'Super Retina XDR ProMotion OLED' },
        { label: 'Роздільність', value: '2868 × 1320 пкс' },
        { label: 'Частота',      value: '1–120 Гц (адаптивна)' },
        { label: 'Яскравість',   value: '2000 нт (пікова)' },
      ]},
      { title: 'Продуктивність', specs: [
        { label: 'Чіп', value: 'Apple A18 Pro (3 нм)' },
        { label: 'ОЗП', value: '8 ГБ' },
        { label: 'ОС',  value: 'iOS 18' },
      ]},
      { title: 'Камера', specs: [
        { label: 'Основна',     value: '48 МП, f/1.78, OIS' },
        { label: 'Ширококутна', value: '48 МП, f/2.2' },
        { label: 'Телефото',    value: '12 МП, 5× оптичний зум' },
        { label: 'Відео',       value: '4K 120 fps ProRes' },
      ]},
      { title: 'Автономність', specs: [
        { label: 'Акумулятор', value: '4685 мАг' },
        { label: 'Зарядка',    value: '30 Вт MagSafe / 15 Вт Qi2' },
      ]},
    ],
    rating: 4.9,
    reviewCount: 2841,
    inStock: true,
    isNew: true,
    isFeatured: true,
  },

  {
    id: 'sm-004',
    slug: 'samsung-galaxy-s25-ultra',
    title: 'Samsung Galaxy S25 Ultra',
    subtitle: 'Galaxy AI. Now in Ultra.',
    description: `Galaxy S25 Ultra з вбудованим S Pen, камерою 200 МП, Snapdragon 8 Elite та Galaxy AI для нового рівня продуктивності.`,
    price: 59999,
    originalPrice: 65999,
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=900&q=85',
    ],
    category: 'Смартфони',
    categorySlug: 'smartphones',
    badge: 'new',
    variants: {
      colors: [
        { id: 'c1', label: 'Titanium Black',      value: 'titanium-black',       type: 'color', colorHex: '#2C2C2E', inStock: true },
        { id: 'c2', label: 'Titanium Silver Blue', value: 'titanium-silver-blue', type: 'color', colorHex: '#8BA7C7', inStock: true },
        { id: 'c3', label: 'Titanium White',       value: 'titanium-white',       type: 'color', colorHex: '#F0EFEA', inStock: true },
      ],
      storage: [
        { id: 's1', label: '256 GB', value: '256gb', type: 'storage', inStock: true },
        { id: 's2', label: '512 GB', value: '512gb', type: 'storage', priceModifier: 6000,  inStock: true },
        { id: 's3', label: '1 TB',   value: '1tb',   type: 'storage', priceModifier: 13000, inStock: true },
      ],
    },
    specs: [
      { title: 'Дисплей', specs: [
        { label: 'Діагональ', value: '6.9" Dynamic AMOLED 2X' },
        { label: 'Частота',   value: '1–120 Гц' },
      ]},
      { title: 'Продуктивність', specs: [
        { label: 'Процесор', value: 'Snapdragon 8 Elite' },
        { label: 'ОЗП',      value: '12 ГБ' },
        { label: 'ОС',       value: 'Android 15 / One UI 7' },
      ]},
      { title: 'Камера', specs: [
        { label: 'Основна',     value: '200 МП, f/1.7, OIS' },
        { label: 'Телефото',    value: '50 МП, 5× оптичний зум' },
        { label: 'Ширококутна', value: '12 МП' },
      ]},
    ],
    rating: 4.8,
    reviewCount: 1987,
    inStock: true,
    isNew: true,
    isFeatured: true,
  },

  // ─── LAPTOPS ─────────────────────────────────────────────────────────────────

  {
    id: 'lt-001',
    slug: 'apple-macbook-pro-16-m4',
    title: 'Apple MacBook Pro 16" M4 Pro',
    subtitle: 'Найпотужніший Mac в своєму класі',
    description: `MacBook Pro 16" з чіпом M4 Pro — до 14 ядер CPU, 20 ядер GPU та 24 ГБ уніфікованої пам'яті. До 22 годин автономної роботи.`,
    price: 124999,
    originalPrice: 134999,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&q=85',
      'https://images.unsplash.com/photo-1611186871525-9e9e26b8d70d?w=900&q=85',
    ],
    category: 'Ноутбуки та ПК',
    categorySlug: 'laptops',
    badge: 'new',
    variants: {
      colors: [
        { id: 'c1', label: 'Space Black', value: 'space-black', type: 'color', colorHex: '#1C1C1E', inStock: true },
        { id: 'c2', label: 'Silver',      value: 'silver',      type: 'color', colorHex: '#C8C8D0', inStock: true },
      ],
      storage: [
        { id: 's1', label: '512 GB SSD', value: '512gb', type: 'storage', inStock: true },
        { id: 's2', label: '1 TB SSD',   value: '1tb',   type: 'storage', priceModifier: 12000, inStock: true },
        { id: 's3', label: '2 TB SSD',   value: '2tb',   type: 'storage', priceModifier: 28000, inStock: true },
      ],
    },
    specs: [
      { title: 'Дисплей', specs: [
        { label: 'Діагональ',    value: '16.2" Liquid Retina XDR' },
        { label: 'Роздільність', value: '3456 × 2234' },
        { label: 'Яскравість',   value: '1000 нт (пікова 1600 нт)' },
      ]},
      { title: 'Продуктивність', specs: [
        { label: 'Чіп', value: 'Apple M4 Pro' },
        { label: 'CPU', value: '14-ядерний' },
        { label: 'GPU', value: '20-ядерний' },
        { label: 'RAM', value: '24 ГБ (до 48 ГБ)' },
      ]},
      { title: 'Автономність', specs: [
        { label: 'Акумулятор', value: '100 Вт·г' },
        { label: 'Час роботи', value: 'до 22 годин' },
      ]},
    ],
    rating: 4.9,
    reviewCount: 1432,
    inStock: true,
    isNew: true,
    isFeatured: true,
  },

  {
    id: 'lt-003',
    slug: 'asus-rog-zephyrus-g16',
    title: 'ASUS ROG Zephyrus G16',
    subtitle: 'Gaming. Redefined.',
    description: `ROG Zephyrus G16 — ігровий ноутбук із OLED 240 Гц дисплеєм, RTX 4090 16 ГБ та AMD Ryzen 9 7945HX. Потужність у елегантному корпусі.`,
    price: 109999,
    originalPrice: 119999,
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=900&q=85',
    ],
    category: 'Ноутбуки та ПК',
    categorySlug: 'laptops',
    badge: 'hit',
    variants: {
      colors: [
        { id: 'c1', label: 'Eclipse Gray',   value: 'eclipse', type: 'color', colorHex: '#2C2C3A', inStock: true },
        { id: 'c2', label: 'Platinum White', value: 'white',   type: 'color', colorHex: '#F5F0EB', inStock: false },
      ],
      storage: [
        { id: 's1', label: '1 TB SSD', value: '1tb', type: 'storage', inStock: true },
        { id: 's2', label: '2 TB SSD', value: '2tb', type: 'storage', priceModifier: 10000, inStock: true },
      ],
    },
    specs: [
      { title: 'Дисплей', specs: [
        { label: 'Діагональ',   value: '16" QHD+ OLED' },
        { label: 'Частота',     value: '240 Гц' },
        { label: 'Час відгуку', value: '0.2 мс' },
      ]},
      { title: 'Продуктивність', specs: [
        { label: 'Процесор', value: 'AMD Ryzen 9 7945HX' },
        { label: 'GPU',      value: 'NVIDIA RTX 4090 16 ГБ' },
        { label: 'RAM',      value: '16 ГБ DDR5 (до 64 ГБ)' },
      ]},
    ],
    rating: 4.8,
    reviewCount: 531,
    inStock: true,
    isNew: true,
    isFeatured: true,
  },

  // ─── GAMING HEADSETS ─────────────────────────────────────────────────────────

  {
    id: 'gh-001',
    slug: 'sony-inzone-h9',
    title: 'Sony INZONE H9',
    subtitle: 'Wireless. ANC. 360 Spatial Sound.',
    description: `INZONE H9 — бездротова ігрова гарнітура Sony з ANC, 360 Spatial Sound та до 32 годин роботи. Ідеально для PS5 та ПК.`,
    price: 12999,
    originalPrice: 15999,
    images: [
      'https://images.unsplash.com/photo-1599669454699-248893623440?w=900&q=85',
    ],
    category: 'Ігрові гарнітури',
    categorySlug: 'gaming',
    badge: 'popular',
    variants: {
      colors: [
        { id: 'c1', label: 'White', value: 'white', type: 'color', colorHex: '#F5F5F7', inStock: true },
        { id: 'c2', label: 'Black', value: 'black', type: 'color', colorHex: '#1C1C1E', inStock: true },
      ],
    },
    specs: [
      { title: 'Звук', specs: [
        { label: 'Драйвери',     value: '40 мм, неодимові' },
        { label: 'ANC',          value: 'Активне шумопоглинання' },
        { label: 'Просторовий',  value: '360 Spatial Sound for Gaming' },
      ]},
      { title: 'Підключення', specs: [
        { label: 'Бездротовий', value: '2.4 ГГц / Bluetooth 5.0' },
        { label: 'Акумулятор',  value: '32 год (ANC), 40 год (без ANC)' },
      ]},
    ],
    rating: 4.7,
    reviewCount: 1287,
    inStock: true,
    isNew: true,
    isFeatured: true,
  },

  // ─── HEADPHONES ──────────────────────────────────────────────────────────────

  {
    id: 'hp-001',
    slug: 'sony-wh-1000xm6',
    title: 'Sony WH-1000XM6',
    subtitle: 'Найкраще шумопоглинання в галузі',
    description: `WH-1000XM6 — провідний стандарт ANC від Sony з LDAC Hi-Res Audio, 30 годинами роботи та Speak-to-Chat.`,
    price: 14999,
    originalPrice: 17999,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85',
    ],
    category: 'Студійні навушники',
    categorySlug: 'headphones',
    badge: 'new',
    variants: {
      colors: [
        { id: 'c1', label: 'Black',         value: 'black',  type: 'color', colorHex: '#1C1C1E', inStock: true },
        { id: 'c2', label: 'Silver',        value: 'silver', type: 'color', colorHex: '#C8C8D0', inStock: true },
        { id: 'c3', label: 'Midnight Blue', value: 'blue',   type: 'color', colorHex: '#1B3A6B', inStock: true },
      ],
    },
    specs: [
      { title: 'Звук', specs: [
        { label: 'Драйвери', value: '40 мм' },
        { label: 'LDAC',     value: 'Hi-Res Audio Wireless' },
        { label: 'ANC',      value: 'Industry-leading' },
      ]},
      { title: 'Автономність', specs: [
        { label: 'Акумулятор',     value: '30 годин (ANC увімкнено)' },
        { label: 'Швидка зарядка', value: '3 хв = 3 год' },
      ]},
    ],
    rating: 4.9,
    reviewCount: 5621,
    inStock: true,
    isNew: true,
    isFeatured: true,
  },

  // ─── ACCESSORIES ─────────────────────────────────────────────────────────────

  {
    id: 'ac-001',
    slug: 'apple-airpods-pro-2',
    title: 'Apple AirPods Pro (2nd gen)',
    subtitle: 'Adaptive Audio. Always on.',
    description: `AirPods Pro 2 з USB-C, H2 чіпом, Adaptive Transparency та до 30 годин із зарядним кейсом.`,
    price: 10999,
    originalPrice: 12999,
    images: [
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=900&q=85',
    ],
    category: 'Аксесуари',
    categorySlug: 'accessories',
    badge: 'popular',
    variants: {
      colors: [
        { id: 'c1', label: 'White', value: 'white', type: 'color', colorHex: '#F5F5F7', inStock: true },
      ],
    },
    specs: [
      { title: 'Звук', specs: [
        { label: 'Чіп',  value: 'Apple H2' },
        { label: 'ANC',  value: 'Adaptive Transparency' },
        { label: 'Звук', value: 'Personalized Spatial Audio' },
      ]},
      { title: 'Автономність', specs: [
        { label: 'AirPods',  value: '6 год (ANC)' },
        { label: 'З кейсом', value: '30 год' },
        { label: 'Зарядка',  value: 'USB-C / MagSafe / Qi2' },
      ]},
    ],
    rating: 4.8,
    reviewCount: 8912,
    inStock: true,
    isNew: true,
    isFeatured: true,
  },

  {
    id: 'ac-003',
    slug: 'apple-watch-series-10',
    title: 'Apple Watch Series 10',
    subtitle: 'Найтонший Apple Watch',
    description: `Apple Watch Series 10 — найтонший та найлегший корпус, новий великий OLED дисплей та нові датчики здоров'я.`,
    price: 16999,
    originalPrice: 18999,
    images: [
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=900&q=85',
    ],
    category: 'Аксесуари',
    categorySlug: 'accessories',
    badge: 'new',
    variants: {
      colors: [
        { id: 'c1', label: 'Jet Black', value: 'jet-black', type: 'color', colorHex: '#1C1C1E', inStock: true },
        { id: 'c2', label: 'Rose Gold', value: 'rose-gold', type: 'color', colorHex: '#B76E79', inStock: true },
        { id: 'c3', label: 'Silver',    value: 'silver',    type: 'color', colorHex: '#C8C8D0', inStock: true },
      ],
      versions: [
        { id: 'v1', label: '42 мм', value: '42mm', type: 'version', inStock: true },
        { id: 'v2', label: '46 мм', value: '46mm', type: 'version', priceModifier: 2000, inStock: true },
      ],
    },
    specs: [
      { title: 'Дисплей', specs: [
        { label: 'Технологія', value: 'Always-On Retina OLED' },
        { label: 'Яскравість', value: '2000 нт' },
      ]},
      { title: "Здоров'я", specs: [
        { label: 'Серцебиття', value: 'Optical + Electrical' },
        { label: 'Сон апное',  value: 'Новий датчик' },
      ]},
    ],
    rating: 4.8,
    reviewCount: 3421,
    inStock: true,
    isNew: true,
    isFeatured: true,
  },

];

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, limit);
}

export function formatPrice(price: number): string {
  const str = Math.round(price).toString();
  let result = '';
  let count = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    if (count > 0 && count % 3 === 0) result = '\u00A0' + result;
    result = str[i] + result;
    count++;
  }
  return result + '\u00A0₴';
}
