import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'next/link';
import { MessageSquare, Bell, CheckCircle2, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock notifications data - in a real app, this would come from Supabase
    const mockNotifications = [
      {
        id: 'notif1',
        type: 'order',
        title: 'Order #1001 delivered',
        description: 'Your Marrakech Sofa Set has been delivered to 123 Rue de la Kasbah',
        date: '2026-06-26T10:30:00Z',
        read: false,
        icon: 'CheckCircle2',
        color: 'bg-success/20 text-success',
        action: {
          href: '/account/orders/order1',
          text: 'View Order'
        }
      },
      {
        id: 'notif2',
        type: 'custom-request',
        title: 'Quotation sent for custom dining table',
        description: 'We sent you a quotation for your custom dining table request',
        date: '2026-06-25T15:45:00Z',
        read: true,
        icon: 'MessageSquare',
        color: 'bg-primary/20 text-primary',
        action: {
          href: '/account/custom-requests/req1',
          text: 'View Request'
        }
      },
      {
        id: 'notif3',
        type: 'promotion',
        title: 'Summer sale starts tomorrow',
        description: 'Get up to 30% off on selected items',
        date: '2026-06-24T09:15:00Z',
        read: false,
        icon: 'Bell',
        color: 'bg-warning/20 text-warning',
        action: {
          href: '/shop',
          text: 'Shop Sale'
        }
      },
      {
        id: 'notif4',
        type: 'system',
        title: 'Account security update',
        description: 'We detected a login from a new device and secured your account',
        date: '2026-06-23T16:20:00Z',
        read: true,
        icon: 'Bell',
        color: 'bg-info/20 text-info',
        action: {
          href: '/account/profile',
          text: 'Review Security'
        }
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
    setIsLoading(false);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setUncountCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    setUnreadCount(0);
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full border-4 border-primary/20 border-t-primary h-8 w-8"></div>
        <p className="mt-4">Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="flex items-center space-x-3">
          {unreadCount > 0 && (
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white text-xs">
              {unreadCount}
            </span>
          )}
          <Button onClick={markAllAsRead} variant="outline" size="sm" disabled={unreadCount === 0}>
            Mark All as Read
          </Button>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">You have no notifications</p>
          <Link href="/shop" className="mt-4 btn btn-primary">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`flex items-start space-x-3 p-4 border rounded-lg ${
                !notification.read ? 'border-primary/20 bg-primary/5' : 'border-border/30 bg-white/50'
              }`}
            >
              <div className="flex-shrink-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-full">{notification.color.split(' ')[0].replace('bg-', '').replace('/20', '')}</div>
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-font-semibold">{notification.title}</h3>
                  <time className="text-xs text-muted-foreground">
                    {new Date(notification.date).toLocaleString()}
                  </time>
                </div>
                <p className="text-sm text-muted-foreground">{notification.description}</p>
                {notification.action && (
                  <div className="mt-2">
                    <Link href={notification.action.href} className="text-sm text-primary hover:underline">
                      {notification.action.text}
                    </Link>
                  </div>
                )}
                {!notification.read && (
                  <div className="mt-2">
                    <Button
                      onClick={() => markAsRead(notification.id)}
                      variant="outline"
                      size="sm"
                      className="mr-2"
                    >
                      Mark as Read
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}