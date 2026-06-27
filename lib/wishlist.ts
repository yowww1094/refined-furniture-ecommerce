import { useState, useEffect } from 'react';

const WISHLIST_KEY = 'wishlist-items';

export function useWishlist() {
  const [items, setItems] = useState<string[]>(() => {
    const saved = localStorage.getItem(WISHLIST_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (id: string) => {
    setItems((prev) => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item !== id));
  };

  const toggleItem = (id: string) => {
    if (isInWishlist(id)) {
      removeItem(id);
    } else {
      addItem(id);
    }
  };

  const isInWishlist = (id: string) => {
    return items.includes(id);
  };

  return {
    items,
    addItem,
    removeItem,
    toggleItem,
    isInWishlist,
  };
}