"use client";

import { useState, useCallback, useEffect } from "react";
import type { Cart } from "@/lib/medusa/cart";
import {
  getCart,
  addToCart as addToCartApi,
  createCart,
  updateCartItem as updateCartItemApi,
  removeCartItem as removeCartItemApi,
} from "@/lib/medusa/cart";

const CART_ID_KEY = "horo_cart_id";

export function useCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  const loadCart = useCallback(async () => {
    if (typeof window === "undefined") return;
    const cartId = localStorage.getItem(CART_ID_KEY);
    if (cartId) {
      const data = await getCart(cartId);
      setCart(data);
    } else {
      setCart(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addToCart = useCallback(
    async (variantId: string, quantity: number) => {
      let cartId = typeof window !== "undefined" ? localStorage.getItem(CART_ID_KEY) : null;
      if (!cartId) {
        const newCart = await createCart();
        if (!newCart) return null;
        cartId = newCart.id;
        if (typeof window !== "undefined") localStorage.setItem(CART_ID_KEY, cartId);
        setCart(newCart);
      }
      const updated = await addToCartApi(cartId, variantId, quantity);
      if (updated) setCart(updated);
      return updated;
    },
    []
  );

  const updateItem = useCallback(async (itemId: string, quantity: number) => {
    const cartId = typeof window !== "undefined" ? localStorage.getItem(CART_ID_KEY) : null;
    if (!cartId) return null;
    const updated = await updateCartItemApi(cartId, itemId, quantity);
    if (updated) setCart(updated);
    return updated;
  }, []);

  const removeItem = useCallback(async (itemId: string) => {
    const cartId = typeof window !== "undefined" ? localStorage.getItem(CART_ID_KEY) : null;
    if (!cartId) return null;
    const updated = await removeCartItemApi(cartId, itemId);
    if (updated) setCart(updated);
    return updated;
  }, []);

  return {
    cart,
    loading,
    addToCart,
    updateItem,
    removeItem,
    refreshCart: loadCart,
    count: cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0,
  };
}
