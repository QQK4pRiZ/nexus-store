import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins (client-side only)
export function registerGSAP() {
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }
}

// Reveal animation for elements on scroll
export function revealOnScroll(
  elements: string | Element | Element[] | NodeList,
  options: {
    y?: number;
    opacity?: number;
    stagger?: number;
    delay?: number;
    duration?: number;
    ease?: string;
    start?: string;
  } = {}
) {
  const {
    y = 60,
    opacity = 0,
    stagger = 0.12,
    delay = 0,
    duration = 0.9,
    ease = 'power2.out',
    start = 'top 85%',
  } = options;

  return gsap.fromTo(
    elements,
    { y, opacity, willChange: 'transform, opacity' },
    {
      y: 0,
      opacity: 1,
      duration,
      ease,
      stagger,
      delay,
      scrollTrigger: {
        trigger: typeof elements === 'string' ? elements : undefined,
        start,
        toggleActions: 'play none none none',
      },
    }
  );
}

// Hero reveal animation
export function heroReveal(container: Element) {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.2 } });
  tl.fromTo('[data-hero-badge]', { y: 20, opacity: 0 }, { y: 0, opacity: 1 })
    .fromTo('[data-hero-title]', { y: 80, opacity: 0, skewY: 3 }, { y: 0, opacity: 1, skewY: 0 }, '-=0.8')
    .fromTo('[data-hero-subtitle]', { y: 40, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.7')
    .fromTo('[data-hero-price]', { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.6')
    .fromTo('[data-hero-cta]', { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12 }, '-=0.5')
    .fromTo('[data-hero-image]', { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' }, '-=1.2');
  return tl;
}

// Card hover animation
export function cardHoverIn(card: Element) {
  gsap.to(card, { y: -8, duration: 0.35, ease: 'power2.out' });
  gsap.to(card.querySelector('[data-card-image]'), { scale: 1.05, duration: 0.5, ease: 'power2.out' });
}

export function cardHoverOut(card: Element) {
  gsap.to(card, { y: 0, duration: 0.35, ease: 'power2.out' });
  gsap.to(card.querySelector('[data-card-image]'), { scale: 1, duration: 0.5, ease: 'power2.out' });
}

// Drawer slide-in/out
export function openDrawer(drawer: Element, overlay: Element) {
  gsap.set(drawer, { x: '100%', visibility: 'visible' });
  gsap.set(overlay, { display: 'block', opacity: 0 });
  const tl = gsap.timeline();
  tl.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' });
  tl.to(drawer, { x: 0, duration: 0.55, ease: 'expo.out' }, '-=0.2');
  return tl;
}

export function closeDrawer(drawer: Element, overlay: Element, onComplete?: () => void) {
  const tl = gsap.timeline({ onComplete });
  tl.to(drawer, { x: '100%', duration: 0.45, ease: 'power2.in' });
  tl.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in' }, '-=0.2');
  tl.set(overlay, { display: 'none' });
  return tl;
}

// Page transition
export function pageIn() {
  return gsap.fromTo('main', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
}

// Accordion toggle
export function accordionOpen(content: Element) {
  gsap.fromTo(content, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.45, ease: 'power2.out' });
}

export function accordionClose(content: Element, onComplete?: () => void) {
  gsap.to(content, { height: 0, opacity: 0, duration: 0.35, ease: 'power2.in', onComplete });
}
