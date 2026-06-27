import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'next/link';
import { Calendar, CheckCircle2, Trash2, UserPlus, MessageSquare, Upload } from 'lucide-react';
import { useState } from 'react';

export default function CustomRequestsPage() {
  const [customRequests] = useState([
    {
      id: 'req1',
      furnitureType: 'Dining Table',
      customerName: 'Younes Smith',
      date: '2026-06-20',
      budget: '15000-20000 MAD',
      status: 'reviewing',
      materials: ['Walnut', 'Brass'],
      description: 'Custom dining table for 8 people with live edge',
    },
    {
      id: 'req2',
      furnitureType: 'Bedroom Set',
      customerName: 'Fatima Zahra',
      date: '2026-06-18',
      budget: '25000-30000 MAD',
      status: 'quotation_sent',
      materials: ['Cedar', 'Linen'],
      description: 'Master bedroom set with wardrobe, bed, and nightstands',
    },
    {
      id: 'req3',
      furnitureType: 'Office Desk',
      customerName: 'Ahmed Hassan',
      date: '2026-06-15',
      budget: '8000-12000 MAD',
      status: 'accepted',
      materials: ['Oak', 'Steel'],
      description: 'Executive standing desk with cable management',
    },
    {
      id: 'req4',
      furnitureType: 'Outdoor Sofa',
      customerName: 'Leila Benali',
      date: '2026-06-10',
      budget: '12000-18000 MAD',
      status: 'in_production',
      materials: ['Teak', 'Sunbrella Fabric'],
      description: 'Weather-resistant outdoor sofa set',
    },
    {
      id: 'req5',
      furnitureType: 'Bookshelf',
      customerName: 'Karim Mansouri',
      date: '2026-06-05',
      budget: '5000-8000 MAD',
      status: 'completed',
      materials: ['Walnut', 'Glass'],
      description: 'Floor-to-ceiling library bookshelf with lighting',
    },
    {
      id: 'req6',
      furnitureType: 'Coffee Table',
      customerName: 'Sara Johnson',
      date: '2026-05-28',
      budget: '3000-5000 MAD',
      status: 'rejected',
      materials: ['Marble', 'Brass'],
      description: 'Modern marble coffee table with brass legs',
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredRequests = statusFilter === 'all'
    ? customRequests
    : customRequests.filter(req => req.status === statusFilter);

  // Group by status for Kanban view
  const groupedRequests = customRequests.reduce((acc, request) => {
    if (!acc[request.status]) {
      acc[request.status] = [];
    }
    acc[request.status].push(request);
    return acc;
  }, {});

  const statusOptions = [
    { label: 'All', value: 'all' },
    { label: 'Received', value: 'received' },
    { label: 'Reviewing', value: 'reviewing' },
    { label: 'Quotation Sent', value: 'quotation_sent' },
    { label: 'Negotiation', value: 'negotiation' },
    { label: 'Accepted', value: 'accepted' },
    { label: 'In Production', value: 'in_production' },
    { label: 'Completed', value: 'completed' },
    { label: 'Rejected', value: 'rejected' },
  ];

  const statusColors = {
    received: 'bg-primary/20 text-primary',
    reviewing: 'bg-info/20 text-info',
    quotation_sent: 'bg-warning/20 text-warning',
    negotiation: 'bg-yellow/20 text-yellow',
    accepted: 'bg-success/20 text-success',
    in_production: 'bg-accent/20 text-accent',
    completed: 'bg-success/20 text-success',
    rejected: 'bg-destructive/20 text-destructive',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold">Custom Requests</h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="select select-bordered w-48"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <Link href="/admin/custom-requests/new" className="btn btn-primary">
            New Request
          </Link>
        </div>
      </div>

      {/* Kanban View */}
      <div className="grid gap-4 grid-cols-[repeat(9,_minmax(0,1fr))]">
        {statusOptions.slice(1).map((status) => (
          <div key={status.value} className="col-span-1">
            <div className="border rounded-lg p-4 h-full">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium">
                  {status.label}
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    statusColors[status.value as keyof typeof statusColors]
                  }`}>
                    {(groupedRequests[status.value] || []).length}
                  </span>
                </h3>
              </div>
              <div className="space-y-3 min-h-[200px]">
                {(groupedRequests[status.value] || []).map((request) => (
                  <div
                    key={request.id}
                    className="p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-border/30 cursor-pointer hover:border-primary/20 transition-border"
                    onClick={() => setSelectedRequest(request)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                          {request.furnitureType.charAt(0)}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{request.furnitureType}</h4>
                          <time className="text-xs text-muted-foreground">
                            {new Date(request.date).toLocaleDateString()}
                          </time>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {request.customerName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {request.budget}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {request.materials.map((material, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 rounded-full text-xs bg-muted/20 text-muted-foreground"
                            >
                              {material}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {(groupedRequests[status.value] || []).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No requests in this stage
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Request Detail Drawer */}
        {selectedRequest && (
          <div className="fixed inset-0 z-50 flex items-end bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-2xl p-6 bg-background shadow-lg transform translate-y-0 transition-transform duration-300">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">Custom Request Details</h2>
                <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                  Close
                </Button>
              </div>
              <div className="grid gap-6">
                <div className="col-span-2">
                  <div className="space-y-4">
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-3">Request Information</h3>
                      <div className="grid gap-4">
                        <div>
                          <span className="text-sm font-medium">Request ID:</span>
                          <span className="text-sm text-muted-foreground">REQ-{selectedRequest.id}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Date Received:</span>
                          <span className="text-sm text-muted-foreground">{new Date(selectedRequest.date).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Customer:</span>
                          <span className="text-sm text-muted-foreground block">{selectedRequest.customerName}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Email:</span>
                          <span className="text-sm text-muted-foreground block">customer@example.com</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Phone:</span>
                          <span className="text-sm text-muted-foreground block">+212 6xx xxx xxx</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="space-y-4">
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-3">Request Details</h3>
                      <div className="space-y-4">
                        <div>
                          <span className="text-sm font-medium">Furniture Type:</span>
                          <span className="text-sm text-muted-foreground block">{selectedRequest.furnitureType}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Budget Range:</span>
                          <span className="text-sm text-muted-foreground block">{selectedRequest.budget}</span>
                        </div>
                        <div>
                          <span className="text-sm font-bold">Status:</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            statusColors[selectedRequest.status as keyof typeof statusColors]
                          }`}>
                            {selectedRequest.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Materials:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedRequest.materials.map((material, index) => (
                              <span
                                key={index}
                                className="px-2 py-0.5 rounded-full text-xs bg-primary/20 text-primary"
                              >
                                {material}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="space-y-4">
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-3">Description</h3>
                      <p className="text-muted-foreground">{selectedRequest.description}</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="space-y-4">
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-3">Actions</h3>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full">
                          <MessageSquare className="mr-2" /> Send Message
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Upload className="mr-2" /> Request Files
                        </Button>
                        {selectedRequest.status !== 'completed' && selectedRequest.status !== 'rejected' && (
                          <Button variant="outline" className="w-full">
                            <CheckCircle2 className="mr-2" /> Mark as Complete
                          </Button>
                        )}
                        {selectedRequest.status !== 'rejected' && (
                          <Button variant="destructive" className="w-full">
                            <Trash2 className="mr-2" /> Reject Request
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        )}
      </div>
    </div>
  );
}