import { useCartStore } from '@/stores/cart';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export function CartSummary() {
  const { items, totalPrice, clearCart } = useCartStore();

  const handleCheckout = () => {
    // TODO: navigate to checkout page
    alert('Proceed to checkout');
  };

  return (
    <div className="border-t pt-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">Subtotal</span>
        <span className="font-semibold">${totalPrice.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span>Total</span>
        <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
      </div>
      <Button onClick={handleCheckout} className="w-full">
        Proceed to Checkout <ChevronRight className="ms-2 h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        onClick={clearCart}
        className="w-full mt-2"
      >
        Clear Cart
      </Button>
    </div>
  );
}