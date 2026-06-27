import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'next/link';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import { useState } from 'react';

export default function AdminMaterialsPage() {
  const [materials] = useState([
    {
      id: 'mat1',
      name: 'Olive Wood',
      type: 'Wood',
      description: 'Beautiful olive wood with distinctive grain patterns',
      stock: 45,
      unit: 'm²',
      price: 120,
      isActive: true,
    },
    {
      id: 'mat2',
      name: 'Cedar Wood',
      type: 'Wood',
      description: 'Aromatic cedar wood, naturally resistant to insects',
      stock: 32,
      unit: 'm²',
      price: 95,
      isActive: true,
    },
    {
      id: 'mat3',
      name: 'Leather',
      type: 'Fabric',
      description: 'Full-grain leather in various colors',
      stock: 28,
      unit: 'm²',
      price: 85,
      isActive: true,
    },
    {
      id: 'mat4',
      name: 'Cotton Fabric',
      type: 'Fabric',
      description: 'Premium cotton upholstery fabric',
      stock: 67,
      unit: 'm²',
      price: 25,
      isActive: true,
    },
    {
      id: 'mat5',
      name: 'Brass Hardware',
      type: 'Metal',
      description: 'Decorative brass handles, hinges, and accents',
      stock: 150,
      unit: 'pcs',
      price: 12,
      isActive: true,
    },
  ]);

  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(materials.map(material => material.id));
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
          <h1 className="text-2xl font-bold">Materials</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setSelectedMaterial('new')}>
            New Material
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
                  checked={selectedIds.length === materials.length && materials.length > 0}
                  indeterminate={selectedIds.length > 0 && selectedIds.length < materials.length}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </CheckboxGroup>
              <TableHead>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell className="min-w-[100px]">Stock</TableCell>
                <TableCell className="min-w-[100px]">Price</TableCell>
                <TableCell className="min-w-[100px]">Status</TableCell>
                <TableCell className="min-w-[100px]">Actions</TableCell>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.id} className="hover:bg-primary/5">
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(material.id)}
                    onCheckedChange={() => handleSelectRow(material.id)}
                    aria-label={`Select material ${material.name}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{material.name}</TableCell>
                <TableCell>{material.type}</TableCell>
                <TableCell>{material.description}</TableCell>
                <TableCell>
                  {material.stock} {material.unit}
                </TableCell>
                <TableCell>{material.price} MAD/{material.unit}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    material.isActive ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                  }`}>
                    {material.isActive ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell className="flex items-center space-x-2">
                  <DropdownMenu align="end" sideOffset={4}>
                    <DropdownMenuTrigger className="p-1 hover:bg-muted rounded">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" sideAlignment="end">
                      <DropdownMenuItem onClick={() => setSelectedMaterial(material)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => /* handleDeleteMaterial(material.id) */ alert('Delete not implemented')}>
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