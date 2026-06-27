import { useCartStore } from '@/stores/cart';
import { CartItemRow } from './CartItemRow';
import { CartSummary } from './CartSummary';
import { X } from 'lucide-react';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items } = useCartStore();

  if (!open) return null;

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-end justify-between p-4 space-y-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      {/* Drawer content */}
      <div className="w-[320px] max-h-[85vh] bg-background p-6 rounded-lg shadow-xl space-y-6 overflow-auto">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button onClick={handleClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
        {items.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">Your cart is empty</p>
        ) : (
          <>
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
            <CartSummary />
          </>
        )}
      </div>
    </div>
  );
}