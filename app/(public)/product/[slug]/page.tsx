import { notFound } from 'next/navigation';
import { Image } from 'next/image';
import { ProductGallery } from '@/components/shared/ProductGallery';
import { ProductCard } from '@/components/shared/ProductCard';
import { ProductCTA } from '@/components/shared/ProductCTA';
import { generateMetadata } from '@/lib/utils/generate-metadata';
import { breadcrumbSchema } from '@/lib/utils/structured-data';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  // Additional fields for product details
  specifications?: string; // JSON string or text
  dimensions?: { length: number; width: number; height: number }; // in cm
  materials?: string[]; // array of material names
  // We'll add more as needed
}

interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // TODO: Fetch product from database by slug
  // For now, mock data
  const product: Product | null = {
    id: '1',
    name: 'Marrakech Sofa',
    description: 'Hand-carved wooden sofa with plush cushions, featuring intricate geometric patterns and premium fabric upholstery.',
    price: 2400,
    image_url: '/product-1.jpg',
    specifications: 'Hand-carved walnut frame, plush cushions, durable fabric upholstery.',
    dimensions: { length: 200, width: 90, height: 85 },
    materials: ['Walnut Wood', 'Cotton Fabric', 'Foam Padding'],
  };

  if (!product) {
    notFound();
  }

  // Mock related products (in real app, fetch based on category or tags)
  const relatedProducts: RelatedProduct[] = [
    {
      id: '2',
      name: 'Fes Coffee Table',
      price: 850,
      image_url: '/product-2.jpg',
    },
    {
      id: '3',
      name: 'Chefchaouen Wardrobe',
      price: 3200,
      image_url: '/product-3.jpg',
    },
    {
      id: '4',
      name: 'Marrakech Lamps',
      price: 150,
      image_url: '/product-4.jpg',
    },
  ];

  // Convert product to the format expected by ProductGallery
  // We'll assume we have multiple images; for now, we'll use the main image and some placeholders
  const productImages = [
    product.image_url,
    '/product-1-2.jpg',
    '/product-1-3.jpg',
  ].map((src, index) => ({
    src,
    alt: `${product.name} view ${index + 1}`,
  }));

  const router = useRouter();
  const locale = router.locale;

  // Generate dynamic metadata for this product
  export const metadata = generateMetadata({
    title: `${product.name} - Refined Furniture`,
    description: product.description,
    image: product.image_url,
    locale: locale,
    pathname: `/product/${slug}`,
  });

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {product.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {product.description}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          {/* Gallery */}
          <div className="space-y-4">
            <ProductGallery images={productImages} />
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>SKU: {product.id}</span>
              <span>|</span>
              <span>In Stock</span>
            </div>
          </div>

          /* Details and CTA */
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">Product Details</h2>
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  <strong>Specifications:</strong> {product.specifications}
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>Dimensions:</strong> {product.dimensions?.length}cm L × {product.dimensions?.width}cm W × {product.dimensions?.height}cm H
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>Materials:</strong> {product.materials?.join(', ')}
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>Price:</strong> ${product.price.toFixed(2)}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-4">
              <ProductCTA product={product} />

              {/* Customize this design button */}
              <div className="flex justify-center">
                <a
                  href={`/custom-furniture/reference?productId=${product.id}&productName=${encodeURIComponent(product.name)}`}
                  className="btn btn-outline btn-primary w-full max-w-xs"
                >
                  Customize this Design
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              You May Also Like
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    id: product.id,
                    name: product.name,
                    description: `Beautiful ${product.name.toLowerCase()}`,
                    price: `$${product.price.toFixed(2)}`,
                    image: product.image_url,
                    slug: product.id,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Reviews Placeholder */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Customer Reviews
          </h2>
          <div className="border border-dashed rounded-lg p-8 text-center text-muted-foreground">
            <p>No reviews yet. Be the first to review this product!</p>
            <button
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Write a Review
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}