import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import { Clock } from 'lucide-react';
import { User } from 'lucide-react';
import { SendHorizontal } from 'lucide-react';
import { DollarSign } from 'lucide-react';
import { Folder } from 'lucide-react';
import { Image } from 'lucide-react';
import { Link } from 'next/link';
import { format } from 'date-fns';
import { Map } from 'lucide-react';
import { Redeem } from 'lucide-react';

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

// Mock data for a specific custom request
const mockCustomRequest = {
  id: 'cr001',
  createdAt: '2026-06-20',
  updatedAt: '2026-06-25',
  furnitureType: 'Dining Table',
  dimensions: {
    length: 200,
    width: 100,
    height: 75,
    unit: 'cm' as const
  },
  materials: ['Walnut', 'Steel'],
  budget: {
    min: 5000,
    max: 7000,
    currency: 'MAD' as const
  },
  description: 'A large dining table for 8 people with a live edge walnut top and powder-coated steel base. Should have a natural finish to showcase the wood grain.',
  pinterestUrls: [
    'https://pin.it/abc123',
    'https://pin.it/def456'
  ],
  status: 'quotation_sent',
  statusLabel: 'Quotation Sent',
  timeline: [
    {
      date: '2026-06-20',
      title: 'Request Received',
      description: 'Customer submitted custom request for dining table',
      icon: Received,
      color: 'hsl(var(--foreground))'
    },
    {
      date: '2026-06-22',
      title: 'Design Review',
      description: 'Our design team reviewed the requirements and created initial sketches',
      icon: Review,
      color: 'hsl(var(--primary))'
    },
    {
      date: '2026-06-24',
      title: 'Materials Selected',
      description: 'Customer selected walnut wood and steel for the base',
      icon: Materials,
      color: 'hsl(var(--secondary))'
    },
    {
      date: '2026-06-25',
      title: 'Quotation Sent',
      description: 'Detailed quotation sent to customer for review',
      icon: Quotation,
      color: 'hsl(var(--accent))'
    }
  ],
  quotation: {
    id: 'qt001',
    amount: 6500,
    currency: 'MAD',
    validUntil: '2026-07-25',
    items: [
      {
        description: 'Custom dining table - Walnut top with steel base',
        quantity: 1,
        unitPrice: 6500,
        total: 6500
      }
    ],
    notes: 'Price includes design, materials, craftsmanship, and delivery within Casablanca.'
  }
};

function StatusBadge({ variant, label }: { variant: string; label: string }) {
  const variants: Record<string, string> = {
    default: 'bg-primary/20 text-primary',
    success: 'bg-success/20 text-success',
    warning: 'bg-warning/20 text-warning',
    destructive: 'bg-destructive/20 text-destructive',
  };

  return (
    <span className={`px-2 py-1 text-xs rounded-full font-medium ${variants[variant] || variants.default}`}>
      {label}
    </span>
  );
}

// Timeline item component
function TimelineItem({ item }: { item: TimelineItem }) {
  return (
    <div className="flex items-start space-x-4 mb-6">
      <div className="flex-shrink-0 h-3 w-3 rounded-full bg-[var(--color)]/20">
        <div className="h-2.5 w-2.5 rounded-full bg-[var(--color)]"></div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-font-semibold">{item.title}</h3>
          <time className="text-xs text-muted-foreground">
            {new Date(item.date).toLocaleDateString()}
          </time>
        </div>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </div>
    </div>
  );
}

export default function CustomRequestDetail({ params }: { params: { id: string } }) {
  // In a real app, we would fetch the request from the database using params.id
  // For now, we'll use our mock data
  const request = mockCustomRequest;

  if (!request) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Request Not Found</h2>
        <p className="text-muted-foreground">The requested custom request could not be found.</p>
        <div className="mt-6 flex justify-center">
          <Link href="/account/custom-requests" className="btn btn-outline">
            Back to Requests
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-2xl font-bold">Custom Request #{request.id}</h1>
        <div className="flex space-x-2">
          <Link
            href="/account/custom-requests"
            className="btn btn-outline btn-sm"
          >
            Back to List
          </Link>
          {request.status === 'quotation_sent' && (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                // In a real app, this would open a payment/update status modal
                alert('In a full implementation, this would allow accepting the quotation');
              }}
            >
              Accept Quotation
            </button>
          )}
        </div>
      </div>

      {/* Status badge */}
      <div className="flex items-center space-x-3 mb-4">
        <StatusBadge
          variant={request.status === 'completed' ? 'success' :
                   request.status === 'rejected' ? 'destructive' :
                   request.status === 'in_production' ? 'warning' :
                   request.status === 'quotation_sent' ? 'default' : 'secondary'}
          label={request.statusLabel}
        </>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="quotation">Quotation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6">
            {/* Request summary cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 flex items-center justify-center bg-primary/20 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Request Date</p>
                    <p className="text-2xl font-semibold">
                      {format(new Date(request.createdAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 flex items-center justify-center bg-warning/20 rounded-lg">
                    <Truck className="h-5 w-5 text-warning" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Expected Delivery</p>
                    <p className="text-2xl font-semibold">
                      {/* In a real app, this would be calculated based on production time */}
                      {format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 flex items-center justify-center bg-success/20 rounded-lg">
                    <MapPin className="h-5 w-5 text-success" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Delivery Area</p>
                    <p className="text-2xl font-semibold">Casablanca Region</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 flex items-center justify-center bg-secondary/20 rounded-lg">
                    <ShieldCheck className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-negative">Guarantee</p>
                    <p className="text-2xl font-semibold">5 Years</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Project Description</h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{request.description}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="details">
          <div className="space-y-6">
            {/* Specifications */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Specifications</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium">Furniture Type</p>
                      <p className="text-lg font-semibold">{request.furnitureType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Dimensions</p>
                      <p className="text-lg font-semibold">
                        {request.dimensions.length} × {request.dimensions.width} × {request.dimensions.height} {request.dimensions.unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Primary Material</p>
                      <p className="text-lg font-semibold">{request.materials[0]}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Secondary Material</p>
                      <p className="text-lg font-semibold">
                        {request.materials.length > 1 ? request.materials[1] : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Budget Range</p>
                      <p className="text-lg font-semibold">
                        {request.budget.min} - {request.budget.max} {request.budget.currency}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Inspiration References</p>
                      <p className="text-lg font-semibold">
                        {request.pinterestUrls.length} Provided
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Materials detail */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Materials Selected</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {request.materials.map((material, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-border/30">
                      <div className="h-10 w-10 flex items-center justify-center bg-primary/20 rounded-full">
                        {/* Different icons for different material types would go here */}
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{material}</h3>
                        <p className="text-sm text-muted-foreground">
                          Selected for this project
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Project Timeline</h2>
            <div className="space-y-6">
              {request.timeline.map((item, index) => (
                <div key={index} className="relative pl-4">
                  {/* Timeline line */}
                  {/* <div className="absolute left-0 top-0 h-full w-px bg-muted" /> */}

                  {/* Timeline item */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-3 w-3 rounded-full bg-[var(--color)]/20">
                        <div className="h-2.5 w-2.5 rounded-full bg-[var(--color)]">
                          {/* Icon would go here */}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-font-semibold">{item.title}</h3>
                        <time className="text-xs text-muted-foreground">
                          {new Date(item.date).toLocaleDateString()}
                        </time>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>

                  {/* Connector line (except for last item) */}
                  {index < request.timeline.length - 1 && (
                    <div className="absolute left-0 top-12 h-[calc(100%-1.5rem)] w-px bg-muted/50" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="quotation">
          {request.quotation && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Quotation Details</h2>

              {/* Quotation info */}
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">Quotation #{request.quotation.id}</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium">Date Issued</p>
                        <p className="text-lg font-semibold">
                          {format(new Date(request.createdAt), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Valid Until</p>
                        <p className="text-lg font-semibold">
                          {format(new Date(request.quotation.validUntil), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Status</p>
                        <p className="text-lg font-semibold">
                          <StatusBadge
                            variant="default"
                            label="Pending Acceptance"
                          />
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-md">Currency</p>
                        <p className="text-lg font-semibold">{request.quotation.currency}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Line items */}
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">Items</h2>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th className="text-left">Description</th>
                          <th className="text-center">Quantity</th>
                          <th className="text-right">Unit Price</th>
                          <th className="text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {request.quotation.items.map((item, index) => (
                          <tr key={index} className="hover:bg-muted">
                            <td className="whitespace-nowrap">
                              <div className="flex items-center space-x-3">
                                <div className="h-8 w-8 flex items-center justify-center bg-primary/20 rounded-full">
                                  <Box className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium">{item.description}</div>
                                  <p className="text-xs text-muted-foreground">
                                    Custom crafted to specifications
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap text-center">{item.quantity}</td>
                            <td className="whitespace-nowrap text-right">
                              {formatCurrency(item.unitPrice, request.quotation.currency)}
                            </td>
                            <td className="whitespace-nowrap text-right font-semibold">
                              {formatCurrency(item.total, request.quotation.currency)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td className="text-right font-semibold" colSpan="3">
                            Total:
                          </td>
                          <td className="whitespace-nowrap text-right font-semibold text-lg">
                            {formatCurrency(request.quotation.amount, request.quotation.currency)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Notes and actions */}
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">Notes & Next Steps</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-warning/20 p-4 rounded-lg border border-warning/30">
                      <h3 className="font-medium mb-2">Important Notes</h3>
                      <p className="text-sm">{request.quotation.notes}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        className="btn btn-warning w-full sm:w-auto"
                        onClick={() => {
                          // Request revision
                          alert('In a full implementation, this would open a revision request form');
                        }}
                      >
                        Request Revisions
                      </button>
                      <button
                        className="btn btn-primary w-full sm:w-auto"
                        onClick={() => {
                          // Accept quotation
                          alert('In a full implementation, this would update the request status to accepted');
                        }}
                      >
                        Accept Quotation
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper function to format currency
function formatCurrency(amount: number, currency: string): string {
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency === 'MAD' ? 'MAD' : currency === 'USD' ? 'USD' : 'EUR',
  });
  return formatter.format(amount);
}

// Icon components (simplified for this example)
function Calendar() {
  return <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
}

function Truck() {
  return <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19h6a2 2 0 002-2V9a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
}

function MapPin() {
  return <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 3.5a1 1 0 011.418-.418l3.293 3.293a1 1 0 001.418 1.418l-1.414 1.414a3 3 0 01-4.242 0l-1.414-1.414A3 3 0 016 8V5a2 2 0 114 0v3z" /></svg>
}

function ShieldCheck() {
  return <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.5 21.5h9a2.25 2.25 0 002.25-2.25v-6.364c0-.621.25-1.213.674-1.641l1.44-1.775a1.125 1.125 0 011.777-.63h6.525A2.25 2.25 0 0022 9.75V7.5a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002 5.25v13.5A2.25 2.25 0 004.5 21.5z" /></svg>
}

function Package() {
  return <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h10M7 16h10M12 8V7a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2h5a2 2 0 002-2v-1.586l-.293-.293a1 1 0 00-1.414 0l-.293-.293V8z" /></svg>
}

function Box() {
  return <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
}

function Image() {
  return <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
}

function Received() {
  return <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m2 0a2 2 0 100-4 2 2 0 000 4zm-6 0a2 2 0 100-4 2 2 0 000 4zm6 8a2 2 0 100-4 2 2 0 000 4z" /></svg>
}

function Review() {
  return <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 11l3 3m0 0l3-3m-3 3V9m-3 6h.01M9 12h6"/></svg>
}

function Materials() {
  return <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3"></svg>
}

function Quotation() {
  return <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m2 0a2 2 0 100-4 2 2 0 000 4zm-6 0a2 2 0 100-4 2 2 0 000 4zm6 8a2 2 0 100-4 2 2 0 000 4z" /></svg>
}