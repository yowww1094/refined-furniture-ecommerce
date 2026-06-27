'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface FilterProps {
  categories: Array<{ id: string; name: string; slug: string }>;
}

export function FilterBar({ categories }: FilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Initialize form values from URL
  useEffect(() => {
    const category = searchParams.get('category') || '';
    const min = searchParams.get('minPrice') || '';
    const max = searchParams.get('maxPrice') || '';
    setSelectedCategory(category);
    setMinPrice(min);
    setMaxPrice(max);
  }, [searchParams]);

  const handleUpdate = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedCategory) {
      params.set('category', selectedCategory);
    } else {
      params.delete('category');
    }

    if (minPrice) {
      params.set('minPrice', minPrice);
    } else {
      params.delete('minPrice');
    }

    if (maxPrice) {
      params.set('maxPrice', maxPrice);
    } else {
      params.delete('maxPrice');
    }

    // Reset page when filters change
    params.delete('page');

    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category-filter" className="mb-2 block text-sm font-medium text-foreground">
            Category
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              handleUpdate();
            }}
            className="w-full px-3 py-2 border-border rounded-md bg-background hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="min-price" className="mb-2 block text-sm font-medium text-foreground">
            Min Price
          </label>
          <input
            id="min-price"
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              handleUpdate();
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
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              handleUpdate();
            }}
            className="w-full px-3 py-2 border-border rounded-md bg-background hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-accent text-accent-foreground hover:bg-accent/90 rounded-md"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
}