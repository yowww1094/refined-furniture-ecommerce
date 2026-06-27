import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'next/link';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import { useState } from 'react';

export default function AdminCategoriesPage() {
  const [categories] = useState([
    {
      id: 'cat1',
      name: 'Living Room',
      description: 'Sofas, chairs, coffee tables, and entertainment units',
      productCount: 12,
      isActive: true,
    },
    {
      id: 'cat2',
      name: 'Bedroom',
      description: 'Beds, wardrobes, nightstands, and dressers',
      productCount: 8,
      isActive: true,
    },
    {
      id: 'cat3',
      name: 'Dining Room',
      description: 'Dining tables, chairs, buffets, and cabinets',
      productCount: 6,
      isActive: true,
    },
    {
      id: 'cat4',
      name: 'Office',
      description: 'Desks, chairs, bookshelves, and filing cabinets',
      productCount: 4,
      isActive: true,
    },
    {
      id: 'cat5',
      name: 'Outdoor',
      description: 'Patio furniture, garden sets, and outdoor decor',
      productCount: 3,
      isActive: false,
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(categories.map(category => category.id));
    } else {
      setSelectedIds([]);
 ][category.id]);
    } else {
      setSelectedIds(prev => [...prev, category.id]);
    }
  };

  const handleDeleteSelected = () => {
    // In a real app, this would call a server action
    setSelectedIds([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold">Categories</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setSelectedCategory('new')}>
            New Category
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
                  checked={selectedIds.length === categories.length && categories.length > 0}
                  indeterminate={selectedIds.length > 0 && selectedIds.length < categories.length}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </CheckboxGroup>
              <TableHead>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell className="min-w-[100px]">Products</TableCell>
                <TableCell className="min-w-[100px]">Status</TableCell>
                <TableCell className="min-w-[100px]">Actions</TableCell>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id} className="hover:bg-primary/5">
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(category.id)}
                    onCheckedChange={() => handleSelectRow(category.id)}
                    aria-label={`Select category ${category.name}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>{category.productCount}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    category.isActive ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                  }`}>
                    {category.isActive ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell className="flex items-center space-x-2">
                  <DropdownMenu align="end" sideOffset={4}>
                    <DropdownMenuTrigger className="p-1 hover:bg-muted rounded">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" sideAlignment="end">
                      <DropdownMenuItem onClick={() => setSelectedCategory(category)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => /* handleDeleteCategory(category.id) */ alert('Delete not implemented')}>
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

      {/* Category Form Drawer */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 space-y-6 bg-background shadow-lg transform translate-y-0 transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">
                {selectedCategory === 'new' ? 'New Category' : 'Edit Category'}
              </h2>
              <Button variant="outline" onClick={() => setSelectedCategory(null)}>
                Close
              </Button>
            </div>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              // Handle form submission
              setSelectedCategory(null);
            }}>
              <div className="space-y-2">
                <label htmlFor="category-name" className="text-sm font-medium mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  id="category-name"
                  defaultValue={selectedCategory === 'new' ? '' : categories.find(cat => cat.id === selectedCategory)?.name || ''}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="category-description" className="text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  id="category-description"
                  defaultValue={selectedCategory === 'new' ? '' : categories.find(cat => cat.id === selectedCategory)?.description || ''}
                  className="textarea textarea-bordered w-full min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="category-status" className="text-sm font-medium mb-1">
                  Status
                </label>
                <select
                  id="category-status"
                  defaultValue={selectedCategory === 'new' ? 'active' : categories.find(cat => cat.id === selectedCategory)?.isActive ? 'active' : 'inactive'}
                  className="select select-bordered w-full"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={() => setSelectedCategory(null)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {selectedCategory === 'new' ? 'Create Category' : 'Update Category'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}