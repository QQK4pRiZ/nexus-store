# NEXUS — Premium Tech E-Commerce

Сучасний преміальний інтернет-магазин техніки. Awwwards-рівень дизайну, побудований на Next.js 14 App Router, TypeScript, GSAP та CSS Modules.

---

## Стек технологій

| Технологія | Версія | Призначення |
|---|---|---|
| Next.js | 14.2.5 | App Router, SSR/SSG, метадані |
| TypeScript | 5.x | Суворий режим, всі типи |
| GSAP | 3.12.5 + ScrollTrigger | Всі анімації |
| CSS Modules | — | Компонентні стилі без Tailwind |
| React Context | — | Кошик (useReducer) |

---

## Швидкий старт

```bash
# 1. Встановити залежності (вже зроблено)
npm install

# 2. Запустити dev-сервер
npm run dev

# 3. Відкрити в браузері
# http://localhost:3000
```

### Продакшн-білд

```bash
npm run build
npm start
```

---

## Структура проєкту

```
/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Корневий layout (Header, Footer, CartDrawer)
│   ├── page.tsx                # Головна сторінка
│   ├── globals.css             # Дизайн-система (CSS змінні, типографіка)
│   ├── kataloh/[slug]/         # Сторінка категорії
│   │   ├── page.tsx            # Server component (generateStaticParams + metadata)
│   │   └── CategoryClient.tsx  # Client component (фільтри, сортування, GSAP)
│   ├── tovar/[slug]/           # Сторінка товару
│   │   ├── page.tsx            # Server component (metadata + OG)
│   │   └── ProductClient.tsx   # Client component (галерея, варіанти, акордеон)
│   └── oformlennia/            # Оформлення замовлення
│       ├── page.tsx            # Server component
│       └── CheckoutPage.tsx    # Multi-step checkout (3 кроки + GSAP переходи)
│
├── components/
│   ├── ui/                     # Button, Badge, Section
│   ├── layout/                 # Header, Footer
│   ├── cart/                   # CartDrawer
│   ├── product/                # ProductCard, ProductGallery
│   └── home/                   # Hero, Categories, FeaturedProducts, Advantages, Brand
│
├── data/
│   ├── products.ts             # 8 mock-товарів + функції-хелпери
│   └── categories.ts           # 5 категорій
│
├── lib/
│   ├── cart-context.tsx        # CartProvider + useCart() hook
│   └── gsap-utils.ts           # Утиліти GSAP (revealOnScroll, heroReveal, тощо)
│
└── types/
    └── index.ts                # Всі TypeScript інтерфейси
```

---

## Сторінки

| URL | Опис |
|---|---|
| `/` | Головна: Hero, Новинки, Категорії, Рекомендовані, Переваги |
| `/kataloh/smartphones` | Каталог: фільтри + сортування |
| `/kataloh/laptops` | Каталог ноутбуків |
| `/kataloh/gaming` | Ігрові гарнітури |
| `/kataloh/headphones` | Навушники |
| `/kataloh/accessories` | Аксесуари |
| `/tovar/[slug]` | Сторінка товару + акордеон характеристик |
| `/oformlennia` | 3-кроковий чекаут |

---

## Як підключити реальні дані

### 1. База даних (Prisma + PostgreSQL / Supabase)

```bash
npm install prisma @prisma/client
npx prisma init
```

Замінити `data/products.ts` та `data/categories.ts` на Prisma-запити:

```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getProducts() {
  return prisma.product.findMany({ include: { variants: true, specs: true } });
}
```

### 2. CMS (Sanity.io / Contentful)

```bash
npm install next-sanity @sanity/image-url
```

```typescript
// lib/sanity.ts
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

export async function getProducts() {
  return client.fetch(`*[_type == "product"]`);
}
```

### 3. REST API / Next.js Route Handlers

Створити `app/api/products/route.ts`:

```typescript
export async function GET() {
  const products = await fetchFromYourBackend();
  return Response.json(products);
}
```

### 4. Зображення

Поточна конфігурація дозволяє Unsplash та ваш домен:

```javascript
// next.config.js — додати власний домен:
remotePatterns: [
  { protocol: 'https', hostname: 'your-cdn.com' },
]
```

### 5. Реальні платежі (LiqPay / Stripe)

```bash
# LiqPay (Україна)
npm install liqpay-node

# Stripe (міжнародний)
npm install stripe @stripe/stripe-js
```

---

## Змінні середовища

Створити `.env.local`:

```env
# База даних
DATABASE_URL="postgresql://..."

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=""
SANITY_API_TOKEN=""

# Платежі
LIQPAY_PUBLIC_KEY=""
LIQPAY_PRIVATE_KEY=""

# або Stripe
STRIPE_SECRET_KEY=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
```

---

## Дизайн-система

Всі токени визначені в `app/globals.css`:

```css
--color-primary: #1B4FD8;    /* синій */
--color-accent: #F5C518;     /* жовтий */
--color-bg: #F8F9FC;         /* фон */
--font-heading: 'Manrope';
--font-body: 'Inter';
```

---

## Ліцензія

MIT © [K4pRiZ](https://freelancehunt.com/freelancer/K4pRiZ.html)

Портфоліо проєкт. Вільно використовуйте як основу для реальних проєктів.
