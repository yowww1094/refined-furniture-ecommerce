'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'newest', label: 'Newest' },
];

export function SortSelect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState<string>(searchParams.get('sort') || 'featured');

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
    router.push(`/shop?${params.toString()}`, { scroll: false });
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