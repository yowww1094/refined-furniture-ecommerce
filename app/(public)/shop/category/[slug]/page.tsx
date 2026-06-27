'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { ProductCard } from '@/components/shared/ProductCard';
import { FilterBar } from '@/components/shop/FilterBar';
import { SortSelect } from '@/components/shop/SortSelect';
import { Image } from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

interface CategoryParams {
  slug: string;
}

export default function CategoryPage({ params }: { params: CategoryParams }) {
  const { slug } = params;
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const page = parseInt(searchParams.get('page') || '1');
  const limit = 12;
  const offset = (page - 1) * limit;

  const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
  const sort = searchParams.get('sort') || 'featured';

  useEffect(() => {
    fetchProducts();
  }, [searchParams, slug]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Mock data - in real app, fetch from Supabase filtered by category slug
      const mockProducts: Product[] = Array.from({ length: 15 }, (_, i) => ({
        id: `${i + 1}-${slug}`,
        name: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Product ${i + 1}`,
        description: `This is a product in the ${slug} category.`,
        price: Math.floor(Math.random() * 200) + 50,
        image_url: `/product-${(i % 3) + 1}.jpg`,
      }));

      // Apply price filters
      let filtered = mockProducts;
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
          // Assume newer items have higher ID (based on mock)
          filtered.sort((a, b) => {
            const idA = parseInt(a.id.split('-')[0]);
            const idB = parseInt(b.id.split('-')[0]);
            return idB - idA;
          });
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
    router.push(`/shop/category/${slug}?${params.toString()}`, { scroll: false });
  };

  if (loading) return <div className="py-12">Loading...</div>;
  if (error) return <div className="py-12 text-destructive">{error}</div>;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Collection
          </h1>
          <p className="text-sm text-muted-foreground">
            {totalCount} products found
          </p>
        </div>

        <div className="grid gap-6 mb-8 sm:grid-cols-2">
          <div>
            {/* Modified FilterBar without category dropdown */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="min-price" className="mb-2 block text-sm font-medium text-foreground">
                  Min Price
                </label>
                <input
                  id="min-price"
                  type="number"
                  placeholder="Min"
                  value={minPrice || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    const params = new URLSearchParams(searchParams.toString());
                    if (value) {
                      params.set('minPrice', value);
                    } else {
                      params.delete('minPrice');
                    }
                    router.push(`/shop/category/${slug}?${params.toString()}`, { scroll: false });
                  }}
                  className="w-full px-3 py-2 border-border rounded-md bg-background hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="max-price" className="mb-2 block text-sm font-medium text-foreground">
                  Max Price
                </label>
                <input
                  id="max-price"
                  type="number"
                  placeholder="Max"
                  value={maxPrice || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    const params = new URLSearchParams(searchParams.toString());
                    if (value) {
                      params.set('maxPrice', value);
                    } else {
                      params.delete('maxPrice');
                    }
                    router.push(`/shop/category/${slug}?${params.toString()}`, { scroll: false });
                  }}
                  className="w-full px-3 py-2 border-border rounded-md bg-background hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          </div>
          <div className="flex items-end">
            <SelectSort />
          </div>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-muted-foreground">No products found in this category.</p>
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
                  slug: product.id,
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
                    : 'border-input bg-white hover:bg-muted'
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

// We'll create a simple SortSelect component for this page (could reuse the one from shop, but we'll make a small variant)
function SelectSort() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState<string>(searchParams.get('sort') || 'featured');

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
    { value: 'newest', label: 'Newest' },
  ];

  const handleChange = (value: string) => {
    setCurrentSort(value);
    setOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'featured') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }
    // Reset page when sort changes
    params.delete('page');
    router.push(`/shop/category/${slug}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-3 py-2 border-border rounded-md bg-background hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <span className="text-left flex-1">
          {sortOptions.find((opt) => opt.value === currentSort)?.label || 'Sort'}
        </span>
        <span className="ml-2 h-4 w-4">
          {open ? (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7-7-7 7" />
            </svg>
          )}
        </span>
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg mt-1 w-56">
          <ul className="py-1 text-sm text-foreground outline-none">
            {sortOptions.map((option) => (
              <li
                key={option.value}
                onMouseEnter={() => {}}
                onClick={() => {
                  setOpen(false);
                  handleChange(option.value);
                }}
                className={`cursor-pointer select-none px-2 py-1.5 hover:bg-accent/10 ${currentSort === option.value ? 'bg-accent/20' : ''}`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}