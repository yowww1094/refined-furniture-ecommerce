import { Table from '@/components/ui/table';
  import { Button } from '@/components/ui/button';
  import { Pagination } from '@/components/ui/pagination';
  import { Checkbox } from '@/components/ui/checkbox';
  import { DropdownMenu } from '@/components/ui/dropdown-menu';
  import { ChevronDown, Trash2, Edit, Calendar, CheckCircle2, UserPlus, Hexagon, Mail, Settings } from 'lucide-react';
  import { useState } from 'react';

export default function AdminOrdersPage() {
  const [orders] = useState([
    {
      id: 'order1',
      orderNumber: '#1005',
      date: '2026-06-26',
      customer: 'Younes Smith',
      items: 2,
      total: 2450,
      status: 'delivered',
      payment: 'Cash on Delivery',
    },
    {
      id: 'order2',
      orderNumber: '#1004',
      date: '2026-06-25',
      customer: 'Fatima Zahra',
      items: 1,
      total: 1850,
      status: 'processing',
      payment: 'Cash on Delivery',
    },
    {
      id: 'order3',
      orderNumber: '#1003',
      date: '2026-06-24',
      customer: 'Ahmed Hassan',
      items: 3,
      total: 3200,
      status: 'pending',
      payment: 'Cash on Delivery',
    },
    {
      id: 'order4',
      orderNumber: '#1002',
      date: '2026-06-23',
      customer: 'Leila Benali',
      items: 1,
      total: 950,
      status: 'delivered',
      payment: 'Cash on Delivery',
    },
    {
      id: 'order5',
      orderNumber: '#1001',
      date: '2026-06-22',
      customer: 'Karim Mansouri',
      items: 2,
      total: 2750,
      status: 'shipped',
      payment: 'Cash on Delivery',
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(orders.length / rowsPerPage);

  const currentOrders = orders.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(currentOrders.map(order => order.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(pid => pid !== id)
        : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    // In a real app, this would call a server action
    setSelectedIds([]);
  };

  const statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'Processing', value: 'processing' },
    { label: 'Shipped', value: 'shipped' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Cancelled', value: 'cancelled' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold">Orders</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setSelectedOrder('new')}>
            New Order
          </Button>
          <Button onClick={handleDeleteSelected} variant="destructive" disabled={selectedIds.length === 0}>
            Delete Selected
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <CheckboxGroup>
                <Checkbox
                  checked={selectedIds.length === currentOrders.length && currentOrders.length > 0}
                  indeterminate={selectedIds.length > 0 && selectedIds.length < currentOrders.length}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </CheckboxGroup>
              <TableHead>
                <TableCell>Order #</TableCell>
                <TableCell className="min-w-[200px]">Customer</TableCell>
                <TableCell className="min-w-[120px]">Date</TableCell>
                <TableCell className="min-w-[100px]">Items</TableCell>
                <TableCell className="min-w-[100px]">Total</TableCell>
                <TableCell className="min-w-[100px]">Status</TableCell>
                <TableCell className="min-w-[100px]">Payment</TableCell>
                <TableCell className="min-w-[100px]">Actions</TableCell>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-primary/5">
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(order.id)}
                    onCheckedChange={() => handleSelectRow(order.id)}
                    aria-label={`Select order ${order.orderNumber}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{order.orderNumber}</TableCell>
                <TableCell className="flex items-center space-x-3">
                  <UserPlus className="h-4 w-4" />
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">Customer</p>
                  </div>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>{order.total} MAD</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'delivered'
                      ? 'bg-success/20 text-success'
                      : order.status === 'processing'
                      ? 'bg-warning/20 text-warning'
                      : order.status === 'pending'
                      ? 'bg-primary/20 text-primary'
                      : order.status === 'shipped'
                      ? 'bg-info/20 text-info'
                      : 'bg-destructive/20 text-destructive'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>{order.payment}</TableCell>
                <TableCell className="flex items-center space-x-2">
                  <DropdownMenu align="end" sideOffset={4}>
                    <DropdownMenuTrigger className="p-1 hover:bg-muted rounded">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" sideAlignment="end">
                      <DropdownMenuItem onClick={() => setSelectedOrder(order.id)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedOrder(order.id)}>
                        Edit Order
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => /* handleDeleteOrder(order.id) */ alert('Delete not implemented')}>
                        Delete Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {currentOrders.length} of {orders.length} orders
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>

      {/* Order Detail Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-background p-6 shadow-lg transform translate-y-0 transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">Order Details</h2>
              <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                Close
              </Button>
            </div>
            <div className="grid gap-6">
              <div className="col-span-2">
                <div className="space-y-4">
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-3">Order Information</h3>
                    <div className="grid gap-4">
                      <div>
                        <span className="text-sm font-medium">Order #:</span>
                        <span className="text-sm text-muted-foreground">#1005</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Date:</span>
                        <span className="text-sm text-muted-foreground">June 26, 2026</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Customer:</span>
                        <span className="text-sm text-muted-foreground">Younes Smith</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Email:</span>
                        <span className="text-sm text-muted-foreground">younes@example.com</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Phone:</span>
                        <span className="text-sm text-muted-foreground">+212 6xx xxx xxx</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="space-y-4">
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-3">Order Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Subtotal:</span>
                        <span className="text-sm font-medium">2,450 MAD</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Tax:</span>
                        <span className="text-sm text-muted-foreground">0 MAD</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Shipping:</span>
                        <span className="text-sm text-muted-foreground">0 MAD</span>
                      </div>
                      <div className="flex justify-between border-t pt-3">
                        <span className="text-lg font-medium">Total:</span>
                        <span className="text-lg font-medium">2,450 MAD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}