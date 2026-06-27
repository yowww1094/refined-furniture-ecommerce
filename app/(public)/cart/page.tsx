import { useCartStore } from '@/stores/cart';
import { CartItemRow } from '@/components/cart/CartItemRow';
import { CartSummary } from '@/components/cart/CartSummary';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Truck } from 'lucide-react';

export default function CartPage() {
  const { items, totalPrice, clearCart } = useCartStore();

  const handleCheckout = () => {
    // TODO: redirect to checkout page
    alert('Proceed to checkout');
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center space-x-3">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Home
          </Link>
          <h1 className="text-2xl font-bold">Your Cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Your cart is empty</p>
            <Link href="/shop" className="mt-4 inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-bg hover:bg-accent/20">
              Continue Shopping
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="border-b pb-4">
                  <CartItemRow item={item} />
                </div>
              ))}
            </div>

            <div className="mt-8">
              <CartSummary />
              <div className="mt-6">
                <Button onClick={handleCheckout} className="w-flex items-center justify-center">
                  Proceed to Checkout <Truck className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="w-full mt-4"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}