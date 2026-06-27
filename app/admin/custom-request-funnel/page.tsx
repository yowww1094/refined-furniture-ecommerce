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
  Shape,
  BarChart2,
  PieChart,
  Activity
} from 'lucide-react';
import {
  FunnelChart as RechartsFunnelChart,
  Funnel,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import { useState, useEffect } from 'react';

export default function CustomRequestFunnelAndMaterialUsage() {
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    to: new Date()
  });
  const [funnelData, setFunnelData] = useState([]);
  const [materialData, setMaterialData] = useState([]);
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

      // Mock funnel data - custom request conversion funnel
      const funnel = [
        { stage: 'Received', count: 45 },
        { stage: 'Reviewing', count: 38 },
        { stage: 'Quotation Sent', count: 32 },
        { stage: 'Negotiation', count: 25 },
        { stage: 'Accepted', count: 18 },
        { stage: 'In Production', count: 15 },
        { stage: 'Completed', count: 12 }
      ];

      // Mock material usage data
      const materials = [
        { name: 'Teak Wood', usage: 450, unit: 'kg' },
        { name: 'Cedar Wood', usage: 320, unit: 'kg' },
        { name: 'Marble', usage: 180, unit: 'sq ft' },
        { name: 'Brass', usage: 95, unit: 'kg' },
        { name: 'Ceramic', usage: 240, unit: 'units' },
        { name: 'Fabric', usage: 120, unit: 'meters' },
        { name: 'Leather', usage: 75, unit: 'sq ft' }
      ];

      setFunnelData(funnel);
      setMaterialData(materials);
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
      <div className="grid gap-6">
        <div className="col-span-2">
          <div className="h-96 w-full flex items-center justify-content">
            <div className="animate-spin rounded-full border-4 border-primary/20 border-t-primary h-16 w-16"></div>
            <span className="ml-4">Loading analytics data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Custom Request Funnel & Material Usage</h1>
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

      {/* Funnel Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader className="flex items-center justify-between pb-4">
            <div>
              <h2 className="text-lg font-semibold">Custom Request Funnel</h2>
              <p className="text-sm text-muted-foreground">
                Conversion rate from received to completed requests
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={funnelData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="flex items-center justify-between pb-4">
            <div>
              <h2 className="text-lg font-semibold">Material Usage</h2>
              <p className="text-sm text-muted-foreground">
                Consumption of raw materials over selected period
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={materialData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="usage" fill="#10b981" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Stat
          title="Conversion Rate"
          value="26.7%"
          trend={{ amount: 3.2, isPositive: true }}
          description="Percentage of requests that reach completion"
          icon={<Users className="h-5 w-5" />}
        />
        <Stat
          title="Avg. Processing Time"
          value="14 days"
          trend={{ amount: -2, isPositive: true }}
          description="Average time from request to completion"
          icon={<Activity className="h-5 w-5" />}
        />
        <Stat
          title="Most Used Material"
          value="Teak Wood"
          trend={{ amount: 12, isPositive: true }}
          description="Material with highest consumption"
          icon={<Shape className="h-5 w-5" />}
        />
        <Stat
          title="Total Requests"
          value="45"
          trend={{ amount: 8, isPositive: true }}
          description="Custom requests received in period"
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div>
    </div>
  );
}