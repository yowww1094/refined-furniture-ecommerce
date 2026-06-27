import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        addItem: (item) => {
          set((state) => {
            const existingItem = state.items.find((i) => i.id === item.id);
            if (existingItem) {
              return {
                items: state.items.map((i) =>
                  i.id === item.id
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
                ),
              };
            } else {
              return {
                items: [...state.items, { ...item, quantity: 1 }],
              };
            }
          });
        },
        removeItem: (id) => {
          set((state) => ({
            items: state.items.filter((i) => i.id !== id),
          }));
        },
        updateQuantity: (id, quantity) => {
          if (quantity <= 0) {
            // If quantity is zero or less, remove the item
            return set((state) => ({
              items: state.items.filter((i) => i.id !== id),
            }));
          }
          set((state) => ({
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity } : i
            ),
          }));
        },
        clearCart: () => {
          set({ items: [] });
        },
        totalItems: () => {
          return get().items.reduce((total, item) => total + item.quantity, 0);
        },
        totalPrice: () => {
          return get().items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
        },
      }),
      {
        name: 'cart-storage', // name of the item in localStorage
      }
    )
  )
);