import { createServerClient } from '@/lib/supabase/server';
import { ProductCard } from './ProductCard';

export default async function ProductGrid({ query }: { query: string | null }) {
  const supabase = await createServerClient();

  let products = [];

  if (query && query.trim() !== '') {
    const searchTerm = `%${query}%`;
    const { data, error } = await supabase
      .from('products')
      .select('id, name, slug, image_url, price, short_description, description')
      .or(`name.ilike${searchTerm},description.ilike${searchTerm},short_description.ilike${searchTerm}`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return <p className="text-center py-8">Error loading products.</p>;
    }

    products = data || [];
  } else {
    // If no query, show featured or recent products? For search page, we might show nothing or a message.
    // We'll show a message prompting to search.
    return <p className="text-center py-8">Enter a search term to see results.</p>;
  }

  if (products.length === 0) {
    return <p className="text-center py-8">No products found for "{query}".</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}