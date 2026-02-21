'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/data/products';
import Button from '@/components/ui/Button';
import styles from './CheckoutPage.module.css';

type Step = 1 | 2 | 3;

const stepLabels = ['Контакти', 'Доставка', 'Оплата'];

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [ordered, setOrdered] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    city: '', address: '', deliveryMethod: 'nova',
    paymentMethod: 'card',
    comment: '',
  });

  useEffect(() => {
    if (!formRef.current) return;
    gsap.fromTo(formRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [step]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = () => {
    if (step < 3) setStep((s) => (s + 1) as Step);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrdered(true);
    clearCart();
  };

  const shipping = totalPrice >= 1000 ? 0 : 99;

  if (ordered) {
    return (
      <main className={styles.main}>
        <div className={styles.success}>
          <div className={styles.successIcon}>✅</div>
          <h1 className={styles.successTitle}>Замовлення прийнято!</h1>
          <p className={styles.successText}>
            Дякуємо за покупку. Наш менеджер зв'яжеться з вами найближчим часом.
          </p>
          <Button variant="primary" href="/" size="lg">На головну</Button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className="container">
        <Link href="/" className={styles.logo}>NEXUS<span className={styles.logoDot} /></Link>

        <div className={styles.layout}>
          {/* Left: Form */}
          <div className={styles.formSection}>
            {/* Stepper */}
            <div className={styles.stepper}>
              {stepLabels.map((label, i) => {
                const s = (i + 1) as Step;
                return (
                  <React.Fragment key={label}>
                    <div className={`${styles.stepItem} ${step >= s ? styles.stepActive : ''} ${step > s ? styles.stepDone : ''}`}>
                      <div className={styles.stepCircle}>
                        {step > s ? '✓' : s}
                      </div>
                      <span className={styles.stepLabel}>{label}</span>
                    </div>
                    {i < stepLabels.length - 1 && (
                      <div className={`${styles.stepLine} ${step > s ? styles.stepLineDone : ''}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Form */}
            <div ref={formRef}>
              <form onSubmit={handleSubmit} className={styles.form}>
                {step === 1 && (
                  <div className={styles.formStep}>
                    <h2 className={styles.stepTitle}>Контактна інформація</h2>
                    <div className={styles.formGrid}>
                      <div className={styles.field}>
                        <label>Ім'я та прізвище *</label>
                        <input name="name" value={form.name} onChange={handleInput} placeholder="Іван Іваненко" required />
                      </div>
                      <div className={styles.field}>
                        <label>Телефон *</label>
                        <input name="phone" value={form.phone} onChange={handleInput} placeholder="+380 XX XXX XX XX" required />
                      </div>
                      <div className={`${styles.field} ${styles.fullWidth}`}>
                        <label>Email</label>
                        <input name="email" value={form.email} onChange={handleInput} type="email" placeholder="your@email.com" />
                      </div>
                    </div>
                    <div className={styles.formActions}>
                      <Button variant="accent" size="lg" type="button" onClick={handleNext}>
                        Далі → Доставка
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className={styles.formStep}>
                    <h2 className={styles.stepTitle}>Спосіб доставки</h2>
                    <div className={styles.deliveryOptions}>
                      {[
                        { value: 'nova', label: 'Нова Пошта', desc: `Відділення або кур'єр`, icon: '📦' },
                        { value: 'ukr',  label: 'Укрпошта',   desc: 'Відділення по Україні', icon: '✉️' },
                        { value: 'courier', label: `Кур'єр до дверей`, desc: 'Доставка на наступний день', icon: '🚚' },
                      ].map((opt) => (
                        <label
                          key={opt.value}
                          className={`${styles.deliveryOption} ${form.deliveryMethod === opt.value ? styles.optionActive : ''}`}
                        >
                          <input
                            type="radio"
                            name="deliveryMethod"
                            value={opt.value}
                            checked={form.deliveryMethod === opt.value}
                            onChange={handleInput}
                            className={styles.radioHidden}
                          />
                          <span className={styles.optionIcon}>{opt.icon}</span>
                          <span>
                            <strong>{opt.label}</strong>
                            <span>{opt.desc}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                    <div className={styles.formGrid}>
                      <div className={styles.field}>
                        <label>Місто *</label>
                        <input name="city" value={form.city} onChange={handleInput} placeholder="Київ" required />
                      </div>
                      <div className={styles.field}>
                        <label>Відділення / Адреса *</label>
                        <input name="address" value={form.address} onChange={handleInput} placeholder="Відділення №1 / вул. Хрещатик, 1" required />
                      </div>
                    </div>
                    <div className={styles.formActions}>
                      <Button variant="secondary" size="lg" type="button" onClick={handleBack}>← Назад</Button>
                      <Button variant="accent" size="lg" type="button" onClick={handleNext}>Далі → Оплата</Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className={styles.formStep}>
                    <h2 className={styles.stepTitle}>Спосіб оплати</h2>
                    <div className={styles.deliveryOptions}>
                      {[
                        { value: 'card',  label: 'Картою онлайн',    desc: 'Visa, Mastercard, Apple Pay·Google Pay', icon: '💳' },
                        { value: 'cash',  label: 'Накладений платіж', desc: 'Оплата при отриманні', icon: '💵' },
                        { value: 'parts', label: 'Частинами',         desc: 'ПриватБанк, mono, А-Банк', icon: '🔢' },
                      ].map((opt) => (
                        <label
                          key={opt.value}
                          className={`${styles.deliveryOption} ${form.paymentMethod === opt.value ? styles.optionActive : ''}`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={opt.value}
                            checked={form.paymentMethod === opt.value}
                            onChange={handleInput}
                            className={styles.radioHidden}
                          />
                          <span className={styles.optionIcon}>{opt.icon}</span>
                          <span>
                            <strong>{opt.label}</strong>
                            <span>{opt.desc}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                    <div className={styles.field}>
                      <label>Коментар до замовлення</label>
                      <textarea
                        name="comment"
                        value={form.comment}
                        onChange={handleInput}
                        rows={3}
                        placeholder="Побажання, час доставки, тощо..."
                        className={styles.textarea}
                      />
                    </div>
                    <div className={styles.formActions}>
                      <Button variant="secondary" size="lg" type="button" onClick={handleBack}>← Назад</Button>
                      <Button variant="accent" size="lg" type="submit">
                        Підтвердити замовлення ✓
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Right: Order summary */}
          <aside className={styles.summary}>
            <h2 className={styles.summaryTitle}>Ваше замовлення</h2>
            <div className={styles.summaryItems}>
              {items.map((item) => (
                <div key={item.product.id} className={styles.summaryItem}>
                  <div className={styles.summaryImage}>
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fill
                      sizes="60px"
                      className={styles.summaryImg}
                    />
                    <span className={styles.summaryQtyBadge}>{item.quantity}</span>
                  </div>
                  <div className={styles.summaryItemInfo}>
                    <p className={styles.summaryItemTitle}>{item.product.title}</p>
                    {item.selectedColor && <p className={styles.summaryItemVariant}>{item.selectedColor}</p>}
                  </div>
                  <span className={styles.summaryItemPrice}>
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.summaryTotals}>
              <div className={styles.summaryRow}>
                <span>Товари:</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Доставка:</span>
                <span>{shipping === 0 ? 'Безкоштовно' : formatPrice(shipping)}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                <span>До сплати:</span>
                <span>{formatPrice(totalPrice + shipping)}</span>
              </div>
            </div>
            <p className={styles.guaranteeNote}>
              🔒 Захищена оплата · Офіційна гарантія
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
