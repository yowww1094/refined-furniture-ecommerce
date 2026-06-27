import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, Package, Activity, Clock, Settings, Truck, MapPin, Trash2, Edit3 } from 'lucide-react';
import { useState } from 'react';

export default function LowStockPage() {
  const [lowStockItems] = useState([
    {
      id: 'low1',
      product: 'Marrakech Lamp',
      sku: 'MRK-LMP-001',
      category: 'Lighting',
      currentStock: 3,
      minLevel: 5,
      avgDailyUsage: 1.5,
      daysOfSupply: 2,
      lastRestocked: '2026-06-20',
      location: 'Warehouse A, Shelf B-12',
      supplier: 'Atlas Woodworks',
      nextExpected: '2026-06-28'
    },
    {
      id: 'low2',
      product: 'Fes Ceramic Vase',
      sku: 'FES-VAS-005',
      category: 'Decor',
      currentStock: 7,
      minLevel: 10,
      avgDailyUsage: 0.8,
      daysOfSupply: 4,
      lastRestocked: '2026-06-15',
      location: 'Warehouse B, Shelf C-07',
      supplier: 'Rabat Textile Co.',
      nextExpected: '2026-07-02'
    },
    {
      id: 'low3',
      product: 'Chefchaouen Rug',
      sku: 'CHE-RUG-012',
      category: 'Textiles',
      currentStock: 2,
      minLevel: 8,
      avgDailyUsage: 0.3,
      daysOfSupply: 1,
      lastRestocked: '2026-06-10',
      location: 'Warehouse A, Shelf A-03',
      supplier: 'Fes Metal Arts',
      nextExpected: '2026-06-30'
    },
    {
      id: 'low4',
      product: 'Tangerine Pouf',
      sku: 'TNG-PUF-007',
      category: 'Seating',
      currentStock: 1,
      minLevel: 4,
      avgDailyUsage: 0.5,
      daysOfSupply: 0,
      lastRestocked: '2026-06-05',
      location: 'Warehouse B, Shelf D-15',
      supplier: 'Atlas Woodworks',
      nextExpected: '2026-07-05'
    }
  ]);

  const [outOfStockItems] = useState([
    {
      id: 'out1',
      product: 'Meknes Mirror',
      sku: 'MEK-MIR-002',
      category: 'Decor',
      currentStock: 0,
      minLevel: 6,
      lastStocked: '2026-05-28',
      daysOut: 29,
      location: 'Warehouse B, Shelf E-08',
      supplier: 'Fes Metal Arts',
      nextExpected: '2026-07-10'
    },
    {
      id: 'out2',
      product: 'Azilal Cushion Set',
      sku: 'AZI-CSH-015',
      category: 'Textiles',
      currentStock: 0,
      minLevel: 12,
      lastStocked: '2026-06-01',
      daysOut: 25,
      location: 'Warehouse A, Shelf F-22',
      supplier: 'Rabat Textile Co.',
      nextExpected: '2026-07-03'
    }
  ]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [viewType, setViewType] = useState('low-stock'); // 'low-stock' or 'out-of-stock'

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(viewType === 'low-stock' ? lowStockItems.map(item => item.id) : outOfStockItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    // In a real app, this would mark items for deletion or archive them
    setSelectedItems([]);
  };

  const handleCreatePO = () => {
    // In a real app, this would navigate to create purchase order with selected items
    alert(`Creating purchase order for ${selectedItems.length} items`);
    setSelectedItems([]);
  };

  const getStatusColor = (days) => {
    if (days === 0) return 'destructive';
    if (days < 2) return 'warning';
    if (days < 7) return 'yellow';
    return 'success';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold">
            {viewType === 'low-stock' ? 'Low Stock Alerts' : 'Out of Stock Items'}
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewType('low-stock')}
              className={`${viewType === 'low-stock' ? 'bg-primary/20 text-primary' : ''}`}
            >
              Low Stock
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewType('out-of-stock')}
              className={`${viewType === 'out-of-stock' ? 'bg-primary/20 text-primary' : ''}`}
            >
              Out of Stock
            </Button>
          </div>
          <div className="flex items-center space-x-3">
            {selectedItems.length > 0 && (
              <Button variant="outline" onClick={handleCreatePO} disabled={selectedItems.length === 0}>
                Create PO ({selectedItems})
              </Button>
            )}
            <Button
              variant="outline"
              onClick={handleDeleteSelected}
              disabled={selectedItems.length === 0}
              className="text-destructive hover:bg-destructive/20"
            >
              Delete Selected
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <CheckboxGroup>
                <Checkbox
                  checked={selectedItems.length > 0 && selectedItems.length === (viewType === 'low-stock' ? lowStockItems.length : outOfStockItems.length)}
                  indeterminate={selectedItems.length > 0 && selectedItems.length < (viewType === 'low-stock' ? lowStockItems.length : outOfStockItems.length)}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </CheckboxGroup>
              <TableHead>
                <TableCell>Product</TableCell>
                <TableCell className="min-w-[200px]">SKU</TableCell>
                <TableCell>Category</TableCell>
                <TableCell className="min-w-[100px]">Stock Level</TableCell>
                <TableCell className="min-w-[100px]">Status</TableCell>
                <TableCell className="min-w-[100px]">Location</TableCell>
                <TableCell className="min-w-[100px]">Supplier</TableCell>
                <TableCell className="min-w-[100px]">Expected</TableCell>
                <TableCell className="min-w-[100px]">Actions</TableCell>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {viewType === 'low-stock' ? (
              lowStockItems.length === 0 ? (
                <TableRow>
                  <TableTableCell colSpan="9" className="py-8 text-center text-muted-foreground">
                    No low stock items found
                  </TableTableCell>
                </TableRow>
              ) : (
                lowStockItems.map(item => (
                  <TableRow key={item.id} className="hover:bg-primary/5">
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => handleSelectItem(item.id)}
                        aria-label={`Select item ${item.product}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-center font-medium">{item.currentStock}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        item.daysOfSupply === 0 ? 'bg-destructive/20 text-destructive' :
                        item.daysOfSupply < 2 ? 'bg-warning/20 text-warning' :
                        item.daysOfSupply < 7 ? 'bg-yellow/20 text-yellow' :
                        'bg-success/20 text-success'
                      }`}>
                        {item.daysOfSupply} days
                      </span>
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell className="text-sm">{item.nextExpected}</TableCell>
                    <TableCell className="flex items-center space-x-2 text-sm">
                      <Button variant="outline" size="sm" onClick={() => /* handleEditItem(item.id) */ alert('Edit not implemented')}>
                        <Edit3 className="h-3 w-3" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => /* handleCreatePOForItem(item.id) */ alert('Create PO not implemented')}>
                        <Truck className="h-3 w-3" /> PO
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            : (
              outOfStockItems.length === 0 ? (
                <TableRow>
                  <TableTableCell colSpan="9" className="py-8 text-center text-muted-foreground">
                    No out of stock items found
                  </TableTableCell>
                </TableRow>
              ) : (
                outOfStockItems.map(item => (
                  <TableRow key={item.id} className="hover:bg-primary/5">
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => handleSelectItem(item.id)}
                        aria-label={`Select item ${item.product}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="font-medium text-destructive">0</TableCell>
                    <TableCell>
                      <span className="px-2 py-0.5 rounded-full text-xs font-md bg-destructive/20 text-destructive">
                        OUT OF STOCK
                      </span>
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell className="text-sm">{item.nextExpected}</TableCell>
                    <TableCell className="flex items-center space-x-2 text-sm">
                      <Button variant="outline" size="sm" onClick={() => /* handleEditItem(item.id) */ alert('Edit not implemented')}>
                        <Edit3 className="h-3 w-3" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => /* handleCreatePOForItem(item.id) */ alert('Create PO not implemented')}>
                        <Truck className="h-3 w-3" /> PO
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            }
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {viewType === 'low-stock' ? lowStockItems.length : outOfStockItems.length} items
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

// Helper component for checkbox group
function CheckboxGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex h-4 w-4 items-center justify-center">
        {children}
      </div>
    </div>
  );
}