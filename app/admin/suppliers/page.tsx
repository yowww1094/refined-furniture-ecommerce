import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'next/link';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import { useState } from 'react';

export default function AdminSuppliersPage() {
  const [suppliers] = useState([
    {
      id: 'supp1',
      name: 'Atlas Woodworks',
      contact: 'Yussef ben Ali',
      email: 'contact@atlaswood.ma',
      phone: '+212 5xx xxx xxx',
      address: 'Marrakech, Morocco',
      materials: ['Olive Wood', 'Cedar Wood', 'Walnut'],
      rating: 4.8,
      isActive: true,
    },
    {
      id: 'supp2',
      name: 'Rabat Textile Co.',
      contact: 'Fatima Zahra',
      email: 'info@rabattextile.ma',
      phone: '+212 5xx xxx xxx',
      address: 'Rabat, Morocco',
      materials: ['Cotton Fabric', 'Linen', 'Wool'],
      rating: 4.5,
      isActive: true,
    },
    {
      id: 'supp3',
      name: 'Fes Metal Arts',
      contact: 'Ahmed Hassan',
      email: 'sales@fesmetal.ma',
      phone: '+212 5xx xxx xxx',
      address: 'Fes, Morocco',
      materials: ['Brass', 'Copper', 'Wrought Iron'],
      rating: 4.6,
      isActive: true,
    },
    {
      id: 'supp4',
      name: 'Coastal Supplies',
      contact: 'Leila Benali',
      email: 'orders@coastalsup.ma',
      phone: '+212 5xx xxx xxx',
      address: 'Tangier, Morocco',
      materials: ['Various'],
      rating: 4.2,
      isActive: false,
    },
  ]);

  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(suppliers.map(supplier => supplier.id));
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold">Suppliers</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setSelectedSupplier('new')}>
            New Supplier
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
                  checked={selectedIds.length === suppliers.length && suppliers.length > 0}
                  indeterminate={selectedIds.length > 0 && selectedIds.length < suppliers.length}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </CheckboxGroup>
              <TableHead>
                <TableCell>Name</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell className="min-w-[100px]">Materials</TableCell>
                <TableCell className="min-w-[100px]">Rating</TableCell>
                <TableCell className="min-w-[100px]">Status</TableCell>
                <TableCell className="min-w-[100px]">Actions</TableCell>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id} className="hover:bg-primary/5">
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(supplier.id)}
                    onCheckedChange={() => handleSelectRow(supplier.id)}
                    aria-label={`Select supplier ${supplier.name}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{supplier.name}</TableCell>
                <TableCell>{supplier.contact}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.phone}</TableCell>
                <TableCell>{supplier.address}</TableCell>
                <TableCell>
                  {supplier.materials.map((material, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-muted/20 text-muted-foreground mr-1 mb-1">
                      {material}
                    </span>
                  ))}
                </TableCell>
                <TableCell>
                  {supplier.rating}/5.0
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    supplier.isActive ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                  }`}>
                    {supplier.isActive ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell className="flex items-center space-x-2">
                  <DropdownMenu align="end" sideOffset={4}>
                    <DropdownMenuTrigger className="p-1 hover:bg-muted rounded">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" sideAlignment="end">
                      <DropdownMenuItem onClick={() => setSelectedSupplier(supplier)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => /* handleDeleteSupplier(supplier.id) */ alert('Delete not implemented')}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}