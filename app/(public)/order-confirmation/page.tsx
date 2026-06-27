'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Truck } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function OrderConfirmationPage() {
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the user's most recent order
  useEffect(() => {
    async function fetchRecentOrder() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          router.push('/');
          return;
        }

        const { data, error } = await supabase
          .from('orders')
          .select('*, order_items!inner(*, products!inner(name, image))')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          // Transform the data to a more usable format
          const formattedOrder = {
            id: data.id,
            created_at: data.created_at,
            total_amount: data.total_amount,
            status: data.status,
            customer_name: data.customer_name,
            customer_phone: data.customer_phone,
            customer_email: data.customer_email,
            shipping_address: data.shipping_address,
            notes: data.notes,
            items: data.order_items.map((item: any) => ({
              id: item.id,
              product_id: item.product_id,
              quantity: item.quantity,
              unit_price: item.unit_price,
              total_price: item.total_price,
              product: {
                name: item.products.name,
                image: item.products.image,
              },
            })),
          };

          setOrder(formattedOrder);
        } else {
          setError('No orders found');
        }
      } catch (err: any) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    }

    fetchRecentOrder();
  }, [router]);

  // If user is not authenticated, redirect to home
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        router.push('/');
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-pulse rounded-full bg-bg/50 px-4 py-2 text-sm">
              Loading...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center py-12">
          <div className="mb-6">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-destructive/20 text-destructive mb-4">
              <span className="text-xl">⚠️</span>
            </div>
            <h1 className="text-application/x-www-form-urlencoded; charset=UTF-8">text-3xl font-bold mb-4">
              Something went wrong
            </h1>
            <p className="text-lg text-muted-foreground mb-6">{error}</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 justify-center">
            <Button
              onClick={() => router.push('/')}
              variant="outline"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center py-12">
          <div className="mb-6">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-muted/20 text-muted-foreground mb-4">
              <span className="text-xl">📦</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Confirmation</h1>
            <p className="text-lg text-muted-foreground mb-6">
              We're preparing your order details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center py-12">
        <div className="mb-8">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-success/20 text-success mb-4">
            <Truck className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Thank you for your purchase! Your order has been received and is being processed.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-border/50 mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>

          <div className="space-y-4 text-left">
            <p className="flex items-start space-x-3 text-sm">
              <span className="flex h-3 w-3 items-center justify-center bg-muted/20 text-muted-foreground shrink-0">
                #️⃣
              </span>
              <span>Order #{order.id}</span>
            </p>
            <p className="flex items-start space-x-3 text-sm">
              <span className="flex h-3 w-3 items-center justify-center bg-muted/20 text-muted-foreground shrink-0">
                📅
              </span>
              <span>{new Date(order.created_at).toLocaleDateString()}</span>
            </p>
            <p className="flex items-start space-x-3 text-sm">
              <span className="flex h-3 w-3 items-center justify-center bg-muted/20 text-muted-foreground shrink-0">
                👤
              </span>
              <span>{order.customer_name}</span>
            </p>
            <p className="flex items-start space-x-3 text-sm">
              <span className="flex h-3 w-3 items-center justify-center bg-muted/20 text-muted-foreground shrink-0">
                📧
              </span>
              <span>{order.customer_email}</span>
            </p>
            <p className="flex items-start space-x-3 text-sm">
              <span className="flex h-3 w-3 items-center justify-center bg-muted/20 text-muted-foreground shrink-0">
                📱
              </span>
              <span>{order.customer_phone}</span>
            </p>
            {order.shipping_address && (
              <p className="flex items-start space-x-3 text-sm">
                <span className="flex h-3 w-3 items-center justify-center bg-muted/20 text-muted-foreground shrink-0">
                  📍
                </span>
                <span>{order.shipping_address}</span>
              </p>
            )}
          </div>

          {/* Items Summary */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Items Ordered</h3>
            <div className="space-y-3">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex items-start space-x-4 p-3 bg-white/30 rounded-lg border border-border/30">
                  <img
                    src={item.product.image || '/placeholder.svg'}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded flex-shrink-0"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">${item.total_price.toFixed(2)}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity} × ${(item.unit_price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-6 pt-5 border-t border-border/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Subtotal:</span>
              <span className="text-sm font-medium">${(order.total_amount).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-foreground">${(order.total_amount).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Notifications Sent */}
        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-border/50 mb-8">
          <h2 className="text-xl font-semibold mb-4">Notifications Sent</h2>

          <div className="space-y-4 text-left">
            <p className="flex items-start space-x-3">
              <span className="flex h-3 w-3 items-center justify-center bg-success/20 text-success shrink-0">
                ✓
              </span>
              <span>Order confirmation email has been sent to {order.customer_email}</span>
            </p>
            <p className="flex items-start space-x-3">
              <span className="flex h-3 w-3 items-center justify-center bg-success/20 text-success shrink-0">
                ✓
              </span>
              <span>WhatsApp notification has been sent to {order.customer_phone}</span>
            </p>
            <p className="flex items-start space-x-3">
              <span className="flex h-3 w-3 items-center justify-center bg-success/20 text-success shrink-0">
                ✓
              </span>
              <span>Our team will contact you via WhatsApp to confirm delivery details</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4 justify-center">
          <Button
            onClick={() => {
              // In a real app, this would go to the user's order history
              router.push('/account/orders');
            }}
            variant="outline"
          >
            View Order History
          </Button>
          <Button
            onClick={() => router.push('/shop')}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}