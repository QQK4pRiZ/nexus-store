'use client';

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { CartItem, CartState, Product } from '@/types';

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity?: number; color?: string; storage?: string; version?: string }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QTY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' };

interface CartContextValue extends CartState {
  addItem: (product: Product, qty?: number, color?: string, storage?: string, version?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.findIndex((i) => i.product.id === action.product.id);
      if (existing >= 0) {
        const updated = [...state.items];
        updated[existing] = {
          ...updated[existing],
          quantity: updated[existing].quantity + (action.quantity ?? 1),
        };
        return { ...state, items: updated, isOpen: true };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            product: action.product,
            quantity: action.quantity ?? 1,
            selectedColor: action.color,
            selectedStorage: action.storage,
            selectedVersion: action.version,
          },
        ],
        isOpen: true,
      };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.product.id !== action.productId) };
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: Math.max(1, action.quantity) } : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  const addItem = useCallback(
    (product: Product, qty = 1, color?: string, storage?: string, version?: string) =>
      dispatch({ type: 'ADD_ITEM', product, quantity: qty, color, storage, version }),
    []
  );
  const removeItem = useCallback((productId: string) => dispatch({ type: 'REMOVE_ITEM', productId }), []);
  const updateQuantity = useCallback(
    (productId: string, quantity: number) => dispatch({ type: 'UPDATE_QTY', productId, quantity }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);
  const openCart = useCallback(() => dispatch({ type: 'OPEN_CART' }), []);
  const closeCart = useCallback(() => dispatch({ type: 'CLOSE_CART' }), []);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ ...state, addItem, removeItem, updateQuantity, clearCart, openCart, closeCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
