import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Stat } from '@/components/card';
import { Button } from '@/components/ui/button';
import { Link } from 'next/link';
import { Plus, Trash2, Edit3, Package, Activity, AlertTriangle, CheckCircle2, Banknote, Truck, Clock } from 'lucide-react';
import { useState } from 'react';

export default function InventoryOverviewPage() {
  const [inventoryStats] = useState({
    totalItems: 1245,
    totalValue: 89500,
    lowStockItems: 12,
    outOfStockItems: 3,
    pendingRestocks: 8,
    turnoverRate: 4.2
  });

  const [recentMovements] = useState([
    {
      id: 'mov1',
      product: 'Marrakech Lamp',
      sku: 'MRK-LMP-001',
      type: 'out',
      quantity: 5,
      reason: 'Sale #1005',
      date: '2026-06-26T10:30:00Z',
      reference: 'ORDER-1005'
    },
    {
      id: 'mov2',
      product: 'Fes Ceramic Vase',
      sku: 'FES-VAS-005',
      type: 'in',
      quantity: 20,
      reason: 'Restock from supplier',
      date: '2026-06-25T14:15:00Z',
      reference: 'PO-2026-087'
    },
    {
      id: 'mov3',
      product: 'Chefchaouen Rug',
      sku: 'CHE-RUG-012',
      type: 'out',
      quantity: 2,
      reason: 'Sale #1004',
      date: '2026-06-25T09:45:00Z',
      reference: 'ORDER-1004'
    },
    {
      id: 'mov4',
      product: 'Rabat Bookshelf',
      sku: 'RBA-BKH-003',
      type: 'adjustment',
      quantity: -1,
      reason: 'Damage adjustment',
      date: '2026-06-24T16:20:00Z',
      reference: 'ADJ-2026-045'
    }
  ]);

  const [lowStockItems] = useState([
    {
      id: 'low1',
      product: 'Marrakech Lamp',
      sku: 'MRK-LMP-001',
      currentStock: 3,
      minLevel: 5,
      lastRestocked: '2026-06-20',
      daysOfSupply: 2
    },
    {
      id: 'low2',
      product: 'Fes Ceramic Vase',
      sku: 'FES-VAS-005',
      currentStock: 7,
      minLevel: 10,
      lastRestocked: '2026-06-15',
      daysOfSupply: 4
    },
    {
      id: 'low3',
      product: 'Chefchaouen Rug',
      sku: 'CHE-RUG-012',
      currentStock: 2,
      minLevel: 8,
      lastRestocked: '2026-06-10',
      daysOfSupply: 1
    }
  ]);

  const [outOfStockItems] = useState([
    {
      id: 'out1',
      product: 'Tangerine Pouf',
      sku: 'TNG-PUF-007',
      lastStocked: '2026-06-05',
      daysOut: 3
    },
    {
      id: 'out2',
      product: 'Meknes Mirror',
      sku: 'MEK-MIR-002',
      lastStocked: '2026-05-28',
      daysOut: 10
    },
    {
      id: 'out3',
      product: 'Azilal Cushion Set',
      sku: 'AZI-CSH-015',
      lastStocked: '2026-06-01',
      daysOut: 6
    }
  ]);

  const [pendingRestocks] = useState([
    {
      id: 'po1',
      supplier: 'Atlas Woodworks',
      expectedDate: '2026-06-28',
      items: 15,
      value: 1200,
      status: 'pending'
    },
    {
      id: 'po2',
      supplier: 'Rabat Textile Co.',
      expectedDate: '2026-06-30',
      items: 25,
      value: 850,
      status: 'confirmed'
    },
    {
      id: 'po3',
      supplier: 'Fes Metal Arts',
      expectedDate: '2026-07-02',
      items: 10,
      value: 600,
      status: 'processing'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          title="Total SKUs"
          value={inventoryStats.totalItems.toLocaleString()}
          trend={{ amount: 5, isPositive: true }}
          description="Active products in catalog"
          icon={<Package className="h-5 w-5" />}
        />
        <Stat
          title="Inventory Value"
          value={inventoryStats.totalValue.toLocaleString()} + " MAD"
          trend={{ amount: 8, isPositive: true }}
          description="Total stock value"
          icon={<Banknote className="h-5 w-5" />}
        />
        <Stat
          title="Low Stock Items"
          value={inventoryStats.lowStockItems}
          trend={{ amount: -3, isPositive: false }}
          description="Below minimum threshold"
          icon={<AlertTriangle className="h-5 w-5" />}
        />
        <Stat
          title="Out of Stock"
          value={inventoryStats.outOfStockItems}
          trend={{ amount: -1, isPositive: false }}
          description="Zero inventory items"
          icon={<Trash2 className="h-5 w-5" />}
        />
      </div>

      <div className="grid gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between pb-4">
              <div>
                <h2 className="text-lg font-semibold">Inventory Turnover</h2>
                <p className="text-sm text-muted-foreground">
                  How quickly inventory is sold and replaced
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                {inventoryStats.turnoverRate} × / year
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-border/30">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                      <Activity className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-font-semibold">Stock Turnover Rate</h3>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-primary/20 text-primary">
                        {inventoryStats.turnoverRate}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Times inventory is sold and replaced per year
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-border/30">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-info/20 text-info">
                      <Clock className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-font-semibold">Days of Inventory</h3>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-info/20 text-info">
                        87 days
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Average days inventory is held before sale
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-border/30">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-success/20 text-success">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-font-semibold">Sell-Through Rate</h3>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-success/20 text-success">
                        68%
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Percentage of inventory sold vs. received
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between pb-4">
              <div>
                <h2 className="text-lg font-semibold">Inventory Health</h2>
                <p className="text-sm text-muted-foreground">
                  Overall stock status overview
                </p>
              </div>
              <div className="flex space-x-3">
                <div className="flex-1 bg-warning/20 text-warning rounded-lg p-3 text-center">
                  <div className="text-xs font-medium">Stock Accuracy</div>
                  <div className="font-medium">98.5%</div>
                </div>
                <div className="flex-1 bg-success/20 text-success rounded-lg p-3 text-center">
                  <div className="text-xs font-medium">Turnover Efficiency</div>
                  <div className="font-medium">Good</div>
                </div>
                <div className="flex-1 bg-info/20 text-info rounded-lg p-3 text-center">
                  <div className="text-xs font-medium">Carrying Cost</div>
                  <div className="font-medium">18% annually</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Inventory Valuation Methods</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">FIFO Value:</span>
                      <span className="text-sm font-mono">89,500 MAD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">LIFO Value:</span>
                      <span className="text-sm font-mono">87,200 MAD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Average Cost:</span>
                      <span className="text-sm font-mono">71.80 MAD</span>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Carrying Cost Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Storage:</span>
                      <span className="text-sm text-muted-foreground">8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Insurance:</span>
                      <span className="text-sm text-muted-foreground">2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Obsolescence:</span>
                      <span className="text-sm text-muted-foreground">5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Capital Cost:</span>
                      <span className="text-sm text-muted-foreground">3%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between pb-4">
              <div>
                <h2 className="text-lg font-semibold">Low Stock Alerts</h2>
                <p className="text-sm text-muted-foreground">
                  Items below minimum threshold
                </p>
              </div>
              <Link href="/admin/inventory/low-stock" className="text-sm text-primary hover:underline">
                View All →
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockItems.map(item => (
                  <div key={item.id} className="p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-border/30">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.product}</h4>
                        <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded bg-destructive/20 border border-destructive/50"></div>
                        <span className="text-xs font-medium text-destructive">
                          LOW STOCK
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Current Stock:</span>
                        <span>{item.currentStock} units</span>
                      </div>
                      <div>
                        <span className="font-medium">Minimum Level:</span>
                        <span>{item.minLevel} units</span>
                      </div>
                      <div>
                        <span className="font-medium">Last Restocked:</span>
                        <span>{item.lastRestocked}</span>
                      </div>
                      <div>
                        <span className="font-medium">Days of Supply:</span>
                        <span>{item.daysOfSupply} days</span>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <Button variant="outline" size="sm" onClick={() => /* handleRestock(item.id) */ alert('Restock not implemented')}>
                        Create PO
                      </Button>
                    </div>
                  </div>
                ))}
                {lowStockItems.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No low stock items
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between pb-4">
              <div>
                <h2 className="text-lg font-semibold">Out of Stock Items</h2>
                <p className="text-sm text-muted-foreground">
                  Items with zero inventory
                </p>
              </div>
              <Link href="/admin/inventory/out-of-stock" className="text-sm text-primary hover:underline">
                View All →
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {outOfStockItems.map(item => (
                  <div key={item.id} className="p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-border/30">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.product}</h4>
                        <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded bg-destructive border border-destructive/50"></div>
                        <span className="text-xs font-medium text-destructive">
                          OUT OF STOCK
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium">Last Stocked:</span>
                        <span className="text-muted-foreground">{item.lastStocked}</span>
                      </div>
                      <div>
                        <span className="font-medium">Days Out:</span>
                        <span className="text-muted-foreground">{item.daysOut} days</span>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <Button variant="outline" size="sm" onClick={() => /* handleRestock(item.id) */ alert('Restock not implemented')}>
                        Create PO
                      </Button>
                    </div>
                  </div>
                ))}
                {outOfStockItems.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No out of stock items
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between pb-4">
              <div>
                <h2 className="text-lg font-semibold">Pending Restocks</h2>
                <p className="text-sm text-muted-foreground">
                  Purchase orders awaiting delivery
                </p>
              </div>
              <Link href="/admin/inventory/purchase-orders" className="text-sm text-primary hover:underline">
                View All →
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingRestocks.map(po => (
                  <div key={po.id} className="p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-border/30">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium">{po.supplier}</h4>
                        <p className="text-xs text-muted-foreground">PO: #{po.id}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded ${getStatusColor(po.status)} border border-${getStatusColor(po.status)}/50"></div>
                        <span className="text-xs font-medium text-${getStatusColor(po.status)}">
                          {po.status.charAt(0).toUpperCase() + po.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Expected Delivery:</span>
                        <span className="text-muted-foreground">{po.expectedDate}</span>
                      </div>
                      <div>
                        <span className="font-medium">Items:</span>
                        <span>{po.items} units</span>
                      </div>
                      <div>
                        <span className="font-medium">Value:</span>
                        <span className="font-mono">{po.value} MAD</span>
                      </div>
                      <div>
                        <span className="font-medium">Status:</span>
                        <span className="text-${getStatusColor(po.status)}">{po.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {pendingRestocks.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No pending restocks
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-2">
          <CardHeader className="flex items-center justify-between pb-4">
            <div>
              <h2 className="text-lg font-semibold">Recent Inventory Movements</h2>
              <p className="text-sm text-muted-foreground">
                Latest stock adjustments and transactions
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => /* show filters */ }>
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMovements.map(movement => (
                <div key={movement.id} className="flex items-start space-x-3 p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-border/30">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 flex items-center justify-center rounded-full">
                      {getMovementIcon(movement.type)}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-font-semibold">{movement.product}</h3>
                        <p className="text-xs text-muted-foreground">SKU: {movement.sku}</p>
                      </div>
                      <time className="text-xs text-muted-foreground">
                        {new Date(movement.date).toLocaleString()}
                      </time>
                    </div>
                    <div className="flex justify-between space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Type:</span>
                        <span className="text-xs capitalize">{movement.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Quantity:</span>
                        <span className={`font-medium ${getMovementTypeColor(movement.type)}`}>
                          ${movement.type === 'in' ? '+' : ''}${movement.quantity}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Reason:</span>
                        <span className="text-xs text-muted-foreground max-w-[150px] truncate">
                          {movement.reason}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function getStatusColor(status) {
  switch (status) {
    case 'pending': return 'warning';
    case 'confirmed': return 'info';
    case 'processing': return 'primary';
    case 'delivered': return 'success';
    case 'cancelled': return 'destructive';
    default: return 'muted';
  }
}

function getMovementIcon(type) {
  switch (type) {
    case 'in': return <Package className="h-4 w-4 text-success" />;
    case 'out': return <Truck className="h-4 w-4 text-primary" />;
    case 'adjustment': return <AdjustmentsHorizontal className="h-4 w-4 text-warning" />;
    case 'return': return <RefreshCw className="h-4 w-4 text-info" />;
    default: return <HelpCircle className="h-4 w-4 text-muted" />;
  }
}

function getMovementTypeColor(type) {
  switch (type) {
    case 'in': return 'text-success';
    case 'out': return 'text-destructive';
    case 'adjustment': return 'text-warning';
    case 'return': return 'text-info';
    default: return 'text-muted';
  }
}