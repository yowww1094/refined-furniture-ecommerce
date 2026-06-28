import Link from 'next/link';
import Image from 'next/image';

export function FeaturedProducts() {
  // In a real app, this data would come from a database or CMS
  const featuredProducts = [
    {
      id: 1,
      name: "Marrakech Sofa",
      description: "Hand-carved wooden sofa with plush cushions",
      price: "$2,400",
      image: "/product-1.jpg",
      slug: "marrakech-sofa"
    },
    {
      id: 2,
      name: "Fes Coffee Table",
      description: "Intricately patterned cedar coffee table",
      price: "$850",
      image: "/product-2.jpg",
      slug: "fes-coffee-table"
    },
    {
      id: 3,
      name: "Chefchaouen Wardrobe",
      description: "Blue painted armoire with brass hardware",
      price: "$3,200",
      image: "/product-3.jpg",
      slug: "chefchaouen-wardrobe"
    }
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore our most popular pieces, each crafted with meticulous attention to detail.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map(product => (
            <Link key={product.id} href={`/product/${product.slug}`} className="group">
              <div className="aspect-w-4 aspect-h-3 w-full rounded-lg overflow-hidden group-hover:shadow-lg transition-shadow">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="pt-4">
                <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
                <p className="mt-2 text-lg font-medium text-accent">{product.price}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a href="/shop" className="text-accent hover:text-accent/80 font-medium">
            View All Products →
          </a>
        </div>
      </div>
    </section>
  );
}