'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  defaultValue?: string;
}

export function SearchBar({ onSearch, defaultValue }: SearchBarProps) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(defaultValue ?? searchParams.get('q') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  // Update query when URL changes (e.g., back/forward navigation)
  useEffect(() => {
    const newQuery = searchParams.get('q') || '';
    setQuery(newQuery);
  }, [searchParams]);

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl">
      <Input
        placeholder="Search products, projects, and more..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 rounded-l-md"
      />
      <Button type="submit" className="rounded-r-md pl-6 pr-6">
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
    </form>
  );
}