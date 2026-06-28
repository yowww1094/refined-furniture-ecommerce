import { Card } from '@/components/ui/card';
import { Stat } from '@/components/card';
import { UserPlus } from 'lucide-react';
import { Clock } from 'lucide-react';
import { CreditCard } from 'lucide-react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'next/link';
import { useState, useEffect } from 'react';
import { generateMetadata } from '@/lib/utils/generate-metadata';
import { useRouter } from 'next/navigation';

export const metadata = generateMetadata({
  title: 'Account - Refined Furniture',
  description: 'Manage your profile, orders, and custom requests',
});

export default function AccountPage() {
  const router = useRouter();
  const locale = router.locale;

  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    // Mock recent activities data
    // In a real app, this would come from the database via Supabase
    const mockActivities = [
      {
        id: 'act1',
        type: 'order',
        title: 'Order #1001 placed',
        description: 'You ordered a Marrakech Sofa Set',
        date: '2026-06-20T10:30:00Z',
        icon: 'Clock',
        color: 'bg-primary/20 text-primary',
      },
      {
        id: 'act2',
        type: 'custom-request',
        title: 'Custom request submitted',
        description: 'You requested a custom dining table',
        date: '2026-06-18T15:45:00Z',
        icon: 'Upload',
        color: 'bg-success/20 text-success',
      },
      {
        id: 'act3',
        type: 'wishlist',
        title: 'Item added to wishlist',
        description: 'You added a Fes Coffee Table to your wishlist',
        date: '2026-06-17T09:15:00Z',
        icon: 'Heart',
        color: 'bg-warning/20 text-warning',
      },
      {
        id: 'act4',
        type: 'order',
        title: 'Order #1000 delivered',
        description: 'Your Chefchaouen Wardrobe has been delivered',
        date: '2026-06-15T14:20:00Z',
        icon: 'CheckCircle2',
        color: 'bg-success/20 text-success',
      },
      {
        id: 'act5',
        type: 'custom-request',
        title: 'Quotation sent',
        description: 'We sent you a quotation for your custom bookshelf',
        date: '2026-06-14T11:10:00Z',
        icon: 'MessageSquare',
        color: 'bg-primary/20 text-primary',
      },
    ];

    // Sort by date descending (newest first)
    const sortedActivities = mockActivities
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5); // Show only the 5 most recent

    setRecentActivities(sortedActivities);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          title="Profile Complete"
          value="85%"
          trend={{ amount: 5, isPositive: true }}
          description="Complete your profile to get personalized recommendations"
          icon={<UserPlus className="h-5 w-5" />}
          action={{
            href: '/account/profile',
            text: 'View Profile',
          }}
        />
        <Stat
          title="Active Orders"
          value="2"
          trend={{ amount: -1, isPositive: false }}
          description="Orders currently in process"
          icon={<Clock className="h-5 w-5" />}
          action={{
            href: '/account/orders',
            text: 'View All',
          }}
        />
        <Stat
          title="Pending Payments"
          value="$0"
          trend={{ amount: 0, isPositive: true }}
          description="Amount due (Cash on Delivery)"
          icon={<CreditCard className="h-5 w-5" />}
        />
        <Stat
          title="Message Replies"
          value="3"
          trend={{ amount: 2, isPositive: true }}
          description="Messages from our team awaiting your response"
          icon={<MessageSquare className="h-5 w-5" />}
          action={{
            href: '/account/notifications',
            text: 'View Messages',
          }}
        />
      </div>

      <div className="grid gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <h2 className="text-lg font-semibold">Welcome back!</h2>
            <p className="text-sm text-muted-foreground">
              Here's a quick overview of your account activity and next steps.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center bg-primary/20 rounded-lg">
                  <UserPlus className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Ready to start a new project?</h3>
                  <p className="text-sm text-muted-foreground">
                    Our expert craftsmen are ready to bring your vision to life.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link href="/custom-furniture/request" className="flex-1">
                  <Button variant="outline">
                    Start Custom Request
                  </Button>
                </Link>
                <Link href="/shop" className="flex-1">
                  <Button>
                    Browse Products
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </CardHeader>
          <CardContent>
            {recentActivities.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No recent activity</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-border/30">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 flex items-center justify-center rounded-full">{activity.color.split(' ')[0].replace('bg-', '').replace('/20', '')}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-font-semibold">{activity.title}</h3>
                        <time className="text-xs text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString()}
                        </time>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper component for stats
function Stat({
  title,
  value,
  trend,
  description,
  icon,
  action,
}: {
  title: string;
  value: string | number;
  trend?: {
    amount: number;
    isPositive: boolean;
  };
  description: string;
  icon: React.ReactNode;
  action?: {
    href: string;
    text: string;
  };
}) {
  return (
    <Card className="flex h-[80px] items-center gap-4 p-4">
      <div className="flex-shrink-0">
        <div className="h-10 w-10 items-center justify-center bg-primary/20 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="flex-1 space-y-1">
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-2xl font-semibold">{value}</p>
        {trend && (
          <p className="flex items-center text-xs gap-1">
            {trend.isPositive ? '↑' : '↓'}
            {Math.abs(trend.amount)}%
            <span className="ml-1">{trend.isPositive ? 'up' : 'down'} this month</span>
          </p>
        )}
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {action && (
        <div className="flex-shrink-0">
          <Link href={action.href} className="text-sm text-primary hover:underline">
            {action.text}
          </Link>
        </div>
      )}
    </Card>
  );
}