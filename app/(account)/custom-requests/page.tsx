import { Card } from '@/components/ui/card';
import { Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { Clock } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import { X } from 'lucide-react';
import { User } from 'lucide-react';
import { SendHorizontal } from 'lucide-react';
import { Link } from 'next/link';
import { useState } from 'react';

// Mock data for demonstration - in a real app, this would come from the database
const mockCustomRequests = [
  {
    id: 'cr001',
    date: '2026-06-20',
    furnitureType: 'Dining Table',
    dimensions: '200 x 100 x 75 cm',
    materials: ['Walnut', 'Steel'],
    status: 'quotation_sent',
    statusLabel: 'Quotation Sent',
    statusVariant: 'default',
  },
  {
    id: 'cr002',
    date: '2026-06-15',
    furnitureType: 'Bookshelf',
    dimensions: '180 x 30 x 200 cm',
    materials: ['Oak', 'Glass'],
    status: 'in_production',
    statusLabel: 'In Production',
    statusVariant: 'warning',
  },
  {
    id: 'cr003',
    date: '2026-06-10',
    furnitureType: 'Armchair',
    dimensions: '90 x 90 x 100 cm',
    materials: ['Leather', 'Wood'],
    status: 'completed',
    statusLabel: 'Completed',
    statusVariant: 'success',
  },
  {
    id: 'cr004',
    date: '2026-06-05',
    furnitureType: 'Coffee Table',
    dimensions: '120 x 60 x 40 cm',
    materials: ['Marble', 'Brass'],
    status: 'received',
    statusLabel: 'Received',
    statusVariant: 'destructive',
  },
];

// Status badge component
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

export default function CustomRequestsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(mockCustomRequests.length / itemsPerPage);

  // Get current page items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = mockCustomRequests.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-2xl font-bold">Custom Requests</h1>
        <Link href="/custom-furniture/request" className="btn btn-outline btn-primary">
          + New Request
        </Link>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex-1 sm:max-w-xs">
          <input
            type="text"
            placeholder="Search requests..."
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="flex sm:flex-row flex-wrap gap-2">
          <select className="select select-bordered w-full sm:w-auto">
            <option value="all">All Statuses</option>
            <option value="received">Received</option>
            <option value="reviewing">Reviewing</option>
            <option value="quotation_sent">Quotation Sent</option>
            <option value="negotiation">Negotiation</option>
            <option value="accepted">Accepted</option>
            <option value="in_production">In Production</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
          <select className="select select-bordered w-full sm:w-auto">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>

      {/* Requests table */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Your Custom Requests</h2>
          <p className="text-sm text-muted-foreground">
            Track the progress of your custom furniture projects
          </p>
        </CardHeader>
        <CardContent>
          {currentItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">You haven't submitted any custom requests yet.</p>
              <Link href="/custom-furniture/request" className="btn btn-outline btn-primary mt-4">
                Create Your First Request
              </Link>
            </div>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th className="text-left">ID</th>
                  <th className="text-left">Date</th>
                  <th className="text-left">Item</th>
                  <th className="text-left">Details</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((request) => (
                  <tr key={request.id} className="hover:bg-muted">
                    <td className="whitespace-nowrap">
                      #{request.id}
                    </td>
                    <td className="whitespace-nowrap">
                      <Clock className="h-4 w-4 mr-2" />
                      {new Date(request.date).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 flex items-center justify-center bg-primary/20 rounded-full">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{request.furnitureType}</div>
                          <div className="text-xs text-muted-foreground">
                            {request.dimensions}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-xs font-medium">
                          Materials: {request.materials.join(', ')}
                        </div>
                      </div>
                    </td>
                    <td>
                      <StatusBorder
                        variant={request.statusVariant}
                        label={request.statusLabel}
                      />
                    </td>
                    <td className="whitespace-nowrap space-x-2">
                      <Link
                        href={`/account/custom-requests/${request.id}`}
                        className="btn btn-xs btn-outline"
                      >
                        View
                      </Link>
                      {request.status !== 'completed' && request.status !== 'rejected' && (
                        <button
                          className="btn btn-xs btn-outline btn-error"
                          onClick={() => {
                            // In a real app, this would call a delete/cancel function
                            if (window.confirm('Are you sure you want to cancel this request?')) {
                              alert('Request cancelled');
                            }
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            total={totalPages}
            page={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}