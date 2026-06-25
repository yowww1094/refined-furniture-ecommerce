import { Image } from 'next/image';
import { Link } from '@/components/ui/link'; // Assuming we have a link component; if not, we'll use next/link directly
import { Card, CardContent, CardFooter, CardHeader, Title } from '@/components/ui/card'; // We need to check if we have these ui components

// Since we don't have a card component yet, we'll create a simple div-based card for now.
// We'll use the shadcn/ui card components if they exist; otherwise we'll create a simple one.

// Let's first check what ui components we have.
// We'll do a quick glob for card components.

// But for now, let's create a simple product card using divs and tailwind.
// We can refine later when we build the product card properly in P5.1.

export function ProductCard({ product }: { product: any }) {
  return (
    <Link href={`/product/${product.slug}`} passThrough>
      <a className="group block rounded-lg border border-border/50 bg-background hover:border-accent/50 transition-colors">
        <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-t-lg bg-background/50">
          {/* Image */}
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              objectFit="cover"
              className="group-hover:opacity-90 transition-opacity"
            />
          ) : (
            // Placeholder
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-xs text-muted-foreground">No Image</span>
            </div>
          )}
        </div>
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.short_description || product.description?.slice(0, 100)}</p>
          {product.price !== undefined && (
            <p className="mt-2 font-medium text-accent">${parseFloat(product.price).toFixed(2)}</p>
          )}
        </div>
      </a>
    </Link>
  );
}