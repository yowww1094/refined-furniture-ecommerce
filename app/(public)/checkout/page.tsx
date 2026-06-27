'use client';

import { useCartStore } from '@/stores/cart';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Truck } from 'lucide-react';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();

  const handlePlaceOrder = async () => {
    // The form submission will handle the order creation
    // After successful order, we can clear the cart
    // We'll need to get a signal from the form; for now we'll just clear after submit
    // We'll implement a callback later.
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center space-x-3">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Home
          </Link>
          <h1 className="text-2xl font-bold">Checkout</h1>
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-border/50 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {items.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">Your cart is empty</p>
            ) : (
              <>
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between pb-3 border-b">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="pt-4 pt-6 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Subtotal:</span>
                    <span className="text-sm font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-border/50 mb-6">
          <h3 className="font-semibold mb-2">Payment Method</h3>
          <p className="text-sm">
            <span className="font-medium">Cash on Delivery (COD)</span> - Pay
            upon delivery. Please have the exact amount ready.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
          <CheckoutForm />
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={() => {
              // Clear cart and go back to shop if user cancels
              clearCart();
              // In a real app, we'd navigate back
              alert('Cart cleared. You can continue shopping.');
            }}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            ml-4
            // We'll handle form submission via the form's onSubmit
            // This button is just for show; the actual submit is inside the form
            // So we can hide this and rely on form submission.
            // We'll keep it as a placeholder.
            className="hidden"
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}