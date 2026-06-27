import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'next/link';
import { Clock } from 'lucide-react';

export default function OrdersPage() {
  const mockOrders = [
    {
      id: 'order1',
      orderNumber: '#1001',
      date: '2026-06-20',
      status: 'delivered',
      total: 2450,
      items: [
        { name: 'Marrakech Sofa Set', quantity: 1, price: 2450 }
      ]
    },
    {
      id: 'order2',
      orderNumber: '#1000',
      date: '2026-06-15',
      status: 'delivered',
      total: 1850,
      items: [
        { name: 'Chefchaouen Wardrobe', quantity: 1, price: 1850 }
      ]
    },
    {
      id: 'order3',
      orderNumber: '#1002',
      date: '2026-06-25',
      status: 'processing',
      total: 3200,
      items: [
        { name: 'Fes Coffee Table', quantity: 1, price: 1200 },
        { name: 'Marrakech Lamp', quantity: 2, price: 1000 }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <Link href="/custom-furniture/request" className="btn btn-primary">
          Start New Order
        </Link>
      </div>

      <div className="space-y-4">
        {mockOrders.map(order => (
          <Card key={order.id} className="hover:shadow-md transition-shadow cursor-pointer hover:border-primary">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="font-semibold">{order.orderNumber}</h2>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  order.status === 'delivered'
                    ? 'bg-success/20 text-success'
                    : order.status === 'processing'
                    ? 'bg-warning/20 text-warning'
                    : order.status === 'pending'
                    ? 'bg-primary/20 text-primary'
                    : 'bg-destructive/20 text-destructive'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {order.items.map(item => (
                <div key={item.name} className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span>{item.quantity}×</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t">
              <div className="flex justify-between">
                <span className="font-medium">Total:</span>
                <span className="font-semibold">{order.total} MAD</span>
              </div>
              <Link href={`/account/orders/${order.id}`} className="mt-3 inline-block text-sm text-primary hover:underline">
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}