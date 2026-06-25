'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { SearchBar } from '@/components/search/SearchBar';
import { ProductGrid } from '@/components/search/ProductGrid';
import { generateMetadata } from '@/lib/utils/generate-metadata';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl font-bold text-foreground">
          Search
        </h1>
        <SearchBar onSearch={handleSearch} defaultValue={query} />
        <ProductGrid query={query} />
      </div>
    </section>
  );
}

export async function generateMetadata({ searchParams }: { searchParams: Record<string, string | string[]> }) {
  const query = Array.isArray(searchParams.q) ? searchParams.q[0] : searchParams.q ?? '';

  return generateMetadata({
    title: `Search Results - Refined Furniture`,
    description: `Search results for "${query}"`,
  });
}