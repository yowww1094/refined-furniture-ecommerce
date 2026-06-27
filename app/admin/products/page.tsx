import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'next/link';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import { useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([
    {
      id: 'prod1',
      name: 'Marrakech Sofa Set',
      category: 'Sofas',
      price: 2450,
      stock: 12,
      status: 'active',
      image: '/placeholder-sofa.jpg',
    },
    {
      id: 'prod2',
      name: 'Chefchaouen Wardrobe',
      category: 'Wardrobes',
      price: 1850,
      stock: 7,
      status: 'active',
      image: '/placeholder-wardrobe.jpg',
    },
    {
      id: 'prod3',
      name: 'Fes Coffee Table',
      category: 'Tables',
      price: 1200,
      stock: 5,
      status: 'active',
      image: '/placeholder-coffee-table.jpg',
    },
    {
      id: 'prod4',
      name: 'Rabat Bookshelf',
      category: 'Storage',
      price: 950,
      stock: 0,
      status: 'out_of_stock',
      image: '/placeholder-bookshelf.jpg',
    },
    {
      id: 'prod5',
      name: 'Tangerine Rug',
      category: 'Rugs',
      price: 650,
      stock: 20,
      status: 'active',
      image: '/placeholder-rug.jpg',
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex items-center space-x-3">
          <Link href="/admin/products/create" className="btn btn-primary">
            <Plus className="mr-2" /> Add Product
          </Link>
          <input
            type="text"
            placeholder="Search products..."
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
                Image
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Stock
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
            {filteredProducts.length === 0 ? (
              <tr>
                <td colspan="7" className="py-8 text-center text-muted-foreground">
                  No products found matching your search.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-primary/5">
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-3">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-12 w-12 object-cover rounded"
                        />
                      ) : (
                        <div className="h-12 w-12 bg-muted flex items-center justify-center rounded">
                          <span className="text-xs text-muted-foreground">No Image</span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium">{product.name}</td>
                  <td className="px-4 py-4 text-sm">{product.category}</td>
                  <td className="px-4 py-4 text-sm font-mono">{product.price} MAD</td>
                  <td className="px-4 py-4 text-sm font-medium">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      product.stock === 0
                        ? 'bg-destructive/20 text-destructive'
                        : product.stock < 5
                        ? 'bg-warning/20 text-warning'
                        : 'bg-success/20 text-success'
                    }`}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      product.status === 'active'
                        ? 'bg-success/20 text-success'
                        : product.status === 'out_of_stock'
                        ? 'bg-destructive/20 text-destructive'
                        : product.status === 'discontinued'
                        ? 'bg-muted/20 text-muted'
                        : 'bg-warning/20 text-warning'
                    }`}>
                      {product.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm flex items-center space-x-3">
                    <Link href={`/admin/products/${product.id}/edit`} className="btn btn-outline btn-sm p-2">
                      <Edit3 className="h-4 w-4" /> Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
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
          Showing {filteredProducts.length} of {products.length} products
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

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-background p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">Product Details</h2>
              <Button variant="outline" onClick={() => setSelectedProduct(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-6">
              <div className="col-span-1">
                <div className="space-y-4">
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-3">Product Images</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProduct.image ? (
                        <img
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          className="h-64 w-full object-cover rounded"
                        />
                      ) : (
                        <div className="h-64 w-full bg-muted flex items-center justify-center rounded">
                          <span className="text-xs text-muted-foreground">No Image Available</span>
                        </div>
                      )}
                      <div className="flex flex-col items-center justify-center">
                        <button className="btn btn-outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </button>
                        <p className="text-xs text-muted-foreground mt-2">
                          Drag & drop or browse
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="space-y-4">
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-3">Product Information</h3>
                    <div className="space-y-4">
                      <div>
                        <span className="text-sm font-medium">Name:</span>
                        <span className="text-sm text-muted-foreground block">{selectedProduct.name}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Category:</span>
                        <span className="text-sm text-muted-foreground block">{selectedProduct.category}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Description:</span>
                        <p className="text-sm text-muted-foreground block">
                          Beautiful handcrafted furniture piece from Morocco.
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Price:</span>
                        <span className="text-lg font-mono block">{selectedProduct.price} MAD</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">SKU:</span>
                        <span className="text-sm text-muted-foreground block">MRK-{selectedProduct.id}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Weight:</span>
                        <span className="text-sm text-muted-foreground block">25 kg</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Dimensions:</span>
                        <span className="text-sm text-muted-foreground block">200 x 90 x 85 cm</span>
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