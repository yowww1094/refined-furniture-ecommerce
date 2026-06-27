import Link from 'next/link';
import Image from 'next/image';
import { Heart, Eye } from 'lucide-react';
import { useWishlist } from '@/lib/wishlist';

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  description?: string;
  isOnSale?: boolean;
}

export function ProductCard({
  id,
  name,
  slug,
  image,
  price,
  compareAtPrice,
  description,
  isOnSale = false,
}: ProductCardProps) {
  const { toggleItem, isInWishlist } = useWishlist();
  const [hovered, setHovered] = useState(false);

  const salePrice = isOnSale && compareAtPrice ? (
    <div className="flex items-baseline space-x-2">
      <span className="line-through text-sm text-muted-foreground">${parseFloat(
        compareAtPrice.toString()
      ).toFixed(2)}</span>
      <span className="text-sm font-medium text-destructive">${price.toFixed(2)}</span>
    </div>
  ) : (
    <p className="mt-2 text-lg font-medium text-accent">${price.toFixed(2)}</p>
  );

  return (
    <Link href={`/product/${slug}`} className="group block">
      <div className="relative overflow-hidden rounded-lg border border-border bg-background shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="aspect-w-4 aspect-h-3 w-full">
          <Image
            src={image}
            alt={name}
            fill
            objectFit="cover"
            objectPosition="center"
            className="group-hover:scale-105 transition-transform duration-300"
          />
          {isOnSale && (
            <div className="absolute top-2 start-2 flex h-6 w-6 items-center justify-center rounded-sm bg-accent/90 text-accent-foreground text-xs font-medium ring-1 ring-offset-1 ring-offset-background/90">
              SALE
            </div>
          )}
          <div className="absolute bottom-2 start-2 flex h-6 w-6 items-center justify-center rounded-sm bg-accent/90 text-accent-foreground text-xs font-medium ring-1 ring-offset-1 ring-offset-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Eye className="h-4 w-4" aria-label="Quick view" />
          </div>
          <div className="absolute top-2 end-2 flex h-6 w-6 items-center justify-center rounded-sm bg-accent/90 text-accent-foreground text-xs font-medium ring-1 ring-offset-1 ring-offset-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => toggleItem(id)}
              className="p-1 rounded-hover"
              aria-label={isInWishlist(id) ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                className={`h-4 w-4 ${isInWishlist(id) ? 'text-destructive' : 'text-muted-foreground/60'}`}
              />
            </button>
          </div>
        </div>

        <div className="p-4 pt-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-2">{name}</h3>
          {description && (
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{description}</p>
          )}
          {salePrice}
        </div>
      </div>
    </Link>
  );
}