'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProductCard } from '@/components/shared/ProductCard';
import { FilterBar } from '@/components/shop/FilterBar';
import { SortSelect } from '@/components/shop/SortSelect';
import { Image } from 'next/image';
import { generateMetadata } from '@/lib/utils/generate-metadata';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  // Add other fields as needed
}

export const metadata = {
  title: 'Shop - Refined Furniture',
  description: 'Browse our collection of handcrafted Moroccan furniture, from sofas and tables to beds and storage solutions.',
};

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const page = parseInt(searchParams.get('page') || '1');
  const limit = 12; // items per page
  const offset = (page - 1) * limit;

  const category = searchParams.get('category') || undefined;
  const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
  const sort = searchParams.get('sort') || 'featured';

  useEffect(() => {
    // Fetch products from API route or server action
    // For now, we'll mock the data since we don't have an API endpoint yet
    // In a real app, we would call a server action or API route
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Replace with actual Supabase query
      // For demonstration, we'll use mock data
      const mockProducts: Product[] = Array.from({ length: 20 }, (_, i) => ({
        id: `${i + 1}`,
        name: `Product ${i + 1}`,
        description: `This is a sample product description for product ${i + 1}.`,
        price: Math.floor(Math.random() * 100) + 10,
        image_url: `/product-${(i % 3) + 1}.jpg`,
      }));

      // Apply filters
      let filtered = mockProducts;
      if (category) {
        // In real app, filter by category ID
        // For mock, we'll just show all
      }
      if (minPrice !== undefined) {
        filtered = filtered.filter(p => p.price >= minPrice);
      }
      if (maxPrice !== undefined) {
        filtered = filtered.filter(p => p.price <= maxPrice);
      }

      // Apply sorting
      switch (sort) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'newest':
          // Assume newer items have higher ID
          filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
          break;
        default:
          // featured - no change
          break;
      }

      setTotalCount(filtered.length);

      // Paginate
      const paginated = filtered.slice(offset, offset + limit);
      setProducts(paginated);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  if (loading) return <div className="py-12">Loading...</div>;
  if (error) return <div className="py-12 text-destructive">{error}</div>;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Shop</h1>
          <p className="text-sm text-muted-foreground">
            {totalCount} products found
          </p>
        </div>

        <div className="grid gap-6 mb-8 sm:grid-cols-2">
          <div>
            <FilterBar />
          </div>
          <div className="flex items-end">
            <SortSelect />
          </div>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-muted-foreground">No products found matching your criteria.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  description: product.description,
                  price: `$${product.price.toFixed(2)}`,
                  image: product.image_url,
                  slug: product.id, // In real app, use actual slug
                }}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalCount > limit && (
          <div className="mt-8 flex justify-center">
            <nav className="inline-flex items-center space-x-1 rounded-md shadow-sm">
              <button
                onClick={() => {
                  const prevPage = Math.max(1, page - 1);
                  handlePageChange(prevPage);
                }}
                disabled={page === 1}
                className={`px-3 py-2 ml-0 ltr:rounded-l-r rtl:rounded-r-l disabled:opacity-50 ${
                  page === 1
                    ? 'bg-muted'
                    : 'border-input bg-white hover:bg-muted'
                }`}
              >
                <span className="sr-only">Previous</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="px-3 py-2 text-sm flex-1 text-center">
                Page {page} of {Math.ceil(totalCount / limit)}
              </span>
              <button
                onClick={() => {
                  const nextPage = Math.min(Math.ceil(totalCount / limit), page + 1);
                  handlePageChange(nextPage);
                }}
                disabled={page === Math.ceil(totalCount / limit)}
                className={`px-3 py-2 mr-0 ltr:rounded-r-l ltr:rounded-l-r disabled:opacity-50 ${
                  page === Math.ceil(totalCount / limit)
                    ? 'bg-muted'
                    : 'border-input bg-white hover:bg-md'
                }`}
              >
                <span className="sr-only">Next</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
}