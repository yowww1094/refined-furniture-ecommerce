import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'next/link';
import { Plus, Trash2, Edit3, Users, Folder, FileText } from 'lucide-react';
import { useState } from 'react';

export default function CustomersPage() {
  const [customers] = useState([
    {
      id: 'cust1',
      name: 'Younes Smith',
      email: 'younes@example.com',
      phone: '+212 6xx xxx xxx',
      address: 'Marrakech, Morocco',
      totalOrders: 5,
      totalSpent: 24500,
      lastOrder: '2026-06-20',
      status: 'active',
    },
    {
      id: 'cust2',
      name: 'Fatima Zahra',
      email: 'fatima@example.com',
      phone: '+212 6xx xxx xxx',
      address: 'Casablanca, Morocco',
      totalOrders: 3,
      totalSpent: 18500,
      lastOrder: '2026-06-18',
      status: 'active',
    },
    {
      id: 'cust3',
      name: 'Ahmed Hassan',
      email: 'ahmed@example.com',
      phone: '+212 6xx xxx xxx',
      address: 'Rabat, Morocco',
      totalOrders: 2,
      totalSpent: 12000,
      lastOrder: '2026-06-15',
      status: 'active',
    },
    {
      id: 'cust4',
      name: 'Leila Benali',
      email: 'leila@example.com',
      phone: '+212 6xx xxx xxx',
      address: 'Tangier, Morocco',
      totalOrders: 1,
      totalSpent: 9500,
      lastOrder: '2026-06-10',
      status: 'active',
    }
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteCustomer = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      // In a real app, this would call a server action
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customers</h1>
        <div className="flex items-center space-x-3">
          <Link href="/admin/customers/create" className="btn btn-primary">
            <Plus className="mr-2" /> Add Customer
          </Link>
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-64"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Contact
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Orders
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Spent
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Last Order
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colspan="8" className="py-8 text-center text-muted-foreground">
                  No customers found matching your search.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-primary/5">
                  <td className="px-4 py-4 flex items-center space-x-3">
                    <div>
                      <p className="font-medium">{customer.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">{customer.email}</p>
                    <p className="text-xs text-muted-foreground">{customer.phone}</p>
                  </td>
                  <td className="px-4 py-4 text-sm">{customer.address}</td>
                  <td className="px-4 py-4 text-sm font-medium">{customer.totalOrders}</td>
                  <td className="px-4 py-4 text-sm font-mono">{customer.totalSpent} MAD</td>
                  <td className="px-4 py-4 text-sm">{customer.lastOrder}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      customer.status === 'active'
                        ? 'bg-success/20 text-success'
                        : customer.status === 'inactive'
                        ? 'bg-muted/20 text-muted'
                        : 'bg-warning/20 text-warning'
                    }`}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm flex items-center space-x-3">
                    <Link href={`/admin/customers/${customer.id}`} className="btn btn-outline btn-sm p-2">
                      <Users className="h-4 w-4" /> Details
                    </Link>
                    <button
                      onClick={() => handleDeleteCustomer(customer.id)}
                      className="btn btn-outline btn-sm p-2 text-destructive hover:bg-destructive/20"
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {filteredCustomers.length} of {customers.length} customers
        </div>
        <div className="flex space-x-2">
          <button
            disabled={true}
            className="btn btn-outline btn-sm"
          >
            Previous
          </button>
          <button
            disabled={true}
            className="btn btn-outline btn-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}