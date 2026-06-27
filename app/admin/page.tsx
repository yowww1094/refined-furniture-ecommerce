import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Stat } from '@/components/card';
import { Button } from '@/components/ui/button';
import { Link } from 'next/link';
import { TrendingUp, Users, Box, FileText, Activity, Settings, PieChart, BarChart2, LayoutDashboard, Clock, Calendar, CheckCircle2, MessageSquare } from 'lucide-react';

export default function AdminDashboardPage() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '245,000 MAD',
      trend: { amount: 12, isPositive: true },
      description: 'This month vs last month',
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      title: 'Total Orders',
      value: '1,245',
      trend: { amount: 8, isPositive: true },
      description: 'Completed orders',
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: 'Inventory Value',
      value: '89,000 MAD',
      trend: { amount: -3, isPositive: false },
      description: 'Current stock value',
      icon: <Box className="h-5 w-5" />,
    },
    {
      title: 'Custom Requests',
      value: '63',
      trend: { amount: 15, isPositive: true },
      description: 'Pending review',
      icon: <FileText className="h-5 w-5" />,
    },
  ];

  // Mock chart data
  const revenueData = [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 19000 },
    { month: 'Mar', revenue: 15000 },
    { month: 'Apr', revenue: 22000 },
    { month: 'May', revenue: 25000 },
    { month: 'Jun', revenue: 24500 },
  ];

  const categoryData = [
    { name: 'Living Room', value: 35 },
    { name: 'Bedroom', value: 25 },
    { name: 'Dining', value: 20 },
    { name: 'Office', value: 12 },
    { name: 'Outdoor', value: 8 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Stat
            key={stat.title}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
            description={stat.description}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="grid gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between pb-4">
              <div>
                <h2 className="text-lg font-semibold">Revenue Trends</h2>
                <p className="text-sm text-muted-foreground">
                  Monthly performance overview
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => /* change chart period */ }
                  className="p-1 rounded hover:bg-muted"
                >
                  <Calendar className="h-4 w-4" />
                </button>
                <select className="select-sm border-none bg-transparent px-2 py-1">
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-60 w-full">
                {/* Enhanced Revenue Chart */}
                <div className="relative h-full w-full">
                  {/* Grid lines */}
                  <div className="absolute inset-0 grid grid-rows-5 grid-cols-6 gap-0.5">
                    {[...Array(5)].map((_, rowIndex) => (
                      <div key={`h-${rowIndex}`} className="col-span-6 border-b border-dashed border-muted/50" />
                    ))}
                    {[...Array(6)].map((_, colIndex) => (
                      <div key={`v-${colIndex}`} className="row-span-5 border-r border-dashed border-muted/50" />
                    ))}
                  </div>

                  {/* Area chart */}
                  <div className="absolute inset-0 pointer-events-none">
                    <svg className="absolute inset-0" width="100%" height="100%">
                      {/* Gradient definition */}
                      <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="{--primary}" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="{--primary}" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Area */}
                      <path
                        d="M0 180
                           C30 160 60 140 90 130
                           C120 120 150 110 180 120
                           C210 130 240 140 270 130
                           C300 120 330 110 360 100
                           C390 90 420 120 450 110
                           C480 100 510 90 540 80
                           C570 70 600 70 630 75
                           L630 200
                           L0 200 Z"
                        fill="url(#revenueGradient)"
                      />

                      {/* Line */}
                      <path
                        d="M0 180
                           C30 70 60 80 90 75
                           C120 70 150 65 180 75
                           C210 85 240 95 270 85
                           C300 75 330 65 360 55
                           C390 45 420 75 450 65
                           C480 55 510 45 540 35
                           C570 25 600 25 630 30"
                        stroke="{--primary}"
                        strokeWidth="2"
                        fill="none"
                      />

                      {/* Points */}
                      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480, 510, 540, 570, 600, 630].map((x, i) => (
                        <circle
                          key={i}
                          cx={x}
                          cy={[80, 70, 80, 75, 70, 65, 75, 85, 95, 85, 75, 65, 55, 45, 75, 65, 55, 35, 25, 25, 30][i] || 50}
                          r="3"
                          fill="{--primary}"
                        />
                      ))}
                    </svg>
                  </div>

                  {/* X-axis labels */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between p-2 pointer-events-none">
                    {revenueData.map((_, index) => (
                      <div key={index} className="text-xs text-muted-foreground">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}
                      </div>
                    ))}
                  </div>

                  {/* Y-axis labels */}
                  <div className="absolute top-0 left-0 flex flex-col h-full items-start p-2 pointer-events-none">
                    {[30, 60, 90, 120, 150, 180].map((value) => (
                      <div key={value} className="mb-2 text-xs text-muted-foreground">
                        {value}K
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chart stats */}
                <div className="mt-4 space-x-4 text-sm text-muted-foreground">
                  <span>▲ 12% from last month</span>
                  <span>● Target: 280K</span>
                  <span>○ Achievement: 88%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between pb-4">
              <div>
                <h2 className="text-lg font-semibold">Category Performance</h2>
                <p className="text-sm text-muted-foreground">
                  Sales distribution by category
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => /* change chart type */ }
                  className="p-1 rounded hover:bg-muted"
                >
                  <BarChart2 className="h-4 w-4" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-60 w-full flex items-center">
                {/* Pie Chart */}
                <div className="relative w-[200px] h-[200px] mx-auto">
                  {/* Pie chart segments */}
                  <div className="absolute inset-0">
                    {[0, 35, 60, 80, 92, 100].map((start, index) => {
                      const end = (index < 5) ? start + categoryData[index].value : 100;
                      const colorIndex = index;
                      const colors = ['--primary', '--secondary', '--accent', '--warning', '--success'];
                      const color = `var(${colors[colorIndex % colors.length]})`;

                      return (
                        <path
                          key={index}
                          d={`M 100 100
                               L 100 0
                               A 100 100 0 ${end > start + 50 ? 1 : 0} 1
                               ${100 + 1 +Math.cos(Math.PI * 2 * end/100)}
                               ${101 + 100 * +Math.sin(Math.PI * 2 * end/100)}
                               Z`}
                          fill={color}
                        />
                      );
                    })}
                  </div>

                  {/* Center circle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center border-2 border-border">
                      <div className="text-center">
                        <div className="text-xs font-bold">35%</div>
                        <div className="text-xs text-muted-foreground">Living Room</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="ml-6 space-y-2">
                  {categoryData.map((category, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <div className="w-3 h-3 rounded bg-primary/20 border border-primary/50"></div>
                      <span>{category.name}</span>
                      <span className="ml-auto font-medium">{category.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-2">
          <CardHeader className="flex items-center justify-between pb-4">
            <div>
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <p className="text-sm text-muted-foreground">
                Latest system events and transactions
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => /* toggle view */ }
                className="p-1 rounded hover:bg-muted"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-border/30">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-font-semibold">Order #1005 Completed</h3>
                    <time className="text-xs text-muted-foreground">
                      2 minutes ago
                    </time>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Marrakech Sofa Set delivered to customer in Marrakech
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-border/30">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-info/20 text-info">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-font-semibold">New Custom Request</h3>
                    <time className="text-xs text-muted-foreground">
                      15 minutes ago
                    </time>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Customer requesting dining table set with live edge
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-border/30">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-warning/20 text-warning">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-font-semibold">Inventory Alert</h3>
                    <time className="text-xs text-muted-foreground">
                      1 hour ago
                    </time>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Low stock alert: Fes Ceramic Vase (3 units left)
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-border/30">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-success/20 text-success">
                    <Users className="h-4 w-4" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-font-semibold">New Customer Registration</h3>
                    <time className="text-xs text-muted-foreground">
                      3 hours ago
                    </time>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Customer from Casablanca registered
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-border/30">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-destructive/20 text-destructive">
                    <Settings className="h-4 w-4" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-font-semibold">System Maintenance</h3>
                    <time className="text-xs text-muted-foreground">
                      5 hours ago
                    </time>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Scheduled maintenance completed successfully
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 text-right">
              <Link href="/admin/notifications" className="text-sm text-primary hover:underline">
                View All Activity →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}