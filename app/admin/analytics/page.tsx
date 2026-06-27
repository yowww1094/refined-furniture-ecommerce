import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Stat } from '@/components/card';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  BarChart2,
  PieChart,
  Activity
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  Dot
} from 'recharts';
import { useState, useEffect } from 'react';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    to: new Date()
  });
  const [metrics, setMetrics] = useState({
    revenue: 0,
    orders: 0,
    customers: 0,
    conversionRate: 0
  });
  const [chartData, setChartData] = useState([]);
  const [topProductsData, setTopProductsData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch analytics data based on date range
    fetchAnalyticsData();
  }, [dateRange]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      // Simulate API call - in a real app, this would be a server action
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data based on date range
      const days = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (24 * 60 * 60 * 1000));
      const dailyData = [];

      let cumulativeRevenue = 0;
      let cumulativeOrders = 0;

      for (let i = 0; i <= days; i++) {
        const date = new Date(dateRange.from);
        date.setDate(date.getDate() + i);

        const dailyRevenue = Math.floor(Math.random() * 5000) + 1000;
        const dailyOrders = Math.floor(Math.random() * 20) + 5;
        const dailyCustomers = Math.floor(dailyOrders * 0.8);

        cumulativeRevenue += dailyRevenue;
        cumulativeOrders += dailyOrders;

        dailyData.push({
          date: date.toISOString().split('T')[0],
          revenue: dailyRevenue,
          orders: dailyOrders,
          customers: dailyCustomers
        });
      }

      // Mock top products data
      const topProducts = [
        { name: 'Marrakech Lamp', revenue: 24000, sales: 48 },
        { name: 'Fes Ceramic Vase', revenue: 18500, sales: 37 },
        { name: 'Chefchaouen Rug', revenue: 15000, sales: 25 },
        { name: 'Tangerine Pouf', revenue: 12000, sales: 30 },
        { name: 'Meknes Mirror', revenue: 9500, sales: 19 }
      ];

      // Mock city data
      const cities = [
        { name: 'Marrakech', revenue: 35000, orders: 72 },
        { name: 'Casablanca', revenue: 32000, orders: 68 },
        { name: 'Fes', revenue: 28000, orders: 59 },
        { name: 'Rabat', revenue: 22000, orders: 45 },
        { name: 'Tangier', revenue: 18000, orders: 38 }
      ];

      setChartData(dailyData);
      setTopProductsData(topProducts);
      setCityData(cities);
      setMetrics({
        revenue: cumulativeRevenue,
        orders: cumulativeOrders,
        customers: dailyData[days]?.customers || 0,
        conversionRate: (dailyData[days]?.customers || 0) > 0 ?
          Math.min(95, ((dailyData[days]?.orders || 0) / (dailyData[days]?.customers || 1)) * 100) : 0
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (range) => {
    setDateRange(range);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full border-4 border-primary/20 border-t-primary h-8 w-8"></div>
        <p className="mt-4">Loading analytics data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <div className="flex w-full max-w-4xl gap-4">
          <div className="flex-1">
            <Label htmlFor="date-range">Date Range</Label>
            <DatePicker
              mode="range"
              defaultValue={[dateRange.from, dateRange.to]}
              onChange={([from, to]) => {
                if (from && to) {
                  setDateRange({ from: from ?? dateRange.from, to: to ?? dateRange.to });
                }
              }}
              className="w-full"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-2">
            <Button variant="outline" onClick={() => {
              const today = new Date();
              const lastMonth = new Date(today);
              lastMonth.setMonth(today.getMonth() - 1);
              setDateRange({ from: lastMonth, to: today });
            }}>
              Last Month
            </Button>
            <Button variant="outline" onClick={() => {
              const today = new Date();
              const lastWeek = new Date(today);
              lastWeek.setDate(today.getDate() - 7);
              setDateRange({ from: lastWeek, to: today });
            }}>
              Last Week
            </Button>
            <Button variant="outline" onClick={() => {
              const today = new Date();
              const yesterday = new Date(today);
              yesterday.setDate(today.getDate() - 1);
              setDateRange({ from: yesterday, to: today });
            }}>
              Yesterday
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          title="Total Revenue"
          value={metrics.revenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          trend={{ amount: 12, isPositive: true }}
          description="Total sales during selected period"
          icon={<DollarSign className="h-5 w-5" />}
        />
        <Stat
          title="Orders"
          value={metrics.orders.toLocaleString()}
          trend={{ amount: 8, isPositive: true }}
          description="Number of completed orders"
          icon={<ShoppingCart className="h-5 w-5" />}
        />
        <Stat
          title="Customers"
          value={metrics.customers.toLocaleString()}
          trend={{ amount: 5, isPositive: true }}
          description="Unique customers who made purchases"
          icon={<Users className="h-5 w-5" />}
        />
        <Stat
          title="Conversion Rate"
          value={`${metrics.conversionRate.toFixed(1)}%`}
          trend={{ amount: 2, isPositive: true }}
          description="Percentage of visitors who completed a purchase"
          icon={<Users className="h-5 w-5" />%}}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between pb-4">
              <div>
                <h2 className="text-lg font-semibold">Revenue Trend</h2>
                <p className="text-sm text-muted-foreground">
                  Daily revenue over selected period
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => /* change chart type */ }
                  className="p-1 rounded hover:bg-muted"
                >
                  <Activity className="h-4 w-4" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={(value) => `€${value}`} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#6B4F3A" strokeWidth={2} >
                      <Dot type="dot" r={4} fill="#6B4F3A" />
                    </Line>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between pb-4">
              <div>
                <h2 className="text-lg font-semibold">Order Volume</h2>
                <p className="text-sm text-muted-foreground">
                  Daily order count over selected period
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Select
                  value="orders"
                  onValueChange={(value) => {/* handle change */ }}
                  className="w-[100px]"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="orders">Orders</SelectItem>
                    <SelectItem value="customers">Customers</SelectItem>
                    <SelectItem value="items">Items Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#68735B" barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between pb-4">
              <div>
                <h2 className="text-lg font-semibold">Top Products by Revenue</h2>
                <p className="text-sm text-muted-foreground">
                  Best selling products by revenue
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProductsData.map((product, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-border/30">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                        <span className="text-sm font-medium">#{index + 1}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{product.name}</h3>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-success/20 text-success">
                          €{product.revenue.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Sold {product.sales} units • {Math.round((product.revenue / 99000) * 100)}% of category sales
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between pb-4">
              <div>
                <h2 className="text-lg font-semibold">Sales by City</h2>
                <p className="text-sm text-muted-foreground">
                  Revenue distribution across cities
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={cityData}
                      dataKey="revenue"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      labelLine={false}
                      label={{
                        show: true,
                        formatter: (value, name) =>
                          `${(value / 135000 * 100).toFixed(1)}%`
                      }}
                    >
                      {cityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(var(--${['primary', 'secondary', 'accent', 'warning', 'success'][index % 5]})`)} />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}